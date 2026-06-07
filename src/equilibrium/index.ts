/**
 * equilibrium -- DETAILED BALANCE: a system is at equilibrium when every forward
 * transition is exactly matched by its reverse — rate(i→j)·pᵢ = rate(j→i)·pⱼ for
 * all pairs. No net flow anywhere; [[entropy]] is maximal and stationary. This is
 * the THERMODYNAMIC twin of erpax's symmetric-[[merge]] binding: the collider
 * reciprocates every forward link a→b with the reverse b→a, so the matrix sits at
 * detailed balance (reciprocity = 1, directed-link entropy = 0). Equilibrium is the
 * [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger,
 * where the [[temperature]] Boltzmann distribution makes every rate-pair cancel.
 *
 *   tsx src/equilibrium/index.ts
 *
 * @audit detailed-balance residual |fwd·pᵢ − rev·pⱼ|; reciprocity fraction -- computed, never asserted
 * @see ../temperature (the equilibrium distribution) -- ../boltzmann -- ../entropy (reciprocity) -- ../merge
 */

/** A transition between two states with a forward and a reverse rate. */
export interface Transition {
  readonly i: number
  readonly j: number
  readonly forward: number
  readonly reverse: number
}

/** Detailed-balance residual for one pair: |rate(i→j)·pᵢ − rate(j→i)·pⱼ|. Zero ⇒ that pair balances. */
export const residual = (t: Transition, p: readonly number[]): number =>
  Math.abs(t.forward * (p[t.i] ?? 0) - t.reverse * (p[t.j] ?? 0))

/** Is the whole system at detailed balance? Every pair's residual within tolerance. */
export const atEquilibrium = (transitions: readonly Transition[], p: readonly number[], tol = 1e-9): boolean =>
  transitions.every((t) => residual(t, p) <= tol)

/** Reciprocity: the fraction of directed edges whose reverse is also present (1 ⇒ symmetric = balanced). */
export function reciprocity(edges: readonly (readonly [number, number])[]): number {
  if (edges.length === 0) return 1
  const set = new Set(edges.map(([a, b]) => a + ',' + b))
  let recip = 0
  for (const [a, b] of edges) if (set.has(b + ',' + a)) recip++
  return recip / edges.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = [0.6, 0.4]
  const balanced: Transition = { i: 0, j: 1, forward: 0.4, reverse: 0.6 } // 0.4·0.6 = 0.6·0.4 ✓
  console.log('equilibrium -- detailed balance (rate·p matched both ways):')
  console.log('  residual=' + residual(balanced, p).toExponential(2) + '  atEquilibrium=' + atEquilibrium([balanced], p))
  console.log('  reciprocity [[0,1],[1,0]] = ' + reciprocity([[0, 1], [1, 0]]) + '  (symmetric = balanced)')
  console.log('  reciprocity [[0,1]]       = ' + reciprocity([[0, 1]]) + '  (one-way = not balanced)')
}
