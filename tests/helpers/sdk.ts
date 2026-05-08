import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@/payload-types'

const baseURL = process.env.PAYLOAD_SERVER_URL || 'http://localhost:3000'

/**
 * Payload REST SDK (`@payloadcms/sdk`) pointed at a running dev server — for e2e
 * seeds and scripts that call `http…/api`.
 *
 * For Vitest without a server, use {@link createPayloadSdkRest} in
 * `payloadSdkRest.ts` (in-process Next REST handlers).
 */
export const sdk = new PayloadSDK<Config>({
  baseURL: `${baseURL.replace(/\/$/, '')}/api`,
  baseInit: { credentials: 'include' },
})

export { createPayloadSdkRest, loginAsTestUser } from './payloadSdkRest'
