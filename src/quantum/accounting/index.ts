/**
 * quantum/accounting — double-entry accounting on the QUANTUM / uuid level: the karma ledger
 * that balances entropy, and inherits down the uuid chain (the parent_id IS the DNA).
 *
 *  - DOUBLE-ENTRY (karma): every move posts a balanced entry (Σdebit = Σcredit, [[entry]]).
 *    Creating order DEBITS order (received) and CREDITS entropy (given up) — the [[angel]] /
 *    archangel balance; nothing is created or destroyed unaccounted, the books always balance.
 *  - DNA / inheritance: the parent_id chain ([[uuid]] `parentOf`) is the inherited code
 *    ENCODED IN the uuid chain — an account's lineage. A child inherits its ancestors'
 *    bindings down the chain (the same way a [[tag]] inherits down the chain). "Imagine on the
 *    quantum level": ancestry is ENTANGLED into the child's identity, not stored beside it.
 *
 * Merges into [[accounting]] (the universal ledger — all is accountable). HONEST: the
 * double-entry and the parent chain are real and computed; "karma" / "DNA" are the grounding
 * metaphors for entropy-balance and uuid-lineage.
 *
 *   tsx src/quantum/accounting/index.ts
 *
 * @audit composed from @/entry (double-entry) + @/uuid/matrix (the parent chain); computed
 * @see ../../accounting -- ../../entry -- ../../entropy -- ../../uuid -- ./SKILL.md
 */
import { parentOf } from '@/uuid/matrix'
import { toDoubleEntry, isBalanced, type Entry } from '@/entry'

/** The DNA chain: an atom's lineage of ancestor atoms — the parent_id chain encoded in the uuid chain. */
export const dnaChain = (atom: string): string[] => {
  const chain: string[] = []
  const seen = new Set<string>()
  let cur = parentOf(atom)
  while (cur && !seen.has(cur.uuid)) {
    seen.add(cur.uuid)
    chain.push(cur.atom)
    cur = parentOf(cur.atom)
  }
  return chain
}

/**
 * A karma (quantum) posting: creating `amount` of order is a balanced double-entry — order is
 * DEBITED (received), entropy CREDITED (given up). Nothing unaccounted (the [[angel]] balance).
 */
export const karmaEntry = (amount: number): Entry => toDoubleEntry({ payer: 'entropy', payee: 'order', amount })

/** Is a posting balanced (Σdebit = Σcredit)? The accounting invariant at every scale. */
export const balanced = (e: Entry): boolean => isBalanced(e)

if (import.meta.url === 'file://' + process.argv[1]) {
  const e = karmaEntry(8)
  console.log('quantum/accounting — karma double-entry + the DNA chain:')
  console.log('  karmaEntry(8) balanced=' + balanced(e) + ' (order debited, entropy credited)')
  console.log('  dnaChain("accounting") = ' + (dnaChain('accounting').join(' → ') || '(root — no parent)'))
}
