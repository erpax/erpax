# ERPax Storage Standards — Deep Reference

Slice TTTTTT + slice UUUUUU + slice TTTTTTTT (2026-05-11). The storage layer at `src/services/storage-independence/index.ts` collapses traditional distinctions between primary/replica, backup/live, active/passive, leader-election, and conflict-resolution into a single property: **every object carries its content uuid; every reference travels with the uuid; replication = byte copy + uuid verify**. Two conservation laws govern it — 35 (independence) and 36 (consensus). Trinity collapse (slice JJJJJJJJ) places both at **Law I (Identity)**.

> **Cross-reference**: top-level index at [README.md](./README.md); UUID foundation at [integrity.md](./integrity.md); MCP layer at [mcp.md](./mcp.md).

---

## 1. The seven implications of "any object is storage-independent" (per spec §0n)

When every object carries its content uuid + every reference travels with the uuid:

| Implication | What collapses |
|---|---|
| 1. Migration is free | Copy bytes; recompute uuid; if equal, accept. No "migration tool". |
| 2. Multi-backend redundancy | Store same object in K backends; K agreement = Byzantine-fault-tolerant read. |
| 3. Sharding by tenant/region | Tenant-namespaced uuids → cross-shard collisions mathematically impossible. |
| 4. Cold-warm-hot tiers | Tier promotion/demotion = byte copy + uuid verify. No tier-metadata. |
| 5. Federation broadcasts | Every object can cross instances by uuid (slice AAAAAA). |
| 6. Backups | Bytes ARE the backup format; restore = read + verify. No proprietary format. |
| 7. Disaster recovery | Recover from any backend that holds the bytes. No "primary/secondary". |

Combined with replication-by-consensus (Law 36), several traditional concerns disappear entirely:

- No more "primary database vs read replicas" — all backends equal; reads use consensus, writes fan-out.
- No more "backup tier vs live tier" — they hold the same uuid'd bytes; tier is a routing decision.
- No more "active/passive failover" — when a backend goes down, the rest carry on; consensus threshold shifts.
- No more "leader election" for distributed writes — content-uuids collide on identical content.
- No more "conflict resolution" — uuids only collide when content is bit-identical; differing content has differing uuids; both retained.

## 2. The `BackendRecomputer` interface

```ts
interface BackendRecomputer {
  readonly id: BackendId
  readObject(args: { collection; uuid; tenantId }): Promise<Record<string, unknown> | null>
}
```

A backend is **anything** that can:
1. Read bytes for a given (collection, uuid) → return the object.
2. Re-derive the uuid by content-hashing the returned bytes.

ERPax ships an in-memory backend out of the box (auto-registered at module load); production backends register their reader via `registerBackend(b)`:

```
memory | d1 | r2 | kv | do | ipfs | arweave | filecoin | peer-erpax | federation | <custom>
```

## 3. Cross-backend verification

```ts
verifyAcrossBackends({ collection, uuid, tenantId }) → {
  ok: true | false,
  perBackend: [{ backend: BackendId, ok: boolean, recomputed?: string, reason?: string }, ...]
}
```

Reads the object from **every registered backend**; recomputes its content uuid; verifies all match. Missing replicas / tampered bytes are localizable to the offending backend.

## 4. Migration planning

`planMigration({source, target, collection, uuids, tenantId})` returns:

```ts
{
  toCopy: ReadonlyArray<string>       // in source, missing-or-corrupted in target
  alreadyPresent: ReadonlyArray<string>  // target has matching bytes
  missingFromSource: ReadonlyArray<string>  // gone — escalate
}
```

The byte-copy itself is delegated to the backend driver; planning is uuid-pure.

## 5. Replication (slice UUUUUU)

```ts
replicateObject({source, targets, collection, uuid, tenantId}) → Array<{
  ok: boolean
  target: BackendId
  recomputed: string
  reason?: 'target-not-writable' | 'post-write-not-found' | 'uuid-mismatch-after-write'
}>
```

Copies bytes from source backend to N target backends; recomputes uuid at each target; reports per-target verdict.

**No master/slave coordination, no conflict resolution, no vector clocks** — just N backends agreeing on uuid.

## 6. Consensus reads (slice UUUUUU)

```ts
consensusRead({collection, uuid, tenantId, minAgreement}) → {
  ok: boolean
  object?: Record<string, unknown>
  agreement: number          // how many backends returned matching uuid
  disagreement: Array<{ backend: BackendId; uuid: string }>
}
```

Reads from every registered backend; groups by recomputed uuid; succeeds if the target uuid has ≥`minAgreement` backends agreeing.

**Byzantine-fault-tolerant**: any backend serving tampered bytes fails alone; the consensus continues.

Production deploys raise `minAgreement` from 1 (boot baseline) to N≤K once K real backends are online.

## 7. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **35** | storage independence | Synthetic content-uuid object recomputes the same uuid across every registered backend | **I** (Identity) |
| **36** | replication consensus | `consensusRead` with `minAgreement=1` succeeds on the in-memory backend at boot; production raises N≤K | **I** (Identity) |

## 8. RFC-IETF stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | Content uuid as the storage key | `storage-independence/index.ts` via `content-uuid.ts` | `erpax.storage.verifyAcrossBackends` |
| **RFC 8785 — JCS** | Canonical bytes for stable cross-runtime uuid | indirect | indirect |
| **FIPS 180-4 — SHA-256** | Hash function backing the uuid | indirect | indirect |

## 9. Distributed-system stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **CAP theorem** | UUID-consensus reads choose CP — replicas may be unavailable; survivors give consistent answers | `storage-independence/index.ts` (consensusRead) | `erpax.storage.consensusRead` |
| **PACELC theorem** | Without partition, consensus optimises for L (latency); with partition, for C (consistency) | `storage-independence/index.ts` (minAgreement tunable) | `erpax.storage.consensusRead` |
| **Byzantine-fault-tolerance** | Tampered backends fail alone; consensus continues | `storage-independence/index.ts` (per-backend recompute) | `erpax.storage.replicate` |

## 10. ISO quality + audit stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **ISO/IEC 27040:2024** | Storage security — data integrity per-backend | `storage-independence/index.ts` | `erpax.storage.checkIndependence` |
| **ISO/IEC 25010:2023 §5.2 performance** | Replication latency budget per backend in the torus envelope | `topology/torus.ts` (TORUS_DEFAULT_ENVELOPE) | `erpax.platform.checkTorusBounded` |
| **ISO/IEC 25010:2023 §5.6 security — non-repudiation** | Every replica's content uuid is a verifiable claim | `storage-independence/index.ts` | every `erpax.storage.*` |
| **ISO 19011:2018 §6.4.6** | Cross-backend verification audit-trailed | `architecture-invariants/checks.ts` (Laws 35+36 probes) | `erpax.storage.checkIndependence` |

## 11. The infinite-within-finite property (slice IIIIIIIII)

Each uuid lives in:

- N storage backends (memory / D1 / R2 / KV / DO / IPFS / Arweave / Filecoin / peer-erpax)
- M federation peers (each itself a torus per slice CCCCCCC)
- K bitemporal versions (Law 11 + streamUuid hash-chain per Law 34)

Same content in N × M × K logical locations simultaneously — stored only once per backend (replication is byte-copy + uuid-verify, no per-replica metadata overhead). **Logical extent unbounded; physical footprint bounded by the torus envelope (Law 43).**

```
logical_extent_per_uuid = N(backends) × M(peers) × K(versions)
total_logical_uuids     = sum over all uuids of logical_extent_per_uuid
physical_bytes          = sum of distinct content stored
richness                = total_logical_uuids / physical_bytes
```

Conservation Law 48 verifies the property at runtime via `checkInfiniteFiniteness`.

## 12. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.storage.listBackends` | Enumerate registered backends |
| `erpax.storage.verifyAcrossBackends` | Per-backend uuid recompute verdict |
| `erpax.storage.planMigration` | Compute toCopy / alreadyPresent / missingFromSource |
| `erpax.storage.replicate` | Source → N targets; per-target verdict (Law 36) |
| `erpax.storage.consensusRead` | Byzantine-fault-tolerant N-of-K read (Law 36) |
| `erpax.storage.checkIndependence` | Conservation Law 35 verdict |

## 13. Coupling with other slices

- **Slice RRRRR (Law 8 content uuid)** — the foundation; storage independence is impossible without it.
- **Slice UUUUU (Law 10 referential harmony)** — refs travel with target uuid; moving a row across backends preserves all back-references automatically.
- **Slice EEEEEE (long-term archival)** — IPFS / Arweave / Filecoin are uuid-recoverable backends; archival is just byte-copy + register backend.
- **Slice AAAAAA (federation)** — peer ERPax instances are themselves backends in the consensus pool (with explicit trust-graph weighting).
- **Slice CCCCCCC (torus closure, Law 43)** — total physical bytes across all backends must respect the envelope.
- **Slice NNNNNNNN (PWA, Law 52)** — the SW cache is one of N backends; evicting locally doesn't lose data if IPFS / federation peer holds it.

## 14. Standards anchoring

@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — uuid composition
@standard CAP theorem + PACELC theorem — consistency / availability / partition / latency trade-offs
@standard Byzantine-fault-tolerance (informal) — survivor consensus
@standard ISO/IEC 27040:2024 — storage security
@standard ISO/IEC 25010:2023 §5.2 + §5.6 — performance + non-repudiation
@standard ISO 19011:2018 §6.4.6 — cross-backend verification audit-trailed

## 15. Cross-reference — alphabetized

Byzantine-fault-tolerance, CAP theorem, FIPS 180-4, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.2 + §5.6, ISO/IEC 27040:2024, PACELC theorem, RFC 4122 §4.3, RFC 8259, RFC 8785.
