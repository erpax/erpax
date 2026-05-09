/**
 * Test tenant seeding helpers — create and clean up test tenants via Local API.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see https://payloadcms.com/docs/plugins/multi-tenant
 * @see docs/STANDARDS.md §7
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
    overrideAccess: true,
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
    overrideAccess: true,
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
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: 'tenants',
      id: existing.docs[0].id,
      overrideAccess: true,
    }).catch(() => {
      // Ignore errors - tenant may have dependencies
    })
  }
}

/** Delete a tenant by ID (avoids a lookup query). */
export async function cleanupTestTenantById(payload: Payload, id: number): Promise<void> {
  await payload
    .delete({
      collection: 'tenants',
      id,
      overrideAccess: true,
    })
    .catch(() => {
      // Ignore errors - tenant may have dependencies
    })
}
