/**
 * Chain runner — generic walker that executes a business-chain seed
 * and returns telemetry.
 *
 * Slice KKKK (2026-05-10): the seed file declares per-chain step
 * implementations; this runner sequences them, captures emitted events,
 * and rolls up GL totals + audit-event counts so tests can assert
 * the canonical invariants (debits == credits, audit row per write,
 * usage-record per metered event).
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence
 * @compliance SOX §404 internal-controls process-evidence
 */

import type { Payload } from 'payload'
import type { BusinessChain, ChainRunResult } from '@/business/chain/types'
import type { ChainContext } from '@/business/chain/chain-context'

/**
 * Per-step implementation fn. Returns the emitted event id when the
 * step succeeds (or `null` for silent steps); throws on failure.
 */
export type ChainStepImpl = (
  payload: Payload,
  ctx: ChainContext,
  state: Record<string, unknown>,
) => Promise<string | null>

/** Implementation map — keyed by step index in the chain. */
export type ChainImpls = ReadonlyArray<ChainStepImpl>

export async function runChain(
  payload: Payload,
  chain: BusinessChain,
  ctx: ChainContext,
  impls: ChainImpls,
): Promise<ChainRunResult> {
  if (impls.length !== chain.steps.length) {
    throw new Error(
      `runChain: ${chain.id} expects ${chain.steps.length} step impls, got ${impls.length}`,
    )
  }

  const emittedEvents: string[] = []
  const errors: Array<{ stepIndex: number; error: string }> = []
  const state: Record<string, unknown> = {}
  let stepsCompleted = 0

  for (let i = 0; i < chain.steps.length; i++) {
    const step = chain.steps[i]
    // Pre-condition: every required event must already be in emittedEvents.
    const missing = step.requires.filter((r) => !emittedEvents.includes(r))
    if (missing.length > 0) {
      errors.push({
        stepIndex: i,
        error: `precondition_unmet: requires=[${missing.join(', ')}]`,
      })
      continue
    }
    try {
      const emitted = await impls[i](payload, ctx, state)
      stepsCompleted++
      if (emitted !== null && step.emits !== null && emitted !== step.emits) {
        errors.push({
          stepIndex: i,
          error: `emit_mismatch: declared=${step.emits} actual=${emitted}`,
        })
      } else if (emitted !== null) {
        emittedEvents.push(emitted)
      }
    } catch (err) {
      errors.push({
        stepIndex: i,
        error: err instanceof Error ? err.message : 'unknown_error',
      })
    }
  }

  // Roll up GL totals + audit count for the post-run invariants.
  let glDebitTotal = 0
  let glCreditTotal = 0
  try {
    const postings = await payload.find({
      collection: 'gl-postings',
      where: { tenant: { equals: ctx.tenantId } },
      limit: 1000,
      overrideAccess: true,
    })
    for (const p of postings.docs as unknown as Array<{ debit?: number; credit?: number }>) {
      glDebitTotal += p.debit ?? 0
      glCreditTotal += p.credit ?? 0
    }
  } catch {
    // best-effort
  }
  let auditEventCount = 0
  try {
    const audits = await payload.count({
      collection: 'audit-events',
      where: { tenant: { equals: ctx.tenantId } },
      overrideAccess: true,
    })
    auditEventCount = audits.totalDocs
  } catch {
    // best-effort
  }

  return {
    chainId: chain.id,
    succeeded: errors.length === 0,
    stepsCompleted,
    emittedEvents,
    errors,
    auditEventCount,
    glDebitTotal,
    glCreditTotal,
  }
}
