import { NextResponse } from "next/server";
import { AUTH_MODE, signOut } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

// Abmelden: löscht das Passwort-Cookie bzw. beendet die SSO-Sitzung.
export async function GET(req: Request) {
  if (AUTH_MODE === "authentik") {
    await signOut({ redirectTo: "/" });
  }
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
