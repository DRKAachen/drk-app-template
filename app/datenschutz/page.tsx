import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSiteHostname, legalPageBySlugQuery, siteByHostnameQuery, client, LegalPage } from '@drk/design-system'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    return { title: 'Datenschutzerklärung' }
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'datenschutz',
  })

  return {
    title: page?.title || 'Datenschutzerklärung',
    description: page?.metaDescription || 'Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten.',
  }
}

export default async function DatenschutzPage() {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    notFound()
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'datenschutz',
  })

  if (!page) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page__title">Datenschutzerklärung</h1>
          <div className="legal-content">
            <p>
              <strong>Hinweis:</strong> Die Datenschutzerklärung wird über das CMS gepflegt.
              Bitte erstellen Sie eine Legal Page mit dem Slug &quot;datenschutz&quot; in Sanity Studio.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <LegalPage
      title={page.title}
      content={page.content}
      lastUpdated={page.lastUpdated}
    />
  )
}
