/**
 * interference -- two [[wave]] amplitudes combine by PHASE, not by classical sum.
 * For amplitudes a1,a2 with relative phase φ the intensity is
 *   I = a1² + a2² + 2·a1·a2·cos(φ)
 * — CONSTRUCTIVE (in phase, φ=0): I=(a1+a2)², the maximum; DESTRUCTIVE (out of
 * phase, φ=π): I=(a1−a2)², the minimum. The cross term 2·a1·a2·cos(φ) is the
 * quantum part — the deviation from the classical a1²+a2² that draws the
 * double-slit fringes. Averaged over a full period it vanishes (⟨cos⟩=0), so
 * energy is CONSERVED: interference redistributes intensity, never creates it.
 *
 * In erpax two paths to the same atom interfere: in-phase paths REINFORCE (the
 * [[gravity]] well deepens, mass↑), out-of-phase paths CANCEL. The phase is the
 * A432 helix angle ([[phase]] / [[harmony]] — the 120° rodin coils), so the corpus
 * is a standing interference pattern of its own [[link]] paths — a [[superposition]]
 * made visible.
 *
 *   tsx src/interference/index.ts
 *
 * @audit I = a1²+a2²+2a1a2·cos φ; constructive/destructive/visibility computed, never asserted
 * @see ../wave -- ../superposition -- ../photon -- ../gravity (reinforcement = mass) -- ../phase -- ../harmony
 */

/** The two-path intensity: I = a1² + a2² + 2·a1·a2·cos(φ). */
export const intensity = (a1: number, a2: number, phaseRad: number): number =>
  a1 * a1 + a2 * a2 + 2 * a1 * a2 * Math.cos(phaseRad)

/** Constructive maximum (in phase, φ=0): (a1+a2)². */
export const constructive = (a1: number, a2: number): number => (a1 + a2) * (a1 + a2)

/** Destructive minimum (out of phase, φ=π): (a1−a2)². */
export const destructive = (a1: number, a2: number): number => (a1 - a2) * (a1 - a2)

/** The cross (interference) term — the deviation from the classical sum a1²+a2². */
export const crossTerm = (a1: number, a2: number, phaseRad: number): number => 2 * a1 * a2 * Math.cos(phaseRad)

/** Fringe visibility (contrast) V = 2·|a1·a2| / (a1²+a2²), in [0,1]; 1 when a1=a2 (full contrast). */
export const visibility = (a1: number, a2: number): number => {
  const denom = a1 * a1 + a2 * a2
  return denom === 0 ? 0 : (2 * Math.abs(a1 * a2)) / denom
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const a1 = 1
  const a2 = 1
  console.log('interference -- two equal amplitudes combine by phase (a1=a2=1):')
  for (const f of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
    console.log('  φ=' + (f / Math.PI).toFixed(2) + 'π  I=' + intensity(a1, a2, f).toFixed(4))
  }
  console.log('  constructive=' + constructive(a1, a2) + '  destructive=' + destructive(a1, a2) + '  visibility=' + visibility(a1, a2))
}
