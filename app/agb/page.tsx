import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSiteHostname, legalPageBySlugQuery, siteByHostnameQuery, client, LegalPage } from '@drk/design-system'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    return { title: 'Allgemeine Geschäftsbedingungen' }
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'agb',
  })

  return {
    title: page?.title || 'Allgemeine Geschäftsbedingungen',
    description: page?.metaDescription || 'Allgemeine Geschäftsbedingungen (AGB).',
  }
}

export default async function AGBPage() {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    notFound()
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'agb',
  })

  if (!page) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page__title">Allgemeine Geschäftsbedingungen</h1>
          <div className="legal-content">
            <p>
              <strong>Hinweis:</strong> Die AGB werden über das CMS gepflegt.
              Bitte erstellen Sie eine Legal Page mit dem Slug &quot;agb&quot; in Sanity Studio.
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
