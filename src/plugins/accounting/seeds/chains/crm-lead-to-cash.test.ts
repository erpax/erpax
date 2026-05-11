/**
 * CRM lead-to-cash — canonical e2e test (Slice NNNN cut-3).
 * @standard IFRS-15 §9 + §91-94 + GDPR Art.5
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
import { crmLeadToCashImpls } from '@/plugins/accounting/seeds/chains/crm-lead-to-cash'

describe('Chain — CRM lead-to-cash (IFRS-15 §91-94)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Lead → Activity → MQL → SQL → Opp → Won → Customer → Contract → Commission', async () => {
    const chain = BUSINESS_CHAINS.CRM_LEAD_TO_CASH
    const result = await runChain(payload, chain, ctx, crmLeadToCashImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(8)
  }, 60_000)
})
