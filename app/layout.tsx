import type { Metadata } from 'next'
import { Header, Footer, CookieBanner, type SiteConfig } from '@drkaachen/design-system-ui'
import '@drkaachen/design-system-ui/styles/globals.scss'

/**
 * Baseline UI-only site configuration.
 * This keeps the template CMS-agnostic by default.
 */
const defaultSiteConfig: SiteConfig = {
  _id: 'default-site',
  name: 'Deutsches Rotes Kreuz',
  hostname: process.env.NEXT_PUBLIC_DEFAULT_SITE_HOSTNAME || 'localhost',
  defaultLocale: 'de',
  logoUrl: process.env.NEXT_PUBLIC_SITE_LOGO_URL,
  navigation: [
    { label: 'Startseite', href: '/' },
    {
      label: 'Angebote',
      href: '/#angebote',
      children: [
        { label: 'Blutspende', href: '/#angebote' },
        { label: 'Erste Hilfe', href: '/#angebote' },
        { label: 'Ehrenamt', href: '/#angebote' },
      ],
    },
    { label: 'Kontakt', href: '/#kontakt' },
  ],
  footerLinks: [
    { label: 'Kontakt', href: '/#kontakt' },
    { label: 'Angebote', href: '/#angebote' },
  ],
}

/**
 * Root metadata generation for the baseline template.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: defaultSiteConfig.name || 'Deutsches Rotes Kreuz',
    description: defaultSiteConfig.name
      ? `${defaultSiteConfig.name} - Deutsches Rotes Kreuz`
      : 'Deutsches Rotes Kreuz - Site template',
  }
}

/**
 * Root layout that renders design system primitives.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={defaultSiteConfig.defaultLocale || 'de'}>
      <body
        className="app"
        data-site-hostname={process.env.NEXT_PUBLIC_DEFAULT_SITE_HOSTNAME || 'localhost'}
      >
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <Header site={defaultSiteConfig} />
        <main id="main-content" className="main" tabIndex={-1}>
          {children}
        </main>
        <Footer site={defaultSiteConfig} />
        <CookieBanner />
      </body>
    </html>
  )
}
