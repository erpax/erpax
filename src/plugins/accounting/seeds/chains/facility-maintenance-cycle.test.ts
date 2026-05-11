/**
 * Facility maintenance cycle — canonical e2e test (Slice ZZZZ).
 * @standard ISO-41001:2018 + ISO-55000 + ISO-14224 + EN-13306 + IAS-16 §12 §13
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
import { facilityMaintenanceCycleImpls } from '@/plugins/accounting/seeds/chains/facility-maintenance-cycle'

describe('Chain — Facility maintenance cycle', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Property → Space → Request → Triage → WO → Parts + Labour → Complete → Inspect → Close', async () => {
    const chain = BUSINESS_CHAINS.FACILITY_MAINTENANCE_CYCLE
    const result = await runChain(payload, chain, ctx, facilityMaintenanceCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.emittedEvents).toEqual([
      'property:registered',
      'space:registered',
      'mr:raised',
      'mr:triaged',
      'wo:issued',
      'inventory:issued',
      'time:posted',
      'wo:completed',
      'qc:complete',
      'wo:closed',
    ])
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(10)
  }, 60_000)
})
