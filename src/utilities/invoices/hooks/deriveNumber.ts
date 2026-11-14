/**
 * Invoice number collapse — derive or validate on issuance (01a03ea0 priority #3).
 *
 * When `status` crosses into an issued/active set, `number` must collapse from
 * superposition (fiscal.unp · protocolNumber · tenant sequence). Frozen after
 * first assignment — EN-16931 BT-1 is immutable post-issue.
 *
 * @standard EN-16931:2017 BT-1 invoice-number
 * @audit ISO-19011:2018 audit-trail document-identity
 */
import type { CollectionBeforeValidateHook } from 'payload'

const ISSUED_STATUSES = new Set([
  'issued',
  'confirmed',
  'open',
  'active',
  'past_due',
  'grace_period',
  'paid',
  'complete',
])

interface InvoiceDoc {
  number?: unknown
  protocolNumber?: unknown
  status?: unknown
  tenant?: unknown
  fiscal?: { unp?: unknown; receiptNumber?: unknown }
  typeStatus?: { invoiceType?: unknown }
}

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined

const tenantOf = (d: InvoiceDoc): string | undefined => {
  const t = d.tenant
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'id' in t) {
    const id = (t as { id?: unknown }).id
    if (typeof id === 'string') return id
  }
  return undefined
}

/** Human-readable invoice number — INV-YYYY-NNN (receivable convention). */
export function formatInvoiceNumber(prefix: string, year: number, sequence: number): string {
  return `${prefix}-${year}-${String(sequence).padStart(3, '0')}`
}

/** Prefix from document type — invoice vs bill vs protocol. */
export function invoiceNumberPrefix(d: InvoiceDoc): string {
  const t = str(d.typeStatus?.invoiceType)
  switch (t) {
    case 'bill':
      return 'BILL'
    case 'protocol':
      return 'PROT'
    case 'credit_note':
      return 'CN'
    case 'debit_note':
      return 'DN'
    default:
      return 'INV'
  }
}

/** Bond-order collapse: explicit number → fiscal.unp → protocolNumber → null (allocate). */
export function deriveInvoiceNumberFromBonds(d: InvoiceDoc): string | undefined {
  return (
    str(d.number) ??
    str(d.fiscal?.unp) ??
    str(d.fiscal?.receiptNumber) ??
    str(d.protocolNumber)
  )
}

const parseSequence = (number: string, prefix: string, year: number): number | null => {
  const m = number.match(new RegExp(`^${prefix}-${year}-(\\d+)$`))
  if (!m?.[1]) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? n : null
}

/** Allocate next tenant-scoped sequence for the given prefix/year. */
export async function nextInvoiceSequence(
  req: Parameters<CollectionBeforeValidateHook>[0]['req'],
  tenant: string | undefined,
  prefix: string,
  year: number,
): Promise<number> {
  const prior = await req.payload.find({
    collection: 'invoices',
    where: {
      and: [
        { number: { like: `${prefix}-${year}-%` } },
        ...(tenant ? [{ tenant: { equals: tenant } }] : []),
      ],
    },
    sort: '-number',
    limit: 50,
    overrideAccess: true,
    req,
  })
  let max = 0
  for (const doc of prior.docs) {
    const seq = parseSequence(String((doc as InvoiceDoc).number ?? ''), prefix, year)
    if (seq !== null && seq > max) max = seq
  }
  return max + 1
}

export const deriveInvoiceNumber: CollectionBeforeValidateHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const d = data as InvoiceDoc
  const orig = originalDoc as InvoiceDoc | undefined
  const status = str(d.status) ?? str(orig?.status) ?? 'draft'
  const prevStatus = str(orig?.status) ?? 'draft'
  const wasIssued = ISSUED_STATUSES.has(prevStatus)
  const isIssued = ISSUED_STATUSES.has(status)

  if (!isIssued) return data

  const prevNumber = str(orig?.number)
  const incoming = str(d.number)

  if (operation === 'update' && wasIssued && prevNumber) {
    if (incoming && incoming !== prevNumber) {
      throw new Error(
        `Invoice number is frozen after issuance; '${prevNumber}' cannot become '${incoming}'.`,
      )
    }
    if (!incoming) d.number = prevNumber
    return data
  }

  const collapsed = deriveInvoiceNumberFromBonds(d) ?? prevNumber
  if (collapsed) {
    d.number = collapsed
    return data
  }

  const prefix = invoiceNumberPrefix(d)
  const year = new Date().getFullYear()
  const sequence = await nextInvoiceSequence(req, tenantOf(d), prefix, year)
  d.number = formatInvoiceNumber(prefix, year, sequence)
  return data
}
