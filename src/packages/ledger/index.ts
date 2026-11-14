/**
 * Ledger — the books: accounts, journals, periods, banks, tax.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const ledger: App = {
  slug: 'ledger',
  title: 'Ledger',
  anchors: ['gl-accounts', 'journal-entries', 'gl-postings', 'fiscal-periods', 'bank-accounts', 'tax-codes', 'tax-returns', 'currency-rates', 'consolidations', 'financial-statements'],
}
