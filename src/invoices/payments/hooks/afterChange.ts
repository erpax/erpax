/**
 * Payments `afterChange` chain — auto-emits cash-flow GL postings.
 *
 * Delegates to `paymentAccountingHook` (`@/accounting/hooks/payment.hook.ts`),
 * which routes through `journalEntryService.createEntry` →
 * `validateDoubleEntry` → `DebitCreditLogic.validateEntry`.
 *
 * Slice PPP note: arAgingHook + apAgingHook were removed because they
 * delegated to non-existent services (silent no-ops). Aging is now a
 * service-generated DTO via `financialReportingService` per the
 * `accounting/index.ts` design note.
 *
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see src/plugins/accounting/hooks/payment.hook.ts
 */

import { paymentAccountingHook } from '@/accounting/hooks'

export const paymentsAfterChange = [paymentAccountingHook]
