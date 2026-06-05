/**
 * entropy -- the FUEL, the disorder the whole ledger balances, COMPUTED live.
 *
 * entropy is the one quantity erpax keeps double-entry books on (angel: order /
 * ↓entropy ⊕ archangel: duplicate / ↑entropy). Asymmetry IS slack: a binding
 * merge(a,b) present without its reverse merge(b,a) is a directed edge a forger
 * could ride one way. The reciprocal-edge fraction (the SAME number quantum's
 * entanglement reports) measures how symmetric the matrix is; the slack left
 * over -- 1 - that fraction -- is the borrowed disorder. Orphans (atoms bound
 * by nothing, binding nothing) are pure unfused disorder. Zero entropy ⇒
 * infinite mass ⇒ infinite tamper/exploit cost.
 *
 *   tsx src/entropy/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../quantum (same reciprocal count, two views) -- ../digit -- ../harmony (A432)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E } from '@/uuid/matrix'

/** Reciprocity: # directed edges whose reverse is also present (EXACTLY as quantum.entanglement). */
export function reciprocity(): { reciprocal: number; edges: number; fraction: number } {
  const edgeSet = new Set(E.map((e) => e.f + ',' + e.t))
  let reciprocal = 0
  for (const e of E) if (edgeSet.has(e.t + ',' + e.f)) reciprocal++
  return { reciprocal, edges: E.length, fraction: reciprocal / E.length }
}

/** Borrowed-disorder slack in [0,1] = the asymmetry a forger could exploit (1 - reciprocity). */
export const entropy = (): number => 1 - reciprocity().fraction

/** Orphans: atom names with ZERO incoming AND ZERO outgoing edges (fully unbound disorder). */
export function orphans(): string[] {
  const bound = new Set<number>()
  for (const e of E) {
    bound.add(e.f)
    bound.add(e.t)
  }
  return N.filter((_, i) => !bound.has(i)).map((n) => n.atom)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = reciprocity()
  console.log('entropy (' + N.length + ' nodes):')
  console.log('  reciprocity: ' + r.reciprocal + '/' + r.edges + ' (' + (100 * r.fraction).toFixed(1) + '% symmetric)')
  console.log('  entropy=' + entropy().toFixed(4) + ' (borrowed slack)  orphans=' + orphans().length)
}
