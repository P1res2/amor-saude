import { getAllConsultasByPacienteId } from "@/services/consultas";
import { cookies } from "next/headers";
import { ConsultasDataTable } from "../../components/ConsultasDataTable/ConsultasDataTable";

export async function DataTableWrapper() {
  const cookieStore = await cookies();
  const userData = cookieStore.get("session_token");
  const userId = userData?.value || "";
  const data = await getAllConsultasByPacienteId(userId);
  return <ConsultasDataTable data={data} />;
}
