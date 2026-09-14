# Zugangsschutz und Login

Du entscheidest selbst, welche Variante zu deiner App passt. Die Regel dahinter ist nur eine: **keine eigene Nutzerverwaltung mit Passwörtern in der Datenbank bauen.** Alles andere ist deine Wahl.

| Variante | Für wen | Aufwand | Nutzer unterscheidbar |
| --- | --- | --- | --- |
| Kein Login | Öffentliche Seiten, Prototyp ohne sensible Daten | keiner | nein |
| Basic Auth in Coolify | Prototyp, den Kollegen ansehen sollen | 1 Minute, kein Code | nein |
| Gemeinsames Passwort in der App | Prototyp mit schöner Login-Seite | 2 Minuten, kein Code | nein |
| DRK-SSO (Authentik) | Produktivbetrieb, echte Nutzer | Provider durch Admin | ja |

## Variante A: Kein Login

`AUTH_MODE=none` (Standard). Die App ist für jeden erreichbar, der die Adresse kennt.

## Variante B: Basic Auth in Coolify

Der Passwortschutz sitzt **vor** der App, im Proxy von Coolify. Der Browser zeigt sein eingebautes Nutzername-Passwort-Fenster. Die App selbst enthält keinen Login-Code und weiß nichts davon.

Einrichtung in Coolify: App öffnen → **Configuration** → **General** → Abschnitt **HTTP Basic Authentication** → einschalten, Nutzername und Passwort eintragen → speichern. Coolify verschlüsselt das Passwort selbst.

`AUTH_MODE` bleibt auf `none`.

**Gut:** nichts im Code, kann niemand versehentlich ausbauen. **Weniger gut:** graues Browser-Fenster, ein Passwort für alle.

## Variante C: Gemeinsames Passwort in der App

Die App zeigt eine eigene Login-Seite im DRK-Look. Wer das Passwort kennt, bekommt ein Cookie und bleibt 30 Tage angemeldet.

Umgebungsvariablen:

```
AUTH_MODE=password
AUTH_SECRET=<Ausgabe von: openssl rand -base64 32>
APP_PASSWORD=<dein Passwort>
```

Lokal in `.env`, in Coolify unter Environment Variables. Nach dem Ändern in Coolify: **Restart**.

**Gut:** sieht nach echter App aus, und die Stelle, an der später das SSO eingehängt wird, ist dieselbe (`proxy.ts`). **Weniger gut:** ein Passwort für alle, und Code im Repo, den man kaputt machen kann.

Die Seiten `/impressum`, `/datenschutz`, `/login` und `/api/health` sind immer ohne Login erreichbar. Weitere freie Pfade trägst du in `proxy.ts` in die Liste `OEFFENTLICH` ein.

## Variante D: DRK-SSO über Authentik

Nutzer melden sich mit ihrem DRK-Konto an, wie bei allen anderen Tools. Die App weiß, wer angemeldet ist, und kann Rollen unterscheiden. **Ab Produktivbetrieb ist das die Pflichtvariante.**

Der Code ist im Template schon fertig. Damit es läuft, braucht es einen Provider in Authentik, den ein Admin anlegt. Schick der Ansprechperson:

- den Namen deiner App
- die Domain, z. B. `https://meine-app.drk-digital.io`
- die Callback-URL: `https://meine-app.drk-digital.io/api/auth/callback/authentik`

Zurück bekommst du drei Werte, die du in Coolify einträgst:

```
AUTH_MODE=authentik
AUTH_SECRET=<Ausgabe von: openssl rand -base64 32>
AUTH_AUTHENTIK_ID=<Client ID>
AUTH_AUTHENTIK_SECRET=<Client Secret>
AUTH_AUTHENTIK_ISSUER=https://auth.drk-digital.io/application/o/<app-slug>
```

Der Issuer wird **ohne** Schrägstrich am Ende eingetragen.

In deinem Code kommst du an den angemeldeten Nutzer über `auth()` aus `lib/auth.ts`:

```ts
import { auth } from "@/lib/auth";

export default async function Seite() {
  const session = await auth();
  return <p>Hallo {session?.user?.name}</p>;
}
```

## Von Prototyp zu Produktiv wechseln

`AUTH_MODE` in Coolify umstellen, die neuen Variablen eintragen, **Restart**. Kein Code-Umbau nötig.
