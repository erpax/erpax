/**
 * Payment GL Posting Hook — emits `payment:received` (AR collection) or
 * `payment:sent` (AP disbursement) so glPostingService books the
 * canonical cash-movement entry:
 *
 *   payment:received   Dr Cash               amount
 *                        Cr Accounts Receivable amount
 *   payment:sent       Dr Accounts Payable    amount
 *                        Cr Cash                amount
 *
 * Replaces the phantom-method `glPostingService.postPayment(tenant, data)`
 * call (no such method on `GLPostingService` — it's an event subscriber).
 * Direction is inferred from `paymentType` (`incoming|received` → AR,
 * `outgoing|sent` → AP); falls back to `partyType` when ambiguous.
 *
 * Fires only on `create` — once a payment is recorded it shouldn't be
 * mutated (reversals are separate documents).
 *
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.1
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'
import { eventEmitter } from '@/services/event-emitter.service'
import type {
  PaymentReceivedEvent,
  PaymentSentEvent,
} from '@/types/events'

const inferDirection = (
  doc: Record<string, unknown>,
): 'received' | 'sent' | null => {
  const type = String(doc.paymentType ?? doc.direction ?? '').toLowerCase()
  if (
    type === 'incoming' ||
    type === 'received' ||
    type === 'inbound' ||
    type === 'collection' ||
    type === 'ar'
  ) {
    return 'received'
  }
  if (
    type === 'outgoing' ||
    type === 'sent' ||
    type === 'outbound' ||
    type === 'disbursement' ||
    type === 'ap'
  ) {
    return 'sent'
  }
  // Fallback: party type. Customer payment = received, vendor = sent.
  const partyType = String(doc.partyType ?? '').toLowerCase()
  if (partyType === 'customer') return 'received'
  if (partyType === 'vendor' || partyType === 'supplier') return 'sent'
  return null
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

    const base = {
      eventId: uuid(),
      tenantId: String(tenant),
      aggregateId: String(doc.id),
      aggregateType: 'payment' as const,
      timestamp: new Date(),
      userId: String(userId),
    }
    const amount = Number(doc.amount ?? 0)
    const paymentDate = new Date(
      (doc.paymentDate ?? new Date()) as string | Date,
    )
    const currencyCode = String(doc.currency ?? 'EUR')
    const paymentMethod = String(doc.paymentMethod ?? doc.method ?? 'unknown')
    const referenceNumber = doc.referenceNumber
      ? String(doc.referenceNumber)
      : undefined

    if (direction === 'received') {
      const event: PaymentReceivedEvent = {
        ...base,
        eventType: 'payment:received',
        payload: {
          paymentId: String(doc.id),
          customerId: doc.partyId ? String(doc.partyId) : undefined,
          amount,
          paymentMethod,
          paymentDate,
          currencyCode,
          referenceNumber,
          invoiceId: doc.invoiceId ? String(doc.invoiceId) : undefined,
        },
      }
      await eventEmitter.emit(event)
    } else {
      const event: PaymentSentEvent = {
        ...base,
        eventType: 'payment:sent',
        payload: {
          paymentId: String(doc.id),
          vendorId: doc.partyId ? String(doc.partyId) : undefined,
          amount,
          paymentMethod,
          paymentDate,
          currencyCode,
          referenceNumber,
          billId: doc.billId ? String(doc.billId) : undefined,
        },
      }
      await eventEmitter.emit(event)
    }

    req.payload.logger.info(
      `✓ payment:${direction} emitted for ${doc.paymentNumber ?? doc.id}`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting payment event for ${doc.id}:`,
    )
  }

  return doc
}
