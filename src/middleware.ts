import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Exclude API, Payload admin, Next internals, static assets, multi-tenant routes, OpenNext
    '/((?!api|_next|_vercel|\\.open-next|admin|next|tenant-slugs|tenant-domains|.*\\..*).*)',
  ],
}
