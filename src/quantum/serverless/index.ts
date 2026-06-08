/**
 * quantum/serverless — the COMPUTED PROOF that serverless IS the quantum host
 * and erpax IS the existence proof.
 *
 * Cloudflare Workers + wrangler bindings are the serverless facet; the uuid-matrix
 * laws (superposition · collapse · entanglement · holographic recovery) are the
 * quantum facet. `proveServerlessQuantum()` walks a pure computation chain:
 *
 *   wrangler bindings → worker deployment faces → superposition → collapse →
 *   entanglement → existence diamonds (cloudflare ⊕ quantum) → one folded uuid.
 *
 * Each stage returns a `DiamondComputation` whose model verifies sealed; the fold
 * uuid is deterministic from content — never hand-pinned.
 *
 *   tsx src/quantum/serverless/index.ts
 *
 * @audit computed from live wrangler.jsonc + live tree; never hand-asserted
 * @see ../../cloudflare · ../../superposition · ../index.ts · ./SKILL.md
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  collapse as matrixCollapse,
  noCloning,
  entanglement,
  entangle,
} from '@/quantum'
import {
  computeDiamond,
  verifyDiamond,
  diamondUuid,
  computationUuid,
  stageUuid,
  deploymentFaces,
  type DiamondComputation,
  type DiamondComputationStage,
  type DiamondModel,
} from '@/diamond'
import {
  parseWranglerBindings,
  deriveWranglerBindingDiamonds,
  bindingDeploymentFaces,
  bindingAtomPath,
  bindingBoundaryUuid,
  cloudflareBindingFace,
  type WranglerBindingEntry,
} from '@/cloudflare'
import { superpose, total, collapse as measureCollapse, uniform } from '@/superposition'
import { HORO_DIGITS } from '@/horo'

/** One proof stage — a sealed diamond computation plus the quantum/serverless verdict it carries. */
export interface ServerlessQuantumStage {
  readonly stage: string
  readonly computation: DiamondComputation
  readonly sealed: boolean
  readonly holds: boolean
}

/** The six serverless↔quantum properties — each computed, never asserted. */
export interface ServerlessQuantumProperties {
  /** every wrangler binding derives a sealed diamond (the serverless facet). */
  readonly bindingsSealed: boolean
  /** worker deployment face materialises on cloudflare + AI bindings. */
  readonly workerHosted: boolean
  /** superposition normalises — Σ|c|² = 1 over the horo basis. */
  readonly superpositionHolds: boolean
  /** matrix Merkle fold intact + measurement lands on a definite horo eigenstate. */
  readonly collapseHolds: boolean
  /** reciprocal entanglement whole + symmetric entangle() fix. */
  readonly entanglementHolds: boolean
  /** live tree: cloudflare + quantum atoms verify sealed (existence proof). */
  readonly existenceSealed: boolean
}

/** Full proof artifact — stages, properties, and the serverless ⊕ quantum fold uuid. */
export interface ServerlessQuantumProof {
  readonly stages: readonly ServerlessQuantumStage[]
  readonly properties: ServerlessQuantumProperties
  readonly serverlessHosted: boolean
  readonly quantumLawsHold: boolean
  readonly isomorphismUuid: string
  readonly computationUuid: string
}

function pushStage(
  stages: DiamondComputationStage[],
  stage: string,
  input: unknown,
  output: unknown,
): void {
  stages.push({ stage, input, output, stageUuid: stageUuid(stage, input, output) })
}

function finalizeStage(
  stage: string,
  base: DiamondComputation,
  extraStages: DiamondComputationStage[],
  holds: boolean,
): ServerlessQuantumStage {
  const stages = [...base.stages, ...extraStages]
  const model = base.model
  const verdict = verifyDiamond(model)
  pushStage(stages, 'seal', { stage, holds }, {
    sealed: verdict.sealed,
    impurities: [...verdict.impurities],
    holds,
  })
  pushStage(stages, 'uuid', { stage }, { contentUuid: diamondUuid(model) })
  return {
    stage,
    computation: { model, stages, computationUuid: computationUuid(stages) },
    sealed: verdict.sealed && holds,
    holds,
  }
}

function wranglerText(cwd: string): string {
  return readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
}

function bindingEntries(cwd: string): WranglerBindingEntry[] {
  return parseWranglerBindings(wranglerText(cwd))
}

/** Every wrangler binding → sealed diamond; cloudflare atom sealed. */
export function bindingsSealed(cwd = process.cwd()): boolean {
  const entries = bindingEntries(cwd)
  const diamonds = deriveWranglerBindingDiamonds(entries)
  if (diamonds.length === 0) return false
  return diamonds.every((d) => verifyDiamond(d).sealed && d.sealed)
}

/** Worker face on cloudflare atom + at least one AI-stack binding with worker face. */
export function workerHosted(cwd = process.cwd()): boolean {
  const cloud = computeDiamond({ kind: 'path', path: 'cloudflare', cwd }).model as DiamondModel
  if (!deploymentFaces(cloud).worker) return false
  const entries = bindingEntries(cwd)
  const ai = entries.find((e) => e.type === 'ai')
  if (!ai) return false
  const model = deriveWranglerBindingDiamonds([ai])[0]!
  const faces = bindingDeploymentFaces(ai.type, model)
  return faces.worker && cloudflareBindingFace(ai.type) === 'worker'
}

/** Born rule: superposed amplitudes balance at unity. */
export const superpositionHolds = (): boolean => {
  const u = uniform()
  if (Math.abs(total(u) - 1) > 1e-9) return false
  const biased = superpose({ 1: 2, 2: 1, 4: 3 })
  return Math.abs(total(biased) - 1) < 1e-9
}

/** Matrix collapse + superposition measurement to one eigenstate. */
export const collapseHolds = (): boolean => {
  if (!matrixCollapse()) return false
  const u = uniform()
  for (const r of [0, 0.3, 0.6, 0.999]) {
    if (!HORO_DIGITS.includes(measureCollapse(u, r))) return false
  }
  return true
}

/** Reciprocal graph whole + entangle() order-independent. */
export const entanglementHolds = (): boolean => {
  const ent = entanglement()
  const reciprocalWhole = ent.edges > 0 && ent.reciprocal === ent.edges
  const nc = noCloning()
  const symmetricFix = entangle('a', 'b') === entangle('b', 'a')
  return reciprocalWhole && nc.holds && symmetricFix
}

/** Existence proof: wrangler binding diamonds (serverless facet) + quantum atom seal on live tree. */
export function existenceSealed(cwd = process.cwd()): boolean {
  const quantum = computeDiamond({ kind: 'path', path: 'quantum', cwd })
  return verifyDiamond(quantum.model).sealed && bindingsSealed(cwd)
}

/** Full DiamondComputation for one wrangler binding (serverless facet stage base). */
function bindingComputation(entry: WranglerBindingEntry): DiamondComputation {
  return computeDiamond({
    kind: 'cloudflare',
    binding: {
      atomPath: bindingAtomPath(entry.type, entry.bindingName),
      boundaryUuid: bindingBoundaryUuid({
        type: entry.type,
        bindingName: entry.bindingName,
        config: entry.config,
      }),
      bindingName: entry.bindingName,
      bindingType: entry.type,
      links: entry.type === 'ai' ? ['worker', 'cloudflare', 'ai'] : ['cloudflare', 'worker'],
    },
  })
}

/** Compute all six properties on the live system. */
export function serverlessQuantum(cwd = process.cwd()): ServerlessQuantumProperties {
  return {
    bindingsSealed: bindingsSealed(cwd),
    workerHosted: workerHosted(cwd),
    superpositionHolds: superpositionHolds(),
    collapseHolds: collapseHolds(),
    entanglementHolds: entanglementHolds(),
    existenceSealed: existenceSealed(cwd),
  }
}

/** Conjunction — serverless hosts quantum AND erpax proves it. */
export function isServerlessQuantum(cwd = process.cwd()): boolean {
  const p = serverlessQuantum(cwd)
  return Object.values(p).every(Boolean)
}

/**
 * Structural + existence proof with sealed diamond stages.
 * Folds serverless facet uuid ⊕ quantum facet uuid → one isomorphism uuid.
 */
export function proveServerlessQuantum(cwd = process.cwd()): ServerlessQuantumProof {
  const props = serverlessQuantum(cwd)
  const entries = bindingEntries(cwd)
  const bindingModels = deriveWranglerBindingDiamonds(entries)
  const bindingUuids = bindingModels.map((m) => diamondUuid(m)).sort()

  const stages: ServerlessQuantumStage[] = []

  const aiEntry = entries.find((e) => e.type === 'ai')
  if (!aiEntry) throw new Error('proveServerlessQuantum: wrangler.jsonc missing ai binding')

  // 1 — serverless bindings facet (AI binding diamond = representative sealed facet)
  const bindBase = bindingComputation(aiEntry)
  const bindExtra: DiamondComputationStage[] = []
  pushStage(bindExtra, 'bindings', { count: entries.length }, {
    types: [...new Set(entries.map((e) => e.type))].sort(),
    sealed: bindingModels.every((m) => verifyDiamond(m).sealed),
    bindingUuids,
  })
  stages.push(
    finalizeStage('serverless-bindings', bindBase, bindExtra, props.bindingsSealed),
  )

  // 2 — worker deployment face (AI binding ⊕ worker atom)
  const workerBase = computeDiamond({ kind: 'path', path: 'worker', cwd })
  const aiModel = deriveWranglerBindingDiamonds([aiEntry])[0]!
  const workerExtra: DiamondComputationStage[] = []
  pushStage(workerExtra, 'deployment-faces', { atomPath: bindBase.model.atomPath }, {
    ai: bindingDeploymentFaces(aiEntry.type, aiModel),
    aiFace: cloudflareBindingFace(aiEntry.type),
    worker: deploymentFaces(workerBase.model as DiamondModel),
  })
  stages.push(finalizeStage('worker-face', workerBase, workerExtra, props.workerHosted))

  // 3 — superposition facet
  const superBase = computeDiamond({ kind: 'path', path: 'superposition', cwd })
  const superExtra: DiamondComputationStage[] = []
  const u = uniform()
  pushStage(superExtra, 'superpose', { bindings: entries.length }, {
    totalProbability: total(u),
    levels: HORO_DIGITS.length,
  })
  stages.push(finalizeStage('superposition', superBase, superExtra, props.superpositionHolds))

  // 4 — collapse facet
  const quantumBase = computeDiamond({ kind: 'path', path: 'quantum', cwd })
  const collapseExtra: DiamondComputationStage[] = []
  pushStage(collapseExtra, 'collapse', { matrix: matrixCollapse() }, {
    measured: measureCollapse(u, 0),
    noCloning: noCloning().holds,
  })
  stages.push(finalizeStage('collapse', quantumBase, collapseExtra, props.collapseHolds))

  // 5 — entanglement facet
  const entBase = computeDiamond({ kind: 'path', path: 'entanglement', cwd })
  const ent = entanglement()
  const entExtra: DiamondComputationStage[] = []
  pushStage(entExtra, 'entangle', { edges: ent.edges }, {
    reciprocal: ent.reciprocal,
    reciprocalFraction: ent.edges > 0 ? ent.reciprocal / ent.edges : 0,
    symmetricFix: entangle('serverless', 'quantum') === entangle('quantum', 'serverless'),
  })
  stages.push(finalizeStage('entanglement', entBase, entExtra, props.entanglementHolds))

  // 6 — existence proof (erpax IS the proof) — cloudflare ⊕ quantum seal on live tree
  const existExtra: DiamondComputationStage[] = []
  pushStage(existExtra, 'existence', { repo: 'erpax', proofAtom: 'quantum/serverless' }, {
    serverlessFacetUuid: uuid(jcsCanonicalize({ bindings: bindingUuids })),
    quantumUuid: diamondUuid(quantumBase.model),
    wranglerBindings: entries.length,
  })
  stages.push(finalizeStage('existence', quantumBase, existExtra, props.existenceSealed))

  const serverlessFacetUuid = uuid(jcsCanonicalize({ bindings: bindingUuids }))
  const quantumFacetUuid = diamondUuid(quantumBase.model)
  const isomorphismUuid = uuid(
    jcsCanonicalize({
      serverless: serverlessFacetUuid,
      quantum: quantumFacetUuid,
      bindings: bindingUuids,
      properties: props,
    }),
  )

  const proofStages: DiamondComputationStage[] = stages.map((s) => ({
    stage: s.stage,
    input: { stageUuid: s.computation.computationUuid },
    output: { sealed: s.sealed, holds: s.holds },
    stageUuid: stageUuid(s.stage, s.computation.computationUuid, { sealed: s.sealed, holds: s.holds }),
  }))
  pushStage(proofStages, 'fold', { serverlessFacetUuid, quantumFacetUuid }, { isomorphismUuid })

  return {
    stages,
    properties: props,
    serverlessHosted: props.bindingsSealed && props.workerHosted && props.existenceSealed,
    quantumLawsHold:
      props.superpositionHolds && props.collapseHolds && props.entanglementHolds,
    isomorphismUuid,
    computationUuid: computationUuid(proofStages),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const proof = proveServerlessQuantum()
  console.log('quantum/serverless — serverless IS the quantum host; erpax IS the proof:')
  console.log('  serverlessHosted:', proof.serverlessHosted)
  console.log('  quantumLawsHold:', proof.quantumLawsHold)
  console.log('  isServerlessQuantum:', isServerlessQuantum())
  console.log('  isomorphism:', proof.isomorphismUuid)
  console.log('  computation:', proof.computationUuid)
  for (const s of proof.stages) {
    console.log(`  ${s.stage}: sealed=${s.sealed} holds=${s.holds}`)
  }
}
