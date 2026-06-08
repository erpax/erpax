/**
 * quantum/dimensions — quantum semantics folded across every projection axis.
 *
 * 1D path     — superposition over the seven horo eigenstates (sequence ring).
 * 2D partition — path-partition × horo measure grid (typography plane); Born rule
 *                closes at unity; collapse lands on one cell; seal = content-uuid fold.
 * 3D trinity  — form · code · proof completeness on the quantum diamond.
 * matrix      — collapse · no-cloning · quantization on the live uuid-matrix.
 * deployment  — worker · plugin · pwa faces of the same sealed vertex.
 *
 * @see ./index.ts — ../superposition — ../horo — ../typography — ../diamond — ./serverless
 */
import { HORO_DIGITS, HORO_MEASURE, type HoroStep } from '@/horo'
import { superpose, total, collapse as collapse1D, uniform } from '@/superposition'
import { computeDiamond, deploymentFaces, type DiamondModel } from '@/diamond'
import { uuid, jcsCanonicalize } from '@/integrity'
import { UUID_MATRIX_NODES as N, verifyRoot } from '@/uuid/matrix'
import { digitTrace, offSequence } from '@/digit'

/** One cell of the path-partition × horo grid — the 2D basis coordinate. */
export interface Grid2DCell {
  readonly partition: string
  readonly horo: HoroStep
  readonly measure: (typeof HORO_MEASURE)[number]
}

/** Normalised 2D quantum state: amplitudes over partition × horo cells. */
export interface State2D {
  readonly amplitudes: Readonly<Record<string, number>>
}

/** Canonical 2D basis cells — every horo step paired with its measure at each partition. */
export const PARTITION2D_SAMPLES = ['quantum', 'horo', 'diamond'] as const

/** Flat key for a 2D cell — `partition:horo` (the path×horo coordinate). */
export const cell2DKey = (partition: string, horo: HoroStep): string => `${partition}:${horo}`

/** Enumerate the on-ring 2D basis for sample partitions (path depth-1 × horo ring). */
export function basis2D(partitions: readonly string[] = PARTITION2D_SAMPLES): Grid2DCell[] {
  const cells: Grid2DCell[] = []
  for (const partition of partitions) {
    for (let i = 0; i < HORO_DIGITS.length; i++) {
      cells.push({
        partition,
        horo: HORO_DIGITS[i]!,
        measure: HORO_MEASURE[i]!,
      })
    }
  }
  return cells
}

const zero2D = (partitions: readonly string[]): Record<string, number> => {
  const amp: Record<string, number> = {}
  for (const c of basis2D(partitions)) amp[cell2DKey(c.partition, c.horo)] = 0
  return amp
}

/**
 * ACCEPT any real amplitudes over the 2D grid and NORMALISE so Σ|c|² = 1.
 * The typography partition plane (path segment) × horo measure is the 2D basis.
 */
export function superpose2D(
  raw: Partial<Record<string, number>>,
  partitions: readonly string[] = PARTITION2D_SAMPLES,
): State2D {
  const amp = zero2D(partitions)
  for (const [k, v] of Object.entries(raw)) {
    if (k in amp) amp[k] = v ?? 0
  }
  const norm = Math.sqrt(Object.values(amp).reduce((s, a) => s + a * a, 0))
  if (norm === 0) throw new Error('superpose2D: the zero state has no normalisation — give at least one non-zero amplitude')
  for (const k of Object.keys(amp)) amp[k] = amp[k]! / norm
  return { amplitudes: amp }
}

/** Born rule on the 2D grid — |c|² per cell (sums to 1 for a normalised state). */
export function probabilities2D(state: State2D): Record<string, number> {
  const p: Record<string, number> = {}
  for (const [k, a] of Object.entries(state.amplitudes)) p[k] = a * a
  return p
}

/** Total probability on the 2D grid — the balance; 1 for any normalised state. */
export const total2D = (state: State2D): number =>
  Object.values(probabilities2D(state)).reduce((s, v) => s + v, 0)

/** Collapse (measure) at r ∈ [0,1): pick one partition×horo cell by cumulative probability. */
export function collapse2D(state: State2D, r: number): Grid2DCell {
  const p = probabilities2D(state)
  const keys = Object.keys(p).sort()
  let acc = 0
  for (const k of keys) {
    acc += p[k]!
    if (r < acc) {
      const [partition, horoStr] = k.split(':')
      const horo = Number(horoStr) as HoroStep
      const mi = HORO_DIGITS.indexOf(horo)
      return { partition: partition!, horo, measure: HORO_MEASURE[mi]! }
    }
  }
  const last = keys[keys.length - 1]!
  const [partition, horoStr] = last.split(':')
  const horo = Number(horoStr) as HoroStep
  const mi = HORO_DIGITS.indexOf(horo)
  return { partition: partition!, horo, measure: HORO_MEASURE[mi]! }
}

/** Content-uuid seal of a 2D state — deterministic fold; identical content ⇒ identical seal. */
export const seal2D = (state: State2D): string =>
  uuid(
    jcsCanonicalize(
      Object.entries(state.amplitudes)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([cell, amp]) => ({ cell, amp })),
    ),
  )

/** Uniform 2D superposition — maximal uncertainty over every partition×horo cell. */
export const uniform2D = (partitions: readonly string[] = PARTITION2D_SAMPLES): State2D => {
  const raw: Record<string, number> = {}
  for (const c of basis2D(partitions)) raw[cell2DKey(c.partition, c.horo)] = 1
  return superpose2D(raw, partitions)
}

/** 2D quantum facet holds — Born rule, on-ring collapse, deterministic seal. */
export const quantum2dHolds = (): boolean => {
  const u = uniform2D()
  if (Math.abs(total2D(u) - 1) > 1e-9) return false
  const biased = superpose2D({
    [cell2DKey('quantum', 1)]: 2,
    [cell2DKey('horo', 4)]: 1,
    [cell2DKey('diamond', 9)]: 3,
  })
  if (Math.abs(total2D(biased) - 1) > 1e-9) return false
  for (const r of [0, 0.3, 0.6, 0.999]) {
    const c = collapse2D(u, r)
    if (!HORO_DIGITS.includes(c.horo)) return false
    if (!PARTITION2D_SAMPLES.includes(c.partition as (typeof PARTITION2D_SAMPLES)[number])) return false
  }
  const sealA = seal2D(biased)
  const sealB = seal2D(superpose2D({
    [cell2DKey('quantum', 1)]: 4,
    [cell2DKey('horo', 4)]: 2,
    [cell2DKey('diamond', 9)]: 6,
  }))
  if (sealA !== sealB) return false
  return seal2D(biased) === seal2D({ amplitudes: biased.amplitudes })
}

export type QuantumProjectionDimension =
  | '1d-path'
  | '2d-partition'
  | '3d-trinity'
  | 'matrix'
  | 'deployment'

export interface QuantumDimensionCoverage {
  readonly dimension: QuantumProjectionDimension
  readonly holds: boolean
  readonly detail: string
}

/** 1D path axis — horo-ring superposition (the sequence eigenbasis). */
const holds1D = (): { holds: boolean; detail: string } => {
  const u = uniform()
  const holds = Math.abs(total(u) - 1) < 1e-9 && HORO_DIGITS.includes(collapse1D(u, 0))
  return { holds, detail: `Σ|c|²=${total(u).toFixed(6)} · levels=${HORO_DIGITS.length}` }
}

/** 3D trinity — form·code·proof on the quantum diamond vertex. */
const holds3D = (cwd: string): { holds: boolean; detail: string } => {
  const model = computeDiamond({ kind: 'path', path: 'quantum', cwd }).model as DiamondModel
  const t = model.trinity
  const sum = t.form + t.code + t.proof
  const holds = sum === 3
  return { holds, detail: `trinity ${t.form}·${t.code}·${t.proof}` }
}

/** Deployment faces — worker · plugin · pwa of the quantum diamond. */
const holdsDeployment = (cwd: string): { holds: boolean; detail: string } => {
  const model = computeDiamond({ kind: 'path', path: 'quantum', cwd }).model as DiamondModel
  const f = deploymentFaces(model)
  const holds = f.worker || f.plugin || f.pwa
  const detail = `worker·plugin·pwa ${Number(f.worker)}·${Number(f.plugin)}·${Number(f.pwa)}`
  return { holds, detail }
}

/**
 * Quantum semantics across every projection dimension — including the 2D
 * typography/partition × horo plane. Composes with [[quantum/serverless]] for
 * the serverless host proof (import serverless separately to avoid cycles).
 */
export function quantumInAllDimensions(cwd = process.cwd()): {
  readonly ok: boolean
  readonly dimensions: readonly QuantumDimensionCoverage[]
} {
  const unique = new Set(N.map((n) => n.uuid)).size
  const matrixCollapse = verifyRoot().ok
  const offSeq = offSequence().length
  const d1 = holds1D()
  const d2 = { holds: quantum2dHolds(), detail: `cells=${basis2D().length} · Born+seal` }
  const d3 = holds3D(cwd)
  const dM = {
    holds: matrixCollapse && unique === N.length && offSeq === 0,
    detail: `collapse=${matrixCollapse} · unique=${unique}/${N.length} · off-seq=${offSeq} · cells=${digitTrace().size}/81`,
  }
  const dD = holdsDeployment(cwd)

  const dimensions: QuantumDimensionCoverage[] = [
    { dimension: '1d-path', holds: d1.holds, detail: d1.detail },
    { dimension: '2d-partition', holds: d2.holds, detail: d2.detail },
    { dimension: '3d-trinity', holds: d3.holds, detail: d3.detail },
    { dimension: 'matrix', holds: dM.holds, detail: dM.detail },
    { dimension: 'deployment', holds: dD.holds, detail: dD.detail },
  ]

  return { ok: dimensions.every((d) => d.holds), dimensions }
}
