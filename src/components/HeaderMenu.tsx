import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function HeaderMenu() {
  return (
    <header className="px-8 py-2 w-full flex flex-row justify-between mx-auto container">
        <Logo />
      <div className="flex flex-row gap-8">
        <div>
          <Button variant="ghost" size="default">
            <Link href={"/pacientes"}>Pacientes</Link>
          </Button>
          <Button variant="ghost" size="default">
            <Link href={"/cadastrar-paciente"}>Cadastrar Paciente</Link>
          </Button>
        </div>
        <Link href="/logout">
          <Button variant="ghost" size="icon" className="group">
            <LogOut className="transition-colors group-hover:text-red-700" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
