import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isValidLocale, nestedMessages } from './index'

// Re-derive the message shape from one JSON for `useTranslations` typing.
import type enMessages from './messages/en.json'

type Messages = typeof enMessages

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = isValidLocale(requested) ? requested : defaultLocale

  return {
    locale,
    messages: nestedMessages[locale],
  }
})
