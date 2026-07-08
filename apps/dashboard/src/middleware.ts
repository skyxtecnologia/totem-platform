import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permite acesso irrestrito a arquivos estáticos, rotas de api e assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Verifica sessão via cookie do Better Auth ou sessão demonstrativa
  const hasSession =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("totem_session");

  // Se tentar acessar página interna sem sessão, manda para /login
  if (!hasSession && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se já tem sessão e tenta ir no /login, manda para /
  if (hasSession && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
