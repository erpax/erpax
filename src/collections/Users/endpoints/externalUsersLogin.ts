import type { Collection, Endpoint } from 'payload'

import { headersWithCors } from '@payloadcms/next/utilities'
import { APIError, generatePayloadCookie } from 'payload'
import { checkRateLimit, clearRateLimit, getRateLimitKey, getRateLimitResetSeconds } from '@/utilities/rateLimit'

// A custom endpoint that can be reached by POST request
// at: /api/users/external-users/login
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
      throw new APIError('Username and Password are required for login.', 400, null, true)
    }

    // Rate limiting check
    const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = getRateLimitKey(username, clientIp)
    const { allowed, remaining, resetAt } = checkRateLimit(rateLimitKey)

    if (!allowed) {
      const resetSeconds = getRateLimitResetSeconds(resetAt)
      req.payload.logger.warn({
        msg: 'Login attempt rate limited',
        username,
        ip: clientIp,
        resetSeconds,
      })
      throw new APIError(
        `Too many login attempts. Please try again in ${resetSeconds} seconds.`,
        429, // Too Many Requests
        null,
        true,
      )
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

        throw new APIError(
          'Unable to login with the provided username and password.',
          400,
          null,
          true,
        )
      } catch (e) {
        throw new APIError(
          'Unable to login with the provided username and password.',
          400,
          null,
          true,
        )
      }
    }

    throw new APIError('Unable to login with the provided username and password.', 400, null, true)
  },
  method: 'post',
  path: '/external-users/login',
}
