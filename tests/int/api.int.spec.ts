/**
 * API Integration Tests
 *
 * Tests core Payload CMS API functionality using the Local API.
 * These tests follow Payload's testing best practices:
 * - Use getPayload() to initialize the Payload instance
 * - Clean up resources in afterAll to prevent test pollution
 * - Test against the actual database (D1 in this case)
 *
 * @see https://payloadcms.com/docs/test/overview
 */

import { getPayload, type Payload } from 'payload'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import config from '@/payload.config'
import { cleanupTestUser, seedTestUser } from '../helpers/seedUser.js'

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
