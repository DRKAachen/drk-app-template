import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { formatDatumZeit } from "@/lib/format";
import { eintragAnlegen, eintragLoeschen } from "./actions";
import styles from "./beispiel.module.scss";

export const metadata: Metadata = { title: "Beispiel" };

// Diese Seite liest bei jedem Aufruf aus der Datenbank.
// Ohne diese Zeile würde Next.js versuchen, sie beim Build statisch zu rendern.
export const dynamic = "force-dynamic";

export default async function BeispielPage() {
  const eintraege = await prisma.eintrag.findMany({ orderBy: { erstellt: "desc" }, take: 50 });

  return (
    <>
      <h1>Beispiel: Einträge</h1>
      <p>
        Ein minimales Muster für Lesen, Anlegen und Löschen mit Prisma und Server Actions. Der Code liegt in{" "}
        <code>app/beispiel/</code>, das Datenmodell in <code>prisma/schema.prisma</code>.
      </p>

      <form action={eintragAnlegen} className={styles.form}>
        <label htmlFor="titel">Titel</label>
        <input id="titel" name="titel" required minLength={2} maxLength={120} />
        <label htmlFor="text">Text (optional)</label>
        <textarea id="text" name="text" rows={3} maxLength={2000} />
        <button type="submit" className="button">
          Eintrag anlegen
        </button>
      </form>

      {eintraege.length === 0 ? (
        <p>Noch keine Einträge. Lege oben den ersten an.</p>
      ) : (
        <ul className={styles.liste}>
          {eintraege.map((e) => (
            <li key={e.id} className={styles.eintrag}>
              <div>
                <h2>{e.titel}</h2>
                {e.text && <p>{e.text}</p>}
                <time dateTime={e.erstellt.toISOString()}>{formatDatumZeit(e.erstellt)}</time>
              </div>
              <form action={eintragLoeschen}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className={styles.loeschen} aria-label={`Eintrag „${e.titel}“ löschen`}>
                  Löschen
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
