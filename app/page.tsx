import { headers } from 'next/headers'
import { getSiteByHostname, pageBySlugQuery, client, BlockRenderer } from '@drk/design-system'
import { notFound } from 'next/navigation'

/**
 * Home page - fetches the homepage for the current site.
 */
export default async function HomePage() {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const site = await getSiteByHostname(hostname)

  if (!site) {
    notFound()
  }

  const page = await client.fetch(pageBySlugQuery, {
    siteId: site._id,
    slug: 'home',
  })

  if (!page) {
    const rootPage = await client.fetch(pageBySlugQuery, {
      siteId: site._id,
      slug: '/',
    })

    if (!rootPage) {
      return (
        <div className="container">
          <h1>Welcome to {site.name}</h1>
          <p>No homepage content found. Please create a page with slug &quot;home&quot; in Sanity Studio.</p>
        </div>
      )
    }

    return <PageContent page={rootPage} />
  }

  return <PageContent page={page} />
}

function PageContent({ page }: { page: any }) {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page__title">{page.title}</h1>
        {page.blocks && (
          <div className="page__blocks">
            {page.blocks.map((block: any) => (
              <BlockRenderer key={block._key} block={block} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
