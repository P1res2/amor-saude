import { PacientesDataTable } from "@/components/PacientesDataTable/PacientesDataTable";
import { getAllPacientes } from "@/services/pacientes";


export async function DataTableWrapper() {
  const data = await getAllPacientes();
  return <PacientesDataTable data={data} />;
}
