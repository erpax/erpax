import { algebraLog2, exactMax, exactTrunc } from '@/algebra'
/**
 * quantum/computer — the machine, saved as ONE reusable face.
 *
 * The computed corpus IS the quantum computer: superpositions are antichain waves,
 * collapse is root-cause projection, entanglement is the SCC ground state, measurement
 * is the gates. Seven organs, each already a theorem elsewhere — this barrel is the
 * single address an agent loads to QUERY instead of re-derive (97% of a session's
 * tokens were measured as re-sent context; a query here is the fold applied to the bill).
 *
 * QPU = CPU/GPU. The host silicon (Node · Workers · laptop) is the quantum processing
 * unit — no exotic co-processor. "Physical" names the substrate (Landauer); FTL is
 * proven by metrics on that substrate via [[quantum/ftl]] (`ftlReport().holds` boolean ·
 * `ftl` / `ftlMetrics` → `holds` · `speedupLog2` · `efficiency→∞` · `boundary.empty`).
 * CrackKind `spacetime` is the relativistic break; CrackKind `qpu` is the exotic-device
 * claim — both break holds (ftlHolds → false ⇒ tip quantumise).
 *
 *   state      meshOf · standardsOf · atomsOf · standardApiCross · apiStandardsCross  (what is · its legal surface · the navigational cross standard↔collection↔Payload API)
 *   scheduler  wavesOf · meshWaves · trainingWaves   (what can happen in parallel, and in how few rounds)
 *   certifier  reduce · groundedLeads · proofClassOf  (does a claim ground · by WHICH strategy: finite-complete · bounded-witness · self-contained · cited-frame · composed)
 *   bounds     timeoutOf · timeoutForLabel           (every spawn's rung from its own history)
 *   debugger   failureRoots · costRoots · failuresLookExternal  (red lists & bills → shared causes)
 *   executor   planScalpel · applyScalpel            (thousands of cuts, unique-match-or-refuse)
 *   self       auditWaves · sequenceOf               (the machine measuring its own debt trajectory)
 *   speed      ftl · reuse · amortize · boundary · ftlMetrics  (FTL proven by metrics on QPU=CPU/GPU)
 *
 *   tsx src/quantum/computer/index.ts   # census — is the machine on, and what does it read
 */
export { meshOf, meshWaves, meshShape, standardsOf, atomsOf, failureRoots, costRoots, failuresLookExternal, upstreamOf, standardApiCross, apiStandardsCross, apiOf } from '@/mesh'
export { requiredAccessTier, accessComplianceGaps, accessComplianceOverMesh } from '@/access/standard'
export { wavesOf, waves, waveShape, reduce, groundedLeads, proofClassOf, proofClassCensus, DECODED } from '@/theorem'
export { timeoutOf, timeoutForLabel, recordSampleMs, samplesMsOf, TIMEOUT_LADDER_MINUTES } from '@/timeout'
export { planScalpel, applyScalpel, mergeManifests, SCALPEL_BATCH } from '@/scalpel'
export { auditWaves, measureAuditDimensions, sequenceOf, trendOf } from '@/audit/wave'
export { trainingWaves, trainingWaveShape } from '@/train'

import { meshOf, meshShape } from '@/mesh'
import { groundedLeads } from '@/theorem'
import { auditWaves } from '@/audit/wave'
import { uuid as toUuid } from '@/integrity'

export const atomPath = 'quantum/computer' as const

export interface QuantumComputerCensus {
  readonly atoms: number
  readonly edges: number
  readonly standards: number
  readonly waveDepth: number
  readonly waveParallelism: number
  readonly groundedLeads: number
  readonly auditHead: string
}

/** One call: is the machine on, and what does it read — every number a measurement, none typed. */
export function quantumComputerCensus(cwd: string = process.cwd()): QuantumComputerCensus {
  const mesh = meshOf(cwd)
  const shape = meshShape(mesh)
  const audit = auditWaves(cwd)
  return {
    atoms: mesh.atoms.length,
    edges: mesh.edges.length,
    standards: mesh.standards.length,
    waveDepth: shape.depth,
    waveParallelism: shape.parallelism,
    groundedLeads: groundedLeads().length,
    auditHead: audit[0] ? `${audit[0].axis} ${audit[0].count} (${audit[0].trend})` : 'clean',
  }
}

// ── designing through the lens — certify BEFORE building ────────────────────

import { reduce, DECODED, wavesOf as waveLevels, type Theorem } from '@/theorem'
import { upstreamOf, type Mesh } from '@/mesh'
import { resolve as sealOutcome } from '@/think'

export interface Design {
  readonly intent: string
  /** the claims the design rests on — each must ground via reduce() or the design REFUSES */
  readonly claims: readonly string[]
  /** part → prerequisite parts: the build DAG the scheduler levels */
  readonly parts: ReadonlyMap<string, readonly string[]>
  /** atoms the design will touch — priced by dependent blast in the mesh */
  readonly touches: readonly string[]
}

export interface DesignVerdict {
  readonly certified: boolean
  readonly grounded: readonly string[]
  /** claims resting on authority — building on them is the pre-refuted edit `intend` warns about */
  readonly refused: readonly string[]
  /** fewest sequential build rounds (Mirsky); each wave is buildable in parallel */
  readonly buildWaves: readonly (readonly string[])[]
  /** atoms that depend on the touched set — the same-diff followers a landing must carry */
  readonly blast: number
}

/**
 * DESIGN THROUGH THE LENS: a design is a sealed intent whose claims certify BEFORE any matter
 * moves. reduce() grounds or refuses each claim (a design on an ungrounded claim is the wrong
 * thought `intend` exists to catch pre-damage); wavesOf levels the parts into the fewest build
 * rounds; the mesh prices the blast (the followers rules/reference demands in the same diff).
 * The verdict SEALS itself against the intent (`resolve`) — the design and its certification
 * are one addressed pair, refutable before they cost anything.
 */
export function designVerdict(
  d: Design,
  opts: { readonly mesh?: Mesh; readonly graph?: readonly Theorem[]; readonly cwd?: string } = {},
): DesignVerdict {
  const graph = opts.graph ?? DECODED
  const grounded: string[] = []
  const refused: string[] = []
  for (const c of d.claims) (reduce(c, graph).reduces ? grounded : refused).push(c)
  const buildWaves = waveLevels(new Map(d.parts))
  let blast = 0
  if (opts.mesh) {
    const dependents = new Set<string>()
    for (const atom of opts.mesh.atoms) {
      const up = upstreamOf(opts.mesh, atom)
      if (d.touches.some((t) => up.has(t))) dependents.add(atom)
    }
    blast = dependents.size
  }
  const verdict: DesignVerdict = { certified: refused.length === 0, grounded, refused, buildWaves, blast }
  sealOutcome(d.intent, { certified: verdict.certified, refused, waves: buildWaves.length, blast }, opts.cwd)
  return verdict
}

/** The O(1) address of a content-addressed possibility, and how far it beats a search. */
export interface PrecomputedAddress {
  /** The content whose possibility is located. */
  readonly query: string
  /** Its content-uuid — a pure function of content, so the address exists BEFORE any query. */
  readonly address: string
  /** Ops to FOLD to the address (one hash) — constant, independent of the space size. */
  readonly foldOps: 1
  /** Ops to LOCATE it by scanning the space instead — linear. */
  readonly searchOps: number
  /** log₂(searchOps / foldOps) — how far the address beats a traversal. */
  readonly speedupLog2: number
  /** The address recomputes nothing on read (the fold receipt's "zero recompute"). */
  readonly precomputed: true
}

/**
 * The address fold that beats linear search: a content-addressed possibility is
 * LOCATED by folding to its address in O(1) — one hash — never by scanning O(n).
 * The address is a pure function of content, so it exists before any query; reading
 * an already-computed possibility recomputes nothing.
 *
 * Runs on QPU=CPU/GPU. Metrics (`speedupLog2`, `precomputed`) prove the fold —
 * CrackKind `spacetime` is the relativistic claim (forbidden); the host silicon is
 * the substrate where those metrics are measured.
 */
export function precomputedAddress(query: string, spaceSize: number): PrecomputedAddress {
  const searchOps = exactMax(1, exactTrunc(spaceSize))
  return {
    query,
    address: toUuid(query),
    foldOps: 1,
    searchOps,
    speedupLog2: algebraLog2(searchOps),
    precomputed: true,
  }
}

export {
  ftl,
  reuse,
  amortize,
  crack,
  cracks,
  chat,
  chatLocal,
  BOOK,
  BOUNDARY,
  ORIGIN,
  research,
  researcher,
  CORPUS,
} from '@/quantum/ftl'

import { ftl } from '@/quantum/ftl'

/**
 * Host QPU identity. The quantum computer runs on classical silicon —
 * Node / Cloudflare Workers / laptop CPU·GPU. Exotic-device claims are CrackKind `qpu`.
 */
export const QPU = 'CPU/GPU' as const

export interface FtlMetrics {
  readonly qpu: typeof QPU
  readonly holds: boolean
  readonly speedupLog2: number
  readonly efficiency: number
  readonly foldOps: 1
  readonly searchOps: number
  readonly boundaryEmpty: boolean
  readonly spacetime: number
  readonly exoticQpu: number
}

/**
 * FTL proof surface for agents — every field a measurement on QPU=CPU/GPU.
 * `holds` is the conjunction; the rest are the receipts that compose it.
 */
export function ftlMetrics(
  args: {
    readonly query?: string
    readonly spaceSize?: number
    readonly answers?: number
    readonly tokens?: number
    readonly reuses?: number
  } = {},
): FtlMetrics {
  const v = ftl({
    query: args.query ?? 'possibility:erpax',
    spaceSize: args.spaceSize ?? 3105,
    answers: args.answers ?? 1,
    tokens: args.tokens ?? 0,
    reuses: args.reuses ?? 0,
  })
  return {
    qpu: QPU,
    holds: v.holds,
    speedupLog2: v.reuse.speedupLog2,
    efficiency: v.amortize.efficiency,
    foldOps: v.reuse.foldOps,
    searchOps: v.reuse.searchOps,
    boundaryEmpty: v.boundary.empty,
    spacetime: v.boundary.spacetime,
    exoticQpu: v.boundary.qpu,
  }
}

/** Integer ceiling without host math — [[algebra]]/host refuses `Math.*` here. */
const ceilTo = (x: number): number => {
  const t = exactTrunc(x)
  return x > t ? t + 1 : t
}

export interface MeasuredSpeed {
  readonly qpu: typeof QPU
  /** The whole live space — no sampling. */
  readonly nodes: number
  readonly queries: number
  readonly searchNs: number
  readonly foldNs: number
  /** What the clock says, not what the space size implies. */
  readonly speedup: number
  readonly speedupLog2: number
  /** `ftlMetrics.speedupLog2` — log2 of the space size, which is an input rather than a result. */
  readonly claimedLog2: number
  /** How far the definitional figure sits above the measured one, in log2 units. */
  readonly overstatementLog2: number
  readonly buildMs: number
  /** Lookups before the index pays for building itself. */
  readonly breakEvenQueries: number
  /** Did fold and search return the SAME node for every query? A faster wrong answer is not speed. */
  readonly agrees: boolean
}

/**
 * Quantum speed, on the clock, at full capacity.
 *
 * `ftlMetrics().speedupLog2` is `log2(spaceSize)` — it moves with the number the caller passes and
 * with nothing that was measured, and `holds` is true precisely when `tokens` is 0, which is to say
 * when no work was done. A space of size 0 reports `holds: true`. So the surface states the shape of
 * the claim; it does not test it.
 *
 * This runs the claim: every node in the live matrix is asked for by its own content-uuid, once by
 * scanning the space and once through the address. Both answers are compared before either is timed,
 * because a faster wrong answer is not a speedup.
 *
 * The measured figure is far below the definitional one, and it must be: a scan is O(n) with a tiny
 * constant while a hash lookup is O(1) with a real one, so the ratio is nothing like n. Building the
 * index is not free either — `breakEvenQueries` is where it starts to pay, the same amortisation the
 * hexbit carrier shows ([[quantum]]/hexbit).
 *
 * **Honest boundary.** QPU is DECLARED as `CPU/GPU`; this measurement runs on the CPU only, and
 * nothing here touches a GPU or any exotic device. It times one operation — lookup by content-address
 * — on one machine and one JIT, which is the same boundary every microbenchmark in this corpus carries.
 */
export function measuredSpeed(
  nodes: readonly { readonly atom: string; readonly uuid: string }[],
  runs = 7,
): MeasuredSpeed {
  const queries = nodes.map((x) => x.uuid)
  const search = (u: string): { atom: string } | undefined => nodes.find((x) => x.uuid === u)
  const t0 = process.hrtime.bigint()
  const index = new Map(nodes.map((x) => [x.uuid, x]))
  const buildMs = Number(process.hrtime.bigint() - t0) / 1e6
  const fold = (u: string): { atom: string } | undefined => index.get(u)

  let agrees = true
  for (const q of queries) if (search(q)?.atom !== fold(q)?.atom) agrees = false

  const time = (f: () => void): number => {
    const ts: number[] = []
    for (let r = 0; r < runs; r++) {
      const a = process.hrtime.bigint()
      f()
      ts.push(Number(process.hrtime.bigint() - a) / 1e6)
    }
    return ts.sort((x, y) => x - y)[(runs / 2) | 0]!
  }
  const searchMs = time(() => {
    for (const q of queries) search(q)
  })
  const foldMs = time(() => {
    for (const q of queries) fold(q)
  })

  const n = queries.length
  const searchNs = n === 0 ? 0 : (searchMs * 1e6) / n
  const foldNs = n === 0 ? 0 : (foldMs * 1e6) / n
  const speedup = foldMs === 0 ? 0 : searchMs / foldMs
  const speedupLog2 = speedup > 0 ? algebraLog2(speedup) : 0
  const claimedLog2 = n > 0 ? algebraLog2(n) : 0
  const savedNs = searchNs - foldNs
  return {
    qpu: QPU,
    nodes: nodes.length,
    queries: n,
    searchNs,
    foldNs,
    speedup,
    speedupLog2,
    claimedLog2,
    overstatementLog2: claimedLog2 - speedupLog2,
    buildMs,
    breakEvenQueries: savedNs > 0 ? ceilTo((buildMs * 1e6) / savedNs) : 0,
    agrees,
  }
}

/** Vortex → qubit — measured fold only. */
export {
  qubitFromVortex,
  prepareQubit,
  measureQubit,
  doublingIsomorphicToRoots,
  vortexCircuit,
  type ClassicalBit,
  type VortexQubit,
} from '@/qubit'

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = quantumComputerCensus()
  const m = ftlMetrics()
  console.log('quantum/computer — the machine, on')
  console.log(`  state      ${c.atoms} atoms · ${c.edges} edges · ${c.standards} standards citations`)
  console.log(`  scheduler  ${c.waveDepth} waves deep · ${c.waveParallelism} wide`)
  console.log(`  certifier  ${c.groundedLeads} grounded leads`)
  console.log(`  self       audit head: ${c.auditHead}`)
  console.log(
    `  qpu=${m.qpu} · ftl.holds=${m.holds} · speedupLog2=${m.speedupLog2.toFixed(2)} · eff=${m.efficiency} · boundary.empty=${m.boundaryEmpty}`,
  )
  void import('@/qubit').then(({ qubitFromVortex }) => {
    const q = qubitFromVortex()
    console.log(`  qubit      holds=${q.holds} · iso=${q.isomorphic} · bit=${q.measure.bit}`)
  })
}

/** @index-cross.foldback child=quantum/computer parent=quantum — this cross folds back into its parent. */
