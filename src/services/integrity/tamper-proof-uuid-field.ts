/**
 * Tamper-proof UUID field helper — Slice SSSSS (2026-05-11).
 *
 * Per-collection opt-in for Conservation Law 8. A collection becomes
 * tamper-proof by spreading `tamperProofUuidField()` into its fields
 * array AND calling `tamperProofBeforeChangeHook` from its hooks
 * config. The helper:
 *
 *   - declares a top-level `uuid` text field (unique + index +
 *     read-only in admin)
 *   - registers the collection slug in
 *     `TAMPER_PROOF_COLLECTIONS_REGISTRY` at module load
 *   - the beforeChange hook auto-computes the uuid from the doc
 *     content (minus uuid + storage metadata), throws if the user
 *     attempts to set uuid manually
 *
 * `checkContentIntegrityProvable` (Law 8 invariant) reads the
 * registry at runtime, so opting a new collection in needs zero
 * changes outside that collection's file.
 *
 * Usage:
 *
 *   import { tamperProofUuidField, tamperProofBeforeChangeHook }
 *     from '@/services/integrity'
 *
 *   export const Invoices: CollectionConfig = {
 *     slug: 'invoices',
 *     hooks: { beforeChange: [tamperProofBeforeChangeHook('invoices')] },
 *     fields: [
 *       multiTenancyField(),
 *       ...tamperProofUuidField('invoices'),
 *       // ... rest of the schema
 *     ],
 *   }
 *
 * @standard RFC 4122 §4.3 + RFC 8785 + NIST FIPS 180-4
 * @audit ISO 19011:2018 §6.4.6
 * @compliance SOX §404 (Byzantine tamper detection at the row level)
 */

import type { Field, CollectionBeforeChangeHook } from 'payload'
import { computeContentUuid, stripNonContentFields } from './content-uuid'
// Slice ZZZZZZZZZ-cut1 (2026-05-11) — collection rows now carry
// structured uuidv8 (Law 61) with slot=collectionRow + TAMPER_PROOF
// capability. Every accounting collection's `uuid` field
// self-describes; coverage (Law 62) rises platform-wide after this
// edit because every row written via the factory contributes.
import { encodeStructured, SLOT_TAGS, CAPABILITIES } from '@/services/uuid-format'

/**
 * Mutable Set of collection slugs that have opted into Law 8.
 * Populated at module load by `tamperProofUuidField('<slug>')` calls.
 * Read by `checkContentIntegrityProvable` to know what to sample.
 */
export const TAMPER_PROOF_COLLECTIONS_REGISTRY: Set<string> = new Set()

/** Register a slug as tamper-proof. Idempotent. */
export function registerTamperProofCollection(slug: string): void {
  TAMPER_PROOF_COLLECTIONS_REGISTRY.add(slug)
}

/** True when the collection has opted into Law 8. */
export function isTamperProofCollection(slug: string): boolean {
  return TAMPER_PROOF_COLLECTIONS_REGISTRY.has(slug)
}

/**
 * The Payload `Field` config for the `uuid` column on a tamper-proof
 * collection. Returns an array (single field) so it spreads cleanly:
 *
 *   fields: [ ...tamperProofUuidField('invoices'), restOfSchema ]
 *
 * Side-effect: registers the collection in the opt-in registry.
 */
export function tamperProofUuidField(collectionSlug: string): Field[] {
  registerTamperProofCollection(collectionSlug)
  return [{
    name: 'uuid',
    type: 'text',
    unique: true,
    index: true,
    required: true,
    admin: {
      readOnly: true,
      description:
        'Content-addressable UUID — auto-computed from the row\'s content (RFC 4122 §4.3 + RFC 8785). ' +
        'Any in-place tamper changes the recomputed uuid, which Conservation Law 8 (' +
        'checkContentIntegrityProvable) flags. Do not set manually.',
    },
  }]
}

/**
 * Resolve the tenant id from a Payload doc. Most collections store
 * the tenant under the `tenant` key (multiTenancyField helper from
 * the AAAAA-cont DRY pass). Falls back to a typed `tenantId` or to
 * the literal string `'unknown'` if neither is present.
 */
function resolveTenantId(data: unknown): string {
  if (typeof data !== 'object' || data === null) return 'unknown'
  const obj = data as Record<string, unknown>
  if (typeof obj.tenant === 'string') return obj.tenant
  if (typeof obj.tenantId === 'string') return obj.tenantId
  // Tenant could be a relationship reference: { id: 'xyz', … }
  if (typeof obj.tenant === 'object' && obj.tenant !== null) {
    const t = obj.tenant as { id?: unknown }
    if (typeof t.id === 'string') return t.id
  }
  return 'unknown'
}

/**
 * Collection-level `beforeChange` hook factory. Recomputes the uuid
 * from the incoming doc data (minus uuid + storage metadata) and
 * stamps it on the row. Throws if a user attempts to override.
 *
 * Operations:
 *   - create: compute uuid from initial fields, stamp it.
 *   - update: recompute uuid against the merged result (existing
 *     fields + the patch); stamp the new uuid. Manual override
 *     attempts throw to prevent the obvious bypass.
 */
export function tamperProofBeforeChangeHook(collectionSlug: string): CollectionBeforeChangeHook {
  return async ({ data, originalDoc, operation }) => {
    const incomingUuid = (data as { uuid?: unknown }).uuid
    const previousUuid = (originalDoc as { uuid?: unknown } | undefined)?.uuid

    // Block manual overrides — uuid must be derived, never authored.
    if (operation === 'update' && typeof incomingUuid === 'string' && incomingUuid !== previousUuid) {
      throw new Error(
        `Conservation Law 8 violation: tamper-proof collection '${collectionSlug}' rejects ` +
        `manual uuid changes. Stored: ${String(previousUuid)} → attempted: ${incomingUuid}.`,
      )
    }

    // For updates, merge the incoming patch onto the existing doc so
    // the recomputed uuid reflects the FULL post-update content.
    const merged: Record<string, unknown> = operation === 'update' && originalDoc
      ? { ...(originalDoc as Record<string, unknown>), ...(data as Record<string, unknown>) }
      : { ...(data as Record<string, unknown>) }

    const tenantId = resolveTenantId(merged)
    // Slice ZZZZZZZZZ-cut1 — strip storage-managed fields (was
    // implicit in computeContentUuid's stripNonContentFields call)
    // BEFORE emitting the structured uuidv8 so the hash input is
    // the row's true content, not the old uuid + storage timestamps.
    const content = stripNonContentFields(merged)
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.collectionRow,
      capabilities: CAPABILITIES.TAMPER_PROOF,
      schemaVersion: 1,
      content,
      tenantId,
    })

    return { ...(data as Record<string, unknown>), uuid }
  }
}

// `computeContentUuid` is imported but no longer called directly in
// this hook — kept for backwards compatibility with other callers of
// the integrity barrel. The verifier (`verifyContentUuid`) handles
// both v5 (legacy) and v8 (post-Slice ZZZZZZZZZ) forms.
void computeContentUuid
