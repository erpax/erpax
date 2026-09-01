/**
 * Composite HTTP security-headers — defense-in-depth response hardening.
 *
 * Implements: HSTS (RFC 6797), CSP (W3C CSP 3), X-Content-Type-Options,
 * X-Frame-Options / frame-ancestors, Referrer-Policy (W3C), Permissions-Policy
 * (W3C), and the legacy X-XSS-Protection guard for older UAs.
 *
 * @rfc 6797 hsts http-strict-transport-security
 * @rfc 9110 http-semantics
 * @standard W3C CSP-3 content-security-policy
 * @standard W3C Referrer-Policy
 * @standard W3C Permissions-Policy
 * @standard OWASP-ASVS V14 configuration
 * @standard OWASP Secure-Headers-Project
 * @security ISO-27001 A.8.20 networks-security
 * @security ISO-27002 §8.20 networks-security
 * @compliance SOC-2 CC6.6 boundary-protection
 * @see docs/STANDARDS.md §4.4
 */

export interface SecurityHeadersConfig {
  hsts?: {
    maxAge: number // seconds
    includeSubDomains: boolean
    preload: boolean
  }
  csp?: {
    directives: Record<string, string>
  }
  contentType?: boolean
  frameOptions?: 'DENY' | 'SAMEORIGIN'
  xssProtection?: boolean
  referrerPolicy?: string
  permissionsPolicy?: Record<string, string[]>
}

/**
 * Default security headers configuration.
 * Balanced between security and functionality (Payload admin UI needs
 * some flexibility — `unsafe-inline` / `unsafe-eval` for the Lexical
 * editor and the admin shell).
 */
export const defaultSecurityHeaders: SecurityHeadersConfig = {
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  csp: {
    directives: {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'", // Payload admin UI + Lexical
      'style-src': "'self' 'unsafe-inline'",                 // Payload admin inline styles
      'img-src': "'self' data: https:",
      'font-src': "'self' data:",
      'connect-src': "'self'",
      'frame-ancestors': "'self'",                            // clickjacking guard
      'base-uri': "'self'",
      'form-action': "'self'",
    },
  },
  contentType: true,
  frameOptions: 'SAMEORIGIN',
  xssProtection: true,
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    geolocation: [],
    microphone: [],
    camera: [],
    payment: [],
    usb: [],
    magnetometer: [],
    gyroscope: [],
    accelerometer: [],
  },
}

/**
 * Build security headers from configuration.
 */
export function buildSecurityHeaders(
  config: SecurityHeadersConfig = defaultSecurityHeaders,
): Record<string, string> {
  const headers: Record<string, string> = {}

  if (config.hsts) {
    const { maxAge, includeSubDomains, preload } = config.hsts
    let hstsValue = `max-age=${maxAge}`
    if (includeSubDomains) hstsValue += '; includeSubDomains'
    if (preload) hstsValue += '; preload'
    headers['Strict-Transport-Security'] = hstsValue
  }

  if (config.contentType) {
    headers['X-Content-Type-Options'] = 'nosniff'
  }

  if (config.frameOptions) {
    headers['X-Frame-Options'] = config.frameOptions
  }

  if (config.xssProtection) {
    headers['X-XSS-Protection'] = '1; mode=block'
  }

  if (config.referrerPolicy) {
    headers['Referrer-Policy'] = config.referrerPolicy
  }

  if (config.csp) {
    const cspParts = Object.entries(config.csp.directives).map(
      ([key, value]) => `${key} ${value}`,
    )
    headers['Content-Security-Policy'] = cspParts.join('; ')
  }

  if (config.permissionsPolicy) {
    const permissionsParts = Object.entries(config.permissionsPolicy).map(
      ([feature, allowList]) =>
        `${feature}=(${allowList.map((item) => `"${item}"`).join(' ') || ''})`,
    )
    headers['Permissions-Policy'] = permissionsParts.join(', ')
  }

  return headers
}

/**
 * Add security headers to a Response object.
 */
export function applySecurityHeaders(
  response: Response,
  config?: SecurityHeadersConfig,
): Response {
  const headers = buildSecurityHeaders(config)
  const newResponse = new Response(response.body, response)

  Object.entries(headers).forEach(([key, value]) => {
    newResponse.headers.set(key, value)
  })

  return newResponse
}
