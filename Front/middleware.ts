import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  
  // proteger la ruta /gracias
  if (request.nextUrl.pathname.startsWith("/gracias")) {
    // verificar si tiene session_id en la url (viene de stripe)
    const sessionId = request.nextUrl.searchParams.get("session_id");
    
    // permitir acceso si tiene session_id de stripe
    if (sessionId) {
      return NextResponse.next();
    }
    
    // si no tiene session_id, verificar token de autenticacion
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/gracias/:path*"],
};
