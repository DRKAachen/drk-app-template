# Datenbank mit Prisma

Die App nutzt Postgres. Der Zugriff läuft über Prisma: du beschreibst deine Tabellen in `prisma/schema.prisma`, Prisma erzeugt daraus die Datenbank und einen typsicheren Client.

## Datenmodell ändern

1. Modell in `prisma/schema.prisma` anlegen oder ändern:

   ```prisma
   model Mitglied {
     id        Int      @id @default(autoincrement())
     name      String
     email     String   @unique
     erstellt  DateTime @default(now())
   }
   ```

2. Migration erzeugen und lokal anwenden:

   ```bash
   npm run db:migrate
   ```

   Prisma fragt nach einem Namen, z. B. `mitglied-hinzugefuegt`. Es entsteht ein Ordner unter `prisma/migrations/` mit einer SQL-Datei. **Die wird mit committet.**

3. Beim nächsten Deploy führt der Container `prisma migrate deploy` aus und die Änderung landet in der Coolify-Datenbank. Du musst dort nichts von Hand tun.

Migrationen niemals nachträglich bearbeiten oder löschen, wenn sie schon deployt wurden. Lieber eine neue Migration anlegen.

## Daten lesen und schreiben

Immer auf dem Server, nie im Browser. Drei Orte:

- **Server Components** (`page.tsx` ohne `"use client"`): für das Lesen beim Seitenaufbau.
- **Server Actions** (`"use server"` am Dateianfang): für Formulare, Anlegen, Ändern, Löschen.
- **Route Handlers** (`app/api/.../route.ts`): für Endpunkte, die andere Systeme aufrufen.

Der Client kommt aus `lib/db.ts`:

```ts
import { prisma } from "@/lib/db";

const mitglieder = await prisma.mitglied.findMany({ orderBy: { name: "asc" } });
await prisma.mitglied.create({ data: { name, email } });
```

Ein vollständiges Beispiel mit Formular steht in `app/beispiel/`.

Seiten, die aus der Datenbank lesen, brauchen diese Zeile, sonst versucht Next.js sie beim Build statisch zu rendern:

```ts
export const dynamic = "force-dynamic";
```

## Eingaben prüfen

Prisma schützt vor SQL-Injection, aber nicht vor falschen Daten. Vor jedem `create` oder `update`:

- Pflichtfelder vorhanden?
- Länge sinnvoll begrenzt?
- Typ korrekt (`Number(...)`, `Number.isInteger`)?
- Darf dieser Nutzer das überhaupt?

## Daten ansehen

```bash
npm run db:studio
```

öffnet Prisma Studio im Browser für die lokale Datenbank. Für die Coolify-Datenbank gibt es das nicht, und das ist Absicht: sie ist von außen nicht erreichbar.

Wenn du Produktionsdaten ansehen musst, frag die Ansprechperson. Es gibt dafür einen Weg über den Server.

## Lokale Datenbank zurücksetzen

```bash
docker compose down -v
docker compose up -d
npm run db:migrate
```

## Was nicht geht

- Die Datenbank öffentlich erreichbar machen. Auch nicht "nur kurz".
- SQLite, MySQL oder Mongo statt Postgres.
- Roh-SQL mit eingebauten Nutzereingaben. Wenn du wirklich SQL brauchst: `prisma.$queryRaw` mit Template-Literal, das parametrisiert automatisch.
