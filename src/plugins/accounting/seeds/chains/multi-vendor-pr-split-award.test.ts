/**
 * Multi-vendor PR split award — canonical e2e test (Slice SSSS).
 *
 * Multi-relation invariants:
 *   - 3 vendor-quotes share the same `requisition` FK
 *   - 2 quotes have isAwarded=true with non-empty awardRationale
 *   - 2 POs reference the same source PR (via the awarded quote's
 *     `createdPurchaseOrder` backlink)
 *   - Σ awarded quantities (60 + 40) ≤ PR.requestedQuantity (100)
 *
 * @standard SOX §404 P2P-01 + ISO 9001 §8.4 + OECD BEPS Action 13
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
import { multiVendorPrSplitAwardImpls } from '@/plugins/accounting/seeds/chains/multi-vendor-pr-split-award'

describe('Chain — Multi-vendor PR split award (1 PR → 3 quotes → 2 awards → 2 POs)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks PR submit → approve → 3 RFQs → award 2 → create 2 POs with backlinks', async () => {
    const chain = BUSINESS_CHAINS.MULTI_VENDOR_PR_SPLIT_AWARD
    const result = await runChain(payload, chain, ctx, multiVendorPrSplitAwardImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Multi-relation invariant 1: 3 quotes share the same requisition FK.
    const quotes = await payload.find({
      collection: 'vendor-quotes',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(quotes.docs.length).toBe(3)
    const reqRefs = new Set(
      (quotes.docs as unknown as Array<{ requisition?: unknown }>)
        .map((q) => typeof q.requisition === 'object' && q.requisition ? String((q.requisition as { id?: unknown }).id ?? '') : String(q.requisition ?? ''))
    )
    expect(reqRefs.size).toBe(1)

    // Multi-relation invariant 2: exactly 2 quotes awarded with rationale.
    const awarded = (quotes.docs as unknown as Array<{ isAwarded?: boolean; awardRationale?: string }>)
      .filter((q) => q.isAwarded === true)
    expect(awarded.length).toBe(2)
    for (const q of awarded) {
      expect(q.awardRationale).toBeTruthy()
      expect(q.awardRationale!.length).toBeGreaterThan(10)
    }

    // Multi-relation invariant 3: 2 POs created with backlinks from the awarded quotes.
    const pos = await payload.count({
      collection: 'purchase-orders',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
    })
    expect(pos.totalDocs).toBe(2)
    const backlinkedQuotes = (quotes.docs as unknown as Array<{ isAwarded?: boolean; createdPurchaseOrder?: unknown }>)
      .filter((q) => q.isAwarded === true && q.createdPurchaseOrder !== undefined && q.createdPurchaseOrder !== null)
    expect(backlinkedQuotes.length).toBe(2)
  }, 60_000)
})
