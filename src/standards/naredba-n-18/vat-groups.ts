/**
 * Наредба Н-18 (Приложение № 1) fiscal-device VAT tax groups (данъчни групи).
 *
 * A Bulgarian fiscal device classifies every sale line into a named tax group;
 * the касов бон prints turnover totals per group. The regulation defines:
 *   - "А" — 0%  — освободени доставки / нулева ставка (exempt / zero-rated / no VAT charged)
 *   - "Б" — 20% — стандартна ставка (standard rate)
 *   - "В" — течни горива през средства за измерване (liquid fuel via measuring devices; rate 20%)
 *   - "Г" — 9%  — намалена ставка (reduced rate — hospitality/tourism/books)
 * Groups Д–З are device-configurable and unused here.
 *
 * Group "В" is a *category* (measured-fuel sales), not a distinct rate, so it is
 * not derivable from the VAT rate alone — `bgTaxGroupForRate` maps the three
 * statutory rates (0/9/20) to А/Г/Б; fuel sales override to "В" at the call site.
 *
 * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups данъчни-групи
 * @standard EU 2006/112/EC vat-system-directive (rate bands)
 * @see src/services/country-clients/bg-vat.ts (the rate registry) · src/services/sales/fiscal-receipt.ts
 */

/** The Наредба Н-18 fiscal tax-group letters used by erpax. */
export type BgTaxGroup = 'А' | 'Б' | 'В' | 'Г'

/** Nominal VAT rate (%) per fiscal tax group. */
export const BG_TAX_GROUP_RATE: Readonly<Record<BgTaxGroup, number>> = {
  А: 0,
  Б: 20,
  В: 20, // liquid fuel — standard 20% rate, separate group
  Г: 9,
} as const

/**
 * Map a VAT rate (%) to its statutory fiscal tax-group letter.
 * 20% → "Б" (the general standard-rate group; "В" is the fuel-specific override).
 * Unknown rates route to the standard group "Б" (the identity-element default).
 */
export function bgTaxGroupForRate(rate: number): BgTaxGroup {
  switch (rate) {
    case 0:
      return 'А'
    case 9:
      return 'Г'
    case 20:
      return 'Б'
    default:
      return 'Б'
  }
}
