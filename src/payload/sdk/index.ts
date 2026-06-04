/**
 * Payload REST SDK factory — resolves the API base URL per runtime, then
 * issues a singleton in browser contexts and a fresh instance in server
 * contexts.
 *
 * @rfc 3986 uri base-url-resolution
 * @rfc 9110 http-semantics
 * @rfc 6265 http-state-management cookies-credentials-include
 * @security ISO-27002 §8.5 secure-authentication
 * @see src/standards/rfc-3986/
 */

import { PayloadSDK } from '@payloadcms/sdk'

import type { Config } from '@/payload-types'
import canUseDOM from '@/can/use/dom'
import { getClientSideURL, getServerSideURL } from '@/rfc/3986/get-url'

function apiBaseURL(): string {
  const origin = canUseDOM
    ? getClientSideURL()
    : process.env.NEXT_PUBLIC_SERVER_URL || getServerSideURL()
  return `${origin.replace(/\/$/, '')}/api`
}

let browserSdk: PayloadSDK<Config> | undefined

/**
 * Payload REST SDK — same operations as the Local API, over HTTP ([docs](https://github.com/payloadcms/payload/tree/main/packages/sdk)).
 * Use on the server (Route Handlers, Server Components) and in client components; base URL resolves per runtime.
 */
export function getPayloadSdk(): PayloadSDK<Config> {
  if (canUseDOM) {
    if (!browserSdk) {
      browserSdk = new PayloadSDK<Config>({
        baseInit: { credentials: 'include' },
        baseURL: apiBaseURL(),
      })
    }
    return browserSdk
  }

  return new PayloadSDK<Config>({
    baseInit: { credentials: 'include' },
    baseURL: apiBaseURL(),
  })
}
