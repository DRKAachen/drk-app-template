/**
 * Page schema - flexible page content with reusable blocks.
 */

import { defineType, defineField } from 'sanity'
import { getPublishedId } from 'sanity'

async function isUniqueSlugPerSite(
  slug: string,
  context: { document?: { _id?: string; site?: { _ref?: string } }; getClient: (opts: { apiVersion: string }) => { fetch: (query: string, params: Record<string, unknown>) => Promise<unknown> } }
) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  const id = document?._id
  const siteRef = document?.site?._ref
  if (!slug || !id || !siteRef) return true
  const publishedId = getPublishedId(id)
  const draftId = `drafts.${publishedId}`
  const query = `!defined(*[_type == "page" && slug.current == $slug && site._ref == $siteRef && _id != $publishedId && _id != $draftId][0]._id)`
  const isUnique = await client.fetch(query, { slug, siteRef, publishedId, draftId })
  return Boolean(isUnique)
}

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96, isUnique: isUniqueSlugPerSite },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO Title', type: 'string' },
        { name: 'description', title: 'SEO Description', type: 'text' },
        { name: 'image', title: 'SEO Image', type: 'image' },
      ],
    }),
    defineField({
      name: 'blocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'textImageBlock' },
        { type: 'ctaSection' },
        { type: 'faqBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', site: 'site.name', slug: 'slug.current' },
    prepare({ title, site, slug }) {
      return { title, subtitle: `${site} / ${slug}` }
    },
  },
})
