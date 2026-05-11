/**
 * Intercompany consolidation — canonical seed (Slice RRRR).
 *
 * Two legal entities in the same group (Sub-A in Germany, Sub-B in Bulgaria).
 * Sub-A sells goods to Sub-B for €5000; each entity books its own JE.
 * At consolidation, the matched IntercompanyTransactions pair triggers
 * a ConsolidationElimination JE that removes both legs from the group
 * P&L per IFRS-10 §B86(c).
 *
 * Multi-relation invariants:
 *   - leg-A.amount == leg-B.amount  (matched pair)
 *   - elimination JE balances against both legs
 *   - both legs reference the same `pairReference` for join-traceability
 *
 * @standard IFRS-10 §B86 consolidation-procedures
 * @standard IFRS-10 §B86(c) eliminate-intra-group
 * @standard ASC-810-10-45
 * @standard OECD BEPS Action 13
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const TXN_AMOUNT = 5000_00 // €5000

const registerSubA: ChainStepImpl = async (payload, ctx, state) => {
  const e = await payload.create({
    collection: 'legal-entities',
    data: {
      tenant: ctx.tenantId,
      legalName: `Sub-A GmbH ${ts()}`,
      countryCode: 'DE',
      registrationNumber: `HRB-A-${ts()}`,
      legalForm: 'llc',
      consolidationMethod: 'full',
      consolidationStatus: 'subsidiary',
      ownershipPercent: 100,
      functionalCurrency: 'EUR',
      presentationCurrency: 'EUR',
      reportingFramework: 'ifrs',
      effectiveFrom: new Date('2026-01-01').toISOString(),
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.subAId = e.id
  return 'entity:registered'
}

const registerSubB: ChainStepImpl = async (payload, ctx, state) => {
  const e = await payload.create({
    collection: 'legal-entities',
    data: {
      tenant: ctx.tenantId,
      legalName: `Sub-B EOOD ${ts()}`,
      countryCode: 'BG',
      registrationNumber: `EIK-B-${ts()}`,
      legalForm: 'llc',
      consolidationMethod: 'full',
      consolidationStatus: 'subsidiary',
      ownershipPercent: 100,
      functionalCurrency: 'EUR',
      presentationCurrency: 'EUR',
      reportingFramework: 'ifrs',
      effectiveFrom: new Date('2026-01-01').toISOString(),
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.subBId = e.id
  return 'entity:registered'
}

const postLegA: ChainStepImpl = async (payload, ctx, state) => {
  // Both legs share the same `reference` — that IS the pair-join key
  // per the IntercompanyTransactions schema (TTT design).
  const sharedRef = `IC-PAIR-${ts()}`
  state.pairReference = sharedRef
  await payload.create({
    collection: 'intercompany-transactions',
    data: {
      tenant: ctx.tenantId,
      reference: sharedRef,
      fromTenant: ctx.tenantId,
      toTenant: ctx.tenantId,
      fromLegalEntity: state.subAId,
      toLegalEntity: state.subBId,
      transactionDate: new Date().toISOString(),
      pairKind: 'goods_transfer',
      currency: 'EUR',
      // Sub-A leg: debit (AR to Sub-B); credit zero on this row.
      debitAmount: TXN_AMOUNT,
      creditAmount: 0,
      notes: 'Sub-A → Sub-B inventory transfer (chain test)',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'ic:posted'
}

const postLegB: ChainStepImpl = async (payload, ctx, state) => {
  // Sub-B mirror leg — same `reference` to join, debit/credit reversed.
  await payload.create({
    collection: 'intercompany-transactions',
    data: {
      tenant: ctx.tenantId,
      reference: state.pairReference, // same key as leg A
      fromTenant: ctx.tenantId,
      toTenant: ctx.tenantId,
      fromLegalEntity: state.subAId,
      toLegalEntity: state.subBId,
      transactionDate: new Date().toISOString(),
      pairKind: 'goods_transfer',
      currency: 'EUR',
      debitAmount: 0,
      creditAmount: TXN_AMOUNT,
      notes: 'Sub-B inventory receipt (chain test)',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'ic:posted'
}

const reconcilePair: ChainStepImpl = async (payload, ctx, state) => {
  // Reconcile both legs by shared `reference` — verify Σdebit == Σcredit
  // (which is the IFRS-10 §B86(c) pre-elimination invariant).
  const both = await payload.find({
    collection: 'intercompany-transactions',
    where: { and: [
      { tenant: { equals: ctx.tenantId } },
      { reference: { equals: state.pairReference } },
    ]},
    overrideAccess: true,
    depth: 0,
  })
  const docs = both.docs as unknown as Array<{ debitAmount?: number; creditAmount?: number }>
  if (docs.length !== 2) throw new Error(`intercompany pair incomplete: got ${docs.length} legs, expected 2`)
  const sumDebit  = docs.reduce((s, d) => s + (d.debitAmount  ?? 0), 0)
  const sumCredit = docs.reduce((s, d) => s + (d.creditAmount ?? 0), 0)
  if (sumDebit !== sumCredit) {
    throw new Error(`pair mismatch: Σdebit=${sumDebit} Σcredit=${sumCredit}`)
  }
  return 'ic:reconciled'
}

const postElimination: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'consolidation-eliminations',
    data: {
      tenant: ctx.tenantId,
      reference: `ELIM-${ts()}`,
      consolidationDate: new Date().toISOString(),
      eliminationType: 'intercompany_revenue',
      subsidiaries: [state.subAId, state.subBId],
      currency: 'EUR',
      debitAmount: TXN_AMOUNT,
      creditAmount: TXN_AMOUNT,
      notes: `Eliminate intra-group sale (pair ${state.pairReference})`,
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'consol:elim:posted'
}

export const intercompanyConsolidationImpls: ChainImpls = [
  registerSubA, registerSubB,
  postLegA, postLegB,
  reconcilePair, postElimination,
]
