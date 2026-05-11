/**
 * Manufacturing cycle — canonical e2e test (Slice MMMM cut-2 example).
 * @standard IAS-2 §10-14 + §21 + ISA-95 §B.5 + ISO 9001 §8.7
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
import { manufacturingCycleImpls } from '@/plugins/accounting/seeds/chains/manufacturing-cycle'

describe('Chain — Manufacturing cycle (IAS-2 + ISA-95)', () => {
  let payload: Payload
  let ctx: ChainContext

  beforeAll(async () => {
    payload = await getPayload({ config })
    ctx = await createChainContext(payload)
  }, 30_000)

  afterAll(async () => {
    if (payload && ctx) await teardownChainContext(payload, ctx)
  }, 30_000)

  it('walks BOM → WO → Issue → ProdReceipt → Variance → QC', async () => {
    const chain = BUSINESS_CHAINS.MANUFACTURING_CYCLE
    const result = await runChain(payload, chain, ctx, manufacturingCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    const declaredEmits = chain.steps.map((s) => s.emits).filter((e): e is string => e !== null)
    expect(result.emittedEvents).toEqual(declaredEmits)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(6)
  }, 60_000)
})
