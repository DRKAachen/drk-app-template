import { NextResponse, type NextRequest, type NextFetchEvent, type NextMiddleware } from "next/server";
import { auth } from "@/lib/auth";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/session";

// Zugangsschutz für die ganze App, gesteuert über AUTH_MODE (siehe docs/03-login.md):
//   none      → alles offen
//   password  → gemeinsames Passwort (APP_PASSWORD), Login-Seite unter /login
//   authentik → DRK-SSO über Auth.js

// Pfade, die immer ohne Login erreichbar sind.
const OEFFENTLICH = ["/login", "/abmelden", "/api/health", "/impressum", "/datenschutz"];

function istOeffentlich(pathname: string): boolean {
  return OEFFENTLICH.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// auth() ist für Middleware UND Route Handler typisiert; hier ist es die Middleware-Variante.
const authentikProxy = auth((req) => {
  if (req.auth || istOeffentlich(req.nextUrl.pathname)) return NextResponse.next();
  const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
  signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
  return NextResponse.redirect(signInUrl);
}) as unknown as NextMiddleware;

export async function proxy(req: NextRequest, event: NextFetchEvent) {
  const mode = process.env.AUTH_MODE ?? "none";

  if (mode === "password") {
    if (istOeffentlich(req.nextUrl.pathname)) return NextResponse.next();
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (await isValidSessionToken(token)) return NextResponse.next();
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("weiter", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (mode === "authentik") {
    return authentikProxy(req, event);
  }

  return NextResponse.next();
}

export const config = {
  // Alles außer Auth.js-Endpunkten, Next-Interna und statischen Dateien.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp|css|js|txt)$).*)"],
};
