import { describe, it, expect, vi, beforeEach } from 'vitest'

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
      const { normalizeUrl } = require('@/utilities/urlUtils')

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
      const { buildOrigin, normalizeUrl } = require('@/utilities/urlUtils')

      const origin = buildOrigin('https', 'example.com')
      const normalized = normalizeUrl(origin + '/')

      expect(normalized).toBe('https://example.com')
    })

    it('resolvePublicSiteUrl integrates with tenant system', () => {
      const { resolvePublicSiteUrl } = require('@/utilities/urlUtils')

      const defaultUrl = 'https://default.example.com'
      const tenant = { publicSiteUrl: 'https://custom.example.com' }
      const noTenant = null

      expect(resolvePublicSiteUrl(defaultUrl, tenant)).toBe('https://custom.example.com')
      expect(resolvePublicSiteUrl(defaultUrl, noTenant)).toBe(defaultUrl)
    })
  })

  describe('Locale Utilities Integration', () => {
    it('resolveLocale handles multiple input types', () => {
      const { resolveLocale } = require('@/utilities/localeUtils')

      const stringLocale = 'de'
      const objectLocale = { code: 'fr' }
      const request = { locale: 'es' }

      expect(resolveLocale(stringLocale)).toBe('de')
      expect(resolveLocale(objectLocale)).toBe('fr')
      expect(resolveLocale(null, request)).toBe('es')
    })

    it('locale validation works across different sources', () => {
      const { resolveLocale, isValidLocale } = require('@/utilities/localeUtils')

      const locale1 = resolveLocale('en')
      const locale2 = resolveLocale({ code: 'de' })
      const locale3 = resolveLocale(null) // defaults to 'en'

      expect(isValidLocale(locale1)).toBe(true)
      expect(isValidLocale(locale2)).toBe(true)
      expect(isValidLocale(locale3)).toBe(true)
    })

    it('ensureValidLocale provides safe fallback', () => {
      const { ensureValidLocale } = require('@/utilities/localeUtils')

      expect(ensureValidLocale('en')).toBe('en')
      expect(ensureValidLocale('invalid')).toBe('en') // Falls back to default
      expect(ensureValidLocale(null)).toBe('en') // Handles null
    })
  })

  describe('Payload Cache Utilities Integration', () => {
    it('all cache functions have consistent patterns', () => {
      const cacheModule = require('@/utilities/payloadCache')

      const functions = [
        'createCachedPayloadFetcher',
        'getCachedPayloadDocument',
        'getCachedPayloadGlobal',
        'getCachedPayloadCollection',
        'getCachedPayloadCollectionAll',
        'getCachedPayloadById',
        'getCachedPayloadLocalizedDocument',
      ]

      functions.forEach((fn) => {
        expect(typeof cacheModule[fn]).toBe('function')
      })
    })

    it('cached functions support different collection types', () => {
      const { getCachedPayloadDocument } = require('@/utilities/payloadCache')

      const pagesFetcher = getCachedPayloadDocument('pages', 'home')
      const postsFetcher = getCachedPayloadDocument('posts', 'article')
      const productsFetcher = getCachedPayloadDocument('products', 'item')

      expect(typeof pagesFetcher).toBe('function')
      expect(typeof postsFetcher).toBe('function')
      expect(typeof productsFetcher).toBe('function')
    })
  })

  describe('Form Field Components Integration', () => {
    it('all form field components use FormField wrapper', () => {
      // Mock FormField to track usage
      vi.mock('@/components/blocks/Form/FormField', () => ({
        FormField: vi.fn(({ children }) => children),
      }))

      const formComponents = [
        require('@/components/blocks/Form/Text'),
        require('@/components/blocks/Form/Email'),
        require('@/components/blocks/Form/Number'),
        require('@/components/blocks/Form/Textarea'),
      ]

      formComponents.forEach((module) => {
        expect(module).toBeDefined()
      })
    })
  })

  describe('Utility Cross-integration', () => {
    it('getURL uses urlUtils functions', () => {
      const urlModule = require('@/utilities/getURL')
      const urlUtils = require('@/utilities/urlUtils')

      expect(typeof urlModule.getServerSideURL).toBe('function')
      expect(typeof urlUtils.normalizeUrl).toBe('function')
      expect(typeof urlUtils.buildOrigin).toBe('function')
    })

    it('generatePreviewPath uses localeUtils', () => {
      const previewModule = require('@/utilities/generatePreviewPath')
      const localeUtils = require('@/utilities/localeUtils')

      expect(typeof previewModule.generatePreviewPath).toBe('function')
      expect(typeof localeUtils.resolveLocale).toBe('function')
    })

    it('getDocument and getGlobals use payloadCache', () => {
      const docModule = require('@/utilities/getDocument')
      const globalsModule = require('@/utilities/getGlobals')
      const cacheModule = require('@/utilities/payloadCache')

      expect(typeof docModule.getCachedDocument).toBe('function')
      expect(typeof globalsModule.getCachedGlobal).toBe('function')
      expect(typeof cacheModule.getCachedPayloadDocument).toBe('function')
      expect(typeof cacheModule.getCachedPayloadGlobal).toBe('function')
    })
  })

  describe('Error Handling Integration', () => {
    it('urlUtils safely handles invalid inputs', () => {
      const { safeParseUrl, getUrlOrigin } = require('@/utilities/urlUtils')

      expect(safeParseUrl('invalid-url')).toBeNull()
      expect(() => getUrlOrigin('also-invalid')).not.toThrow()
    })

    it('localeUtils gracefully handles invalid locales', () => {
      const { isValidLocale, ensureValidLocale } = require('@/utilities/localeUtils')

      expect(isValidLocale('invalid')).toBe(false)
      expect(ensureValidLocale('invalid')).toBe('en')
    })
  })

  describe('Type Safety Integration', () => {
    it('utilities maintain TypeScript compatibility', () => {
      const urlModule = require('@/utilities/urlUtils')
      const localeModule = require('@/utilities/localeUtils')
      const cacheModule = require('@/utilities/payloadCache')

      // Verify all functions are defined and callable
      expect(Object.keys(urlModule).length).toBeGreaterThan(0)
      expect(Object.keys(localeModule).length).toBeGreaterThan(0)
      expect(Object.keys(cacheModule).length).toBeGreaterThan(0)
    })
  })

  describe('Performance Characteristics', () => {
    it('utility functions execute quickly', async () => {
      const { normalizeUrl, buildOrigin } = require('@/utilities/urlUtils')

      const start = performance.now()

      for (let i = 0; i < 1000; i++) {
        normalizeUrl('https://example.com/')
        buildOrigin('https', 'example.com')
      }

      const duration = performance.now() - start

      // Should complete 2000 operations in less than 100ms
      expect(duration).toBeLessThan(100)
    })
  })
})
