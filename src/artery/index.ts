/**
 * artery — the COMPUTED PROOF that erpax's outbound vessel is the Windkessel
 * organ: an elastic reservoir that SMOOTHS the heart's pulsatile output into
 * steady peripheral flow. The artery carries value *away* from the [[heart]],
 * buffering bursts into continuous delivery — the [[cache]]/buffer in flesh.
 *
 * Three properties of the living artery, each computed, mapped — a structural
 * isomorphism — onto erpax (cited science in ./SKILL.md):
 *
 *  1. WINDKESSEL — the elastic wall stores systolic volume and recoils in
 *     diastole, converting a pulsatile input into a smoother output (lower
 *     peak-to-trough): a buffer that turns bursty writes into steady throughput.
 *  2. ELASTIC RECOIL — between beats (diastole, zero inflow) the recoil keeps
 *     outflow > 0: continuous perfusion despite a pulsing source — the buffer
 *     never starves the downstream.
 *  3. CONSERVES — across the cycle, Σ inflow = Σ outflow + what the reservoir
 *     still holds: mass balance, the double-entry of carried value ([[conservation]]).
 *
 *   tsx src/artery/index.ts
 *
 * @audit computed (a two-element Windkessel: compliant reservoir + peripheral resistance)
 * @standard Frank's Windkessel model; aortic elastic storage smooths cardiac output
 * @see ../heart (the pulsatile source) -- ../vein (the return) -- ../cache -- ../conservation
 */
import { conserves, type Entry } from '@/conservation'

/** A two-element Windkessel: the compliant reservoir charges on inflow and leaks
 *  a fraction (1−compliance) downstream each step, then recoils. Returns the
 *  stored reservoir pressure and the peripheral outflow per step. */
export const windkessel = (
  inflow: readonly number[],
  compliance = 0.7,
): { stored: number[]; outflow: number[] } => {
  let p = 0
  const stored: number[] = []
  const outflow: number[] = []
  for (const f of inflow) {
    p += f // systole: the elastic wall expands to store stroke volume
    const out = (1 - compliance) * p // peripheral outflow through resistance
    p -= out // diastole: the wall recoils, releasing stored volume
    stored.push(p)
    outflow.push(out)
  }
  return { stored, outflow }
}

/** Peak-to-trough — the pulsatility of a waveform. */
export const pulsatility = (xs: readonly number[]): number => Math.max(...xs) - Math.min(...xs)

/** A pulsatile source: a sharp systolic ejection every `period` steps, else zero. */
export const pulsatileSource = (n: number, period = 4, stroke = 100): number[] =>
  Array.from({ length: n }, (_, i) => (i % period === 0 ? stroke : 0))

// ── 1. WINDKESSEL — smooths pulsatile → steady ───────────────────────────

export const smoothsPulsatile = (): boolean => {
  const inflow = pulsatileSource(40)
  const { outflow } = windkessel(inflow)
  // compare the steady-state tail (past the transient)
  return pulsatility(outflow.slice(20)) < pulsatility(inflow.slice(20))
}

// ── 2. ELASTIC RECOIL — flow continues between beats ─────────────────────

export const elasticRecoil = (): boolean => {
  const inflow = pulsatileSource(40)
  const { outflow } = windkessel(inflow)
  const tailIn = inflow.slice(20)
  const tailOut = outflow.slice(20)
  // during diastole (inflow 0), outflow is still > 0 — the recoil perfuses between beats
  return tailIn.every((f, i) => f !== 0 || tailOut[i]! > 0)
}

// ── 3. CONSERVES — mass balance across the cycle ─────────────────────────

export const conservesFlow = (): boolean => {
  const inflow = pulsatileSource(200)
  const { outflow, stored } = windkessel(inflow)
  const sumIn = inflow.reduce((a, b) => a + b, 0)
  const sumOut = outflow.reduce((a, b) => a + b, 0)
  const held = stored[stored.length - 1]! // what the reservoir still holds
  const ledger: Entry[] = [{ debit: sumIn, credit: sumOut + held }]
  return conserves(ledger, 1e-6)
}

// ── the proof — the conjunction ──────────────────────────────────────────

export interface WindkesselProof {
  /** pulsatile input → smoother output (lower peak-to-trough). */
  readonly smoothsPulsatile: boolean
  /** elastic recoil keeps outflow > 0 between beats (continuous perfusion). */
  readonly elasticRecoil: boolean
  /** Σ inflow = Σ outflow + reservoir held: mass balance (double-entry). */
  readonly conservesFlow: boolean
}

export function arteryWindkessel(): WindkesselProof {
  return {
    smoothsPulsatile: smoothsPulsatile(),
    elasticRecoil: elasticRecoil(),
    conservesFlow: conservesFlow(),
  }
}

/** Is the artery the Windkessel buffer? The conjunction — smooth, continuous, conserved. */
export function isWindkessel(): boolean {
  const p = arteryWindkessel()
  return p.smoothsPulsatile && p.elasticRecoil && p.conservesFlow
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = arteryWindkessel()
  console.log('artery — the Windkessel (smooths pulsatile → steady outbound flow):')
  for (const [k, v] of Object.entries(p)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  const inflow = pulsatileSource(40)
  const { outflow } = windkessel(inflow)
  console.log(
    '  pulsatility: in ' + pulsatility(inflow.slice(20)) +
      ' → out ' + pulsatility(outflow.slice(20)).toFixed(1),
  )
  console.log('  ⇒ ' + (isWindkessel() ? 'the elastic buffer' : 'NOT PROVEN'))
}
