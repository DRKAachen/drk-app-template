# syntax=docker/dockerfile:1
# Produktions-Image für Coolify: Next.js 16 + Prisma 7 + Postgres.
# Coolify baut dieses Image automatisch bei jedem Push auf den Deploy-Branch.

FROM node:22-slim AS base
WORKDIR /app
# openssl wird von Prisma benötigt.
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV NEXT_TELEMETRY_DISABLED=1

# --- Abhängigkeiten ---
# Schema und Prisma-Config müssen schon da sein: `npm ci` führt `prisma generate` aus (postinstall)
# und lädt dabei die Prisma-Engines, die `prisma migrate deploy` beim Start braucht.
FROM base AS deps
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

# --- Build ---
FROM base AS build
# Auf kleinen Servern kann der Build wegen Speichermangel abbrechen ("Killed").
# Dann in Coolify als Build-Arg setzen: NODE_OPTIONS=--max-old-space-size=1024
ARG NODE_OPTIONS=""
ENV NODE_OPTIONS=$NODE_OPTIONS
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Nach dem Build werden Dev-Abhängigkeiten entfernt, damit das Image kleiner wird.
RUN npm run build && npm prune --omit=dev

# --- Laufzeit ---
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Container läuft nicht als root.
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app ./

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Beim Start: ausstehende Migrationen anwenden, dann Server starten.
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node_modules/.bin/next start -p 3000 -H 0.0.0.0"]
