import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import NotFoundWebp from '@assets/not-found.webp';

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
}

const Table = <T,>({ columns, data }: Props<T>) => {
  const table = useReactTable({
    columns,
    data,
    rowCount: data.length,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

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
                      className="px-2 py-3 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
