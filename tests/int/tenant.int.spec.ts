import type { PayloadSDK } from '@payloadcms/sdk'
import { getPayload, Payload } from 'payload'

import config from '@/payload.config'
import type { Config } from '@/payload-types'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import { createPayloadSdkRest, loginAsTestUser } from '../helpers/payloadSdkRest'
import { cleanupTestTenantById } from '../helpers/seedTenant'
import { cleanupTestUser, seedTestUser } from '../helpers/seedUser'

const TEST_TENANT_PREFIX = 'test-tenant-int'

/**
 * Multi-tenant CRUD via `@payloadcms/sdk` (REST) + tenant bootstrap via Local API.
 *
 * Tenant `locales` are stored as JSON on `tenants` (not a select/hasMany junction) so
 * D1/Drizzle tenant writes stay compatible with this adapter.
 *
 * @see tests/int/payloadSdkRest.int.spec.ts — SDK smoke test without `tenants`
 */
describe('Tenant-scoped Operations', () => {
  let payload: Payload
  let sdk: PayloadSDK<Config>
  let testTenantId: number

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    await seedTestUser(payload)

    const tenantSlug = `${TEST_TENANT_PREFIX}-${Date.now()}`
    const tenant = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Test Tenant',
        slug: tenantSlug,
      },
      overrideAccess: true,
    })
    testTenantId = tenant.id as number

    const rawSdk = await createPayloadSdkRest()
    sdk = await loginAsTestUser(rawSdk)
  })

  afterAll(async () => {
    await cleanupTestTenantById(payload, testTenantId)
    await cleanupTestUser(payload)
    if (payload?.db?.destroy) {
      await payload.db.destroy()
    }
  })

  it('creates tenant-scoped page', async () => {
    const uniqueSlug = `test-tenant-page-${Date.now()}`
    const page = await sdk.create({
      collection: 'pages',
      data: {
        title: 'Test Tenant Page',
        slug: uniqueSlug,
        _status: 'published',
        tenant: testTenantId,
        layout: [
          {
            blockType: 'content',
            columns: [
              {
                richText: {
                  root: {
                    type: 'root',
                    children: [{ type: 'paragraph', children: [{ text: 'Test content' }] }],
                  },
                },
              },
            ],
          },
        ],
      } as Config['collections']['pages'],
    })

    expect(page).toBeDefined()
    expect(page.id).toBeDefined()
  })

  it('finds tenant-scoped pages', async () => {
    const pages = await sdk.find({
      collection: 'pages',
      limit: 10,
    })

    expect(pages).toBeDefined()
    expect(Array.isArray(pages.docs)).toBe(true)
  })

  it('creates tenant-scoped post', async () => {
    const uniqueSlug = `test-tenant-post-${Date.now()}`
    const post = await sdk.create({
      collection: 'posts',
      data: {
        title: 'Test Tenant Post',
        slug: uniqueSlug,
        _status: 'published',
        tenant: testTenantId,
        content: {
          root: {
            type: 'root',
            children: [{ type: 'paragraph', children: [{ text: 'Test content' }] }],
          },
        },
      } as Config['collections']['posts'],
    })

    expect(post).toBeDefined()
    expect(post.id).toBeDefined()
  })

  it('finds tenant-scoped posts', async () => {
    const posts = await sdk.find({
      collection: 'posts',
      limit: 10,
    })

    expect(posts).toBeDefined()
    expect(Array.isArray(posts.docs)).toBe(true)
  })

  it('lists media via tenant-scoped SDK find', async () => {
    const media = await sdk.find({
      collection: 'media',
      limit: 1,
    })

    expect(media).toBeDefined()
    expect(Array.isArray(media.docs)).toBe(true)
  })
})
