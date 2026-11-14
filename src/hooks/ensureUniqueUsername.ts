import type { FieldHook, Where } from 'payload'

import { ERR, throwRegistryValidation } from '@/error'
import { tenantLabelForDuplicateAudit } from '@/tenant/label/for/duplicate/audit'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { getCollectionIDType } from '@/get/collection/id/type'

/** Blank / omitted username is allowed for any number of users; uniqueness applies only to non-empty values. */
function normalizeUsername(value: unknown): string | null {
  if (value === undefined || value === null) return null
  if (typeof value !== 'string') return null
  const t = value.trim()
  return t === '' ? null : t
}

/**
 * Field hook — enforce per-tenant uniqueness on a non-empty `username`.
 *
 * Uniqueness applies only to non-empty values (a blank username is allowed for
 * any number of users). Multi-tenant boundary is enforced via cookie-derived
 * tenant scope.
 *
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27002 §5.16 identity-management
 * @standard W3C HTML5 input-validation client-side
 * @see docs/STANDARDS.md §4.4
 */
export const ensureUniqueUsername: FieldHook = async ({ originalDoc, req, value }) => {
  const next = normalizeUsername(value)
  const previous = normalizeUsername(originalDoc?.username)

  if (previous === next) {
    return next
  }

  if (next === null) {
    return null
  }

  const constraints: Where[] = [
    {
      username: {
        equals: next,
      },
    },
  ]

  const selectedTenant = getTenantFromCookie(
    req.headers,
    getCollectionIDType({ payload: req.payload, collectionSlug: 'tenants' }),
  )

  if (selectedTenant) {
    constraints.push({
      'tenants.tenant': {
        equals: selectedTenant,
      },
    })
  }

  const findDuplicateUsers = await req.payload.find({
    collection: 'users',
    where: {
      and: constraints,
    },
  })

  if (findDuplicateUsers.docs.length > 0 && req.user) {
    const tenantName = await tenantLabelForDuplicateAudit(req, selectedTenant || undefined)
    req.payload.logger.warn({
      code: ERR.VAL_USERNAME_DUPLICATE,
      msg: 'Duplicate username for tenant',
      username: next,
      ...(tenantName && { tenantName }),
    })
    throwRegistryValidation('username', ERR.VAL_USERNAME_DUPLICATE)
  }

  return next
}
