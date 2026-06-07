import { describe, it, expect } from 'vitest'
import {
  normalizeUrl,
  buildOrigin,
  safeParseUrl,
  getUrlOrigin,
  ensureProtocol,
  joinUrl,
  resolvePublicSiteUrl,
} from '@/rfc/3986'

// RFC 3986 generic-syntax URI primitives — pure, delegate to the URL class.
describe('rfc/3986 — URI primitives (parse, origin, join, scheme)', () => {
  it('normalizeUrl strips exactly one trailing slash', () => {
    expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
    expect(normalizeUrl('https://example.com')).toBe('https://example.com')
  })

  it('buildOrigin yields a scheme://host origin with no path', () => {
    expect(buildOrigin('https', 'example.com')).toBe('https://example.com')
  })

  it('safeParseUrl returns a URL on valid input, null on garbage', () => {
    expect(safeParseUrl('https://example.com')).toBeInstanceOf(URL)
    expect(safeParseUrl('not a url')).toBeNull()
  })

  it('getUrlOrigin extracts origin from both strings and URL objects', () => {
    expect(getUrlOrigin('https://example.com/a/b?q=1')).toBe('https://example.com')
    expect(getUrlOrigin(new URL('https://example.com/x'))).toBe('https://example.com')
  })

  it('ensureProtocol prepends the default scheme only when absent', () => {
    expect(ensureProtocol('example.com')).toBe('https://example.com')
    expect(ensureProtocol('http://example.com')).toBe('http://example.com')
    expect(ensureProtocol('https://example.com')).toBe('https://example.com')
  })

  it('joinUrl collapses redundant slashes between segments', () => {
    expect(joinUrl('https://example.com/', '/api', 'users/')).toBe(
      'https://example.com/api/users',
    )
  })

  it('resolvePublicSiteUrl prefers the tenant override origin over the fallback', () => {
    expect(
      resolvePublicSiteUrl('https://fallback.com', { publicSiteUrl: 'https://tenant.com/path' }),
    ).toBe('https://tenant.com')
    expect(resolvePublicSiteUrl('https://fallback.com', null)).toBe('https://fallback.com')
    expect(resolvePublicSiteUrl('https://fallback.com', { publicSiteUrl: '  ' })).toBe(
      'https://fallback.com',
    )
  })
})
