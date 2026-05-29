/**
 * Payment GL Posting Hook — emits `payment:received` (AR collection) or
 * `payment:sent` (AP disbursement) so glPostingService books the
 * canonical cash-movement entry, AND emits the matching
 * `invoice:completed` / `bill:paid` follow-up when the payment closes
 * the related document.
 *
 *   payment:received   Dr Cash               amount
 *                        Cr Accounts Receivable amount
 *   payment:sent       Dr Accounts Payable    amount
 *                        Cr Cash                amount
 *
 *   When `invoice` FK is set AND total of payments for that invoice
 *   reaches `invoice.amounts.totalAmount`, ALSO emit `invoice:completed`.
 *
 * Slice LLL (2026-05-10): added the invoice/bill follow-up emissions
 * via the new `emitDomainEvent` helper so the try/catch boilerplate
 * stays in one place.
 *
 * Slice YYYY (2026-05-10): rewrote against canonical Payments+Invoices
 * paths. `paymentKind` (top-level) drives direction; `amounts.amount`,
 * `amounts.currencyCode`, `dates.{sentAt,receivedAt}` for payments;
 * `amounts.totalAmount`, `number` for invoices. Bills are stored on
 * `invoices` with `typeStatus.invoiceType: 'bill'`; the invoice FK
 * resolves the same way. `billId` aggregate identifier removed
 * (one canonical FK only).
 *
 * Fires only on `create` — once a payment is recorded it shouldn't be
 * mutated (reversals are separate documents).
 *
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers settlement
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.1
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'
import { eventEmitter } from '@/services/event-emitter.service'
import { emitDomainEvent } from '@/services/emit-domain-event'
import type {
  PaymentReceivedEvent,
  PaymentSentEvent,
  InvoiceCompletedEvent,
  BillPaidEvent,
} from '@/types/events'

const inferDirection = (
  doc: Record<string, unknown>,
): 'received' | 'sent' | null => {
  // YYYY: canonical schema has top-level `paymentKind` (required). Trust it.
  const k = String(doc.paymentKind ?? '').toLowerCase()
  if (k === 'received') return 'received'
  if (k === 'sent') return 'sent'
  return null
}

/**
 * Returns the total of all payments recorded against an invoice id for
 * the tenant. Used to detect "this payment closes the doc" transitions.
 * YYYY: queries the canonical `invoice` FK (was the invented
 * `invoiceId`/`billId` fields).
 */
async function sumPaymentsAgainst(
  req: PayloadRequest,
  tenantId: string,
  invoiceId: string,
): Promise<number> {
  const { docs } = await req.payload.find({
    collection: 'payments',
    limit: 10000,
    depth: 0,
    overrideAccess: true,
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { invoice: { equals: invoiceId } },
      ],
    },
  })
  return (docs as Array<{ amounts?: { amount?: number } }>).reduce(
    (sum, p) => sum + Number(p.amounts?.amount ?? 0),
    0,
  )
}

export const paymentAccountingHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (!doc || operation !== 'create') return doc

  try {
    const tenant =
      typeof doc.tenant === 'object' && doc.tenant !== null
        ? (doc.tenant as { id?: string }).id
        : doc.tenant
    const userId = req.user?.id
    if (!tenant || !userId) return doc

    const direction = inferDirection(doc as Record<string, unknown>)
    if (!direction) {
      req.payload.logger.warn(
        `payment ${doc.id}: cannot infer direction; skipping GL post`,
      )
      return doc
    }

    const tenantId = String(tenant)
    const userIdStr = String(userId)
    const base = {
      eventId: uuid(),
      tenantId,
      aggregateId: String((doc as { uuid?: unknown }).uuid ?? doc.id),
      aggregateType: 'payment' as const,
      timestamp: new Date(),
      userId: userIdStr,
    }
    const amounts = (doc.amounts ?? {}) as { amount?: number; currencyCode?: string }
    const dates = (doc.dates ?? {}) as { sentAt?: string | Date; receivedAt?: string | Date }
    const paymentSubgroup = (doc.payment ?? {}) as { paymentMethod?: string }
    const amount = Number(amounts.amount ?? 0)
    const paymentDate = new Date(
      (dates.receivedAt ?? dates.sentAt ?? new Date()) as string | Date,
    )
    const currencyCode = String(amounts.currencyCode ?? 'EUR')
    const paymentMethod = String(paymentSubgroup.paymentMethod ?? 'unknown')
    const invoiceFk = doc.invoice
    const invoiceId = invoiceFk
      ? String(typeof invoiceFk === 'object' ? (invoiceFk as { id?: string }).id : invoiceFk)
      : null

    if (direction === 'received') {
      const event: PaymentReceivedEvent = {
        ...base,
        eventType: 'payment:received',
        payload: {
          paymentId: String(doc.id),
          amount,
          paymentMethod,
          paymentDate,
          currencyCode,
          invoiceId: invoiceId ?? undefined,
        },
      }
      await eventEmitter.emit(event)

      // Slice LLL: when this payment closes the invoice, fire the
      // follow-up `invoice:completed` event so glPostingService books
      // the AR-reduction entry. The hook re-queries the invoice's
      // totalAmount + sums all payments to date — only fires once
      // (when the running total first crosses totalAmount).
      if (invoiceId) {
        try {
          const invoice = (await req.payload.findByID({
            collection: 'invoices',
            id: invoiceId,
            depth: 0,
            overrideAccess: true,
          })) as { amounts?: { totalAmount?: number }; number?: string; typeStatus?: { invoiceType?: string } } | null
          const invoiceTotal = Number(invoice?.amounts?.totalAmount ?? 0)
          if (invoiceTotal > 0) {
            const paid = await sumPaymentsAgainst(req, tenantId, invoiceId)
            const wasPaidBefore = paid - amount >= invoiceTotal - 0.005
            const isPaidNow = paid >= invoiceTotal - 0.005
            if (!wasPaidBefore && isPaidNow) {
              const completed: InvoiceCompletedEvent = {
                eventId: uuid(),
                eventType: 'invoice:completed',
                tenantId,
                aggregateId: invoiceId,
                aggregateType: 'invoice',
                timestamp: new Date(),
                userId: userIdStr,
                payload: {
                  invoiceId,
                  amountPaid: paid,
                  paymentDate,
                  paymentMethod,
                  currencyCode,
                },
              }
              await emitDomainEvent(req, completed, String(invoice?.number ?? invoiceId))
            }
          }
        } catch (error) {
          req.payload.logger.warn(
            { err: error },
            `payment ${doc.id}: could not check invoice ${invoiceId} completion state`,
          )
        }
      }
    } else {
      const event: PaymentSentEvent = {
        ...base,
        eventType: 'payment:sent',
        payload: {
          paymentId: String(doc.id),
          amount,
          paymentMethod,
          paymentDate,
          currencyCode,
          billId: invoiceId ?? undefined,
        },
      }
      await eventEmitter.emit(event)

      // Slice LLL: symmetric `bill:paid` follow-up on the AP side.
      // Bills are stored on the same `invoices` collection with
      // `typeStatus.invoiceType: 'bill'` — see Invoices/index.ts.
      if (invoiceId) {
        try {
          const bill = (await req.payload.findByID({
            collection: 'invoices',
            id: invoiceId,
            depth: 0,
            overrideAccess: true,
          })) as { amounts?: { totalAmount?: number }; number?: string } | null
          const billTotal = Number(bill?.amounts?.totalAmount ?? 0)
          if (billTotal > 0) {
            const paid = await sumPaymentsAgainst(req, tenantId, invoiceId)
            const wasPaidBefore = paid - amount >= billTotal - 0.005
            const isPaidNow = paid >= billTotal - 0.005
            if (!wasPaidBefore && isPaidNow) {
              const billPaid: BillPaidEvent = {
                eventId: uuid(),
                eventType: 'bill:paid',
                tenantId,
                aggregateId: invoiceId,
                aggregateType: 'bill',
                timestamp: new Date(),
                userId: userIdStr,
                payload: {
                  billId: invoiceId,
                  amountPaid: paid,
                  paymentDate,
                  paymentMethod,
                  currencyCode,
                },
              }
              await emitDomainEvent(req, billPaid, String(bill?.number ?? invoiceId))
            }
          }
        } catch (error) {
          req.payload.logger.warn(
            { err: error },
            `payment ${doc.id}: could not check bill ${invoiceId} settlement state`,
          )
        }
      }
    }

    req.payload.logger.info(
      `✓ payment:${direction} emitted for ${doc.transactionNumber ?? doc.id}`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting payment event for ${doc.id}:`,
    )
  }

  return doc
}
