import type { Tenant } from '@/payload-types'

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

export function getEnabledLocalesForTenant(tenant: Tenant | null): SupportedLocale[] {
  const raw = normalizeTenantLocaleCodes(tenant?.locales)
  if (!raw || raw.length === 0) {
    return [...supportedLocales]
  }

  const filtered = raw.filter((code): code is SupportedLocale => isValidLocale(code))
  return filtered.length > 0 ? filtered : [...supportedLocales]
}

/** Prefer project default locale when allowed; otherwise first allowed locale. */
export function pickTenantFallbackLocale(allowed: SupportedLocale[]): SupportedLocale {
  if (allowed.includes(defaultLocale)) return defaultLocale
  return allowed[0] ?? defaultLocale
}

/** `/en/posts` + `en` → `/posts`; `/en` → `/` */
export function stripLeadingLocaleFromPathname(pathname: string, locale: string): string {
  const prefix = `/${locale}`
  if (pathname === prefix || pathname === `${prefix}/`) return '/'
  if (pathname.startsWith(`${prefix}/`)) {
    const rest = pathname.slice(prefix.length)
    return rest.startsWith('/') ? rest : `/${rest}`
  }
  return pathname
}

/** `/posts` → `/bg/posts`; `/` → `/bg` */
export function pathWithLocale(locale: string, pathWithoutLeadingLocale: string): string {
  if (pathWithoutLeadingLocale === '/' || pathWithoutLeadingLocale === '') {
    return `/${locale}`
  }
  const normalized = pathWithoutLeadingLocale.startsWith('/')
    ? pathWithoutLeadingLocale
    : `/${pathWithoutLeadingLocale}`
  return `/${locale}${normalized}`
}
