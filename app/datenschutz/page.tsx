import type { Metadata } from 'next'

/**
 * Metadata for the data protection page.
 */
export const metadata: Metadata = {
  title: 'Datenschutzerklaerung',
  description: 'Informationen zur Verarbeitung personenbezogener Daten.',
}

/**
 * Baseline DSGVO-focused privacy page.
 */
export default function DatenschutzPage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page__title">Datenschutzerklaerung</h1>
        <p>
          Diese Vorlage startet ohne angebundenes CMS und ohne externe Tracking-Dienste.
          Ergaenzen Sie Ihre projektspezifischen Angaben zur Datenverarbeitung, zu
          Verantwortlichen und zu Betroffenenrechten gemaess DSGVO.
        </p>
      </div>
    </div>
  )
}
