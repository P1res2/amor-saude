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
    })
});
export type TUsuario = z.infer<typeof usuarioSchema>;


export const consultaSchema = z.object({
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
    })
});
export type TConsulta = z.infer<typeof usuarioSchema>;

