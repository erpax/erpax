/**
 * KYC + sanctions review — canonical e2e test (Slice TTTT).
 * @standard FATF R.10 R.12 R.24 + EU AMLD5 + EU AI Act Annex III
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
import { kycSanctionsReviewImpls } from '@/plugins/accounting/seeds/chains/kyc-sanctions-review'

describe('Chain — KYC + sanctions review (FATF + EU AMLD5 + EU AI Act)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Onboard → KYC → UBO → AI screen → Approve → Rescreen', async () => {
    const chain = BUSINESS_CHAINS.KYC_SANCTIONS_REVIEW
    const result = await runChain(payload, chain, ctx, kycSanctionsReviewImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Invariant: 1 KYC row, 1 UBO row, 2 AI suggestions (initial screen + rescreen).
    const kyc = await payload.count({ collection: 'kyc-checks', where: { tenant: { equals: ctx.tenantId } }, overrideAccess: true })
    expect(kyc.totalDocs).toBe(1)
    const ubo = await payload.count({ collection: 'beneficial-owners', where: { tenant: { equals: ctx.tenantId } }, overrideAccess: true })
    expect(ubo.totalDocs).toBe(1)
    const ai = await payload.find({ collection: 'ai-suggestions', where: { tenant: { equals: ctx.tenantId } }, overrideAccess: true, depth: 0 })
    expect(ai.docs.length).toBe(2)
    // Both AI rows are EU AI Act high-risk class.
    for (const r of ai.docs as unknown as Array<{ aiRiskClass?: string }>) {
      expect(r.aiRiskClass).toBe('high')
    }
  }, 60_000)
})
