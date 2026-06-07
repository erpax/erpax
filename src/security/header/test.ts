import { describe, expect, it } from 'vitest'
import {
  applySecurityHeaders,
  buildSecurityHeaders,
  defaultSecurityHeaders,
  type SecurityHeadersConfig,
} from '@/security/header'

// Composite HTTP security headers — pure, I/O-free functions over a config
// object. Defense-in-depth: HSTS · CSP · Referrer-Policy · Permissions-Policy
// · nosniff · frame-options, each computed from configuration, never hardcoded.
describe('security/header — composite security headers from a config object', () => {
  it('the defaults harden HSTS, CSP, frame-options and referrer-policy', () => {
    expect(defaultSecurityHeaders.hsts?.maxAge).toBe(31536000)
    expect(defaultSecurityHeaders.hsts?.includeSubDomains).toBe(true)
    expect(defaultSecurityHeaders.hsts?.preload).toBe(true)
    expect(defaultSecurityHeaders.frameOptions).toBe('SAMEORIGIN')
    expect(defaultSecurityHeaders.referrerPolicy).toBe('strict-origin-when-cross-origin')
    expect(defaultSecurityHeaders.csp?.directives['default-src']).toBe("'self'")
  })

  it('builds the default header set', () => {
    const h = buildSecurityHeaders()
    expect(h['Strict-Transport-Security']).toBe('max-age=31536000; includeSubDomains; preload')
    expect(h['X-Content-Type-Options']).toBe('nosniff')
    expect(h['X-Frame-Options']).toBe('SAMEORIGIN')
    expect(h['X-XSS-Protection']).toBe('1; mode=block')
    expect(h['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
    expect(h['Content-Security-Policy']).toContain("default-src 'self'")
    expect(h['Content-Security-Policy']).toContain("frame-ancestors 'self'")
  })

  it('HSTS directives are gated by their flags', () => {
    const h = buildSecurityHeaders({
      hsts: { maxAge: 600, includeSubDomains: false, preload: false },
    })
    expect(h['Strict-Transport-Security']).toBe('max-age=600')
  })

  it('CSP is serialized as semicolon-joined "directive value" pairs', () => {
    const h = buildSecurityHeaders({
      csp: { directives: { 'default-src': "'none'", 'img-src': 'https:' } },
    })
    expect(h['Content-Security-Policy']).toBe("default-src 'none'; img-src https:")
  })

  it('Permissions-Policy denies all listed sensitive features by default', () => {
    const h = buildSecurityHeaders()
    const pp = h['Permissions-Policy']
    expect(pp).toContain('geolocation=()')
    expect(pp).toContain('camera=()')
    expect(pp).toContain('payment=()')
  })

  it('Permissions-Policy quotes each entry in a feature allow-list', () => {
    const h = buildSecurityHeaders({
      permissionsPolicy: { camera: ['self', 'https://x.example'] },
    })
    expect(h['Permissions-Policy']).toBe('camera=("self" "https://x.example")')
  })

  it('omits a header when its config slice is absent (config-driven, not hardcoded)', () => {
    const cfg: SecurityHeadersConfig = { contentType: true }
    const h = buildSecurityHeaders(cfg)
    expect(h['X-Content-Type-Options']).toBe('nosniff')
    expect(h['Strict-Transport-Security']).toBeUndefined()
    expect(h['Content-Security-Policy']).toBeUndefined()
    expect(h['X-Frame-Options']).toBeUndefined()
    expect(h['Referrer-Policy']).toBeUndefined()
    expect(h['Permissions-Policy']).toBeUndefined()
  })

  it('boolean toggles drop their header when falsy', () => {
    const h = buildSecurityHeaders({ contentType: false, xssProtection: false })
    expect(h['X-Content-Type-Options']).toBeUndefined()
    expect(h['X-XSS-Protection']).toBeUndefined()
  })

  it('applySecurityHeaders sets every built header on the response', () => {
    const res = applySecurityHeaders(new Response('body'))
    expect(res.headers.get('Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains; preload',
    )
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(res.headers.get('Content-Security-Policy')).toContain("default-src 'self'")
  })

  it('applySecurityHeaders preserves the response body', async () => {
    const res = applySecurityHeaders(new Response('hello-world'))
    expect(await res.text()).toBe('hello-world')
  })
})
