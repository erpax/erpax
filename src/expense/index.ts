/**
 * expense — entropy is MEASURABLE and BILLABLE. Disorder is not free: the corpus's measurable
 * entropy — reciprocity slack ([[entropy]]) plus the non-index-import gap ([[tamper]]/import), and
 * more as the corpus wires it — is priced and booked as a double-entry EXPENSE ([[entry]]). The
 * agent who created the disorder pays the entropy fund, and the books balance ([[balance]]). This is
 * the economic enforcement of the law: creating entropy COSTS, so contributors are bound to follow
 * the law by the ledger — not by ad-hoc remediation scripts after the fact.
 *
 * (Also the schema.org component word — IncentiveQualifiedExpenseType · qualifiedExpense — given its
 * matter-twin: an expense IS a billed cost, and entropy is the cost the corpus always carries.)
 *
 *   tsx src/expense/index.ts
 *
 * @audit entropy read live from @/entropy + @/tamper/import; billed as a balanced double-entry, never asserted
 * @see ../entropy -- ../tamper/import -- ../entry -- ../karma -- ./SKILL.md
 */
import type { Entry } from '@/entry'
import { toDoubleEntry, net } from '@/entry'
import { entropy } from '@/entropy'
import { importPurity } from '@/tamper/import'

/** The corpus's measurable entropy (disorder units): reciprocity slack + the non-index-import gap. */
export function measuredEntropy(): { reciprocitySlack: number; importGap: number; total: number } {
  const reciprocitySlack = entropy() // 1 − reciprocity (the borrowed disorder)
  const importGap = 1 - importPurity() // the fraction of imports reaching past an index seal
  return { reciprocitySlack, importGap, total: reciprocitySlack + importGap }
}

/**
 * Bill entropy as an EXPENSE — a balanced double-entry: the agent who created the disorder pays the
 * entropy fund. `rate` converts disorder units to the billed amount; net is 0 (the books balance).
 */
export function billEntropy(agent: string, amount = measuredEntropy().total, rate = 1): Entry {
  return toDoubleEntry({ payer: agent, payee: 'entropy-fund', amount: amount * rate })
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const m = measuredEntropy()
  const bill = billEntropy('agent:demo')
  console.log('expense — entropy is measurable and billable:')
  console.log('  entropy = reciprocity-slack ' + m.reciprocitySlack.toFixed(4) + ' + import-gap ' + m.importGap.toFixed(4) + ' = ' + m.total.toFixed(4) + ' units')
  console.log('  billed to agent:demo as a double-entry expense — balances (net=' + net(bill) + ')')
}
