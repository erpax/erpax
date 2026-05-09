/**
 * Server / browser origin resolution — Workers / Next.js compatible.
 *
 * @rfc 3986 uniform-resource-identifier
 * @rfc 9110 http-semantics host-header
 * @rfc 7239 forwarded http-extension
 * @standard W3C URL Living Standard
 * @see ./url-utils.ts
 */

import canUseDOM from '@/utilities/canUseDOM'
import { buildOrigin, normalizeUrl, resolvePublicSiteUrl as resolvePublicSiteUrlUtil } from './url-utils'

/** Optional headers from `next/headers` or Web `Request` — used when `NEXT_PUBLIC_SERVER_URL` is unset. */
export type ServerOriginOptions = {
  headers?: Headers
}

/**
 * Best-effort origin from incoming request headers (Workers / Next).
 * Prefer `NEXT_PUBLIC_SERVER_URL` via {@link getServerSideURL} when you
 * need a stable canonical URL.
 *
 * @rfc 7239 forwarded x-forwarded-host x-forwarded-proto
 */
export function getOriginFromHeaders(headers: Headers): string {
  const host = headers.get('x-forwarded-host') ?? headers.get('host') ?? ''
  if (!host) return ''

  const forwardedProto = headers.get('x-forwarded-proto')
  const proto =
    forwardedProto?.split(',')[0]?.trim() ||
    (process.env.NODE_ENV === 'production' ? 'https' : 'http')

  return buildOrigin(proto, host)
}

/**
 * Server-side base URL for links, OG URLs, and ecommerce client `serverURL`.
 * Order: explicit env → request Host / X-Forwarded-* → Vercel → localhost.
 */
export const getServerSideURL = (options?: ServerOriginOptions): string => {
  const envUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (envUrl) {
    return normalizeUrl(envUrl)
  }

  if (options?.headers) {
    const fromHeaders = getOriginFromHeaders(options.headers)
    if (fromHeaders) return fromHeaders
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeUrl(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

/**
 * Canonical public site origin for the current request: tenant override,
 * else request host, else env fallbacks.
 */
export function resolvePublicSiteUrl(
  headers: Headers,
  tenant: { publicSiteUrl?: string | null } | null | undefined,
): string {
  return resolvePublicSiteUrlUtil(getServerSideURL({ headers }), tenant)
}
