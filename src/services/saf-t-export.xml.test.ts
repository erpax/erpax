/**
 * SAF-T XML serializer tests.
 *
 * Asserts the OECD baseline namespace + per-section rendering against
 * a complete SafTAuditFile fixture.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/saf-t-export.service.ts
 */

import { describe, it, expect } from 'vitest'
import { renderSafTXml } from '@/services/saf-t-export.service'
import { escapeXml } from '@/utilities/xml-escape'
import type { SafTAuditFile } from '@/standards/saf-t'

describe('SAF-T XML — escapeXml', () => {
  it('escapes the five XML predefined entities', () => {
    expect(escapeXml('A & B')).toBe('A &amp; B')
    expect(escapeXml('<x>')).toBe('&lt;x&gt;')
    expect(escapeXml('"q"')).toBe('&quot;q&quot;')
    expect(escapeXml("It's")).toBe('It&apos;s')
  })
})

const fixture: SafTAuditFile = {
  header: {
    auditFileVersion: '2.00',
    companyID: 'BG123',
    taxRegistrationNumber: 'BG123456789',
    taxAccountingBasis: 'F',
    companyName: 'Acme & Sons',
    companyAddress: {
      streetName: 'Vitosha Bvd.',
      buildingNumber: '1',
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
    generalLedgerAccounts: [
      {
        accountID: '11',
        accountDescription: 'Cash & Equivalents',
        accountType: 'S',
        openingDebitBalance: 100_000_00,
        closingDebitBalance: 150_000_00,
      },
      {
        accountID: '11.01',
        accountDescription: 'Cash on hand',
        accountType: 'M',
        openingDebitBalance: 5_000_00,
        closingDebitBalance: 7_500_00,
      },
    ],
    customers: [
      {
        customerID: 'CUST-1',
        accountID: '21.1',
        selfBillingIndicator: 0,
        party: {
          companyName: 'Buyer Ltd',
          taxRegistrationNumber: '987654321',
          taxRegistrationCountry: 'BG',
          billingAddress: {
            city: 'Plovdiv',
            postalCode: '4000',
            country: 'BG',
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
        taxCountryRegion: 'BG',
        taxCode: 'STD',
        description: 'Standard 20%',
        taxPercentage: 20,
      },
    ],
  },
  generalLedgerEntries: {
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
            sourceID: 'INV-001',
            description: 'Sale of goods',
            documentType: 'S',
            documentNumber: 'INV-001',
            systemEntryDate: '2026-04-30T15:00:00Z',
            customerID: 'CUST-1',
            lines: [
              {
                recordID: '1',
                accountID: '21.1',
                systemEntryDate: '2026-04-30T15:00:00Z',
                debitCreditIndicator: 'D',
                amount: { amount: 1_000_00 },
                description: 'AR — Buyer Ltd',
                customerID: 'CUST-1',
              },
              {
                recordID: '2',
                accountID: '71',
                systemEntryDate: '2026-04-30T15:00:00Z',
                debitCreditIndicator: 'C',
                amount: { amount: 1_000_00 },
                description: 'Revenue',
              },
            ],
          },
        ],
      },
    ],
  },
}

describe('SAF-T XML — renderSafTXml', () => {
  const xml = renderSafTXml(fixture)

  it('starts with XML prolog + AuditFile root in OECD namespace', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true)
    expect(xml).toContain(
      '<AuditFile xmlns="urn:OECD:StandardAuditFile-Tax:1.0">',
    )
    expect(xml.endsWith('</AuditFile>')).toBe(true)
  })

  it('emits Header with all required fields', () => {
    expect(xml).toContain('<AuditFileVersion>2.00</AuditFileVersion>')
    expect(xml).toContain('<CompanyID>BG123</CompanyID>')
    expect(xml).toContain('<TaxRegistrationNumber>BG123456789</TaxRegistrationNumber>')
    expect(xml).toContain('<TaxAccountingBasis>F</TaxAccountingBasis>')
    expect(xml).toContain('<FiscalYear>2026</FiscalYear>')
    expect(xml).toContain('<CurrencyCode>EUR</CurrencyCode>')
    expect(xml).toContain('<DateCreated>2026-05-09</DateCreated>')
    expect(xml).toContain('<ProductID>erpax</ProductID>')
  })

  it('escapes XML special chars in CompanyName', () => {
    expect(xml).toContain('<CompanyName>Acme &amp; Sons</CompanyName>')
  })

  it('emits CompanyAddress with country', () => {
    expect(xml).toContain('<StreetName>Vitosha Bvd.</StreetName>')
    expect(xml).toContain('<City>Sofia</City>')
    expect(xml).toContain('<Country>BG</Country>')
  })

  it('emits MasterFiles → GeneralLedgerAccounts with M/S classification', () => {
    expect(xml).toContain('<AccountID>11</AccountID>')
    expect(xml).toContain('<AccountType>S</AccountType>')
    expect(xml).toContain('<AccountID>11.01</AccountID>')
    expect(xml).toContain('<AccountType>M</AccountType>')
    // Money formatted as decimal.
    expect(xml).toContain('<OpeningDebitBalance>100000.00</OpeningDebitBalance>')
    expect(xml).toContain('<ClosingDebitBalance>150000.00</ClosingDebitBalance>')
  })

  it('emits Customer with PartyId + BillingAddress', () => {
    expect(xml).toContain('<CustomerID>CUST-1</CustomerID>')
    expect(xml).toContain('<AccountID>21.1</AccountID>')
    expect(xml).toContain('<Number>987654321</Number>')
    expect(xml).toContain('<CompanyName>Buyer Ltd</CompanyName>')
    expect(xml).toContain('<City>Plovdiv</City>')
  })

  it('emits Product with type discriminator', () => {
    expect(xml).toContain('<ProductCode>WIDGET-1</ProductCode>')
    expect(xml).toContain('<ProductType>P</ProductType>')
    expect(xml).toContain('<UnitOfMeasure>UN</UnitOfMeasure>')
  })

  it('emits TaxTable with percentage formatted to 2 decimals', () => {
    expect(xml).toContain('<TaxType>IVA</TaxType>')
    expect(xml).toContain('<TaxCode>STD</TaxCode>')
    expect(xml).toContain('<TaxPercentage>20.00</TaxPercentage>')
  })

  it('emits GeneralLedgerEntries with totals + Journal + Transaction + Lines', () => {
    expect(xml).toContain('<NumberOfEntries>1</NumberOfEntries>')
    expect(xml).toContain('<TotalDebit>1000.00</TotalDebit>')
    expect(xml).toContain('<TotalCredit>1000.00</TotalCredit>')
    expect(xml).toContain('<JournalID>SALES</JournalID>')
    expect(xml).toContain('<TransactionID>TX-001</TransactionID>')
    expect(xml).toContain('<Period>2026-04</Period>')
  })

  it('emits DebitLine + CreditLine per indicator', () => {
    expect(xml).toContain('<DebitLine>')
    expect(xml).toContain('<CreditLine>')
    expect(xml).toContain('<RecordID>1</RecordID>')
    expect(xml).toContain('<AccountID>21.1</AccountID>')
  })

  it('omits SourceDocuments section (left for follow-up slice)', () => {
    expect(xml).not.toContain('<SourceDocuments>')
  })

  it('skips MasterFiles sub-sections that are empty arrays', () => {
    // Suppliers array is empty in the fixture; the renderer joins
    // empty strings, so no <Supplier> element appears.
    expect(xml).not.toContain('<Supplier>')
  })
})
