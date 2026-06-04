import type { Collection, Endpoint } from 'payload'

import { headersWithCors } from 'payload'
import { generatePayloadCookie } from 'payload'
import { checkRateLimit, clearRateLimit, getRateLimitKey, getRateLimitResetSeconds } from '@/standards/rfc-6585'
import { apiErr, ERR, isRegistryCodedApiError } from '@/utilities/errors'

const authLoginFailed = () => apiErr(ERR.AUTH_LOGIN_FAILED)

/**
 * External-users login endpoint — POST `/api/users/external-users/login`.
 *
 * Authenticates a user against a tenant scope and issues a Payload session
 * cookie. Rate-limited per IP per username via `checkRateLimit` to mitigate
 * credential stuffing.
 *
 * @rfc 9110 http-semantics
 * @rfc 7519 jwt session-payload
 * @rfc 6265 http-state-management cookies
 * @rfc 6585 §4 too-many-requests rate-limiting
 * @standard OWASP-ASVS V2.2 authentication-throttling
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance GDPR Art.32 security-of-processing
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */
export const externalUsersLogin: Endpoint = {
  handler: async (req) => {
    let data: { [key: string]: string } = {}

    try {
      if (typeof req.json === 'function') {
        data = await req.json()
      }
    } catch (error) {
      // Log JSON parse errors for debugging
      req.payload.logger.warn({
        msg: 'Failed to parse JSON in external users login endpoint',
        endpoint: '/api/users/external-users/login',
        error: error instanceof Error ? error.message : String(error),
        contentType: req.headers.get('content-type'),
      })
      // Continue with empty data object - will fail validation below
    }
    const { password, tenantSlug, tenantDomain, username } = data

    if (!username || !password) {
      throw apiErr(ERR.AUTH_CREDENTIALS_REQUIRED)
    }

    // Rate limiting check
    const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = getRateLimitKey(username, clientIp)
    const { allowed, remaining: _remaining, resetAt } = checkRateLimit(rateLimitKey)

    if (!allowed) {
      const resetSeconds = getRateLimitResetSeconds(resetAt)
      req.payload.logger.warn({
        msg: 'Login attempt rate limited',
        username,
        ip: clientIp,
        resetSeconds,
      })
      throw apiErr(ERR.AUTH_RATE_LIMITED, {
        extra: { retryAfterSeconds: resetSeconds },
        message: `Too many sign-in attempts. Try again in ${resetSeconds} seconds.`,
      })
    }

    const fullTenant = (
      await req.payload.find({
        collection: 'tenants',
        where: tenantDomain
          ? {
              domain: {
                equals: tenantDomain,
              },
            }
          : {
              slug: {
                equals: tenantSlug,
              },
            },
      })
    ).docs[0]

    if (!fullTenant) {
      req.payload.logger.warn({
        msg: 'External login: tenant not found',
        tenantDomain,
        tenantSlug,
      })
      throw authLoginFailed()
    }

    const foundUser = await req.payload.find({
      collection: 'users',
      where: {
        or: [
          {
            and: [
              {
                email: {
                  equals: username,
                },
              },
              {
                'tenants.tenant': {
                  equals: fullTenant.id,
                },
              },
            ],
          },
          {
            and: [
              {
                username: {
                  equals: username,
                },
              },
              {
                'tenants.tenant': {
                  equals: fullTenant.id,
                },
              },
            ],
          },
        ],
      },
    })

    if (foundUser.totalDocs > 0) {
      try {
        const loginAttempt = await req.payload.login({
          collection: 'users',
          data: {
            email: foundUser.docs[0].email,
            password,
          },
          req,
        })

        if (loginAttempt?.token) {
          // Clear rate limit on successful login
          clearRateLimit(rateLimitKey)

          const collection: Collection = (req.payload.collections as { [key: string]: Collection })[
            'users'
          ]
          const cookie = generatePayloadCookie({
            collectionAuthConfig: collection.config.auth,
            cookiePrefix: req.payload.config.cookiePrefix,
            token: loginAttempt.token,
          })

          req.payload.logger.info({
            msg: 'User login successful',
            userId: loginAttempt.user?.id,
            ip: clientIp,
          })

          return Response.json(loginAttempt, {
            headers: headersWithCors({
              headers: new Headers({
                'Set-Cookie': cookie,
              }),
              req,
            }),
            status: 200,
          })
        }

        throw authLoginFailed()
      } catch (e) {
        if (isRegistryCodedApiError(e)) throw e
        req.payload.logger.warn({ err: e, msg: 'External login attempt failed' })
        throw authLoginFailed()
      }
    }

    throw authLoginFailed()
  },
  method: 'post',
  path: '/external-users/login',
}
