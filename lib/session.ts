// Hilfsfunktionen für AUTH_MODE=password: ein gemeinsames Passwort, das
// nach erfolgreicher Eingabe als Cookie gemerkt wird.
// Läuft in Node UND im Proxy (Edge), deshalb nur Web Crypto.

export const SESSION_COOKIE = "drk_app_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Der Cookie-Wert, der als "eingeloggt" gilt. Hängt von Secret und Passwort ab. */
export async function expectedSessionToken(): Promise<string | null> {
  const secret = process.env.AUTH_SECRET;
  const password = process.env.APP_PASSWORD;
  if (!secret || !password) return null;
  return sha256Hex(`${secret}:${password}`);
}

/** Vergleich in konstanter Zeit, damit die Länge der Übereinstimmung nichts verrät. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedSessionToken();
  return expected !== null && safeEqual(token, expected);
}
