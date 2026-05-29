/**
 * localeUtils tests — BCP 47 resolution + fallback.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @standard ECMA-402 internationalization-api
 * @see docs/STANDARDS.md §6 §7
 */

import { describe, it, expect } from 'vitest'
import type { PayloadRequest } from 'payload'
import {
  resolveLocale,
  isValidLocale,
  getSafeLocale,
  ensureValidLocale,
  getSupportedLocales,
  isDefaultLocale,
  type LocaleInput,
} from '@/standards/bcp-47/locale-utils'

/** Build a minimal `PayloadRequest`-shaped mock supplying only the
 *  `locale` field these utilities read. The cast is honest: the
 *  function only consults one field, and the test exercises that. */
const mockReq = (locale: unknown): PayloadRequest =>
  ({ locale } as unknown as PayloadRequest)

describe('localeUtils', () => {
  describe('resolveLocale', () => {
    it('returns string locale code directly', () => {
      expect(resolveLocale('de')).toBe('de')
    })

    it('extracts locale code from Payload Locale object', () => {
      const locale = { code: 'fr' } as LocaleInput
      expect(resolveLocale(locale)).toBe('fr')
    })

    it('returns default locale for null input', () => {
      expect(resolveLocale(null)).toBe('en')
    })

    it('returns default locale for undefined input', () => {
      expect(resolveLocale(undefined)).toBe('en')
    })

    it('extracts locale from request context', () => {
      const req = mockReq('es')
      expect(resolveLocale(null, req)).toBe('es')
    })

    it('prefers explicit locale over request context', () => {
      const req = mockReq('es')
      expect(resolveLocale('de', req)).toBe('de')
    })

    it('falls back to default when request locale is invalid type', () => {
      const req = mockReq(123)
      expect(resolveLocale(null, req)).toBe('en')
    })

    it('prioritizes: string > locale object > request > default', () => {
      const req = mockReq('it')
      const locale = { code: 'fr' } as LocaleInput

      expect(resolveLocale('es', req)).toBe('es')
      expect(resolveLocale(locale, req)).toBe('fr')
      expect(resolveLocale(null, req)).toBe('it')
      expect(resolveLocale(null)).toBe('en')
    })
  })

  describe('isValidLocale', () => {
    it('returns true for supported locale', () => {
      expect(isValidLocale('en')).toBe(true)
      expect(isValidLocale('de')).toBe(true)
      expect(isValidLocale('fr')).toBe(true)
    })

    it('returns false for unsupported locale', () => {
      expect(isValidLocale('xyz')).toBe(false)
      expect(isValidLocale('invalid')).toBe(false)
    })

    it('returns false for non-string input', () => {
      expect(isValidLocale(123)).toBe(false)
      expect(isValidLocale(null)).toBe(false)
      expect(isValidLocale(undefined)).toBe(false)
      expect(isValidLocale({ code: 'en' })).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isValidLocale('')).toBe(false)
    })
  })

  describe('getSafeLocale', () => {
    it('returns valid locale string', () => {
      expect(getSafeLocale('en')).toBe('en')
    })

    it('returns null for invalid locale', () => {
      expect(getSafeLocale('invalid')).toBeNull()
    })

    it('falls back to default when locale input type is not resolvable', () => {
      expect(getSafeLocale(123 as unknown as LocaleInput)).toBe('en')
    })

    it('validates after resolution from object', () => {
      const locale = { code: 'de' } as LocaleInput
      expect(getSafeLocale(locale)).toBe('de')
    })

    it('validates after resolution from request', () => {
      const req = mockReq('es')
      expect(getSafeLocale(null, req)).toBe('es')
    })

    it('returns null when resolved locale from request is invalid', () => {
      const req = mockReq('invalid')
      expect(getSafeLocale(null, req)).toBeNull()
    })
  })

  describe('ensureValidLocale', () => {
    it('returns valid locale string', () => {
      expect(ensureValidLocale('de')).toBe('de')
    })

    it('returns default locale for invalid locale', () => {
      expect(ensureValidLocale('invalid')).toBe('en')
    })

    it('returns default locale when resolved is invalid', () => {
      expect(ensureValidLocale(123 as unknown as LocaleInput)).toBe('en')
    })

    it('never returns null or undefined', () => {
      expect(ensureValidLocale(null)).toBe('en')
      expect(ensureValidLocale(undefined)).toBe('en')
      expect(ensureValidLocale('xyz')).toBe('en')
    })

    it('returns valid locale from object', () => {
      const locale = { code: 'fr' } as LocaleInput
      expect(ensureValidLocale(locale)).toBe('fr')
    })

    it('returns valid locale from request', () => {
      const req = mockReq('it')
      expect(ensureValidLocale(null, req)).toBe('it')
    })

    it('returns default for invalid locale from request', () => {
      const req = mockReq('invalid')
      expect(ensureValidLocale(null, req)).toBe('en')
    })
  })

  describe('getSupportedLocales', () => {
    it('returns array of supported locales', () => {
      const locales = getSupportedLocales()
      expect(Array.isArray(locales)).toBe(true)
      expect(locales.length).toBeGreaterThan(0)
    })

    it('includes common locales', () => {
      const locales = getSupportedLocales()
      expect(locales).toContain('en')
      expect(locales).toContain('de')
      expect(locales).toContain('fr')
    })

    it('includes EU and regional locales', () => {
      const locales = getSupportedLocales()
      expect(locales).toContain('el')
      expect(locales).toContain('bg')
      expect(locales).toContain('hr')
      expect(locales).toContain('uk')
      expect(locales).toContain('ar')
    })
  })

  describe('isDefaultLocale', () => {
    it('returns true for default locale', () => {
      expect(isDefaultLocale('en')).toBe(true)
    })

    it('returns false for non-default locale', () => {
      expect(isDefaultLocale('de')).toBe(false)
      expect(isDefaultLocale('fr')).toBe(false)
    })

    it('returns false for invalid locale', () => {
      expect(isDefaultLocale('xyz')).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isDefaultLocale('')).toBe(false)
    })
  })
})
