/**
 * Multi-vendor PR split award — canonical seed (Slice SSSS).
 *
 * Single PR for 100 units → 3 vendor quotes received (best-price, fast,
 * certified) → award split: 60 units to lowest-price vendor + 40 units
 * to fastest → 2 separate POs created. SOX §404 + OECD BEPS Action 13:
 * split rationale captured per quote so auditors can walk PR → quotes
 * → award decision → POs.
 *
 * Multi-relation invariants:
 *   - 3 vendor quotes share the same `requisition` FK
 *   - 2 quotes flip `isAwarded: true` with `awardRationale` text
 *   - 2 POs reference the same source PR (via createdPurchaseOrder
 *     bidirectional link on the awarded quote)
 *   - Σ awarded quantities ≤ PR.requestedQuantity (split, not over-award)
 *
 * @standard SOX §404 P2P-01
 * @standard ISO 9001:2015 §8.4 vendor-evaluation
 * @standard OECD BEPS Action 13 procurement-evidence
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const REQUESTED_QTY = 100
const SPLIT = { lowPrice: 60, fastest: 40 } // sums to 100

const submit: ChainStepImpl = async (payload, ctx, state) => {
  const pr = await payload.create({
    collection: 'purchase-requisitions',
    data: {
      tenant: ctx.tenantId,
      requisitionNumber: `MV-PR-${ts()}`,
      requisitioner: ctx.userId,
      requestedDate: new Date().toISOString(),
      businessJustification: 'Multi-vendor split award (chain test)',
      lines: [{
        description: 'Test widget — split award',
        quantity: REQUESTED_QTY,
        uom: 'EA',
        estimatedUnitPrice: 30_00,
        estimatedAmount: REQUESTED_QTY * 30_00,
      }],
      currency: 'EUR',
      estimatedTotal: REQUESTED_QTY * 30_00,
      requiresQuotes: true,
      minimumQuotesRequired: 3,
      status: 'submitted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.requisitionId = pr.id
  return 'pr:submitted'
}

const approve: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'purchase-requisitions',
    id: state.requisitionId as string,
    data: { status: 'approved' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'pr:approved'
}

const receiveQuote = (idx: 0 | 1 | 2, unitPrice: number, leadDays: number): ChainStepImpl =>
  async (payload, ctx, state) => {
    const vq = await payload.create({
      collection: 'vendor-quotes',
      data: {
        tenant: ctx.tenantId,
        quoteNumber: `MV-VQ-${idx + 1}-${ts()}`,
        vendor: ctx.vendorId,
        requisition: state.requisitionId,
        quoteReceivedDate: new Date().toISOString(),
        lines: [{
          description: 'Test widget — split award',
          quantity: REQUESTED_QTY,
          uom: 'EA',
          unitPrice,
          lineTotal: REQUESTED_QTY * unitPrice,
          leadTimeDays: leadDays,
        }],
        currency: 'EUR',
        totalAmount: REQUESTED_QTY * unitPrice,
        paymentTerms: 'Net 30',
        status: 'received',
      } as Record<string, unknown>,
      overrideAccess: true,
    }) as unknown as { id: string }
    state[`quote${idx + 1}Id`] = vq.id
    return 'rfq:received'
  }

const award = (quoteIdx: 1 | 2 | 3, rationale: string): ChainStepImpl =>
  async (payload, ctx, state) => {
    await payload.update({
      collection: 'vendor-quotes',
      id: state[`quote${quoteIdx}Id`] as string,
      data: {
        isAwarded: true,
        awardedDate: new Date().toISOString(),
        awardedBy: ctx.userId,
        awardRationale: rationale,
        status: 'awarded',
      } as Record<string, unknown>,
      overrideAccess: true,
    })
    return 'rfq:awarded'
  }

const createPO = (poIdx: 1 | 2, sourceQuoteIdx: 1 | 2 | 3, qty: number, unitPrice: number): ChainStepImpl =>
  async (payload, ctx, state) => {
    const po = await payload.create({
      collection: 'purchase-orders',
      data: {
        tenant: ctx.tenantId,
        poNumber: `MV-PO-${poIdx}-${ts()}`,
        vendor: ctx.vendorId,
        orderDate: new Date().toISOString(),
        lines: [{
          lineNumber: 1,
          description: 'Test widget — split award',
          quantity: qty,
          unitPrice,
        }],
        currency: 'EUR',
        taxAmount: 0,
        status: 'open',
      } as Record<string, unknown>,
      overrideAccess: true,
    }) as unknown as { id: string }
    state[`poId${poIdx}`] = po.id
    // Backlink the awarded quote to the PO it created.
    await payload.update({
      collection: 'vendor-quotes',
      id: state[`quote${sourceQuoteIdx}Id`] as string,
      data: { createdPurchaseOrder: po.id } as Record<string, unknown>,
      overrideAccess: true,
    })
    return 'po:created'
  }

export const multiVendorPrSplitAwardImpls: ChainImpls = [
  submit,
  approve,
  receiveQuote(0, 32_00, 14),  // quote 1 — certified vendor, middle price, slow
  receiveQuote(1, 28_00, 21),  // quote 2 — lowest price, slow
  receiveQuote(2, 35_00, 5),   // quote 3 — fastest, expensive
  award(2, 'Lowest unit price (€28) for the volume portion (60 units)'),
  award(3, 'Fastest lead time (5 days) for the urgent portion (40 units)'),
  createPO(1, 2, SPLIT.lowPrice, 28_00),  // PO-1 ← quote 2 at €28 × 60
  createPO(2, 3, SPLIT.fastest,  35_00),  // PO-2 ← quote 3 at €35 × 40
]
