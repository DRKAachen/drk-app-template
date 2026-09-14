import Link from "next/link";
import styles from "./page.module.scss";

// Startseite. Ersetze den Inhalt durch deine App.
export default function StartPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Deine neue DRK-App läuft.</h1>
        <p>
          Dieses Template bringt alles mit, was eine App bei uns braucht: Next.js, eine Postgres-Datenbank
          über Prisma, SCSS im DRK-Look, Docker für Coolify und einen optionalen Login. Der Leitfaden liegt
          im Ordner <code>docs/</code>.
        </p>
        <Link href="/beispiel" className="button">
          Beispiel mit Datenbank ansehen
        </Link>
      </section>

      <section className={styles.karten} aria-label="Nächste Schritte">
        <article className={styles.karte}>
          <h2>1. Lokal starten</h2>
          <p>
            <code>docker compose up -d</code>, dann <code>npm run db:migrate</code> und <code>npm run dev</code>.
          </p>
        </article>
        <article className={styles.karte}>
          <h2>2. Eigenes Datenmodell</h2>
          <p>
            Modelle in <code>prisma/schema.prisma</code> anlegen, Migration erzeugen, in Server Components abfragen.
          </p>
        </article>
        <article className={styles.karte}>
          <h2>3. Deployen</h2>
          <p>Repo in Coolify auswählen, Datenbank anlegen, Umgebungsvariablen setzen, fertig.</p>
        </article>
      </section>
    </>
  );
}
