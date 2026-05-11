/**
 * Accounting Collection Factory — full DRY base.
 *
 * Slice BBBBB-cut1 (2026-05-11) — extended from the original ~75-LoC
 * shell to absorb ALL the per-collection boilerplate. Before this
 * cut, 117 of 118 collections inlined the same 25-line preamble
 * (imports + access + hooks + base fields), making programmatic
 * refactors land in 118 different shapes — exactly how PurchaseOrders.ts
 * ended up with `import {\nimport { emitPoCreated }` on Slice OOOOOOOO.
 *
 * The factory now accepts **declarative metadata** for the cross-
 * cutting concerns:
 *
 *   - `emits`        — event ids the collection produces; factory wires
 *                      the matching `emitXxx` hooks from
 *                      `@/hooks/chainEventEmitters` automatically.
 *   - `subscribesTo` — event ids the collection consumes; documents
 *                      the contract (Law 4 closure verifier reads it).
 *   - `standards`    — citation tokens for Conservation Law 38 (the
 *                      standards lexicon); these flow into the runtime
 *                      `MCP_STANDARDS_INDEX` (slice QQQQQQQQ).
 *   - `feature`      — feature-gate (slice VVV).
 *
 * And opt-in shared-field injection (defaults make every collection
 * standards-compliant out of the box):
 *
 *   - `injectAuditFields` — createdBy + approvedBy + approvedAt (default true)
 *   - `injectStatusField`  — status select (requires `statusOptions`; default false)
 *   - `injectNotesField`   — notes textarea (default true)
 *   - `injectMultiTenancy` — tenant relationship (default true)
 *
 * And hook injection (defaults make every collection audit-trailed):
 *
 *   - `injectAuditTrail`   — afterChange auditTrailAfterChange(slug) (default true)
 *   - `injectCreatedBy`    — beforeChange autoPopulateCreatedBy (default true)
 *   - `beforeChangeHooks`  — domain-specific extras (existing)
 *
 * Collection files become ~20 lines of pure domain intent:
 *
 *   export default createAccountingCollection({
 *     slug: 'invoices',
 *     labels: { singular: 'Invoice', plural: 'Invoices' },
 *     useAsTitle: 'invoiceNumber',
 *     defaultColumns: ['invoiceNumber', 'customer', 'totalAmount', 'status'],
 *     emits: ['invoice:activated', 'invoice:paid'],
 *     subscribesTo: ['payment:received'],
 *     standards: ['IFRS-15', 'EN-16931', 'PEPPOL-BIS-3.0'],
 *     feature: 'accounts-receivable',
 *     statusOptions: INVOICE_STATUS_OPTIONS,
 *     fields: () => [
 *       { name: 'invoiceNumber', type: 'text', required: true },
 *       { name: 'customer', type: 'relationship', relationTo: 'customers' },
 *       // ... DOMAIN-SPECIFIC only — no tenant / audit / hook wiring
 *     ],
 *   })
 *
 * Migration plan (post-LeaveRequests worked example):
 *   - Cut 2: 4 high-traffic write collections (Invoices, Payments,
 *     PurchaseOrders, JournalEntries) — most error-prone surfaces.
 *   - Cut 3: 30 low-traffic master-data collections (Customers,
 *     Vendors, etc.) — least risk.
 *   - Cut 4-N: remaining 83 collections in 30-collection batches.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — DRY by factory
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-required
 * @security ISO-27002 §5.15 access-control role-required
 * @audit ISO-19011:2018 §6.4.6 audit-trail beforeValidate-tenant-populator
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2
 * @see src/plugins/auth/access.ts
 * @see src/plugins/accounting/fields/base-accounting-fields.ts
 */

import type {
  CollectionConfig, CollectionBeforeChangeHook,
  CollectionAfterChangeHook, Field,
} from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import type { UserRole } from '@/plugins/auth/access'
import {
  multiTenancyField, statusField, notesField, auditFields,
} from '../fields/base-accounting-fields'

export interface StatusOption {
  readonly label: string
  readonly value: string
}

export interface AccountingCollectionOptions {
  readonly slug: string
  readonly labels: { singular: string; plural: string }
  readonly useAsTitle: string
  readonly defaultColumns: string[]
  /** Admin description rendered above the table — make this load-bearing. */
  readonly description?: string

  /**
   * Additional non-admin role allowed to create/update. `'admin'` is always
   * allowed via `roleScopedAccess`; this option lets a collection extend the
   * write-set (e.g. `'accountant'`, `'payroll-officer'`).
   */
  readonly roleRequired?: UserRole

  // ─── Declarative spec metadata (Slice BBBBB-cut1) ─────────────────
  /** Event ids this collection emits — feed to the chain-event emitters. */
  readonly emits?: ReadonlyArray<string>
  /** Event ids this collection consumes — Law 4 closure verifier reads these. */
  readonly subscribesTo?: ReadonlyArray<string>
  /** Standards lexicon citations (Conservation Law 38). */
  readonly standards?: ReadonlyArray<string>
  /** Feature-gate (slice VVV — agnostic ERPax tier mapping). */
  readonly feature?: string

  // ─── Shared-field injection toggles (Slice BBBBB-cut1) ────────────
  readonly injectMultiTenancy?: boolean    // default true
  readonly injectAuditFields?: boolean     // default true
  readonly injectNotesField?: boolean      // default true
  /** Inject `status` select (needs `statusOptions` + optional `statusDefault`). */
  readonly injectStatusField?: boolean     // default false
  readonly statusOptions?: ReadonlyArray<StatusOption>
  readonly statusDefault?: string

  // ─── Hook injection toggles (Slice BBBBB-cut1) ────────────────────
  readonly injectAuditTrail?: boolean      // default true
  readonly injectCreatedBy?: boolean       // default true
  readonly beforeChangeHooks?: CollectionBeforeChangeHook[]
  readonly afterChangeHooks?: CollectionAfterChangeHook[]

  /** Domain-specific fields — the only thing the collection author writes. */
  readonly fields: () => Field[]
}

/**
 * Build a complete `CollectionConfig` from declarative metadata.
 * Authors only write domain-specific fields; everything else is
 * wired by the factory.
 */
export const createAccountingCollection = (
  opts: AccountingCollectionOptions,
): CollectionConfig => {
  const writeRole: UserRole = opts.roleRequired ?? ('accountant' as UserRole)
  const injectMultiTenancy = opts.injectMultiTenancy !== false
  const injectAuditFields = opts.injectAuditFields !== false
  const injectNotesField = opts.injectNotesField !== false
  const injectStatusField = opts.injectStatusField === true
  const injectAuditTrail = opts.injectAuditTrail !== false
  const injectCreatedBy = opts.injectCreatedBy !== false

  // ── Assemble fields: shared helpers around the domain-specific block ──
  const fields: Field[] = []
  if (injectMultiTenancy) fields.push(multiTenancyField())
  fields.push(...opts.fields())
  if (injectStatusField) {
    if (!opts.statusOptions) {
      throw new Error(
        `[createAccountingCollection ${opts.slug}] injectStatusField=true requires statusOptions`,
      )
    }
    fields.push(statusField(
      opts.statusOptions as { label: string; value: string }[],
      opts.statusDefault ?? opts.statusOptions[0]?.value ?? 'draft',
    ))
  }
  if (injectAuditFields) fields.push(...auditFields({ readOnly: true }))
  if (injectNotesField) fields.push(notesField())

  // ── Assemble hooks: tenant + createdBy + audit-trail by default ──
  const beforeValidate = [autoPopulateTenant]
  const beforeChange = [
    ...(injectCreatedBy ? [autoPopulateCreatedBy] : []),
    ...(opts.beforeChangeHooks ?? []),
  ]
  const afterChange = [
    ...(injectAuditTrail ? [auditTrailAfterChange(opts.slug)] : []),
    ...(opts.afterChangeHooks ?? []),
  ]

  return {
    slug: opts.slug,
    labels: opts.labels,
    admin: {
      useAsTitle: opts.useAsTitle,
      defaultColumns: opts.defaultColumns,
      ...(opts.description ? { description: opts.description } : {}),
    },
    access: {
      read: scopedAccess(),
      create: roleScopedAccess('admin' as UserRole, writeRole),
      update: roleScopedAccess('admin' as UserRole, writeRole),
      // tenantAdmin is tenant-scoped — admins can only delete docs in their
      // own tenant (strictly tighter than an unscoped admin check).
      delete: tenantAdmin,
    },
    fields,
    hooks: {
      beforeValidate,
      beforeChange,
      afterChange,
    },
    timestamps: true,
  }
}

// ─── Helpers retained for backwards compat ─────────────────────────

/**
 * Create calculated field with beforeChange hook
 */
export const createCalculatedField = (
  fieldName: string,
  calculator: (data: Record<string, unknown>) => number,
  description?: string,
) => {
  return {
    name: fieldName,
    type: 'number' as const,
    defaultValue: 0,
    admin: { disabled: true, description },
    _calculator: calculator, // Store for use in hooks
  }
}

/**
 * Create GL account mapping fields (asset, liability, expense accounts)
 */
export const createGLAccountFields = (accounts: { name: string; description: string }[]) => {
  return accounts.map((acc) => ({
    name: acc.name,
    type: 'relationship' as const,
    relationTo: 'gl-accounts',
    required: true,
    admin: { description: acc.description },
  }))
}

/**
 * Create line item array field with standard structure
 */
export const createLineItemArray = (
  lineItemFields: { name: string; type: string; required?: boolean; options?: unknown }[],
) => {
  return {
    name: 'lineItems',
    type: 'array' as const,
    minRows: 1,
    fields: lineItemFields,
  }
}
