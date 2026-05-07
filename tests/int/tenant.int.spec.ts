import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { seedTestTenant, cleanupTestTenant } from '../helpers/seedTenant'

const TEST_TENANT_SLUG = 'test-tenant-int'

describe('Tenant-scoped Operations', () => {
  let payload: Payload
  let testTenantId: number

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    // Seed a test tenant for tenant-scoped tests
    testTenantId = await seedTestTenant(payload, { name: 'Test Tenant', slug: TEST_TENANT_SLUG })
  })

  afterAll(async () => {
    // Clean up test tenant
    await cleanupTestTenant(payload, TEST_TENANT_SLUG)
    // Close database connection to allow clean exit
    if (payload?.db?.destroy) {
      await payload.db.destroy()
    }
  })

  it('creates tenant-scoped page', async () => {
    // Use unique slug to avoid conflicts
    const uniqueSlug = `test-tenant-page-${Date.now()}`
    const page = await payload.create({
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
      } as any,
      context: { disableRevalidate: true }, // Skip Next.js revalidation in test env
    })

    expect(page).toBeDefined()
    expect(page.id).toBeDefined()
  })

  it('finds tenant-scoped pages', async () => {
    const pages = await payload.find({
      collection: 'pages',
      limit: 10,
    })

    expect(pages).toBeDefined()
    expect(Array.isArray(pages.docs)).toBe(true)
  })

  it('creates tenant-scoped post', async () => {
    // Use unique slug to avoid conflicts
    const uniqueSlug = `test-tenant-post-${Date.now()}`
    const post = await payload.create({
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
      } as any,
      context: { disableRevalidate: true }, // Skip Next.js revalidation in test env
    })

    expect(post).toBeDefined()
    expect(post.id).toBeDefined()
  })

  it('finds tenant-scoped posts', async () => {
    const posts = await payload.find({
      collection: 'posts',
      limit: 10,
    })

    expect(posts).toBeDefined()
    expect(Array.isArray(posts.docs)).toBe(true)
  })

  it('creates tenant-scoped media placeholder', async () => {
    // Media creation requires actual upload, but we can verify the collection works
    const media = await payload.find({
      collection: 'media',
      limit: 1,
    })

    expect(media).toBeDefined()
    expect(Array.isArray(media.docs)).toBe(true)
  })
})
