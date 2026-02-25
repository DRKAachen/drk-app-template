import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getSiteByHostname, Header, Footer, CookieBanner } from '@drk/design-system'
import '@drk/design-system/styles/globals.scss'

/**
 * Root layout - fetches site configuration and applies design system.
 */
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const site = await getSiteByHostname(hostname)

  return {
    title: site?.name || 'Deutsches Rotes Kreuz',
    description: site?.name
      ? `${site.name} - Deutsches Rotes Kreuz`
      : 'Deutsches Rotes Kreuz - Multi-site corporate platform',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const site = await getSiteByHostname(hostname)

  return (
    <html lang={site?.defaultLocale || 'de'}>
      <body
        className="app"
        data-site-id={site?._id || ''}
        data-site-hostname={site?.hostname || ''}
      >
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header site={site} />
        <main id="main-content" className="main" tabIndex={-1}>
          {children}
        </main>
        <Footer site={site} />
        <CookieBanner />
      </body>
    </html>
  )
}
