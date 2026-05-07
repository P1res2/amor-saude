import { PacientesDataTable } from "@/components/PacientesDataTable/PacientesDataTable";
import { TPaciente } from "@/lib/models";
import { getAllConsultasByPacienteId } from "@/services/consultas";

export async function DataTableWrapper() {
  const data = await getAllConsultasByPacienteId("");
  return <PacientesDataTable data={[] as TPaciente[]} />;
}
