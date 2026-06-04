/**
 * Runtime guards for the ISO 20022 code lists this module exposes.
 * Pair with the static `type` exports in `./types.ts`.
 *
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @see ./types.ts
 */

import type {
  BookingStatus,
  CreditDebitIndicator,
  ChargeBearerCode,
} from '@/iso/20022/types'

const BOOKING_STATUSES = new Set<BookingStatus>(['BOOK', 'PDNG', 'INFO', 'FUTR'])
const CR_DR = new Set<CreditDebitIndicator>(['CRDT', 'DBIT'])
const CHARGE_BEARERS = new Set<ChargeBearerCode>(['DEBT', 'CRED', 'SHAR', 'SLEV'])

/** Type-narrowing guard for {@link BookingStatus}. */
export const isBookingStatus = (s: unknown): s is BookingStatus =>
  typeof s === 'string' && BOOKING_STATUSES.has(s as BookingStatus)

/** Type-narrowing guard for {@link CreditDebitIndicator}. */
export const isCreditDebitIndicator = (s: unknown): s is CreditDebitIndicator =>
  typeof s === 'string' && CR_DR.has(s as CreditDebitIndicator)

/** Type-narrowing guard for {@link ChargeBearerCode}. */
export const isChargeBearerCode = (s: unknown): s is ChargeBearerCode =>
  typeof s === 'string' && CHARGE_BEARERS.has(s as ChargeBearerCode)

/**
 * Loose validator for the bank-transaction-code triplet — every component
 * must be a non-empty uppercase 4-letter string per the ISO 20022 lists.
 * Doesn't assert the values are in the published lists (which evolve);
 * downstream consumers can extend with their own catalogue.
 */
export const isBankTransactionCodeShape = (
  v: unknown,
): v is { domain: string; family: string; subFamily: string } => {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return (
    typeof o.domain === 'string' &&
    typeof o.family === 'string' &&
    typeof o.subFamily === 'string' &&
    /^[A-Z]{4}$/.test(o.domain) &&
    /^[A-Z]{4}$/.test(o.family) &&
    /^[A-Z]{4}$/.test(o.subFamily)
  )
}
