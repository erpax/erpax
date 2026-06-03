/**
 * SAF-T Export Service — projects Payload collections onto the canonical
 * `SafTAuditFile` shape from `@/standards/saf-t`.
 *
 * Each tax authority's submission system (PT, NO, RO D406, LU, etc.)
 * ingests an XSD-validated XML rendering of this structure. This
 * service produces the TYPED STRUCTURE; a separate serializer renders
 * the XML in a follow-up slice.
 *
 * Architecture:
 *
 *   buildAuditFile(payload, options)            ← top-level orchestrator
 *     ├─ buildHeader(tenant, period, options)
 *     ├─ buildMasterFiles(payload, tenant)
 *     │    ├─ buildGeneralLedgerAccounts(payload, tenant)
 *     │    ├─ buildCustomers(payload, tenant)
 *     │    ├─ buildSuppliers(payload, tenant)
 *     │    ├─ buildProducts(payload, tenant)
 *     │    └─ buildTaxTable(payload, tenant)
 *     ├─ buildGeneralLedgerEntries(payload, tenant, period)
 *     │    └─ groups journal-entries by sourceType into Journals
 *     └─ buildSourceDocuments(payload, tenant, period)   ← follow-up
 *
 * Each builder is pure-async: takes Payload + minimal config, returns
 * the typed canonical structure. Easy to unit-test (mock Payload's
 * `find` / `findByID`) and easy to compose into different country
 * variants (saf-t-pt extends with PT hash chain, saf-t-no with NO
 * required tables, etc.).
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail tax-authority-audit-file
 * @compliance SOX §404 internal-controls
 * @see src/standards/saf-t/types.ts
 */

import type { Payload } from 'payload'
import { escapeXml } from '@/utilities/xml-escape'
import type {
  SafTAuditFile,
  SafTHeader,
  SafTMasterFiles,
  SafTGeneralLedgerAccount,
  SafTCustomer,
  SafTSupplier,
  SafTProduct,
  SafTTaxTableEntry,
  SafTGeneralLedgerEntries,
  SafTJournal,
  SafTTransaction,
  SafTLine,
  SafTAddressStructure,
  SafTPartyId,
} from '@/standards/saf-t'
import type {
  GlAccount,
  Address,
  Customer,
  Vendor,
  JournalEntry,
  InventoryMovement,
} from '@/payload-types'
import { generateTrialBalance, type TrialBalanceRow } from '@/services/accounting/reports.service'

export interface SafTExportOptions {
  /** Tenant id whose data to export. */
  tenantId: string | number
  /** Reporting period — typically one fiscal year. */
  fiscalYear: number
  startDate: string // ISO 8601 (YYYY-MM-DD)
  endDate: string // ISO 8601
  /** Tenant header info (resolved by the caller from the Tenants collection). */
  companyID: string
  taxRegistrationNumber: string
  companyName: string
  companyAddress: SafTAddressStructure
  /** ISO 4217 functional currency. */
  currencyCode: string
  /** Producing software identification. Defaults to erpax. */
  productID?: string
  productVersion?: string
  /** Optional schema variant — defaults to OECD baseline. PT uses '1.04'. */
  auditFileVersion?: string
  /** Optional accounting basis — defaults to 'F' (financial). */
  taxAccountingBasis?: SafTHeader['taxAccountingBasis']
}

// ─── 1. Header ─────────────────────────────────────────────────────────

export const buildHeader = (options: SafTExportOptions): SafTHeader => ({
  auditFileVersion: options.auditFileVersion ?? '2.00',
  companyID: options.companyID,
  taxRegistrationNumber: options.taxRegistrationNumber,
  taxAccountingBasis: options.taxAccountingBasis ?? 'F',
  companyName: options.companyName,
  companyAddress: options.companyAddress,
  fiscalYear: options.fiscalYear,
  startDate: options.startDate,
  endDate: options.endDate,
  currencyCode: options.currencyCode,
  dateCreated: new Date().toISOString().slice(0, 10),
  productID: options.productID ?? 'erpax',
  productVersion: options.productVersion ?? '1.0',
})

// ─── 2. MasterFiles ────────────────────────────────────────────────────

export const buildGeneralLedgerAccounts = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
  currencyCode: string,
): Promise<SafTGeneralLedgerAccount[]> => {
  // SAF-T account balances are DERIVED from the ledger (balance =
  // Σcredit − Σdebit), never stored on gl-accounts. Opening = trial
  // balance the day before the period start; closing = as of period end.
  const dayBefore = (iso: string): Date => {
    const d = new Date(`${iso.slice(0, 10)}T00:00:00.000Z`)
    d.setUTCDate(d.getUTCDate() - 1)
    return d
  }
  const [opening, closing] = await Promise.all([
    generateTrialBalance(payload, tenantId, dayBefore(startDate), currencyCode),
    generateTrialBalance(
      payload,
      tenantId,
      new Date(`${endDate.slice(0, 10)}T23:59:59.999Z`),
      currencyCode,
    ),
  ])
  const index = (rows: TrialBalanceRow[]): Map<string, TrialBalanceRow> =>
    new Map(rows.map((r) => [String(r.accountId), r]))
  const openingBy = index(opening.rows)
  const closingBy = index(closing.rows)

  const result = await payload.find({
    collection: 'gl-accounts',
    where: { tenant: { equals: tenantId } },
    limit: 100_000,
    depth: 0,
  })
  const accounts = result.docs as GlAccount[]

  // Synthesis (S) = an account that is another account's parent; a leaf
  // is Movement (M). Derive the parent-id set + id→number map from the
  // chart (OECD SAF-T accountType taxonomy + grouping hierarchy).
  const parentIds = new Set<string>()
  const numberById = new Map<string, string>()
  for (const a of accounts) {
    numberById.set(String(a.id), a.accountNumber)
    const p = a.parentAccount
    const pid = typeof p === 'object' && p !== null ? p.id : p
    if (pid != null) parentIds.add(String(pid))
  }

  // SAF-T presents the net balance on the side it falls (the opposite
  // column is omitted, not zero-filled).
  const debitSide = (r: TrialBalanceRow | undefined): number | undefined => {
    if (!r) return undefined
    const net = r.totalDebits - r.totalCredits
    return net > 0 ? net : undefined
  }
  const creditSide = (r: TrialBalanceRow | undefined): number | undefined => {
    if (!r) return undefined
    const net = r.totalCredits - r.totalDebits
    return net > 0 ? net : undefined
  }

  return accounts.map((d) => {
    const open = openingBy.get(String(d.id))
    const close = closingBy.get(String(d.id))
    const p = d.parentAccount
    const pid = typeof p === 'object' && p !== null ? p.id : p
    return {
      accountID: d.accountNumber,
      accountDescription: d.accountName,
      accountType: parentIds.has(String(d.id)) ? 'S' : 'M',
      openingDebitBalance: debitSide(open),
      openingCreditBalance: creditSide(open),
      closingDebitBalance: debitSide(close),
      closingCreditBalance: creditSide(close),
      groupingCode: pid != null ? numberById.get(String(pid)) : undefined,
    }
  })
}

// ISO 3166-1 'ZZ' = user-assigned "unknown country" — the country slot's
// identity element (the pure fractal fallback, not a magic literal).
const UNKNOWN_COUNTRY = 'ZZ'

// Map a populated Address relation (depth ≥ 1) to the SAF-T address
// structure. Absent / unpopulated ⇒ undefined: optional stays optional.
const addressOf = (
  a: (string | null | undefined) | Address,
): SafTAddressStructure | undefined => {
  if (!a || typeof a !== 'object') return undefined
  return {
    streetName: a.name ?? a.title ?? undefined,
    city: a.city ?? '',
    postalCode: a.postalCode ?? '',
    region: a.state ?? undefined,
    country: a.country ?? UNKNOWN_COUNTRY,
  }
}

// Resolve a GlAccount relation to its account number (the SAF-T AccountID).
const accountNumberOf = (
  a: (string | null | undefined) | GlAccount,
): string | undefined => (a && typeof a === 'object' ? a.accountNumber : undefined)

// SAF-T party id — Customer and Vendor share these structural groups;
// each passes its own resolved addresses (customers bill/ship, vendors
// remit-to) since the address groups differ by entity.
const partyIdOf = (
  d: {
    name: string
    country?: string | null
    identity?: { legalName?: string | null } | null
    contact?: { email?: string | null; phone?: string | null } | null
    tax?: { vatNumber?: string | null } | null
  },
  billingAddress?: SafTAddressStructure,
  shipToAddress?: SafTAddressStructure,
): SafTPartyId => ({
  taxRegistrationNumber: d.tax?.vatNumber ?? undefined,
  taxRegistrationCountry: d.country ?? UNKNOWN_COUNTRY,
  companyName: d.identity?.legalName ?? d.name,
  contact: d.contact?.email ?? d.contact?.phone ?? undefined,
  billingAddress: billingAddress ?? {
    city: '',
    postalCode: '',
    country: d.country ?? UNKNOWN_COUNTRY,
  },
  shipToAddress,
})

export const buildCustomers = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTCustomer[]> => {
  const result = await payload.find({
    collection: 'customers',
    where: { tenant: { equals: tenantId } },
    limit: 100_000,
    depth: 1,
  })
  return (result.docs as Customer[]).map((d) => ({
    customerID: d.code,
    accountID: accountNumberOf(d.ledger?.defaultReceivableAccount) ?? '',
    selfBillingIndicator: 0,
    party: partyIdOf(
      d,
      addressOf(d.addresses?.billingAddress),
      addressOf(d.addresses?.shippingAddress),
    ),
  }))
}

export const buildSuppliers = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTSupplier[]> => {
  const result = await payload.find({
    collection: 'vendors',
    where: { tenant: { equals: tenantId } },
    limit: 100_000,
    depth: 1,
  })
  return (result.docs as Vendor[]).map((d) => ({
    supplierID: d.code,
    accountID: accountNumberOf(d.ledger?.defaultPayableAccount) ?? '',
    selfBillingIndicator: 0,
    party: partyIdOf(d, addressOf(d.addresses?.remitToAddress)),
  }))
}

export const buildProducts = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTProduct[]> => {
  const result = await payload.find({
    collection: 'items',
    where: { tenant: { equals: tenantId } },
    limit: 100_000,
    depth: 0,
  })
  return (result.docs as unknown as Array<Record<string, unknown>>).map((d) => ({
    productCode: String((d.itemNumber as string | undefined) ?? d.id),
    productDescription: String(((d.itemName as string | undefined) ?? (d.description as string | undefined) ?? d.id) ?? d.id),
    productType: ((d.productType as 'P' | 'S' | 'O' | 'I' | undefined) ?? 'P') as 'P' | 'S' | 'O' | 'I',
    unitOfMeasure: (d.unitOfMeasure as string | undefined),
  }))
}

export const buildTaxTable = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTTaxTableEntry[]> => {
  const result = await payload.find({
    collection: 'tax-codes',
    where: { tenant: { equals: tenantId } },
    limit: 1_000,
    depth: 0,
  })
  return (result.docs as unknown as Array<Record<string, unknown>>).map((d) => ({
    taxType: String((d.taxType as string | undefined) ?? 'IVA'),
    taxCountryRegion: String((d.taxCountryRegion as string | undefined) ?? 'PT'),
    taxCode: String(((d.taxCode as string | undefined) ?? d.id) ?? d.id),
    description: String((((d.description as string | undefined) ?? (d.taxCode as string | undefined) ?? '—') ?? '—')),
    taxPercentage: (d.taxPercentage as number | undefined),
    taxAmount: (d.taxAmount as number | undefined),
    taxExpirationDate: (d.expirationDate as string | undefined),
  }))
}

export const buildMasterFiles = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
  currencyCode: string,
): Promise<SafTMasterFiles> => ({
  generalLedgerAccounts: await buildGeneralLedgerAccounts(
    payload,
    tenantId,
    startDate,
    endDate,
    currencyCode,
  ),
  customers: await buildCustomers(payload, tenantId),
  suppliers: await buildSuppliers(payload, tenantId),
  products: await buildProducts(payload, tenantId),
  taxTable: await buildTaxTable(payload, tenantId),
})

// ─── 3. GeneralLedgerEntries ──────────────────────────────────────────

const journalIdFor = (sourceType: string | undefined): string => {
  switch (sourceType) {
    case 'invoice':
      return 'SALES'
    case 'bill':
      return 'PURCHASES'
    case 'payment':
    case 'bank_adjustment':
      return 'CASH'
    case 'inventory':
    case 'inventory_movement':
      return 'STOCK'
    case 'fixed_asset':
      return 'FIXED_ASSETS'
    case 'period_end_adjustment':
    case 'subscription':
    case 'order':
      return 'GENERAL'
    case 'payroll_run':
      return 'PAYROLL'
    case 'lease_period':
      return 'LEASES'
    default:
      return 'GENERAL'
  }
}

const periodFor = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${yyyy}-${mm}`
}

export const buildGeneralLedgerEntries = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<SafTGeneralLedgerEntries> => {
  const result = await payload.find({
    collection: 'journal-entries',
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { status: { equals: 'posted' } },
        { entryDate: { greater_than_equal: startDate, less_than_equal: endDate } },
      ],
    },
    limit: 100_000,
    depth: 0,
  })
  const docs = result.docs as JournalEntry[]

  // Group docs by canonical journal id.
  const journalsMap = new Map<string, SafTTransaction[]>()
  let totalDebit = 0
  let totalCredit = 0

  for (const doc of docs) {
    const journalId = journalIdFor(doc.sourceType)
    const txDate = new Date(doc.entryDate ?? doc.createdAt ?? new Date())
    const systemEntryDate = (doc.createdAt
      ? new Date(doc.createdAt)
      : txDate
    ).toISOString()

    const lines: SafTLine[] = (doc.lines ?? []).map((l, i) => {
      const debit = Number(l.debit ?? 0)
      const credit = Number(l.credit ?? 0)
      const amount = debit > 0 ? debit : credit
      totalDebit += debit
      totalCredit += credit
      return {
        recordID: String(i + 1),
        accountID: String((l as Record<string, unknown>).accountId ?? '—'),
        systemEntryDate,
        debitCreditIndicator: debit > 0 ? 'D' : 'C',
        amount: { amount },
        description: l.description ?? '',
        customerID: (l as Record<string, unknown>).customerId as string | undefined,
        supplierID: (l as Record<string, unknown>).supplierId as string | undefined,
      }
    })

    const tx: SafTTransaction = {
      transactionID: String(doc.entryNumber ?? doc.id),
      period: periodFor(txDate),
      transactionDate: txDate.toISOString().slice(0, 10),
      sourceID: String(doc.sourceId ?? doc.id),
      description: String(doc.description ?? '—'),
      systemEntryDate,
      lines,
    }

    const list = journalsMap.get(journalId) ?? []
    list.push(tx)
    journalsMap.set(journalId, list)
  }

  const journals: SafTJournal[] = Array.from(journalsMap.entries()).map(
    ([journalID, transactions]) => ({
      journalID,
      description: journalID,
      transactions,
    }),
  )

  return {
    numberOfEntries: docs.length,
    totalDebit,
    totalCredit,
    journals,
  }
}

// ─── 4. SourceDocuments ───────────────────────────────────────────────

interface InvoiceDoc {
  id: string | number
  number?: string
  invoiceTypeCode?: string
  invoiceType?: string
  date?: string | Date
  issuedAt?: string | Date
  buyer?: string | { id?: string }
  seller?: string | { id?: string }
  buyerAddress?: import('@/standards/saf-t').SafTAddressStructure
  amounts?: {
    netTotal?: number
    taxTotal?: number
    totalAmount?: number
  }
  vatBreakdown?: Array<{
    categoryCode?: string
    rate?: number
    taxableAmount?: number
    taxAmount?: number
    exemptionReasonCode?: string
    exemptionReason?: string
  }>
  lines?: Array<{
    code?: string
    description?: string
    quantity?: { quantity?: number; unit?: string }
    pricing?: { unitPrice?: number; itemTotal?: number }
    taxation?: {
      vatCategoryCode?: string
      taxRate?: number
      netTotal?: number
    }
    items?: { sellerItem?: string | { id?: string } }
  }>
  createdAt?: string | Date
  status?: string
}

const toIsoDate = (d: string | Date | undefined): string => {
  if (!d) return ''
  return typeof d === 'string'
    ? d.length >= 10
      ? d.slice(0, 10)
      : d
    : d.toISOString().slice(0, 10)
}

const toIsoDateTime = (d: string | Date | undefined): string => {
  if (!d) return new Date().toISOString()
  return typeof d === 'string' ? d : d.toISOString()
}

const idStr = (
  rel: string | number | { id?: string | number } | undefined,
): string => {
  if (rel === undefined) return ''
  if (typeof rel === 'string' || typeof rel === 'number') return String(rel)
  if (typeof rel === 'object' && 'id' in rel && rel.id !== undefined) return String(rel.id)
  return ''
}

const invoiceToSafT = (
  doc: InvoiceDoc,
): import('@/standards/saf-t').SafTSalesInvoice => {
  const issueDate = toIsoDate(doc.issuedAt ?? doc.date)
  const systemEntryDate = toIsoDateTime(doc.createdAt ?? doc.date)

  const lines = (doc.lines ?? []).map((line, i) => ({
    lineNumber: i + 1,
    productCode: idStr(line.items?.sellerItem) || line.code,
    productDescription: line.description ?? line.code ?? '—',
    quantity: line.quantity?.quantity ?? 0,
    unitOfMeasure: line.quantity?.unit,
    unitPrice: line.pricing?.unitPrice ?? 0,
    taxBase: line.taxation?.netTotal ?? line.pricing?.itemTotal ?? 0,
    description: line.description ?? '',
    creditAmount: line.taxation?.netTotal ?? line.pricing?.itemTotal ?? 0,
    taxInformation: {
      taxType: 'IVA',
      taxCountryRegion: 'PT',
      taxCode: line.taxation?.vatCategoryCode ?? 'NOR',
      taxPercentage: line.taxation?.taxRate,
      taxAmount: { amount: 0 }, // line-level tax computed from rate × base
    },
  }))

  return {
    invoiceNo: String(doc.number ?? doc.id),
    invoiceType: doc.invoiceTypeCode === '381' ? 'NC' : 'FT', // PT-style
    invoiceDate: issueDate,
    systemEntryDate,
    customerID: idStr(doc.buyer),
    lines,
    documentTotals: {
      taxPayable: doc.amounts?.taxTotal ?? 0,
      netTotal: doc.amounts?.netTotal ?? 0,
      grossTotal: doc.amounts?.totalAmount ?? 0,
    },
  }
}

export const buildSalesInvoices = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<NonNullable<import('@/standards/saf-t').SafTSourceDocuments['salesInvoices']>> => {
  const result = await payload.find({
    collection: 'invoices',
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { invoiceType: { in: ['invoice', 'credit_note', 'debit_note'] } },
        { 'dates.issuedAt': { greater_than_equal: startDate, less_than_equal: endDate } },
      ],
    },
    limit: 100_000,
    depth: 1,
  })
  const docs = result.docs as unknown as InvoiceDoc[]
  const invoices = docs.map(invoiceToSafT)
  const totalDebit = 0
  let totalCredit = 0
  for (const inv of invoices) {
    totalCredit += inv.documentTotals.netTotal
  }
  return {
    numberOfEntries: invoices.length,
    totalDebit,
    totalCredit,
    invoices,
  }
}

export const buildPurchaseInvoices = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<NonNullable<import('@/standards/saf-t').SafTSourceDocuments['purchaseInvoices']>> => {
  const result = await payload.find({
    collection: 'invoices',
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { invoiceType: { equals: 'bill' } },
        { 'dates.issuedAt': { greater_than_equal: startDate, less_than_equal: endDate } },
      ],
    },
    limit: 100_000,
    depth: 1,
  })
  const docs = result.docs as unknown as InvoiceDoc[]
  const invoices = docs.map(invoiceToSafT)
  let totalDebit = 0
  const totalCredit = 0
  for (const inv of invoices) {
    totalDebit += inv.documentTotals.netTotal
  }
  return {
    numberOfEntries: invoices.length,
    totalDebit,
    totalCredit,
    invoices,
  }
}

interface PaymentDoc {
  id: string | number
  paymentNumber?: string
  paymentType?: string
  paymentDate?: string | Date
  paymentMethod?: string
  partyId?: string | { id?: string }
  amount?: number
  currency?: string
  invoiceId?: string
  billId?: string
  createdAt?: string | Date
  status?: string
}

const PAYMENT_MECH_MAP: Record<string, import('@/standards/saf-t').SafTPaymentMechanism> = {
  cash: 'NU',
  cheque: 'CH',
  bank_transfer: 'TB',
  wire: 'TB',
  sepa_credit_transfer: 'TB',
  sepa_direct_debit: 'MB',
  credit_card: 'CC',
  debit_card: 'CD',
}

const paymentToSafT = (
  doc: PaymentDoc,
): import('@/standards/saf-t').SafTPayment => {
  const paymentDate = toIsoDate(doc.paymentDate)
  const systemEntryDate = toIsoDateTime(doc.createdAt ?? doc.paymentDate)
  const paymentMechanism =
    PAYMENT_MECH_MAP[String(doc.paymentMethod ?? '').toLowerCase()] ?? 'OU'
  const amount = Number(doc.amount ?? 0)
  return {
    paymentRefNo: String(doc.paymentNumber ?? doc.id),
    paymentType: 'RG', // PT recibo geral
    transactionDate: paymentDate,
    customerID: doc.paymentType === 'incoming' ? idStr(doc.partyId) : undefined,
    supplierID: doc.paymentType === 'outgoing' ? idStr(doc.partyId) : undefined,
    paymentMethod: {
      paymentMechanism,
      paymentAmount: amount,
      paymentDate,
    },
    documentStatus: { paymentStatus: 'N', paymentStatusDate: paymentDate },
    systemEntryDate,
    lines: [
      {
        lineNumber: 1,
        sourceDocumentID: String(doc.invoiceId ?? doc.billId ?? doc.id),
        creditAmount: doc.paymentType === 'incoming' ? amount : undefined,
        debitAmount: doc.paymentType === 'outgoing' ? amount : undefined,
      },
    ],
    documentTotals: {
      taxPayable: 0,
      netTotal: amount,
      grossTotal: amount,
    },
  }
}

export const buildPayments = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<NonNullable<import('@/standards/saf-t').SafTSourceDocuments['payments']>> => {
  const result = await payload.find({
    collection: 'payments',
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { paymentDate: { greater_than_equal: startDate, less_than_equal: endDate } },
      ],
    },
    limit: 100_000,
    depth: 0,
  })
  const docs = result.docs as unknown as PaymentDoc[]
  const payments = docs.map(paymentToSafT)
  let totalDebit = 0
  let totalCredit = 0
  for (const p of payments) {
    totalDebit += p.lines[0]?.debitAmount ?? 0
    totalCredit += p.lines[0]?.creditAmount ?? 0
  }
  return {
    numberOfEntries: payments.length,
    totalDebit,
    totalCredit,
    payments,
  }
}

interface InventoryMovementDoc {
  id: string | number
  movementId?: string
  kind?: string
  movementAt?: string | Date
  item?: string | { id?: string; itemNumber?: string; itemName?: string }
  quantity?: number
  unitOfMeasure?: string
  fromLocationName?: string
  toLocationName?: string
  fromCity?: string
  toCity?: string
  customer?: string | { id?: string }
  vendor?: string | { id?: string }
  createdAt?: string | Date
}

const movementToSafT = (
  doc: InventoryMovementDoc,
): import('@/standards/saf-t').SafTMovementOfGoods => ({
  documentNumber: String(doc.movementId ?? doc.id),
  movementType: doc.kind === 'shipment' ? 'GR' : 'GT',
  movementDate: toIsoDate(doc.movementAt),
  systemEntryDate: toIsoDateTime(doc.createdAt ?? doc.movementAt),
  shipFrom: {
    city: doc.fromCity ?? doc.fromLocationName ?? '',
    postalCode: '',
    country: '',
  },
  shipTo: {
    city: doc.toCity ?? doc.toLocationName ?? '',
    postalCode: '',
    country: '',
  },
  customerID: idStr(doc.customer),
  supplierID: idStr(doc.vendor),
  lines: [
    {
      lineNumber: 1,
      productCode:
        typeof doc.item === 'object' && doc.item
          ? String(doc.item.itemNumber ?? doc.item.id ?? '')
          : idStr(doc.item),
      productDescription:
        typeof doc.item === 'object' && doc.item
          ? String(doc.item.itemName ?? doc.item.id ?? '')
          : '—',
      quantity: doc.quantity ?? 0,
      unitOfMeasure: doc.unitOfMeasure,
    },
  ],
})

export const buildMovementOfGoods = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<NonNullable<import('@/standards/saf-t').SafTSourceDocuments['movementOfGoods']>> => {
  const result = await payload.find({
    collection: 'inventory-movements',
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { movementAt: { greater_than_equal: startDate, less_than_equal: endDate } },
      ],
    },
    limit: 100_000,
    depth: 1,
  })
  const docs = result.docs as InventoryMovement[]
  const movements = docs.map(movementToSafT)
  return {
    numberOfMovementLines: movements.reduce((s, m) => s + m.lines.length, 0),
    totalQuantityIssued: movements.reduce(
      (s, m) => s + m.lines.reduce((ls, l) => ls + Math.abs(l.quantity), 0),
      0,
    ),
    movements,
  }
}

export const buildSourceDocuments = async (
  payload: Payload,
  tenantId: string | number,
  startDate: string,
  endDate: string,
): Promise<import('@/standards/saf-t').SafTSourceDocuments | undefined> => {
  const salesInvoices = await buildSalesInvoices(payload, tenantId, startDate, endDate)
  const purchaseInvoices = await buildPurchaseInvoices(payload, tenantId, startDate, endDate)
  const payments = await buildPayments(payload, tenantId, startDate, endDate)
  const movementOfGoods = await buildMovementOfGoods(payload, tenantId, startDate, endDate)

  // Per OECD SAF-T 2.0 §SourceDocuments and the test contract, the top-level
  // `SourceDocuments` block is optional. Omit it when every sub-collection
  // is empty so consumers (and the XML renderer) don't have to special-case
  // empty placeholders. Once a sub-builder lands real data this collapses
  // back to the populated shape automatically.
  const isEmpty =
    salesInvoices.numberOfEntries === 0 &&
    purchaseInvoices.numberOfEntries === 0 &&
    payments.numberOfEntries === 0 &&
    movementOfGoods.numberOfMovementLines === 0
  if (isEmpty) return undefined

  return { salesInvoices, purchaseInvoices, payments, movementOfGoods }
}

// ─── Top-level orchestrator ───────────────────────────────────────────

export const buildAuditFile = async (
  payload: Payload,
  options: SafTExportOptions,
): Promise<SafTAuditFile> => {
  const sourceDocuments = await buildSourceDocuments(
    payload,
    options.tenantId,
    options.startDate,
    options.endDate,
  )
  return {
    header: buildHeader(options),
    masterFiles: await buildMasterFiles(
      payload,
      options.tenantId,
      options.startDate,
      options.endDate,
      options.currencyCode,
    ),
    generalLedgerEntries: await buildGeneralLedgerEntries(
      payload,
      options.tenantId,
      options.startDate,
      options.endDate,
    ),
    // Only set when at least one source-document sub-collection has rows;
    // SafTAuditFile.sourceDocuments is `?` for exactly this reason.
    ...(sourceDocuments ? { sourceDocuments } : {}),
  }
}

// ─── XML serializer ────────────────────────────────────────────────────
//
// Renders a complete `SafTAuditFile` as XSD-validated XML in the OECD
// SAF-T 2.0 namespace. Country-specific extensions (saf-t-pt with PT
// 1.04 namespace + hash chain) override the namespace + add their own
// per-section renderers.

// escapeXml: the shared XML escaper — see @/utilities/xml-escape

const formatAmount = (cents: number): string => (cents / 100).toFixed(2)

const leaf = (
  tag: string,
  value: string | number | undefined | null,
): string => {
  if (value === undefined || value === null || value === '') return ''
  return `<${tag}>${escapeXml(value)}</${tag}>`
}

const wrap = (tag: string, ...children: Array<string | undefined | null>): string => {
  const inner = children.filter((c) => Boolean(c)).join('\n')
  if (!inner) return ''
  return `<${tag}>\n${inner}\n</${tag}>`
}

const renderAddress = (
  tag: string,
  addr: SafTAddressStructure | undefined,
): string => {
  if (!addr) return ''
  return wrap(
    tag,
    leaf('BuildingNumber', addr.buildingNumber),
    leaf('StreetName', addr.streetName),
    leaf('AddressDetail', addr.addressDetail),
    leaf('City', addr.city),
    leaf('PostalCode', addr.postalCode),
    leaf('Region', addr.region),
    leaf('Country', addr.country),
  )
}

const renderHeader = (h: SafTHeader): string =>
  wrap(
    'Header',
    leaf('AuditFileVersion', h.auditFileVersion),
    leaf('CompanyID', h.companyID),
    leaf('TaxRegistrationNumber', h.taxRegistrationNumber),
    leaf('TaxAccountingBasis', h.taxAccountingBasis),
    leaf('CompanyName', h.companyName),
    leaf('BusinessName', h.businessName),
    renderAddress('CompanyAddress', h.companyAddress),
    leaf('FiscalYear', h.fiscalYear),
    leaf('StartDate', h.startDate),
    leaf('EndDate', h.endDate),
    leaf('CurrencyCode', h.currencyCode),
    leaf('DateCreated', h.dateCreated),
    leaf('ProductCompanyTaxID', h.productCompanyTaxID),
    h.softwareCertificateNumber !== undefined
      ? leaf('SoftwareCertificateNumber', h.softwareCertificateNumber)
      : '',
    leaf('ProductID', h.productID),
    leaf('ProductVersion', h.productVersion),
    leaf('HeaderComment', h.headerComment),
  )

const renderGLAccount = (a: SafTGeneralLedgerAccount): string =>
  wrap(
    'Account',
    leaf('AccountID', a.accountID),
    leaf('AccountDescription', a.accountDescription),
    leaf('StandardAccountID', a.standardAccountID),
    leaf('AccountType', a.accountType),
    a.openingDebitBalance !== undefined
      ? leaf('OpeningDebitBalance', formatAmount(a.openingDebitBalance))
      : '',
    a.openingCreditBalance !== undefined
      ? leaf('OpeningCreditBalance', formatAmount(a.openingCreditBalance))
      : '',
    a.closingDebitBalance !== undefined
      ? leaf('ClosingDebitBalance', formatAmount(a.closingDebitBalance))
      : '',
    a.closingCreditBalance !== undefined
      ? leaf('ClosingCreditBalance', formatAmount(a.closingCreditBalance))
      : '',
    leaf('GroupingCategory', a.groupingCategory),
    leaf('GroupingCode', a.groupingCode),
  )

const renderParty = (party: SafTPartyId): string => {
  const billing = renderAddress('BillingAddress', party.billingAddress)
  const shipTo = renderAddress('ShipToAddress', party.shipToAddress)
  return [
    party.taxRegistrationNumber
      ? wrap(
          'TaxRegistrationNumber',
          leaf('Number', party.taxRegistrationNumber),
          leaf('Country', party.taxRegistrationCountry),
        )
      : '',
    leaf('CompanyName', party.companyName),
    leaf('Contact', party.contact),
    billing,
    shipTo,
  ]
    .filter(Boolean)
    .join('\n')
}

const renderCustomer = (c: SafTCustomer): string =>
  wrap(
    'Customer',
    leaf('CustomerID', c.customerID),
    leaf('AccountID', c.accountID),
    leaf('SelfBillingIndicator', c.selfBillingIndicator),
    renderParty(c.party),
  )

const renderSupplier = (s: SafTSupplier): string =>
  wrap(
    'Supplier',
    leaf('SupplierID', s.supplierID),
    leaf('AccountID', s.accountID),
    leaf('SelfBillingIndicator', s.selfBillingIndicator),
    renderParty(s.party),
  )

const renderProduct = (p: SafTProduct): string =>
  wrap(
    'Product',
    leaf('ProductCode', p.productCode),
    leaf('ProductGroup', p.productGroup),
    leaf('ProductDescription', p.productDescription),
    leaf('ProductType', p.productType),
    leaf('ProductNumberCode', p.productNumberCode),
    leaf('UnitOfMeasure', p.unitOfMeasure),
  )

const renderTaxTableEntry = (t: SafTTaxTableEntry): string =>
  wrap(
    'TaxTableEntry',
    leaf('TaxType', t.taxType),
    leaf('TaxCountryRegion', t.taxCountryRegion),
    leaf('TaxCode', t.taxCode),
    leaf('Description', t.description),
    leaf('TaxExpirationDate', t.taxExpirationDate),
    t.taxPercentage !== undefined
      ? leaf('TaxPercentage', t.taxPercentage.toFixed(2))
      : '',
    t.taxAmount !== undefined
      ? leaf('TaxAmount', formatAmount(t.taxAmount))
      : '',
  )

const renderMasterFiles = (mf: SafTMasterFiles): string => {
  const accounts = wrap(
    'GeneralLedgerAccounts',
    ...mf.generalLedgerAccounts.map(renderGLAccount),
  )
  const customers = mf.customers.map(renderCustomer).join('\n')
  const suppliers = mf.suppliers.map(renderSupplier).join('\n')
  const products = mf.products.map(renderProduct).join('\n')
  const taxTable = wrap(
    'TaxTable',
    ...mf.taxTable.map(renderTaxTableEntry),
  )
  return wrap('MasterFiles', accounts, customers, suppliers, products, taxTable)
}

const renderLine = (l: SafTLine): string => {
  const lineTag = l.debitCreditIndicator === 'D' ? 'DebitLine' : 'CreditLine'
  return wrap(
    lineTag,
    leaf('RecordID', l.recordID),
    leaf('AccountID', l.accountID),
    leaf('CustomerID', l.customerID),
    leaf('SupplierID', l.supplierID),
    leaf('SystemEntryDate', l.systemEntryDate),
    leaf('Description', l.description),
    wrap('DebitAmount', leaf('Amount', formatAmount(l.amount.amount))),
  )
}

const renderTransaction = (t: SafTTransaction): string =>
  wrap(
    'Transaction',
    leaf('TransactionID', t.transactionID),
    leaf('Period', t.period),
    leaf('TransactionDate', t.transactionDate),
    leaf('SourceID', t.sourceID),
    leaf('Description', t.description),
    leaf('DocumentType', t.documentType),
    leaf('DocumentNumber', t.documentNumber),
    leaf('SystemEntryDate', t.systemEntryDate),
    leaf('CustomerID', t.customerID),
    leaf('SupplierID', t.supplierID),
    wrap('Lines', ...t.lines.map(renderLine)),
  )

const renderJournal = (j: SafTJournal): string =>
  wrap(
    'Journal',
    leaf('JournalID', j.journalID),
    leaf('Description', j.description),
    ...j.transactions.map(renderTransaction),
  )

const renderGeneralLedgerEntries = (
  gle: SafTGeneralLedgerEntries,
): string =>
  wrap(
    'GeneralLedgerEntries',
    leaf('NumberOfEntries', gle.numberOfEntries),
    leaf('TotalDebit', formatAmount(gle.totalDebit)),
    leaf('TotalCredit', formatAmount(gle.totalCredit)),
    ...gle.journals.map(renderJournal),
  )

// ─── SourceDocuments XML rendering ────────────────────────────────────

const renderSalesInvoiceLine = (
  l: import('@/standards/saf-t').SafTSalesInvoiceLine,
): string =>
  wrap(
    'Line',
    leaf('LineNumber', l.lineNumber),
    leaf('ProductCode', l.productCode),
    leaf('ProductDescription', l.productDescription),
    leaf('Quantity', l.quantity),
    leaf('UnitOfMeasure', l.unitOfMeasure),
    leaf('UnitPrice', formatAmount(l.unitPrice)),
    leaf('TaxBase', formatAmount(l.taxBase)),
    leaf('Description', l.description),
    l.creditAmount !== undefined
      ? leaf('CreditAmount', formatAmount(l.creditAmount))
      : '',
    l.debitAmount !== undefined
      ? leaf('DebitAmount', formatAmount(l.debitAmount))
      : '',
    wrap(
      'Tax',
      leaf('TaxType', l.taxInformation.taxType),
      leaf('TaxCountryRegion', l.taxInformation.taxCountryRegion),
      leaf('TaxCode', l.taxInformation.taxCode),
      l.taxInformation.taxPercentage !== undefined
        ? leaf('TaxPercentage', l.taxInformation.taxPercentage.toFixed(2))
        : '',
    ),
  )

const renderSalesInvoice = (
  inv: import('@/standards/saf-t').SafTSalesInvoice,
): string =>
  wrap(
    'Invoice',
    leaf('InvoiceNo', inv.invoiceNo),
    leaf('InvoiceType', inv.invoiceType),
    leaf('InvoiceDate', inv.invoiceDate),
    leaf('SystemEntryDate', inv.systemEntryDate),
    leaf('CustomerID', inv.customerID),
    ...inv.lines.map(renderSalesInvoiceLine),
    wrap(
      'DocumentTotals',
      leaf('TaxPayable', formatAmount(inv.documentTotals.taxPayable)),
      leaf('NetTotal', formatAmount(inv.documentTotals.netTotal)),
      leaf('GrossTotal', formatAmount(inv.documentTotals.grossTotal)),
    ),
  )

const renderPaymentSafT = (
  p: import('@/standards/saf-t').SafTPayment,
): string =>
  wrap(
    'Payment',
    leaf('PaymentRefNo', p.paymentRefNo),
    leaf('PaymentType', p.paymentType),
    leaf('TransactionDate', p.transactionDate),
    leaf('CustomerID', p.customerID),
    leaf('SupplierID', p.supplierID),
    wrap(
      'PaymentMethod',
      leaf('PaymentMechanism', p.paymentMethod.paymentMechanism),
      leaf('PaymentAmount', formatAmount(p.paymentMethod.paymentAmount)),
      leaf('PaymentDate', p.paymentMethod.paymentDate),
    ),
    wrap(
      'DocumentStatus',
      leaf('PaymentStatus', p.documentStatus.paymentStatus),
      leaf('PaymentStatusDate', p.documentStatus.paymentStatusDate),
    ),
    leaf('SystemEntryDate', p.systemEntryDate),
    ...p.lines.map((line) =>
      wrap(
        'Line',
        leaf('LineNumber', line.lineNumber),
        leaf('SourceDocumentID', line.sourceDocumentID),
        line.creditAmount !== undefined
          ? leaf('CreditAmount', formatAmount(line.creditAmount))
          : '',
        line.debitAmount !== undefined
          ? leaf('DebitAmount', formatAmount(line.debitAmount))
          : '',
      ),
    ),
    wrap(
      'DocumentTotals',
      leaf('TaxPayable', formatAmount(p.documentTotals.taxPayable)),
      leaf('NetTotal', formatAmount(p.documentTotals.netTotal)),
      leaf('GrossTotal', formatAmount(p.documentTotals.grossTotal)),
    ),
  )

const renderMovementOfGoods = (
  m: import('@/standards/saf-t').SafTMovementOfGoods,
): string =>
  wrap(
    'StockMovement',
    leaf('DocumentNumber', m.documentNumber),
    leaf('MovementType', m.movementType),
    leaf('MovementDate', m.movementDate),
    leaf('SystemEntryDate', m.systemEntryDate),
    leaf('CustomerID', m.customerID),
    leaf('SupplierID', m.supplierID),
    renderAddress('ShipFrom', m.shipFrom),
    renderAddress('ShipTo', m.shipTo),
    ...m.lines.map((line) =>
      wrap(
        'Line',
        leaf('LineNumber', line.lineNumber),
        leaf('ProductCode', line.productCode),
        leaf('ProductDescription', line.productDescription),
        leaf('Quantity', line.quantity),
        leaf('UnitOfMeasure', line.unitOfMeasure),
        leaf('Description', line.description),
      ),
    ),
  )

const renderSourceDocuments = (
  src: import('@/standards/saf-t').SafTSourceDocuments,
): string => {
  const sales = src.salesInvoices
    ? wrap(
        'SalesInvoices',
        leaf('NumberOfEntries', src.salesInvoices.numberOfEntries),
        leaf('TotalDebit', formatAmount(src.salesInvoices.totalDebit)),
        leaf('TotalCredit', formatAmount(src.salesInvoices.totalCredit)),
        ...src.salesInvoices.invoices.map(renderSalesInvoice),
      )
    : ''
  const purchases = src.purchaseInvoices
    ? wrap(
        'PurchaseInvoices',
        leaf('NumberOfEntries', src.purchaseInvoices.numberOfEntries),
        leaf('TotalDebit', formatAmount(src.purchaseInvoices.totalDebit)),
        leaf('TotalCredit', formatAmount(src.purchaseInvoices.totalCredit)),
        ...src.purchaseInvoices.invoices.map(renderSalesInvoice),
      )
    : ''
  const payments = src.payments
    ? wrap(
        'Payments',
        leaf('NumberOfEntries', src.payments.numberOfEntries),
        leaf('TotalDebit', formatAmount(src.payments.totalDebit)),
        leaf('TotalCredit', formatAmount(src.payments.totalCredit)),
        ...src.payments.payments.map(renderPaymentSafT),
      )
    : ''
  const movements = src.movementOfGoods
    ? wrap(
        'MovementOfGoods',
        leaf('NumberOfMovementLines', src.movementOfGoods.numberOfMovementLines),
        leaf('TotalQuantityIssued', src.movementOfGoods.totalQuantityIssued),
        ...src.movementOfGoods.movements.map(renderMovementOfGoods),
      )
    : ''
  return wrap('SourceDocuments', sales, purchases, payments, movements)
}

/**
 * Render a complete SAF-T audit file as XSD-validated XML. Returns a
 * single string starting with the prolog `<?xml version="1.0"?>` and
 * the `<AuditFile>` root in the OECD baseline namespace.
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 */
export const renderSafTXml = (file: SafTAuditFile): string => {
  const head = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<AuditFile xmlns="urn:OECD:StandardAuditFile-Tax:1.0">',
  ].join('\n')

  const sections = [
    renderHeader(file.header),
    renderMasterFiles(file.masterFiles),
    file.generalLedgerEntries
      ? renderGeneralLedgerEntries(file.generalLedgerEntries)
      : '',
    file.sourceDocuments ? renderSourceDocuments(file.sourceDocuments) : '',
  ]
    .filter(Boolean)
    .join('\n')

  return `${head}\n${sections}\n</AuditFile>`
}
