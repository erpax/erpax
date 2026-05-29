/**
 * Identification — resolve any uuid-family handle to its entity.
 *
 * Slice KKKKKKKKK-cut1 (2026-05-11). Per user 'identification and
 * multi search'.
 *
 * Every entity in ERPax has multiple identifiers — content uuid (Slice
 * RRRRR), short uuid (FFFFFFF), DID (DDDDDD), signed JWS (HHHHHHHHH),
 * plain Payload id, type uuid (GGGGGGG). Up until now each lived in
 * its own service. The user's directive collapses them: ONE function
 * — `identifyAny(query, ctx)` — recognises the identifier kind and
 * resolves to the underlying row.
 *
 * Identification is the *typed* case of multi-search. When the query
 * matches one of the documented identifier patterns, identification
 * succeeds with a definite answer. When it doesn't, the caller should
 * escalate to `multiSearch` (sibling service) for free-text find.
 *
 * Resolution order (first match wins; deterministic):
 *
 *   1. **Full content UUID v5** (RFC 4122 §4.3, 36 chars)
 *        → `resolveByUuid` across the entity's collection, or scan
 *          the uuid-ref registry to find the owning collection.
 *   2. **Compact JWS** (3 base64url segments separated by `.`)
 *        → `fromJws` recovers the signed contentUuid → recurse via #1.
 *   3. **DID** (starts with `did:erpax:`)
 *        → `uuidFromDid` → recurse via #1.
 *   4. **Short uuid** (`<3-char-prefix>_<hex>`)
 *        → `parseShortUuid` → tenant-scoped candidate scan via
 *          `lookupShort` over the row uuids in the matching kind.
 *   5. **Payload id** (any other non-empty string)
 *        → `findByID` against the caller-supplied `collection` hint;
 *          without hint, escalate to multi-search.
 *
 * Each match returns an `IdentificationResult` carrying:
 *   - the resolved row (or `null` when verifiable-but-absent),
 *   - which identifier kind matched,
 *   - the canonical contentUuid (when derivable — useful for caller's
 *     downstream verify / federation / audit calls).
 *
 * @standard RFC 4122 §4.3 uuidv5
 * @standard RFC 7515 JWS compact form
 * @standard W3C DID Core 1.0 (DID syntax)
 * @standard ISO/IEC 25010:2023 §5.3 operability (one input → one resolver)
 * @audit Conservation Law 10 referential-harmony (resolution = uuid-binding check)
 * @audit Conservation Law 46 uuid-short-display (short uuid kinds enumerated)
 * @feature identification
 * @see /src/services/integrity/content-uuid.ts (computeContentUuid)
 * @see /src/services/integrity/uuid-ref.ts (resolveByUuid + UUID_REF_REGISTRY)
 * @see /src/services/integrity/uuid-short.ts (parseShortUuid + lookupShort)
 * @see /src/services/integrity/signatures.ts (fromJws — recover signed uuid)
 * @see /src/services/did/index.ts (uuidFromDid)
 * @see ../multi-search/index.ts (free-text fallback)
 */

import type { Payload } from 'payload'
import type { ShortUuidKind } from '../integrity/uuid-short'

/** Identifier kinds the resolver can recognise. */
export type IdentifierKind =
  | 'content-uuid'   // 36-char RFC 4122 §4.3 (uuidv5)
  | 'jws'            // 3-segment base64url RFC 7515 — signature recovers contentUuid
  | 'did'            // W3C DID — did:erpax:<tenant>:<uuid>
  | 'short-uuid'     // FFFFFFF kind-prefixed (aud_/inv_/std_/…)
  | 'payload-id'     // raw db row id (when collection is known)
  | 'unknown'        // no match — caller should escalate to multi-search

export interface IdentificationResult<T = unknown> {
  readonly kind: IdentifierKind
  /** Resolved row, or null if the identifier was well-formed but no row exists. */
  readonly row: T | null
  /** The collection the row lives in (when known). */
  readonly collection?: string
  /**
   * The canonical content-uuid for the entity — useful for downstream
   * audit / federation / verify calls. Present whenever a content-uuid
   * was derivable (always true except `payload-id`).
   */
  readonly contentUuid?: string
  /** Why the query matched (helps debugging ambiguous queries). */
  readonly matchedRule: string
}

/** Regex set — keep public so callers can reuse for client-side hints. */
export const UUID_V5_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export const JWS_RE = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/
export const DID_RE = /^did:erpax:/i
export const SHORT_UUID_RE = /^[a-z]{3}_[a-f0-9]+$/

export interface IdentifyContext {
  readonly payload: Payload
  readonly tenantId: string
  /** When the caller knows the target collection, identification can use findByID. */
  readonly collectionHint?: string
}

/**
 * Identify a single query string. Returns the first matching rule.
 * Order matters: full uuid → JWS → DID → short uuid → payload id.
 */
export async function identifyAny<T = unknown>(
  query: string,
  ctx: IdentifyContext,
): Promise<IdentificationResult<T>> {
  const q = (query ?? '').trim()
  if (q.length === 0) {
    return { kind: 'unknown', row: null, matchedRule: 'empty-query' }
  }

  // 1. Full content uuid.
  if (UUID_V5_RE.test(q)) {
    return await resolveContentUuid<T>(q, ctx, 'content-uuid:direct-match')
  }

  // 2. JWS compact form — recover the signed contentUuid first.
  if (JWS_RE.test(q)) {
    try {
      const { fromJws } = await import('../integrity/signatures')
      const signed = fromJws<T>(q)
      const uuid = String(signed.uuid)
      if (UUID_V5_RE.test(uuid)) {
        return await resolveContentUuid<T>(uuid, ctx, 'jws:recovered-contentUuid')
      }
    } catch {
      // Malformed JWS — fall through to other rules.
    }
  }

  // 3. DID.
  if (DID_RE.test(q)) {
    try {
      const did = await import('../did')
      const uuid = did.uuidFromDid?.(q)
      if (uuid && UUID_V5_RE.test(uuid)) {
        return await resolveContentUuid<T>(uuid, ctx, 'did:resolved-to-contentUuid')
      }
    } catch {
      /* DID service unavailable — continue */
    }
  }

  // 4. Short uuid.
  if (SHORT_UUID_RE.test(q)) {
    return await resolveShortUuid<T>(q, ctx)
  }

  // 5. Plain Payload id — requires a collection hint.
  if (ctx.collectionHint) {
    try {
      const row = await ctx.payload.findByID({
        collection: ctx.collectionHint as never,
        id: q,
      }) as T | null
      if (row) {
        return {
          kind: 'payload-id',
          row,
          collection: ctx.collectionHint,
          matchedRule: 'payload-id:findByID',
        }
      }
    } catch {
      /* not found / wrong collection */
    }
  }

  return { kind: 'unknown', row: null, matchedRule: 'no-rule-matched' }
}

/**
 * Resolve a 36-char content uuid by scanning the uuid-ref registry
 * (Slice UUUUU) for collections that hold this uuid as their content
 * key. Returns the FIRST owning collection's row — content uuids are
 * globally unique by Law 8, so first hit is canonical.
 */
async function resolveContentUuid<T>(
  uuid: string,
  ctx: IdentifyContext,
  matchedRule: string,
): Promise<IdentificationResult<T>> {
  const { resolveByUuid, UUID_REF_REGISTRY } = await import('../integrity/uuid-ref')

  // If the caller hinted a collection, try it first (faster).
  const tryCollections: string[] = []
  if (ctx.collectionHint) tryCollections.push(ctx.collectionHint)
  // Collections that hold content-uuid as a top-level field — derived
  // from UUID_REF_REGISTRY's *target* collections (every value in the
  // map is a collection slug that owns content-uuid rows).
  for (const target of UUID_REF_REGISTRY.values()) {
    if (!tryCollections.includes(target)) tryCollections.push(target)
  }

  for (const col of tryCollections) {
    try {
      const row = await resolveByUuid<Record<string, unknown>>({
        payload: ctx.payload,
        collection: col,
        uuid,
        tenantId: ctx.tenantId,
      })
      if (row) {
        return {
          kind: 'content-uuid',
          row: row as unknown as T,
          collection: col,
          contentUuid: uuid,
          matchedRule,
        }
      }
    } catch {
      /* try next collection */
    }
  }
  return {
    kind: 'content-uuid',
    row: null,
    contentUuid: uuid,
    matchedRule: `${matchedRule}:not-found-in-any-collection`,
  }
}

/**
 * Resolve a short uuid (`aud_a1b2c3d4`). The short form encodes a
 * prefix that hints the entity kind; we narrow the candidate-collection
 * set by kind, then full-prefix-match using `lookupShort`.
 */
async function resolveShortUuid<T>(
  short: string,
  ctx: IdentifyContext,
): Promise<IdentificationResult<T>> {
  const { parseShortUuid, lookupShort } = await import('../integrity/uuid-short')
  const parsed = parseShortUuid(short)
  if (!parsed || parsed.kind === 'unknown') {
    return { kind: 'short-uuid', row: null, matchedRule: 'short-uuid:unknown-prefix' }
  }
  // Map short-uuid kind → likely collection slug. Kinds are defined in
  // uuid-short.ts; collections that follow the same name convention
  // are plural-of-kind (audit → audit-events, invoice → invoices, etc).
  const kindToCollection: Partial<Record<ShortUuidKind, string>> = {
    audit: 'audit-events',
    vote: 'votes',
    invoice: 'invoices',
    payment: 'payments',
    chain: 'business-chains',
    agent: 'agents',
    collection: 'collections-meta',
    role: 'roles',
    standard: 'standards',
  }
  const candidateCollection = kindToCollection[parsed.kind] ?? ctx.collectionHint
  if (!candidateCollection) {
    return {
      kind: 'short-uuid',
      row: null,
      matchedRule: `short-uuid:no-collection-mapping-for-kind:${parsed.kind}`,
    }
  }

  // Fetch the tenant's active uuid candidates from the candidate
  // collection. Best-effort: limit to 1000 to avoid runaway scans.
  let candidates: string[] = []
  try {
    const res = await ctx.payload.find({
      collection: candidateCollection as never,
      where: { tenant: { equals: ctx.tenantId } } as never,
      limit: 1000,
      depth: 0,
    } as never) as { docs: Array<{ uuid?: string; id?: string }> }
    candidates = res.docs.map((d) => d.uuid ?? d.id ?? '').filter(Boolean)
  } catch {
    /* collection missing or filter unsupported — continue with empty set */
  }
  const result = lookupShort(short, candidates)
  if (result.status !== 'found') {
    return {
      kind: 'short-uuid',
      row: null,
      collection: candidateCollection,
      matchedRule: `short-uuid:${result.status}`,
    }
  }
  // Re-resolve the full uuid through the content-uuid path.
  return await resolveContentUuid<T>(result.fullUuid, { ...ctx, collectionHint: candidateCollection }, `short-uuid:expanded-to-contentUuid`)
}
