"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { HeaderMenu } from "./components/HeaderMenu";
import { useUserStore } from "@/app/store/userStore";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      if (!user) {
        // Agora sim, temos certeza absoluta que ele não está no LocalStorage
        router.replace("/login");
      } else if (user.role !== "admin") {
        // Se for QUALQUER coisa diferente de admin (null, "paciente", undefined)
        router.replace("/paciente/consultas");
      } else {
        // É admin, libera a página!
        setLoading(false);
      }
    };

    checkUser();
  }, [user, router, pathname]); // 4. Adicione o isHydrated nas dependências

  // Enquanto estiver carregando ou hidratando, mostra a tela de load
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-0">
      <HeaderMenu />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
