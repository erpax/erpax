/**
 * Tenant-scope `Where` clause builders for the public storefront.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control tenant-isolation
 * @security ISO-27001 A.5.23 information-security-for-cloud-services
 * @security ISO-27002 §8.3 information-access-restriction
 * @see src/standards/nist-incits-359/
 */

import type { Where } from 'payload'

/** Matches documents for `NEXT_PUBLIC_SITE_TENANT_SLUG` (same pattern as CMS pages). */
export function getSiteTenantWhere(): Where | undefined {
  const slug = process.env.NEXT_PUBLIC_SITE_TENANT_SLUG
  if (!slug) return undefined
  return { 'tenant.slug': { equals: slug } }
}

/** Published products, optionally scoped to the site tenant env slug. */
export function buildPublishedProductsWhere(): Where {
  const tenant = getSiteTenantWhere()
  if (!tenant) {
    return { _status: { equals: 'published' } }
  }
  return {
    and: [{ _status: { equals: 'published' } }, tenant],
  }
}

/** Single product by slug + published (+ optional site tenant). */
export function buildProductDetailWhere(slug: string): Where {
  const tenant = getSiteTenantWhere()
  const parts: Where[] = [
    { slug: { equals: slug } },
    { _status: { equals: 'published' } },
  ]
  if (tenant) parts.push(tenant)
  return { and: parts }
}
