/**
 * The Trinity of Conservation — Slice JJJJJJJJ (2026-05-11).
 *
 * Per user 'the more laws less powerfull they are. remember the
 * trinity brought then dimensions. what are their laws?'
 *
 * The 48 laws accreted across §0a–§0aa are theorems. The
 * GENERATING SET is **three** laws, each governing one fundamental
 * dimension. From these three, every prior law derives.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │   LAW I  — IDENTITY                                          │
 *   │     Every thing has a uuid derived from its content.         │
 *   │     ↳ dimension: WHAT IS                                     │
 *   │                                                              │
 *   │   LAW II — CAUSALITY                                         │
 *   │     Every state change is a uuid-chained event in causal     │
 *   │     order.                                                   │
 *   │     ↳ dimension: HOW IT BECOMES                              │
 *   │                                                              │
 *   │   LAW III — CLOSURE                                          │
 *   │     Every action stays in-system or federates with           │
 *   │     provenance, within a bounded resource envelope.          │
 *   │     ↳ dimension: WHERE IT LIVES                              │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * The three dimensions correspond exactly to the §0b vortices:
 *
 *   LAW I   ↔ A vortex (Domain — what objects exist)
 *   LAW II  ↔ B vortex (Substrate — how they evolve)
 *   LAW III ↔ C vortex (Process — where energy flows + bounds)
 *
 * **Why three is more powerful than 48**:
 *
 *   - Three laws can be REASONED ABOUT — every contributor remembers
 *     them. Forty-eight laws can only be CONSULTED.
 *   - Three laws are COMPOSABLE — Identity × Causality × Closure
 *     yield every behavior. Forty-eight require an index.
 *   - Three laws are INDEPENDENT (orthogonal) — no derivation chains
 *     among the generators; pure axioms.
 *   - Three laws SCALE — adding a new domain primitive only requires
 *     showing it satisfies the three; no new law needed.
 *   - Three laws ENGAGE — a contributor knows immediately whether
 *     their change touches Identity, Causality, or Closure.
 *
 * The 48 prior laws become **named theorems** — proofs that specific
 * compositions of I/II/III hold for specific subjects (collections,
 * agents, federations, MCP, etc.). They remain useful as docs but
 * the boot suite now reports verdicts grouped by the three.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — generator sets
 * @standard W3C JSON-LD 1.1 — typed law manifests
 * @audit ISO 19011:2018 §6.4.6 (Trinity verdict at every audit)
 */

export type TrinityLaw = 'I-identity' | 'II-causality' | 'III-closure'
export type TrinityDimension = 'WHAT-IS' | 'HOW-IT-BECOMES' | 'WHERE-IT-LIVES'

export interface TrinityLawDescriptor {
  readonly law: TrinityLaw
  readonly title: string
  readonly dimension: TrinityDimension
  readonly statement: string
  readonly vortex: 'A-domain' | 'B-substrate' | 'C-process'
  /** The 48 prior laws this Trinity law generalises. */
  readonly subsumes: ReadonlyArray<{ num: number; name: string }>
  /** The pattern of obligations this law places on every primitive. */
  readonly obligations: ReadonlyArray<string>
  /** Standards anchoring. */
  readonly standards: ReadonlyArray<string>
}

export const TRINITY: ReadonlyArray<TrinityLawDescriptor> = [
  {
    law: 'I-identity',
    title: 'Identity',
    dimension: 'WHAT-IS',
    statement:
      'Every thing — object, type, ballot, page, standard, clone, federation envelope, proof, DID, MCP tool catalog snapshot, platform genome — has a uuid derived from its content (RFC 4122 §4.3 + RFC 8785). Two byte-equal things have equal uuids; any mutation shifts the uuid.',
    vortex: 'A-domain',
    subsumes: [
      { num: 8, name: 'content-addressable object uuid (RRRRR)' },
      { num: 10, name: 'referential harmony (UUUUU)' },
      { num: 30, name: 'vote aggregate authenticity (OOOOOO)' },
      { num: 31, name: 'no double voting (OOOOOO)' },
      { num: 35, name: 'storage independence (TTTTTT)' },
      { num: 36, name: 'replication consensus (UUUUUU)' },
      { num: 39, name: 'mcp presentation coverage (YYYYYY)' },
      { num: 46, name: 'short uuid display (FFFFFFF)' },
      { num: 47, name: 'type uuid (GGGGGGG)' },
    ],
    obligations: [
      'Compute uuid as uuidv5(content, tenant-namespace) over JCS-canonical bytes (RFC 8785).',
      'Strip storage-managed fields (uuid, id, createdAt, updatedAt) from the content used for hashing.',
      'Verify by recompute on every read at the trust boundary (federation, cross-backend, regulator audit).',
      'Surface short uuids in UI (Law 46); reserve full uuids for verification + federation.',
    ],
    standards: ['RFC 4122 §4.3', 'RFC 8785 (JCS)', 'FIPS 180-4 (SHA-256)', 'W3C VC Data Model 2.0', 'ISO/IEC 25010:2023 §5.6 security'],
  },
  {
    law: 'II-causality',
    title: 'Causality',
    dimension: 'HOW-IT-BECOMES',
    statement:
      'Every state change is an event in a uuid-chained causal order. Stream events carry a Lamport clock + a hash-chain (streamUuid = uuidv5({event, lamport, prev})); chain steps preserve event-graph closure; type evolutions are uuid transitions; aggregate uuids derive from sorted leaf uuids. Out-of-order observations are detectable; tampering breaks the chain at the corruption point.',
    vortex: 'B-substrate',
    subsumes: [
      { num: 4, name: 'event graph connected (PPPP)' },
      { num: 11, name: 'bitemporal (ZZZZZ)' },
      { num: 12, name: 'W3C PROV provenance (ZZZZZ)' },
      { num: 19, name: 'blockchain anchor (BBBBBB)' },
      { num: 32, name: 'block composition type safety (PPPPPP)' },
      { num: 33, name: 'stream coherence (RRRRRR)' },
      { num: 34, name: 'stream uuid chain (SSSSSS)' },
      { num: 27, name: 'standards consistency (LLLLLL)' },
      { num: 28, name: 'standards supersession (LLLLLL)' },
    ],
    obligations: [
      'Assign a Lamport clock at event push; stream observers must see monotonic non-decreasing order within a window.',
      'Anchor every leaf into a Merkle audit chain (Law 4 + 12); high-stakes streams add public-chain anchor (Law 19).',
      'Type evolutions register old-uuid → new-uuid transition; clones carry the transition history.',
      'Block compositions must share an event type at every boundary (Law 32 — A.emits.events ∩ B.subscribes ≠ ∅).',
    ],
    standards: ['Lamport 1978 (causal ordering)', 'W3C PROV-DM', 'RFC 4122 §4.3', 'W3C Streams API', 'ISO/IEC 25010:2023 §5.2 performance'],
  },
  {
    law: 'III-closure',
    title: 'Closure',
    dimension: 'WHERE-IT-LIVES',
    statement:
      'Every action stays in-system or federates with provenance; nothing escapes into untraced space. The system surface is a closed torus (11 vertices, 14 edges, 9-hop main loop); every emitted event has a registered consumer or a federation envelope; resource consumption stays inside a bounded envelope (cost / carbon / memory / CPU / queue / chain-step circumference).',
    vortex: 'C-process',
    subsumes: [
      { num: 1, name: 'spec coverage 100% (CCCCC)' },
      { num: 7, name: 'agent owns every step (DDDDD)' },
      { num: 13, name: 'notification fallback (PPPP)' },
      { num: 15, name: 'cost cap (ZZZZZ)' },
      { num: 16, name: 'carbon cap (ZZZZZ)' },
      { num: 17, name: 'PII redaction (ZZZZZ)' },
      { num: 22, name: 'explainability (ZZZZZ)' },
      { num: 23, name: 'self-reference (GGGGGG)' },
      { num: 24, name: 'clone integrity (HHHHHH)' },
      { num: 25, name: 'commerce lifecycle (JJJJJJ)' },
      { num: 26, name: 'self-accounting (KKKKKK)' },
      { num: 29, name: 'SEO vortex coupling (NNNNNN)' },
      { num: 37, name: 'auto-generation coverage (WWWWWW)' },
      { num: 38, name: 'mcp standardization (XXXXXX)' },
      { num: 40, name: 'mcp rebuildable from source (ZZZZZZ)' },
      { num: 41, name: 'mcp self-testable (AAAAAAA)' },
      { num: 43, name: 'torus bounded (CCCCCCC)' },
      { num: 44, name: 'dry proof published (DDDDDDD)' },
      { num: 45, name: 'agent law coverage (EEEEEEE)' },
      { num: 48, name: 'infinite within finite (IIIIIIIII)' },
    ],
    obligations: [
      'Every emit has a consumer in the catalog OR a federation envelope (no orphan emits).',
      'Resource usage stays within envelope: cost ≤ Law 15 cap; carbon ≤ Law 16 cap; memory + CPU + queue ≤ CF Worker / Queue limits; chain-step depth ≤ 42 (CCCCCCC).',
      'Spec primitives → MCP tools auto-derived (WWWWWW); MCP tools self-test (AAAAAAA); proof published (DDDDDDD).',
      'Clones rebuild self-coherently from genome (HHHHHH); platform observes itself (GGGGGG); torus topology closes (CCCCCCC).',
    ],
    standards: ['Topology — torus (Hatcher 2002)', 'ISO/IEC 25010:2023 §5.2 performance', 'ISO/IEC 30134 KPIs', 'W3C JSON-LD 1.1', 'ISO 19011:2018 §6.4.6'],
  },
]

// ─── Trinity grouping / verdict synthesis ──────────────────────────

export interface TrinityGrouping {
  readonly law: TrinityLaw
  readonly title: string
  readonly subsumesCount: number
  readonly priorLawNumbers: ReadonlyArray<number>
}

export function trinityGrouping(): ReadonlyArray<TrinityGrouping> {
  return TRINITY.map((t) => ({
    law: t.law,
    title: t.title,
    subsumesCount: t.subsumes.length,
    priorLawNumbers: t.subsumes.map((s) => s.num).sort((a, b) => a - b),
  }))
}

/**
 * Map a prior Law N back to which Trinity law it derives from. Used
 * by the boot suite to report the per-Trinity-law verdict alongside
 * the per-axis 5-axis verdict.
 */
export function trinityForPriorLaw(num: number): TrinityLaw | null {
  for (const t of TRINITY) {
    if (t.subsumes.some((s) => s.num === num)) return t.law
  }
  return null
}

// ─── Synthesis verdict ─────────────────────────────────────────────

export interface TrinityVerdict {
  readonly law: TrinityLaw
  readonly title: string
  readonly dimension: TrinityDimension
  readonly priorLawsCovered: number
  readonly priorLawsTotal: number
  readonly note: string
}

/**
 * Roll up an arbitrary set of "prior law numbers that passed" into
 * the Trinity verdict — what % of each Trinity law's territory is
 * empirically holding.
 */
export function rollUpToTrinity(passedPriorLawNums: ReadonlyArray<number>): ReadonlyArray<TrinityVerdict> {
  const passed = new Set(passedPriorLawNums)
  return TRINITY.map((t) => {
    const covered = t.subsumes.filter((s) => passed.has(s.num)).length
    const total = t.subsumes.length
    return {
      law: t.law,
      title: t.title,
      dimension: t.dimension,
      priorLawsCovered: covered,
      priorLawsTotal: total,
      note: covered === total
        ? `all ${total} derived theorems hold — Trinity law fully witnessed`
        : `${covered}/${total} derived theorems hold (${(100 * covered / total).toFixed(0)}%)`,
    }
  })
}
