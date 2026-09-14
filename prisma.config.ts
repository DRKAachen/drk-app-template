import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: Die Verbindungs-URL steht hier, nicht mehr im Schema.
// Bewusst process.env statt env(): beim Build (prisma generate) ist
// DATABASE_URL nicht gesetzt und das darf nicht fehlschlagen.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
