/**
 * Payments `afterChange` chain — auto-emits cash-flow GL postings.
 *
 * Delegates to `paymentAccountingHook` (`@/invoices/payments/hooks/payment.ts`),
 * which routes through `journalEntryService.createEntry` →
 * `validateDoubleEntry` → `DebitCreditLogic.validateEntry`.
 *
 * Slice PPP note: arAgingHook + apAgingHook were removed because they
 * delegated to non-existent services (silent no-ops). The note then reassigned
 * aging to `financialReportingService` — which held no aging code, was called by
 * nobody, and fabricated its statements; it is deleted. Aging is
 * generateARAgingReport / generateAPAgingReport in @/accounting/reports.
 *
 * The IAS-7 / ASC-230 cash-flow claims were dropped rather than restated: the
 * only cash-flow implementation erpax had was the fabricated one (investing and
 * financing hardcoded to -100000 / 50000), so this hook never fed a cash-flow
 * statement. The statement is a GAP, and a gap is not a claim.
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see src/invoices/payments/hooks/payment.ts
 */

import { paymentAccountingHook } from './payment'

export const paymentsAfterChange = [paymentAccountingHook]
