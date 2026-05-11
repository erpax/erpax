/**
 * Multi-invoice payment allocation — canonical seed (Slice RRRR, YYYY rewrite).
 *
 * Customer settles 3 invoices in one wire. PaymentAllocations is the
 * 1:N bridge — Σ(allocations.allocatedAmount) must equal payment.amount,
 * and each invoice individually transitions to `completed` when its
 * allocation fully settles it.
 *
 * Real-world coverage: B2B customer pays an open AR balance covering
 * Q1 invoices in one transfer. SOX §404 TOM-AR-02 walks Σ(allocations)
 * → payment.amount and asserts each invoice's status reflects its
 * own settlement.
 *
 * @standard SOX §404 TOM-AR-02
 * @standard IFRS-15 §47 transaction-price-allocation
 * @standard IAS-7 §6 cash-flow-classification
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const INV_AMOUNTS = [400_00, 350_00, 250_00] as const  // Σ = €1000
const TOTAL = INV_AMOUNTS.reduce((s, x) => s + x, 0)

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 Multi-Inv Street', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const activate = (idx: 0 | 1 | 2): ChainStepImpl => async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const inv = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `MULTI-INV-${idx + 1}-${ts()}`,
      typeStatus: { invoiceType: 'invoice', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: INV_AMOUNTS[idx],
        netTotal: INV_AMOUNTS[idx],
        taxTotal: 0,
        totalAmount: INV_AMOUNTS[idx],
        totalDue: INV_AMOUNTS[idx],
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state[`invoice${idx + 1}Id`] = inv.id
  return 'invoice:activated'
}

const receiveBulk: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const pmt = await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `MULTI-PMT-${ts()}`,
      paymentKind: 'received',
      status: 'received',
      // Bulk wire — invoice FK left null at the parent level; per-allocation
      // rows in payment-allocations carry the per-invoice link.
      invoice: state.invoice1Id,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: TOTAL, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.paymentId = pmt.id
  return 'payment:received'
}

const allocate = (idx: 0 | 1 | 2): ChainStepImpl => async (payload, ctx, state) => {
  await payload.create({
    collection: 'payment-allocations',
    data: {
      tenant: ctx.tenantId,
      reference: `ALLOC-${idx + 1}-${ts()}`,
      payment: state.paymentId,
      targetType: 'invoice',
      invoice: state[`invoice${idx + 1}Id`],
      allocationDate: new Date().toISOString(),
      allocatedAmount: INV_AMOUNTS[idx],
      isFullySettling: true,
      allocationKind: 'manual',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'allocation:posted'
}

const complete = (idx: 0 | 1 | 2): ChainStepImpl => async (payload, ctx, state) => {
  await payload.update({
    collection: 'invoices',
    id: state[`invoice${idx + 1}Id`] as string,
    data: { status: 'paid' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'invoice:completed'
}

export const multiInvoicePaymentAllocationImpls: ChainImpls = [
  activate(0), activate(1), activate(2),
  receiveBulk,
  allocate(0), allocate(1), allocate(2),
  complete(0), complete(1), complete(2),
]
