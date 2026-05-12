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
 *     // Slice AAAAAAAA structured form — factory auto-wires the
 *     // afterChange producer per entry. The legacy `string[]` form
 *     // (metadata-only) is still accepted but ConsistencyAgent flags
 *     // it as Class F until upgraded.
 *     emits: [
 *       { event: 'invoice:activated', onStatus: 'activated', aggregate: 'invoice' },
 *       { event: 'invoice:paid',      onStatus: 'paid',      aggregate: 'invoice' },
 *     ],
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
// Slice AAAAAAAA (2026-05-11) — factory auto-wires structured `emits:` into
// afterChange hooks. Single source of truth for the chain-emit producers.
import {
  emitOnStatusTransition, emitOnCreate, type AggregateType,
} from '@/hooks/chainEventEmitters'
// Slice BBBBBBBB (2026-05-11) — pull chain-declared producers from the
// BUSINESS_CHAINS registry. Any chain step with `producer: { onStatus | onCreate, aggregate }`
// scoped to this collection's slug gets auto-wired into afterChange.
import { wireChainProducersFor } from '@/services/business-chains/wire-producers'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import type { UserRole } from '@/access/auth'
import {
  multiTenancyField, statusField, notesField, auditFields,
} from '@/fields/accounting/base-accounting-fields'
// Slice PPPPPPPPP (2026-05-11) — tamper-surface review Batch 1.
// Factory now injects tamperProofUuidField + tamperProofBeforeChangeHook
// by default so every accounting collection automatically opts into
// Law 8 (content-uuid). Closes Finding 1 of the tamper-surface review.
import {
  tamperProofUuidField, tamperProofBeforeChangeHook,
} from '@/services/integrity'

export interface StatusOption {
  readonly label: string
  readonly value: string
}

/**
 * Structured emit wiring (Slice AAAAAAAA 2026-05-11).
 *
 * Legacy form (`emits: ['address:created']`) was metadata-only —
 * ConsistencyAgent flagged it as gap class F because no runtime
 * producer fires. New structured form auto-wires the matching
 * `emitOnCreate` / `emitOnStatusTransition` into `afterChange`.
 *
 * Either kind of `emits:` entry is accepted; the factory dispatches
 * on shape (string = legacy metadata; object = active wiring).
 */
export interface EmitWiring {
  /** Event id e.g. 'invoice:activated' (`<aggregate>:<verb>`). */
  readonly event: string
  /** Aggregate envelope for the DomainEvent payload. */
  readonly aggregate: AggregateType
  /**
   * Either:
   *   `onCreate: true`           — fire once on row creation, or
   *   `onStatus: '<value>'`      — fire on a status-transition
   *                                  matching the given status value.
   * Exactly one of these must be set.
   */
  readonly onCreate?: true
  readonly onStatus?: string
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

  // ─── Declarative spec metadata (Slice BBBBB-cut1 + AAAAAAAA) ─────
  /**
   * Event ids this collection emits.
   *
   *   - `string`     — metadata-only (the legacy form). ConsistencyAgent
   *                    flags as Class F until a runtime producer exists.
   *   - `EmitWiring` — auto-wired: factory injects the matching
   *                    `emitOnCreate` / `emitOnStatusTransition` into
   *                    `afterChange`, so the event actually fires.
   */
  readonly emits?: ReadonlyArray<string | EmitWiring>
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
  /**
   * Slice PPPPPPPPP (2026-05-11) — closes Finding 1 of the tamper-
   * surface review. Every accounting collection now opts into Law 8
   * tamper-proofing BY DEFAULT: the factory injects a `uuid` field +
   * a `beforeChange` hook that recomputes the content-uuid on every
   * write. Side-effect: registers the slug in
   * `TAMPER_PROOF_COLLECTIONS_REGISTRY` so the existing
   * `checkContentIntegrityProvable` invariant samples the collection.
   *
   * Set `false` ONLY for collections that legitimately can't carry a
   * content-uuid (rare — placeholder collections, ephemeral state).
   * Doing so requires a JSDoc rationale and is flagged by the new
   * `checkEveryAccountingCollectionIsTamperProofed` invariant.
   */
  readonly injectTamperProofUuid?: boolean // default true
  /** Inject `status` select (needs `statusOptions` + optional `statusDefault`). */
  readonly injectStatusField?: boolean     // default false
  readonly statusOptions?: ReadonlyArray<StatusOption>
  readonly statusDefault?: string

  // ─── Hook injection toggles (Slice BBBBB-cut1) ────────────────────
  readonly injectAuditTrail?: boolean      // default true
  readonly injectCreatedBy?: boolean       // default true
  readonly beforeChangeHooks?: CollectionBeforeChangeHook[]
  readonly afterChangeHooks?: CollectionAfterChangeHook[]

  /**
   * Domain-specific fields — the only thing the collection author writes.
   *
   * Optional in the type to support the legacy 2-arg call form
   * `createAccountingCollection(opts, () => [...fields])` used by
   * pre-BBBBB-cut1 collections (FixedAssets, etc.). At runtime the
   * factory accepts either `opts.fields` (modern) or a separate
   * `fieldsThunk` second argument (legacy). One of the two MUST be
   * provided; if neither is present the factory throws.
   */
  readonly fields?: () => Field[]
}

/**
 * Build a complete `CollectionConfig` from declarative metadata.
 * Authors only write domain-specific fields; everything else is
 * wired by the factory.
 *
 * Signature (Slice BBBBBBBB-fix 2026-05-11): accepts BOTH the modern
 * 1-arg form `{ ..., fields: () => [...] }` AND the legacy 2-arg form
 * `(opts, () => [...])`. The latter is for pre-BBBBB-cut1 collections
 * that pass the field thunk as a separate argument (FixedAssets, etc.).
 *
 * @audit ISO 19011:2018 §6.4.6 — backwards-compat path for collections
 *                                  not yet migrated to BBBBB-cut1 shape
 */
export const createAccountingCollection = (
  opts: AccountingCollectionOptions,
  legacyFieldsThunk?: () => Field[],
): CollectionConfig => {
  const writeRole: UserRole = opts.roleRequired ?? ('accountant' as UserRole)
  const injectMultiTenancy = opts.injectMultiTenancy !== false
  const injectAuditFields = opts.injectAuditFields !== false
  const injectNotesField = opts.injectNotesField !== false
  const injectStatusField = opts.injectStatusField === true
  const injectAuditTrail = opts.injectAuditTrail !== false
  const injectCreatedBy = opts.injectCreatedBy !== false
  // Slice PPPPPPPPP-cut1 (2026-05-11) — closes Finding 1 of the
  // tamper-surface review. Default-on so every accounting collection
  // gets a recomputed content-uuid on every write. Opt-out is
  // explicit (`injectTamperProofUuid: false`) and discoverable via
  // the new invariant.
  const injectTamperProofUuid = opts.injectTamperProofUuid !== false

  // Slice BBBBBBBB-fix: prefer `opts.fields` (modern); fall back to
  // the legacy `(opts, fieldsThunk)` 2-arg form. Exactly one must be
  // present.
  const fieldsThunk: (() => Field[]) | undefined = opts.fields ?? legacyFieldsThunk
  if (!fieldsThunk) {
    throw new Error(
      `[createAccountingCollection ${opts.slug}] no fields provided — pass either ` +
        `{ fields: () => [...] } in opts or a () => [...] as the 2nd argument`,
    )
  }

  // ── Assemble fields: shared helpers around the domain-specific block ──
  //
  // Slice GGGGGGGG (2026-05-11): the factory DEDUPES every shared-field
  // injection against names the user thunk already provides. Legacy
  // collections (FixedAssets, etc.) inline `multiTenancyField()`,
  // `notesField()`, sometimes `...auditFields()` and `statusField()`;
  // the factory injects the same by default. Without dedup, Payload's
  // sanitizeFields throws `DuplicateFieldName: 'tenant'` (or notes /
  // approvedAt). With dedup, the user's inline takes precedence and
  // the factory injection is skipped silently.
  //
  // This makes the factory backward-compatible with EVERY existing
  // collection shape — modern (factory does all the work) AND legacy
  // (user thunk inlines whatever, factory fills gaps only).
  const userFields = fieldsThunk()
  const userFieldNames = new Set<string>()
  const collectFieldNames = (arr: ReadonlyArray<Field>): void => {
    for (const f of arr) {
      if ('name' in f && typeof f.name === 'string') userFieldNames.add(f.name)
    }
  }
  collectFieldNames(userFields)

  const fields: Field[] = []
  // 0. Slice PPPPPPPPP-cut1 — content-addressable tamper-proof uuid
  //    (Law 8). Goes first so it appears at the top of the admin form
  //    + database schema. Dedupe: user collections that already inline
  //    a `uuid` field keep their version (legacy / migration path).
  if (injectTamperProofUuid && !userFieldNames.has('uuid')) {
    fields.push(...tamperProofUuidField(opts.slug))
  }
  // 1. Multi-tenancy field
  if (injectMultiTenancy && !userFieldNames.has('tenant')) {
    fields.push(multiTenancyField())
  }
  // 2. User's domain-specific fields (verbatim)
  fields.push(...userFields)
  // 3. Status field
  if (injectStatusField && !userFieldNames.has('status')) {
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
  // 4. Audit fields (createdBy / approvedBy / approvedAt) — only inject
  //    the entries the user didn't already provide. Slice GGGGGGGG.
  if (injectAuditFields) {
    for (const f of auditFields({ readOnly: true })) {
      const n = (f as { name?: string }).name
      if (typeof n === 'string' && !userFieldNames.has(n)) fields.push(f)
    }
  }
  // 5. Notes field
  if (injectNotesField && !userFieldNames.has('notes')) {
    fields.push(notesField())
  }

  // ── Assemble hooks: tenant + createdBy + audit-trail by default ──
  const beforeValidate = [autoPopulateTenant]
  const beforeChange = [
    ...(injectCreatedBy ? [autoPopulateCreatedBy] : []),
    ...(opts.beforeChangeHooks ?? []),
    // Slice PPPPPPPPP-cut1 — uuid recompute is the LAST beforeChange
    // hook so it sees the merged final state every prior hook (user
    // mutations, autoPopulateCreatedBy, autoPopulateTenant via the
    // beforeValidate pass) has produced. Manual uuid overrides throw.
    ...(injectTamperProofUuid ? [tamperProofBeforeChangeHook(opts.slug)] : []),
  ]
  // Slice AAAAAAAA (2026-05-11) — translate structured `emits:` entries
  // into runtime producer hooks. The string-form entries stay as pure
  // metadata (ConsistencyAgent's hourly sweep keeps a list of Class F
  // offenders for those, so the gap remains visible until the author
  // upgrades to the structured form).
  const structuredEmits: CollectionAfterChangeHook[] = []
  for (const e of opts.emits ?? []) {
    if (typeof e === 'string') continue
    if (e.onCreate === true) {
      structuredEmits.push(emitOnCreate(e.event, e.aggregate))
    } else if (typeof e.onStatus === 'string' && e.onStatus.length > 0) {
      structuredEmits.push(emitOnStatusTransition(e.onStatus, e.event, e.aggregate))
    } else {
      throw new Error(
        `[createAccountingCollection ${opts.slug}] emits: entry for '${e.event}' must set onCreate:true OR onStatus:'<value>'`,
      )
    }
  }
  // Slice BBBBBBBB (2026-05-11) — pull chain-declared producers from
  // BUSINESS_CHAINS. Any chain step `producer:` field scoped to this
  // slug becomes an afterChange hook automatically. This is on top of
  // the per-collection structured `emits:` declared in opts (those
  // remain for events not yet expressed in BUSINESS_CHAINS, e.g.
  // collection-internal events like `address:erased`).
  const chainProducers = wireChainProducersFor(opts.slug)
  const afterChange = [
    ...(injectAuditTrail ? [auditTrailAfterChange(opts.slug)] : []),
    ...chainProducers,
    ...structuredEmits,
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
