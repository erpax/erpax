

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

/** @index-cross.foldback child=naredba/n/18/scope parent=naredba/n/18 — this cross folds back into its parent. */
