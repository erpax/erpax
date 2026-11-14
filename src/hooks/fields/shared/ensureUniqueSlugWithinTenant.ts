import type { FieldHook, Where } from 'payload'

import { ERR, throwRegistryValidation } from '@/error'
import { extractID } from '@/extract/id'
import { tenantLabelForDuplicateAudit } from '@/tenant/label/for/duplicate/audit'

/** Tenant-scoped collections whose slugs must be unique within `tenant`, not globally. */
export type TenantScopedSlugCollection = 'pages' | 'posts' | 'categories'

/**
 * Validates slug uniqueness per tenant (multi-tenant).
 *
 * Pair with `slugField({ disableUnique: true })` so the DB enforces uniqueness
 * on `(tenant_id, slug)` via migration, not on `slug` alone.
 *
 * @rfc 3986 uniform-resource-identifier slug
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail
 * @see https://payloadcms.com/docs/getting-started/concepts#config
 * @see docs/STANDARDS.md §3 §4.4
 */
export function ensureUniqueSlugWithinTenant(
  collection: TenantScopedSlugCollection,
): FieldHook {
  return async ({ data, originalDoc, req, value }) => {
    if (originalDoc?.slug === value) {
      return value
    }

    if (value === undefined || value === null || value === '') {
      return value
    }

    const constraints: Where[] = [
      {
        slug: {
          equals: value,
        },
      },
    ]

    const incomingTenantID = extractID(data?.tenant)
    const currentTenantID = extractID(originalDoc?.tenant)
    const tenantIDToMatch = incomingTenantID || currentTenantID

    if (tenantIDToMatch) {
      constraints.push({
        tenant: {
          equals: tenantIDToMatch,
        },
      })
    }

    if (originalDoc?.id !== undefined && originalDoc?.id !== null) {
      constraints.push({
        id: {
          not_equals: originalDoc.id,
        },
      })
    }

    const duplicate = await req.payload.find({
      collection,
      depth: 0,
      limit: 1,
      where: {
        and: constraints,
      },
    })

    if (duplicate.docs.length === 0) {
      return value
    }

    const tenantName = await tenantLabelForDuplicateAudit(req, tenantIDToMatch ?? undefined)
    req.payload.logger.warn({
      code: ERR.VAL_SLUG_DUPLICATE,
      collection,
      msg: 'Duplicate slug for tenant',
      slug: value,
      ...(tenantName && { tenantName }),
    })
    throwRegistryValidation('slug', ERR.VAL_SLUG_DUPLICATE)
  }
}
