/**
 * Workflow approval cycle — canonical e2e test (Slice OOOO).
 * @standard ISO/IEC 19510:2013 BPMN-2.0 + SOX §404 + ISO 27002 §5.4
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
import { workflowApprovalCycleImpls } from '@/plugins/accounting/seeds/chains/workflow-approval-cycle'

describe('Chain — Workflow approval (BPMN-style)', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Definition → Spawn → StepDecision → Finalise', async () => {
    const chain = BUSINESS_CHAINS.WORKFLOW_APPROVAL_CYCLE
    const result = await runChain(payload, chain, ctx, workflowApprovalCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    // Step 1 is silent; verify the 3 non-silent emits fired.
    expect(result.emittedEvents).toEqual(['workflow:spawned', 'workflow:step-decided', 'workflow:finalised'])
    // Workflow chain has no GL postings — assert balance trivially.
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(3)
  }, 60_000)
})
