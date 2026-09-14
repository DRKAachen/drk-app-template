# Deployment auf Coolify

Coolify ist unsere Plattform, auf der Apps laufen. Es baut aus deinem Repo ein Docker-Image und startet es. Jeder Push auf `main` löst ein neues Deployment aus.

Du arbeitest im Coolify-Team **Citizen Developers**. Dort siehst du nur die Apps dieses Teams.

## Einmalige Einrichtung pro App

### 1. Datenbank anlegen

1. In Coolify in dein Projekt gehen → **+ New** → **Database** → **PostgreSQL**.
2. Namen vergeben, z. B. `meine-app-db`. Version 17 lassen.
3. **Start** klicken.
4. Auf der Seite der Datenbank die **internal URL** kopieren. Sie sieht so aus: `postgres://postgres:...@meine-app-db:5432/postgres`.

Wichtig: **"Make it publicly available" bleibt aus.** Die Datenbank ist nur aus dem internen Netz erreichbar, das ist Absicht und Regel.

Unter **Backups** eine tägliche Sicherung aktivieren. Kostet einen Klick, rettet dir irgendwann den Tag.

### 2. App anlegen

1. **+ New** → **Application** → **Private Repository (with GitHub App)**.
2. GitHub App `d-r-k-citizen-devs` wählen. Dein Repo erscheint in der Liste. Falls nicht: die Ansprechperson muss dein Repo für die App freischalten.
3. Branch `main`, **Build Pack: Dockerfile**. Port 3000.
4. **Continue**.

### 3. Umgebungsvariablen setzen

Unter **Environment Variables** die Werte aus deiner `.env.example` eintragen:

| Variable | Wert |
| --- | --- |
| `DATABASE_URL` | die interne URL der Datenbank aus Schritt 1 |
| `AUTH_MODE` | `none`, `password` oder `authentik` (siehe [03-login.md](03-login.md)) |
| `AUTH_SECRET` | Ausgabe von `openssl rand -base64 32` (nur bei password/authentik) |
| `APP_PASSWORD` | dein Passwort (nur bei `password`) |

Bei `DATABASE_URL` den Haken **"Available at Buildtime"** setzen, sonst kann Prisma beim Build das Schema nicht lesen.

### 4. Domain

Unter **General** → **Domains** eine Adresse eintragen, z. B. `https://meine-app.drk-digital.io`. Coolify besorgt das Zertifikat selbst. Welche Domains du nutzen darfst, sagt dir die Ansprechperson.

### 5. Deploy

**Deploy** klicken. Das erste Mal dauert etwa drei bis fünf Minuten. Unter **Deployments** siehst du das Log. Wenn dort `Migrations applied` und `Ready` steht, ist die App online.

Beim Start führt der Container automatisch `prisma migrate deploy` aus. Deine Migrationen aus `prisma/migrations/` landen so in der Coolify-Datenbank.

## Danach

- **Jeder Push auf `main` deployt automatisch.** Deshalb: nur pushen, was funktioniert. CI muss grün sein.
- **Logs** findest du unter **Logs** in der App. Fehler nach dem Deploy stehen dort.
- **Health-Check**: Coolify ruft `/api/health` auf. Antwortet die App nicht mit 200, wird der Container als ungesund markiert. Dann ist meistens die `DATABASE_URL` falsch.
- **Rollback**: unter Deployments ein älteres Deployment auswählen → **Redeploy**.

## Häufige Fehler

| Symptom | Ursache |
| --- | --- |
| Build bricht ab mit `prisma generate` Fehler | `DATABASE_URL` nicht als Buildtime-Variable markiert |
| Container startet, dann Neustart-Schleife | `DATABASE_URL` zeigt auf falschen Host. Muss der interne Name der Datenbank sein. |
| Seite lädt, `/beispiel` zeigt Fehler 500 | Migration nicht gelaufen. Logs prüfen. |
| Login-Seite kommt, Passwort wird abgelehnt | `APP_PASSWORD` oder `AUTH_SECRET` fehlt oder hat Leerzeichen |
| HTTPS funktioniert nicht | Domain zeigt noch nicht auf den Server. DNS mit der Ansprechperson klären. |
| Build bricht ab mit `Killed` | Dem Server geht beim Build der Speicher aus. In Coolify unter Build → Build Arguments `NODE_OPTIONS=--max-old-space-size=1024` eintragen. Hilft das nicht: Ansprechperson, der Server ist zu klein. |
