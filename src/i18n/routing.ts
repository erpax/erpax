/**
 * next-intl routing — locale-prefixed paths and navigation primitives.
 *
 * Always-prefix policy: `/en/...`, `/de/...`, etc. Avoids the `as-needed`
 * cookie/pathname edge cases when switching locale.
 *
 * @standard BCP-47 language-tag
 * @rfc 3986 uniform-resource-identifier locale-path-segment
 * @rfc 9110 http-semantics
 * @standard W3C URL Living Standard
 * @standard ECMA-402 internationalization-api
 * @see docs/STANDARDS.md §6 §4.3
 */

import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import localization from './localization'

export const routing = defineRouting({
  locales: localization.locales.map((locale) => locale.code),
  defaultLocale: localization.defaultLocale,
  /** Always prefix URLs with `/en`, `/de`, … — matches `(frontend)/[locale]` and avoids `as-needed` pathname/cookie edge cases when switching locale. */
  localePrefix: 'always',
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)

export type Locale = (typeof routing.locales)[number]
