/**
 * KYC + sanctions review — canonical seed (Slice TTTT).
 *
 * Customer onboarded → KycCheck initiated → BeneficialOwners registered
 * → AI sanctions screen → human approval → scheduled re-screen.
 *
 * Multi-relation invariants:
 *   - 1 KycCheck row references the customer
 *   - ≥1 BO row references the kycCheck (M:N customer→ownership chain)
 *   - 1 ai-suggestions row of type sanctions_screening with high
 *     risk class (per FATF R.7 + EU AI Act Annex III)
 *   - kyc-checks transitions through statuses: initiated → pending_review
 *     → approved → rescreened
 *
 * @standard FATF R.10 R.12 R.24 customer-due-diligence
 * @standard EU AMLD5 beneficial-ownership-register
 * @standard EU AI Act Art.6 Annex III (sanctions screening = high-risk)
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)

const onboardCustomer: ChainStepImpl = async (payload, ctx, _state) => {
  // Customer is already created in createChainContext — emit-only step.
  return 'customer:onboard'
}

const initiateKyc: ChainStepImpl = async (payload, ctx, state) => {
  const k = await payload.create({
    collection: 'kyc-checks',
    data: {
      tenant: ctx.tenantId,
      checkId: `KYC-${ts()}`,
      subjectType: 'customer',
      subject: ctx.customerId,
      cddLevel: 'standard',
      screenedAt: new Date().toISOString(),
      pepStatus: 'not_pep',
      sanctionsScreening: { matchFound: false, lists: ['EU_CFSP', 'OFAC', 'UN'] },
      riskRating: 'low',
      nextReviewDue: new Date(Date.now() + 365 * 86_400_000).toISOString(),
      status: 'initiated',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.kycId = k.id
  return 'kyc:initiated'
}

const registerUbo: ChainStepImpl = async (payload, ctx, state) => {
  const ubo = await payload.create({
    collection: 'beneficial-owners',
    data: {
      tenant: ctx.tenantId,
      kycCheck: state.kycId,
      entity: ctx.customerId,
      fullName: `Test UBO ${ts()}`,
      ownershipPercent: 75,
      controlType: 'voting_rights',
      residenceCountry: 'BG',
      pepStatus: 'not_pep',
      effectiveFrom: new Date().toISOString(),
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.uboId = ubo.id
  return 'ubo:registered'
}

const screenSanctions: ChainStepImpl = async (payload, ctx, state) => {
  // Simulate the AI handler dropping a row in ai-suggestions.
  // Real wiring: src/services/ai/sanctions-screening.ts → ai-suggestions
  // via callWorkersAi (Slice WWW chokepoint).
  await payload.create({
    collection: 'ai-suggestions',
    data: {
      tenant: ctx.tenantId,
      suggestionId: crypto.randomUUID(),
      feature: 'ai_sanctions_screening',
      model: '@cf/meta/llama-3.2-11b-vision-instruct',
      inferenceTime: new Date().toISOString(),
      inputs: { ubo: state.uboId, screen: 'EU CFSP + OFAC + UN' },
      outputs: { matches: [], confidence: 0.99, decision: 'no_match' },
      confidence: 0.99,
      aiRiskClass: 'high', // sanctions = EU AI Act Annex III high-risk
      humanDecision: 'pending', // never auto-accepts at high-risk
      sourceCollection: 'kyc-checks',
      sourceId: state.kycId,
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'sanctions:screened'
}

const approveKyc: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'kyc-checks',
    id: state.kycId as string,
    data: {
      status: 'approved',
      completedAt: new Date().toISOString(),
      screenedAt: new Date().toISOString(),
      nextReviewDue: new Date(Date.now() + 365 * 86_400_000).toISOString(),
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'kyc:approved'
}

const rescreen: ChainStepImpl = async (payload, ctx, state) => {
  // Simulate the scheduled re-screen task firing — re-bumps lastScreenedAt
  // + writes a fresh ai-suggestions row.
  await payload.create({
    collection: 'ai-suggestions',
    data: {
      tenant: ctx.tenantId,
      suggestionId: crypto.randomUUID(),
      feature: 'ai_sanctions_screening',
      model: '@cf/meta/llama-3.2-11b-vision-instruct',
      inferenceTime: new Date().toISOString(),
      inputs: { ubo: state.uboId, screen: 'EU CFSP + OFAC + UN', mode: 'rescreen' },
      outputs: { matches: [], confidence: 0.99, decision: 'no_match' },
      confidence: 0.99,
      aiRiskClass: 'high',
      humanDecision: 'auto_accepted', // re-screen with prior clean → auto-accept
      sourceCollection: 'kyc-checks',
      sourceId: state.kycId,
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  await payload.update({
    collection: 'kyc-checks',
    id: state.kycId as string,
    data: {
      screenedAt: new Date().toISOString(),
      nextReviewDue: new Date(Date.now() + 365 * 86_400_000).toISOString(),
      status: 'rescreened',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'kyc:rescreened'
}

export const kycSanctionsReviewImpls: ChainImpls = [
  onboardCustomer, initiateKyc, registerUbo, screenSanctions, approveKyc, rescreen,
]
