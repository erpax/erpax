/**
 * Security headers configuration
 * Applied to all responses for defense-in-depth protection
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
 * Default security headers configuration
 * Balanced between security and functionality (Payload admin UI needs some flexibility)
 */
export const defaultSecurityHeaders: SecurityHeadersConfig = {
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  csp: {
    directives: {
      "default-src": "'self'",
      "script-src": "'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-* for Payload admin UI and Lexical editor
      "style-src": "'self' 'unsafe-inline'", // Payload admin UI uses inline styles
      "img-src": "'self' data: https:",
      "font-src": "'self' data:",
      "connect-src": "'self'", // API calls
      "frame-ancestors": "'self'", // Prevent clickjacking
      "base-uri": "'self'",
      "form-action": "'self'",
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
 * Build security headers from configuration
 */
export function buildSecurityHeaders(config: SecurityHeadersConfig = defaultSecurityHeaders): Record<string, string> {
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
    const cspParts = Object.entries(config.csp.directives).map(([key, value]) => `${key} ${value}`)
    headers['Content-Security-Policy'] = cspParts.join('; ')
  }

  if (config.permissionsPolicy) {
    const permissionsParts = Object.entries(config.permissionsPolicy).map(
      ([feature, allowList]) => `${feature}=(${allowList.map((item) => `"${item}"`).join(' ') || ''})`,
    )
    headers['Permissions-Policy'] = permissionsParts.join(', ')
  }

  return headers
}

/**
 * Add security headers to a Response object
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
