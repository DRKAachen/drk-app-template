# Erste App in 30 Minuten

Von der Idee bis zur laufenden App im Internet. Wenn etwas hakt: Ansprechperson für das Citizen-Developer-Programm fragen.

## 1. Repo anlegen (5 Minuten)

Zwei Wege, je nachdem, was mit dir vereinbart wurde:

- **Du legst es selbst an:** auf GitHub in der Organisation DRKAachen → "New repository" → oben "Repository template" auf `DRKAachen/drk-app-template` stellen → Name vergeben → **Private** wählen → "Create repository".
- **Ein Admin legt es für dich an:** du bekommst den Link und bist Admin des Repos.

Dann auf deinen Rechner holen:

```bash
git clone git@github.com:DRKAachen/<dein-repo>.git
cd <dein-repo>
```

## 2. Lokal starten (5 Minuten)

Voraussetzungen: Node 22, Docker Desktop, Git.

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run dev
```

Öffne http://localhost:3000. Wenn du die Startseite siehst und `/beispiel` funktioniert, läuft alles.

Bei `npm run db:migrate` fragt Prisma nach einem Namen für die Migration. `init` reicht.

## 3. Eigene App bauen (der Rest deines Lebens)

Die Orientierung:

- **Seiten** liegen in `app/`. Jeder Ordner mit einer `page.tsx` ist eine URL. `app/mitglieder/page.tsx` ist `/mitglieder`.
- **Daten** beschreibst du in `prisma/schema.prisma`. Nach jeder Änderung `npm run db:migrate`.
- **Datenbankzugriff** passiert in Server Components und Server Actions, wie in `app/beispiel/`. Nie im Browser.
- **Styles** schreibst du als `name.module.scss` neben die Komponente. Farben und Abstände aus `styles/_variables.scss`.
- **Regeln** stehen in `AGENTS.md`. Dein KI-Assistent liest sie automatisch, wenn du Claude Code oder Cursor benutzt.

Ein guter erster Schritt: die Startseite in `app/page.tsx` durch deinen Inhalt ersetzen und in `app/layout.tsx` den Namen der App ändern.

## 4. Mit KI arbeiten

Claude Code, Cursor und Copilot lesen `AGENTS.md` und halten sich an die Regeln. Trotzdem gilt:

- Lies, was der Assistent geschrieben hat, bevor du committest. Du bist verantwortlich, nicht die KI.
- Wenn der Assistent ein neues npm-Paket, Tailwind oder eine "eigene Nutzerverwaltung" vorschlägt: ablehnen und auf `AGENTS.md` verweisen.
- Vor jedem Commit: `npm run check` und `npm run lint`.

## 5. Ins Internet (15 Minuten)

Siehe [02-coolify-deployment.md](02-coolify-deployment.md). Danach hat deine App eine Adresse, und jeder Push auf `main` wird automatisch deployt.

## 6. Bevor echte Menschen die App nutzen

Siehe [05-checkliste-produktiv.md](05-checkliste-produktiv.md). Solange du mit Testdaten arbeitest, bist du frei. Sobald echte Daten oder echte Nutzer dazukommen, gilt die Checkliste.
