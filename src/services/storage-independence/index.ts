/**
 * Storage independence — Slice TTTTTT (2026-05-11).
 *
 * Per user 'this way any object is storage independent'. The natural
 * conclusion of the slices preceding this one:
 *
 *   - Slice RRRRR: every object carries `uuid = uuidv5(content)` (Law 8)
 *   - Slice TTTTT: same uuid lets you store the object in any backend
 *                  (D1 / R2 / KV / DO / IPFS / Arweave / Filecoin /
 *                   peer ERPax instance) — read it back, recompute,
 *                   confirm bit-identity
 *   - Slice UUUUU: uuid-driven references (Law 10) — references travel
 *                  with the uuid, not with the storage primary key
 *   - Slice SSSSSS: stream events carry `streamUuid` hash-chain — same
 *                   property extended to time-ordered event sequences
 *
 * **Therefore**: any ERPax object — a row, a vote, a page seed, a
 * stream window, a federation envelope, a genome bundle — is
 * **storage-independent**: it can move to any backend, be replicated
 * to N backends, be sharded across backends, or migrate forever
 * without losing identity, integrity, or referential coherence.
 *
 * What changes when something is storage-independent:
 *
 *   1. **Migration is free** — copy bytes between any two backends;
 *      verify by recomputing uuid; if equal, accepted.
 *
 *   2. **Multi-backend redundancy** — store the same object in K
 *      backends; N-of-K consensus on uuid agreement is the
 *      Byzantine-fault-tolerant read.
 *
 *   3. **Sharding by tenant / region** — uuids are tenant-namespaced
 *      (RRRRR) so cross-shard collisions are mathematically
 *      impossible; the platform routes reads to the shard nearest
 *      the requester.
 *
 *   4. **Cold-warm-hot tiers** — hot tier is D1; warm tier is R2;
 *      cold tier is IPFS / Arweave / Filecoin (slice EEEEEE). Tier
 *      promotion / demotion = byte copy + uuid verify.
 *
 *   5. **Federation broadcasts** — slice AAAAAA already exchanges
 *      objects by uuid; this slice formalises that ANY object can
 *      cross instances, not just the federation-flagged collections.
 *
 *   6. **Backups** — a backup is just "store the bytes in a separate
 *      backend"; restore = "read bytes from backup; verify uuids".
 *      No proprietary backup format; the bytes themselves ARE the
 *      backup format.
 *
 *   7. **Disaster recovery** — if one backend goes down, the same
 *      object is recoverable from any other backend that holds it
 *      (subject to the K-of-N replication factor configured per
 *      tenant in slice TTTTT).
 *
 * Conservation Law 35 — `checkStorageIndependence`: for every
 * tamper-proof collection, prove that a sample object's uuid
 * recomputes the same value across all configured backends. The
 * boot-suite probe runs this against the in-memory backend (always
 * available); production deployments add D1 / R2 / etc. via
 * `BackendRecomputer` registrations.
 *
 * @standard ISO/IEC 27040:2024 — storage security (data integrity)
 * @standard W3C Verifiable Data Registry conformance (storage layer)
 * @standard RFC 4122 §4.3 + RFC 8785 (content-derived uuids)
 * @audit ISO 19011:2018 §6.4.6 (cross-backend verification audit-trailed)
 */

import { computeContentUuid } from '@/services/integrity/content-uuid'

export type BackendId = 'memory' | 'd1' | 'r2' | 'kv' | 'do' | 'ipfs' | 'arweave' | 'filecoin' | 'peer-erpax' | 'federation' | string

/**
 * A backend is anything that can:
 *   1. Read bytes for a given (collection, uuid) → return the object
 *   2. Re-derive the uuid by content-hashing the returned bytes
 *
 * Production backends (D1 / R2 / IPFS / …) register their reader at
 * boot; tests register an in-memory mock.
 */
export interface BackendRecomputer {
  readonly id: BackendId
  readObject(args: { collection: string; uuid: string; tenantId: string }): Promise<Record<string, unknown> | null>
}

const BACKENDS = new Map<BackendId, BackendRecomputer>()

export function registerBackend(b: BackendRecomputer): void {
  BACKENDS.set(b.id, b)
}

export function listBackends(): ReadonlyArray<BackendId> {
  return [...BACKENDS.keys()]
}

// ─── Cross-backend verification ────────────────────────────────────

export interface VerificationResult {
  readonly ok: boolean
  readonly collection: string
  readonly uuid: string
  readonly tenantId: string
  readonly perBackend: ReadonlyArray<{ backend: BackendId; ok: boolean; recomputed?: string; reason?: string }>
}

/**
 * Read the object from every registered backend; recompute its
 * content uuid; verify all match the input uuid. Returns per-backend
 * verdict so missing replicas / tampered bytes are localizable to
 * the offending backend.
 */
export async function verifyAcrossBackends(args: {
  collection: string; uuid: string; tenantId: string
}): Promise<VerificationResult> {
  const perBackend: { backend: BackendId; ok: boolean; recomputed?: string; reason?: string }[] = []
  for (const b of BACKENDS.values()) {
    try {
      const obj = await b.readObject(args)
      if (!obj) { perBackend.push({ backend: b.id, ok: false, reason: 'not-found' }); continue }
      const recomputed = computeContentUuid(obj as Record<string, unknown>, args.tenantId)
      perBackend.push({ backend: b.id, ok: recomputed === args.uuid, recomputed })
    } catch (err) {
      perBackend.push({ backend: b.id, ok: false, reason: (err as Error).message })
    }
  }
  return {
    ok: perBackend.length > 0 && perBackend.every((p) => p.ok),
    collection: args.collection,
    uuid: args.uuid,
    tenantId: args.tenantId,
    perBackend,
  }
}

// ─── In-memory backend (always registered for tests + probes) ──────

const MEMORY: Map<string, Record<string, unknown>> = new Map()

export const MEMORY_BACKEND: BackendRecomputer = {
  id: 'memory',
  async readObject({ collection, uuid }) {
    return MEMORY.get(`${collection}:${uuid}`) ?? null
  },
}

export function memoryPut(collection: string, obj: Record<string, unknown> & { uuid: string }): void {
  MEMORY.set(`${collection}:${obj.uuid}`, obj)
}

export function memoryClear(): void { MEMORY.clear() }

// Auto-register memory backend at module load.
registerBackend(MEMORY_BACKEND)

// ─── Migration & replication helpers ───────────────────────────────

export interface MigrationPlan {
  readonly source: BackendId
  readonly target: BackendId
  readonly collection: string
  readonly uuids: ReadonlyArray<string>
}

/**
 * Build a migration plan — list of uuids to copy from source to
 * target. The actual byte-copy is delegated to the backend driver;
 * this function validates that source has every uuid and target
 * does not (or already has the correct bytes).
 */
export async function planMigration(args: {
  source: BackendId; target: BackendId; collection: string; uuids: ReadonlyArray<string>; tenantId: string
}): Promise<{
  toCopy: ReadonlyArray<string>
  alreadyPresent: ReadonlyArray<string>
  missingFromSource: ReadonlyArray<string>
}> {
  const source = BACKENDS.get(args.source); const target = BACKENDS.get(args.target)
  if (!source || !target) throw new Error(`unknown backend(s): ${!source ? args.source : ''} ${!target ? args.target : ''}`.trim())
  const toCopy: string[] = []; const alreadyPresent: string[] = []; const missingFromSource: string[] = []
  for (const uuid of args.uuids) {
    const fromSrc = await source.readObject({ collection: args.collection, uuid, tenantId: args.tenantId })
    if (!fromSrc) { missingFromSource.push(uuid); continue }
    const fromTgt = await target.readObject({ collection: args.collection, uuid, tenantId: args.tenantId })
    if (!fromTgt) { toCopy.push(uuid); continue }
    const tgtRecomputed = computeContentUuid(fromTgt as Record<string, unknown>, args.tenantId)
    if (tgtRecomputed === uuid) alreadyPresent.push(uuid)
    else toCopy.push(uuid)  // target has corrupted bytes — overwrite
  }
  return { toCopy, alreadyPresent, missingFromSource }
}

// ─── Slice UUUUUU — replication via uuid consensus ─────────────────

/**
 * Per user 'uuid solves any replication'. Replication is the direct
 * consequence of storage independence + content-uuid: copy the
 * bytes to N backends; recompute uuid at each; if the recomputed
 * uuid matches the source uuid, the replica is consistent. No
 * master/slave coordination, no conflict resolution, no vector
 * clocks — just N backends agreeing on uuid.
 *
 * `replicateObject` is the primitive. Production wraps this with
 * Cloudflare Queues (slice IIIIII) for async fan-out.
 */
export interface ReplicationResult {
  readonly ok: boolean
  readonly target: BackendId
  readonly recomputed: string
  readonly reason?: string
}

export interface BackendWriter extends BackendRecomputer {
  writeObject(args: { collection: string; uuid: string; tenantId: string; bytes: Record<string, unknown> }): Promise<void>
}

export async function replicateObject(args: {
  source: BackendId; targets: ReadonlyArray<BackendId>; collection: string; uuid: string; tenantId: string
}): Promise<ReadonlyArray<ReplicationResult>> {
  const source = BACKENDS.get(args.source)
  if (!source) throw new Error(`unknown source backend ${args.source}`)
  const obj = await source.readObject({ collection: args.collection, uuid: args.uuid, tenantId: args.tenantId })
  if (!obj) throw new Error(`source backend ${args.source} has no ${args.collection}:${args.uuid}`)
  const out: ReplicationResult[] = []
  for (const targetId of args.targets) {
    const target = BACKENDS.get(targetId) as BackendWriter | undefined
    if (!target || typeof target.writeObject !== 'function') {
      out.push({ ok: false, target: targetId, recomputed: '', reason: 'target-not-writable' })
      continue
    }
    try {
      await target.writeObject({ collection: args.collection, uuid: args.uuid, tenantId: args.tenantId, bytes: obj })
      const after = await target.readObject({ collection: args.collection, uuid: args.uuid, tenantId: args.tenantId })
      if (!after) { out.push({ ok: false, target: targetId, recomputed: '', reason: 'post-write-not-found' }); continue }
      const recomputed = computeContentUuid(after as Record<string, unknown>, args.tenantId)
      out.push({ ok: recomputed === args.uuid, target: targetId, recomputed, reason: recomputed === args.uuid ? undefined : 'uuid-mismatch-after-write' })
    } catch (err) {
      out.push({ ok: false, target: targetId, recomputed: '', reason: (err as Error).message })
    }
  }
  return out
}

/**
 * Conservation Law 36 — N-of-K consensus read. Read the object from
 * up to K registered backends; if at least N return matching uuids,
 * the read succeeds. Byzantine-fault-tolerant: any backend serving
 * tampered bytes fails alone; the consensus continues.
 */
export interface ConsensusReadResult {
  readonly ok: boolean
  readonly object?: Record<string, unknown>
  readonly agreement: number       // how many backends agreed on the uuid
  readonly disagreement: ReadonlyArray<{ backend: BackendId; uuid: string }>
}

export async function consensusRead(args: {
  collection: string; uuid: string; tenantId: string; minAgreement: number
}): Promise<ConsensusReadResult> {
  const buckets = new Map<string, { object: Record<string, unknown>; backends: BackendId[] }>()
  for (const b of BACKENDS.values()) {
    const obj = await b.readObject({ collection: args.collection, uuid: args.uuid, tenantId: args.tenantId })
    if (!obj) continue
    const recomputed = computeContentUuid(obj as Record<string, unknown>, args.tenantId)
    const bucket = buckets.get(recomputed) ?? { object: obj, backends: [] }
    bucket.backends.push(b.id)
    buckets.set(recomputed, bucket)
  }
  const matching = buckets.get(args.uuid)
  const agreement = matching?.backends.length ?? 0
  const disagreement: { backend: BackendId; uuid: string }[] = []
  for (const [recomputed, bucket] of buckets) {
    if (recomputed === args.uuid) continue
    for (const b of bucket.backends) disagreement.push({ backend: b, uuid: recomputed })
  }
  return { ok: agreement >= args.minAgreement, object: matching?.object, agreement, disagreement }
}

// ─── Conservation Law 35 — storage independence probe ──────────────

export interface StorageIndependenceProbe {
  readonly ok: boolean
  readonly collection: string
  readonly backendsChecked: number
  readonly violations: ReadonlyArray<string>
}

/**
 * Conservation Law 35 — storage independence. Probe a synthetic
 * object across every registered backend; uuid must recompute the
 * same on every one. The boot-suite version runs against the in-
 * memory backend; production runs add D1 / R2 / IPFS / etc.
 */
export async function checkStorageIndependence(tenantId: string = 'storage-probe'): Promise<StorageIndependenceProbe> {
  const collection = 'storage-independence-probe'
  const obj = { tenantId, kind: 'probe', payload: { value: 42 } }
  const uuid = computeContentUuid(obj as Record<string, unknown>, tenantId)
  memoryPut(collection, { ...obj, uuid })
  const verification = await verifyAcrossBackends({ collection, uuid, tenantId })
  const violations = verification.perBackend.filter((p) => !p.ok).map((p) => `${p.backend}: ${p.reason ?? 'mismatch'}`)
  return {
    ok: verification.ok,
    collection,
    backendsChecked: verification.perBackend.length,
    violations,
  }
}
