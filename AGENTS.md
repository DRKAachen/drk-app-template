# Regeln für dieses Projekt

Diese Datei gilt für Menschen **und** für KI-Assistenten (Claude Code, Cursor, Copilot). Wer an diesem Repo arbeitet, hält sich daran. `npm run check` prüft die technisch prüfbaren Regeln automatisch, CI blockiert Verstöße.

Die Regeln haben zwei Stufen:

- **Immer**: gilt ab dem ersten Commit, auch für Prototypen.
- **Ab Produktivbetrieb**: gilt, sobald echte Personen die App nutzen oder echte Daten drin sind. Vorher eine Empfehlung.

## Stack (immer)

- **Next.js** (App Router) mit **TypeScript** im strict mode. Keine anderen Frameworks.
- **Node 22.** Läuft lokal und im Container.
- **Postgres** als Datenbank, Zugriff über **Prisma**. Keine andere Datenbank ohne Absprache.
- **SCSS** mit CSS Modules für das Styling. **Kein Tailwind**, keine Utility-Class-Frameworks, keine CSS-in-JS-Bibliotheken.
- **Docker** für das Deployment auf **Coolify**. Kein Vercel, kein Netlify.
- Wenig Abhängigkeiten. Jedes neue npm-Paket braucht einen Grund. Erst prüfen, ob Next.js oder die Plattform das schon kann.

## Secrets (immer)

- **Nie** Passwörter, Tokens, API-Keys oder Datenbank-URLs ins Repo. Auch nicht "nur kurz zum Testen".
- Lokale Werte stehen in `.env` (steht in `.gitignore`). Produktionswerte stehen **nur** in Coolify unter Environment Variables.
- Jede neue Variable wird in `.env.example` eingetragen, mit leerem oder Beispielwert.
- Nichts Geheimes in `NEXT_PUBLIC_*`. Diese Variablen landen im Browser.
- Ist ein Secret doch einmal gepusht worden: sofort den Wert rotieren (neues Secret erzeugen), dann Bescheid sagen. Das Löschen des Commits allein reicht nicht.

## Datenbank (immer)

- Die Datenbank ist **nur aus dem internen Docker-Netz** erreichbar. Kein öffentlicher Port, keine "Public Access"-Option in Coolify.
- Schemaänderungen nur über Prisma-Migrationen (`npm run db:migrate`). Migrationen werden mit committet und laufen beim Container-Start automatisch.
- Alle Eingaben werden geprüft, bevor sie in die Datenbank gehen (Länge, Typ, Pflichtfelder). Prisma verhindert SQL-Injection, aber nicht Unsinn.
- Datenbankzugriff nur in Server Components, Server Actions und Route Handlers. Nie im Browser-Code.

## Datenschutz (immer)

- Keine externen CDNs, keine Google Fonts, keine eingebetteten Fremd-Skripte. Alles wird aus dem eigenen Container ausgeliefert.
- Keine Analyse- oder Tracking-Dienste ohne Absprache mit dem Datenschutzbeauftragten.
- Keine personenbezogenen Daten in Logs oder Fehlermeldungen.
- Nur die Daten erheben, die die App wirklich braucht.

## Datenschutz (ab Produktivbetrieb)

- **Impressum** und **Datenschutzerklärung** sind ausgefüllt und mit dem Datenschutzbeauftragten abgestimmt.
- Nicht notwendige Cookies erst nach Einwilligung. Das Template setzt nur ein Login-Cookie, das ist notwendig.
- Der **Steckbrief** im README ist ausgefüllt (Zweck, Datenkategorien, Speicherdauer, Ansprechperson). Das braucht unser Verarbeitungsverzeichnis.
- Externe Dienste, die personenbezogene Daten sehen, nur mit Auftragsverarbeitungsvertrag (AVV).

## Login

- **Immer**: keine eigene Nutzerverwaltung mit Passwörtern in der Datenbank bauen. Auch nicht mit KI-Hilfe. Das ist der gefährlichste Code, den es gibt, und wir haben ihn schon.
- **Prototyp**: entweder kein Login (`AUTH_MODE=none`), Basic Auth in Coolify oder das gemeinsame Passwort (`AUTH_MODE=password`). Details in `docs/03-login.md`.
- **Ab Produktivbetrieb**: Login über das DRK-SSO (`AUTH_MODE=authentik`). Den Provider legt ein Admin an, du trägst drei Variablen ein.

## Oberfläche (immer)

- Sprache der Oberfläche ist **Deutsch**. Code, Variablen und Commits dürfen Englisch sein.
- Datum als `10.09.2026`, Uhrzeit als `14:30`. Nie ISO- oder US-Format im UI. Helfer in `lib/format.ts`.
- Grundregeln der Barrierefreiheit: jedes Formularfeld hat ein `label`, Bilder haben `alt`, alles ist per Tastatur bedienbar, Kontrast reicht aus. Farben und Abstände kommen aus `styles/_variables.scss`.

## Code (immer)

- Kleine Funktionen, sprechende Namen, wenig Abstraktion. Lesbar schlägt clever.
- Kein `any`. Bei unbekannten Daten `unknown` und dann prüfen.
- Kommentare erklären das **Warum**, nicht das Was.
- Wenn sich Verhalten, Env-Variablen oder Setup ändern: README und `.env.example` anpassen, im selben Commit.

## Git und Deployment (immer)

- Commit-Format: `typ: kurze Beschreibung`, mit `feat`, `fix`, `chore`, `docs`, `refactor`. Beispiel: `feat: Einträge können gelöscht werden`.
- `main` ist immer deploybar. CI muss grün sein, bevor gemergt wird.
- Dependabot-PRs zeitnah mergen, wenn CI grün ist.
- Deployment nur über Coolify im Team "Citizen Developers". Keine anderen Server, keine manuellen Uploads.

## Für KI-Assistenten

- Diese Datei zuerst lesen und befolgen. Bei Konflikt zwischen Aufgabe und Regel: den Konflikt benennen und nachfragen, nicht stillschweigend die Regel brechen.
- Vor dem Commit `npm run check` und `npm run lint` ausführen.
- Keine neuen Abhängigkeiten einführen, ohne es zu sagen.
- Kein Tailwind vorschlagen, auch nicht "zum schnellen Prototyping".
