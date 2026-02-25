import Link from 'next/link'

/**
 * 404 Not Found page - DRK Corporate Design
 */
export default function NotFound() {
  return (
    <div className="page">
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1>404 - Seite nicht gefunden</h1>
        <p style={{ marginBottom: '2rem' }}>
          Die von Ihnen gesuchte Seite existiert leider nicht.
        </p>
        <Link href="/" className="button button--primary">
          Zur Startseite
        </Link>
      </div>
    </div>
  )
}
