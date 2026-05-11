/**
 * R2R period close — canonical e2e test.
 * @standard SOX §404 + IAS-1 §27 + IAS-8 §42 + IFRS-10 §B86
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
import { r2rPeriodCloseImpls } from '@/plugins/accounting/seeds/chains/r2r-period-close'

describe('Chain — R2R period close', () => {
  let payload: Payload
  let ctx: ChainContext

  beforeAll(async () => {
    payload = await getPayload({ config })
    ctx = await createChainContext(payload)
  }, 30_000)

  afterAll(async () => {
    if (payload && ctx) await teardownChainContext(payload, ctx)
  }, 30_000)

  it('walks the full period-close orchestration → period locked → financial statements', async () => {
    const chain = BUSINESS_CHAINS.R2R_PERIOD_CLOSE
    const result = await runChain(payload, chain, ctx, r2rPeriodCloseImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    // Period-locked emits regardless of which sub-steps wrote rows.
    expect(result.emittedEvents).toContain('period:locked')
    expect(result.emittedEvents).toContain('fs:generated')
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
  }, 60_000)
})
