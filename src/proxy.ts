import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas que não exigem autenticação (públicas)
  const publicPaths = ["/login", "/register", "/"]; // Adicione suas rotas públicas aqui

  // Se a rota atual for pública, continue normalmente
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida
  if (!isAuthenticated(request)) {
    // Redireciona para a página de login
    const loginUrl = new URL("/login", request.url);
    // Opcional: Adicionar um parâmetro de redirecionamento para voltar após o login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário estiver autenticado e tentar acessar uma rota protegida, continue
  return NextResponse.next();
}

// Configuração do matcher para especificar quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Match todas as requisições de entrada, exceto para arquivos estáticos,
     * otimização de imagem, e arquivos na pasta `_next`.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
