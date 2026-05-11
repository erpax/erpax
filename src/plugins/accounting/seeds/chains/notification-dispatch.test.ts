/**
 * Notification dispatch — canonical e2e test (Slice PPPP).
 * @standard rfc-5321 + rfc-5322 + GDPR Art.7 + ISO 19011 §6.4.6
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
import { notificationDispatchImpls } from '@/plugins/accounting/seeds/chains/notification-dispatch'

describe('Chain — Notification dispatch', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Observe → Dispatch (with per-channel deliveries reported)', async () => {
    const chain = BUSINESS_CHAINS.NOTIFICATION_DISPATCH
    const result = await runChain(payload, chain, ctx, notificationDispatchImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.emittedEvents).toEqual(['notify:observed', 'notify:dispatched'])
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)  // notifications don't post GL
    expect(result.auditEventCount).toBeGreaterThanOrEqual(2)
  }, 60_000)
})
