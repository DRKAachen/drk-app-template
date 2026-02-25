/**
 * Next.js middleware - uses design system middleware and defines config locally.
 */
import { middleware as designSystemMiddleware } from '@drk/design-system/middleware'

export const middleware = designSystemMiddleware

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
