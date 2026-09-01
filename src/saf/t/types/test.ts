/**
 * OECD SAF-T 2.0 — canonical audit-file types tests.
 *
 * Exercises the runtime guards + asserts the four top-level sections
 * (Header / MasterFiles / GeneralLedgerEntries / SourceDocuments)
 * compose into a complete audit file.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isSafTSourceDocumentType,
  isSafTPaymentMechanism,
  isBalancedGeneralLedger,
  type SafTAuditFile,
  type SafTHeader,
  type SafTMasterFiles,
  type SafTGeneralLedgerEntries,
  type SafTSourceDocumentType,
  type SafTPaymentMechanism,
} from '@/saf/t'

describe('SAF-T — runtime guards', () => {
  it('isSafTSourceDocumentType accepts the canonical four', () => {
    const valid: SafTSourceDocumentType[] = [
      'sales_invoice',
      'purchase_invoice',
      'payment',
      'movement_of_goods',
    ]
    for (const v of valid) expect(isSafTSourceDocumentType(v)).toBe(true)
    expect(isSafTSourceDocumentType('credit_note')).toBe(false)
    expect(isSafTSourceDocumentType(undefined)).toBe(false)
  })

  it('isSafTPaymentMechanism accepts the OECD code list', () => {
    const valid: SafTPaymentMechanism[] = [
      'CC',
      'CD',
      'CH',
      'CO',
      'CS',
      'DE',
      'LC',
      'MB',
      'NU',
      'OU',
      'PR',
      'TB',
      'TR',
    ]
    for (const v of valid) expect(isSafTPaymentMechanism(v)).toBe(true)
    expect(isSafTPaymentMechanism('PP')).toBe(false) // PayPal isn't in OECD list
  })

  it('isBalancedGeneralLedger checks the Σ debits = Σ credits invariant', () => {
    expect(
      isBalancedGeneralLedger({ totalDebit: 100_000_00, totalCredit: 100_000_00 }),
    ).toBe(true)
    expect(
      isBalancedGeneralLedger({ totalDebit: 100_000_00, totalCredit: 99_999_99 }),
    ).toBe(false)
  })
})

describe('SAF-T — Header', () => {
  it('builds a valid PT-style header', () => {
    const header: SafTHeader = {
      auditFileVersion: '1.04',
      companyID: '123456789',
      taxRegistrationNumber: '123456789',
      taxAccountingBasis: 'F',
      companyName: 'Acme Lda',
      companyAddress: {
        streetName: 'Av. da Liberdade',
        buildingNumber: '100',
        city: 'Lisboa',
        postalCode: '1250-145',
        country: 'PT',
      },
      fiscalYear: 2026,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      currencyCode: 'EUR',
      dateCreated: '2026-05-09',
      productID: 'erpax/1.0',
      productVersion: '1.0',
    }
    expect(header.auditFileVersion).toBe('1.04')
    expect(header.companyAddress.country).toBe('PT')
  })
})

describe('SAF-T — MasterFiles', () => {
  it('GL accounts carry the OECD account-type discriminator', () => {
    const masterFiles: SafTMasterFiles = {
      generalLedgerAccounts: [
        {
          accountID: '11',
          accountDescription: 'Caixa e Equivalentes',
          accountType: 'S', // synthesis
          openingDebitBalance: 100_000_00,
          openingCreditBalance: 0,
          closingDebitBalance: 150_000_00,
          closingCreditBalance: 0,
        },
        {
          accountID: '11.01',
          accountDescription: 'Caixa',
          accountType: 'M', // movement
          openingDebitBalance: 5_000_00,
          openingCreditBalance: 0,
          closingDebitBalance: 7_500_00,
          closingCreditBalance: 0,
        },
      ],
      customers: [
        {
          customerID: 'CUST-1',
          accountID: '21.1',
          selfBillingIndicator: 0,
          party: {
            companyName: 'Customer S.A.',
            taxRegistrationNumber: '987654321',
            taxRegistrationCountry: 'PT',
            billingAddress: {
              city: 'Porto',
              postalCode: '4000-100',
              country: 'PT',
            },
          },
        },
      ],
      suppliers: [],
      products: [
        {
          productCode: 'WIDGET-1',
          productDescription: 'Widget Pro 2026',
          productType: 'P',
          unitOfMeasure: 'UN',
        },
      ],
      taxTable: [
        {
          taxType: 'IVA',
          taxCountryRegion: 'PT',
          taxCode: 'NOR',
          description: 'Taxa Normal',
          taxPercentage: 23,
        },
        {
          taxType: 'IVA',
          taxCountryRegion: 'PT',
          taxCode: 'INT',
          description: 'Taxa Intermédia',
          taxPercentage: 13,
        },
      ],
    }
    expect(masterFiles.generalLedgerAccounts).toHaveLength(2)
    expect(masterFiles.generalLedgerAccounts[0].accountType).toBe('S')
    expect(masterFiles.generalLedgerAccounts[1].accountType).toBe('M')
    expect(masterFiles.taxTable[0].taxPercentage).toBe(23)
  })
})

describe('SAF-T — GeneralLedgerEntries', () => {
  it('balanced entries pass the §404 invariant', () => {
    const entries: SafTGeneralLedgerEntries = {
      numberOfEntries: 1,
      totalDebit: 1_000_00,
      totalCredit: 1_000_00,
      journals: [
        {
          journalID: 'SALES',
          description: 'Sales journal',
          transactions: [
            {
              transactionID: 'TX-001',
              period: '2026-04',
              transactionDate: '2026-04-30',
              sourceID: 'INV-2026-001',
              description: 'Sale of goods',
              documentType: 'S',
              documentNumber: 'INV-2026-001',
              systemEntryDate: '2026-04-30T15:00:00',
              customerID: 'CUST-1',
              lines: [
                {
                  recordID: '1',
                  accountID: '21.1',
                  systemEntryDate: '2026-04-30T15:00:00',
                  debitCreditIndicator: 'D',
                  amount: { amount: 1_000_00 },
                  description: 'AR — Customer S.A.',
                  customerID: 'CUST-1',
                },
                {
                  recordID: '2',
                  accountID: '71',
                  systemEntryDate: '2026-04-30T15:00:00',
                  debitCreditIndicator: 'C',
                  amount: { amount: 1_000_00 },
                  description: 'Revenue',
                },
              ],
            },
          ],
        },
      ],
    }
    expect(isBalancedGeneralLedger(entries)).toBe(true)
    const lines = entries.journals[0].transactions[0].lines
    expect(lines).toHaveLength(2)
    expect(lines[0].debitCreditIndicator).toBe('D')
    expect(lines[1].debitCreditIndicator).toBe('C')
  })
})

describe('SAF-T — composes a complete AuditFile', () => {
  it('top-level AuditFile carries Header + MasterFiles + optional sections', () => {
    const file: SafTAuditFile = {
      header: {
        auditFileVersion: '2.00',
        companyID: 'EU123',
        taxRegistrationNumber: 'EU123',
        taxAccountingBasis: 'F',
        companyName: 'Acme Holdings',
        companyAddress: {
          city: 'Sofia',
          postalCode: '1000',
          country: 'BG',
        },
        fiscalYear: 2026,
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        currencyCode: 'EUR',
        dateCreated: '2026-05-09',
        productID: 'erpax',
        productVersion: '1.0',
      },
      masterFiles: {
        generalLedgerAccounts: [],
        customers: [],
        suppliers: [],
        products: [],
        taxTable: [],
      },
    }
    expect(file.header.fiscalYear).toBe(2026)
    expect(file.masterFiles.generalLedgerAccounts).toHaveLength(0)
    expect(file.generalLedgerEntries).toBeUndefined()
    expect(file.sourceDocuments).toBeUndefined()
  })
})
