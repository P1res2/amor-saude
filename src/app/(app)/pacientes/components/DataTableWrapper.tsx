import { PacientesDataTable } from "@/components/PacientesDataTable/PacientesDataTable";
import { getAllPacientes } from "@/features/paciente/services";

export async function DataTableWrapper() {
  const data = await getAllPacientes();
  return <PacientesDataTable data={data} />;
}
