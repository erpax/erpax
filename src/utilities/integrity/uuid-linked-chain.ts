/**
 * Uuid-linked Durable Object chain — Slice TTTTTTTT (2026-05-11).
 *
 * Per user "using durable objects linked using uuid would prevent
 * tampering". Each append-only DO (canonical use: AUDIT_CHAIN_DO per
 * tenant) holds a sequence of leaves where leaf N's uuid is computed
 * from leaf N-1's uuid PLUS the payload uuid PLUS the timestamp:
 *
 *   leafUuid_N = sha256(
 *     prevLeafUuid (or "GENESIS" for N=0)
 *     || canonical(payload).contentUuid
 *     || timestamp.iso
 *   )
 *
 * Properties:
 *
 *   1. **Forward-immutable**: changing leaf K's payload changes
 *      leafUuid_K → leafUuid_{K+1} doesn't match (since it was
 *      computed against the original) → every leaf K+1..N becomes
 *      detectably-broken.
 *
 *   2. **Recompute-and-verify**: any reader can re-derive leafUuid_N
 *      from the stored payload + claimed prevLeafUuid + timestamp.
 *      A mismatch is proof of tampering.
 *
 *   3. **Replay-immune** across tenants: the chain head is keyed by
 *      `tenant:${tenantId}` via DurableObjectNamespace.idFromName, so
 *      no cross-tenant injection is possible.
 *
 *   4. **Public anchor**: the latest leafUuid can be anchored on a
 *      public chain (Slice BBBBBB) — any subsequent rewrite of the
 *      DO chain is detectable by comparing the latest leafUuid to the
 *      anchored value.
 *
 * Companion: `auditChainAppendLinked` in services/cloudflare/index.ts
 * uses this module to compose every append. `auditChainVerify` walks
 * the chain end-to-end and reports the first broken link.
 *
 * @standard FIPS 180-4 sha-256
 * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
 * @standard RFC 9562 §5.8 name-based UUID
 * @audit Conservation Law 8 content-uuid (per-leaf)
 * @audit Conservation Law 9 storage-redundancy (linkable across stores)
 * @audit ISO 19011:2018 §6.4.6 tamper-evident audit evidence
 */
import { createHash } from 'node:crypto'

export interface UuidLinkedLeaf {
  readonly leafUuid: string       // sha256 of (prev || payload || ts)
  readonly prevLeafUuid: string   // "GENESIS" for the first leaf
  readonly payloadUuid: string    // content-uuid of the payload itself
  readonly timestampIso: string   // ISO 8601-1:2019 timestamp
  readonly seq: number            // 0-based index in the chain
  /** Optional Ed25519 signature over the leafUuid (DID-binding, Slice DDDDDD). */
  readonly signature?: string
}

export const GENESIS_PREV_UUID = 'GENESIS'

/** Canonical JSON (RFC 8785-style) for hashing. Sorts keys deterministically. */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(canonicalJson).join(',') + ']'
  const obj = value as Record<string, unknown>
  const keys = Object.keys(obj).sort()
  return '{' + keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(obj[k])}`).join(',') + '}'
}

/** Compute the content uuid of a payload (sha256 of canonical JSON). */
export function payloadContentUuid(payload: unknown): string {
  return createHash('sha256').update(canonicalJson(payload)).digest('hex')
}

/** Compute the leaf uuid given the prev/payload/timestamp triple. */
export function computeLeafUuid(args: {
  prevLeafUuid: string
  payloadUuid: string
  timestampIso: string
}): string {
  return createHash('sha256')
    .update(`${args.prevLeafUuid}|${args.payloadUuid}|${args.timestampIso}`)
    .digest('hex')
}

/** Build the next leaf in the chain from a head + payload. */
export function buildNextLeaf(args: {
  head: { leafUuid: string; seq: number } | null
  payload: unknown
  timestampIso?: string
  signature?: string
}): UuidLinkedLeaf {
  const prevLeafUuid = args.head?.leafUuid ?? GENESIS_PREV_UUID
  const seq = args.head ? args.head.seq + 1 : 0
  const timestampIso = args.timestampIso ?? new Date().toISOString()
  const payloadUuid = payloadContentUuid(args.payload)
  const leafUuid = computeLeafUuid({ prevLeafUuid, payloadUuid, timestampIso })
  return {
    leafUuid, prevLeafUuid, payloadUuid, timestampIso, seq,
    ...(args.signature ? { signature: args.signature } : {}),
  }
}

export interface ChainVerifyResult {
  readonly ok: boolean
  readonly chainLength: number
  /** First broken link's seq number, or null if intact. */
  readonly brokenAtSeq?: number
  /** Reason for failure (when !ok). */
  readonly reason?: string
}

/**
 * Walk a stored chain and verify every link. Each leaf must:
 *   1. Have its leafUuid == computeLeafUuid({ prevLeafUuid, payloadUuid, timestampIso })
 *   2. Have prevLeafUuid == previous leaf's leafUuid (or GENESIS for seq 0)
 *   3. Have seq == previous.seq + 1
 *   4. Have payloadUuid == payloadContentUuid(retrievedPayload)
 *
 * The retrievePayload callback fetches the payload for a leaf so the
 * canonical uuid can be re-derived. Returns ChainVerifyResult; ok=false
 * with brokenAtSeq pinpoints the tampered leaf.
 *
 * Fail-closed: when retrievePayload is provided, a leaf whose payload comes
 * back undefined/null is reported as ok=false (payload unavailable), NOT
 * skipped and NOT thrown — a missing payload is treated as an unverifiable
 * (therefore failing) link, so callers cannot mistake a retrieval gap for
 * trust. This verifier never throws on payload content; it returns a result.
 */
export async function verifyUuidLinkedChain(args: {
  leaves: ReadonlyArray<UuidLinkedLeaf>
  retrievePayload?: (leaf: UuidLinkedLeaf) => Promise<unknown>
}): Promise<ChainVerifyResult> {
  const { leaves, retrievePayload } = args
  if (leaves.length === 0) {
    return { ok: true, chainLength: 0 }
  }
  let prevLeafUuid = GENESIS_PREV_UUID
  let expectedSeq = 0
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]!
    if (leaf.seq !== expectedSeq) {
      return {
        ok: false, chainLength: leaves.length, brokenAtSeq: leaf.seq,
        reason: `seq mismatch at index ${i}: expected ${expectedSeq}, got ${leaf.seq}`,
      }
    }
    if (leaf.prevLeafUuid !== prevLeafUuid) {
      return {
        ok: false, chainLength: leaves.length, brokenAtSeq: leaf.seq,
        reason: `prevLeafUuid mismatch at seq ${leaf.seq}: expected ${prevLeafUuid}, got ${leaf.prevLeafUuid}`,
      }
    }
    const recomputed = computeLeafUuid({
      prevLeafUuid: leaf.prevLeafUuid,
      payloadUuid: leaf.payloadUuid,
      timestampIso: leaf.timestampIso,
    })
    if (recomputed !== leaf.leafUuid) {
      return {
        ok: false, chainLength: leaves.length, brokenAtSeq: leaf.seq,
        reason: `leafUuid recompute mismatch at seq ${leaf.seq}: expected ${recomputed}, stored ${leaf.leafUuid}`,
      }
    }
    if (retrievePayload) {
      const payload = await retrievePayload(leaf)
      // Fail-closed: a caller that supplies retrievePayload is asserting it can
      // produce the payload for every leaf. A missing payload (undefined/null —
      // e.g. retrieval failed or the decisions array is short of the chain) must
      // be an explicit verification FAILURE, never a thrown exception. Without
      // this guard, payloadContentUuid(undefined) calls createHash().update(undefined)
      // which THROWS (ERR_INVALID_ARG_TYPE): a thrown verifier is a DoS hazard and
      // can flip fail-open if a caller try/catches the throw and treats it as trust.
      if (payload === undefined || payload === null) {
        return {
          ok: false, chainLength: leaves.length, brokenAtSeq: leaf.seq,
          reason: `payload unavailable at seq ${leaf.seq}: cannot verify payloadUuid ${leaf.payloadUuid} against a missing payload`,
        }
      }
      const computedPayloadUuid = payloadContentUuid(payload)
      if (computedPayloadUuid !== leaf.payloadUuid) {
        return {
          ok: false, chainLength: leaves.length, brokenAtSeq: leaf.seq,
          reason: `payload tampered at seq ${leaf.seq}: stored payloadUuid ${leaf.payloadUuid}, recomputed ${computedPayloadUuid}`,
        }
      }
    }
    prevLeafUuid = leaf.leafUuid
    expectedSeq++
  }
  return { ok: true, chainLength: leaves.length }
}
