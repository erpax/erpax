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

interface GLAccountDoc {
  id: string | number
  accountId?: string
  accountName?: string
  parentAccount?: string | { id?: string }
  accountClass?: string
  isMovementAccount?: boolean
  openingDebitBalance?: number
  openingCreditBalance?: number
  closingDebitBalance?: number
  closingCreditBalance?: number
}

const accountTypeOf = (
  doc: GLAccountDoc,
): SafTGeneralLedgerAccount['accountType'] => {
  // Movement accounts (transactional) ↔ M.
  // Synthesis accounts (group / parent) ↔ S.
  // Analytical / sub-ledger ↔ A (rare in this schema).
  if (doc.isMovementAccount === true) return 'M'
  if (doc.isMovementAccount === false) return 'S'
  return 'M' // safe default — most accounts are transactional
}

export const buildGeneralLedgerAccounts = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTGeneralLedgerAccount[]> => {
  const result = await payload.find({
    collection: 'gl-accounts',
    where: { tenant: { equals: tenantId } },
    limit: 100_000,
    depth: 0,
  })
  return (result.docs as unknown as GLAccountDoc[]).map((d) => ({
    accountID: String(d.accountId ?? d.id),
    accountDescription: String(d.accountName ?? d.id),
    accountType: accountTypeOf(d),
    openingDebitBalance: d.openingDebitBalance,
    openingCreditBalance: d.openingCreditBalance,
    closingDebitBalance: d.closingDebitBalance,
    closingCreditBalance: d.closingCreditBalance,
  }))
}

interface CustomerDoc {
  id: string | number
  customerId?: string
  arAccount?: string | { id?: string }
  identity?: { taxId?: string; taxCountry?: string; companyName?: string; contact?: string }
  billingAddress?: SafTAddressStructure
  shipToAddress?: SafTAddressStructure
}

const partyIdOf = (
  identity: CustomerDoc['identity'],
  billingAddress?: SafTAddressStructure,
  shipToAddress?: SafTAddressStructure,
): SafTPartyId => ({
  taxRegistrationNumber: identity?.taxId,
  taxRegistrationCountry: identity?.taxCountry,
  companyName: String(identity?.companyName ?? '—'),
  contact: identity?.contact,
  billingAddress: billingAddress ?? {
    city: '',
    postalCode: '',
    country: '',
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
  return (result.docs as unknown as CustomerDoc[]).map((d) => ({
    customerID: String(d.customerId ?? d.id),
    accountID:
      typeof d.arAccount === 'string'
        ? d.arAccount
        : String(
            (d.arAccount as { id?: string } | undefined)?.id ?? '21.1',
          ),
    selfBillingIndicator: 0,
    party: partyIdOf(d.identity, d.billingAddress, d.shipToAddress),
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
  interface VendorDoc {
    id: string | number
    vendorId?: string
    apAccount?: string | { id?: string }
    identity?: CustomerDoc['identity']
    billingAddress?: SafTAddressStructure
    shipToAddress?: SafTAddressStructure
  }
  return (result.docs as unknown as VendorDoc[]).map((d) => ({
    supplierID: String(d.vendorId ?? d.id),
    accountID:
      typeof d.apAccount === 'string'
        ? d.apAccount
        : String(
            (d.apAccount as { id?: string } | undefined)?.id ?? '22.1',
          ),
    selfBillingIndicator: 0,
    party: partyIdOf(d.identity, d.billingAddress, d.shipToAddress),
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
  interface ItemDoc {
    id: string | number
    itemNumber?: string
    itemName?: string
    description?: string
    productType?: 'P' | 'S' | 'O' | 'I'
    unitOfMeasure?: string
  }
  return (result.docs as unknown as ItemDoc[]).map((d) => ({
    productCode: String(d.itemNumber ?? d.id),
    productDescription: String(d.itemName ?? d.description ?? d.id),
    productType: d.productType ?? 'P',
    unitOfMeasure: d.unitOfMeasure,
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
  interface TaxCodeDoc {
    id: string | number
    taxType?: string
    taxCountryRegion?: string
    taxCode?: string
    description?: string
    taxPercentage?: number
    taxAmount?: number
    expirationDate?: string
  }
  return (result.docs as unknown as TaxCodeDoc[]).map((d) => ({
    taxType: String(d.taxType ?? 'IVA'),
    taxCountryRegion: String(d.taxCountryRegion ?? 'PT'),
    taxCode: String(d.taxCode ?? d.id),
    description: String(d.description ?? d.taxCode ?? '—'),
    taxPercentage: d.taxPercentage,
    taxAmount: d.taxAmount,
    taxExpirationDate: d.expirationDate,
  }))
}

export const buildMasterFiles = async (
  payload: Payload,
  tenantId: string | number,
): Promise<SafTMasterFiles> => ({
  generalLedgerAccounts: await buildGeneralLedgerAccounts(payload, tenantId),
  customers: await buildCustomers(payload, tenantId),
  suppliers: await buildSuppliers(payload, tenantId),
  products: await buildProducts(payload, tenantId),
  taxTable: await buildTaxTable(payload, tenantId),
})

// ─── 3. GeneralLedgerEntries ──────────────────────────────────────────

interface JournalEntryDoc {
  id: string | number
  entryNumber?: string
  entryDate?: string | Date
  description?: string
  status?: string
  sourceType?: string
  sourceId?: string
  createdAt?: string | Date
  postedAt?: string | Date
  lines?: Array<{
    accountId?: string
    debit?: number
    credit?: number
    description?: string
    customerId?: string
    supplierId?: string
  }>
}

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
  const docs = result.docs as unknown as JournalEntryDoc[]

  // Group docs by canonical journal id.
  const journalsMap = new Map<string, SafTTransaction[]>()
  let totalDebit = 0
  let totalCredit = 0

  for (const doc of docs) {
    const journalId = journalIdFor(doc.sourceType)
    const txDate =
      doc.entryDate instanceof Date
        ? doc.entryDate
        : new Date(doc.entryDate ?? doc.createdAt ?? new Date())
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
        accountID: String(l.accountId ?? '—'),
        systemEntryDate,
        debitCreditIndicator: debit > 0 ? 'D' : 'C',
        amount: { amount },
        description: l.description,
        customerID: l.customerId,
        supplierID: l.supplierId,
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

// ─── 4. SourceDocuments — follow-up slice ─────────────────────────────

/**
 * @todo follow-up — buildSourceDocuments(payload, tenantId, period) →
 *   SafTSourceDocuments. Walks invoices / payments / inventory-movements
 *   for the period. Country-specific extensions (saf-t-pt) layer the
 *   PT hash chain on top.
 */

// ─── Top-level orchestrator ───────────────────────────────────────────

export const buildAuditFile = async (
  payload: Payload,
  options: SafTExportOptions,
): Promise<SafTAuditFile> => ({
  header: buildHeader(options),
  masterFiles: await buildMasterFiles(payload, options.tenantId),
  generalLedgerEntries: await buildGeneralLedgerEntries(
    payload,
    options.tenantId,
    options.startDate,
    options.endDate,
  ),
})

// ─── XML serializer ────────────────────────────────────────────────────
//
// Renders a complete `SafTAuditFile` as XSD-validated XML in the OECD
// SAF-T 2.0 namespace. Country-specific extensions (saf-t-pt with PT
// 1.04 namespace + hash chain) override the namespace + add their own
// per-section renderers.

/** Escape the five XML predefined entities. */
export const escapeXml = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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
    // SourceDocuments left for follow-up slice.
  ]
    .filter(Boolean)
    .join('\n')

  return `${head}\n${sections}\n</AuditFile>`
}
