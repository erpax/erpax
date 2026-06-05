/**
 * ecosystem -- the FUSION node: conservation ⊕ sustainability ⊕ decentralization ⊕ diversity = one web.
 *
 * HONEST SCOPE: the food web is open and sun-driven, not a perpetual machine — it is a
 * dissipative structure (Prigogine 1977): matter cycles, energy degrades one-way. The
 * ~10% trophic-transfer efficiency (Lindeman 1942) is an empirical average, not a constant.
 * And "diversity ⇒ stability" is NOT a theorem: May (1972) showed that large complex random
 * systems can be *less* stable than simple ones. What diversity reliably buys is functional
 * redundancy — more independent pathways to perform a job — which is decentralization's
 * resilience under a different name.
 *
 *   tsx src/ecosystem/index.ts
 *
 * @standard Tansley (1935) — coined "ecosystem": organisms plus environment as one system
 * @standard Lindeman, The Trophic-Dynamic Aspect of Ecology (1942) — ~10% energy per level
 * @standard Elton (1958) vs May, Will a Large Complex System be Stable? (1972) — diversity–stability debate
 * @audit computed, never hand-asserted
 * @see ../conservation ../sustainability ../decentralization ../diversity ../network ../society
 */

import { conserves, type Entry } from '@/conservation'
import { isSustainable, type Cycle } from '@/sustainability'
import { nakamoto } from '@/decentralization'
import { shannon } from '@/diversity'

// ── Lindeman trophic energy flow ─────────────────────────────────────────────

/**
 * trophicTransfer — energy available at the NEXT trophic level.
 * Lindeman's law: roughly 10% of energy passes between levels.
 * Default efficiency = 0.1 (the empirical average; real webs range 5–20%).
 */
export const trophicTransfer = (energyIn: number, efficiency = 0.1): number =>
  energyIn * efficiency

/**
 * trophicPyramid — energy available at each trophic level.
 * Returns an array of length `levels`: [base, base·eff, base·eff², …].
 * Each element is the energy available at that level; the geometric decay
 * encodes why apex predators are rare relative to primary producers.
 */
export const trophicPyramid = (base: number, levels: number, efficiency = 0.1): number[] => {
  const pyramid: number[] = []
  let energy = base
  for (let i = 0; i < levels; i++) {
    pyramid.push(energy)
    energy = trophicTransfer(energy, efficiency)
  }
  return pyramid
}

// ── Web type and health fusion ────────────────────────────────────────────────

/**
 * Web — a metabolic food web described along four axes simultaneously.
 * Each axis maps to one imported atom:
 *   flows      → conservation (balanced metabolic ledger)
 *   cycle      → sustainability (harvest/regen + entropy budget)
 *   shares     → decentralization (Nakamoto coefficient)
 *   abundances → diversity (Shannon H)
 */
export type Web = {
  /** The metabolic ledger: each entry is one organism's debit (consumption) and credit (production). */
  flows: Entry[]
  /** The throughput/entropy cycle — links to sustainability. */
  cycle: Cycle
  /** Control-distribution across organisms or species — links to decentralization. */
  shares: number[]
  /** Species abundances for the species richness distribution — links to diversity. */
  abundances: number[]
  /** Minimum Nakamoto coefficient required for a healthy web (default 2). */
  minNakamoto?: number
  /** Minimum Shannon entropy required for a healthy web (default 0). */
  minShannon?: number
}

/**
 * ecosystemHealth — the FUSION.
 *
 * An ecosystem is healthy iff it simultaneously:
 *   1. CONSERVES: the metabolic ledger balances (no phantom waste, no free creation).
 *   2. SUSTAINS:  the cycle closes its entropy budget (Prigogine) and the harvest ≤ regen.
 *   3. is DECENTRALIZED: no organism controls >50% (nakamoto ≥ minNakamoto, default 2).
 *   4. is DIVERSE: species richness distributes broadly (shannon ≥ minShannon, default 0).
 *
 * The deep claim (encoded here as code): sustainability and decentralization are the SAME
 * balanced local-exchange web seen from different axes, not two independent properties to
 * trade against each other. A network of balanced local exchanges gives you both — the way
 * a forest does, with no coordinator.
 *
 * Each condition is computed by CALLING the imported atom function — no logic is re-derived.
 */
export const ecosystemHealth = (
  w: Web,
): { conserved: boolean; sustained: boolean; nakamoto: number; shannon: number; healthy: boolean } => {
  const conserved = conserves(w.flows)
  const sustained = isSustainable(w.cycle)
  const nak = nakamoto(w.shares)
  const sh = shannon(w.abundances)
  const healthy =
    conserved &&
    sustained &&
    nak >= (w.minNakamoto ?? 2) &&
    sh >= (w.minShannon ?? 0)
  return { conserved, sustained, nakamoto: nak, shannon: sh, healthy }
}

// ── CLI demo ──────────────────────────────────────────────────────────────────

if (import.meta.url === 'file://' + process.argv[1]) {
  const web: Web = {
    flows: [
      { debit: 1000, credit: 1000 }, // producers fix sun → balanced
      { debit: 100, credit: 100 },   // herbivores consume → balanced
      { debit: 10, credit: 10 },     // carnivores consume → balanced
    ],
    cycle: { harvest: 800, regen: 1000, entropyProduced: 50, entropyExported: 60 },
    shares: [3, 3, 2, 2],   // four guilds — nakamoto ≥ 2
    abundances: [40, 30, 20, 10], // four species — shannon > 0
  }
  const h = ecosystemHealth(web)
  const pyramid = trophicPyramid(1000, 4)
  console.log('ecosystem demo:')
  console.log('  trophicPyramid(1000, 4):', pyramid.map((v) => v.toFixed(1)).join(' → '))
  console.log('  ecosystemHealth:', JSON.stringify(h))
}
