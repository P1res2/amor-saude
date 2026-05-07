"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useUserStore } from "@/app/store/userStore";

export function HeaderMenu() {
  const router = useRouter();
  const removeUser = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    const logoutPromise = fetch("/logout", { method: "GET" });
    removeUser();

    toast.promise(logoutPromise, {
      loading: "Saindo...",
      success: () => {
        router.push("/login"); // Redireciona via cliente após o sucesso
        return "Você foi desconectado.";
      },
      error: "Não foi possível desconectar.",
    });
  };

  return (
    <header className="px-8 py-2 w-full flex flex-row justify-between mx-auto container">
      <Logo />
      <div className="flex flex-row gap-8">
        <div>
          <Link href={"/paciente/consultas"}>
            <Button variant="ghost" size="default">
              Consultas
            </Button>
          </Link>
          <Link href={"/paciente/marcar-consultas"}>
            <Button variant="ghost" size="default">
              Marcar consultas
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="group"
          onClick={handleLogout}
        >
          <LogOut className="transition-colors group-hover:text-red-700" />
        </Button>
      </div>
    </header>
  );
}
