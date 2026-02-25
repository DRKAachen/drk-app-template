/**
 * Schema index - exports all schemas for Sanity Studio.
 */

import site from './site'
import page from './page'
import legalPage from './legalPage'
import blogPost from './blogPost'
import author from './author'
import category from './category'
import heroBlock from './blocks/heroBlock'
import textImageBlock from './blocks/textImageBlock'
import ctaSection from './blocks/ctaSection'
import faqBlock from './blocks/faqBlock'

export const schemaTypes = [
  site,
  page,
  legalPage,
  blogPost,
  author,
  category,
  heroBlock,
  textImageBlock,
  ctaSection,
  faqBlock,
]
