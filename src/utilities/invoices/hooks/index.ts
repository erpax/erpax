/**
 * Barrel export — Invoices/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from './hooks'`
 * instead of `from './hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/utilities/invoices/hooks/deriveNumber'
// GL posting hooks (dissolved from the former accounting/hooks slice —
// invoices carry the `bill` kind, so bill.hook co-locates here too).
export * from '@/hooks/collections/invoices/invoiceAccountingHook'
export * from '@/hooks/collections/invoices/billAccountingHook'

/** @index-cross.foldback child=invoices/hooks parent=invoices — this cross folds back into its parent. */
export * from '@/utilities/invoices/hooks/transition'
