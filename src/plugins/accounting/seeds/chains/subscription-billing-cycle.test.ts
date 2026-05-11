/**
 * Subscription billing cycle — canonical e2e test.
 *
 * @standard IFRS-15 §35 + §B16 usage-based-revenue
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
import { subscriptionBillingCycleImpls } from '@/plugins/accounting/seeds/chains/subscription-billing-cycle'

describe('Chain — Subscription billing cycle', () => {
  let payload: Payload
  let ctx: ChainContext

  beforeAll(async () => {
    payload = await getPayload({ config })
    ctx = await createChainContext(payload)
  }, 30_000)

  afterAll(async () => {
    if (payload && ctx) await teardownChainContext(payload, ctx)
  }, 30_000)

  it('walks Subscription → Usage → Invoice → Payment → CompletedInvoice', async () => {
    const chain = BUSINESS_CHAINS.SUBSCRIPTION_BILLING_CYCLE
    const result = await runChain(payload, chain, ctx, subscriptionBillingCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    const declaredEmits = chain.steps
      .map((s) => s.emits)
      .filter((e): e is string => e !== null)
    expect(result.emittedEvents).toEqual(declaredEmits)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(5)
  }, 60_000)
})
