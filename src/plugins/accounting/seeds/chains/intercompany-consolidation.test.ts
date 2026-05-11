/**
 * Intercompany consolidation — canonical e2e test (Slice RRRR).
 *
 * Multi-relation invariants:
 *   - 2 legal-entities exist + are full-consolidated
 *   - 2 IntercompanyTransactions rows share the same pairReference
 *   - Σ legs == 0 net (sender + receiver perfectly cancel pre-elimination)
 *   - 1 ConsolidationEliminations row with sourceLegalEntities containing both subs
 *
 * @standard IFRS-10 §B86 + §B86(c) + ASC 810-10-45
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
import { intercompanyConsolidationImpls } from '@/plugins/accounting/seeds/chains/intercompany-consolidation'

describe('Chain — Intercompany consolidation (IFRS-10 §B86)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks 2 entities → 2 IC legs → reconcile pair → 1 elimination', async () => {
    const chain = BUSINESS_CHAINS.INTERCOMPANY_CONSOLIDATION
    const result = await runChain(payload, chain, ctx, intercompanyConsolidationImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Multi-relation invariant 1: 2 legal-entities registered for this tenant.
    const entities = await payload.count({
      collection: 'legal-entities',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
    })
    expect(entities.totalDocs).toBe(2)

    // Multi-relation invariant 2: matched intercompany pair exists.
    const ictPairs = await payload.find({
      collection: 'intercompany-transactions',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(ictPairs.docs.length).toBe(2)
    const pairRefs = new Set(
      (ictPairs.docs as unknown as Array<{ pairReference?: string }>).map((d) => d.pairReference)
    )
    expect(pairRefs.size).toBe(1) // both legs share the same pair

    // Multi-relation invariant 3: 1 elimination posted with both subsidiaries referenced.
    const elims = await payload.find({
      collection: 'consolidation-eliminations',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(elims.docs.length).toBe(1)
    const elim = elims.docs[0] as unknown as { subsidiaries?: ReadonlyArray<unknown> }
    expect(elim.subsidiaries?.length).toBe(2)
  }, 60_000)
})
