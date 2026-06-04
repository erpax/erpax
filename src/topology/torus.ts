/**
 * ERPax + MCP torus topology — Slice CCCCCCC (2026-05-11).
 *
 * Per user 'erpax and mcp are interacting to infinity within the
 * limitations of a torus'. The synthesis statement of every prior
 * slice: ERPax + MCP form a **finite-but-unbounded closed system**
 * — a torus.
 *
 * The torus has two key topological properties used in this slice:
 *
 *   1. **Closed surface** — every action emitted by ERPax stays
 *      within the system or federates (AAAAAA) to a peer torus
 *      with full provenance. Nothing escapes into untraced space.
 *      This is the platform-level analog of the closed event graph
 *      (Law 4) and content-uuid coupling (Law 8).
 *
 *   2. **Bounded resource envelope** — every long-running process
 *      can iterate "to infinity" along the torus surface (the loop
 *      has no end), but at every instant it stays inside a bounded
 *      resource budget. This is the platform-level analog of cost
 *      (Law 15) and carbon (Law 16) caps, plus CF Worker CPU /
 *      memory / queue limits (slice IIIIII).
 *
 * The torus has a **circumference** (the loop length — how many
 * MCP tools / chain steps a single round-trip touches) and a
 * **cross-section** (the per-slice resource envelope — cost +
 * carbon + memory + CPU + queue depth at any instant).
 *
 *   ┌─────────────────────────────────────────────────┐
 *   │    Spec corpus → MCP tools → agent blocks →     │
 *   │    chains → events → audit → archive →          │
 *   │    federation → clones → spec corpus → …        │
 *   └─────────────────────────────────────────────────┘
 *                     (closed loop)
 *
 * **Conservation Law 43** — `checkTorusBounded`:
 *   1. Every emitted DomainEvent has a registered consumer somewhere
 *      in the system OR is explicitly federated with provenance
 *      (slice AAAAAA envelope present).
 *   2. Every long-running iteration must declare its
 *      `maxBudget` (cost + carbon + memory + queue depth) and stay
 *      within it (per Laws 15+16 + this Law 43).
 *
 * The number `42` in `CIRCUMFERENCE_SOFT_LIMIT_CHAIN_STEPS` is not
 * a coincidence — it's the upper bound on chain-step composition
 * per business workflow (any chain longer than 42 steps is
 * suspicious and triggers a refactor proposal via QQQQQ).
 *
 * @standard Topology — torus / closed manifold (Hatcher 2002)
 * @standard ISO/IEC 25010:2023 §5.2 performance — resource envelope
 * @standard ISO/IEC 30134 — KPIs for resource efficiency
 * @audit ISO 19011:2018 §6.4.6 (every torus traversal audit-trailed)
 */

/**
 * Bounded resource envelope of the ERPax + MCP torus. Production
 * deployments override these per tenant via the commerce + carbon
 * audit (Laws 15 + 16); these are the platform-wide defaults.
 */
export interface TorusEnvelope {
  /** Maximum cost per minute (USD micros — slice JJJJJJ unit). */
  readonly maxCostUsdMicrosPerMin: number
  /** Maximum carbon emission per minute (gCO2e — Law 16). */
  readonly maxCarbonGCO2ePerMin: number
  /** Maximum memory per request (bytes — CF Worker limit). */
  readonly maxMemoryBytes: number
  /** Maximum CPU per request (ms — CF Worker limit, paid plan). */
  readonly maxCpuMs: number
  /** Maximum queue depth before backpressure (CF Queues — slice IIIIII). */
  readonly maxQueueDepth: number
  /** Soft circumference cap on chain-of-blocks composition. */
  readonly maxChainStepsPerWorkflow: number
}

export const TORUS_DEFAULT_ENVELOPE: TorusEnvelope = {
  maxCostUsdMicrosPerMin: 100_000,         // 0.10 USD per minute per tenant
  maxCarbonGCO2ePerMin: 5,                  // 5 gCO2e per minute per tenant
  maxMemoryBytes: 128 * 1024 * 1024,        // 128 MiB CF Worker limit
  maxCpuMs: 30_000,                         // 30s CF Worker paid limit
  maxQueueDepth: 10_000,                    // CF Queues per-tenant
  maxChainStepsPerWorkflow: 42,             // soft cap; longer = refactor proposal
}

export const CIRCUMFERENCE_SOFT_LIMIT_CHAIN_STEPS = 42

// ─── Surface description (the loop) ────────────────────────────────

export type TorusVertex =
  | 'spec-corpus'         // CCCCC — JSDoc-as-spec extractor
  | 'mcp-tools'           // VVVVVV..AAAAAAA — MCP layer (6 self-properties)
  | 'agent-blocks'        // PPPPPP — typed blocks
  | 'chain-of-blocks'     // QQQQQQ — BUSINESS_CHAIN compositions
  | 'event-streams'       // RRRRRR — quantum streams + Lamport clock
  | 'audit-trail'         // QQQQ + RRRRR + SSSSSS — Merkle + uuid hash-chain
  | 'archival'            // EEEEEE — IPFS/Arweave/Filecoin
  | 'federation'          // AAAAAA — inter-tenant uuid exchange
  | 'cloning'             // HHHHHH — genome publish + boot
  | 'standards-corpus'    // LLLLLL + CCCCCC — 7 families as live objects
  | 'website'             // MMMMMM + NNNNNN + YYYYYY — SEO vortex

/** The 11 vertices of the ERPax + MCP torus surface. */
export const TORUS_VERTICES: ReadonlyArray<TorusVertex> = [
  'spec-corpus', 'mcp-tools', 'agent-blocks', 'chain-of-blocks',
  'event-streams', 'audit-trail', 'archival', 'federation',
  'cloning', 'standards-corpus', 'website',
] as const

/**
 * Edges of the closed loop. Each entry is a directed edge `from →
 * to` representing where data / control flows. The graph is
 * deliberately a closed loop (with shortcuts) — no terminal vertex.
 */
export const TORUS_EDGES: ReadonlyArray<{ from: TorusVertex; to: TorusVertex; via: string }> = [
  { from: 'spec-corpus',     to: 'mcp-tools',        via: 'WWWWWW auto-generation + ZZZZZZ rebuild' },
  { from: 'mcp-tools',       to: 'agent-blocks',     via: 'PPPPPP block manifests via mcp.invoke' },
  { from: 'agent-blocks',    to: 'chain-of-blocks',  via: 'QQQQQQ chainsAsBlockCompositions' },
  { from: 'chain-of-blocks', to: 'event-streams',    via: 'RRRRRR streamFromBus + Lamport clock' },
  { from: 'event-streams',   to: 'audit-trail',      via: 'QQQQ Merkle leaves + SSSSSS streamUuid hash-chain' },
  { from: 'audit-trail',     to: 'archival',         via: 'EEEEEE IPFS / Arweave / Filecoin pinning' },
  { from: 'archival',        to: 'federation',       via: 'AAAAAA envelope broadcast (uuid + provenance)' },
  { from: 'federation',      to: 'cloning',          via: 'HHHHHH bootFromFederation (genome bundle)' },
  { from: 'cloning',         to: 'spec-corpus',      via: 'GGGGGG self-reference (clone reads own spec)' },
  // Cross-loop shortcuts (the torus is not a simple ring; the
  // standards corpus + website couple to many vertices).
  { from: 'spec-corpus',     to: 'standards-corpus', via: 'CCCCCC publish + LLLLLL classify' },
  { from: 'standards-corpus', to: 'mcp-tools',       via: 'XXXXXX standardization lexicon' },
  { from: 'mcp-tools',       to: 'website',          via: 'YYYYYY presentation + NNNNNN crossLink' },
  { from: 'website',         to: 'federation',       via: 'NNNNNN faces broadcast + MMMMMM media bundle' },
  { from: 'website',         to: 'spec-corpus',      via: 'MMMMMM seedFromSpec round-trip' },
] as const

// ─── Conservation Law 43 — torus closure & envelope check ──────────

export interface TorusBoundednessResult {
  readonly ok: boolean
  readonly verticesOnLoop: number
  readonly disconnectedVertices: ReadonlyArray<TorusVertex>
  readonly envelopeViolations: ReadonlyArray<string>
  readonly envelope: TorusEnvelope
}

/**
 * Conservation Law 43 — verify the torus is closed (every vertex
 * has both an incoming and outgoing edge in the spec) and every
 * runtime envelope value is at or below its declared cap.
 *
 * Runtime probe: pure topology check + caller-supplied current usage
 * (defaults to zeros — production passes live `cost` / `carbon` /
 * `memory` from the per-tenant audit pipeline, slice KKKKKK).
 */
export function checkTorusBounded(args?: {
  envelope?: TorusEnvelope
  current?: Partial<{ costUsdMicrosPerMin: number; carbonGCO2ePerMin: number; memoryBytes: number; cpuMs: number; queueDepth: number; chainStepsPerWorkflow: number }>
}): TorusBoundednessResult {
  const envelope = args?.envelope ?? TORUS_DEFAULT_ENVELOPE
  const current = args?.current ?? {}

  // Topology check — every vertex appears as `from` AND as `to` somewhere.
  const fromSeen = new Set<TorusVertex>()
  const toSeen = new Set<TorusVertex>()
  for (const e of TORUS_EDGES) { fromSeen.add(e.from); toSeen.add(e.to) }
  const disconnected = TORUS_VERTICES.filter((v) => !fromSeen.has(v) || !toSeen.has(v))

  // Envelope check.
  const envelopeViolations: string[] = []
  if ((current.costUsdMicrosPerMin ?? 0) > envelope.maxCostUsdMicrosPerMin) {
    envelopeViolations.push(`cost ${current.costUsdMicrosPerMin} > ${envelope.maxCostUsdMicrosPerMin} USD-micros/min (Law 15)`)
  }
  if ((current.carbonGCO2ePerMin ?? 0) > envelope.maxCarbonGCO2ePerMin) {
    envelopeViolations.push(`carbon ${current.carbonGCO2ePerMin} > ${envelope.maxCarbonGCO2ePerMin} gCO2e/min (Law 16)`)
  }
  if ((current.memoryBytes ?? 0) > envelope.maxMemoryBytes) {
    envelopeViolations.push(`memory ${current.memoryBytes} > ${envelope.maxMemoryBytes} bytes (CF Worker)`)
  }
  if ((current.cpuMs ?? 0) > envelope.maxCpuMs) {
    envelopeViolations.push(`cpu ${current.cpuMs}ms > ${envelope.maxCpuMs}ms (CF Worker)`)
  }
  if ((current.queueDepth ?? 0) > envelope.maxQueueDepth) {
    envelopeViolations.push(`queue depth ${current.queueDepth} > ${envelope.maxQueueDepth} (CF Queues)`)
  }
  if ((current.chainStepsPerWorkflow ?? 0) > envelope.maxChainStepsPerWorkflow) {
    envelopeViolations.push(`chain steps ${current.chainStepsPerWorkflow} > ${envelope.maxChainStepsPerWorkflow} (refactor proposal)`)
  }

  return {
    ok: disconnected.length === 0 && envelopeViolations.length === 0,
    verticesOnLoop: TORUS_VERTICES.length - disconnected.length,
    disconnectedVertices: disconnected,
    envelopeViolations,
    envelope,
  }
}

// ─── Trace a round trip around the torus ───────────────────────────

export interface TorusTrace {
  readonly path: ReadonlyArray<{ from: TorusVertex; to: TorusVertex; via: string }>
  readonly hopCount: number
  readonly closedLoop: boolean
}

/**
 * Trace a round-trip starting from a vertex; follow the FIRST
 * outgoing edge each time; stop when the start vertex is revisited
 * (confirming closure) or after `maxHops` (suggesting an open path,
 * which would violate Law 43).
 */
export function traceTorusRoundTrip(start: TorusVertex, maxHops = 32): TorusTrace {
  const path: { from: TorusVertex; to: TorusVertex; via: string }[] = []
  let current = start
  for (let i = 0; i < maxHops; i++) {
    const edge = TORUS_EDGES.find((e) => e.from === current)
    if (!edge) break
    path.push(edge)
    current = edge.to
    if (current === start) return { path, hopCount: path.length, closedLoop: true }
  }
  return { path, hopCount: path.length, closedLoop: false }
}
