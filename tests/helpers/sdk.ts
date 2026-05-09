/**
 * Payload REST SDK helper for e2e seeds — points at a running dev server.
 *
 * For Vitest without a server, use `createPayloadSdkRest` in `payloadSdkRest.ts`.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @rfc 9110 http-semantics
 * @rfc 8259 json
 * @rfc 7519 jwt session-token
 * @standard OpenAPI 3.1 api-description
 * @see docs/STANDARDS.md §4.3 §7
 */

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
