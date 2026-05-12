/**
 * Items `afterChange` chain — auto-emits inventory GL postings.
 *
 * Currently delegates to the canonical `itemAccountingHook`
 * (`@/services/accounting/hooks/item.hook.ts`), which routes through
 * `journalEntryService.createEntry` → `validateDoubleEntry` →
 * `DebitCreditLogic.validateEntry`. New per-item afterChange behaviour
 * (e.g. cache busts, search re-index) gets composed here.
 *
 * @accounting IFRS IAS-2 inventories
 * @accounting US-GAAP ASC-330 inventory cost-of-goods-sold
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see src/plugins/accounting/hooks/item.hook.ts
 */

import { itemAccountingHook } from '@/services/accounting/hooks'

export const itemsAfterChange = [itemAccountingHook]
