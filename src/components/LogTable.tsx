import React from 'react';
import TablePaginationActions from './TablePaginationActions';
import CheckBox from './CheckBox';
import { Foo } from '../data/dataTypes';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';

import { 
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
 } from "@tanstack/react-table";
 
function LogTable({
  data,
}: {
  data: any
}) {
  const rerender = React.useReducer(() => ({}), {})[1]
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo<ColumnDef<Foo>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <CheckBox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
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
        )
      },
      {
        header: 'Logs',
        // footer: props => props.column.id,
        columns: [
          {
            accessorFn: row => row.label,
            id: 'snapshot',
            cell: info => info.getValue(),
            header: 'Snapshot'
          },
          {
            accessorFn: row => row.data[0].secondary,
            id: 'a',
            cell: info => info.getValue(),
            header: 'a'
          },
          {
            accessorFn: row => row.data[1].secondary,
            id: 'b',
            cell: info => info.getValue(),
            header: 'b'
          },
          {
            accessorFn: row => row.data[2].secondary,
            id: 'c',
            cell: info => info.getValue(),
            header: 'c'
          },
          {
            accessorFn: row => row.data[3].secondary,
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
    onRowSelectionChange: setRowSelection,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  })

  const { pageSize, pageIndex } = table.getState().pagination

  console.log("ROW SELECTION", rowSelection)
  Object.keys(rowSelection).map(key => {
    const row = table.getRow(key)
    console.log("ROW", row)
  })

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <TableRow key={row.id} onClick={() => console.log("DEBUG", row.getVisibleCells())}>
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
      <pre>{Object.keys(rowSelection).length} of{' '} {table.getPreFilteredRowModel().rows.length} Total Rows Selected</pre>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </>
  )
}

export default LogTable