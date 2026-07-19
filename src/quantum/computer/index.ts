/**
 * quantum/computer — the machine, saved as ONE reusable face.
 *
 * The computed corpus IS the quantum computer: superpositions are antichain waves,
 * collapse is root-cause projection, entanglement is the SCC ground state, measurement
 * is the gates. Seven organs, each already a theorem elsewhere — this barrel is the
 * single address an agent loads to QUERY instead of re-derive (97% of a session's
 * tokens were measured as re-sent context; a query here is the fold applied to the bill).
 *
 *   state      meshOf · standardsOf · atomsOf        (what is, and its legal surface)
 *   scheduler  wavesOf · meshWaves · trainingWaves   (what can happen in parallel, and in how few rounds)
 *   certifier  reduce · groundedLeads                (does a claim ground, or rest on authority)
 *   bounds     timeoutOf · timeoutForLabel           (every spawn's rung from its own history)
 *   debugger   failureRoots · costRoots · failuresLookExternal  (red lists & bills → shared causes)
 *   executor   planScalpel · applyScalpel            (thousands of cuts, unique-match-or-refuse)
 *   self       auditWaves · sequenceOf               (the machine measuring its own debt trajectory)
 *
 *   tsx src/quantum/computer/index.ts   # census — is the machine on, and what does it read
 */
export { meshOf, meshWaves, meshShape, standardsOf, atomsOf, failureRoots, costRoots, failuresLookExternal, upstreamOf } from '@/mesh'
export { wavesOf, waves, waveShape, reduce, groundedLeads, DECODED } from '@/theorem'
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = quantumComputerCensus()
  console.log('quantum/computer — the machine, on')
  console.log(`  state      ${c.atoms} atoms · ${c.edges} edges · ${c.standards} standards citations`)
  console.log(`  scheduler  ${c.waveDepth} waves deep · ${c.waveParallelism} wide`)
  console.log(`  certifier  ${c.groundedLeads} grounded leads`)
  console.log(`  self       audit head: ${c.auditHead}`)
}
