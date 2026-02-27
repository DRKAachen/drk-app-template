import { notFound } from 'next/navigation'

/**
 * Baseline catch-all route.
 * Dynamic CMS pages are intentionally disabled in the default template.
 */
export default async function DynamicPage() {
  notFound()
}
