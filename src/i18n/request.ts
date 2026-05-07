import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import messages, { type SupportedLocale } from './index'

// Import one JSON to derive the message type structure
import type enMessages from './messages/en.json'

// The messages are already nested in our index.ts export
type Messages = typeof enMessages

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  // Use pre-transformed nested messages from index.ts
  const localeMessages = messages[locale as SupportedLocale]

  return {
    locale,
    messages: localeMessages,
  }
})
