"use server";
import { consultaSchema, TConsulta } from "@/lib/models";
import { api } from "./api";
import { revalidatePath } from "next/cache";

export async function getAllConsultasByPacienteId(
  pacienteId: string,
): Promise<TConsulta[]> {
  try {
    const response = await api<TConsulta[]>(
      `/consultas?pacienteId=${pacienteId}`,
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createConsulta(novaConsulta: TConsulta) {
  const dadosValidados = consultaSchema.parse(novaConsulta);

  try {
    const response = await api.post<TConsulta>("/consultas", dadosValidados);
    const data = response.data;

    const parsedResponse = consultaSchema.safeParse(data);

    if (!parsedResponse.success) {
      console.error("Erro de contrato:", parsedResponse.error.format());
      throw new Error(
        "O servidor salvou o registro, mas retornou dados inválidos.",
      );
    }

    revalidatePath("/paciente/consultas");
    return parsedResponse.data;
  } catch (error) {
    console.error("Erro no createConsulta:", error);
    throw error;
  }
}
