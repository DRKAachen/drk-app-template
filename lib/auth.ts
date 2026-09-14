import NextAuth from "next-auth";
import Authentik from "next-auth/providers/authentik";

// Login über das DRK-SSO (Authentik) mit Auth.js.
// Aktiv nur bei AUTH_MODE=authentik. Die Zugangsdaten kommen aus
// AUTH_AUTHENTIK_ID, AUTH_AUTHENTIK_SECRET und AUTH_AUTHENTIK_ISSUER
// (Auth.js liest diese Variablen automatisch).
// Callback-URL, die in Authentik eingetragen werden muss:
//   https://<deine-domain>/api/auth/callback/authentik

export const AUTH_MODE = (process.env.AUTH_MODE ?? "none") as "none" | "password" | "authentik";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: AUTH_MODE === "authentik" ? [Authentik] : [],
  // Hinter dem Coolify-Proxy ist der Host vertrauenswürdig.
  trustHost: true,
  session: { strategy: "jwt" },
});
