import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

// Pflichtseite. Vor dem Produktivbetrieb mit den Angaben des Kreisverbands füllen
// (siehe docs/05-checkliste-produktiv.md).
export default function ImpressumPage() {
  return (
    <section>
      <h1>Impressum</h1>
      <p>
        <strong>DRK Kreisverband Aachen e. V.</strong>
        <br />
        Straße und Hausnummer
        <br />
        PLZ Aachen
      </p>
      <p>
        Vertreten durch: …<br />
        Registergericht und Registernummer: …<br />
        Verantwortlich im Sinne des § 18 Abs. 2 MStV: …
      </p>
      <p>
        Telefon: …<br />
        E-Mail: …
      </p>
    </section>
  );
}
