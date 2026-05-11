/**
 * P2P 3-way match — canonical seed implementation.
 *
 * Slice KKKK (2026-05-10): 10-step happy-path PR → RFQ → PO → GR → Bill
 *  → 3WayMatch → Payment. Each step impl is one async fn that creates
 * the row + emits the declared event. The chain runner sequences them
 * and asserts the prerequisites + GL invariants.
 *
 * @standard SOX §404 P2P-01 three-way-match
 * @standard ISO 27002 §5.4 segregation-of-duties (requisitioner ≠ approver)
 * @accounting IAS-2 §10 cost-of-purchase
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const REQUESTED_QTY = 10
const UNIT_PRICE_CENTS = 25_00
const LINE_TOTAL_CENTS = REQUESTED_QTY * UNIT_PRICE_CENTS // 25_000 cents = €250

const submit: ChainStepImpl = async (payload, ctx, state) => {
  const pr = await payload.create({
    collection: 'purchase-requisitions',
    data: {
      tenant: ctx.tenantId,
      requisitionNumber: `PR-CHAIN-${Date.now()}`,
      requisitioner: ctx.userId,
      requestedDate: new Date().toISOString(),
      businessJustification: 'Chain test — P2P 3-way match',
      lines: [{
        description: 'Test widget',
        quantity: REQUESTED_QTY,
        uom: 'EA',
        estimatedUnitPrice: UNIT_PRICE_CENTS,
        estimatedAmount: LINE_TOTAL_CENTS,
      }],
      currency: 'EUR',
      estimatedTotal: LINE_TOTAL_CENTS,
      status: 'submitted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.purchaseRequisitionId = pr.id
  return 'pr:submitted'
}

const approve: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'purchase-requisitions',
    id: state.purchaseRequisitionId as string,
    data: { status: 'approved' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'pr:approved'
}

const receiveQuote: ChainStepImpl = async (payload, ctx, state) => {
  const vq = await payload.create({
    collection: 'vendor-quotes',
    data: {
      tenant: ctx.tenantId,
      quoteNumber: `VQ-CHAIN-${Date.now()}`,
      vendor: ctx.vendorId,
      requisition: state.purchaseRequisitionId,
      quoteReceivedDate: new Date().toISOString(),
      lines: [{
        description: 'Test widget',
        quantity: REQUESTED_QTY,
        uom: 'EA',
        unitPrice: UNIT_PRICE_CENTS,
        lineTotal: LINE_TOTAL_CENTS,
        leadTimeDays: 7,
      }],
      currency: 'EUR',
      totalAmount: LINE_TOTAL_CENTS,
      paymentTerms: 'Net 30',
      status: 'received',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.vendorQuoteId = vq.id
  return 'rfq:received'
}

const award: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'vendor-quotes',
    id: state.vendorQuoteId as string,
    data: {
      isAwarded: true,
      awardedDate: new Date().toISOString(),
      awardRationale: 'Chain test — single-vendor award',
      status: 'awarded',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'rfq:awarded'
}

const createPO: ChainStepImpl = async (payload, ctx, state) => {
  const po = await payload.create({
    collection: 'purchase-orders',
    data: {
      tenant: ctx.tenantId,
      poNumber: `PO-CHAIN-${Date.now()}`,
      vendor: ctx.vendorId,
      orderDate: new Date().toISOString(),
      lines: [{
        lineNumber: 1,
        description: 'Test widget',
        quantity: REQUESTED_QTY,
        unitPrice: UNIT_PRICE_CENTS,
      }],
      currency: 'EUR',
      taxAmount: 0,
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.purchaseOrderId = po.id
  return 'po:created'
}

const postGoodsReceipt: ChainStepImpl = async (payload, ctx, state) => {
  const gr = await payload.create({
    collection: 'goods-receipts',
    data: {
      tenant: ctx.tenantId,
      receiptNumber: `GR-CHAIN-${Date.now()}`,
      purchaseOrder: state.purchaseOrderId,
      receivedDate: new Date().toISOString(),
      lines: [{
        description: 'Test widget',
        quantityReceived: REQUESTED_QTY,
        quantityDamaged: 0,
        condition: 'good',
      }],
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.goodsReceiptId = gr.id
  return 'gr:posted'
}

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 P2P Street', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const activateBill: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const bill = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `BILL-CHAIN-${Date.now()}`,
      typeStatus: { invoiceType: 'bill', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      // Bill = AP: vendor is the seller, our tenant address is the buyer.
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: LINE_TOTAL_CENTS,
        netTotal: LINE_TOTAL_CENTS,
        taxTotal: 0,
        totalAmount: LINE_TOTAL_CENTS,
        totalDue: LINE_TOTAL_CENTS,
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.billId = bill.id
  return 'bill:activated'
}

const threeWayMatch: ChainStepImpl = async (payload, ctx, state) => {
  // 3-way match: PO.totalAmount == GR-line total == Bill.amounts.totalAmount.
  // In production this would be a hook-emitted event; here we just
  // assert + emit declaratively.
  const [po, gr, bill] = await Promise.all([
    payload.findByID({ collection: 'purchase-orders',  id: state.purchaseOrderId as string,  overrideAccess: true }),
    payload.findByID({ collection: 'goods-receipts',   id: state.goodsReceiptId as string,   overrideAccess: true }),
    payload.findByID({ collection: 'invoices',         id: state.billId as string,           overrideAccess: true }),
  ]) as unknown as Array<Record<string, unknown>>
  const poTotal   = (po as { totalAmount?: number }).totalAmount   ?? 0
  const billTotal = ((bill as { amounts?: { totalAmount?: number } }).amounts?.totalAmount) ?? 0
  const grLines = (gr as { lines?: Array<{ quantityReceived?: number }> }).lines ?? []
  const grQty = grLines.reduce((sum, l) => sum + (l.quantityReceived ?? 0), 0)
  if (poTotal !== billTotal) throw new Error(`po_bill_mismatch: po=${poTotal} bill=${billTotal}`)
  if (grQty !== REQUESTED_QTY) throw new Error(`gr_qty_mismatch: gr=${grQty} expected=${REQUESTED_QTY}`)
  return 'bill:matched'
}

const sendPayment: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const payment = await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `PMT-CHAIN-${Date.now()}`,
      paymentKind: 'sent',
      status: 'sent',
      invoice: state.billId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: LINE_TOTAL_CENTS, currencyCode: 'EUR' },
      dates: { sentAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.paymentId = payment.id
  return 'payment:sent'
}

const markBillPaid: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'invoices',
    id: state.billId as string,
    data: { status: 'paid' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'bill:paid'
}

export const p2pThreeWayMatchImpls: ChainImpls = [
  submit, approve, receiveQuote, award, createPO,
  postGoodsReceipt, activateBill, threeWayMatch, sendPayment, markBillPaid,
]
