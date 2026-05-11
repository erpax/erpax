/**
 * ISO 20022 — canonical bank-payment message types tests.
 *
 * Exercises the runtime guards and asserts the message envelope shapes
 * cover what consumers (bank-rec, payment hook, BankTransactions) need.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isBookingStatus,
  isCreditDebitIndicator,
  isChargeBearerCode,
  isBankTransactionCodeShape,
  type Camt053Statement,
  type Camt053Transaction,
  type Pain001Initiation,
  type Pain008Initiation,
  type Pacs004Return,
  type BankTransactionCode,
} from '@/standards/iso-20022'

describe('ISO 20022 — code-list guards', () => {
  it('isBookingStatus accepts BOOK / PDNG / INFO / FUTR', () => {
    expect(isBookingStatus('BOOK')).toBe(true)
    expect(isBookingStatus('PDNG')).toBe(true)
    expect(isBookingStatus('INFO')).toBe(true)
    expect(isBookingStatus('FUTR')).toBe(true)
    expect(isBookingStatus('book')).toBe(false) // case-sensitive
    expect(isBookingStatus('CLOSED')).toBe(false)
  })

  it('isCreditDebitIndicator accepts CRDT / DBIT', () => {
    expect(isCreditDebitIndicator('CRDT')).toBe(true)
    expect(isCreditDebitIndicator('DBIT')).toBe(true)
    expect(isCreditDebitIndicator('DEBIT')).toBe(false)
  })

  it('isChargeBearerCode accepts DEBT / CRED / SHAR / SLEV', () => {
    expect(isChargeBearerCode('DEBT')).toBe(true)
    expect(isChargeBearerCode('CRED')).toBe(true)
    expect(isChargeBearerCode('SHAR')).toBe(true)
    expect(isChargeBearerCode('SLEV')).toBe(true)
    expect(isChargeBearerCode('OUR')).toBe(false)
  })

  it('isBankTransactionCodeShape requires 4-letter uppercase domain/family/subFamily', () => {
    const valid: BankTransactionCode = {
      domain: 'PMNT',
      family: 'RCDT',
      subFamily: 'BOOK',
    }
    expect(isBankTransactionCodeShape(valid)).toBe(true)
    expect(
      isBankTransactionCodeShape({
        domain: 'pmnt',
        family: 'RCDT',
        subFamily: 'BOOK',
      }),
    ).toBe(false) // case-sensitive
    expect(
      isBankTransactionCodeShape({
        domain: 'PMNT',
        family: 'RCDT',
      }),
    ).toBe(false) // missing subFamily
    expect(isBankTransactionCodeShape(null)).toBe(false)
    expect(isBankTransactionCodeShape('PMNT.RCDT.BOOK')).toBe(false)
  })
})

describe('ISO 20022 — camt.053 statement', () => {
  it('builds a minimal valid statement', () => {
    const stmt: Camt053Statement = {
      id: 'STMT-2026-04',
      createdAt: new Date('2026-05-01T00:00:00Z'),
      account: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
      fromDateTime: new Date('2026-04-01'),
      toDateTime: new Date('2026-04-30'),
      openingBalance: 100_000_00,
      closingBalance: 110_000_00,
      currency: 'EUR',
      transactions: [],
    }
    expect(stmt.transactions).toHaveLength(0)
    expect(stmt.account.iban).toMatch(/^BG/)
  })

  it('carries booked + value dates separately for a credit transaction', () => {
    const tx: Camt053Transaction = {
      accountServicerReference: 'ACME-2026-001',
      endToEndId: 'E2E-001',
      bookingDate: new Date('2026-04-15'),
      valueDate: new Date('2026-04-16'),
      amount: 5_000_00,
      currency: 'EUR',
      creditDebitIndicator: 'CRDT',
      status: 'BOOK',
      bankTransactionCode: {
        domain: 'PMNT',
        family: 'RCDT',
        subFamily: 'BOOK',
      },
      counterparty: { name: 'Customer LLC' },
      remittanceInformation: {
        structured: {
          creditorReference: { reference: 'RF18539007547034' },
          referredDocumentNumbers: ['INV-2026-042'],
        },
      },
    }
    expect(tx.creditDebitIndicator).toBe('CRDT')
    expect(tx.remittanceInformation?.structured?.creditorReference?.reference).toBe(
      'RF18539007547034',
    )
  })
})

describe('ISO 20022 — pain.001 credit transfer initiation', () => {
  it('control sum equals total of payments', () => {
    const init: Pain001Initiation = {
      messageId: 'MSG-001',
      creationDateTime: new Date('2026-05-09T08:00:00Z'),
      numberOfTransactions: 2,
      controlSum: 1_500_00,
      initiatingParty: { name: 'Erpax Tenant' },
      payments: [
        {
          paymentInformationId: 'PMT-001',
          paymentMethod: 'TRF',
          requestedExecutionDate: new Date('2026-05-10'),
          debtor: { name: 'Erpax Tenant' },
          debtorAccount: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
          creditTransfers: [
            {
              endToEndId: 'E2E-A',
              amount: 1_000_00,
              currency: 'EUR',
              creditor: { name: 'Vendor A' },
              creditorAccount: { iban: 'DE89370400440532013000', currency: 'EUR' },
            },
            {
              endToEndId: 'E2E-B',
              amount: 500_00,
              currency: 'EUR',
              creditor: { name: 'Vendor B' },
              creditorAccount: { iban: 'FR1420041010050500013M02606', currency: 'EUR' },
            },
          ],
        },
      ],
    }
    const total = init.payments.flatMap((p) => p.creditTransfers).reduce((s, t) => s + t.amount, 0)
    expect(total).toBe(init.controlSum)
    expect(init.payments[0].creditTransfers).toHaveLength(2)
  })
})

describe('ISO 20022 — pain.008 direct debit', () => {
  it('carries SEPA SDD mandate id + signature date + sequence type', () => {
    const init: Pain008Initiation = {
      messageId: 'MSG-DD-001',
      creationDateTime: new Date('2026-05-09T08:00:00Z'),
      numberOfTransactions: 1,
      controlSum: 99_99,
      initiatingParty: { name: 'Erpax Tenant' },
      payments: [
        {
          paymentInformationId: 'PMT-DD-001',
          paymentMethod: 'DD',
          requestedCollectionDate: new Date('2026-05-15'),
          localInstrument: 'CORE',
          sequenceType: 'RCUR',
          creditor: { name: 'Erpax Tenant' },
          creditorAccount: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
          directDebits: [
            {
              endToEndId: 'E2E-DD-A',
              amount: 99_99,
              currency: 'EUR',
              mandateId: 'MDT-2026-A',
              dateOfSignature: new Date('2026-01-15'),
              debtor: { name: 'Customer A' },
              debtorAccount: { iban: 'DE89370400440532013000', currency: 'EUR' },
            },
          ],
        },
      ],
    }
    expect(init.payments[0].sequenceType).toBe('RCUR')
    expect(init.payments[0].directDebits[0].mandateId).toBe('MDT-2026-A')
  })
})

describe('ISO 20022 — pacs.004 payment return', () => {
  it('carries return reason code + reference to original transaction', () => {
    const ret: Pacs004Return = {
      messageId: 'RTN-001',
      creationDateTime: new Date('2026-05-09T10:00:00Z'),
      numberOfTransactions: 1,
      controlSum: 99_99,
      returns: [
        {
          endToEndId: 'RTN-E2E-1',
          originalEndToEndId: 'E2E-DD-A',
          amount: 99_99,
          currency: 'EUR',
          reasonCode: 'AM04',
          reasonAdditionalInformation: 'Insufficient funds',
        },
      ],
    }
    expect(ret.returns[0].originalEndToEndId).toBe('E2E-DD-A')
    expect(ret.returns[0].reasonCode).toBe('AM04')
  })
})
