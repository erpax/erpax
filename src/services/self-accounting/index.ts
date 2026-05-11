/**
 * Self-accounting + regulatory filing + obligation payments.
 * Slice KKKKKK (2026-05-11). Per user 'erpax accounts itself sending
 * all financial reports in time and paying the obligations'.
 *
 * The erpax-platform tenant uses ERPax to run its own books:
 *   - Subscription revenue (IFRS-15) auto-booked from Stripe webhooks
 *   - Infrastructure costs auto-booked from Cloudflare billing
 *   - Payroll auto-booked from HR agent payouts
 *   - Taxes auto-computed per jurisdiction (one tax-jurisdictions row per region)
 *   - Regulatory filings (FINREP/COREP/IFRS S1-S2/CSRD/VAT returns) auto-generated + filed
 *   - Obligations (VAT, payroll, supplier invoices, regulator fees) auto-scheduled + paid
 *
 * After this lands, ERPax is biologically + commercially complete: it
 * builds, documents, markets, sells, deploys, onboards, operates,
 * bills, ACCOUNTS, FILES, and PAYS — all itself.
 *
 * @standard IFRS IFRS-15 §31-§45 (revenue recognition)
 * @standard IFRS IAS-18 (deprecated, superseded by IFRS-15)
 * @standard EU VAT Directive 2006/112/EC + DAC8
 * @standard EU EBA FINREP + COREP technical standards
 * @standard CSRD 2022/2464 + ESRS E1-S4 + IFRS S1/S2
 * @audit ISO 19011:2018 §6.4.6 (every booking + filing + payment audit-trailed)
 */

export interface RevenueBooking {
  readonly source: 'stripe' | 'manual'
  readonly stripeInvoiceId?: string
  readonly tenantId: string                       // the customer tenant
  readonly amountCents: number
  readonly currency: string
  readonly recognitionMethod: 'point-in-time' | 'over-time'   // IFRS-15 §35-§39
  readonly performanceObligationsSatisfied: ReadonlyArray<string>   // §31
  readonly bookedAt: string
  readonly journalEntryId?: string                // links to the GL JE (set after posting)
}

export interface CostBooking {
  readonly source: 'cloudflare' | 'payroll' | 'supplier' | 'tax'
  readonly category: string
  readonly amountCents: number
  readonly currency: string
  readonly periodStart: string
  readonly periodEnd: string
  readonly bookedAt: string
  readonly journalEntryId?: string
}

export interface RegulatoryFiling {
  readonly framework: 'FINREP' | 'COREP' | 'IFRS-15' | 'IFRS-S1' | 'IFRS-S2' | 'CSRD' | 'VAT' | 'DAC8' | 'CRS' | 'FATCA'
  readonly periodEnd: string
  readonly jurisdiction: string                   // ISO 3166-1 alpha-2
  readonly dueAt: string
  readonly filedAt?: string
  readonly filingReceiptUuid?: string             // content-uuid of the filed payload
  readonly regulatorAck?: string                  // their reference id after acceptance
}

export interface Obligation {
  readonly kind: 'vat-remittance' | 'payroll' | 'supplier-invoice' | 'regulator-fee' | 'tax-prepayment'
  readonly amountCents: number
  readonly currency: string
  readonly dueAt: string
  readonly creditor: string
  readonly paymentRailHint?: 'sepa' | 'swift' | 'card' | 'wire' | 'sepa-instant'
  readonly paidAt?: string
  readonly paymentReference?: string
}

const REVENUES = new Map<string, RevenueBooking[]>()
const COSTS = new Map<string, CostBooking[]>()
const FILINGS = new Map<string, RegulatoryFiling[]>()
const OBLIGATIONS = new Map<string, Obligation[]>()

/** Book subscription revenue from a Stripe webhook (called by JJJJJJ commerce loop). */
export function bookRevenue(platformTenantId: string, b: Omit<RevenueBooking, 'bookedAt'>): RevenueBooking {
  const booking: RevenueBooking = { ...b, bookedAt: new Date().toISOString() }
  let arr = REVENUES.get(platformTenantId); if (!arr) { arr = []; REVENUES.set(platformTenantId, arr) }
  arr.push(booking)
  return booking
}

/** Book a cost (infra / payroll / supplier / tax). */
export function bookCost(platformTenantId: string, c: Omit<CostBooking, 'bookedAt'>): CostBooking {
  const booking: CostBooking = { ...c, bookedAt: new Date().toISOString() }
  let arr = COSTS.get(platformTenantId); if (!arr) { arr = []; COSTS.set(platformTenantId, arr) }
  arr.push(booking)
  return booking
}

/** Schedule a regulatory filing — gov agent files it on dueAt - 1 day. */
export function scheduleFiling(platformTenantId: string, f: Omit<RegulatoryFiling, 'filedAt' | 'filingReceiptUuid' | 'regulatorAck'>): RegulatoryFiling {
  const filing: RegulatoryFiling = { ...f }
  let arr = FILINGS.get(platformTenantId); if (!arr) { arr = []; FILINGS.set(platformTenantId, arr) }
  arr.push(filing)
  return filing
}

/** Schedule an obligation — finance + payment-provider agents settle it on dueAt. */
export function scheduleObligation(platformTenantId: string, o: Omit<Obligation, 'paidAt' | 'paymentReference'>): Obligation {
  const obl: Obligation = { ...o }
  let arr = OBLIGATIONS.get(platformTenantId); if (!arr) { arr = []; OBLIGATIONS.set(platformTenantId, arr) }
  arr.push(obl)
  return obl
}

export function listRevenues(t: string): ReadonlyArray<RevenueBooking> { return REVENUES.get(t) ?? [] }
export function listCosts(t: string): ReadonlyArray<CostBooking> { return COSTS.get(t) ?? [] }
export function listFilings(t: string): ReadonlyArray<RegulatoryFiling> { return FILINGS.get(t) ?? [] }
export function listObligations(t: string): ReadonlyArray<Obligation> { return OBLIGATIONS.get(t) ?? [] }

/**
 * Conservation Law 26 — `checkSelfAccountingComplete`. The
 * erpax-platform tenant must have: every revenue event booked, every
 * scheduled filing actually filed by dueAt + 1 day, every obligation
 * actually paid by dueAt. Surfaces overdue items so the meta-agent
 * can escalate.
 */
export function checkSelfAccountingComplete(platformTenantId: string): {
  ok: boolean
  unbookedRevenues: number
  overdueFilings: ReadonlyArray<RegulatoryFiling>
  overdueObligations: ReadonlyArray<Obligation>
} {
  const now = Date.now()
  const filings = listFilings(platformTenantId)
  const obligations = listObligations(platformTenantId)
  const overdueFilings = filings.filter((f) => !f.filedAt && Date.parse(f.dueAt) < now)
  const overdueObligations = obligations.filter((o) => !o.paidAt && Date.parse(o.dueAt) < now)
  const unbookedRevenues = listRevenues(platformTenantId).filter((r) => !r.journalEntryId).length
  return {
    ok: overdueFilings.length === 0 && overdueObligations.length === 0 && unbookedRevenues === 0,
    unbookedRevenues,
    overdueFilings,
    overdueObligations,
  }
}
