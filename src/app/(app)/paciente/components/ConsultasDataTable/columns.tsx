import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TConsulta } from "@/lib/models";

export const consultaColumns: ColumnDef<TConsulta>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue<string>("id").slice(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "EspecialidadeMedico",
    header: "Especialidade",
    cell: ({ row }) => {
      const especialidade = row.getValue<TConsulta["EspecialidadeMedico"]>(
        "EspecialidadeMedico",
      );

      const labels: Record<TConsulta["EspecialidadeMedico"], string> = {
        clinico_geral: "Clínico Geral",
        cardiologista: "Cardiologista",
        dermatologista: "Dermatologista",
        endocrinologista: "Endocrinologista",
        gastroenterologista: "Gastroenterologista",
        ginecologista: "Ginecologista",
        neurologista: "Neurologista",
        oftalmologista: "Oftalmologista",
        ortopedista: "Ortopedista",
        otorrinolaringologista: "Otorrinolaringologista",
        pediatra: "Pediatra",
        psiquiatra: "Psiquiatra",
        urologista: "Urologista",
        reumatologista: "Reumatologista",
        oncologista: "Oncologista",
      };

      return <span>{labels[especialidade]}</span>;
    },
  },
  // {
  //   accessorKey: "pacienteId",
  //   header: "Paciente ID",
  //   cell: ({ row }) => (
  //     <span className="font-mono text-xs text-muted-foreground">
  //       {row.getValue<string>("pacienteId").slice(0, 8)}...
  //     </span>
  //   ),
  // },
  // {
  //   accessorKey: "UsuarioId",
  //   header: "Usuário ID",
  //   cell: ({ row }) => (
  //     <span className="font-mono text-xs text-muted-foreground">
  //       {row.getValue<string>("UsuarioId").slice(0, 8)}...
  //     </span>
  //   ),
  // },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      const date = row.getValue<Date>("data");
      return (
        <span>
          {format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      const variants: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
      > = {
        agendada: "secondary",
        concluida: "default",
        cancelada: "destructive",
      };

      return (
        <Badge variant={variants[status.toLowerCase()] ?? "outline"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "observacoes",
    header: "Observações",
    cell: ({ row }) => {
      const obs = row.getValue<string | null>("observacoes");
      return <span className="text-muted-foreground italic">{obs ?? "—"}</span>;
    },
  },
];
