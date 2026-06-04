import type { CollectionAfterLoginHook } from 'payload'

import { mergeHeaders, generateCookie, getCookieExpiration } from 'payload'

/** Payload's mergeHeaders expects Web Headers (forEach); coerce so login never throws here. */
function asHeaders(value: unknown): Headers {
  if (!value) return new Headers()
  if (value instanceof Headers) return value
  try {
    return new Headers(value as HeadersInit)
  } catch {
    return new Headers()
  }
}

/**
 * After-login hook — set the session cookie domain attribute based on the
 * request `Host` header so per-tenant subdomains share a session correctly.
 *
 * @rfc 6265 http-state-management cookies
 * @rfc 6265bis cookie-domain-attribute
 * @rfc 9110 http-semantics host-header
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */
export const setCookieBasedOnDomain: CollectionAfterLoginHook = async ({ req, user }) => {
  try {
    const hostHeader = req.headers.get('host')
    if (!hostHeader?.trim()) {
      return user
    }
    const hostNoPort = hostHeader.split(':')[0]

    const relatedOrg = await req.payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 1,
      where: {
        or: [
          { domain: { equals: hostHeader } },
          ...(hostNoPort !== hostHeader ? [{ domain: { equals: hostNoPort } }] : []),
        ],
      },
    })

    if (relatedOrg?.docs?.length) {
      const tenantCookie = generateCookie({
        name: 'payload-tenant',
        expires: getCookieExpiration({ seconds: 7200 }),
        path: '/',
        returnCookieAsObject: false,
        value: String(relatedOrg.docs[0].id),
      })

      const newHeaders = new Headers({
        'Set-Cookie': tenantCookie as string,
      })

      req.responseHeaders = mergeHeaders(asHeaders(req.responseHeaders), newHeaders)
    }
  } catch (err) {
    req.payload.logger?.error?.(err)
  }

  return user
}
