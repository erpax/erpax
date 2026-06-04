/**
 * Composite security-headers tests — HSTS, CSP, Permissions-Policy, etc.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 6797 hsts http-strict-transport-security
 * @standard W3C CSP-3 content-security-policy
 * @standard W3C Referrer-Policy
 * @standard W3C Permissions-Policy
 * @standard OWASP-ASVS V14 configuration
 * @see src/standards/_security-headers/headers.ts
 */

import { describe, expect, it } from 'vitest'
import {
  applySecurityHeaders,
  buildSecurityHeaders,
  defaultSecurityHeaders,
} from '@/security/header'

describe('_security-headers — defaultSecurityHeaders', () => {
  it('opts into 1-year HSTS with includeSubDomains and preload (RFC 6797)', () => {
    expect(defaultSecurityHeaders.hsts).toEqual({
      maxAge: 31_536_000,
      includeSubDomains: true,
      preload: true,
    })
  })
  it('declares restrictive permissions-policy with empty allow-lists', () => {
    const policy = defaultSecurityHeaders.permissionsPolicy ?? {}
    for (const feature of [
      'geolocation',
      'microphone',
      'camera',
      'payment',
      'usb',
      'magnetometer',
      'gyroscope',
      'accelerometer',
    ]) {
      expect(policy[feature]).toEqual([])
    }
  })
  it('uses strict-origin-when-cross-origin Referrer-Policy (W3C)', () => {
    expect(defaultSecurityHeaders.referrerPolicy).toBe('strict-origin-when-cross-origin')
  })
  it('uses SAMEORIGIN frame-options as clickjacking guard', () => {
    expect(defaultSecurityHeaders.frameOptions).toBe('SAMEORIGIN')
  })
})

describe('_security-headers — buildSecurityHeaders', () => {
  it('emits Strict-Transport-Security with all flags wired in', () => {
    const h = buildSecurityHeaders()
    expect(h['Strict-Transport-Security']).toBe(
      'max-age=31536000; includeSubDomains; preload',
    )
  })
  it('omits includeSubDomains and preload when disabled', () => {
    const h = buildSecurityHeaders({
      hsts: { maxAge: 600, includeSubDomains: false, preload: false },
    })
    expect(h['Strict-Transport-Security']).toBe('max-age=600')
  })
  it('emits X-Content-Type-Options: nosniff', () => {
    expect(buildSecurityHeaders()['X-Content-Type-Options']).toBe('nosniff')
  })
  it('emits X-Frame-Options matching config', () => {
    expect(buildSecurityHeaders({ frameOptions: 'DENY' })['X-Frame-Options']).toBe('DENY')
    expect(buildSecurityHeaders({ frameOptions: 'SAMEORIGIN' })['X-Frame-Options']).toBe(
      'SAMEORIGIN',
    )
  })
  it('emits legacy X-XSS-Protection only when enabled', () => {
    expect(buildSecurityHeaders({ xssProtection: true })['X-XSS-Protection']).toBe(
      '1; mode=block',
    )
    expect(buildSecurityHeaders({ xssProtection: false })['X-XSS-Protection']).toBeUndefined()
  })
  it('joins CSP directives with "; " (W3C CSP-3 §3)', () => {
    const h = buildSecurityHeaders({
      csp: { directives: { 'default-src': "'self'", 'frame-ancestors': "'none'" } },
    })
    expect(h['Content-Security-Policy']).toBe(
      "default-src 'self'; frame-ancestors 'none'",
    )
  })
  it('emits frame-ancestors as the canonical clickjacking guard in default CSP', () => {
    const h = buildSecurityHeaders()
    expect(h['Content-Security-Policy']).toContain("frame-ancestors 'self'")
  })
  it('emits Permissions-Policy as comma-separated feature=(allowlist) pairs', () => {
    const h = buildSecurityHeaders({
      permissionsPolicy: { geolocation: [], camera: ['"self"'] },
    })
    // empty allow-list → "()", populated allow-list → quoted entries
    expect(h['Permissions-Policy']).toContain('geolocation=()')
    expect(h['Permissions-Policy']).toContain('camera=("')
  })
  it('omits a header entirely when its config slice is missing', () => {
    const h = buildSecurityHeaders({ contentType: true })
    expect(h['X-Content-Type-Options']).toBe('nosniff')
    expect(h['Strict-Transport-Security']).toBeUndefined()
    expect(h['Content-Security-Policy']).toBeUndefined()
    expect(h['Permissions-Policy']).toBeUndefined()
  })
})

describe('_security-headers — applySecurityHeaders', () => {
  it('returns a new Response with every default header set', () => {
    const original = new Response('hi', { status: 200 })
    const wrapped = applySecurityHeaders(original)
    expect(wrapped.headers.get('Strict-Transport-Security')).toBeTruthy()
    expect(wrapped.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(wrapped.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
    expect(wrapped.headers.get('Content-Security-Policy')).toBeTruthy()
    expect(wrapped.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
    expect(wrapped.headers.get('Permissions-Policy')).toBeTruthy()
  })
  it('preserves the original status code', () => {
    const wrapped = applySecurityHeaders(new Response('x', { status: 418 }))
    expect(wrapped.status).toBe(418)
  })
  it('accepts a custom config and emits matching headers', () => {
    const wrapped = applySecurityHeaders(new Response('x'), {
      contentType: true,
      frameOptions: 'DENY',
    })
    expect(wrapped.headers.get('X-Frame-Options')).toBe('DENY')
    expect(wrapped.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(wrapped.headers.get('Content-Security-Policy')).toBeNull()
  })
})
