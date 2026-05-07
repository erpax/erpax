import { PayloadSDK } from '@payloadcms/sdk'

import type { Config } from '@/payload-types'
import canUseDOM from '@/utilities/canUseDOM'
import { getClientSideURL, getServerSideURL } from '@/utilities/getURL'

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
