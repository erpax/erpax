/**
 * boltzmann -- ENTROPY IS COUNTING: S = k·ln W. The [[entropy]] of a macrostate is
 * the Boltzmann constant times the log of W, the number of microstates that look
 * the same. One arrangement (W=1) ⇒ S=0; the more ways to be, the more entropy. It
 * is EXTENSIVE: independent systems multiply microstates (W₁·W₂), so their entropies
 * ADD (ln is the only map turning a product into a sum) -- the additive [[balance]]
 * the ledger keeps. This is the microstate foundation under erpax's reciprocity
 * entropy (../entropy): disorder is the log of the configuration count, and DRY
 * [[collapse]] removes configurations (W↓ ⇒ S↓). The Gibbs form generalises it to a
 * non-uniform distribution, and is MAXIMISED (= k·ln W) exactly when uniform.
 *
 *   tsx src/boltzmann/index.ts
 *
 * @standard SI-2019 exact: k_B = 1.380649e-23 J/K
 * @audit S = k·ln W, inverse W = e^(S/k), Gibbs S = −k·Σ pᵢ ln pᵢ -- all computed
 * @see ../entropy (the reciprocity twin) -- ../temperature -- ../equilibrium -- ../balance
 */

/** The Boltzmann constant k_B (J/K), exact SI-2019 definition. */
export const BOLTZMANN_K = 1.380649e-23

/** Boltzmann entropy S = k·ln W of a macrostate with W equally-likely microstates (W ≥ 1). */
export function entropy(microstates: number): number {
  if (microstates < 1) throw new Error('boltzmann: a macrostate has at least one microstate (W ≥ 1)')
  return BOLTZMANN_K * Math.log(microstates)
}

/** The inverse: the microstate count implied by an entropy, W = e^(S/k). */
export const microstates = (entropyJperK: number): number => Math.exp(entropyJperK / BOLTZMANN_K)

/** Gibbs entropy S = −k·Σ pᵢ·ln pᵢ for any distribution (reduces to k·ln W when uniform; maximal there). */
export function gibbs(probabilities: readonly number[]): number {
  return -BOLTZMANN_K * probabilities.reduce((s, p) => s + (p > 0 ? p * Math.log(p) : 0), 0)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('boltzmann -- S = k·ln W  (k=' + BOLTZMANN_K + ' J/K):')
  for (const W of [1, 2, 10, 1000]) console.log('  W=' + String(W).padStart(5) + '  S=' + entropy(W).toExponential(4) + ' J/K')
  console.log('  extensive: S(6)=' + entropy(6).toExponential(4) + ' = S(2)+S(3)=' + (entropy(2) + entropy(3)).toExponential(4))
  console.log('  gibbs(uniform 4)=' + gibbs([0.25, 0.25, 0.25, 0.25]).toExponential(4) + ' = k·ln4=' + entropy(4).toExponential(4))
}
