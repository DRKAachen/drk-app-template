import type { Metadata } from 'next'

/**
 * Metadata for the legal notice page.
 */
export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung gemaess gesetzlicher Vorgaben.',
}

/**
 * Baseline legal notice page.
 */
export default function ImpressumPage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page__title">Impressum</h1>
        <p>
          Ergaenzen Sie hier die vollstaendige Anbieterkennzeichnung Ihres DRK-Standorts
          gemaess den geltenden rechtlichen Anforderungen.
        </p>
      </div>
    </div>
  )
}
