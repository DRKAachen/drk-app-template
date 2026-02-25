import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSiteHostname, legalPageBySlugQuery, siteByHostnameQuery, client, LegalPage } from '@drk/design-system'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    return { title: 'Impressum' }
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'impressum',
  })

  return {
    title: page?.title || 'Impressum',
    description: page?.metaDescription || 'Impressum und Angaben gemäß § 5 TMG.',
  }
}

export default async function ImpressumPage() {
  const headersList = await headers()
  const hostname = getSiteHostname(headersList)
  const site = await client.fetch(siteByHostnameQuery, { hostname })

  if (!site) {
    notFound()
  }

  const page = await client.fetch(legalPageBySlugQuery, {
    siteId: site._id,
    slug: 'impressum',
  })

  if (!page) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page__title">Impressum</h1>
          <div className="legal-content">
            <p>
              <strong>Hinweis:</strong> Der Impressum-Inhalt wird über das CMS gepflegt.
              Bitte erstellen Sie eine Legal Page mit dem Slug &quot;impressum&quot; in Sanity Studio.
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
