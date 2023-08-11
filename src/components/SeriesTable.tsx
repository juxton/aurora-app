import React, { useEffect } from 'react';
import TablePaginationActions from './TablePaginationActions';
import CheckBox from './CheckBox';
import { Series } from '../data/dataTypes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import useDemoConfig from '../data/useDemoConfig';
import { useStore } from '../data/store';

const SeriesTable: React.FC = () => {
  const { data: config } = useDemoConfig({
    datums: 4,
    series: 100
  });

  const [data, setData] = React.useState(config)
  
  const [rowSelection, setRowSelection] = React.useState({})
  const { seriesStore } = useStore();

  useEffect(() => {
    if (Object.keys(rowSelection).length) {
      seriesStore.setSeries(table.getRow(Object.keys(rowSelection)[0]).original)
    } else {
      seriesStore.setSeries(undefined)
    }
  }, [rowSelection])
  const columns = React.useMemo<ColumnDef<Series>[]>(
    () => [
      {
        id: 'header',
        header: 'Series',
        columns: [
          {
            accessorFn: row => row.label,
            id: 'Select',
            cell: ({ row }) => (
              <div className="px-1">
                <CheckBox
                  {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              </div>
            ),
            header: 'Select'
          },
          {
            accessorFn: row => row.label,
            id: 'name',
            cell: info => info.getValue(),
            header: 'Name'
          },
          {
            accessorFn: row => row.data[0].primary,
            id: 'a',
            cell: info => info.getValue(),
            header: 'a'
          },
          {
            accessorFn: row => row.data[1].primary,
            id: 'b',
            cell: info => info.getValue(),
            header: 'b'
          },
          {
            accessorFn: row => row.data[2].primary,
            id: 'c',
            cell: info => info.getValue(),
            header: 'c'
          },
          {
            accessorFn: row => row.data[3].primary,
            id: 'd',
            cell: info => info.getValue(),
            header: 'd'
          },
        ],
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    // debugTable: true,
  })

  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => {
          const size = e.target.value ? Number(e.target.value) : 10
          table.setPageSize(size)
        }}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

export default SeriesTable;