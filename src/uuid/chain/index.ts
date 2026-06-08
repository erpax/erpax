/**
 * UUID-binding IS the blockchain leaf — Conservation Law 60.
 *
 * Slice TTTTTTTTT-cut1 (2026-05-11). Per user 'also the uuid:uuid
 * can be represented as uuid and this defines the blockchains'.
 *
 * The unifying observation: a `KvBinding<K, V>` (Slice QQQQQQQQQ /
 * Law 57) is a pair `(keyUuid, valueUuid)` whose own content-uuid is
 * `computeKvBindingUuid({keyUuid, valueUuid, tenantId})`. If we use
 * `keyUuid = prevLeafUuid` and `valueUuid = payloadUuid`, the
 * resulting binding-uuid IS the leaf of a hash chain. Chaining
 * bindings — each binding's `keyUuid` = previous binding's
 * binding-uuid — IS what a blockchain is.
 *
 *   Genesis        leaf_0 = computeKvBindingUuid(0, payload_0_uuid)
 *   Step 1         leaf_1 = computeKvBindingUuid(leaf_0, payload_1_uuid)
 *   Step 2         leaf_2 = computeKvBindingUuid(leaf_1, payload_2_uuid)
 *   …
 *   HEAD           leaf_N = computeKvBindingUuid(leaf_{N-1}, payload_N_uuid)
 *
 * Walking HEAD backwards via the `prev` pointer reconstructs the
 * chain; recomputing each `leaf_i` from `(prev, payload)` confirms
 * tamper-resistance (Law 55: cost is depth × sig × dimensions ×
 * stream-count). Verifying a chain is O(N); tampering is exponential.
 *
 * This module is the GENERIC framing — the existing Slice TTTTTTTT
 * `UuidLinkedLeaf` (audit chain in a Durable Object) and Slice BBBBBB
 * (blockchain anchoring) are concrete instantiations of this same
 * structure. Both compose: an `UuidLinkedLeaf` is already a
 * `ChainLink`; an external blockchain anchor is just one more
 * `ChainLink` whose payloadUuid is the HEAD of the local chain.
 *
 * Standards lineage:
 *   - RFC 9562 §5.8 + RFC 8785 (the hash that makes leaves stable)
 *   - NIST FIPS 180-4 SHA-256 (collision-resistance budget)
 *   - Bitcoin §3 (the original hash chain — same shape, different math)
 *   - Ethereum YP §4.3 (block headers — `prev` pointer + content hash)
 *   - ISO/IEC 23257-1 (blockchain reference architecture)
 *   - ITU-T Y.4810 (DLT terminology — leaf / block / chain)
 *
 * @standard RFC 9562 §5.8 uuidv8
 * @standard RFC 8785 JSON Canonicalization Scheme
 * @standard NIST FIPS 180-4 SHA-256
 * @standard ISO/IEC 23257-1 blockchain reference architecture
 * @standard ITU-T Y.4810 DLT terminology
 * @audit Conservation Law 8 + 47 + 55 + 57 + 60
 * @feature uuid_chain
 * @see /src/services/uuid-kv/index.ts (KvBinding + computeKvBindingUuid)
 * @see /src/services/integrity/uuid-linked-chain.ts (UuidLinkedLeaf — concrete instance)
 * @see /src/services/integrity/tamper-reverse-cost.ts (Law 55 cost calculator)
 */

import type { ContentUuid } from '@/integrity'
import { computeKvBindingUuid } from '@/uuid/kv'
// Slice XXXXXXXXX-cut1 (2026-05-11) — chain leaves now emit RFC 9562
// structured uuidv8 with slot=chainLeaf + capabilities=CHAINED (+
// SEALED when the caller signals a stream-pause leaf). Every leaf in
// the platform's audit chain now contributes to Law 61/62 coverage.
import {
  encodeStructured, SLOT_TAGS, CAPABILITIES, NIL_UUID,
} from '@/uuid/format'

/**
 * Special sentinel for the genesis leaf's `prev`: the RFC 9562 §5.9
 * Nil UUID (all-zeroes), the spec-sanctioned "no predecessor". By
 * convention, every chain's genesis points at this; no two chains
 * share a genesis *leaf* because each first link's binding-uuid
 * differs by its payload + tenant + timestamp.
 *
 * Sourced from the single canonical `NIL_UUID` ([[uuid-format]]) so the
 * "absence" convention is defined exactly once and is byte-identical
 * across chain systems ([[streams]] STREAM_GENESIS, [[pwa]]). It is the
 * recompute anchor for `verifyChain`/`walkChain`: changing this literal
 * would invalidate already-persisted first-links, so it stays pinned to
 * the spec Nil. (Earlier slices used a misleading v5-shaped literal that
 * reads as a real SHA-1 name hash; §5.9 Nil is the correct "absence".)
 */
export const GENESIS_PREV_UUID = NIL_UUID as ContentUuid<{ kind: 'genesis' }>

/**
 * A chain link is a KvBinding from prev-leaf-uuid to payload-uuid,
 * augmented with the timestamp the link was forged. The leaf-uuid
 * is the binding's content-uuid.
 */
export interface ChainLink<P = unknown> {
  /** Content-uuid of this link — derived from (prev, payload, tenant). */
  readonly leafUuid: ContentUuid<ChainLink<P>>
  /** Predecessor leaf-uuid (or GENESIS_PREV_UUID for the first link). */
  readonly prevUuid: ContentUuid<ChainLink<P>> | typeof GENESIS_PREV_UUID
  /** Content-uuid of the payload this link attests to. */
  readonly payloadUuid: ContentUuid<P>
  /** Monotonic depth — 0 for genesis, +1 per link. */
  readonly depth: number
  /** ISO 8601 timestamp the link was forged. */
  readonly occurredAt: string
  /** Tenant namespace. */
  readonly tenantId: string
}

/**
 * Compute the leaf-uuid for a new link. Slice XXXXXXXXX-cut1
 * (2026-05-11): emits structured uuidv8 (Law 61) with slot=chainLeaf
 * + CHAINED capability (+ SEALED when `sealed:true`). The leaf is
 * SELF-DESCRIBING — `decodeStructured(leafUuid)` returns
 * `slot=chainLeaf` so downstream coverage / federation / verification
 * paths know what they're holding without consulting external tables.
 *
 * The `(prev, payload, ts, tenant, sealed)` tuple uniquely determines
 * the leaf-uuid. Federation peers compute byte-equal results from
 * byte-equal inputs.
 */
export function computeChainLinkUuid<P>(args: {
  prevUuid: ContentUuid<unknown>
  payloadUuid: ContentUuid<P>
  occurredAt: string
  tenantId: string
  /** Set true for leaves at stream-pause / merged-unity meeting points (Slice PPPPPPPPP-cont). */
  sealed?: boolean
}): ContentUuid<ChainLink<P>> {
  // Bind (prev, payload) under tenant via Law 57 — the binding-uuid
  // becomes the inner digest input. Preserves the federation-
  // determinism the prior implementation had.
  const bindingUuid = computeKvBindingUuid({
    keyUuid: args.prevUuid,
    valueUuid: args.payloadUuid,
    tenantId: args.tenantId,
  })
  // Slice XXXXXXXXX-cut1 — replace the raw computeContentUuid with
  // encodeStructured so the resulting leaf-uuid carries the
  // slot+capability metadata in its bits (Law 61). Identity +
  // verification + features fuse into one primitive.
  let capabilities = CAPABILITIES.CHAINED
  if (args.sealed === true) capabilities |= CAPABILITIES.SEALED
  return encodeStructured({
    slotTag: SLOT_TAGS.chainLeaf,
    capabilities,
    schemaVersion: 1,
    content: { bindingUuid, occurredAt: args.occurredAt },
    tenantId: args.tenantId,
  }) as ContentUuid<ChainLink<P>>
}

/**
 * Forge a new chain link on top of a prior leaf. Pure function — no
 * persistence side effects. Caller persists the returned link via
 * whatever store is appropriate (audit-events row, DO state, IPFS,
 * blockchain anchor — all the same shape).
 */
export function forgeChainLink<P>(args: {
  prevUuid: ContentUuid<unknown>
  prevDepth: number
  payloadUuid: ContentUuid<P>
  tenantId: string
  occurredAt?: string
  /**
   * Slice XXXXXXXXX-cut1 — when true, the leaf carries the SEALED
   * capability bit (Law 61) in addition to CHAINED. Use for stream-
   * pause / merged-unity meeting points where the writer has
   * (or will) produce a signature attesting the leaf.
   */
  sealed?: boolean
}): ChainLink<P> {
  const occurredAt = args.occurredAt ?? new Date().toISOString()
  const leafUuid = computeChainLinkUuid<P>({
    prevUuid: args.prevUuid,
    payloadUuid: args.payloadUuid,
    occurredAt,
    tenantId: args.tenantId,
    sealed: args.sealed === true,
  })
  return {
    leafUuid,
    prevUuid: args.prevUuid as ContentUuid<ChainLink<P>>,
    payloadUuid: args.payloadUuid,
    depth: args.prevDepth + 1,
    occurredAt,
    tenantId: args.tenantId,
  }
}

/**
 * Forge the genesis link of a fresh chain. Equivalent to
 * `forgeChainLink({ prevUuid: GENESIS_PREV_UUID, prevDepth: -1, ... })`
 * so its depth is 0.
 */
export function forgeGenesisLink<P>(args: {
  payloadUuid: ContentUuid<P>
  tenantId: string
  occurredAt?: string
  sealed?: boolean
}): ChainLink<P> {
  return forgeChainLink({
    prevUuid: GENESIS_PREV_UUID,
    prevDepth: -1,
    payloadUuid: args.payloadUuid,
    tenantId: args.tenantId,
    occurredAt: args.occurredAt,
    sealed: args.sealed === true,
  })
}

// ─── Verification ────────────────────────────────────────────────────

/**
 * Caller-supplied link store. The framework doesn't care WHERE links
 * live — D1 rows, KV entries, IPFS CIDs, an external blockchain — so
 * the verifier accepts a `getLink(leafUuid)` lookup that the caller
 * implements against its backing store.
 */
export interface LinkStore<P = unknown> {
  getLink(leafUuid: ContentUuid<ChainLink<P>>): Promise<ChainLink<P> | null>
}

/** Verification outcome — `ok: true` when the chain is intact end-to-end. */
export interface VerifyResult {
  readonly ok: boolean
  readonly depth: number
  readonly verifiedLeaves: number
  readonly firstFailureLeaf?: string
  readonly firstFailureReason?: string
}

/**
 * Walk a chain backwards from `headUuid` to genesis, recomputing
 * each leaf-uuid from `(prev, payload, occurredAt, tenant)` and
 * confirming it matches the stored leaf. Stops at first mismatch
 * with a reason.
 *
 * Verifier cost is O(N) (walk depth N). Tamper cost is exponential
 * per Law 55 — verification is asymmetrically cheap by design.
 *
 *   - `ok: true`  → chain intact from HEAD to genesis
 *   - `ok: false` → tamper detected; firstFailureLeaf identifies the
 *                    earliest divergence
 */
export async function verifyChain<P>(args: {
  headUuid: ContentUuid<ChainLink<P>>
  store: LinkStore<P>
  /** Maximum depth to traverse (safety bound — default 100k). */
  maxDepth?: number
}): Promise<VerifyResult> {
  const maxDepth = args.maxDepth ?? 100_000
  let cursor: ContentUuid<ChainLink<P>> | typeof GENESIS_PREV_UUID = args.headUuid
  let verified = 0
  let headDepth = 0
  for (let i = 0; i < maxDepth; i++) {
    if (cursor === GENESIS_PREV_UUID) {
      // Reached the sentinel — chain terminated cleanly.
      return { ok: true, depth: headDepth, verifiedLeaves: verified }
    }
    const link = await args.store.getLink(cursor as ContentUuid<ChainLink<P>>)
    if (!link) {
      return {
        ok: false,
        depth: headDepth,
        verifiedLeaves: verified,
        firstFailureLeaf: String(cursor),
        firstFailureReason: 'missing link in store',
      }
    }
    if (verified === 0) headDepth = link.depth
    const expectedUuid = computeChainLinkUuid<P>({
      prevUuid: link.prevUuid,
      payloadUuid: link.payloadUuid,
      occurredAt: link.occurredAt,
      tenantId: link.tenantId,
    })
    if (expectedUuid !== link.leafUuid) {
      return {
        ok: false,
        depth: headDepth,
        verifiedLeaves: verified,
        firstFailureLeaf: String(cursor),
        firstFailureReason: `recomputed leaf uuid '${expectedUuid}' ≠ stored '${link.leafUuid}'`,
      }
    }
    verified++
    cursor = link.prevUuid
  }
  return {
    ok: false,
    depth: headDepth,
    verifiedLeaves: verified,
    firstFailureLeaf: String(cursor),
    firstFailureReason: `maxDepth ${maxDepth} reached without hitting genesis`,
  }
}

/**
 * Walk a chain from HEAD to a target depth (or genesis) yielding
 * each link in order. Useful for federation export (emit the last N
 * links to a peer) and audit replay (recompute downstream state).
 */
export async function *walkChain<P>(args: {
  headUuid: ContentUuid<ChainLink<P>>
  store: LinkStore<P>
  toDepth?: number
  maxDepth?: number
}): AsyncIterableIterator<ChainLink<P>> {
  const maxDepth = args.maxDepth ?? 100_000
  let cursor: ContentUuid<ChainLink<P>> | typeof GENESIS_PREV_UUID = args.headUuid
  for (let i = 0; i < maxDepth; i++) {
    if (cursor === GENESIS_PREV_UUID) return
    const link = await args.store.getLink(cursor as ContentUuid<ChainLink<P>>)
    if (!link) return
    yield link
    if (args.toDepth !== undefined && link.depth <= args.toDepth) return
    cursor = link.prevUuid
  }
}
