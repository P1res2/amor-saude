"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { HeaderMenu } from "./components/HeaderMenu";

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Para saber onde o usuário está
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Pequeno delay para garantir que o Zustand leu o localStorage
    // No Next.js, o componente monta antes da hidratação do persist terminar às vezes
    const checkUser = () => {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "admin") {
        // Se for admin tentando acessar área de paciente, manda pro admin
        router.replace("/admin/pacientes");
      } else {
        setLoading(false); // Só para de carregar se ele estiver no lugar certo
      }
    };

    checkUser();
  }, [user, router, pathname]);

  // Enquanto verifica o usuário ou carrega o storage, não mostra nada (ou um spinner)
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeaderMenu />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
