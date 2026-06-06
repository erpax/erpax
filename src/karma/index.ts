/**
 * karma — the entropy moral ledger. Creating order (↓entropy) is GOOD karma; destroying order
 * (↑entropy, waste) is BAD karma. Every move is a balanced double-entry ([[entry]]): order is
 * DEBITED (received), entropy CREDITED (given up) — the [[angel]] / archangel balance, nothing
 * created or destroyed unaccounted. Karma is the running net of order created over destroyed;
 * the society rewards ↓entropy (creation) and penalises ↑entropy ([[peace]]: building has
 * positive karma, destroying none).
 *
 * HONEST: "karma" is the MORAL reading of the entropy double-entry — the accounting is real
 * ([[accounting]] / [[entropy]]); the ethics is the framing.
 *
 *   tsx src/karma/index.ts
 *
 * @audit composed from @/entry (the double-entry); the balance is computed, never hand-asserted
 * @see ../entry -- ../entropy -- ../angel -- ../accounting -- ../quantum/karma -- ./SKILL.md
 */
import { toDoubleEntry, isBalanced, type Entry } from '@/entry'

/** A karma posting: `amount` of order created — order DEBITED (received), entropy CREDITED (given up). */
export const karmaEntry = (amount: number): Entry => toDoubleEntry({ payer: 'entropy', payee: 'order', amount })

/** Net karma: order created minus order destroyed. Positive = good karma (↓entropy, the [[angel]] move). */
export const karma = (created: number, destroyed: number): number => created - destroyed

/** Is a karma posting balanced (Σdebit = Σcredit)? The books always balance. */
export const balanced = (e: Entry): boolean => isBalanced(e)

if (import.meta.url === 'file://' + process.argv[1]) {
  const e = karmaEntry(8)
  console.log('karma — the entropy moral ledger:')
  console.log('  karmaEntry(8) balanced=' + balanced(e) + ' (order debited, entropy credited)')
  console.log('  karma(create 10, destroy 3) = ' + karma(10, 3) + ' (positive = good karma, ↓entropy)')
}
