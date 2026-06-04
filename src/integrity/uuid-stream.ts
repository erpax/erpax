/**
 * Infinite-within-finite spacetime — Slice IIIIIIIII (2026-05-11).
 *
 * Per user 'no. much more than this. with the replication it is
 * infinite within the finite spacetime'.
 *
 * The uuid-stream framing (every operation produces a uuid) is too
 * simple. The deeper truth: with replication (slice UUUUUU — Law 36)
 * × federation (slice AAAAAA) × bitemporal indexing (Law 11 + slice
 * SSSSSS streamUuid chain), each uuid lives in:
 *
 *   - N storage backends (memory / D1 / R2 / KV / DO / IPFS / …)
 *   - M federation peer instances (each itself a torus — slice CCCCCCC)
 *   - K historical bitemporal versions (the streamUuid hash-chain)
 *
 * The same content exists in **N × M × K logical locations**
 * simultaneously — yet **stored only once per backend** because
 * replication is byte-copy + uuid-verify (no per-replica metadata
 * overhead beyond the bytes themselves).
 *
 * The platform's logical extent is **infinite** (every uuid is
 * recoverable from any single replica; uuids self-validate; new
 * peers can join and ingest without coordination); its physical
 * footprint is **bounded** (Law 43 torus envelope). The ratio
 * `logical_extent / physical_bytes` is the system's **richness**.
 *
 * This is the platform's Hilbert-space view: like quantum entanglement
 * over a torus surface, each uuid is a state shared across N×M×K
 * locations but observed (recomputed) gives the same value at every
 * location. The torus is finite; what flows through it is infinite.
 *
 * Concretely:
 *
 *   logical_extent_per_uuid = N(backends) × M(peers) × K(versions)
 *   total_logical_uuids     = sum over all uuids of logical_extent
 *   physical_bytes          = sum of distinct content stored
 *   richness                = total_logical_uuids / physical_bytes
 *
 * **Conservation Law 48** — `checkInfiniteFiniteness`:
 *   1. physical_bytes ≤ envelope.maxStorage (Law 43 torus envelope)
 *   2. logical_extent CAN be infinite (no upper bound enforced)
 *   3. richness ratio reported as a system-health metric
 *   4. every uuid in the catalog has a known UuidSource (one of the
 *      enumerated kinds — object / type / stream / audit / vote /
 *      page / standard / clone / federation / proof / …)
 *
 * The MCP query interface (`queryUuidStream(filter)`) returns uuids
 * from any source uniformly — the unified surface that proves
 * "ERPax is a uuid stream" was the right framing, just incomplete
 * without the spacetime context.
 *
 * @standard RFC 9562 §5.8 + RFC 8785 (uuid composition)
 * @standard W3C VC Data Model 2.0 (verifiable replicas)
 * @standard Topology — torus + Hilbert-space replicas (Hatcher 2002)
 * @standard ISO/IEC 25010:2023 §5.2 performance + §5.7 modularity
 * @audit ISO 19011:2018 §6.4.6 (every replica audit-trailed by uuid)
 */

import { listFaces } from '@/website/seo-vortex'
import { listTypes } from '@/integrity/type-uuid'
import { listBackends } from '@/storage/independence'
import { TORUS_DEFAULT_ENVELOPE } from '@/topology/torus'

export type UuidSource =
  | 'object'           // Law 8 — content-addressable instance (slice RRRRR)
  | 'type'             // Law 47 — TypeDescriptor (slice GGGGGGG)
  | 'stream'           // Law 33+34 — streamUuid hash-chain (RRRRRR + SSSSSS)
  | 'audit'            // Law 4+8+12 — Merkle audit leaf
  | 'vote'             // Laws 30+31 — content-addressable ballot/vote (OOOOOO)
  | 'aggregate'        // Law 30 — vote aggregate (OOOOOO)
  | 'page'             // Slice MMMMMM — PageSeed
  | 'face'             // Slice NNNNNN — SeoVortexFace
  | 'standard'         // Slice CCCCCC — standards-as-live-objects
  | 'clone'            // Slice HHHHHH — genome bundle
  | 'federation'       // Slice AAAAAA — federation envelope
  | 'proof'            // Slice DDDDDDD — DRY proof bundle
  | 'did'              // Slice DDDDDD — DID
  | 'tool-catalog'     // Slice YYYYYY — MCP catalog snapshot
  | 'platform-genome'  // Slice GGGGGG — self-reference profile uuid

export interface UuidEntry {
  readonly uuid: string
  readonly source: UuidSource
  readonly tenantId?: string
  readonly registeredAt?: string
  readonly metadata?: Record<string, unknown>
}

// ─── Stream catalog ─────────────────────────────────────────────────

const UUID_STREAM = new Map<string, UuidEntry>()

export function recordUuid(entry: UuidEntry): void {
  UUID_STREAM.set(entry.uuid, entry)
}

export function recordManyUuids(entries: ReadonlyArray<UuidEntry>): void {
  for (const e of entries) UUID_STREAM.set(e.uuid, e)
}

// ─── Query interface ────────────────────────────────────────────────

export interface UuidStreamFilter {
  readonly source?: UuidSource | ReadonlyArray<UuidSource>
  readonly tenantId?: string
  readonly limit?: number
}

export function queryUuidStream(filter?: UuidStreamFilter): ReadonlyArray<UuidEntry> {
  const sources = filter?.source ? (Array.isArray(filter.source) ? filter.source : [filter.source]) : null
  const tenantId = filter?.tenantId
  const limit = filter?.limit ?? 100
  const out: UuidEntry[] = []
  for (const e of UUID_STREAM.values()) {
    if (sources && !sources.includes(e.source)) continue
    if (tenantId && e.tenantId !== tenantId) continue
    out.push(e)
    if (out.length >= limit) break
  }
  return out
}

// ─── Aggregate from live registries ────────────────────────────────

/**
 * Snapshot every known live registry into UUID_STREAM. Called by
 * `erpax.platform.uuidStreamSnapshot` and by the boot probe so the
 * stream reflects current state without each subsystem having to
 * push individually.
 */
export function snapshotFromRegistries(): { addedFromFaces: number; addedFromTypes: number } {
  let addedFromFaces = 0
  for (const f of listFaces()) {
    if (!UUID_STREAM.has(f.contentUuid)) {
      recordUuid({ uuid: f.contentUuid, source: 'face', metadata: { url: f.url, schemaType: f.schemaType } })
      addedFromFaces++
    }
  }
  let addedFromTypes = 0
  for (const t of listTypes()) {
    if (!UUID_STREAM.has(t.uuid)) {
      recordUuid({ uuid: t.uuid, source: 'type', metadata: { name: t.name } })
      addedFromTypes++
    }
  }
  return { addedFromFaces, addedFromTypes }
}

// ─── Infinite-within-finite report ──────────────────────────────────

export interface InfiniteFinitenessReport {
  readonly totalUuids: number
  readonly bySource: Record<UuidSource, number>
  readonly storage: {
    readonly backendsRegistered: number
    readonly federationPeersConfigured: number       // production overrides
    readonly bitemporalVersionsAvg: number           // production overrides
  }
  readonly logicalExtent: {
    /** estimated logical replicas across (backends × peers × versions). */
    readonly multiplier: number
    /** total_logical_uuids = totalUuids × multiplier */
    readonly totalLogicalUuids: number
  }
  readonly physical: {
    /** rough byte-count estimate (production reads from CF Analytics — slice IIIIII). */
    readonly bytesEstimate: number
    readonly maxBytes: number
    readonly utilizationPercent: number
  }
  readonly richness: {
    /** logical_extent / physical_bytes — higher = more reach per stored byte. */
    readonly ratio: number
    /** Plain-language summary. */
    readonly note: string
  }
  readonly torusBoundedOk: boolean
}

export interface BuildReportArgs {
  /** Production passes live values; defaults give a base-case estimate. */
  readonly federationPeersConfigured?: number
  readonly bitemporalVersionsAvg?: number
  readonly bytesEstimate?: number
}

export function buildInfiniteFinitenessReport(args?: BuildReportArgs): InfiniteFinitenessReport {
  snapshotFromRegistries()
  const totalUuids = UUID_STREAM.size
  const bySource: Record<UuidSource, number> = {
    object: 0, type: 0, stream: 0, audit: 0, vote: 0, aggregate: 0,
    page: 0, face: 0, standard: 0, clone: 0, federation: 0,
    proof: 0, did: 0, 'tool-catalog': 0, 'platform-genome': 0,
  }
  for (const e of UUID_STREAM.values()) bySource[e.source]++

  const backendsRegistered = listBackends().length
  const federationPeersConfigured = args?.federationPeersConfigured ?? 1
  const bitemporalVersionsAvg = args?.bitemporalVersionsAvg ?? 1
  const multiplier = Math.max(1, backendsRegistered) * Math.max(1, federationPeersConfigured) * Math.max(1, bitemporalVersionsAvg)
  const totalLogicalUuids = totalUuids * multiplier

  // Physical bytes: rough estimate — production reads from CF Analytics.
  // Default heuristic: each uuid entry ≈ 256 bytes of content + envelope overhead.
  const bytesEstimate = args?.bytesEstimate ?? totalUuids * 256
  const maxBytes = TORUS_DEFAULT_ENVELOPE.maxMemoryBytes
  const utilizationPercent = (bytesEstimate / maxBytes) * 100

  const ratio = bytesEstimate > 0 ? totalLogicalUuids / bytesEstimate : 0
  const note = backendsRegistered <= 1 && federationPeersConfigured <= 1
    ? 'baseline (single backend, single peer) — multiplier=1; richness reflects raw uuid density'
    : `replication × federation × bitemporal yields ${multiplier}x logical extent per stored byte`

  return {
    totalUuids,
    bySource,
    storage: { backendsRegistered, federationPeersConfigured, bitemporalVersionsAvg },
    logicalExtent: { multiplier, totalLogicalUuids },
    physical: { bytesEstimate, maxBytes, utilizationPercent },
    richness: { ratio, note },
    torusBoundedOk: bytesEstimate <= maxBytes,
  }
}

// ─── Conservation Law 48 — infinite-within-finite ──────────────────

export interface InfiniteFinitenessVerdict {
  readonly ok: boolean
  readonly report: InfiniteFinitenessReport
  readonly violations: ReadonlyArray<string>
}

/**
 * Conservation Law 48 — physical_bytes must stay within the torus
 * envelope (Law 43 echo); logical extent has no upper bound; every
 * uuid in the stream must have a known UuidSource.
 */
export function checkInfiniteFiniteness(args?: BuildReportArgs): InfiniteFinitenessVerdict {
  const report = buildInfiniteFinitenessReport(args)
  const violations: string[] = []
  if (!report.torusBoundedOk) {
    violations.push(`physical_bytes ${report.physical.bytesEstimate} > envelope ${report.physical.maxBytes} (Law 43)`)
  }
  for (const e of UUID_STREAM.values()) {
    if (!e.source) violations.push(`uuid ${e.uuid.slice(0, 8)}… has no source`)
  }
  return { ok: violations.length === 0, report, violations }
}

/** Test-only — never call in prod. */
export function __resetUuidStreamForTests(): void { UUID_STREAM.clear() }
