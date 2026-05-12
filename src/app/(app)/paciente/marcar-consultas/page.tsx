import { cookies } from "next/headers";
import { CriarConsultaForm } from "./components/MarcarConsultasForm";

export default async function MarcarConsultasPage() {
  const cookieStore = await cookies();
  const userData = cookieStore.get("session_token");
  const userId = userData?.value || "";

  return (
    <div className="relative top-[100px] flex justify-center">
      <CriarConsultaForm pacienteId={userId} />
    </div>
  );
}
