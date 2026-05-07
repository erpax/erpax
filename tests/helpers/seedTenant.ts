/**
 * Test Tenant Seeding Utilities
 *
 * Helper functions for creating and cleaning up test tenants
 * via Payload's Local API. Essential for multi-tenant tests.
 *
 * @see https://payloadcms.com/docs/plugins/multi-tenant
 */

import type { Payload } from 'payload'

/**
 * Seed a test tenant for integration tests.
 *
 * This function is idempotent - if a tenant with the given slug
 * already exists, it returns the existing tenant's ID.
 *
 * @param payload - Initialized Payload instance
 * @param tenantData - Tenant name and slug
 * @returns The tenant ID (number for SQLite/D1 adapter)
 *
 * @example
 * ```ts
 * const tenantId = await seedTestTenant(payload, {
 *   name: 'Test Tenant',
 *   slug: 'test-tenant'
 * })
 * ```
 */
export async function seedTestTenant(
  payload: Payload,
  tenantData: { name: string; slug: string } = { name: 'Test Tenant', slug: 'test-tenant' },
): Promise<number> {
  // Check if tenant exists (idempotent)
  const existing = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: tenantData.slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  // Create new tenant
  const tenant = await payload.create({
    collection: 'tenants',
    data: {
      name: tenantData.name,
      slug: tenantData.slug,
    },
  })

  return tenant.id
}

/**
 * Clean up a test tenant by slug.
 *
 * Call this in afterAll() to ensure test tenants don't pollute
 * the database between test runs.
 *
 * @param payload - Initialized Payload instance
 * @param slug - The tenant slug to clean up
 * @returns Promise that resolves when cleanup is complete
 */
export async function cleanupTestTenant(payload: Payload, slug: string): Promise<void> {
  const existing = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: 'tenants',
      id: existing.docs[0].id,
    }).catch(() => {
      // Ignore errors - tenant may have dependencies
    })
  }
}
