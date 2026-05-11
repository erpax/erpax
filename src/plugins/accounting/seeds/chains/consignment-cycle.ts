/**
 * # Consignment cycle — canonical seed (Slice ZZZZ + CCCCC-pilot)
 *
 * Arrangement signed → goods shipped to consignee → on-hand opened →
 * consignee reports sale → consignor invoices consignee → payment received.
 *
 * Demonstrates the IFRS-15 §B77-B78 consignment model: control does NOT
 * transfer on physical shipment to consignee; revenue defers until the
 * consignee reports a sale to the end-customer (the §B78 control event).
 *
 * ## Chain orchestration (CCCCC vocabulary — pilot)
 *
 * @chain CONSIGNMENT_CYCLE step 1-of-6 — collection=consignment-arrangements action=sign — Sign master arrangement (consignor + consignee + commission %)
 * @chain CONSIGNMENT_CYCLE step 2-of-6 — collection=inventory-movements action=ship-to-consignee — Ship to consignee (NO revenue yet)
 * @chain CONSIGNMENT_CYCLE step 3-of-6 — collection=consignment-inventory action=open-balance — Open on-hand balance row at consignee location
 * @chain CONSIGNMENT_CYCLE step 4-of-6 — collection=consignment-sales action=report-sale — Consignee reports sale (control transfers per IFRS-15 §B78)
 * @chain CONSIGNMENT_CYCLE step 5-of-6 — collection=invoices action=invoice-consignee — Invoice the consignee for the net amount
 * @chain CONSIGNMENT_CYCLE step 6-of-6 — collection=payments action=receive-payment — Receive payment from consignee
 *
 * @emits consignment:arranged   — fired by step 1; payload { arrangementId, consigneeId, currency }
 * @emits inventory:issued       — fired by step 2; payload { movementId, qty, unitCost }
 * @emits consignment:on-hand    — fired by step 3; payload { lineId, qtyOnHand, valueOnHand }
 * @emits consignment:sold       — fired by step 4; triggers GL handler for revenue + COGS + commission
 * @emits invoice:activated      — fired by step 5; AR row created for the net amount
 * @emits payment:received       — fired by step 6; cash booked, AR cleared
 *
 * @feature consignment_inventory — gates the entire consignment block (business+ tier)
 *
 * @standard IFRS IFRS-15 §B77-B78 consignment-arrangements
 * @standard IFRS IFRS-15 §38 point-in-time-control-transfer
 * @standard IFRS IAS-2 §6 inventories-held-at-other-location
 * @standard US-GAAP ASC-606-10-55-79 consignment-indicators
 * @compliance SOX §404 TOM-AR-04 revenue-deferral
 *
 * @slice ZZZZ
 * @slice CCCCC-pilot
 *
 * @see ./consignment-cycle.test.ts
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const SHIP_QTY = 100
const UNIT_COST_CENTS = 5_00      // €5/unit cost (IAS-2)
const SOLD_QTY = 30
const UNIT_PRICE_CENTS = 12_00    // €12/unit retail
const COMMISSION_PERCENT = 15     // 15% to consignee
const GROSS = SOLD_QTY * UNIT_PRICE_CENTS
const COMMISSION = (GROSS * COMMISSION_PERCENT) / 100
const NET = GROSS - COMMISSION
const COGS = SOLD_QTY * UNIT_COST_CENTS

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 Consignee Plaza', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const signArrangement: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const arr = await payload.create({
    collection: 'consignment-arrangements',
    data: {
      tenant: ctx.tenantId,
      reference: `CONS-${ts()}`,
      consignee: addressId,
      consigneeName: 'Chain Test Consignee',
      effectiveFrom: new Date().toISOString(),
      controlTransferTrigger: 'consignee_sale',
      returnRights: 'unrestricted',
      currency: 'EUR',
      maxValue: SHIP_QTY * UNIT_COST_CENTS * 2,
      commissionRatePercent: COMMISSION_PERCENT,
      incoterm: 'CPT',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.arrangementId = arr.id
  return 'consignment:arranged'
}

const shipToConsignee: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'inventory-movements',
    data: {
      tenant: ctx.tenantId,
      movementId: `IM-CONS-${ts()}`,
      kind: 'transfer',
      sourceDocumentType: 'consignment-arrangements',
      sourceDocumentId: state.arrangementId,
      quantity: SHIP_QTY,
      unitCost: UNIT_COST_CENTS,
      extendedCost: SHIP_QTY * UNIT_COST_CENTS,
      currency: 'EUR',
      movementAt: new Date().toISOString(),
      valuationMethod: 'fifo',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'inventory:issued'
}

const openBalance: ChainStepImpl = async (payload, ctx, state) => {
  const inv = await payload.create({
    collection: 'consignment-inventory',
    data: {
      tenant: ctx.tenantId,
      lineId: `CINV-${ts()}`,
      arrangement: state.arrangementId,
      itemSku: 'WIDGET-A',
      itemDescription: 'Chain test widget',
      unitOfMeasure: 'EA',
      quantityOnHand: SHIP_QTY,
      unitCost: UNIT_COST_CENTS,
      valueOnHand: SHIP_QTY * UNIT_COST_CENTS,
      currency: 'EUR',
      asOfDate: new Date().toISOString(),
      lastShipmentDate: new Date().toISOString(),
      valuationMethod: 'fifo',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.consignmentInventoryId = inv.id
  return 'consignment:on-hand'
}

const reportSale: ChainStepImpl = async (payload, ctx, state) => {
  const sale = await payload.create({
    collection: 'consignment-sales',
    data: {
      tenant: ctx.tenantId,
      reference: `CSALE-${ts()}`,
      arrangement: state.arrangementId,
      consignmentInventory: state.consignmentInventoryId,
      saleDate: new Date().toISOString(),
      reportedDate: new Date().toISOString(),
      quantitySold: SOLD_QTY,
      unitOfMeasure: 'EA',
      unitPrice: UNIT_PRICE_CENTS,
      grossAmount: GROSS,
      commissionRatePercent: COMMISSION_PERCENT,
      commissionAmount: COMMISSION,
      netAmount: NET,
      cogsAmount: COGS,
      currency: 'EUR',
      status: 'validated',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.consignmentSaleId = sale.id
  // Decrement on-hand to reflect the sale.
  await payload.update({
    collection: 'consignment-inventory',
    id: state.consignmentInventoryId as string,
    data: {
      quantityOnHand: SHIP_QTY - SOLD_QTY,
      valueOnHand: (SHIP_QTY - SOLD_QTY) * UNIT_COST_CENTS,
      lastSaleDate: new Date().toISOString(),
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'consignment:sold'
}

const invoiceConsignee: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const inv = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `INV-CONS-${ts()}`,
      typeStatus: { invoiceType: 'invoice', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: NET,
        netTotal: NET,
        taxTotal: 0,
        totalAmount: NET,
        totalDue: NET,
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
      transactionNumber: `PMT-CONS-${ts()}`,
      paymentKind: 'received',
      status: 'received',
      invoice: state.invoiceId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: NET, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'payment:received'
}

export const consignmentCycleImpls: ChainImpls = [
  signArrangement, shipToConsignee, openBalance, reportSale,
  invoiceConsignee, receivePayment,
]
