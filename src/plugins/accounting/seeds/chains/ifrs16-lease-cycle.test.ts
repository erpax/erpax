/**
 * IFRS-16 lease cycle — canonical e2e test.
 * @standard IFRS-16 §22 §44-46
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
import { ifrs16LeaseCycleImpls } from '@/plugins/accounting/seeds/chains/ifrs16-lease-cycle'

describe('Chain — IFRS-16 lease cycle', () => {
  let payload: Payload
  let ctx: ChainContext

  beforeAll(async () => {
    payload = await getPayload({ config })
    ctx = await createChainContext(payload)
  }, 30_000)

  afterAll(async () => {
    if (payload && ctx) await teardownChainContext(payload, ctx)
  }, 30_000)

  it('walks Commence → PeriodPost → Remeasure → PostAfterMod → Terminate', async () => {
    const chain = BUSINESS_CHAINS.IFRS16_LEASE_CYCLE
    const result = await runChain(payload, chain, ctx, ifrs16LeaseCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(5)
  }, 60_000)
})
