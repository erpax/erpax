import { describe, it, expect } from 'vitest'
import {
  normalizeUrl,
  buildOrigin,
  safeParseUrl,
  getUrlOrigin,
  ensureProtocol,
  joinUrl,
  resolvePublicSiteUrl,
} from '@/utilities/urlUtils'

describe('urlUtils', () => {
  describe('normalizeUrl', () => {
    it('removes trailing slash', () => {
      expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
    })

    it('preserves URL without trailing slash', () => {
      expect(normalizeUrl('https://example.com')).toBe('https://example.com')
    })

    it('preserves path without trailing slash', () => {
      expect(normalizeUrl('https://example.com/path')).toBe('https://example.com/path')
    })

    it('removes only trailing slash from path', () => {
      expect(normalizeUrl('https://example.com/path/')).toBe('https://example.com/path')
    })

    it('handles multiple trailing slashes', () => {
      expect(normalizeUrl('https://example.com///')).toBe('https://example.com//')
    })
  })

  describe('buildOrigin', () => {
    it('builds valid origin from protocol and host', () => {
      expect(buildOrigin('https', 'example.com')).toBe('https://example.com')
    })

    it('handles http protocol', () => {
      expect(buildOrigin('http', 'localhost:3000')).toBe('http://localhost:3000')
    })

    it('handles subdomain', () => {
      expect(buildOrigin('https', 'api.example.com')).toBe('https://api.example.com')
    })

    it('handles host with port', () => {
      expect(buildOrigin('https', 'example.com:8443')).toBe('https://example.com:8443')
    })

    it('fallback on invalid protocol', () => {
      const result = buildOrigin('invalid-proto', 'example.com')
      expect(result).toContain('example.com')
    })
  })

  describe('safeParseUrl', () => {
    it('parses valid URL', () => {
      const result = safeParseUrl('https://example.com/path?query=value')
      expect(result).toBeTruthy()
      expect(result?.origin).toBe('https://example.com')
      expect(result?.pathname).toBe('/path')
    })

    it('returns null for invalid URL', () => {
      const result = safeParseUrl('not a url')
      expect(result).toBeNull()
    })

    it('returns null for empty string', () => {
      const result = safeParseUrl('')
      expect(result).toBeNull()
    })

    it('parses relative URL with base', () => {
      // Note: relative URLs need a base
      const result = safeParseUrl('https://example.com/path')
      expect(result?.pathname).toBe('/path')
    })
  })

  describe('getUrlOrigin', () => {
    it('extracts origin from string URL', () => {
      expect(getUrlOrigin('https://example.com/path')).toBe('https://example.com')
    })

    it('extracts origin from URL object', () => {
      const url = new URL('https://example.com/path')
      expect(getUrlOrigin(url)).toBe('https://example.com')
    })

    it('handles invalid string URL gracefully', () => {
      const result = getUrlOrigin('invalid-url')
      expect(result).toEqual('invalid-url')
    })

    it('preserves port in origin', () => {
      expect(getUrlOrigin('https://example.com:8443/path')).toBe('https://example.com:8443')
    })
  })

  describe('ensureProtocol', () => {
    it('adds https to URL without protocol', () => {
      expect(ensureProtocol('example.com')).toBe('https://example.com')
    })

    it('preserves existing https protocol', () => {
      expect(ensureProtocol('https://example.com')).toBe('https://example.com')
    })

    it('preserves existing http protocol', () => {
      expect(ensureProtocol('http://example.com')).toBe('http://example.com')
    })

    it('uses custom default protocol', () => {
      expect(ensureProtocol('example.com', 'http')).toBe('http://example.com')
    })

    it('handles URL with path', () => {
      expect(ensureProtocol('example.com/path')).toBe('https://example.com/path')
    })
  })

  describe('joinUrl', () => {
    it('joins base URL with single path part', () => {
      expect(joinUrl('https://example.com', 'api')).toBe('https://example.com/api')
    })

    it('joins multiple path parts', () => {
      expect(joinUrl('https://example.com', 'api', 'users')).toBe(
        'https://example.com/api/users',
      )
    })

    it('removes leading slashes from parts', () => {
      expect(joinUrl('https://example.com', '/api', '/users')).toBe(
        'https://example.com/api/users',
      )
    })

    it('removes trailing slash from base', () => {
      expect(joinUrl('https://example.com/', 'api')).toBe('https://example.com/api')
    })

    it('handles empty parts gracefully', () => {
      expect(joinUrl('https://example.com', '', 'api')).toBe('https://example.com//api')
    })

    it('preserves existing path in base', () => {
      expect(joinUrl('https://example.com/base', 'api')).toBe('https://example.com/base/api')
    })
  })

  describe('resolvePublicSiteUrl', () => {
    it('returns URL when no tenant override', () => {
      const result = resolvePublicSiteUrl('https://example.com', null)
      expect(result).toBe('https://example.com')
    })

    it('uses tenant publicSiteUrl override', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: 'https://tenant.example.com',
      })
      expect(result).toBe('https://tenant.example.com')
    })

    it('ignores null tenant override', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: null,
      })
      expect(result).toBe('https://example.com')
    })

    it('ignores empty string tenant override', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: '',
      })
      expect(result).toBe('https://example.com')
    })

    it('trims whitespace from tenant override', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: '  https://tenant.example.com  ',
      })
      expect(result).toBe('https://tenant.example.com')
    })

    it('extracts origin from tenant publicSiteUrl', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: 'https://tenant.example.com:8443/path',
      })
      expect(result).toBe('https://tenant.example.com:8443')
    })

    it('handles invalid tenant publicSiteUrl gracefully', () => {
      const result = resolvePublicSiteUrl('https://example.com', {
        publicSiteUrl: 'not-a-url',
      })
      expect(result).toBe('not-a-url')
    })
  })
})
