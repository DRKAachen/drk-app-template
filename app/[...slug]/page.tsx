import { headers } from 'next/headers'
import { getSiteByHostname, pageBySlugQuery, client, BlockRenderer } from '@drk/design-system'
import { notFound } from 'next/navigation'

/**
 * Dynamic page route - handles all page slugs.
 */
export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const site = await getSiteByHostname(hostname)

  if (!site) {
    notFound()
  }

  const { slug: slugSegments } = await params
  const slug = slugSegments.join('/')
  const page = await client.fetch(pageBySlugQuery, {
    siteId: site._id,
    slug,
  })

  if (!page) {
    notFound()
  }

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
