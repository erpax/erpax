/**
 * URL utility functions for consistent handling across the application
 * Centralizes URL normalization, parsing, and origin resolution
 */

/**
 * Remove trailing slash from URL
 * @example normalizeUrl('https://example.com/') → 'https://example.com'
 */
export function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '')
}

/**
 * Build URL origin from protocol and host with error handling
 * @example buildOrigin('https', 'example.com') → 'https://example.com'
 */
export function buildOrigin(proto: string, host: string): string {
  try {
    return new URL(`${proto}://${host}`).origin
  } catch {
    return normalizeUrl(`${proto}://${host}`)
  }
}

/**
 * Safely parse a URL string, returns null on invalid input
 * @example safeParseUrl('https://example.com') → URL object
 * @example safeParseUrl('invalid') → null
 */
export function safeParseUrl(url: string): URL | null {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

/**
 * Get URL origin from string or URL object
 * Handles both URL objects and string URLs with fallback
 * @example getUrlOrigin('https://example.com/path') → 'https://example.com'
 * @example getUrlOrigin(new URL('https://example.com')) → 'https://example.com'
 */
export function getUrlOrigin(url: string | URL): string {
  if (typeof url === 'string') {
    const parsed = safeParseUrl(url)
    return parsed?.origin || normalizeUrl(url)
  }
  return url.origin
}

/**
 * Ensure URL has protocol prefix
 * @example ensureProtocol('example.com') → 'https://example.com'
 * @example ensureProtocol('https://example.com') → 'https://example.com'
 */
export function ensureProtocol(url: string, defaultProto = 'https'): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${defaultProto}://${url}`
}

/**
 * Join URL parts safely (avoids double slashes)
 * @example joinUrl('https://example.com', '/api', 'users') → 'https://example.com/api/users'
 */
export function joinUrl(base: string, ...parts: string[]): string {
  let result = normalizeUrl(base)
  for (const part of parts) {
    result = `${result}/${part.replace(/^\/+|\/+$/g, '')}`
  }
  return result
}

/**
 * Resolve public site URL with tenant override support
 * Priority: tenant override > explicit URL > default fallback
 * @example resolvePublicSiteUrl('https://example.com', { publicSiteUrl: 'https://tenant.com' }) → 'https://tenant.com'
 */
export function resolvePublicSiteUrl(
  url: string,
  tenant: { publicSiteUrl?: string | null } | null | undefined,
): string {
  const tenantUrl = tenant?.publicSiteUrl?.trim()
  if (tenantUrl) {
    const parsed = safeParseUrl(tenantUrl)
    return parsed ? parsed.origin : normalizeUrl(tenantUrl)
  }
  return url
}
