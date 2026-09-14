# DRK App Template

Startpunkt für neue Apps beim DRK Kreisverband Aachen. Enthält alles, was eine App bei uns braucht, damit du dich um deine Idee kümmern kannst und nicht um Infrastruktur.

**Stack:** Next.js 16 · TypeScript · Postgres mit Prisma · SCSS · Docker auf Coolify · optionaler Login (Passwort oder DRK-SSO)

## Los geht's

Voraussetzungen: [Node 22](https://nodejs.org), [Docker Desktop](https://www.docker.com/products/docker-desktop/), Git.

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen anlegen (Standardwerte passen für lokal)
cp .env.example .env

# 3. Lokale Datenbank starten
docker compose up -d

# 4. Datenbank-Tabellen anlegen
npm run db:migrate

# 5. App starten → http://localhost:3000
npm run dev
```

Die Seite `/beispiel` zeigt Lesen, Anlegen und Löschen mit der Datenbank. Von dort aus kannst du deine eigene App bauen.

## Leitfaden

| Dokument | Inhalt |
| --- | --- |
| [docs/01-erste-app.md](docs/01-erste-app.md) | Von der Idee zur laufenden App in 30 Minuten |
| [docs/02-coolify-deployment.md](docs/02-coolify-deployment.md) | Deployen auf Coolify, Schritt für Schritt |
| [docs/03-login.md](docs/03-login.md) | Zugangsschutz: keiner, Basic Auth, Passwort oder DRK-SSO |
| [docs/04-datenbank.md](docs/04-datenbank.md) | Datenmodell ändern, Migrationen, Prisma |
| [docs/05-checkliste-produktiv.md](docs/05-checkliste-produktiv.md) | Was vor dem Produktivbetrieb erledigt sein muss |
| [AGENTS.md](AGENTS.md) | Die Regeln. Für dich und für deinen KI-Assistenten. |

## Befehle

| Befehl | Was er tut |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit Hot Reload |
| `npm run build` / `npm start` | Produktions-Build und -Start (so läuft es im Container) |
| `npm run check` | Regelprüfung: Tailwind, Font-CDNs, Secrets, Pflichtdateien |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Neue Migration aus Schemaänderungen erzeugen und anwenden |
| `npm run db:studio` | Prisma Studio: Datenbank im Browser ansehen und bearbeiten |

## Aufbau

```
app/            Seiten und Routen (Next.js App Router)
  beispiel/     Beispiel für Datenbankzugriff mit Server Actions
  login/        Login-Seite für AUTH_MODE=password
  api/health/   Health-Check für Docker und Coolify
lib/            Gemeinsamer Code: Datenbank-Client, Auth, Formatierung
prisma/         Datenmodell und Migrationen
styles/         SCSS-Variablen, Mixins, globale Styles
docs/           Leitfaden
scripts/        Regelprüfung
Dockerfile      Produktions-Image (wird von Coolify gebaut)
docker-compose.yml  NUR lokale Postgres-Datenbank
```

## Steckbrief

Vor dem Produktivbetrieb ausfüllen. Wird für das Verarbeitungsverzeichnis gebraucht.

| | |
| --- | --- |
| **Name der App** | |
| **Zweck** | Was macht die App, für wen? |
| **Verantwortliche Person** | Name, Bereich, E-Mail |
| **Nutzerkreis** | Wer benutzt die App? Mitarbeitende, Ehrenamtliche, Öffentlichkeit? |
| **Personenbezogene Daten** | Welche Kategorien? (z. B. Name, E-Mail, Adresse, Gesundheitsdaten) |
| **Speicherdauer** | Wann werden Daten gelöscht? |
| **Externe Dienste** | Welche Fremddienste sehen Daten? AVV vorhanden? |
| **Login** | none / password / authentik |
| **Status** | Prototyp / Produktiv seit … |
