/**
 * SAF-T export service — projects Payload data onto SafTAuditFile.
 *
 * Asserts the orchestrator + each builder produces the expected
 * canonical structure given a mock Payload instance. Mock returns
 * deterministic fixtures so the assertions are exact.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/saf-t-export.service.ts
 */

import { describe, it, expect } from 'vitest'
import {
  buildAuditFile,
  buildHeader,
  buildGeneralLedgerAccounts,
  buildCustomers,
  buildSuppliers,
  buildProducts,
  buildTaxTable,
  buildGeneralLedgerEntries,
} from '@/saf/t/export.service'
import { isBalancedGeneralLedger } from '@/saf/t'

const mockPayload = (
  fixtures: Record<string, Record<string, unknown>[]>,
): unknown =>
  ({
    find: async (args: { collection: string }) => ({
      docs: fixtures[args.collection] ?? [],
    }),
  })

describe('SAF-T export — buildHeader', () => {
  it('builds a valid OECD baseline header', () => {
    const header = buildHeader({
      tenantId: 'tenant-1',
      fiscalYear: 2026,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      companyID: 'EU123',
      taxRegistrationNumber: 'EU123',
      companyName: 'Acme Holdings',
      companyAddress: { city: 'Sofia', postalCode: '1000', country: 'BG' },
      currencyCode: 'EUR',
    })
    expect(header.auditFileVersion).toBe('2.00') // OECD baseline default
    expect(header.fiscalYear).toBe(2026)
    expect(header.taxAccountingBasis).toBe('F') // financial default
    expect(header.productID).toBe('erpax')
    expect(header.dateCreated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('honors PT-style auditFileVersion override', () => {
    const header = buildHeader({
      tenantId: 't',
      fiscalYear: 2026,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      companyID: 'PT123',
      taxRegistrationNumber: '500000000',
      companyName: 'Acme Lda',
      companyAddress: { city: 'Lisboa', postalCode: '1000-100', country: 'PT' },
      currencyCode: 'EUR',
      auditFileVersion: '1.04',
    })
    expect(header.auditFileVersion).toBe('1.04')
  })
})

describe('SAF-T export — buildGeneralLedgerAccounts', () => {
  it('maps GL accounts with movement / synthesis classification', async () => {
    // SAF-T derives opening/closing balances from journal-entries (the
    // service refactored away from storing balances on gl-accounts) so
    // both 'gl-accounts' and 'journal-entries' must be mocked. The
    // synthesis vs movement classification falls out of the parent set —
    // account '11' is the parent of '11.01', so '11' is S and '11.01' is M.
    const payload = mockPayload({
      'gl-accounts': [
        {
          id: 1,
          accountNumber: '11',
          accountName: 'Caixa e Equivalentes',
          accountType: 'asset',
          normalBalance: 'debit',
        },
        {
          id: 2,
          accountNumber: '11.01',
          accountName: 'Caixa',
          accountType: 'asset',
          normalBalance: 'debit',
          parentAccount: 1,
        },
      ],
      // No posted entries → opening + closing trial balances are empty;
      // the SAF-T balance fields collapse to undefined. The assertion
      // here is about CLASSIFICATION, not balances.
      'journal-entries': [],
    }) as never
    const accounts = await buildGeneralLedgerAccounts(payload, 'tenant-1', '2026-01-01', '2026-12-31', 'EUR')
    expect(accounts).toHaveLength(2)
    const byNumber = new Map(accounts.map((a) => [a.accountID, a]))
    expect(byNumber.get('11')?.accountType).toBe('S') // synthesis (parent)
    expect(byNumber.get('11.01')?.accountType).toBe('M') // movement (leaf)
    // Grouping code on the leaf points to the parent's accountNumber.
    expect(byNumber.get('11.01')?.groupingCode).toBe('11')
  })
})

describe('SAF-T export — buildCustomers / buildSuppliers', () => {
  it('builds a customer with party id + addresses', async () => {
    // buildCustomers reads `code` (the CodeConcern human key — was
    // `customerId` before the field-factory rollout) and resolves the
    // AR account through `ledger.defaultReceivableAccount` (populated
    // at depth 1, surfaced via accountNumber). Address structure lives
    // under `addresses.billingAddress / shippingAddress`.
    // The party schema flattened: tax-id moved from `identity.taxId` to
    // `tax.vatNumber`; tax country moved to top-level `country`; legal
    // name moved to `identity.legalName` (was `identity.companyName`).
    const payload = mockPayload({
      customers: [
        {
          id: 'c1',
          code: 'CUST-1',
          name: 'Customer S.A.',
          country: 'PT',
          tax: { vatNumber: '987654321' },
          identity: { legalName: 'Customer S.A.' },
          ledger: {
            defaultReceivableAccount: { accountNumber: '21.1' },
          },
          addresses: {
            billingAddress: {
              city: 'Porto',
              postalCode: '4000-100',
              country: 'PT',
            },
          },
        },
      ],
    }) as never
    const customers = await buildCustomers(payload, 'tenant-1')
    expect(customers).toHaveLength(1)
    expect(customers[0].customerID).toBe('CUST-1')
    expect(customers[0].accountID).toBe('21.1')
    expect(customers[0].party.taxRegistrationNumber).toBe('987654321')
    expect(customers[0].party.billingAddress.country).toBe('PT')
  })

  it('builds a supplier — missing AP account surfaces as empty accountID', async () => {
    // The service intentionally surfaces missing ledger configuration
    // as an empty `accountID` (rather than synthesising '22.1' as a
    // hard-coded default) so the auditor sees no default account
    // assigned — that's the correct SAF-T behavior. The `supplierID`
    // comes from the vendor's `code` field (CodeConcern).
    const payload = mockPayload({
      vendors: [
        {
          id: 'v1',
          code: 'v1',
          identity: { companyName: 'Vendor SARL', taxCountry: 'FR' },
          addresses: {
            remitToAddress: {
              city: 'Paris',
              postalCode: '75001',
              country: 'FR',
            },
          },
        },
      ],
    }) as never
    const suppliers = await buildSuppliers(payload, 'tenant-1')
    expect(suppliers).toHaveLength(1)
    expect(suppliers[0].supplierID).toBe('v1')
    expect(suppliers[0].accountID).toBe('')
  })
})

describe('SAF-T export — buildProducts', () => {
  it('maps items to SAF-T products with type discriminator', async () => {
    const payload = mockPayload({
      items: [
        {
          id: 'i1',
          itemNumber: 'WIDGET-1',
          itemName: 'Widget Pro 2026',
          productType: 'P',
          unitOfMeasure: 'UN',
        },
        {
          id: 'i2',
          itemNumber: 'CONSULT-HR',
          itemName: 'Consulting hour',
          productType: 'S',
          unitOfMeasure: 'HUR',
        },
      ],
    }) as never
    const products = await buildProducts(payload, 'tenant-1')
    expect(products).toHaveLength(2)
    expect(products[0].productType).toBe('P')
    expect(products[1].productType).toBe('S')
  })
})

describe('SAF-T export — buildTaxTable', () => {
  it('maps tax-codes to SAF-T tax-table entries', async () => {
    const payload = mockPayload({
      'tax-codes': [
        {
          id: 't1',
          taxType: 'IVA',
          taxCountryRegion: 'PT',
          taxCode: 'NOR',
          description: 'Taxa Normal',
          taxPercentage: 23,
        },
      ],
    }) as never
    const taxes = await buildTaxTable(payload, 'tenant-1')
    expect(taxes).toHaveLength(1)
    expect(taxes[0].taxCode).toBe('NOR')
    expect(taxes[0].taxPercentage).toBe(23)
  })
})

describe('SAF-T export — buildGeneralLedgerEntries', () => {
  it('groups balanced JEs by source type into canonical journals', async () => {
    const payload = mockPayload({
      'journal-entries': [
        {
          id: 'JE-1',
          entryNumber: 'JE-2026-001',
          entryDate: '2026-04-15',
          description: 'Sale to CUST-1',
          status: 'posted',
          sourceType: 'invoice',
          sourceId: 'INV-001',
          createdAt: '2026-04-15T10:00:00Z',
          lines: [
            { accountId: '21.1', debit: 1_000_00, customerId: 'CUST-1' },
            { accountId: '71', credit: 1_000_00 },
          ],
        },
        {
          id: 'JE-2',
          entryNumber: 'JE-2026-002',
          entryDate: '2026-04-20',
          description: 'Bill from VENDOR-1',
          status: 'posted',
          sourceType: 'bill',
          sourceId: 'BILL-001',
          createdAt: '2026-04-20T11:00:00Z',
          lines: [
            { accountId: '62', debit: 500_00 },
            { accountId: '22.1', credit: 500_00, supplierId: 'VENDOR-1' },
          ],
        },
      ],
    }) as never
    const gle = await buildGeneralLedgerEntries(
      payload,
      'tenant-1',
      '2026-04-01',
      '2026-04-30',
    )
    expect(gle.numberOfEntries).toBe(2)
    expect(gle.totalDebit).toBe(1_500_00)
    expect(gle.totalCredit).toBe(1_500_00)
    expect(isBalancedGeneralLedger(gle)).toBe(true)

    // Two journals — SALES and PURCHASES.
    const journalIds = gle.journals.map((j) => j.journalID).sort()
    expect(journalIds).toEqual(['PURCHASES', 'SALES'])

    const sales = gle.journals.find((j) => j.journalID === 'SALES')!
    expect(sales.transactions).toHaveLength(1)
    expect(sales.transactions[0].lines).toHaveLength(2)
    expect(sales.transactions[0].lines[0].debitCreditIndicator).toBe('D')
    expect(sales.transactions[0].lines[1].debitCreditIndicator).toBe('C')
    expect(sales.transactions[0].lines[0].customerID).toBe('CUST-1')
    expect(sales.transactions[0].period).toBe('2026-04')
  })
})

describe('SAF-T export — buildAuditFile orchestrator', () => {
  it('composes Header + MasterFiles + GeneralLedgerEntries', async () => {
    const payload = mockPayload({
      'gl-accounts': [],
      customers: [],
      vendors: [],
      items: [],
      'tax-codes': [],
      'journal-entries': [],
    }) as never
    const file = await buildAuditFile(payload, {
      tenantId: 'tenant-1',
      fiscalYear: 2026,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      companyID: 'EU123',
      taxRegistrationNumber: 'EU123',
      companyName: 'Acme',
      companyAddress: { city: 'Sofia', postalCode: '1000', country: 'BG' },
      currencyCode: 'EUR',
    })
    expect(file.header.fiscalYear).toBe(2026)
    expect(file.masterFiles.generalLedgerAccounts).toHaveLength(0)
    expect(file.generalLedgerEntries?.numberOfEntries).toBe(0)
    expect(file.sourceDocuments).toBeUndefined() // follow-up slice
  })
})
