// Prüft die Grundregeln aus AGENTS.md automatisch. Läuft lokal (`npm run check`) und in CI.
// Schlägt fehl bei: Tailwind, externen Font-CDNs, Secrets im Code, fehlenden Pflichtdateien,
// versehentlich eingecheckter .env.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const pflichtDateien = ["AGENTS.md", "CLAUDE.md", "README.md", ".env.example", ".gitignore", "Dockerfile", ".dockerignore"];

const verboten = [
  { name: "Tailwind-Direktive", regex: /@tailwind\s+(base|components|utilities)/ },
  { name: "Tailwind-Import", regex: /@import\s+["']tailwindcss/ },
  { name: "Google Fonts CDN", regex: /fonts\.(googleapis|gstatic)\.com/i },
  { name: "GitHub-Token", regex: /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}/ },
  { name: "Anthropic-API-Key", regex: /\bsk-ant-[A-Za-z0-9_-]{20,}/ },
  { name: "OpenAI-API-Key", regex: /\bsk-(proj-)?[A-Za-z0-9]{32,}/ },
  { name: "AWS-Access-Key", regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "Privater Schlüssel", regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  // Echte Passwörter (mind. 8 Zeichen, keine Platzhalter wie <passwort> oder ...) an fremden Hosts.
  { name: "Datenbank-URL mit Passwort (nicht localhost)", regex: /postgres(ql)?:\/\/[^:\s/]+:[A-Za-z0-9%._~-]{8,}@(?!localhost|127\.0\.0\.1|db[:/])[^\s"']+/ },
];

const textEndungen = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".yml", ".yaml", ".scss", ".css", ".prisma", ".sql", ".example", ".toml"]);
const ignorierteOrdner = new Set([".git", ".next", "node_modules", ".claude"]);

function dateienSammeln(dir, ergebnis = []) {
  for (const eintrag of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignorierteOrdner.has(eintrag.name)) continue;
    const voll = path.join(dir, eintrag.name);
    if (eintrag.isDirectory()) {
      dateienSammeln(voll, ergebnis);
      continue;
    }
    const ext = path.extname(eintrag.name);
    if (textEndungen.has(ext) || eintrag.name === "Dockerfile") ergebnis.push(voll);
  }
  return ergebnis;
}

const fehler = [];

for (const datei of pflichtDateien) {
  if (!fs.existsSync(datei)) fehler.push(`Pflichtdatei fehlt: ${datei}`);
}

const gitignore = fs.existsSync(".gitignore") ? fs.readFileSync(".gitignore", "utf8") : "";
if (!/^\s*\.env\s*$/m.test(gitignore)) fehler.push(".gitignore muss `.env` enthalten");

try {
  const getrackt = execSync("git ls-files", { encoding: "utf8" }).split("\n");
  const envDateien = getrackt.filter((f) => /(^|\/)\.env(\..+)?$/.test(f) && !f.endsWith(".env.example"));
  for (const f of envDateien) fehler.push(`Umgebungsdatei ist im Repo eingecheckt: ${f}`);
} catch {
  // kein Git-Repo (z. B. im Docker-Build) – Prüfung überspringen
}

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
if (Object.keys(deps).some((d) => d === "tailwindcss" || d.startsWith("@tailwindcss/"))) {
  fehler.push("Tailwind ist als Abhängigkeit eingetragen. Regel: SCSS statt Tailwind.");
}

const eigeneDatei = path.resolve("scripts/check.mjs");
for (const datei of dateienSammeln(".")) {
  if (path.resolve(datei) === eigeneDatei) continue;
  const inhalt = fs.readFileSync(datei, "utf8");
  for (const regel of verboten) {
    if (regel.regex.test(inhalt)) fehler.push(`${regel.name} gefunden in ${datei}`);
  }
}

if (fehler.length > 0) {
  console.error("Regelprüfung fehlgeschlagen:\n");
  for (const f of fehler) console.error(`  ✗ ${f}`);
  console.error("\nDetails zu den Regeln: AGENTS.md");
  process.exit(1);
}

console.log("Regelprüfung bestanden.");
