/**
 * quantum/accounting — double-entry accounting on the QUANTUM / uuid level. It COMPOSES the two
 * atoms that hold the laws — [[dna]] (the parent_id lineage = the inherited code, encoded in the
 * uuid chain) and [[karma]] (the entropy double-entry) — into lineage-stamped accounting.
 *
 * A posting balances (Σdebit = Σcredit) AND carries the account's DNA chain (who inherits it),
 * entangled into the uuid so the audit trail IS the identity — change an ancestor and the whole
 * descent line's uuids shift ([[merge]]). Merges into [[accounting]] (the universal ledger gets
 * its quantum matter here). "Imagine on the quantum level": ancestry + balance are read off the
 * uuid, not stored beside it.
 *
 * HONEST: the double-entry and the parent chain are real and computed; "karma" / "DNA" are the
 * grounding metaphors (see [[karma]] / [[dna]]).
 *
 *   tsx src/quantum/accounting/index.ts
 *
 * @audit composed from @/dna (lineage) + @/karma (the double-entry); computed on the live matrix
 * @see ../../accounting -- ../../dna -- ../../karma -- ../../entry -- ./SKILL.md
 */
import type { Entry } from '@/entry'
import { genome } from '@/dna'
import { karmaEntry, balanced } from '@/karma'

/** The DNA chain (an account's lineage) — from [[dna]], the lineage's home. */
export const dnaChain = genome

/** The karma double-entry + its balance check — from [[karma]], the ledger's home. */
export { karmaEntry, balanced }

/** A lineage-stamped karma posting: the balanced entry PLUS the account's DNA chain (who inherits it). */
export const accountWithLineage = (atom: string, amount: number): { entry: Entry; lineage: string[] } => ({
  entry: karmaEntry(amount),
  lineage: dnaChain(atom),
})

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = accountWithLineage('accounting', 8)
  console.log('quantum/accounting — karma double-entry ⊕ DNA lineage:')
  console.log('  balanced=' + balanced(a.entry) + '  lineage=' + (a.lineage.join(' → ') || '(root)'))
}
