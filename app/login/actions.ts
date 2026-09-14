"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, expectedSessionToken, safeEqual } from "@/lib/session";

export type LoginState = { fehler?: string };

/** Prüft das gemeinsame Passwort (AUTH_MODE=password) und setzt das Session-Cookie. */
export async function anmelden(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const eingabe = String(formData.get("passwort") ?? "");
  const weiter = String(formData.get("weiter") ?? "/");
  const erwartet = process.env.APP_PASSWORD ?? "";

  if (!erwartet) return { fehler: "APP_PASSWORD ist nicht gesetzt. Bitte Umgebungsvariablen prüfen." };
  if (!safeEqual(eingabe, erwartet)) return { fehler: "Das Passwort ist nicht korrekt." };

  const token = await expectedSessionToken();
  if (!token) return { fehler: "AUTH_SECRET ist nicht gesetzt. Bitte Umgebungsvariablen prüfen." };

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  // Nur relative Ziele erlauben (kein Open Redirect).
  redirect(weiter.startsWith("/") && !weiter.startsWith("//") ? weiter : "/");
}
