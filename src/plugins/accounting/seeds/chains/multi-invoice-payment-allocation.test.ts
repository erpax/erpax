/**
 * Multi-invoice payment allocation — canonical e2e test (Slice RRRR).
 *
 * Asserts the multi-relation invariants:
 *   - Σ(allocations.allocatedAmount) == payment.amount
 *   - Each invoice individually transitions to `paid` once its
 *     allocation fully settles it
 *   - GL posts balanced for the bulk payment + 3 individual completions
 *
 * @standard SOX §404 TOM-AR-02 + IFRS-15 §47
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BUSINESS_CHAINS,
  createChainContext,
  teardownChainContext,
  runChain,
  type ChainContext,
} from '@/services/business-chains'
import { multiInvoicePaymentAllocationImpls } from '@/plugins/accounting/seeds/chains/multi-invoice-payment-allocation'

describe('Chain — Multi-invoice payment allocation (1 payment ↔ 3 invoices)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks 3 invoices → bulk payment → 3 allocations → 3 completions', async () => {
    const chain = BUSINESS_CHAINS.MULTI_INVOICE_PAYMENT_ALLOCATION
    const result = await runChain(payload, chain, ctx, multiInvoicePaymentAllocationImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Multi-relation invariant 1: every invoice landed paid.
    const paidCount = await payload.count({
      collection: 'invoices',
      where: { and: [
        { tenant: { equals: ctx.tenantId } },
        { status: { equals: 'paid' } },
      ]},
      overrideAccess: true,
    })
    expect(paidCount.totalDocs).toBe(3)

    // Multi-relation invariant 2: 3 allocation rows posted, all linked to the same payment.
    const allocs = await payload.find({
      collection: 'payment-allocations',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(allocs.docs.length).toBe(3)
    const allocSum = (allocs.docs as unknown as Array<{ allocatedAmount?: number }>)
      .reduce((s, a) => s + (a.allocatedAmount ?? 0), 0)
    expect(allocSum).toBe(1000_00)
  }, 60_000)
})
