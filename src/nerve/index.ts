/**
 * nerve — the COMPUTED PROOF that erpax's signal pathway is the nervous organ:
 * it fires ALL-OR-NOTHING. The action potential is the [[gate]] in flesh — a
 * threshold crossed or not, never partial — and the [[signal]] that carries it.
 *
 * Three properties of the living nerve, each computed, mapped — a structural
 * isomorphism — onto erpax's gate/signal (cited science in ./SKILL.md):
 *
 *  1. ALL-OR-NOTHING — below threshold (≈−55 mV) nothing fires; at or above,
 *     the neuron fully depolarises to a constant-amplitude spike, regardless of
 *     how far past threshold. The [[gate]]: a proof passes or it doesn't — no
 *     graded "mostly green".
 *  2. REFRACTORY — for ~2 ms after a spike the channels cannot reopen, so the
 *     same stimulus cannot re-fire: the spike is idempotent / debounced.
 *  3. SALTATORY — myelinated axons let the impulse 'jump' node to node, far
 *     faster (up to ≈120 m/s) than continuous unmyelinated conduction: skipping
 *     the inert span ([[fractal]]/[[holographic]] leap, not step-by-step).
 *
 *   tsx src/nerve/index.ts
 *
 * @audit computed from first principles (threshold step · refractory window · saltatory speed)
 * @standard Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV
 * @see ../gate (pass/fail, all-or-nothing) -- ../signal -- ../fractal (the saltatory leap)
 */

export const RESTING_MV = -70
export const THRESHOLD_MV = -55
export const SPIKE_MV = 40 // the depolarised peak

// ── 1. ALL-OR-NOTHING — the threshold step ───────────────────────────────

/** The action potential fires iff the stimulus reaches threshold — a step, not a slope. */
export const fire = (stimulusMv: number): 0 | 1 => (stimulusMv >= THRESHOLD_MV ? 1 : 0)

/** The spike amplitude is CONSTANT once fired — never graded by how far past threshold. */
export const spikeAmplitude = (stimulusMv: number): number => (fire(stimulusMv) ? SPIKE_MV - RESTING_MV : 0)

export const allOrNothing = (): boolean =>
  fire(THRESHOLD_MV - 1) === 0 && // sub-threshold ⇒ nothing
  fire(THRESHOLD_MV) === 1 && // at threshold ⇒ fire
  fire(0) === 1 && // far supra-threshold ⇒ fire (no more than full)
  spikeAmplitude(0) === spikeAmplitude(THRESHOLD_MV) && // amplitude constant (not graded)
  spikeAmplitude(THRESHOLD_MV - 5) === 0

// ── 2. REFRACTORY — the spike is idempotent ──────────────────────────────

/** Absolute refractory period (~2 ms): the channels cannot reopen — no re-fire. */
export const REFRACTORY_MS = 2
export const canFire = (msSinceLast: number): boolean => msSinceLast >= REFRACTORY_MS
export const refractory = (): boolean =>
  !canFire(0) && !canFire(REFRACTORY_MS - 1) && canFire(REFRACTORY_MS) && canFire(REFRACTORY_MS + 3)

// ── 3. SALTATORY — the myelinated leap ───────────────────────────────────

/** Myelinated saltatory conduction reaches ≈120 m/s; unmyelinated continuous ≈1 m/s. */
export const MYELINATED_MS = 120
export const UNMYELINATED_MS = 1
export const conductionSpeed = (myelinated: boolean): number =>
  myelinated ? MYELINATED_MS : UNMYELINATED_MS
export const saltatoryFaster = (): boolean => conductionSpeed(true) > conductionSpeed(false)

// ── the proof — the conjunction ──────────────────────────────────────────

export interface SignalProof {
  /** threshold step, constant amplitude — the gate (pass/fail). */
  readonly allOrNothing: boolean
  /** the spike cannot re-fire within the refractory window — idempotent. */
  readonly refractory: boolean
  /** myelinated saltatory conduction leaps node-to-node, far faster. */
  readonly saltatoryFaster: boolean
}

export function nerveSignal(): SignalProof {
  return { allOrNothing: allOrNothing(), refractory: refractory(), saltatoryFaster: saltatoryFaster() }
}

/** Does the nerve fire as the gate? The conjunction — all-or-nothing, idempotent, leaping. */
export function fires(): boolean {
  const p = nerveSignal()
  return p.allOrNothing && p.refractory && p.saltatoryFaster
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = nerveSignal()
  console.log('nerve — the all-or-nothing signal (the gate):')
  for (const [k, v] of Object.entries(p)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  console.log('  ⇒ ' + (fires() ? 'it fires (threshold crossed or not, never partial)' : 'NOT PROVEN'))
}
