import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  
  // Proteger la ruta /gracias
  if (request.nextUrl.pathname.startsWith("/gracias")) {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    
    // Permitir acceso si tiene session_id de stripe
    if (sessionId) {
      return NextResponse.next();
    }
    
    // Si no tiene session_id, verificar token de autenticacion
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  // Proteger las rutas del dashboard (requiere autenticacion)
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/gracias/:path*", "/dashboard/:path*"],
};
