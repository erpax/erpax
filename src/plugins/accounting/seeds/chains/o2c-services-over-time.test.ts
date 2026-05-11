/**
 * O2C services over-time — canonical e2e test (Slice PPPP).
 * @standard IFRS-15 §35 + §B14-B19 + §126
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
import { o2cServicesOverTimeImpls } from '@/plugins/accounting/seeds/chains/o2c-services-over-time'

describe('Chain — O2C services over-time (IFRS-15 §35 + §126)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Opp → Contract → PO → Project → Task → Time → WipSnapshot → Milestone → Invoice → Payment', async () => {
    const chain = BUSINESS_CHAINS.O2C_SERVICES_OVER_TIME
    const result = await runChain(payload, chain, ctx, o2cServicesOverTimeImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    // wip:snapshot:posted + milestone:achieved + invoice:activated each fire GL handlers
    // shipped in NNNN — assert balance.
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(10)
  }, 60_000)
})
