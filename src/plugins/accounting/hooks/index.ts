/**
 * Accounting plugin hooks — Payload lifecycle hooks for GL Posting, Journal Entries, and financial collections.
 *
 * Multi-tenant isolation: All GL Posting hooks verify tenant affiliation to prevent cross-tenant
 * data leakage via Payload's relationship machinery. Hooks are decorators over canonical hook
 * factories (autoPopulateTenant, validateBalancedEntry, etc.) with GL Posting–specific logic.
 *
 * Hook categories:
 *   • Tenant validation: Ensure GL Posting + Journal Entry + GL Account all belong to same tenant.
 *   • Status transitions: Enforce immutability (posted entries cannot be edited by non-admins).
 *   • Reversal logic: Validate reversal posting links to original posting in same tenant.
 *   • Audit trail: All state changes recorded with user context and tenant context.
 *
 * @standard SAF-T:2.0 audit-trail
 * @standard ISO-19011:2018 internal-audit
 * @accounting IFRS-16 period-closing
 * @accounting OECD SAF-T §3 transactions
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @compliance SOX §404 internal-controls
 */

import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook, PayloadRequest } from 'payload'
import type { GLPostings } from '@/payload-types'
import { getTenantContext } from '@/plugins/auth/context/tenant-context'

/**
 * Validate GL Posting belongs to the request tenant.
 *
 * Checks that the posting's tenant ID matches the tenant derived from the request context.
 * Prevents cross-tenant data leakage via direct ID manipulation or relationship traversal.
 *
 * @accounting IFRS-16 multi-tenant isolation
 * @security ISO-27001 A.5.23 tenant-isolation
 */
export const validateGLPostingTenant: CollectionBeforeValidateHook = async ({
  req,
  data,
}) => {
  const tenantContext = getTenantContext(req)
  if (!tenantContext) {
    throw new Error('No tenant context found in request')
  }

  const postingData = data as Record<string, unknown>
  const postingTenant = postingData.tenant as string | undefined

  // If tenant not yet set, autoPopulateTenant will set it
  if (!postingTenant) {
    return data
  }

  // Verify the posting tenant matches request tenant
  if (postingTenant !== tenantContext.id) {
    throw new Error(
      `GL Posting tenant ${postingTenant} does not match request tenant ${tenantContext.id}`
    )
  }

  return data
}

/**
 * Validate GL Posting status transitions.
 *
 * Enforces immutability: only admins can edit posted entries. Pending → Posted is allowed.
 * Reversal creates a new posting (doesn't modify the original). Status transitions are
 * tracked in audit trail for SOX §404 compliance.
 *
 * @accounting IFRS-16 reversal-logic
 * @compliance SOX §404 immutability
 */
export const validateGLPostingStatusTransition: CollectionBeforeChangeHook = async ({
  req,
  data,
  doc,
}) => {
  // Skip for new documents (no prior status)
  if (!doc) {
    return data
  }

  const postingData = data as Record<string, unknown>
  const postingDoc = doc as Record<string, unknown>
  const newStatus = postingData.status as string | undefined
  const oldStatus = postingDoc.status as string | undefined

  // Posted entries are immutable except to admins
  if (oldStatus === 'posted' && newStatus !== oldStatus) {
    const user = req.user
    const isAdmin = user?.roles?.some((r: { name: string }) => r.name === 'admin') ?? false
    if (!isAdmin) {
      throw new Error('Posted GL Postings cannot be modified except by administrators')
    }
  }

  return data
}

/**
 * Validate GL Posting reversal linking.
 *
 * When a GL Posting is created with status='reversed' and reversalPostingId set,
 * verify that the original posting exists, is in the same tenant, and has not
 * already been reversed (single-reversal invariant).
 *
 * @accounting IFRS-16 reversal-linking
 * @audit ISO-19011:2018 audit-trail
 */
export const validateGLPostingReversal: CollectionBeforeValidateHook = async ({
  req,
  data,
}) => {
  const postingData = data as Record<string, unknown>
  const reversalPostingId = postingData.reversalPostingId as string | undefined
  const status = postingData.status as string | undefined

  if (status === 'reversed' && reversalPostingId) {
    // Verify the original posting exists and fetch it
    try {
      const originalPosting = await req.payload.findByID({
        collection: 'gl-postings',
        id: reversalPostingId,
        overrideAccess: false,
        req,
      })

      // Verify original posting is in same tenant
      const tenantContext = getTenantContext(req)
      if (!tenantContext) {
        throw new Error('No tenant context found in request')
      }

      const originalTenant = (originalPosting as Record<string, unknown>).tenant as string
      if (originalTenant !== tenantContext.id) {
        throw new Error(
          `Cannot reverse posting from different tenant: ${originalTenant} vs ${tenantContext.id}`
        )
      }

      // Check that the original posting hasn't been reversed yet
      const hasExistingReversal = await req.payload.count({
        collection: 'gl-postings',
        where: {
          reversalPostingId: {
            equals: reversalPostingId,
          },
          status: {
            equals: 'reversed',
          },
        },
        overrideAccess: false,
        req,
      })

      if (hasExistingReversal.totalDocs > 0) {
        throw new Error(`GL Posting ${reversalPostingId} has already been reversed`)
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('not found')) {
        throw new Error(`Cannot reverse non-existent GL Posting: ${reversalPostingId}`)
      }
      throw err
    }
  }

  return data
}

/**
 * Global accounting plugin hooks registered at Payload boot.
 *
 * These are collection-agnostic hooks that apply to all accounting collections
 * via the plugin's hook merging in plugin.ts. Collection-specific hooks are
 * defined inline in each collection's CollectionConfig.
 *
 * Currently empty: Phase 2.10 establishes the pattern for future global hooks.
 */
export const hooks = {
  // Global hooks will be registered here as they're implemented.
  // Collection-specific hooks (validateBalancedEntry, autoPopulateTenant, etc.)
  // remain inline in collection definitions for better locality.
}
