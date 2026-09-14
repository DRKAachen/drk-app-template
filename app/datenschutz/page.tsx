import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

// Pflichtseite. Vor dem Produktivbetrieb mit dem Datenschutzbeauftragten abstimmen
// (siehe docs/05-checkliste-produktiv.md).
export default function DatenschutzPage() {
  return (
    <section>
      <h1>Datenschutzerklärung</h1>
      <p>
        Diese App verwendet keine externen Dienste, keine Tracking-Cookies und lädt keine Inhalte von fremden
        Servern. Technisch notwendige Cookies werden nur für den Login gesetzt.
      </p>
      <h2>Verantwortlicher</h2>
      <p>DRK Kreisverband Aachen e. V., Kontakt siehe Impressum.</p>
      <h2>Welche Daten verarbeitet werden</h2>
      <p>Hier beschreiben, welche personenbezogenen Daten die App zu welchem Zweck verarbeitet und wie lange sie gespeichert werden.</p>
      <h2>Betroffenenrechte</h2>
      <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch nach Art. 15 bis 21 DSGVO.</p>
    </section>
  );
}
