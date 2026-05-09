/**
 * Payload REST SDK wired to in-process Next REST handlers (no HTTP server).
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @rfc 9110 http-semantics
 * @rfc 8259 json
 * @rfc 7519 jwt session-token
 * @standard OpenAPI 3.1 api-description
 * @see https://github.com/payloadcms/payload/tree/main/packages/sdk (constructor `fetch` example)
 * @see docs/STANDARDS.md §4.3 §7
 */

import {
  REST_DELETE,
  REST_GET,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import { PayloadSDK } from '@payloadcms/sdk'

import type { Config } from '@/payload-types'
import config from '@/payload.config'
import { getServerSideURL } from '@/standards/rfc-3986/get-url'

import { testUser } from './seedUser'

function parseHref(href: string): URL {
  try {
    return new URL(href)
  } catch {
    return new URL(href, 'http://localhost')
  }
}

/**
 * Typed Payload SDK whose fetch calls `@payloadcms/next` REST route handlers directly.
 */
export async function createPayloadSdkRest(): Promise<PayloadSDK<Config>> {
  const awaitedConfig = await config
  const serverURL = (awaitedConfig.serverURL || getServerSideURL()).replace(/\/$/, '')
  const apiRoute = awaitedConfig.routes?.api || '/api'
  const baseURL = `${serverURL}${apiRoute}`

  const handlers = {
    DELETE: REST_DELETE(config),
    GET: REST_GET(config),
    PATCH: REST_PATCH(config),
    POST: REST_POST(config),
    PUT: REST_PUT(config),
  }

  const fetchImpl: typeof fetch = (input, init) => {
    const href =
      typeof input === 'string'
        ? input
        : input instanceof Request
          ? input.url
          : input.href
    const url = parseHref(href)
    const pathname = url.pathname
    const search = url.search
    const apiPrefix = `${new URL(serverURL).pathname.replace(/\/$/, '')}${apiRoute}`
    const normalizedPrefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`
    const slugSegment = pathname.startsWith(normalizedPrefix + '/')
      ? pathname.slice(normalizedPrefix.length + 1)
      : pathname.startsWith(normalizedPrefix)
        ? ''
        : pathname.replace(/^\//, '').replace(/^api\/?/, '')
    const slug = slugSegment.split('/').filter(Boolean)

    const method = String(init?.method ?? 'GET').toUpperCase()
    const handler = handlers[method as keyof typeof handlers]
    if (!handler) {
      return Promise.reject(new Error(`Unsupported HTTP method for Payload REST fetch: ${method}`))
    }

    const request = new Request(`${serverURL}${pathname}${search}`, init)
    return handler(request, { params: Promise.resolve({ slug }) }) as Promise<Response>
  }

  return new PayloadSDK<Config>({
    baseURL,
    fetch: fetchImpl,
  })
}

/**
 * Returns an SDK instance that sends the JWT from login on each request.
 */
export async function loginAsTestUser(sdk: PayloadSDK<Config>): Promise<PayloadSDK<Config>> {
  const res = await sdk.login({
    collection: 'users',
    data: { email: testUser.email, password: testUser.password },
  })
  if (!res.token) {
    throw new Error('Login did not return a token; ensure seedTestUser() ran and credentials match.')
  }
  return new PayloadSDK<Config>({
    baseURL: sdk.baseURL,
    fetch: sdk.fetch,
    baseInit: {
      headers: {
        Authorization: `JWT ${res.token}`,
      },
    },
  })
}
