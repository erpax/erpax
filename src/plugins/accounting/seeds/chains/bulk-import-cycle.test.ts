/**
 * Bulk import cycle — canonical e2e test (Slice TTTT).
 * @standard rfc-4180 + SOX §404 TOM-FAIL-01
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
import { bulkImportCycleImpls } from '@/plugins/accounting/seeds/chains/bulk-import-cycle'

describe('Chain — Bulk import cycle (CSV → process → reprocess)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Enqueue → Process (1 row fails) → Reprocess (failure resolved)', async () => {
    const chain = BUSINESS_CHAINS.BULK_IMPORT_CYCLE
    const result = await runChain(payload, chain, ctx, bulkImportCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)

    // Invariant: 2 transaction-failure rows total (1 envelope + 1 row failure).
    const failures = await payload.find({
      collection: 'transaction-failures',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
      depth: 0,
    })
    expect(failures.docs.length).toBeGreaterThanOrEqual(2)
    // Invariant: at least one row in `resolved` status (the reprocessed one).
    const resolved = (failures.docs as unknown as Array<{ status?: string }>)
      .filter((d) => d.status === 'resolved')
    expect(resolved.length).toBeGreaterThanOrEqual(1)
  }, 60_000)
})
