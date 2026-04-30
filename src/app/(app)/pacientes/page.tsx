import { PacientesDataTable } from "@/components/PacientesDataTable/PacientesDataTable";
import { pacientesMock } from "@/db";

// Força a página a não ser estática (opcional, mas ajuda com mocks)
export const dynamic = "force-dynamic";

export default function PacientesPage() {
  const data = pacientesMock; 

  return (
    <div className="relative top-[100px] flex justify-center">
      <PacientesDataTable data={data} />
    </div>
  );
}