"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { HeaderMenu } from "./components/HeaderMenu";

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const hasHydrated = useUserStore.persist.hasHydrated();

  if (!hasHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  if (user.role === "admin") {
    router.replace("/admin/pacientes");
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeaderMenu />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
