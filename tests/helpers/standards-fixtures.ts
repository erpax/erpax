/**
 * Canonical standards fixtures — typed, minimal-but-valid samples for every
 * standards-defined wire format the project produces or consumes.
 *
 * Each export is **typed against the canonical type from `src/standards/`**, so
 * the standards layer's type definitions act as the schema check at build
 * time. If a standards type changes shape, every fixture below fails to
 * compile and the offending spec / e2e walk-through breaks loudly instead of
 * silently emitting a stale artifact into the audit pack.
 *
 * `STANDARDS_FIXTURES` is the single registry consumed by:
 *   - parser/serializer round-trip specs (`tests/standards/<id>/...`)
 *   - the admin-evidence walk-through (writes one canonical sample per
 *     standard into `tests/evidence/standards/<id>/...` so the SOX §404
 *     evidence pack carries both screenshots and the wire artifacts)
 *
 * Add a new standard by:
 *   1. Importing its canonical type from `@/standards/<id>`
 *   2. Declaring a `MINIMAL_<ID>_FIXTURE` typed against it
 *   3. Adding an entry to `STANDARDS_FIXTURES`
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard SAF-T-2.0 oecd audit-file
 * @standard UN-EDIFACT D96A invoic
 * @audit ISO-19011:2018 audit-trail standards-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @see tests/helpers/evidence.ts
 * @see src/plugins/accounting/seeds/level-1
 */

import type { Camt053Statement } from '@/standards/iso-20022'
import type { SafTAuditFile } from '@/standards/saf-t'
import type { EdifactInvoic } from '@/standards/un-edifact'

// ─── ISO-20022 camt.053 ─────────────────────────────────────────────────

/**
 * Two-transaction statement (one credit, one debit) used by the camt053
 * parser round-trip tests. Mirrors the shape produced by `parseCamt053`
 * against `tests/int/accounting/camt053-import.int.spec.ts`'s `SAMPLE_CAMT053`.
 */
export const MINIMAL_CAMT053_FIXTURE: Camt053Statement = {
  id: 'STMT-2026-04',
  createdAt: new Date('2026-05-01T00:00:00Z'),
  account: { iban: 'BG80BNBG96611020345678', currency: 'EUR' },
  owner: { name: 'Acme Holdings' },
  fromDateTime: new Date('2026-04-01T00:00:00Z'),
  toDateTime: new Date('2026-04-30T23:59:59Z'),
  openingBalance: 100_000_00,
  closingBalance: 110_000_00,
  currency: 'EUR',
  transactions: [
    {
      amount: 5_000_00,
      currency: 'EUR',
      creditDebitIndicator: 'CRDT',
      status: 'BOOK',
      bookingDate: new Date('2026-04-15T00:00:00Z'),
      valueDate: new Date('2026-04-15T00:00:00Z'),
      bankTransactionCode: { domain: 'PMNT', family: 'RCDT', subFamily: 'BOOK' },
      endToEndId: 'E2E-001',
      counterparty: { name: 'Customer LLC' },
      counterpartyAccount: { iban: 'DE89370400440532013000' },
      remittanceInformation: {
        structured: {
          creditorReference: { reference: 'RF18539007547034' },
          referredDocumentNumbers: ['INV-2026-042'],
        },
      },
    },
    {
      amount: 25_00,
      currency: 'EUR',
      creditDebitIndicator: 'DBIT',
      status: 'BOOK',
      bookingDate: new Date('2026-04-30T00:00:00Z'),
      valueDate: new Date('2026-04-30T00:00:00Z'),
    },
  ],
}

// ─── OECD SAF-T 2.0 ─────────────────────────────────────────────────────

/**
 * Empty-period audit file — header + master-files shells with no GL entries
 * and no source documents. Matches the shape `buildAuditFile` returns when
 * called against an empty tenant (see `saf-t-export.int.spec.ts`).
 *
 * The `sourceDocuments` slot is intentionally omitted — `buildSourceDocuments`
 * returns `undefined` when every sub-collection is empty, and this fixture
 * reflects that contract.
 */
export const MINIMAL_SAFT_FIXTURE: SafTAuditFile = {
  header: {
    auditFileVersion: '2.0',
    taxAccountingBasis: 'F',
    companyID: 'EU123',
    taxRegistrationNumber: 'EU123',
    companyName: 'Acme',
    companyAddress: { city: 'Sofia', postalCode: '1000', country: 'BG' },
    fiscalYear: 2026,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    currencyCode: 'EUR',
    dateCreated: '2026-05-10',
    productID: 'erpax/1.0',
    productVersion: '1.0',
  },
  masterFiles: {
    generalLedgerAccounts: [],
    customers: [],
    suppliers: [],
    products: [],
    taxTable: [],
  },
  generalLedgerEntries: {
    numberOfEntries: 0,
    totalDebit: 0,
    totalCredit: 0,
    journals: [],
  },
}

// ─── UN/EDIFACT D96A INVOIC ─────────────────────────────────────────────

/**
 * Single-line invoice — the smallest INVOIC that round-trips through
 * `serializeInvoic` (see `edifact-export.int.spec.ts`). Reused as the
 * canonical EDIFACT artifact in the evidence pack.
 */
export const MINIMAL_EDIFACT_INVOIC_FIXTURE: EdifactInvoic = {
  unh: {
    messageReferenceNumber: '1',
    messageType: 'INVOIC',
    version: 'D',
    release: '96A',
    controllingAgency: 'UN',
  },
  bgm: { documentNameCode: '380', documentNumber: '2026-001', messageFunctionCode: '9' },
  dates: [{ qualifier: '137', value: '20260509', formatQualifier: '102' }],
  parties: [
    { partyQualifier: 'SE', name: 'Acme Lda', taxId: 'PT500000000' },
    { partyQualifier: 'BY', name: 'Customer S.A.', taxId: 'PT600000000' },
  ],
  lines: [
    {
      lin: { lineNumber: 1, itemId: { id: 'WIDGET-1', codeListIdentifier: 'SA' } },
      description: { descriptionFormat: 'F', description: 'Widget Pro 2026' },
      quantity: { qualifier: '47', value: 10, unitCode: 'EA' },
      price: { qualifier: 'AAA', value: 100_00 },
      lineNetAmount: { qualifier: '125', value: 1_000_00 },
      tax: { functionQualifier: '7', type: 'VAT', rate: 20, categoryCode: 'S' },
    },
  ],
  documentTotals: {
    netAmount: { qualifier: '125', value: 1_000_00 },
    taxAmount: { qualifier: '124', value: 200_00 },
    grossAmount: { qualifier: '128', value: 1_200_00 },
    amountDue: { qualifier: '9', value: 1_200_00 },
  },
  unt: { numberOfSegments: 0, messageReferenceNumber: '1' },
}

// ─── Registry ───────────────────────────────────────────────────────────

/**
 * Single source of truth for "which standards have a canonical fixture".
 *
 * The admin-evidence walk-through iterates this map and writes each entry
 * to `tests/evidence/standards/<id>/<artifact>.json` so the SOX §404 evidence
 * pack carries one valid sample per standard alongside the admin screenshots.
 */
export const STANDARDS_FIXTURES = {
  'iso-20022/camt053': MINIMAL_CAMT053_FIXTURE,
  'saf-t/audit-file': MINIMAL_SAFT_FIXTURE,
  'un-edifact/invoic': MINIMAL_EDIFACT_INVOIC_FIXTURE,
} as const

export type StandardsFixtureKey = keyof typeof STANDARDS_FIXTURES
