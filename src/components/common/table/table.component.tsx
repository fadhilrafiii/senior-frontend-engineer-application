import { useEffect, useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

import Pagination from './pagination.component';

import NotFoundWebp from '@assets/not-found.webp';

interface IProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
}

const Table = <T,>({ columns, data }: IProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPageIndex = searchParams.get('pageIndex');
  const initialPageSize = searchParams.get('pageSize');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(initialPageIndex || '0'),
    pageSize: parseInt(initialPageSize || '10'),
  });

  useEffect(() => {
    if (!initialPageIndex) {
      searchParams.set('pageIndex', '0');
      setSearchParams(searchParams);
    }

    if (!initialPageSize) {
      searchParams.set('pageSize', '10');
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const handleChangePage = (page: number) => {
    table.setPageIndex(page);
    searchParams.set('pageIndex', page.toString());
    setSearchParams(searchParams);
  };

  const handleChangePageSize = (pageSize: number) => {
    table.setPageSize(pageSize);
    searchParams.set('pageSize', pageSize.toString());
    setSearchParams(searchParams);
  };

  const { rows } = table.getRowModel();

  return (
    <div className="rounded-md overflow-auto border border-primary">
      <table className="w-full border-collapse border-hidden border-spacing-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    minWidth: header.column.getSize(),
                  }}
                  className="font-medium px-2 py-4 text-sm border border-primary bg-primary text-white"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border border-primary">
          {rows.length <= 0 && (
            <tr>
              <td colSpan={columns.length} className="p-4">
                <span className="flex flex-col items-center justify-center gap-3">
                  <img
                    src={NotFoundWebp}
                    alt="Not Found"
                    width={120}
                    height={120}
                    className="max-w-[120px] max-h-[120px]"
                  />
                  <span className="font-medium text-slate-600">Data is not available yet</span>
                </span>
              </td>
            </tr>
          )}
          {rows.length > 0 &&
            rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      className="px-2 py-4 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="bg-slate-200">
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalData={data.length}
          totalPage={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          canGoNext={table.getCanNextPage()}
          canGoBack={table.getCanPreviousPage()}
          onChangePage={handleChangePage}
          onChangePageSize={handleChangePageSize}
        />
      </div>
    </div>
  );
};

export default Table;
