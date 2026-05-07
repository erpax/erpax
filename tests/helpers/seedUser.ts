/**
 * Test User Seeding Utilities
 *
 * Helper functions for creating and cleaning up test users
 * via Payload's Local API.
 *
 * @see https://payloadcms.com/docs/test/overview
 */

import type { Payload } from 'payload'

/**
 * Standard test user credentials.
 * Use these for consistent test authentication across the test suite.
 */
export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
  name: 'Test User',
  username: 'test-user',
  roles: ['super-admin' as const, 'user' as const],
}

/**
 * Seed a test user via Payload Local API.
 *
 * This function:
 * 1. Deletes any existing user with the same email
 * 2. Creates a fresh test user with super-admin privileges
 *
 * @param payload - Initialized Payload instance
 * @returns Promise that resolves when seeding is complete
 *
 * @example
 * ```ts
 * beforeAll(async () => {
 *   payload = await getPayload({ config })
 *   await seedTestUser(payload)
 * })
 * ```
 */
export async function seedTestUser(payload: Payload): Promise<void> {
  // Delete existing test user if any (idempotent)
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
    overrideAccess: true,
  }).catch(() => {
    // Ignore errors - user may not exist
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    data: testUser,
    overrideAccess: true,
  })
}

/**
 * Clean up test user via Payload Local API.
 *
 * Call this in afterAll() to ensure test users don't pollute
 * the database between test runs.
 *
 * @param payload - Initialized Payload instance
 * @returns Promise that resolves when cleanup is complete
 */
export async function cleanupTestUser(payload: Payload): Promise<void> {
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
    overrideAccess: true,
  }).catch(() => {
    // Ignore errors - user may not exist
  })
}
