import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { supportedLocales } from './i18n/localization'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const supportedLocaleSet = new Set<string>(supportedLocales)

/**
 * - **Public site:** `next-intl` locale prefix routing (see `./i18n/routing`).
 * - **Admin:** when `?locale=` is present and matches a supported site locale,
 *   set the `payload-lng` cookie so Payload admin UI follows that language on
 *   the same request (`getRequestLanguage` reads the cookie before
 *   `Accept-Language`). The query string is still available for Payload’s
 *   content locale / Localizer.
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const localeParam = request.nextUrl.searchParams.get('locale')
    if (localeParam && supportedLocaleSet.has(localeParam)) {
      const res = NextResponse.next()
      res.cookies.set('payload-lng', localeParam, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      })
      return res
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|\\.open-next|next|tenant-slugs|tenant-domains|.*\\..*).*)',
  ],
}
