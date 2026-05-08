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
