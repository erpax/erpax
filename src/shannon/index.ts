/**
 * shannon -- INFORMATION ENTROPY: H = −Σ pᵢ·log₂(pᵢ) BITS, the EXPECTED [[surprisal]]
 * of a distribution — the average bits per symbol, the irreducible limit of lossless
 * compression (the source-coding theorem). Zero when one outcome is certain; maximal
 * (log₂ n) when all n outcomes are equally likely (the uniform — the [[boltzmann]]
 * Gibbs maximum). It is the information twin of thermodynamic [[entropy]] (the same
 * −Σ p ln p, a different constant): the bits a message carries, the bits a [[tamper]]
 * must reproduce, the channel the content-[[uuid]] commits to.
 *
 *   tsx src/shannon/index.ts
 *
 * @audit H = −Σ pᵢ log₂ pᵢ = Σ pᵢ·surprisal(pᵢ); 0 ≤ H ≤ log₂ n -- computed
 * @see ../surprisal (H = its expectation) -- ../entropy -- ../boltzmann (Gibbs) -- ../redundancy -- ../cost
 */
import { surprisal } from '@/surprisal'

/** Shannon entropy H = −Σ pᵢ·log₂(pᵢ) bits = the expected surprisal of the distribution. */
export function entropy(probabilities: readonly number[]): number {
  return probabilities.reduce((h, p) => h + (p > 0 ? p * surprisal(p) : 0), 0)
}

/** The maximum possible entropy for n outcomes: log₂ n bits (the uniform distribution). */
export const maxEntropy = (n: number): number => (n > 0 ? Math.log2(n) : 0)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('shannon -- H = −Σ pᵢ log₂ pᵢ bits (expected surprisal):')
  console.log('  certain [1,0,0,0]      H=' + entropy([1, 0, 0, 0]).toFixed(3))
  console.log('  uniform [¼,¼,¼,¼]      H=' + entropy([0.25, 0.25, 0.25, 0.25]).toFixed(3) + ' = log₂4 = ' + maxEntropy(4))
  console.log('  skewed  [.7,.1,.1,.1]  H=' + entropy([0.7, 0.1, 0.1, 0.1]).toFixed(3))
}
