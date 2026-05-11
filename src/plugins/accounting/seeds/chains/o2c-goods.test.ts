/**
 * O2C goods — canonical e2e test (Slice NNNN cut-3).
 * @standard IFRS-15 §38 point-in-time + INCOTERMS 2020
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
import { o2cGoodsImpls } from '@/plugins/accounting/seeds/chains/o2c-goods'

describe('Chain — O2C physical goods (IFRS-15 §38)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Lead → Opp → Quote → Contract → Shipment → Delivered → Invoice → Payment → Completed', async () => {
    const chain = BUSINESS_CHAINS.O2C_GOODS
    const result = await runChain(payload, chain, ctx, o2cGoodsImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    // 9 chain writes — invoice GL fires twice (activate + completed) so audit ≥ 9.
    expect(result.auditEventCount).toBeGreaterThanOrEqual(9)
  }, 60_000)
})
