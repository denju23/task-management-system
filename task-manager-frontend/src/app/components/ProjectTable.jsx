// components/ProjectTable.jsx
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';


export default function ProjectTable({ data, onEdit, onDelete }) {
  const router = useRouter();
  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Created By',
      accessorKey: 'createdBy',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ getValue }) => format(new Date(getValue()), 'dd MMM yyyy'),
    },
    // {
    //   header: 'Actions',
    //   cell: ({ row }) => (
    //     <div className="flex gap-2">
    //       <button
    //         className="bg-blue-500 text-white px-3 py-1 rounded"
    //         onClick={() => onEdit(row.original)}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         className="bg-red-500 text-white px-3 py-1 rounded"
    //         onClick={() => onDelete(row.original._id)}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  const handleRowClick = (projectId) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-2 border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50"
              onClick={() => handleRowClick(row.original._id)}
              style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ddd' }}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
