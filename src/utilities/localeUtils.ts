/**
 * Locale utility functions for consistent locale handling
 * Resolves locale from various sources (Payload objects, strings, request context)
 */

import type { Locale, PayloadRequest, TypedLocale } from 'payload'
import localization from '@/i18n/localization'

export type LocaleInput = TypedLocale | string | Locale | null | undefined

/**
 * Resolve locale from various input sources in priority order:
 * 1. Payload Locale object with .code property
 * 2. String locale code
 * 3. From request context (PayloadRequest.locale)
 * 4. Default locale from i18n config
 *
 * @example
 * resolveLocale('en') → 'en'
 * resolveLocale({ code: 'de' }) → 'de'
 * resolveLocale(null, req) → req.locale or default
 * resolveLocale(undefined) → localization.defaultLocale
 */
export function resolveLocale(
  locale: LocaleInput,
  req?: PayloadRequest,
): string {
  // Direct locale value provided
  if (locale !== undefined && locale !== null) {
    // Handle Payload Locale object with code property
    if (typeof locale === 'object' && 'code' in locale) {
      return locale.code
    }
    // Handle string locale code
    if (typeof locale === 'string') {
      return locale
    }
  }

  // Try to extract from request context
  if (req && 'locale' in req) {
    const reqLocale = (req as { locale?: unknown }).locale
    if (typeof reqLocale === 'string') {
      return reqLocale
    }
  }

  // Fall back to default
  return localization.defaultLocale
}

/**
 * Validate that a locale is in the supported list
 * @example isValidLocale('en') → true
 * @example isValidLocale('xyz') → false
 */
export function isValidLocale(locale: unknown): locale is string {
  if (typeof locale !== 'string') return false
  return localization.supportedLocales.includes(locale as any)
}

/**
 * Get locale object if valid, else return null
 * Safe wrapper for locale resolution with validation
 */
export function getSafeLocale(
  locale: LocaleInput,
  req?: PayloadRequest,
): string | null {
  const resolved = resolveLocale(locale, req)
  return isValidLocale(resolved) ? resolved : null
}

/**
 * Ensure locale is valid, fall back to default if not
 * Never returns null/undefined
 */
export function ensureValidLocale(
  locale: LocaleInput,
  req?: PayloadRequest,
): string {
  const resolved = resolveLocale(locale, req)
  return isValidLocale(resolved) ? resolved : localization.defaultLocale
}

/**
 * Get list of supported locales
 * @example getSupportedLocales() → ['en', 'de', 'fr', ...]
 */
export function getSupportedLocales(): string[] {
  return localization.supportedLocales
}

/**
 * Check if locale is the default locale
 */
export function isDefaultLocale(locale: string): boolean {
  return locale === localization.defaultLocale
}
