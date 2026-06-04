import type { Access } from 'payload'
import type { Iso27002ControlId } from '@/iso/27002'

import { isSuperAdmin } from '@/is/super/admin'
import type { Tenant } from '@/payload-types'
import { extractID } from '@/extract/id'
import { getUserTenantIDs } from '@/get/user/tenant/i/ds'

/**
 * Mutations (create / update / delete) for tenant-scoped CMS collections —
 * super-admin or per-tenant membership-admin for the document's tenant.
 *
 * Resolves tenant from incoming `data.tenant` when present; otherwise loads
 * the document by `id` so update/delete work without re-posting `tenant`
 * (Payload access often omits it on partial updates).
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/iso-27002/types.ts
 * @see docs/STANDARDS.md §4.4
 */

/**
 * Canonical ISO 27002 controls this predicate exercises:
 *   5.4  — Segregation of duties (tenant-admin role gates mutations)
 *   5.15 — Access control
 *   5.18 — Access rights
 *   5.23 — Cloud-service tenant isolation
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = [
  '5.4',
  '5.15',
  '5.18',
  '5.23',
] as const
export function createMembershipAdminMutateAccess(collectionSlug: string): Access {
  return async ({ req, id, data }) => {
    if (!req.user) return false
    if (isSuperAdmin(req.user)) return true

    const adminTenants = getUserTenantIDs(req.user, 'admin')

    let tenantId: string | undefined

    if (data && typeof data === 'object' && 'tenant' in data && data.tenant !== undefined && data.tenant !== null) {
      tenantId = extractID(data.tenant as Tenant | Tenant['id'])
    }

    if (tenantId === undefined && id !== undefined && id !== null && id !== '') {
      try {
        // Bypass collection read access so tenant membership admins can resolve `tenant`
        // on update/delete when Payload omits `data.tenant` — not redundant privilege escalation.
        const doc = await req.payload.findByID({
          collection: collectionSlug as 'posts',
          depth: 0,
          id,
          overrideAccess: true,
        })
        if (doc && typeof doc === 'object' && 'tenant' in doc && doc.tenant !== undefined && doc.tenant !== null) {
          tenantId = extractID(doc.tenant as Tenant | Tenant['id'])
        }
      } catch {
        return false
      }
    }

    if (tenantId === undefined) return false
    return adminTenants.includes(tenantId)
  }
}
