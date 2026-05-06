"use server"; // Importante: garante que isso só rode no servidor

import { cookies } from "next/headers";

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("session_token", token, {
    httpOnly: true, // Impede acesso via JavaScript (segurança contra XSS)
    secure: process.env.NODE_ENV === "production", // Só envia via HTTPS em prod
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("session_token")?.value;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}
