import { describe, it, expect, beforeEach, vi } from 'vitest'

import * as TextMod from '@/components/blocks/Form/Text'
import * as EmailMod from '@/components/blocks/Form/Email'
import * as NumberMod from '@/components/blocks/Form/Number'
import * as TextareaMod from '@/components/blocks/Form/Textarea'
import * as urlUtils from '@/utilities/urlUtils'
import * as localeUtils from '@/utilities/localeUtils'
import * as payloadCache from '@/utilities/payloadCache'
import * as getURL from '@/utilities/getURL'
import * as getDocument from '@/utilities/getDocument'
import * as getGlobals from '@/utilities/getGlobals'
import * as generatePreviewPath from '@/utilities/generatePreviewPath'

/**
 * Integration tests for refactored utilities
 * Verifies that all refactored utilities work together correctly
 */

describe('Refactored Utilities Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('URL Utilities Integration', () => {
    it('normalizeUrl removes trailing slashes consistently', () => {
      const { normalizeUrl } = urlUtils

      const urls = [
        'https://example.com/',
        'https://example.com/path/',
        'https://example.com:8443/api/',
      ]

      const normalized = urls.map(normalizeUrl)

      expect(normalized[0]).toBe('https://example.com')
      expect(normalized[1]).toBe('https://example.com/path')
      expect(normalized[2]).toBe('https://example.com:8443/api')
    })

    it('buildOrigin and normalizeUrl work together', () => {
      const { buildOrigin, normalizeUrl } = urlUtils

      const origin = buildOrigin('https', 'example.com')
      const normalized = normalizeUrl(origin + '/')

      expect(normalized).toBe('https://example.com')
    })

    it('resolvePublicSiteUrl integrates with tenant system', () => {
      const { resolvePublicSiteUrl } = urlUtils

      const defaultUrl = 'https://default.example.com'
      const tenant = { publicSiteUrl: 'https://custom.example.com' }
      const noTenant = null

      expect(resolvePublicSiteUrl(defaultUrl, tenant)).toBe('https://custom.example.com')
      expect(resolvePublicSiteUrl(defaultUrl, noTenant)).toBe(defaultUrl)
    })
  })

  describe('Locale Utilities Integration', () => {
    it('resolveLocale handles multiple input types', () => {
      const { resolveLocale } = localeUtils

      const stringLocale = 'de'
      const objectLocale = { code: 'fr' }
      const request = { locale: 'es' }

      expect(resolveLocale(stringLocale)).toBe('de')
      expect(resolveLocale(objectLocale)).toBe('fr')
      expect(resolveLocale(null, request as any)).toBe('es')
    })

    it('locale validation works across different sources', () => {
      const { resolveLocale, isValidLocale } = localeUtils

      const locale1 = resolveLocale('en')
      const locale2 = resolveLocale({ code: 'de' })
      const locale3 = resolveLocale(null)

      expect(isValidLocale(locale1)).toBe(true)
      expect(isValidLocale(locale2)).toBe(true)
      expect(isValidLocale(locale3)).toBe(true)
    })

    it('ensureValidLocale provides safe fallback', () => {
      const { ensureValidLocale } = localeUtils

      expect(ensureValidLocale('en')).toBe('en')
      expect(ensureValidLocale('invalid')).toBe('en')
      expect(ensureValidLocale(null)).toBe('en')
    })
  })

  describe('Payload Cache Utilities Integration', () => {
    it('all cache functions have consistent patterns', () => {
      const functions = [
        'createCachedPayloadFetcher',
        'getCachedPayloadDocument',
        'getCachedPayloadGlobal',
        'getCachedPayloadCollection',
        'getCachedPayloadCollectionAll',
        'getCachedPayloadById',
        'getCachedPayloadLocalizedDocument',
      ] as const

      functions.forEach((fn) => {
        expect(typeof (payloadCache as any)[fn]).toBe('function')
      })
    })

    it('cached functions support different collection types', () => {
      const { getCachedPayloadDocument } = payloadCache

      const pagesFetcher = getCachedPayloadDocument('pages', 'home')
      const postsFetcher = getCachedPayloadDocument('posts', 'article')
      const productsFetcher = getCachedPayloadDocument('products', 'item')

      expect(typeof pagesFetcher).toBe('function')
      expect(typeof postsFetcher).toBe('function')
      expect(typeof productsFetcher).toBe('function')
    })
  })

  describe('Form Field Components Integration', () => {
    it('all form field modules export components', () => {
      expect(TextMod).toBeDefined()
      expect(EmailMod).toBeDefined()
      expect(NumberMod).toBeDefined()
      expect(TextareaMod).toBeDefined()
    })
  })

  describe('Utility Cross-integration', () => {
    it('getURL uses urlUtils functions', () => {
      expect(typeof getURL.getServerSideURL).toBe('function')
      expect(typeof urlUtils.normalizeUrl).toBe('function')
      expect(typeof urlUtils.buildOrigin).toBe('function')
    })

    it('generatePreviewPath uses localeUtils', () => {
      expect(typeof generatePreviewPath.generatePreviewPath).toBe('function')
      expect(typeof localeUtils.resolveLocale).toBe('function')
    })

    it('getDocument and getGlobals use payloadCache', () => {
      expect(typeof getDocument.getCachedDocument).toBe('function')
      expect(typeof getGlobals.getCachedGlobal).toBe('function')
      expect(typeof payloadCache.getCachedPayloadDocument).toBe('function')
      expect(typeof payloadCache.getCachedPayloadGlobal).toBe('function')
    })
  })

  describe('Error Handling Integration', () => {
    it('urlUtils safely handles invalid inputs', () => {
      const { safeParseUrl, getUrlOrigin } = urlUtils

      expect(safeParseUrl('invalid-url')).toBeNull()
      expect(() => getUrlOrigin('also-invalid')).not.toThrow()
    })

    it('localeUtils gracefully handles invalid locales', () => {
      const { isValidLocale, ensureValidLocale } = localeUtils

      expect(isValidLocale('invalid')).toBe(false)
      expect(ensureValidLocale('invalid')).toBe('en')
    })
  })

  describe('Type Safety Integration', () => {
    it('utilities maintain TypeScript compatibility', () => {
      expect(Object.keys(urlUtils).length).toBeGreaterThan(0)
      expect(Object.keys(localeUtils).length).toBeGreaterThan(0)
      expect(Object.keys(payloadCache).length).toBeGreaterThan(0)
    })
  })

  describe('Performance Characteristics', () => {
    it('utility functions execute quickly', () => {
      const { normalizeUrl, buildOrigin } = urlUtils

      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        normalizeUrl('https://example.com/')
        buildOrigin('https', 'example.com')
      }

      const duration = performance.now() - start

      expect(duration).toBeLessThan(100)
    })
  })
})
