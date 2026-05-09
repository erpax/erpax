/**
 * Currency-agnostic product price accessor.
 *
 * The ecommerce plugin generates a `priceIn<CCY>` column per supported
 * currency (e.g. `priceInEUR`, `priceInUSD`). Application code MUST NOT
 * reference these columns by hardcoded suffix — instead route through
 * {@link getProductPrice}, which:
 *
 *   1. Picks the requested display currency (or the tenant default).
 *   2. Reads `product[`priceIn${currency}`]` if present.
 *   3. Falls back to the canonical `DEFAULT_CURRENCY` column.
 *   4. Returns `{ amount, currency }` — never a bare number, so the
 *      caller cannot accidentally render a value without its currency
 *      label.
 *
 * Slice WW: this accessor decouples the storage convention (currency-
 * suffixed columns from the ecommerce plugin) from the application
 * logic, which stays currency-/payment-vehicle-agnostic.
 *
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting US-GAAP ASC-830 foreign-currency-matters
 * @see src/config/regional-defaults.ts
 */

import {
  type Currency,
  DEFAULT_CURRENCY,
  isSupportedCurrency,
  SUPPORTED_CURRENCIES,
} from '@/config/regional-defaults'

/**
 * Bare-minimum shape required for price extraction. Compatible with
 * the generated `Product` type from `payload-types.ts` (which carries
 * `priceIn<CCY>` columns) and with any other doc that follows the same
 * convention.
 */
export type PriceableDoc = Record<string, unknown>

export interface ResolvedPrice {
  /** Amount in the document's storage unit (cents, per the project's IEEE-754 avoidance policy). */
  amount: number
  /** Currency code that `amount` is denominated in. */
  currency: Currency
  /** True when the requested currency was unavailable and the result is the fallback. */
  isFallback: boolean
}

/**
 * Resolve a product's price in the requested currency.
 *
 * @param doc Any doc with `priceIn<CCY>` columns (e.g. `Product`).
 * @param requested Desired display currency. Defaults to `DEFAULT_CURRENCY`.
 * @returns `{amount, currency, isFallback}`, or `null` if no price column has a value.
 */
export function getProductPrice(
  doc: PriceableDoc | null | undefined,
  requested: Currency | string = DEFAULT_CURRENCY,
): ResolvedPrice | null {
  if (!doc) return null
  const desired: Currency = isSupportedCurrency(requested) ? requested : DEFAULT_CURRENCY
  const desiredKey = `priceIn${desired}`
  const desiredValue = doc[desiredKey]
  if (typeof desiredValue === 'number') {
    return { amount: desiredValue, currency: desired, isFallback: false }
  }
  // Try the house default next.
  if (desired !== DEFAULT_CURRENCY) {
    const fallbackKey = `priceIn${DEFAULT_CURRENCY}`
    const fallbackValue = doc[fallbackKey]
    if (typeof fallbackValue === 'number') {
      return { amount: fallbackValue, currency: DEFAULT_CURRENCY, isFallback: true }
    }
  }
  // Last resort: scan the whole supported list in canonical order.
  for (const c of SUPPORTED_CURRENCIES) {
    const k = `priceIn${c}`
    const v = doc[k]
    if (typeof v === 'number') {
      return { amount: v, currency: c, isFallback: c !== desired }
    }
  }
  return null
}

/**
 * Format a {@link ResolvedPrice} for display. Uses Intl.NumberFormat with
 * the tenant locale (defaults to the canonical `DEFAULT_LOCALE`).
 */
export function formatProductPrice(
  price: ResolvedPrice | null,
  locale: string = 'bg-BG',
): string {
  if (!price) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount)
}
