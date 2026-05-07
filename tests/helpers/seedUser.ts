import type { Payload } from 'payload'

import type configModule from '../../src/payload.config.js'

export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
  name: 'E2E',
  username: 'e2e-user',
  roles: ['super-admin' as const, 'user' as const],
}

async function loadPayload(): Promise<{ getPayload: typeof import('payload').getPayload; config: typeof configModule }> {
  process.env.PAYLOAD_DEV_PUSH = 'false'
  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../../src/payload.config.js'),
  ])
  return { getPayload, config }
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  const { getPayload, config } = await loadPayload()
  const payload: Payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
    overrideAccess: true,
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    data: testUser,
    overrideAccess: true,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const { getPayload, config } = await loadPayload()
  const payload: Payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
    overrideAccess: true,
  })
}
