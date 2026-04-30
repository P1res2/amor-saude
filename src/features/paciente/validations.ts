import * as z from "zod";

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
    telefone: z.string().nonempty("Obrigatório")
});

export type TPaciente = z.infer<typeof pacienteSchema>;

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo o que não é número
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após os 3 primeiros números
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto após os 6 primeiros números
    .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Coloca hífen após os 9 primeiros números
    .replace(/(-\d{2})\d+?$/, "$1"); // Limita a 11 números
};

const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11 || /^(\d)\1+$/.test(cleanCPF)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};
