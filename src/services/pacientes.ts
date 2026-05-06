"use server";
import { pacienteSchema, TPaciente } from "@/lib/models";
import { api } from "@/services/api";
import { revalidatePath } from "next/cache";

export async function createPaciente(novoPaciente: TPaciente): Promise<TPaciente> {
  
  // 1. Valida os dados de entrada antes de enviar à API (Fail-fast)
  const dadosValidados = pacienteSchema.parse(novoPaciente);

  // 2. Faz o POST tipado
  const response = await api.post<TPaciente>("/pacientes", dadosValidados);
  const data = response.data;

  // 3. Valida se o backend respondeu exatamente o que prometeu
  const parsedResponse = pacienteSchema.safeParse(data);

  if (!parsedResponse.success) {
    console.error("Erro de contrato na resposta do POST:", parsedResponse.error.format());
    throw new Error("O servidor salvou o registro, mas retornou dados inválidos.");
  }

  revalidatePath("/pacientes");
  return parsedResponse.data;
}

export async function getAllPacientes(): Promise<TPaciente[]> {
  try {
    const response = await api<TPaciente[]>("/pacientes");

    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
