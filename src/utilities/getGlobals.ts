import type { Config } from 'src/payload-types'
import type { SupportedLocale } from '@/i18n/localization'
import { defaultLocale } from '@/i18n/localization'
import { getCachedPayloadGlobal } from './payloadCache'

type Global = keyof Config['globals']

/**
 * Get a cached global document by slug (per locale for localized nav / globals).
 *
 * @example
 * const header = await getCachedGlobal('header', 1, 'de')()
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  depth = 0,
  locale: SupportedLocale = defaultLocale,
) => getCachedPayloadGlobal(slug, depth, locale)
