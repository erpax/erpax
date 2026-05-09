/**
 * Payload SDK REST integration tests — verifies @payloadcms/sdk runs against
 * the in-process Next REST handlers.
 *
 * @standard ISO/IEC-29119:2022 software-testing integration-test-level
 * @rfc 9110 http-semantics
 * @rfc 7519 jwt session-token
 * @rfc 8259 json
 * @standard OpenAPI 3.1 api-description
 * @see docs/STANDARDS.md §4.3 §7
 */

import { getPayload } from 'payload'

import config from '@/payload.config'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import { createPayloadSdkRest, loginAsTestUser } from '../helpers/payloadSdkRest'
import { cleanupTestUser, seedTestUser, testUser } from '../helpers/seedUser'

/**
 * Verifies `@payloadcms/sdk` works against in-process Next REST handlers (see
 * `tests/helpers/payloadSdkRest.ts`). Does not touch the `tenants` collection.
 */
describe('Payload REST SDK (in-process)', () => {
  let cleanupPayload: Awaited<ReturnType<typeof getPayload>>

  beforeAll(async () => {
    cleanupPayload = await getPayload({ config: await config })
    await seedTestUser(cleanupPayload)
  })

  afterAll(async () => {
    await cleanupTestUser(cleanupPayload)
    if (cleanupPayload?.db?.destroy) {
      await cleanupPayload.db.destroy()
    }
  })

  it('logs in via SDK and returns /users/me', async () => {
    const rawSdk = await createPayloadSdkRest()
    const sdk = await loginAsTestUser(rawSdk)
    const me = await sdk.me({ collection: 'users' })
    expect(me.user?.email).toBe(testUser.email)
  })
})
