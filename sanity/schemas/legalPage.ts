import { defineType, defineField } from 'sanity'
import { getPublishedId } from 'sanity'

async function isUniqueLegalSlugPerSite(
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
  const query = `!defined(*[_type == "legalPage" && slug.current == $slug && site._ref == $siteRef && _id != $publishedId && _id != $draftId][0]._id)`
  const isUnique = await client.fetch(query, { slug, siteRef, publishedId, draftId })
  return Boolean(isUnique)
}

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96, isUnique: isUniqueLegalSlugPerSite },
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
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }) },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: false },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [{ name: 'reference', type: 'reference', title: 'Reference', to: [{ type: 'page' }, { type: 'legalPage' }] }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', siteName: 'site.name' },
    prepare({ title, slug, siteName }) {
      return { title: title || 'Untitled', subtitle: `/${slug} • ${siteName || 'No site'}` }
    },
  },
})
