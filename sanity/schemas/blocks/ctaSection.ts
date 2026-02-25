import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'heading', subtitle: 'ctaText' } },
})
