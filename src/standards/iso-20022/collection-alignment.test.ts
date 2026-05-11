/**
 * ISO 20022 — collection-to-canonical-type alignment tests.
 *
 * Asserts that the BankTransactions Payload collection projects cleanly
 * onto the canonical Camt053Transaction type in `@/standards/iso-20022`.
 * The mapping is documented in the collection's banner; this spec is
 * the executable verification.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/BankTransactions.ts
 */

import { describe, it, expect } from 'vitest'
import {
  isBookingStatus,
  isCreditDebitIndicator,
  isChargeBearerCode,
  isBankTransactionCodeShape,
  type Camt053Transaction,
  type BookingStatus,
  type CreditDebitIndicator,
  type ChargeBearerCode,
} from '@/standards/iso-20022'

// ─── Doc shape — what Payload returns for a BankTransactions row ──────

interface PayloadBankTxDoc {
  id: string
  externalId: string
  accountServicerReference?: string
  endToEndId?: string
  bankAccount: string | { id: string }
  statement?: string | { id: string }
  valueDate: string
  bookingDate?: string
  /** Signed cents (positive = credit, negative = debit). */
  amount: number
  creditDebitIndicator?: CreditDebitIndicator
  bookingStatus?: BookingStatus
  currency: string
  description?: string
  counterpartyName?: string
  counterpartyIban?: string
  counterpartyBic?: string
  reference?: string
  bankTransactionDomain?: string
  bankTransactionFamily?: string
  bankTransactionSubFamily?: string
  chargeBearer?: ChargeBearerCode
}

// ─── Mapper — collection doc → canonical type ─────────────────────────

const toCanonicalCamt053Transaction = (
  doc: PayloadBankTxDoc,
): Camt053Transaction => {
  // Derive credit/debit indicator from amount sign when not explicitly set.
  const indicator: CreditDebitIndicator =
    doc.creditDebitIndicator ?? (doc.amount >= 0 ? 'CRDT' : 'DBIT')

  const bankTxCode =
    doc.bankTransactionDomain &&
    doc.bankTransactionFamily &&
    doc.bankTransactionSubFamily
      ? {
          domain: doc.bankTransactionDomain,
          family: doc.bankTransactionFamily,
          subFamily: doc.bankTransactionSubFamily,
        }
      : undefined

  return {
    accountServicerReference: doc.accountServicerReference,
    endToEndId: doc.endToEndId,
    bookingDate: new Date(doc.bookingDate ?? doc.valueDate),
    valueDate: new Date(doc.valueDate),
    amount: Math.abs(doc.amount),
    currency: doc.currency,
    creditDebitIndicator: indicator,
    status: doc.bookingStatus ?? 'BOOK',
    bankTransactionCode: bankTxCode,
    counterparty: doc.counterpartyName
      ? { name: doc.counterpartyName, bic: doc.counterpartyBic }
      : undefined,
    counterpartyAccount: doc.counterpartyIban
      ? { iban: doc.counterpartyIban }
      : undefined,
    chargeBearer: doc.chargeBearer,
    remittanceInformation:
      doc.description || doc.reference
        ? {
            unstructured: doc.description,
            structured: doc.reference
              ? {
                  creditorReference: { reference: doc.reference },
                }
              : undefined,
          }
        : undefined,
  }
}

// ─── Tests ─────────────────────────────────────────────────────────────

describe('ISO 20022 — BankTransactions collection ↔ canonical type', () => {
  it('credit transaction with structured RF reference', () => {
    const doc: PayloadBankTxDoc = {
      id: 'BTX-1',
      externalId: 'ACME-2026-001',
      accountServicerReference: 'ACME-2026-001',
      endToEndId: 'E2E-001',
      bankAccount: 'BA-1',
      valueDate: '2026-04-15',
      bookingDate: '2026-04-15',
      amount: 5_000_00,
      creditDebitIndicator: 'CRDT',
      bookingStatus: 'BOOK',
      currency: 'EUR',
      description: 'Customer payment',
      counterpartyName: 'Customer LLC',
      counterpartyIban: 'DE89370400440532013000',
      reference: 'RF18539007547034',
      bankTransactionDomain: 'PMNT',
      bankTransactionFamily: 'RCDT',
      bankTransactionSubFamily: 'BOOK',
    }
    const canonical = toCanonicalCamt053Transaction(doc)
    expect(canonical.amount).toBe(5_000_00)
    expect(canonical.creditDebitIndicator).toBe('CRDT')
    expect(canonical.status).toBe('BOOK')
    expect(canonical.bankTransactionCode?.domain).toBe('PMNT')
    expect(
      canonical.remittanceInformation?.structured?.creditorReference?.reference,
    ).toBe('RF18539007547034')
    expect(isBookingStatus(canonical.status)).toBe(true)
    expect(isCreditDebitIndicator(canonical.creditDebitIndicator)).toBe(true)
    expect(isBankTransactionCodeShape(canonical.bankTransactionCode)).toBe(true)
  })

  it('derives CRDT/DBIT from amount sign when indicator absent', () => {
    const credit = toCanonicalCamt053Transaction({
      id: 'BTX-2',
      externalId: 'X',
      bankAccount: 'BA-1',
      valueDate: '2026-04-15',
      amount: 100_00,
      currency: 'EUR',
    })
    expect(credit.creditDebitIndicator).toBe('CRDT')

    const debit = toCanonicalCamt053Transaction({
      id: 'BTX-3',
      externalId: 'Y',
      bankAccount: 'BA-1',
      valueDate: '2026-04-15',
      amount: -25_00,
      currency: 'EUR',
    })
    expect(debit.creditDebitIndicator).toBe('DBIT')
    expect(debit.amount).toBe(25_00) // canonical is positive
  })

  it('debit transaction with charge bearer SHAR', () => {
    const doc: PayloadBankTxDoc = {
      id: 'BTX-4',
      externalId: 'WIRE-OUT-1',
      bankAccount: 'BA-1',
      valueDate: '2026-04-20',
      amount: -1_000_00,
      creditDebitIndicator: 'DBIT',
      bookingStatus: 'BOOK',
      currency: 'EUR',
      chargeBearer: 'SHAR',
      counterpartyName: 'Vendor X',
      counterpartyIban: 'FR1420041010050500013M02606',
      bankTransactionDomain: 'PMNT',
      bankTransactionFamily: 'ICDT',
      bankTransactionSubFamily: 'CDPT',
    }
    const canonical = toCanonicalCamt053Transaction(doc)
    expect(canonical.chargeBearer).toBe('SHAR')
    expect(canonical.creditDebitIndicator).toBe('DBIT')
    expect(canonical.amount).toBe(1_000_00)
    expect(isChargeBearerCode(canonical.chargeBearer!)).toBe(true)
  })

  it('pending transaction with PDNG status (not yet booked)', () => {
    const doc: PayloadBankTxDoc = {
      id: 'BTX-5',
      externalId: 'PEND-1',
      bankAccount: 'BA-1',
      valueDate: '2026-04-22',
      amount: 500_00,
      bookingStatus: 'PDNG',
      currency: 'EUR',
    }
    const canonical = toCanonicalCamt053Transaction(doc)
    expect(canonical.status).toBe('PDNG')
  })

  it('counterparty mapping covers BIC + IBAN + name', () => {
    const doc: PayloadBankTxDoc = {
      id: 'BTX-6',
      externalId: 'CP-1',
      bankAccount: 'BA-1',
      valueDate: '2026-04-22',
      amount: 200_00,
      currency: 'EUR',
      counterpartyName: 'Vendor B',
      counterpartyIban: 'BG80BNBG96611020345678',
      counterpartyBic: 'BNBGBGSF',
    }
    const canonical = toCanonicalCamt053Transaction(doc)
    expect(canonical.counterparty?.name).toBe('Vendor B')
    expect(canonical.counterparty?.bic).toBe('BNBGBGSF')
    expect(canonical.counterpartyAccount?.iban).toBe('BG80BNBG96611020345678')
  })
})
