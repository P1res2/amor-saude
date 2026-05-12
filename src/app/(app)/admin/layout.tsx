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

  if (user.role !== "admin") {
    router.replace("/paciente/consultas");
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-0">
      <HeaderMenu />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
