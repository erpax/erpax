/**
 * GL hook event emission — regression for the Slice FFF phantom-method bug.
 *
 * The previous hook implementations called `glPostingService.postInvoice(...)`
 * etc. — methods that never existed on `GLPostingService`. The wrapping
 * try/catch swallowed the resulting TypeError, so JEs were never posted.
 *
 * The canonical pattern (per docs/adr/0001-event-driven-gl-posting.md) is
 * for hooks to EMIT a domain event via eventEmitter; glPostingService is
 * one of the subscribers. This spec asserts the four transaction hooks
 * emit the right event on the right state transition.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @audit ISO-19011:2018 audit-trail event-driven-posting
 * @compliance SOX §404 internal-controls
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { invoiceAccountingHook } from './invoice.hook'
import { billAccountingHook } from './bill.hook'
import { paymentAccountingHook } from './payment.hook'
import { eventEmitter } from '@/services/event-emitter.service'
import type { AllDomainEvents } from '@/types/events'

const baseReq = (): Record<string, unknown> => ({
  user: { id: 'user-1' },
  payload: {
    logger: {
      info: (): void => {},
      warn: (): void => {},
      error: (): void => {},
    },
  },
})

/** Invoke an afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type AfterChangeArgs = Parameters<typeof invoiceAccountingHook>[0]
const runHook = (hook: (a: AfterChangeArgs) => unknown, args: Partial<AfterChangeArgs>) =>
  hook(args as AfterChangeArgs)

describe('GL hooks — event emission regression', () => {
  let captured: AllDomainEvents[] = []

  beforeEach(() => {
    captured = []
    // Subscribe a generic capturer to every event type we test.
    for (const t of [
      'invoice:activated',
      'bill:activated',
      'payment:received',
      'payment:sent',
    ]) {
      eventEmitter.subscribe(t, async (e) => {
        captured.push(e as AllDomainEvents)
      })
    }
  })

  it('invoice hook emits invoice:activated on draft → issued', async () => {
    await runHook(invoiceAccountingHook, {
      doc: {
        id: 'inv-1',
        invoiceNumber: 'INV-001',
        tenant: 'tenant-1',
        status: 'issued',
        invoiceDate: '2026-05-09',
        currency: 'EUR',
        totalAmount: 1_000,
        taxAmount: 200,
        customerId: 'cust-1',
        lineItems: [
          {
            id: 'l1',
            description: 'widget',
            quantity: 10,
            unitPrice: 100,
            amount: 1_000,
            costAmount: 600,
            category: 'goods',
          },
        ],
      },
      previousDoc: { id: 'inv-1', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const ev = captured.find((e) => e.eventType === 'invoice:activated')
    expect(ev).toBeDefined()
    expect(ev?.tenantId).toBe('tenant-1')
    expect((ev as { payload: { invoiceId: string } }).payload.invoiceId).toBe(
      'inv-1',
    )
    expect(
      (ev as { payload: { lineItems: unknown[] } }).payload.lineItems,
    ).toHaveLength(1)
  })

  it('invoice hook does NOT emit on draft (status not in active set)', async () => {
    await runHook(invoiceAccountingHook, {
      doc: {
        id: 'inv-2',
        tenant: 'tenant-1',
        status: 'draft',
        currency: 'EUR',
        totalAmount: 1_000,
      },
      operation: 'create',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(
      captured.filter((e) => e.eventType === 'invoice:activated'),
    ).toHaveLength(0)
  })

  it('bill hook emits bill:activated on draft → approved', async () => {
    await runHook(billAccountingHook, {
      doc: {
        id: 'bill-1',
        tenant: 'tenant-1',
        billNumber: 'B-001',
        status: 'approved',
        billDate: '2026-05-09',
        currency: 'EUR',
        totalAmount: 500,
        taxAmount: 100,
        vendorId: 'vendor-1',
        lineItems: [
          {
            id: 'l1',
            description: 'service',
            quantity: 1,
            unitPrice: 500,
            amount: 500,
            expenseCategory: 'professional_services',
          },
        ],
      },
      previousDoc: { id: 'bill-1', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const ev = captured.find((e) => e.eventType === 'bill:activated')
    expect(ev).toBeDefined()
    expect((ev as { payload: { billId: string } }).payload.billId).toBe('bill-1')
  })

  it('payment hook emits payment:received for incoming AR collection', async () => {
    await runHook(paymentAccountingHook, {
      doc: {
        id: 'pay-1',
        tenant: 'tenant-1',
        paymentNumber: 'P-001',
        paymentType: 'incoming',
        partyId: 'cust-1',
        amount: 1_200,
        currency: 'EUR',
        paymentMethod: 'bank_transfer',
        paymentDate: '2026-05-09',
      },
      operation: 'create',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const ev = captured.find((e) => e.eventType === 'payment:received')
    expect(ev).toBeDefined()
    expect((ev as { payload: { amount: number } }).payload.amount).toBe(1_200)
  })

  it('payment hook emits payment:sent for outgoing AP disbursement', async () => {
    await runHook(paymentAccountingHook, {
      doc: {
        id: 'pay-2',
        tenant: 'tenant-1',
        paymentNumber: 'P-002',
        paymentType: 'outgoing',
        partyId: 'vendor-1',
        amount: 500,
        currency: 'EUR',
        paymentMethod: 'wire',
        paymentDate: '2026-05-09',
      },
      operation: 'create',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const ev = captured.find((e) => e.eventType === 'payment:sent')
    expect(ev).toBeDefined()
    expect((ev as { payload: { paymentId: string } }).payload.paymentId).toBe(
      'pay-2',
    )
  })
})
