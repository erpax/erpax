/**
 * factory/collection/base — every accounting collection, built once.
 *
 * Before this, 117 of 118 collections inlined the same 25-line preamble, so a
 * programmatic refactor landed in 118 different shapes. The factory takes the
 * cross-cutting concerns as DECLARATIVE metadata (emits · horoStates · access ·
 * audit · tamper-proof uuid) and wires them, so a collection declares what it IS
 * and never how it is plumbed.
 *
 * @see ./SKILL.md
 */
import type {
  CollectionConfig, CollectionBeforeChangeHook,
  CollectionAfterChangeHook, Field,
} from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { adminGroupOf } from '@/navigation'
import {
  emitOnStatusTransition, emitOnCreate, type AggregateType,
} from '@/chain/event/emitter'
import { wireChainProducersFor } from '@/business/chain'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/auth'
import type { UserRole } from '@/types/auth'
import {
  statusField, notesField, auditFields,
} from '@/field'
import {
  tamperProofUuidField, tamperProofBeforeChangeHook,
} from '@/integrity'
import {
  horoStateField, validateHoroStates, horoStateBeforeChange, type HoroState,
} from '@/horo'
import { deriveCollectionDiamond, diamondUuid, verifyDiamond } from '@/diamond'

/** Set when a collection already wired explicit structured emits — the spine fold skips it. */
export const EMITS_WIRED_KEY = '__erpaxEmitsWired__' as const

/** Attached by createAccountingCollection — the computed diamond model at config-build. */
export const COLLECTION_DIAMOND_KEY = '__erpaxCollectionDiamond__' as const

export interface StatusOption {
  readonly label: string
  readonly value: string
}

/**
 * Structured emit wiring.
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
  /**
   * Src-relative atom folder path when it differs from slug (e.g.
   * `employees/leave/requests` for slug `leave-requests`). Feeds the shared
   * [[diamond]] model's `atomPath` facet.
   */
  readonly atomPath?: string
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

  // ─── Declarative spec metadata ─────
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

  // ─── Shared-field injection toggles ────────────
  // Tenant scoping is owned by @payloadcms/plugin-multi-tenant, not injected here.
  readonly injectAuditFields?: boolean     // default true
  readonly injectNotesField?: boolean      // default true
  /**
   * closes Finding 1 of the tamper-
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

  /**
   * declare the collection's flow lifecycle
   * as positions on the closed horo ring (`[1,2,4,8,7,5,9]`). When set, the
   * factory enforces the math three ways: it runs `validateHoroStates` at
   * config-build (an off-ring, out-of-order, or duplicate ring THROWS, so a
   * disharmonious collection can never be sanitized into the schema), injects
   * the measure-ordered `horoStateField` select under `horoStateName`
   * (default `'state'`), and adds `horoStateBeforeChange` so the
   * seed/import/programmatic path is rejected off-ring at write. This is the
   * harmony twin of `injectTamperProofUuid`: one pins identity (content-uuid),
   * the other pins flow-state harmony (the ring).
   */
  readonly horoStates?: ReadonlyArray<HoroState>
  readonly horoStateName?: string          // default 'state'
  readonly horoStateDefault?: string

  /**
   * When true, config-build throws if the derived [[diamond]] model fails
   * verifyDiamond (fail-closed completeness gate). Default false so existing
   * collections are not broken; enable per-collection as trinity closes.
   */
  readonly validateDiamondModel?: boolean

  // ─── Hook injection toggles ────────────────────
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
 * Signature: accepts BOTH the modern
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
  const injectAuditFields = opts.injectAuditFields !== false
  const injectNotesField = opts.injectNotesField !== false
  const injectStatusField = opts.injectStatusField === true
  const injectAuditTrail = opts.injectAuditTrail !== false
  const injectCreatedBy = opts.injectCreatedBy !== false
  const injectTamperProofUuid = opts.injectTamperProofUuid !== false

  const hasHoroStates = !!(opts.horoStates && opts.horoStates.length > 0)
  const horoStateName = opts.horoStateName ?? 'state'
  if (hasHoroStates) {
    const verdict = validateHoroStates(opts.horoStates as ReadonlyArray<HoroState>)
    if (!verdict.ok) {
      throw new Error(
        `[createAccountingCollection ${opts.slug}] horoStates disharmony: ${verdict.errors.join('; ')}`,
      )
    }
  }

  // Diamond seal (tamperProofUuid + horoStates) is a config-build AUDIT facet, NOT runtime-required
  // (admin.group falls back to the slug; the only other consumers are dev-only admin dashboards). It is
  // gated to non-production so the prod webpack build (NODE_ENV statically 'production') dead-code-
  // eliminates this branch, tree-shaking `@/diamond` → `@/uuid/matrix` (the 4.2MB matrix.generated) OUT
  // of the deployed Worker. Dev/test keep the full seal.
  let collectionDiamond: ReturnType<typeof deriveCollectionDiamond> | undefined
  let diamondId = ''
  if (process.env.NODE_ENV !== 'production') {
    collectionDiamond = deriveCollectionDiamond(opts)
    diamondId = diamondUuid(collectionDiamond)
    if (opts.validateDiamondModel) {
      const { sealed, impurities } = verifyDiamond(collectionDiamond)
      if (!sealed) {
        throw new Error(
          `[createAccountingCollection ${opts.slug}] diamond model incomplete: ${impurities.join('; ')}`,
        )
      }
    }
  }

  const fieldsThunk: (() => Field[]) | undefined = opts.fields ?? legacyFieldsThunk
  if (!fieldsThunk) {
    throw new Error(
      `[createAccountingCollection ${opts.slug}] no fields provided — pass either ` +
        `{ fields: () => [...] } in opts or a () => [...] as the 2nd argument`,
    )
  }

  // ── Assemble fields: shared helpers around the domain-specific block ──
  //
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
  // 1. Tenant scoping is injected by @payloadcms/plugin-multi-tenant (see payload.config.ts).
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
  // 3b. Horo state ring — the harmony twin of the
  //     content-uuid field. Already validated above; here we inject the
  //     measure-ordered select. Dedupe like every other shared field.
  if (hasHoroStates && !userFieldNames.has(horoStateName)) {
    fields.push(horoStateField(
      horoStateName,
      opts.horoStates as ReadonlyArray<HoroState>,
      opts.horoStateDefault !== undefined ? { defaultValue: opts.horoStateDefault } : {},
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
    ...(hasHoroStates
      ? [horoStateBeforeChange(horoStateName, opts.horoStates as ReadonlyArray<HoroState>)]
      : []),
    ...(injectTamperProofUuid ? [tamperProofBeforeChangeHook(opts.slug)] : []),
  ]
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
  const chainProducers = wireChainProducersFor(opts.slug)
  const afterChange = [
    ...(injectAuditTrail ? [auditTrailAfterChange(opts.slug)] : []),
    ...chainProducers,
    ...structuredEmits,
    ...(opts.afterChangeHooks ?? []),
  ]

  const diamondNote = diamondId ? `diamond-uuid: ${diamondId}` : ''
  const description = opts.description
    ? (diamondNote ? `${opts.description}\n\n— ${diamondNote}` : opts.description)
    : diamondNote || undefined
  const atomPath = opts.atomPath ?? opts.slug
  const adminGroup = adminGroupOf(atomPath)

  const config: CollectionConfig & { readonly [COLLECTION_DIAMOND_KEY]?: typeof collectionDiamond } = {
    slug: opts.slug,
    labels: opts.labels,
    admin: {
      useAsTitle: opts.useAsTitle,
      defaultColumns: opts.defaultColumns,
      description,
      group: adminGroup,
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
    [COLLECTION_DIAMOND_KEY]: collectionDiamond,
    ...(structuredEmits.length > 0 ? { [EMITS_WIRED_KEY]: true } : {}),
  }
  return config
}

/** Set when a collection already wired explicit structured emits — the spine fold skips it. */

/** @index-cross.foldback child=factory/collection/base parent=factory/collection — this cross folds back into its parent. */
