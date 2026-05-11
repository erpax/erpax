/**
 * O2C goods — canonical seed (Slice NNNN cut-3, Slice XXXX rewrite).
 *
 * Lead → Opp won → Quote → Contract → Shipment → Delivered →
 * Invoice activated → Payment received → Invoice completed.
 *
 * XXXX (2026-05-10): rewritten against the REAL schemas surfaced by
 * `checkChainSeedFieldsExistOnCollections`:
 *   - Quotes / Contracts / Shipments use `customer/shipToAddress` →
 *     ecommerce-plugin **addresses** (NOT `customers`). We seed an
 *     inline address fixture so the FKs resolve.
 *   - Quotes requires `lines` (array minRows 1) with description /
 *     quantity / unitPrice; `issueDate` is invented — schema uses
 *     `issuedAt` (readOnly, set by hook on status='sent').
 *   - Contracts requires `title` + `effectiveFrom` + `totalValue`
 *     (NOT `effectiveDate` / `totalAmount`).
 *   - Shipments requires `order` + `shipToAddress`; we seed an inline
 *     order fixture. `shipDate` is invented — schema uses `shippedAt`
 *     (readOnly, set on status='shipped').
 *   - TrackingEvents uses `eventCode` (NOT `eventType`); has no `status`.
 *
 * @standard IFRS-15 §38 point-in-time-control-transfer
 * @standard INCOTERMS 2020 (delivered = control transfer for DDP/DAP/DPU)
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const TOTAL_CENTS = 1_000_00 // €1000

const qualifyLead: ChainStepImpl = async (payload, ctx, state) => {
  const lead = await payload.create({
    collection: 'leads',
    data: {
      tenant: ctx.tenantId,
      fullName: `Chain Lead ${ts()}`,
      companyName: `Chain Co ${ts()}`,
      email: `lead-${ts()}@chain.test`,
      leadSource: 'website_form',
      status: 'sql',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.leadId = lead.id
  return 'lead:qualified'
}

const winOpp: ChainStepImpl = async (payload, ctx, state) => {
  const opp = await payload.create({
    collection: 'opportunities',
    data: {
      tenant: ctx.tenantId,
      name: `Chain Deal ${ts()}`,
      lead: state.leadId,
      customer: ctx.customerId,
      opportunityOwner: ctx.userId,
      stage: 'closed_won',
      probability: 100,
      currency: 'EUR',
      amount: TOTAL_CENTS,
      weightedAmount: TOTAL_CENTS,
      expectedCloseDate: new Date().toISOString(),
      status: 'won',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.opportunityId = opp.id
  return 'opp:won'
}

/** Inline ecommerce-plugin Address fixture (Quotes / Contracts / Shipments FK). */
const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const addr = await payload.create({
    collection: 'addresses',
    data: {
      tenant: ctx.tenantId,
      addressLine1: '1 Chain Test Street',
      city: 'Sofia',
      postalCode: '1000',
      country: 'BG',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = addr.id
  return addr.id
}

const sendQuote: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const quote = await payload.create({
    collection: 'quotes',
    data: {
      tenant: ctx.tenantId,
      quoteNumber: `Q-${ts()}`,
      customer: addressId,
      expiresAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      lines: [{
        description: 'Chain test goods',
        quantity: 1,
        unitPrice: TOTAL_CENTS,
      }],
      taxAmount: 0,
      currency: 'EUR',
      status: 'sent',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.quoteId = quote.id
  return 'quote:sent'
}

const signContract: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const ctr = await payload.create({
    collection: 'contracts',
    data: {
      tenant: ctx.tenantId,
      contractNumber: `CTR-${ts()}`,
      customer: addressId,
      title: 'Chain test goods supply contract',
      effectiveFrom: new Date().toISOString(),
      currency: 'EUR',
      totalValue: TOTAL_CENTS,
      transactionPriceFixed: TOTAL_CENTS,
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.contractId = ctr.id
  return 'contract:signed'
}

/** Inline ecommerce-plugin Order fixture (Shipments FK). */
const ensureOrder = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.orderId) return state.orderId as string
  const order = await payload.create({
    collection: 'orders',
    data: {
      tenant: ctx.tenantId,
      amount: TOTAL_CENTS,
      currency: 'EUR',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.orderId = order.id
  return order.id
}

const dispatch: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const orderId = await ensureOrder(payload, ctx, state)
  const sh = await payload.create({
    collection: 'shipments',
    data: {
      tenant: ctx.tenantId,
      shipmentNumber: `SHP-${ts()}`,
      order: orderId,
      shipToAddress: addressId,
      carrier: 'speedy',
      status: 'shipped',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.shipmentId = sh.id
  return 'shipment:dispatched'
}

const deliver: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'tracking-events',
    data: {
      tenant: ctx.tenantId,
      shipment: state.shipmentId,
      eventCode: 'delivered',
      eventTime: new Date().toISOString(),
      location: 'Sofia BG-1000',
      locationCountry: 'BG',
      eventSource: 'manual',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'shipment:delivered'
}

const activateInvoice: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const inv = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `INV-${ts()}`,
      typeStatus: { invoiceType: 'invoice', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: TOTAL_CENTS,
        netTotal: TOTAL_CENTS,
        taxTotal: 0,
        totalAmount: TOTAL_CENTS,
        totalDue: TOTAL_CENTS,
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.invoiceId = inv.id
  return 'invoice:activated'
}

const receivePayment: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `PMT-${ts()}`,
      paymentKind: 'received',
      status: 'received',
      invoice: state.invoiceId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: TOTAL_CENTS, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'payment:received'
}

const completeInvoice: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'invoices',
    id: state.invoiceId as string,
    data: { status: 'paid' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'invoice:completed'
}

export const o2cGoodsImpls: ChainImpls = [
  qualifyLead, winOpp, sendQuote, signContract,
  dispatch, deliver, activateInvoice, receivePayment, completeInvoice,
]
