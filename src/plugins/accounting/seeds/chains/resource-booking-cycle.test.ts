/**
 * Resource booking cycle — canonical e2e test (Slice ZZZZ).
 * @standard ISO-18513:2021 + IFRS-15 §35 + IFRS-15 §38 + rfc-5545
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
import { resourceBookingCycleImpls } from '@/plugins/accounting/seeds/chains/resource-booking-cycle'

describe('Chain — Resource booking cycle', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Catalogue → Request → Confirm → CheckIn → CheckOut → Invoice → Pay', async () => {
    const chain = BUSINESS_CHAINS.RESOURCE_BOOKING_CYCLE
    const result = await runChain(payload, chain, ctx, resourceBookingCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.emittedEvents).toEqual([
      'resource:catalogued',
      'booking:requested',
      'booking:confirmed',
      'booking:checked_in',
      'booking:checked_out',
      'invoice:activated',
      'payment:received',
    ])
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(7)
  }, 60_000)
})
