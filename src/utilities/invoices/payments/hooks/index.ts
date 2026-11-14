/**
 * Barrel export — Payments/hooks canonical entry point.
 *
 * Re-exports every `*.ts` sibling so collection-level imports stay
 * one path-segment shallow (e.g. `import { fooHook } from '../../../Payments/hooks/hooks'`
 * instead of `from '../../../Payments/hooks/hooks/fooHook'`).
 *
 * @audit ISO-19011:2018 audit-trail collection-module-boundary
 */

export * from '@/utilities/invoices/payments/hooks/recomputeInvoicePaid'
// GL posting hook (dissolved from the former accounting/hooks slice).
export * from '@/hooks/collections/invoices-payments/paymentAccountingHook'

/** @index-cross.foldback child=invoices/payments/hooks parent=invoices/payments — this cross folds back into its parent. */
