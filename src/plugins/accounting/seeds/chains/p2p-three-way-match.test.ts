/**
 * P2P 3-way match — canonical e2e test.
 *
 * Slice KKKK (2026-05-10): walks the chain end-to-end, asserts every
 * step succeeded, every declared event fired, and the GL is balanced
 * (debits == credits) once `payment:sent` fires the GL handler.
 *
 * @standard SOX §404 P2P-01 three-way-match
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-process
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
import { p2pThreeWayMatchImpls } from '@/plugins/accounting/seeds/chains/p2p-three-way-match'

describe('Chain — P2P 3-way match', () => {
  let payload: Payload
  let ctx: ChainContext

  beforeAll(async () => {
    payload = await getPayload({ config })
    ctx = await createChainContext(payload)
  }, 30_000)

  afterAll(async () => {
    if (payload && ctx) await teardownChainContext(payload, ctx)
  }, 30_000)

  it('walks PR → RFQ → PO → GR → Bill → 3WayMatch → Payment → PaidBill', async () => {
    const chain = BUSINESS_CHAINS.P2P_THREE_WAY_MATCH

    const result = await runChain(payload, chain, ctx, p2pThreeWayMatchImpls)

    // ─── Step + event invariants ──────────────────────────────────
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    // Every declared emit fired in declared order.
    const declaredEmits = chain.steps
      .map((s) => s.emits)
      .filter((e): e is string => e !== null)
    expect(result.emittedEvents).toEqual(declaredEmits)

    // ─── Audit-trail invariant (one row per write per ISO 19011 §6.4.6) ──
    // 10 writes (1 PR submit + 1 PR approve + 1 VQ recv + 1 VQ award +
    // 1 PO create + 1 GR post + 1 Bill activate + 1 Payment send + 1
    // Bill mark-paid; the threeWayMatch step is read-only) → ≥ 9.
    expect(result.auditEventCount).toBeGreaterThanOrEqual(9)

    // ─── GL invariant: Σ debits == Σ credits whenever GL fires ────
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
  }, 60_000)
})
