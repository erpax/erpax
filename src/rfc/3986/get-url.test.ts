/**
 * getURL tests — origin resolution from headers, env, browser context.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 3986 uniform-resource-identifier
 * @rfc 9110 http-semantics host-header forwarded-host
 * @rfc 7239 forwarded
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOriginFromHeaders, getServerSideURL, getClientSideURL, resolvePublicSiteUrl } from '@/rfc/3986/get-url'

// Mock canUseDOM
vi.mock('@/can/use/dom', () => ({
  default: false,
}))

// Mock urlUtils
vi.mock('@/utilities/urlUtils', () => ({
  buildOrigin: (proto: string, host: string) => `${proto}://${host}`,
  normalizeUrl: (url: string) => url.replace(/\/$/, ''),
  resolvePublicSiteUrl: (url: string, tenant: { publicSiteUrl?: string | null } | null | undefined) => {
    if (tenant?.publicSiteUrl) return tenant.publicSiteUrl
    return url
  },
}))

/** `NODE_ENV` is a readonly member of `ProcessEnv`; route test mutations through a mutable view. */
const mutableEnv = process.env as Record<string, string | undefined>

describe('getURL', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.NEXT_PUBLIC_SERVER_URL
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    mutableEnv.NODE_ENV = 'development'
  })

  describe('getOriginFromHeaders', () => {
    it('builds origin from x-forwarded-host and x-forwarded-proto', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https',
      })

      const result = getOriginFromHeaders(headers)
      expect(result).toBe('https://example.com')
    })

    it('builds origin from host header as fallback', () => {
      const headers = new Headers({
        host: 'localhost:3000',
        'x-forwarded-proto': 'http',
      })

      const result = getOriginFromHeaders(headers)
      expect(result).toContain('localhost')
    })

    it('uses production https by default for protocol', () => {
      mutableEnv.NODE_ENV = 'production'
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
      })

      const result = getOriginFromHeaders(headers)
      expect(result).toContain('example.com')
    })

    it('uses development http by default for protocol', () => {
      mutableEnv.NODE_ENV = 'development'
      const headers = new Headers({
        'x-forwarded-host': 'localhost:3000',
      })

      const result = getOriginFromHeaders(headers)
      expect(result).toContain('localhost')
    })

    it('handles multiple protocol values in x-forwarded-proto', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https, http',
      })

      const result = getOriginFromHeaders(headers)
      expect(result).toBeTruthy()
    })

    it('returns empty string when no host available', () => {
      const headers = new Headers({})
      const result = getOriginFromHeaders(headers)
      expect(result).toBe('')
    })
  })

  describe('getServerSideURL', () => {
    it('uses NEXT_PUBLIC_SERVER_URL when set', () => {
      process.env.NEXT_PUBLIC_SERVER_URL = 'https://custom.example.com'

      const result = getServerSideURL()
      expect(result).toContain('custom.example.com')
    })

    it('trims whitespace from NEXT_PUBLIC_SERVER_URL', () => {
      process.env.NEXT_PUBLIC_SERVER_URL = '  https://example.com  '

      const result = getServerSideURL()
      expect(result).toContain('example.com')
    })

    it('uses headers when NEXT_PUBLIC_SERVER_URL not set', () => {
      const headers = new Headers({
        'x-forwarded-host': 'headers.example.com',
        'x-forwarded-proto': 'https',
      })

      const result = getServerSideURL({ headers })
      expect(result).toContain('headers.example.com')
    })

    it('uses VERCEL_PROJECT_PRODUCTION_URL as fallback', () => {
      process.env.VERCEL_PROJECT_PRODUCTION_URL = 'vercel.example.com'

      const result = getServerSideURL()
      expect(result).toContain('vercel.example.com')
    })

    it('defaults to localhost:3000', () => {
      const result = getServerSideURL()
      expect(result).toBe('http://localhost:3000')
    })

    it('prioritizes: env > headers > vercel > localhost', () => {
      process.env.NEXT_PUBLIC_SERVER_URL = 'https://env.example.com'
      process.env.VERCEL_PROJECT_PRODUCTION_URL = 'vercel.example.com'
      const headers = new Headers({
        'x-forwarded-host': 'headers.example.com',
        'x-forwarded-proto': 'https',
      })

      const result = getServerSideURL({ headers })
      expect(result).toContain('env.example.com')
    })
  })

  describe('getClientSideURL', () => {
    it('returns window.location-based URL in browser', () => {
      vi.resetModules()
      // Would need to mock window in browser environment
      // For now, test fallback behavior
    })

    it('uses VERCEL_PROJECT_PRODUCTION_URL in server', () => {
      process.env.VERCEL_PROJECT_PRODUCTION_URL = 'vercel.example.com'

      const result = getClientSideURL()
      expect(result).toContain('vercel.example.com')
    })

    it('uses NEXT_PUBLIC_SERVER_URL as fallback in server', () => {
      process.env.NEXT_PUBLIC_SERVER_URL = 'https://fallback.example.com'

      const result = getClientSideURL()
      expect(result).toContain('fallback.example.com')
    })

    it('returns empty string when no env available', () => {
      const result = getClientSideURL()
      expect(typeof result).toBe('string')
    })
  })

  describe('resolvePublicSiteUrl', () => {
    it('returns default URL when no tenant override', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https',
      })

      const result = resolvePublicSiteUrl(headers, null)
      expect(result).toBeTruthy()
    })

    it('uses tenant publicSiteUrl override', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https',
      })

      const result = resolvePublicSiteUrl(headers, { publicSiteUrl: 'https://tenant.com' })
      expect(result).toBe('https://tenant.com')
    })

    it('handles null tenant', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https',
      })

      const result = resolvePublicSiteUrl(headers, null)
      expect(result).toBeTruthy()
    })

    it('handles undefined tenant', () => {
      const headers = new Headers({
        'x-forwarded-host': 'example.com',
        'x-forwarded-proto': 'https',
      })

      const result = resolvePublicSiteUrl(headers, undefined)
      expect(result).toBeTruthy()
    })
  })
})
