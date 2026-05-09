/**
 * Security headers middleware
 * Applied to all Next.js responses
 *
 * This is a wrapper that can be chained with other middleware
 */

import { applySecurityHeaders, defaultSecurityHeaders } from '@/standards/_security-headers'

/**
 * Middleware function to apply security headers
 * Import and use in your route handlers or middleware chain
 *
 * Example in API route:
 * ```typescript
 * import { applySecurityHeadersMiddleware } from '@/middleware-security'
 *
 * export async function GET(req: NextRequest) {
 *   const response = new Response('...')
 *   return applySecurityHeadersMiddleware(response)
 * }
 * ```
 */
export function applySecurityHeadersMiddleware(response: Response): Response {
  return applySecurityHeaders(response, defaultSecurityHeaders)
}

/**
 * Note: For global application of security headers to all responses including
 * static assets, consider using Cloudflare Workers rules or configuring headers
 * in your hosting platform (Vercel, etc.).
 *
 * Cloudflare Example (wrangler.toml):
 * ```toml
 * [[env.production.routes]]
 * pattern = "*.erpax.bg/*"
 * zone_id = "your-zone-id"
 * custom_domain = true
 *
 * [env.production.custom_headers]
 * X-Content-Type-Options = "nosniff"
 * X-Frame-Options = "SAMEORIGIN"
 * Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
 * Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
 * ```
 */
