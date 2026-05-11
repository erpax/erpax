/**
 * H2R hire-to-retire — canonical e2e test (Slice NNNN cut-2).
 * @standard IAS-19 + GDPR Art.6(1)(b)
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
import { h2rHireToRetireImpls } from '@/plugins/accounting/seeds/chains/h2r-hire-to-retire'

describe('Chain — H2R hire-to-retire', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks JobPos → Pipeline → Employee → Time → Expense → Leave → Review → Payroll', async () => {
    const chain = BUSINESS_CHAINS.H2R_HIRE_TO_RETIRE
    const result = await runChain(payload, chain, ctx, h2rHireToRetireImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(9)
  }, 60_000)
})
