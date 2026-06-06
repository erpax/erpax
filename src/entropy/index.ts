/**
 * entropy -- the FUEL, the disorder the whole ledger balances, COMPUTED live.
 *
 * entropy is the one quantity erpax keeps double-entry books on (angel: order /
 * ↓entropy ⊕ archangel: duplicate / ↑entropy). Asymmetry IS slack: a binding
 * merge(a,b) present without its reverse merge(b,a) is a directed edge a forger
 * could ride one way. The reciprocal-edge fraction (the SAME number quantum's
 * entanglement reports) measures how symmetric the matrix is; the slack left
 * over -- 1 - that fraction -- is the borrowed disorder. Orphans (atoms bound
 * by nothing, binding nothing) are pure unfused disorder. entropy() is an
 * audit/aura signal, NOT an input to crackVerdict/coverageCostLog2: it is a
 * DISTINCT measure from coverage (the [0,1] fraction that prices tamper-cost),
 * so zero entropy does NOT by itself yield infinite cost. The cost reaches its
 * +∞ limit ONLY at coverage = 1 (the live tree is the counter-example: entropy
 * 0, coverage < 1, cost finite -- see ../balance).
 *
 *   tsx src/entropy/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../quantum (same reciprocal count, two views) -- ../digit -- ../harmony (A432)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E } from '@/uuid/matrix'
import { auraBalance, coverage, disbalance } from '@/balance'

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
  const b = auraBalance()
  console.log(
    '  model⊕collection: ' +
      b.balanced +
      '/' +
      b.collections +
      ' collections have their model (' +
      (100 * coverage(b)).toFixed(1) +
      '% coverage, disbalance ' +
      (100 * disbalance(b)).toFixed(1) +
      '%, tamper-cost ' +
      (coverage(b) >= 1 ? '∞' : 'finite — the slack') +
      ')',
  )
}
