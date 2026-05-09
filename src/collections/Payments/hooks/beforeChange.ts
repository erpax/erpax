/**
 * Payments `beforeChange` chain — period-lock enforcement.
 *
 * Period-locked accounting periods reject back-dated payment edits per
 * IFRS IAS-8 / SOX §404. Hook lives in the accounting plugin's
 * utilities so it can be shared across GL collections.
 *
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @compliance SOX §404 period-close-integrity
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/utilities/period-lock.ts
 */

import { validateNotLocked } from '@/plugins/accounting/utilities/period-lock'

export const paymentsBeforeChange = [validateNotLocked]
