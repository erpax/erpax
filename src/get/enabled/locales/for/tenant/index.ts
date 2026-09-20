/**
 * Resolve the per-tenant enabled locale set — defaults to the global
 * `supportedLocales` when the tenant doesn't restrict.
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @standard ECMA-402 internationalization-api
 * @standard EU 1958/1 official-languages-of-the-european-union
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { Tenant } from '@/types'

import { defaultLocale, isValidLocale, supportedLocales, type SupportedLocale } from '@/i18n'

/**
 * Locales allowed for a tenant’s public site. If the tenant has no selection
 * (undefined / empty), all configured locales are allowed.
 */
function normalizeTenantLocaleCodes(raw: Tenant['locales']): string[] | undefined {
  if (raw == null) return undefined
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === 'string')
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : undefined
    } catch {
      return undefined
    }
  }
  return undefined
}
