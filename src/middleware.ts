import createIntlMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

/**
 * Public-site locale routing only. **`/admin` is excluded** so nothing here
 * strips or rewrites `?locale=` — Payload needs that query for content locale
 * and the admin Localizer.
 *
 * Admin UI language follows Payload (`payload-lng`, `Accept-Language`, account
 * Language). `?locale=` is for content locale, not stripped here.
 */
export default createIntlMiddleware(routing)

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|\\.open-next|admin|next|tenant-slugs|tenant-domains|.*\\..*).*)',
  ],
}
