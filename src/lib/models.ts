import * as z from "zod";
import { validateCPF } from "./utils";

export const pacienteSchema = z.object({
  id: z.string().nonempty("Obrigatório"),
  nome: z.string().nonempty("Obrigatório"),
  sobrenome: z.string().nonempty("Obrigatório"),
  cpf: z
    .string()
    .nonempty("Obrigatório")
    .refine((value) => validateCPF(value), {
      message: "CPF inválido.",
    }),
  email: z.email().nonempty("Obrigatório"),
  cep: z.string().nonempty("Obrigatório"),
  telefone: z.string().nonempty("Obrigatório"),
  sexo: z
    .string()
    .nonempty("Obirgatório")
    .refine(
      (value) => {
        if (value !== "f" && value !== "m") return false;
        return true;
      },
      { message: "Valor inválido" },
    ),
});
export type TPaciente = z.infer<typeof pacienteSchema>;

export const usuarioSchema = z.object({
  id: z.string().nonempty("Obrigatório"),
  email: z.email().nonempty("Obrigatório"),
  nome: z.string().nonempty("Obrigatório"),
  sobrenome: z.string().nonempty("Obrigatório"),
  role: z.string().nullable,
  cpf: z
    .string()
    .nonempty("Obrigatório")
    .refine((value) => validateCPF(value), {
      message: "CPF inválido.",
    }),
});
export type TUsuario = z.infer<typeof usuarioSchema>;

// Schema para o formulário (RHF) — data como Date
export const consultaFormSchema = z.object({
  id: z.string().nonempty("Obrigatório"),
  pacienteId: z.string().uuid(),
  UsuarioId: z.string(),
  data: z.date(),
  observacoes: z.string().nullable(),
  status: z.enum(["agendada", "concluida", "cancelada"]),
  EspecialidadeMedico: z.enum([
    "clinico_geral",
    "cardiologista",
    "dermatologista",
    "endocrinologista",
    "gastroenterologista",
    "ginecologista",
    "neurologista",
    "oftalmologista",
    "ortopedista",
    "otorrinolaringologista",
    "pediatra",
    "psiquiatra",
    "urologista",
    "reumatologista",
    "oncologista",
  ]),
});

// Schema para API (aceita string ISO que vem do backend)
export const consultaSchema = consultaFormSchema.extend({
  data: z.coerce.date(),
});

export type TConsulta = z.infer<typeof consultaFormSchema>;
