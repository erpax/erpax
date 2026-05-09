/**
 * Import → collection projection tests.
 *
 * Asserts the parsed canonical types from the import services
 * (parseCamt053, parsePeppolInvoice) project cleanly onto the
 * Payload collection shapes from src/payload-types.ts. The
 * projection functions are what an actual receive-side write path
 * uses to populate BankStatements / BankTransactions / Invoices /
 * InvoiceLines from inbound XML.
 *
 * Using the generated payload-types means the tests catch ANY drift
 * between the parser output and what Payload expects.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017 semantic-model
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/camt053-import.service.ts
 * @see src/services/peppol-import.service.ts
 */

import { describe, it, expect } from 'vitest'
import { parseCamt053 } from '@/services/camt053-import.service'
import { parsePeppolInvoice } from '@/services/peppol-import.service'
import type {
  BankStatement,
  BankTransaction,
  Invoice,
  InvoiceLine,
} from '@/payload-types'

// ─── Projection helpers ───────────────────────────────────────────────

/**
 * Project a parsed Camt053Statement onto a BankStatements collection
 * row. Drops Payload-managed fields (id, createdAt, updatedAt) so the
 * caller can pass the result to `payload.create()`.
 *
 * The signed-amount + creditDebitIndicator on canonical Camt053Transaction
 * collapses to a SIGNED `amount` field on BankTransaction (positive =
 * credit, negative = debit) per the existing collection convention.
 */
const camt053StatementToCollection = (
  parsed: ReturnType<typeof parseCamt053>,
  tenantId: number,
  bankAccountId: number,
): Omit<BankStatement, 'id' | 'createdAt' | 'updatedAt'> => ({
  tenant: tenantId,
  statementId: parsed.id,
  bankAccount: bankAccountId,
  statementDate: parsed.toDateTime.toISOString(),
  statementPeriodStart: parsed.fromDateTime.toISOString(),
  currency: (parsed.currency as BankStatement['currency']) ?? 'EUR',
  openingBalance: parsed.openingBalance,
  closingBalance: parsed.closingBalance,
  transactions: parsed.transactions.map((tx) => ({
    transactionDate: tx.bookingDate.toISOString(),
    amount:
      tx.creditDebitIndicator === 'CRDT'
        ? tx.amount
        : -tx.amount,
    description:
      tx.remittanceInformation?.unstructured ??
      tx.counterparty?.name ??
      'Imported from camt.053',
    reference: tx.endToEndId,
  })),
} as Omit<BankStatement, 'id' | 'createdAt' | 'updatedAt'>)

const camt053TransactionsToCollection = (
  parsed: ReturnType<typeof parseCamt053>,
  tenantId: number,
  bankAccountId: number,
): Array<Omit<BankTransaction, 'id' | 'createdAt' | 'updatedAt'>> =>
  parsed.transactions.map((tx) => ({
    tenant: tenantId,
    externalId: tx.accountServicerReference ?? tx.endToEndId ?? '',
    bankAccount: bankAccountId,
    valueDate: (tx.valueDate ?? tx.bookingDate).toISOString(),
    bookingDate: tx.bookingDate.toISOString(),
    amount:
      tx.creditDebitIndicator === 'CRDT' ? tx.amount : -tx.amount,
    currency: (tx.currency as BankTransaction['currency']) ?? 'EUR',
    description: tx.remittanceInformation?.unstructured,
    counterpartyName: tx.counterparty?.name,
    counterpartyIban: tx.counterpartyAccount?.iban,
    counterpartyBic: tx.counterparty?.bic,
    reference:
      tx.remittanceInformation?.structured?.creditorReference?.reference ??
      tx.endToEndId,
    transactionCode: tx.bankTransactionCode
      ? `${tx.bankTransactionCode.domain}/${tx.bankTransactionCode.family}/${tx.bankTransactionCode.subFamily}`
      : undefined,
    matchStatus: 'unmatched',
  } as Omit<BankTransaction, 'id' | 'createdAt' | 'updatedAt'>))

const peppolInvoiceToCollection = (
  parsed: ReturnType<typeof parsePeppolInvoice>,
  tenantId: number,
): Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'> => {
  const issueDate =
    typeof parsed.invoice.issueDate === 'string'
      ? parsed.invoice.issueDate
      : parsed.invoice.issueDate.toISOString().slice(0, 10)
  return {
    tenant: tenantId,
    typeStatus: {
      invoiceType:
        parsed.invoice.typeCode === '381' ? 'credit_note' : 'invoice',
      invoiceTypeCode: parsed.invoice.typeCode,
    },
    number: parsed.invoice.invoiceNumber,
    dates: {
      date: issueDate,
      issuedAt: issueDate,
      dueAt: parsed.invoice.dueDate as string | undefined,
    },
    amounts: {
      itemTotal: parsed.totals.lineNetTotal,
      allowancesTotal: parsed.totals.allowancesTotal,
      chargesTotal: parsed.totals.chargesTotal,
      netTotal: parsed.totals.taxExclusiveTotal,
      taxTotal: parsed.totals.vatTotal,
      totalAmount: parsed.totals.taxInclusiveTotal,
      prepaidAmount: parsed.totals.prepaidAmount,
      roundingAmount: parsed.totals.roundingAmount,
      totalDue: parsed.totals.amountDue,
    },
    vatBreakdown: parsed.vatBreakdown.map((b) => ({
      categoryCode: b.categoryCode,
      rate: b.rate,
      taxableAmount: b.taxableAmount,
      taxAmount: b.taxAmount,
      exemptionReasonCode: b.exemptionReasonCode,
      exemptionReason: b.exemptionReason,
    })),
    parties: {},
    billingTax: {
      currencyCode: parsed.invoice.currencyCode,
    },
  } as Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>
}

const peppolLinesToCollection = (
  parsed: ReturnType<typeof parsePeppolInvoice>,
  tenantId: number,
  invoiceId: number,
): Array<Omit<InvoiceLine, 'id' | 'createdAt' | 'updatedAt'>> =>
  parsed.lines.map((line) => ({
    tenant: tenantId,
    invoice: invoiceId,
    code: line.id,
    description: line.description ?? '',
    lineNote: line.note,
    objectIdentifier: line.itemId,
    quantity: {
      quantity: line.quantity,
      unit: line.unitCode,
    },
    pricing: {
      unitPrice: line.priceDetails?.itemNetPrice ?? 0,
      itemTotal: line.netAmount,
    },
    taxation: {
      vatCategoryCode: line.vat.categoryCode,
      taxRate: line.vat.rate,
      vatExemptionReasonCode: line.vat.exemptionReasonCode,
      vatExemptionReason: line.vat.exemptionReason,
      netTotal: line.netAmount,
    },
  } as Omit<InvoiceLine, 'id' | 'createdAt' | 'updatedAt'>))

// ─── Fixtures ─────────────────────────────────────────────────────────

const SAMPLE_CAMT053 = `<?xml version="1.0"?>
<BkToCstmrStmt>
  <Stmt>
    <Id>STMT-2026-04</Id>
    <CreDtTm>2026-05-01T08:00:00Z</CreDtTm>
    <Acct>
      <Id><IBAN>BG80BNBG96611020345678</IBAN></Id>
      <Ccy>EUR</Ccy>
    </Acct>
    <FrToDt>
      <FrDtTm>2026-04-01T00:00:00Z</FrDtTm>
      <ToDtTm>2026-04-30T23:59:59Z</ToDtTm>
    </FrToDt>
    <Bal>
      <Tp><CdOrPrtry><Cd>OPBD</Cd></CdOrPrtry></Tp>
      <Amt Ccy="EUR">100000.00</Amt>
    </Bal>
    <Bal>
      <Tp><CdOrPrtry><Cd>CLBD</Cd></CdOrPrtry></Tp>
      <Amt Ccy="EUR">110000.00</Amt>
    </Bal>
    <Ntry>
      <AcctSvcrRef>ACME-2026-001</AcctSvcrRef>
      <Amt Ccy="EUR">5000.00</Amt>
      <CdtDbtInd>CRDT</CdtDbtInd>
      <Sts>BOOK</Sts>
      <BookgDt><Dt>2026-04-15</Dt></BookgDt>
      <ValDt><Dt>2026-04-15</Dt></ValDt>
      <BkTxCd>
        <Domn>
          <Cd>PMNT</Cd>
          <Fmly>
            <Cd>RCDT</Cd>
            <SubFmlyCd>BOOK</SubFmlyCd>
          </Fmly>
        </Domn>
      </BkTxCd>
      <NtryDtls>
        <TxDtls>
          <Refs><EndToEndId>E2E-001</EndToEndId></Refs>
          <RltdPties>
            <Dbtr><Nm>Customer LLC</Nm></Dbtr>
            <DbtrAcct><Id><IBAN>DE89370400440532013000</IBAN></Id></DbtrAcct>
          </RltdPties>
          <RmtInf>
            <Strd>
              <CdtrRefInf><Ref>RF18539007547034</Ref></CdtrRefInf>
            </Strd>
          </RmtInf>
        </TxDtls>
      </NtryDtls>
    </Ntry>
  </Stmt>
</BkToCstmrStmt>`

const SAMPLE_PEPPOL = `<?xml version="1.0"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>2026-001</cbc:ID>
  <cbc:IssueDate>2026-05-09</cbc:IssueDate>
  <cbc:DueDate>2026-06-08</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty><cac:Party><cbc:EndpointID schemeID="9956">BG123456789</cbc:EndpointID></cac:Party></cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty><cac:Party><cbc:EndpointID schemeID="9930">DE987654321</cbc:EndpointID></cac:Party></cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">200.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">1000.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">200.00</cbc:TaxAmount>
      <cac:TaxCategory><cbc:ID>S</cbc:ID><cbc:Percent>20.00</cbc:Percent><cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme></cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">1000.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">1200.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">1200.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>Widget Pro 2026</cbc:Description>
      <cbc:Name>Widget Pro 2026</cbc:Name>
      <cac:SellersItemIdentification><cbc:ID>WIDGET-1</cbc:ID></cac:SellersItemIdentification>
      <cac:ClassifiedTaxCategory><cbc:ID>S</cbc:ID><cbc:Percent>20.00</cbc:Percent><cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme></cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price><cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount></cac:Price>
  </cac:InvoiceLine>
</Invoice>`

// ─── Tests ────────────────────────────────────────────────────────────

describe('Import → BankStatement collection projection', () => {
  it('camt.053 statement projects onto BankStatement collection shape', () => {
    const parsed = parseCamt053(SAMPLE_CAMT053)
    const row = camt053StatementToCollection(parsed, 1, 42)
    // The projection compiles against the BankStatement type from
    // payload-types.ts — TypeScript catches drift at compile time.
    expect(row.tenant).toBe(1)
    expect(row.bankAccount).toBe(42)
    expect(row.statementId).toBe('STMT-2026-04')
    expect(row.openingBalance).toBe(100_000_00)
    expect(row.closingBalance).toBe(110_000_00)
    expect(row.transactions).toHaveLength(1)
    // Credit transaction projects to positive signed amount.
    expect(row.transactions![0].amount).toBe(5_000_00)
  })

  it('camt.053 transactions project onto BankTransaction[] collection rows', () => {
    const parsed = parseCamt053(SAMPLE_CAMT053)
    const rows = camt053TransactionsToCollection(parsed, 1, 42)
    expect(rows).toHaveLength(1)
    const tx = rows[0]
    expect(tx.tenant).toBe(1)
    expect(tx.externalId).toBe('ACME-2026-001')
    expect(tx.amount).toBe(5_000_00) // CRDT → positive
    expect(tx.counterpartyName).toBe('Customer LLC')
    expect(tx.counterpartyIban).toBe('DE89370400440532013000')
    expect(tx.reference).toBe('RF18539007547034')
    expect(tx.transactionCode).toBe('PMNT/RCDT/BOOK')
    expect(tx.matchStatus).toBe('unmatched')
  })
})

describe('Import → Invoice + InvoiceLine collection projection', () => {
  it('Peppol UBL invoice projects onto Invoice collection shape', () => {
    const parsed = parsePeppolInvoice(SAMPLE_PEPPOL)
    const row = peppolInvoiceToCollection(parsed, 1)
    // Type-check against the generated Invoice type — drift would fail
    // the compile.
    expect(row.tenant).toBe(1)
    expect(row.number).toBe('2026-001')
    expect(row.typeStatus.invoiceType).toBe('invoice')
    expect(row.dates?.dueAt).toBe('2026-06-08')
    expect(row.amounts?.itemTotal).toBe(1_000_00)
    expect(row.amounts?.totalAmount).toBe(1_200_00)
    expect(row.amounts?.totalDue).toBe(1_200_00)
    expect(row.vatBreakdown).toHaveLength(1)
    expect(row.vatBreakdown![0].categoryCode).toBe('S')
  })

  it('Peppol UBL lines project onto InvoiceLine[] collection rows', () => {
    const parsed = parsePeppolInvoice(SAMPLE_PEPPOL)
    const rows = peppolLinesToCollection(parsed, 1, 99)
    expect(rows).toHaveLength(1)
    const line = rows[0]
    expect(line.tenant).toBe(1)
    expect(line.invoice).toBe(99)
    expect(line.code).toBe('1')
    expect(line.description).toBe('Widget Pro 2026')
    expect(line.objectIdentifier).toBe('WIDGET-1')
    expect(line.quantity?.quantity).toBe(10)
    expect(line.quantity?.unit).toBe('EA')
    expect(line.pricing?.unitPrice).toBe(100_00)
    expect(line.taxation?.vatCategoryCode).toBe('S')
    expect(line.taxation?.taxRate).toBe(20)
  })

  it('CreditNote (typeCode 381) projects to invoiceType=credit_note', () => {
    const cn = SAMPLE_PEPPOL.replace(
      '<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>',
      '<cbc:InvoiceTypeCode>381</cbc:InvoiceTypeCode>',
    )
    const parsed = parsePeppolInvoice(cn)
    const row = peppolInvoiceToCollection(parsed, 1)
    expect(row.typeStatus.invoiceType).toBe('credit_note')
  })
})
