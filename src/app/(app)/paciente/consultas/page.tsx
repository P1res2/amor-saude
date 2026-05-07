import { DataTableWrapper } from "./components/DataTableWrapper";

// Força a página a não ser estática (opcional, mas ajuda com mocks)
export const dynamic = "force-dynamic";

export default function PacientesPage() {

  return (
    <div className="relative top-[100px] flex justify-center">
      <DataTableWrapper />
    </div>
  );
}