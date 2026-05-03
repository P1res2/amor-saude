"use server";
import { pacienteSchema, TPaciente } from "./validations";
import { apiClient } from "@/lib/api-client";

export async function createPaciente(novoPaciente: TPaciente): Promise<TPaciente> {
  // 1. Valida os dados de entrada antes de enviar à API (Fail-fast)
  const dadosValidados = pacienteSchema.parse(novoPaciente);

  // 2. Faz o POST tipado
  const data = await apiClient<TPaciente>("/pacientes", {
    method: "POST",
    body: dadosValidados,
  });

  // 3. Valida se o backend respondeu exatamente o que prometeu
  const parsedResponse = pacienteSchema.safeParse(data);

  if (!parsedResponse.success) {
    console.error("Erro de contrato na resposta do POST:", parsedResponse.error.format());
    throw new Error("O servidor salvou o registro, mas retornou dados inválidos.");
  }

  return parsedResponse.data;
}

export async function getAllPacientes(): Promise<TPaciente[]> {
  try {
    const response = await apiClient<TPaciente[]>("/pacientes");

    return response;
  } catch (err) {
    console.log(err);
    return [];
  }
}
