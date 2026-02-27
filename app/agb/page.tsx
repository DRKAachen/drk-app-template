import type { Metadata } from 'next'

/**
 * Metadata for terms and conditions page.
 */
export const metadata: Metadata = {
  title: 'Allgemeine Geschaeftsbedingungen',
  description: 'Allgemeine Geschaeftsbedingungen (AGB).',
}

/**
 * Baseline AGB page.
 */
export default function AGBPage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page__title">Allgemeine Geschaeftsbedingungen</h1>
        <p>
          Hinterlegen Sie hier Ihre projektspezifischen AGB. In der Baseline ist keine
          automatische CMS-Ausspielung aktiviert.
        </p>
      </div>
    </div>
  )
}
