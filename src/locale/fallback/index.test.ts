/**
 * Locale-fallback tests — Conservation Law 54 applied to locale.
 *
 * Slice MMMMMMMMM-cut1 (2026-05-11). Mirror of
 * `currency-fallback/index.test.ts`. Confirms BCP-47 `und` behaves
 * as the locale identity element in exactly the way ISO 4217 XXX
 * behaves as the currency identity element.
 *
 *   1. Every blank input maps to `und`.
 *   2. Real locales flow through unchanged.
 *   3. `und` is compatible with anything; same primary subtag pairs
 *      are compatible; different languages are not.
 *   4. `isSupportedLocale` strict; `resolveLocale` lenient.
 *   5. `formatForLocale` never throws.
 *   6. `computeLocaleUuid` is stable + per-tenant namespaced
 *      (same shape as currency-uuid bridge).
 *
 * @standard RFC 5646 §4.1 'und' undetermined language subtag
 * @audit Conservation Law 54 universal-identity-element
 */
import { describe, it, expect } from 'vitest'
import {
  BLANK_LOCALE,
  resolveLocale,
  resolveLocaleOrDefault,
  isBlankLocale,
  localesCompatible,
  localeDisplayLabel,
  isSupportedLocale,
  formatForLocale,
  computeLocaleUuid,
  SUPPORTED_LOCALES_INCLUDING_BLANK,
} from '@/locale/fallback'

describe('resolveLocale — every blank input maps to und', () => {
  it('undefined → und', () => {
    expect(resolveLocale(undefined)).toBe(BLANK_LOCALE)
  })
  it('null → und', () => {
    expect(resolveLocale(null)).toBe(BLANK_LOCALE)
  })
  it('empty string → und', () => {
    expect(resolveLocale('')).toBe(BLANK_LOCALE)
  })
  it('whitespace-only → und', () => {
    expect(resolveLocale('   ')).toBe(BLANK_LOCALE)
  })
  it('explicit "und" is idempotent', () => {
    expect(resolveLocale('und')).toBe(BLANK_LOCALE)
  })
  it('real locale tags flow through (with region suffix preserved)', () => {
    expect(resolveLocale('en')).toBe('en')
    expect(resolveLocale('en-GB')).toBe('en-GB')
    expect(resolveLocale('bg-BG')).toBe('bg-BG')
    expect(resolveLocale('  en  ')).toBe('en')  // trim only
  })
})

describe('resolveLocaleOrDefault — UX-friendly variant', () => {
  it('blank input falls back to DEFAULT_LOCALE rather than und', () => {
    // DEFAULT_LOCALE is whatever DEFAULT_PROFILE.locale resolves to;
    // we just assert it's NOT und (DEFAULT_LOCALE is a real locale).
    expect(resolveLocaleOrDefault(undefined)).not.toBe(BLANK_LOCALE)
    expect(resolveLocaleOrDefault('')).not.toBe(BLANK_LOCALE)
  })
  it('non-blank input passes through unchanged', () => {
    expect(resolveLocaleOrDefault('en-GB')).toBe('en-GB')
  })
})

describe('isBlankLocale', () => {
  it('detects every blank-equivalent input', () => {
    expect(isBlankLocale(undefined)).toBe(true)
    expect(isBlankLocale(null)).toBe(true)
    expect(isBlankLocale('')).toBe(true)
    expect(isBlankLocale('und')).toBe(true)
  })
  it('returns false for real locales', () => {
    expect(isBlankLocale('en')).toBe(false)
    expect(isBlankLocale('bg')).toBe(false)
    expect(isBlankLocale('en-GB')).toBe(false)
  })
})

describe('localesCompatible — und is universal', () => {
  it('equal tags are compatible', () => {
    expect(localesCompatible('en', 'en')).toBe(true)
    expect(localesCompatible('en-GB', 'en-GB')).toBe(true)
  })
  it('und is compatible with anything (either side)', () => {
    expect(localesCompatible('en-GB', 'und')).toBe(true)
    expect(localesCompatible('und', 'bg')).toBe(true)
    expect(localesCompatible('und', 'und')).toBe(true)
  })
  it('null/undefined/empty also compatible (resolve to und)', () => {
    expect(localesCompatible('en-GB', null)).toBe(true)
    expect(localesCompatible(undefined, 'bg')).toBe(true)
    expect(localesCompatible('', '')).toBe(true)
  })
  it('same primary subtag pairs are compatible (region tolerance)', () => {
    expect(localesCompatible('en-GB', 'en-US')).toBe(true)
    expect(localesCompatible('de-AT', 'de-DE')).toBe(true)
  })
  it('different language tags are NOT compatible', () => {
    expect(localesCompatible('en', 'fr')).toBe(false)
    expect(localesCompatible('bg-BG', 'pl-PL')).toBe(false)
  })
})

describe('localeDisplayLabel', () => {
  it('und renders as em-dash placeholder', () => {
    expect(localeDisplayLabel('und')).toBe('—')
    expect(localeDisplayLabel(null)).toBe('—')
  })
  it('real tags render as themselves (translations supply localised labels)', () => {
    expect(localeDisplayLabel('en')).toBe('en')
    expect(localeDisplayLabel('bg-BG')).toBe('bg-BG')
  })
})

describe('isSupportedLocale — strict membership check', () => {
  it('returns true for entries in the supported set', () => {
    expect(isSupportedLocale('en')).toBe(true)
    expect(isSupportedLocale('bg')).toBe(true)
    expect(isSupportedLocale('ar')).toBe(true)
  })
  it('returns false for und (blank is not "supported", it is the identity)', () => {
    expect(isSupportedLocale('und')).toBe(false)
    expect(isSupportedLocale(null)).toBe(false)
  })
  it('returns false for unknown tags', () => {
    expect(isSupportedLocale('xx')).toBe(false)
    expect(isSupportedLocale('zzz')).toBe(false)
  })
})

describe('SUPPORTED_LOCALES_INCLUDING_BLANK — admin UI all-locales picker', () => {
  it('includes und at the end of the supported set', () => {
    expect(SUPPORTED_LOCALES_INCLUDING_BLANK).toContain('und')
    expect(SUPPORTED_LOCALES_INCLUDING_BLANK).toContain('en')
    expect(SUPPORTED_LOCALES_INCLUDING_BLANK).toContain('bg')
  })
})

describe('formatForLocale — never throws', () => {
  it('formats numbers per locale; und falls back to locale-agnostic', () => {
    expect(formatForLocale(1234.5, 'en-US')).toMatch(/1[,.]?234/)
    const und = formatForLocale(1234.5, 'und')
    expect(und).toBe('1234.5')   // toString fallback
  })
  it('formats dates per locale; und falls back to ISO 8601', () => {
    const d = new Date('2026-05-11T08:00:00.000Z')
    const und = formatForLocale(d, 'und')
    expect(und).toBe('2026-05-11T08:00:00.000Z')
  })
  it('null/undefined locale does not throw', () => {
    expect(() => formatForLocale(123, null)).not.toThrow()
    expect(() => formatForLocale(new Date(), undefined)).not.toThrow()
  })
  it('unknown tag falls back to system default rather than throwing', () => {
    const out = formatForLocale(1234.5, 'zzz-XX')
    expect(typeof out).toBe('string')
  })
})

describe('computeLocaleUuid — uuid-family bridge (Law 54)', () => {
  it('is stable for the same (code, tenant) pair', () => {
    const u1 = computeLocaleUuid('en', 'tenant-1')
    const u2 = computeLocaleUuid('en', 'tenant-1')
    expect(u1).toBe(u2)
    expect(u1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
  })

  it('differs across tenants for the same code', () => {
    expect(computeLocaleUuid('en', 'tenant-1')).not.toBe(computeLocaleUuid('en', 'tenant-2'))
  })

  it('blank-equivalent inputs all hash to the same und uuid (per-tenant)', () => {
    const a = computeLocaleUuid('und', 'platform')
    const b = computeLocaleUuid('', 'platform')
    const c = computeLocaleUuid(null as unknown as string, 'platform')
    expect(a).toBe(b)
    expect(b).toBe(c)
  })
})
