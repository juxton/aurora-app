import React, { useEffect } from 'react';
import TablePaginationActions from './TablePaginationActions';
import CheckBox from './CheckBox';
import { Series } from '../data/store/SeriesStore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { ColumnDef, RowSelectionState, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import useDemoConfig from '../data/useDemoConfig';
import { useStore } from '../data/store';

const SeriesTable: React.FC = () => {
  const { data: config } = useDemoConfig({
    datums: 64,
    series: 4
  });

  const [data, setData] = React.useState(config)

  const [init, setInit] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({})
  const { seriesStore } = useStore();

  // Auto select first row
  useEffect(() => {
    if (!init && table.getRowModel().rows.length) {
      table.setRowSelection({ 0: true });
      setInit(true);
    }
  }, [init])
  
  useEffect(() => {
    if (Object.keys(rowSelection).length) {
      seriesStore.setSeries(table.getRow(Object.keys(rowSelection)[0]).original)
    } else {
      seriesStore.setSeries(undefined)
    }
  }, [rowSelection])

  const columnHelper = createColumnHelper<Series>();

  let cols:any[] = [];
  for( let i = 0; i < 64; i++) {
    cols.push(columnHelper.accessor((row) => row.data[i].primary, {
      id: i.toString(),
      cell: info => info.getValue(),
      header: ({column}) => (
        <span>X<sub>{i}</sub></span>
      )
    }))
  }

  const columns = React.useMemo<ColumnDef<Series>[]>(
    () => [
      {
        accessorFn: row => row.id,
        id: 'Select',
        header: '',
        cell: ({ row }) => (
          <CheckBox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        )
      },
      {
        accessorFn: row => row.id,
        id: 'id',
        header: 'Series',
        cell: info => info.getValue()
      },
      ...cols
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
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small'>
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
        rowsPerPageOptions={[10, 25, { label: 'All', value: data.length }]}
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