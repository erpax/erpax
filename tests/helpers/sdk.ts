import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@/payload-types'

const baseURL = process.env.PAYLOAD_SERVER_URL || 'http://localhost:3000'

/**
 * Payload REST SDK for test setup/teardown.
 * Use this to seed data via API before e2e tests, or for integration tests.
 */
export const sdk = new PayloadSDK<Config>({
  baseURL: `${baseURL.replace(/\/$/, '')}/api`,
  baseInit: { credentials: 'include' },
})
