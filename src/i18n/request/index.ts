/**
 * next-intl request config — pick the locale from the URL and load messages.
 *
 * Falls back to `defaultLocale` if the requested locale isn't in the supported
 * list (defensive against invalid `[locale]` segments).
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @standard ECMA-402 internationalization-api
 * @rfc 9110 http-semantics accept-language-fallback
 * @see docs/STANDARDS.md §6
 */

import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isValidLocale, nestedMessages } from '@/i18n'

// Re-derive the message shape from one JSON for `useTranslations` typing.
import type enMessages from '@/i18n/messages/en.json'

type Messages = typeof enMessages

declare global {
  /** Message key paths for `next-intl` — mirrors `en.json` shape. */
  type IntlMessages = Messages
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = isValidLocale(requested) ? requested : defaultLocale

  return {
    locale,
    messages: nestedMessages[locale],
  }
})
