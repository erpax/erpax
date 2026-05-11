/**
 * Provision lifecycle — canonical e2e test (Slice OOOO).
 * @standard IAS-37 §14 §36 §59 §70 + ASC 450-20
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
import { provisionLifecycleImpls } from '@/plugins/accounting/seeds/chains/provision-lifecycle'

describe('Chain — Provision lifecycle (IAS-37)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Finding → Recognise → Remeasure → Use → Reverse', async () => {
    const chain = BUSINESS_CHAINS.PROVISION_LIFECYCLE
    const result = await runChain(payload, chain, ctx, provisionLifecycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(5)
  }, 60_000)
})
