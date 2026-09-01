/**
 * `Money` value type — integer-cents amount + ISO 4217 currency.
 *
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-21 foreign-currency-translation
 * @accounting US-GAAP ASC-830 foreign-currency-matters
 */

import { isIso4217 } from '@/iso/4217'

/**
 * Validate a `Money` representation: `{ amountCents: integer, currency: ISO4217 }`.
 * Use to defend hooks against floating-point amounts and bad currency codes.
 *
 * @standard ISO-4217:2015 §5 alphabetic-codes
 */
export function isMoney(o: unknown): o is { amountCents: number; currency: string } {
  if (!o || typeof o !== 'object') return false
  const r = o as Record<string, unknown>
  return Number.isInteger(r.amountCents) && isIso4217(r.currency)
}
