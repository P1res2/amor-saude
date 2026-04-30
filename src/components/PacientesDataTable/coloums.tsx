"use client";

import { TPaciente } from "@/features/paciente/validations";
import { ColumnDef } from "@tanstack/react-table";

export const pacienteColumns: ColumnDef<TPaciente>[] = [
  {
    id: "nomeCompleto",
    header: "Nome do Paciente",
    cell: ({ row }) => {
      const { nome, sobrenome } = row.original;
      return <div className="font-medium">{`${nome} ${sobrenome}`}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => {
      // Se o CPF já vier mascarado do backend, você pode só retornar o valor.
      // Se vier limpo (só números), formatamos aqui apenas para exibição visual:
      const cpf = row.getValue("cpf") as string;
      const cpfFormatado = cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4",
      );
      return <span>{cpfFormatado}</span>;
    },
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => {
      const telefone = row.getValue("telefone") as string;
      if (telefone) {
        const telefoneFormatado = telefone
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        return <span>{telefoneFormatado}</span>;
      }
      return "Nenhum";
    },
  },
  {
    accessorKey: "cep",
    header: "CEP",
    cell: ({ row }) => {
      const cep = row.getValue("cep") as string;
      const cepFormatado = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
      return <span>{cepFormatado}</span>;
    },
  },
];
