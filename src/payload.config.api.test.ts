/**
 * API Integration Tests — Payload CMS Local API end-to-end.
 *
 * Use `getPayload()` to initialize, clean up in `afterAll` to prevent test
 * pollution, run against the actual D1 database.
 *
 * @standard ISO/IEC-29119:2022 software-testing integration-test-level
 * @rfc 9110 http-semantics
 * @rfc 7807 problem-details-for-http-apis
 * @standard OpenAPI 3.1 api-description
 * @see https://payloadcms.com/docs/test/overview
 */

import { getPayload, type Payload } from 'payload'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import config from '@/payload'
import { cleanupTestUser, seedTestUser } from '../tests/helpers/seedUser.js'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    await seedTestUser(payload)
  })

  afterAll(async () => {
    await cleanupTestUser(payload)
    // Close database connection to allow clean exit
    if (payload?.db?.destroy) {
      await payload.db.destroy()
    }
  })

  it('should fetch users collection', async () => {
    const users = await payload.find({
      collection: 'users',
    })

    expect(users).toBeDefined()
    expect(users.docs).toBeInstanceOf(Array)
    expect(users.docs.length).toBeGreaterThan(0)
  })

  it('should return proper pagination metadata', async () => {
    const users = await payload.find({
      collection: 'users',
      limit: 10,
    })

    expect(users).toHaveProperty('totalDocs')
    expect(users).toHaveProperty('totalPages')
    expect(users).toHaveProperty('page')
    expect(users).toHaveProperty('pagingCounter')
    expect(users).toHaveProperty('hasPrevPage')
    expect(users).toHaveProperty('hasNextPage')
    expect(users).toHaveProperty('prevPage')
    expect(users).toHaveProperty('nextPage')
  })
})
