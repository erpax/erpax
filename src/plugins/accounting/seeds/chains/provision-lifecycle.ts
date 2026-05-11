/**
 * Provision lifecycle — canonical seed (Slice OOOO).
 *
 * AuditFinding recognised → Provision recognised at best estimate
 *  → Remeasured (movementHistory append) → Used (cash settlement).
 *
 * @standard IAS-37 §14 §36 §59 §70 + ASC 450-20
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const BEST_ESTIMATE_CENTS = 50_000_00 // €50k warranty provision
const REMEASURE_DELTA      = 5_000_00 // additional €5k after re-estimation
const USE_AMOUNT           = 25_000_00 // €25k actually paid out

const recogniseFinding: ChainStepImpl = async (payload, ctx, state) => {
  const f = await payload.create({
    collection: 'audit-findings',
    data: {
      tenant: ctx.tenantId,
      findingId: `AF-${ts()}`,
      title: 'Warranty obligation under-provisioned',
      classification: 'control_design_gap',
      severity: 'medium',
      description: 'Warranty obligations potentially under-provisioned per IAS-37 §36 best-estimate review',
      reportedAt: new Date().toISOString(),
      reportedBy: ctx.userId,
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.findingId = f.id
  return 'finding:recognised'
}

const recogniseProvision: ChainStepImpl = async (payload, ctx, state) => {
  const p = await payload.create({
    collection: 'provisions',
    data: {
      tenant: ctx.tenantId,
      reference: `PROV-${ts()}`,
      description: 'Warranty provision — Q2 sold units',
      provisionType: 'warranty',
      recognitionDate: new Date().toISOString(),
      period: ctx.fiscalPeriodId,
      currency: 'EUR',
      bestEstimate: BEST_ESTIMATE_CENTS,
      discountedAmount: BEST_ESTIMATE_CENTS,
      expectedSettlementWindow: 'within_12m',
      sourceFinding: state.findingId,
      uncertaintySource: 'expected_value',
      status: 'recognised',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.provisionId = p.id
  return 'provision:recognised'
}

const remeasure: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'provisions',
    id: state.provisionId as string,
    data: {
      bestEstimate: BEST_ESTIMATE_CENTS + REMEASURE_DELTA,
      discountedAmount: BEST_ESTIMATE_CENTS + REMEASURE_DELTA,
      movementHistory: [
        { period: ctx.fiscalPeriodId, movementType: 'additional', amount: REMEASURE_DELTA, movementDate: new Date().toISOString(), memo: 'Re-estimation increase' },
      ],
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'provision:remeasured'
}

const use: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'provisions',
    id: state.provisionId as string,
    data: {
      movementHistory: [
        { period: ctx.fiscalPeriodId, movementType: 'additional', amount: REMEASURE_DELTA, movementDate: new Date().toISOString(), memo: 'Re-estimation increase' },
        { period: ctx.fiscalPeriodId, movementType: 'used', amount: USE_AMOUNT, movementDate: new Date().toISOString(), memo: 'Cash settlement Q2' },
      ],
      status: 'used',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'provision:used'
}

const reverse: ChainStepImpl = async (payload, ctx, state) => {
  // Reverse residual after use.
  const remainder = (BEST_ESTIMATE_CENTS + REMEASURE_DELTA) - USE_AMOUNT
  await payload.update({
    collection: 'provisions',
    id: state.provisionId as string,
    data: {
      movementHistory: [
        { period: ctx.fiscalPeriodId, movementType: 'additional', amount: REMEASURE_DELTA, movementDate: new Date().toISOString() },
        { period: ctx.fiscalPeriodId, movementType: 'used',       amount: USE_AMOUNT, movementDate: new Date().toISOString() },
        { period: ctx.fiscalPeriodId, movementType: 'reversed',   amount: remainder, movementDate: new Date().toISOString(), memo: 'Reverse residual — period closed' },
      ],
      status: 'reversed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'provision:reversed'
}

export const provisionLifecycleImpls: ChainImpls = [
  recogniseFinding, recogniseProvision, remeasure, use, reverse,
]
