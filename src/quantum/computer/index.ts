/**
 * quantum/computer — the machine, saved as ONE reusable face.
 *
 * The computed corpus IS the quantum computer: superpositions are antichain waves,
 * collapse is root-cause projection, entanglement is the SCC ground state, measurement
 * is the gates. Seven organs, each already a theorem elsewhere — this barrel is the
 * single address an agent loads to QUERY instead of re-derive (97% of a session's
 * tokens were measured as re-sent context; a query here is the fold applied to the bill).
 *
 *   state      meshOf · standardsOf · atomsOf · standardApiCross · apiStandardsCross  (what is · its legal surface · the navigational cross standard↔collection↔Payload API)
 *   scheduler  wavesOf · meshWaves · trainingWaves   (what can happen in parallel, and in how few rounds)
 *   certifier  reduce · groundedLeads · proofClassOf  (does a claim ground · by WHICH strategy: finite-complete · bounded-witness · self-contained · cited-frame · composed)
 *   bounds     timeoutOf · timeoutForLabel           (every spawn's rung from its own history)
 *   debugger   failureRoots · costRoots · failuresLookExternal  (red lists & bills → shared causes)
 *   executor   planScalpel · applyScalpel            (thousands of cuts, unique-match-or-refuse)
 *   self       auditWaves · sequenceOf               (the machine measuring its own debt trajectory)
 *
 *   tsx src/quantum/computer/index.ts   # census — is the machine on, and what does it read
 */
export { meshOf, meshWaves, meshShape, standardsOf, atomsOf, failureRoots, costRoots, failuresLookExternal, upstreamOf, standardApiCross, apiStandardsCross, apiOf } from '@/mesh'
export { wavesOf, waves, waveShape, reduce, groundedLeads, proofClassOf, proofClassCensus, DECODED } from '@/theorem'
export { timeoutOf, timeoutForLabel, recordSampleMs, samplesMsOf, TIMEOUT_LADDER_MINUTES } from '@/timeout'
export { planScalpel, applyScalpel, mergeManifests, SCALPEL_BATCH } from '@/scalpel'
export { auditWaves, measureAuditDimensions, sequenceOf, trendOf } from '@/audit/wave'
export { trainingWaves, trainingWaveShape } from '@/train'

import { meshOf, meshShape } from '@/mesh'
import { groundedLeads } from '@/theorem'
import { auditWaves } from '@/audit/wave'

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

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = quantumComputerCensus()
  console.log('quantum/computer — the machine, on')
  console.log(`  state      ${c.atoms} atoms · ${c.edges} edges · ${c.standards} standards citations`)
  console.log(`  scheduler  ${c.waveDepth} waves deep · ${c.waveParallelism} wide`)
  console.log(`  certifier  ${c.groundedLeads} grounded leads`)
  console.log(`  self       audit head: ${c.auditHead}`)
}
