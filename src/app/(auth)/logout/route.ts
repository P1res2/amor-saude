import { deleteSessionCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function GET() {
  await deleteSessionCookie();

  return NextResponse.json({ message: "Logout realizado" }, { status: 200 });
}
