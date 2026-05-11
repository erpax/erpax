# ERPax Integrity Standards — Deep Reference (the UUID family)

Slice RRRRRRRR (2026-05-11). Comprehensive reference for ERPax's integrity layer — the **UUID family**: content uuid (Law 8), referential harmony (Law 10), bitemporal (Law 11), provenance (Law 12), PQC (Law 18), blockchain anchoring (Law 19), storage independence (Law 35), replication consensus (Law 36), short uuid (Law 46), type uuid (Law 47), infinite-within-finite (Law 48), stream uuid (Law 34).

The UUID family is **the foundation everything else builds on**. The Trinity collapse (slice JJJJJJJJ) places it at:

- **Law I — Identity** (vortex A — Domain): "every thing has a uuid derived from its content"
- with cross-references into **Law II — Causality** (stream uuid hash-chain) and **Law III — Closure** (storage replication keeps things in-system).

> **Cross-reference**: This doc is the human-readable counterpart of the integrity entries in `MCP_STANDARDS_INDEX` (slice QQQQQQQQ). The full top-level index is [README.md](./README.md).

---

## 1. The seven layers of UUID

| Layer | Slice | What gets a uuid | Key invariant |
|---|---|---|---|
| **L1 — content** (object) | RRRRR | Every domain row (invoice, payment, vote, etc.) | Recompute ⇒ tamper-detect (Law 8) |
| **L2 — type** | GGGGGGG | Every TypeDescriptor (Zod / JSON Schema canonical form) | Type evolution = uuid transition (Law 47) |
| **L3 — reference** | UUUUU | Every cross-row link (foreign key) carries the target uuid | Refs appear/disappear in harmony (Law 10) |
| **L4 — display** | FFFFFFF | Every uuid shown in UI is short + kind-prefixed | UI never leaks full hash entropy (Law 46) |
| **L5 — stream** | SSSSSS | Every event in an EventStream | Hash-chain tamper-detect (Law 34) |
| **L6 — storage** | TTTTTT, UUUUUU | Every backend keys by uuid; replicas verify by uuid | Storage-independent + replicable (Laws 35, 36) |
| **L7 — proof / federation envelope** | DDDDDDD, AAAAAA | Every artefact crossing a trust boundary | Verifiable without trust in source (Law 44) |

These seven layers stack: a domain row gets L1 (content uuid); its type gets L2; its references to other rows carry L3; the UI shows L4; events about it stream through L5; the row is stored uuid-keyed in L6; when it crosses a boundary, L7 wraps it. **Every byte in ERPax is reachable through some combination of these seven layers.**

---

## 2. RFC-IETF stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | Name-based UUIDs from namespace + canonical bytes | `src/services/integrity/content-uuid.ts` (computeContentUuid) | `erpax.integrity.verifyObject` |
| **RFC 8259 — JSON** | The wire format for object content + canonicalization input | every uuid-emitting module | indirect |
| **RFC 8785 — JCS (JSON Canonicalization Scheme)** | Canonical byte representation enabling stable uuid derivation | `content-uuid.ts` (jcsCanonicalize) | `erpax.integrity.computeTypeUuid` |
| **FIPS 180-4 — SHA-256** | The hash function backing UUIDv5 derivation in ERPax (substitutes RFC 4122's SHA-1) | `content-uuid.ts` (Node `createHash`) | indirect |
| **NIST SP 800-208** | Stateful hash-based signatures — PQC future for high-stakes uuids | `src/services/beyond/pqc.ts` | `erpax.beyond.pqcSignature` |

## 3. W3C identity stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **W3C DID Core 1.0** | Decentralized identifiers — sovereign DIDs for tenants + agents | `src/services/did/index.ts` | `erpax.did.create / resolve / list` |
| **W3C VC Data Model 2.0** | Verifiable credentials — every uuid'd object can carry a VC envelope | `src/services/proof/dry-proof.ts`, `src/services/voting/index.ts` | `erpax.platform.dryProofPublish`, `erpax.voting.exportBallotBundle` |
| **W3C JSON Schema (draft 2020-12)** | TypeDescriptor mirrors JSON Schema; type uuid derives from canonical shape | `src/services/integrity/type-uuid.ts` (TypeDescriptor) | `erpax.integrity.{computeTypeUuid, registerType, verifyType}` |
| **W3C JSON-LD 1.1** | Typed manifests for federation envelopes + proofs | `src/services/proof/dry-proof.ts`, `src/services/agents/mcp/presentation.ts` | `erpax.platform.{toolAsAction, dryProofGet}` |
| **W3C PROV-DM** | Per-event provenance attribution (Law 12) | `src/services/beyond/provenance.ts` | implicit; auditable via `erpax.audit.getEvidence` |

## 4. Distributed-system stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **Lamport 1978 — distributed-system causal ordering** | Lamport clock per stream event; hash-chain over (event, lamport, prev) | `src/services/streams/index.ts` (ClockedEvent, streamUuid) | `erpax.streams.checkUuidChain`, `checkCoherence` |
| **CAP theorem** | UUID-consensus reads choose CP — replicas may be unavailable; survivors give consistent answers | `src/services/storage-independence/index.ts` (consensusRead) | `erpax.storage.consensusRead` |
| **W3C Streams API + ReactiveX** | AsyncIterable surface for `EventStream` | `src/services/streams/index.ts` | `erpax.streams.tumblingDemo` |

## 5. ISO quality + audit stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **ISO/IEC 25010:2023 §5.6 security — non-repudiation** | Vote signatures + content-uuid integrity | `src/services/voting/index.ts`, `content-uuid.ts` | `erpax.voting.castVote`, `erpax.integrity.verifyObject` |
| **ISO/IEC 27001 §A.9.4.5 — information access restriction** | Short uuids in UI; full uuids reserved for verification + federation | `src/services/integrity/uuid-short.ts` | `erpax.integrity.{shortUuid, displayUuid, lookupShortUuid}` |
| **ISO/IEC 27040:2024 — storage security** | Storage-independence + replication guarantees | `src/services/storage-independence/index.ts` | `erpax.storage.{verifyAcrossBackends, replicate, consensusRead}` |
| **ISO 19011:2018 §6.4.6 — audit-evidence + traceability** | Every uuid-emitting operation audit-trailed | `src/services/architecture-invariants/checks.ts` | implicit in every tool handler |
| **ISO/IEC 30134 — KPIs for resource efficiency** | Cost + carbon attribution to per-uuid storage choices | `src/services/topology/torus.ts` | `erpax.platform.checkTorusBounded` |

## 6. Conservation laws governing the integrity layer

| Law # | Title | Slice | Standard anchor | Trinity |
|---|---|---|---|---|
| 8 | content-addressable uuid | RRRRR | RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 | I |
| 10 | referential harmony | UUUUU | RFC 4122 §4.3 (refs use uuids) | I |
| 11 | bitemporal | ZZZZZ | W3C PROV-DM (versioning) | II |
| 12 | provenance | ZZZZZ | W3C PROV-DM | II |
| 18 | PQC signatures | ZZZZZ | NIST SP 800-208 | I |
| 19 | blockchain anchoring | BBBBBB | Bitcoin/Ethereum block-hash semantics | II |
| 30 | vote aggregate authenticity | OOOOOO | RFC 4122 §4.3 (aggregate uuid recomputable) | I |
| 31 | no double voting | OOOOOO | RFC 4122 §4.3 (vote uuid collision = duplicate) | I |
| 34 | stream uuid chain | SSSSSS | RFC 4122 §4.3 + Lamport 1978 | II |
| 35 | storage independence | TTTTTT | ISO/IEC 27040:2024 + RFC 4122 §4.3 | I |
| 36 | replication consensus | UUUUUU | CAP theorem + RFC 4122 §4.3 | I |
| 46 | short uuid display | FFFFFFF | ISO/IEC 27001 §A.9.4.5 | I |
| 47 | type uuid | GGGGGGG | W3C JSON Schema 2020-12 + RFC 4122 §4.3 | I |
| 48 | infinite within finite | IIIIIIIII | Topology — torus + Hatcher 2002 + ISO/IEC 30134 | III |

**Trinity collapse**: 11 of the 14 integrity laws are **Law I (Identity)**; 3 are **Law II (Causality — chained over time)**; 1 (Law 48) is **Law III (Closure — bounded resource envelope but unbounded logical extent via replication)**.

## 7. The seven implications of "any object is storage-independent"

(Slice TTTTTT spec §0n.) When every object carries its content uuid + every reference travels with the uuid, seven traditionally distinct platform concerns collapse:

1. **Migration is free** — copy bytes; recompute uuid; if equal, accept.
2. **Multi-backend redundancy** — store same object in K backends; K agreement = Byzantine-fault-tolerant read.
3. **Sharding by tenant/region** — tenant-namespaced uuids → cross-shard collisions mathematically impossible.
4. **Cold-warm-hot tiers** — tier promotion = byte copy + uuid verify.
5. **Federation broadcasts** — every object can cross instances by uuid.
6. **Backups** — bytes ARE the backup format; restore = read + verify.
7. **Disaster recovery** — recover from any backend that holds the bytes.

## 8. The "infinite within finite spacetime" property (slice IIIIIIIII)

Each uuid lives in:

- **N storage backends** (memory / D1 / R2 / KV / DO / IPFS / Arweave / Filecoin / peer-erpax)
- **M federation peers** (each itself a torus per slice CCCCCCC)
- **K bitemporal versions** (Law 11 + streamUuid hash-chain per Law 34)

The same content exists in **N × M × K logical locations** simultaneously — yet **stored only once per backend** because replication is byte-copy + uuid-verify (no per-replica metadata overhead). Logical extent unbounded; physical footprint bounded by the torus envelope (Law 43).

```
logical_extent_per_uuid = N(backends) × M(peers) × K(versions)
total_logical_uuids     = sum over all uuids of logical_extent_per_uuid
physical_bytes          = sum of distinct content stored
richness                = total_logical_uuids / physical_bytes
```

`physical_bytes ≤ envelope.maxStorage`; `logical_extent` no upper bound. **Conservation Law 48** verifies this property at runtime.

## 9. Citation patterns for new integrity code

```ts
/**
 * @standard RFC 4122 §4.3 + RFC 8785 (content uuid)
 * @standard FIPS 180-4 (SHA-256)
 * @audit ISO 19011:2018 §6.4.6 (uuid audit-trailed)
 */
export function newIntegrityHelper() { ... }
```

For a tool description per Conservation Law 38:

```ts
description: '... per RFC 4122 §4.3 + Conservation Law 8 echo'
```

## 10. MCP tools surfaced by the integrity layer

| Tool | What it does |
|---|---|
| `erpax.integrity.verifyObject` | Recompute content uuid; compare to stored |
| `erpax.integrity.auditTenant` | Bulk uuid audit per tenant per collection |
| `erpax.integrity.computeTypeUuid` | Hash a TypeDescriptor → type uuid |
| `erpax.integrity.registerType` | Register a TypeDescriptor under a canonical name |
| `erpax.integrity.getType` / `getTypeByUuid` / `listTypes` | Type registry lookups |
| `erpax.integrity.verifyType` | Verify candidate descriptor against registered |
| `erpax.integrity.ensureBaselineTypes` | Idempotent baseline registration |
| `erpax.integrity.checkTypeUuidCoverage` | Conservation Law 47 verdict |
| `erpax.integrity.shortUuid` / `parseShortUuid` / `lookupShortUuid` | Short uuid family (Law 46) |
| `erpax.integrity.displayUuid` | UI helper `{display, full, copyable}` |
| `erpax.integrity.uuidShortPolicy` | Per-kind length + prefix |
| `erpax.integrity.checkShortUuidDisplay` | Conservation Law 46 verdict |
| `erpax.integrity.uuidStreamSnapshot` | Snapshot live registries into UUID_STREAM |
| `erpax.integrity.uuidStreamQuery` | Unified query across 15 UuidSource kinds |
| `erpax.integrity.uuidStreamRecord` | Manually push a uuid (production extensions) |
| `erpax.integrity.infiniteFinitenessReport` | Quantified replication × federation × bitemporal |
| `erpax.integrity.checkInfiniteFiniteness` | Conservation Law 48 verdict |
| `erpax.streams.checkUuidChain` | Verify ClockedEvent stream chain (Law 34) |
| `erpax.storage.replicate` | Source → N targets with per-target uuid verdict (Law 36) |
| `erpax.storage.consensusRead` | N-of-K Byzantine-fault-tolerant read (Law 36) |
| `erpax.storage.verifyAcrossBackends` | Per-backend uuid recompute verdict (Law 35) |
| `erpax.storage.checkIndependence` | Conservation Law 35 verdict |

## 11. Cross-reference — every integrity standard alphabetized

CAP theorem, FIPS 180-4, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.6, ISO/IEC 27001 §A.9.4.5, ISO/IEC 27040:2024, ISO/IEC 30134, Lamport 1978, NIST SP 800-208, RFC 4122 §4.3, RFC 8259, RFC 8785, Topology — torus / closed manifold (Hatcher 2002), W3C DID Core 1.0, W3C JSON Schema (draft 2020-12), W3C JSON-LD 1.1, W3C PROV-DM, W3C Streams API + ReactiveX, W3C VC Data Model 2.0.
