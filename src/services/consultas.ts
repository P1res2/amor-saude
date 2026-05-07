import { TConsulta } from "@/lib/models";
import { api } from "./api";

export async function getAllConsultasByPacienteId(pacienteId: string): Promise<TConsulta[]> {
  try {
    const response = await api<TConsulta[]>(`/consultas?pacienteId=${pacienteId}`);

    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
