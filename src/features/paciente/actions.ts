"use server";
import { pacientesMock } from "@/db";
import { TPaciente } from "./validations";
import { revalidatePath } from "next/cache";

export async function createPaciente(paciente:TPaciente) {
  pacientesMock.push(paciente);

  revalidatePath("/pacientes");
}
