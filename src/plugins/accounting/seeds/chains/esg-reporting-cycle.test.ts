/**
 * ESG reporting cycle — canonical e2e test (Slice TTTT).
 * @standard EU CSRD 2022/2464 + ESRS E1 + GHG Protocol + ISAE 3000 + eIDAS Art.28
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
import { esgReportingCycleImpls } from '@/plugins/accounting/seeds/chains/esg-reporting-cycle'

describe('Chain — ESG reporting cycle (CSRD)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks 3 GHG (S1+S2+S3) → CSRD rollup → assure → eIDAS sign → file', async () => {
    const chain = BUSINESS_CHAINS.ESG_REPORTING_CYCLE
    const result = await runChain(payload, chain, ctx, esgReportingCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Invariant: 3 carbon-emissions rows (1 per scope).
    const ghg = await payload.count({ collection: 'carbon-emissions', where: { tenant: { equals: ctx.tenantId } }, overrideAccess: true })
    expect(ghg.totalDocs).toBe(3)

    // Invariant: 1 CSRD disclosure with status `filed`, KPI = 450 tCO2e.
    const disc = await payload.find({
      collection: 'csrd-disclosures',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(disc.docs.length).toBe(1)
    const d = disc.docs[0] as unknown as { status?: string; quantitativeKpi?: { value?: number } }
    expect(d.status).toBe('filed')
    expect(d.quantitativeKpi?.value).toBe(450)

    // Invariant: 1 evidence-attestation signed with eIDAS fields.
    const atts = await payload.find({
      collection: 'evidence-attestations',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(atts.docs.length).toBe(1)
    const a = atts.docs[0] as unknown as { signed?: boolean; signedAt?: string; signingCertificate?: string }
    expect(a.signed).toBe(true)
    expect(a.signedAt).toBeTruthy()
    expect(a.signingCertificate).toBeTruthy()
  }, 60_000)
})
