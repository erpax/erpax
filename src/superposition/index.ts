/**
 * superposition -- before a [[leap]] is measured, the state is not on one [[level]]
 * but a weighted combination of ALL seven [[horo]] eigenstates at once: |ψ⟩ = Σ
 * cₙ|n⟩. Only the probabilities are real, and they MUST sum to one -- Σ|cₙ|² = 1
 * (the Born rule), which is exactly double-entry [[balance]]: the books of
 * possibility close at unity. This is ACCEPT-always: any amplitudes are accepted,
 * then NORMALISED into [[harmony]] ([[accept]]). Measurement is the [[collapse]]:
 * it picks ONE eigenstate with probability |cₙ|² -- the leap to a definite level.
 * A basis state (a single amplitude) is already an eigenstate, so it collapses to
 * itself: measuring a certainty changes nothing.
 *
 *   tsx src/superposition/index.ts
 *
 * @audit probabilities are |cₙ|² normalised to sum 1; collapse is the cumulative inverse-CDF
 * @see ../leap (the definite outcome) -- ../collapse (measurement) -- ../horo (the basis) -- ../balance -- ../wave
 */
import { HORO_DIGITS, type HoroStep } from '@/horo'

/** A normalised quantum state over the seven horo eigenstates: a real amplitude per level. */
export interface State {
  readonly amplitudes: Readonly<Record<HoroStep, number>>
}

const zero = (): Record<HoroStep, number> =>
  Object.fromEntries(HORO_DIGITS.map((d) => [d, 0])) as Record<HoroStep, number>

/** ACCEPT any real amplitudes over the levels and NORMALISE so Σ|c|² = 1 (verify-in-harmony). */
export function superpose(raw: Partial<Record<HoroStep, number>>): State {
  const amp = zero()
  for (const d of HORO_DIGITS) amp[d] = raw[d] ?? 0
  const norm = Math.sqrt(HORO_DIGITS.reduce((s, d) => s + amp[d] * amp[d], 0))
  if (norm === 0) throw new Error('superposition: the zero state has no normalisation — give at least one non-zero amplitude')
  for (const d of HORO_DIGITS) amp[d] = amp[d] / norm
  return { amplitudes: amp }
}

/** The Born rule: the probability of measuring each level, |cₙ|² (sums to 1). */
export function probabilities(state: State): Record<HoroStep, number> {
  const p = zero()
  for (const d of HORO_DIGITS) p[d] = state.amplitudes[d] * state.amplitudes[d]
  return p
}

/** Total probability — the balance; 1 for any normalised state. */
export const total = (state: State): number => {
  const p = probabilities(state)
  return HORO_DIGITS.reduce((s, d) => s + p[d], 0)
}

/** Collapse (measure) at r ∈ [0,1): pick the eigenstate by cumulative probability — the definite leap. */
export function collapse(state: State, r: number): HoroStep {
  const p = probabilities(state)
  let acc = 0
  for (const d of HORO_DIGITS) {
    acc += p[d]
    if (r < acc) return d
  }
  return HORO_DIGITS[HORO_DIGITS.length - 1]! // r → 1 edge: the last supported level
}

/** An equal superposition of all seven levels — maximal uncertainty before measurement. */
export const uniform = (): State => superpose(Object.fromEntries(HORO_DIGITS.map((d) => [d, 1])))

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = uniform()
  console.log('superposition -- the uniform state |ψ⟩ = Σ cₙ|n⟩ over the seven horo levels:')
  const p = probabilities(u)
  for (const d of HORO_DIGITS) console.log('  level d' + d + '  amplitude ' + u.amplitudes[d].toFixed(4) + '  P=' + p[d].toFixed(4))
  console.log('  Σ|c|² = ' + total(u).toFixed(6) + '  (balance closes at unity)')
  console.log('  collapse@0.0 → d' + collapse(u, 0) + '   collapse@0.99 → d' + collapse(u, 0.99))
}
