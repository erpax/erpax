/**
 * Наредба Н-18 чл. 3, ал. 1 — СУПТО fiscalization *scope* by payment method.
 *
 * A sale requires a касов бон (УНП + fiscal device, i.e. СУПТО) when it is paid
 * in cash or by a cash-equivalent (bank/credit card, voucher). Sales settled by
 * any of the enumerated NON-cash channels are **lawfully outside СУПТО** — no
 * fiscal receipt is required (an invoice/document is issued instead):
 *   - deposit into a bank account / credit transfer (банков превод)
 *   - direct debit (директен дебит)
 *   - cash transfer via a payment-service provider (ЗПУПС)
 *   - postal money transfer / наложен платеж via a licensed postal operator
 *     (the courier issues the receipt that stands in for the касов бон)
 *
 * This is the *legal* way to not use СУПТО — by being out of scope, never by
 * circumventing it. The classifier is conservative: an unknown / blank payment
 * type is treated as IN scope (must fiscalize), so a sale can never silently
 * fall out of СУПТО by omission — only the explicit exemptions opt out.
 *
 * @standard BG Наредба-Н-18 §чл.3-ал.1 fiscalization-scope-by-payment
 * @standard BG ЗДДС §118 fiscal-receipt-obligation
 * @standard BG ЗПУПС payment-services (PSP transfers)
 * @see src/services/sales/unp-sequence.ts · src/services/sales/order-fiscalization.ts
 */

/** Payment methods that REQUIRE a касов бон (СУПТО-scope). */
export const SUPTO_SCOPE_PAYMENT_TYPES = ['cash', 'card', 'voucher'] as const

/** Payment methods LAWFULLY OUTSIDE СУПТО (Наредба Н-18 чл. 3, ал. 1). */
export const SUPTO_EXEMPT_PAYMENT_TYPES = [
  'bank_transfer',
  'direct_debit',
  'psp_transfer',
  'postal_money_transfer',
] as const

const EXEMPT = new Set<string>(SUPTO_EXEMPT_PAYMENT_TYPES)

/**
 * Does a sale paid by `paymentType` require fiscalization (касов бон + УНП)?
 * Conservative: only the explicit чл. 3 ал. 1 exemptions opt out; everything
 * else — including a blank/unknown type — is IN scope (never a silent bypass).
 */
export function requiresFiscalization(paymentType?: string): boolean {
  return !EXEMPT.has((paymentType ?? '').toLowerCase())
}
