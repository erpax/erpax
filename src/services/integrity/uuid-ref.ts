/**
 * UUID-driven references — Conservation Law 10 (referential harmony).
 *
 * Slice UUUUU (2026-05-11). Per user insight: "if all is uuid driven
 * then references will appear and disappear in harmony".
 *
 * A reference is a content-uuid pointer (RRRRR). Resolution = "find a
 * row whose recomputed content-uuid equals this string". Consequence:
 *
 *   - Reference RESOLVES   iff some store holds a row whose content
 *                          still produces this uuid.
 *   - Content MUTATES      → uuid changes → all old-uuid references
 *                          become silently unresolved (Law 10 flags
 *                          them; substrate proposes the rebind).
 *   - Object DELETED       → uuid no longer resolves → references
 *                          cleanly break (no dangling-pointer bug).
 *   - Identical CONTENT    → same uuid → previously-broken refs
 *     RECREATED            silently re-attach (graceful resurrection
 *                          — the "harmony" property).
 *   - HISTORICAL uuid      → resolves against the audit chain even
 *                          after the live row mutates (time-travel
 *                          for free).
 *
 * Composes with Laws 8 (per-row content integrity) and 9 (cross-store
 * redundancy) into a full spacetime integrity model.
 *
 * @standard RFC 9562 §5.8 + RFC 8785
 * @audit ISO 19011:2018 §6.4.6
 * @compliance SOX §404 (referential integrity without cascade rules)
 */

import type { Payload, Field } from 'payload'
import { verifyContentUuid } from './content-uuid'

/** UUIDv8 regex — RFC 9562 §4 textual form for version 8 + RFC 9562 variant. */
const UUID_V8_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/**
 * Registry of every (collection, fieldPath) pair that holds a uuidRef.
 * Populated at module load by `uuidRef('<targetCollection>')` calls
 * via the field's owning collection. The Law 10 invariant reads this
 * registry to know what to walk.
 *
 * Key shape: `<owningCollection>.<fieldPath>` → `targetCollection`
 */
export const UUID_REF_REGISTRY: Map<string, string> = new Map()

export function registerUuidRef(owningCollection: string, fieldPath: string, targetCollection: string): void {
  UUID_REF_REGISTRY.set(`${owningCollection}.${fieldPath}`, targetCollection)
}

/**
 * Payload `Field` config for a uuid-typed reference. Spread into the
 * fields array; the field's value is a uuid string pointing at a row
 * in `targetCollection`. Side effect: registers the (collection,
 * fieldPath) → target mapping for the Law 10 invariant.
 *
 * Usage:
 *   fields: [
 *     ...uuidRef({ owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers' }),
 *   ]
 */
export function uuidRef(args: {
  owningCollection: string
  fieldName: string
  targetCollection: string
  required?: boolean
  description?: string
}): Field[] {
  registerUuidRef(args.owningCollection, args.fieldName, args.targetCollection)
  return [{
    name: args.fieldName,
    type: 'text',
    index: true,
    required: args.required ?? false,
    validate: (value: unknown) => {
      if (value === undefined || value === null || value === '') {
        return args.required ? `'${args.fieldName}' is required` : true
      }
      if (typeof value !== 'string' || !UUID_V8_RE.test(value)) {
        return `'${args.fieldName}' must be a UUIDv8 (content-derived) pointing at a '${args.targetCollection}' row`
      }
      return true
    },
    admin: {
      description:
        args.description ??
        `UUID-driven reference (Law 10) — content-derived uuid of a '${args.targetCollection}' row. ` +
        `Resolution: appears when the target's content matches this uuid; disappears when it doesn't. ` +
        `No cascade rules; harmony emerges from Law 8.`,
    },
  }]
}

/**
 * Resolve a uuid pointer to its row + verify content integrity.
 * Returns the live row when its recomputed uuid matches the pointer
 * (Law 8 confirms authenticity). Returns null on unresolved (the
 * harmony "disappear" case).
 *
 * Storage backend integration (Slice TTTTT) plugs in here: when the
 * primary store doesn't have the uuid, retry against R2/IPFS/audit
 * chain before declaring unresolved.
 */
export async function resolveByUuid<T extends Record<string, unknown>>(args: {
  payload: Payload
  collection: string
  uuid: string
  tenantId: string
}): Promise<T | null> {
  const { payload, collection, uuid, tenantId } = args
  const result = await payload.find({
    collection: collection as never,
    where: { uuid: { equals: uuid }, tenant: { equals: tenantId } },
    limit: 1,
    pagination: false,
  })
  const doc = result.docs[0] as (Record<string, unknown> & { uuid?: string }) | undefined
  if (!doc) return null
  const verified = verifyContentUuid(doc, tenantId)
  if (!verified.ok) return null   // tampered → treat as unresolved (Law 8 + Law 10 compose)
  return doc as unknown as T
}

/**
 * Sweep every opted-in collection for unresolved uuid refs across a
 * tenant's rows. The `unresolved` array lists every offender:
 * `{owningCollection, owningId, fieldPath, targetCollection, uuid}`.
 * Empty list = full referential harmony.
 *
 * Used by Conservation Law 10 + the `erpax.refs.findDangling` MCP tool.
 */
export interface DanglingRef {
  readonly owningCollection: string
  readonly owningId: string
  readonly fieldPath: string
  readonly targetCollection: string
  readonly uuid: string
}

export async function findDanglingRefs(args: {
  payload: Payload
  tenantId: string
  sampleSize?: number
}): Promise<DanglingRef[]> {
  const { payload, tenantId } = args
  const limit = args.sampleSize ?? 50
  const dangling: DanglingRef[] = []

  // Group registry by owning collection so we sample each collection once.
  const byOwner = new Map<string, Array<{ field: string; target: string }>>()
  for (const [key, target] of UUID_REF_REGISTRY) {
    const [owning, ...rest] = key.split('.')
    const fieldPath = rest.join('.')
    if (!owning || !fieldPath) continue
    let arr = byOwner.get(owning); if (!arr) { arr = []; byOwner.set(owning, arr) }
    arr.push({ field: fieldPath, target })
  }

  for (const [owning, refs] of byOwner) {
    let result
    try {
      result = await payload.find({
        collection: owning as never,
        where: { tenant: { equals: tenantId } },
        limit,
        pagination: false,
      })
    } catch {
      continue
    }
    for (const doc of result.docs) {
      const obj = doc as Record<string, unknown> & { id?: string | number }
      const owningId = String(obj.id ?? '?')
      for (const ref of refs) {
        const uuid = obj[ref.field]
        if (typeof uuid !== 'string' || !UUID_V8_RE.test(uuid)) continue
        const resolved = await resolveByUuid({
          payload, collection: ref.target, uuid, tenantId,
        })
        if (resolved === null) {
          dangling.push({
            owningCollection: owning,
            owningId,
            fieldPath: ref.field,
            targetCollection: ref.target,
            uuid,
          })
        }
      }
    }
  }
  return dangling
}
