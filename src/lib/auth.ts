import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get('session_token');
  return !!sessionCookie; 
}
