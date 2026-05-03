"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { pacienteColumns } from "./coloums";
import { TPaciente } from "@/features/paciente/validations";

interface PacientesDataTableProps {
  data: TPaciente[];
}

export function PacientesDataTable({ data }: PacientesDataTableProps) {
  const table = useReactTable({
    data,
    columns: pacienteColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    /* O container controla o scroll vertical */
    <div className="relative h-[650px] overflow-y-auto rounded-md border bg-card w-full select-none shadow-lg space-y-4">
      {/* MUDANÇA CRUCIAL: 
        Trocamos 'border-collapse' por 'border-separate border-spacing-0'.
        Isso destrava o sticky header no CSS.
      */}
      <table className="w-full caption-bottom text-sm border-separate border-spacing-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 z-10 bg-card h-12 px-4 text-left align-middle font-semibold text-muted-foreground border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child_td]:border-0">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 align-middle border-b border-border/50">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={pacienteColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum paciente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
