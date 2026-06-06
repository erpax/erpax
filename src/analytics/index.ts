/**
 * analytics — the all-aspects analyzer. The FOLD: it measures nothing of its
 * own; it COMPOSES the measures already minted on the live uuid-matrix into ONE
 * `AnalysisReport`. The law is compose-never-duplicate (DRY) — each aspect is a
 * thin shell over the atom that already owns that truth.
 *
 * `analyze()` is PURE: it reads only the generated matrix and the computed
 * consts (no DB, no disk). The two truths still living outside the matrix stay
 * outside it — the aura/trinity tree-walk is fs-bound, and live GL/margin is
 * DB-bound (composes accounting behind a caller).
 *
 * Six aspects: structure · entropy · coverage · harmony · trust · economic.
 *
 *   tsx src/analytics/index.ts
 *
 * @standard ISO/IEC-25010:2023 quality model — a computed read-out across quality aspects
 * @audit computed on the live uuid-matrix + balance/entropy/standards, never hand-asserted
 * @see ./SKILL.md -- ../balance -- ../entropy -- ../harmony -- ../tamper/cost -- ../standards
 */
import { UUID_MATRIX_NODES as NODES, nodesByDim, edgesByDirection, UUID_MATRIX_ROOT } from '@/uuid/matrix'
import { auraBalance, coverage as schemaCoverage, disbalance, tamperCostLog2, type Distribution } from '@/balance'
import { reciprocity, entropy as linkEntropy, orphans } from '@/entropy'
import { bandHarmony, type BandHarmony } from '@/harmony'
import { HORO_DIGITS } from '@/horo'
import {
  secondPreimageLog2,
  bruteYearsLog2,
  BITCOIN_HASHRATE_LOG2,
  ERPAX_DIGEST_BITS,
  CONTENT_DIGEST_BITS,
} from '@/cost'
import { STANDARDS_CATALOGUE, STANDARDS_COUNT } from '@/standards/catalogue'

// The deep security capability — the weakest link relating to MAX tamper cost.
export { maxTamperCost, type MaxTamperCostReport, type TamperLever } from './max-tamper-cost'

/** Geometric mean of [0,1] signals — a single zero caps the whole (the bottleneck law). */
export const geometricMean = (xs: readonly number[]): number =>
  xs.length ? xs.reduce((a, b) => a * b, 1) ** (1 / xs.length) : 1

// ───────────────────────── structure: corpus morphology ─────────────────────────
export interface StructureReport {
  atoms: number
  edges: number
  dimensions: number
  byBand: Record<string, number>
  topDims: { dim: string; atoms: number }[]
  byDirection: Record<number, number>
  meanDegree: number
}
export const structure = (): StructureReport => {
  const byDim = Object.entries(nodesByDim()).map(([dim, ns]) => ({ dim, atoms: ns.length }))
  const byDirection = edgesByDirection()
  const edges = Object.values(byDirection).reduce((a, b) => a + b, 0)
  const byBand: Record<string, number> = {}
  for (const n of NODES) byBand[n.band] = (byBand[n.band] ?? 0) + 1
  return {
    atoms: NODES.length,
    edges,
    dimensions: byDim.length,
    byBand,
    topDims: [...byDim].sort((a, b) => b.atoms - a.atoms).slice(0, 8),
    byDirection,
    meanDegree: NODES.length ? (2 * edges) / NODES.length : 0,
  }
}

// ───────────────────────── entropy: disorder ─────────────────────────
export interface EntropyReport {
  reciprocity: number
  entropy: number
  orphanCount: number
  orphans: string[]
}
export const entropyReport = (): EntropyReport => {
  const r = reciprocity()
  const orph = orphans()
  return { reciprocity: r.fraction, entropy: linkEntropy(), orphanCount: orph.length, orphans: orph.slice(0, 20) }
}

// ───────────────────────── coverage: wholeness ─────────────────────────
export interface CoverageReport {
  modelCollection: { coverage: number; disbalance: number; balanced: number; collections: number }
  standards: { published: number; catalogued: number }
}
export const coverageReport = (): CoverageReport => {
  const d: Distribution = auraBalance()
  return {
    modelCollection: {
      coverage: schemaCoverage(d),
      disbalance: disbalance(d),
      balanced: d.balanced,
      collections: d.collections,
    },
    standards: { published: STANDARDS_COUNT, catalogued: STANDARDS_CATALOGUE.length },
  }
}

// ───────────────────────── harmony: ring consonance ─────────────────────────
export interface HarmonyReport {
  consonant: boolean
  /** smooth consonance signal ∈ [0,1] — composed from harmony, not recomputed */
  consonantFraction: number
  worstTenney: number
  meanTenney: number
  intervals: number
  ring: readonly number[]
}
export const harmonyReport = (): HarmonyReport => {
  const bh: BandHarmony = bandHarmony(HORO_DIGITS)
  return {
    consonant: bh.consonant,
    consonantFraction: bh.consonantFraction,
    worstTenney: bh.worstTenney,
    meanTenney: bh.meanTenney,
    intervals: bh.intervals.length,
    ring: HORO_DIGITS,
  }
}

// ───────────────────────── trust: tamper-cost ─────────────────────────
export interface TrustReport {
  coverage: number
  /** undetected-forge work (log2 ops) at the live coverage — ∞ only at full coverage */
  tamperWorkLog2: number
  /** log2 years to brute-force that work at the Bitcoin hashrate */
  forgeYearsLog2: number
  contentPreimageBits: number
  erpaxFloorBits: number
}
export const trustReport = (): TrustReport => {
  const d = auraBalance()
  const work = tamperCostLog2(d, 1)
  return {
    coverage: schemaCoverage(d),
    tamperWorkLog2: work,
    forgeYearsLog2: Number.isFinite(work) ? bruteYearsLog2(work, BITCOIN_HASHRATE_LOG2) : Infinity,
    contentPreimageBits: secondPreimageLog2(CONTENT_DIGEST_BITS),
    erpaxFloorBits: secondPreimageLog2(ERPAX_DIGEST_BITS),
  }
}

// ───────────────────────── economic: the corpus as one balanced ledger ─────────────────────────
export interface EconomicReport {
  /** [0,1] geometric mean of the aspect signals — one zero caps the whole */
  healthIndex: number
  components: Record<string, number>
  note: string
}
export const economicReport = (): EconomicReport => {
  const components = {
    modelCollectionCoverage: schemaCoverage(auraBalance()),
    reciprocity: reciprocity().fraction,
    harmonyConsonance: bandHarmony(HORO_DIGITS).consonantFraction,
  }
  return {
    healthIndex: geometricMean(Object.values(components)),
    components,
    note: 'live GL/margin analysis is DB-bound — composes @/accounting behind a caller',
  }
}

// ───────────────────────── the fold ─────────────────────────
export interface AnalysisReport {
  root: string
  structure: StructureReport
  entropy: EntropyReport
  coverage: CoverageReport
  harmony: HarmonyReport
  trust: TrustReport
  economic: EconomicReport
}

/** Analyze the whole, all aspects, in one pure pass over the live uuid-matrix. */
export const analyze = (): AnalysisReport => ({
  root: UUID_MATRIX_ROOT,
  structure: structure(),
  entropy: entropyReport(),
  coverage: coverageReport(),
  harmony: harmonyReport(),
  trust: trustReport(),
  economic: economicReport(),
})

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = analyze()
  console.log('analytics — all aspects (root ' + r.root.slice(0, 8) + '):')
  console.log('  structure  atoms=' + r.structure.atoms + ' edges=' + r.structure.edges + ' dims=' + r.structure.dimensions + ' meanDeg=' + r.structure.meanDegree.toFixed(2))
  console.log('  entropy    reciprocity=' + (100 * r.entropy.reciprocity).toFixed(1) + '% entropy=' + r.entropy.entropy.toFixed(4) + ' orphans=' + r.entropy.orphanCount)
  console.log('  coverage   model⊕collection=' + (100 * r.coverage.modelCollection.coverage).toFixed(1) + '% standards=' + r.coverage.standards.published)
  console.log('  harmony    consonant=' + r.harmony.consonant + ' worstTenney=' + r.harmony.worstTenney.toFixed(2) + ' intervals=' + r.harmony.intervals)
  console.log('  trust      coverage=' + (100 * r.trust.coverage).toFixed(1) + '% forgeYearsLog2=' + r.trust.forgeYearsLog2.toFixed(2) + ' floor=' + r.trust.erpaxFloorBits + 'bit')
  console.log('  economic   healthIndex=' + r.economic.healthIndex.toFixed(4))
}
