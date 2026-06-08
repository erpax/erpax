/**
 * LegalAgent — owns contracts + KYC + GDPR consent + qualified-trust evidence.
 * Slice GGGGG (2026-05-11). Drives KYC_SANCTIONS_REVIEW chain.
 *
 * @standard GDPR Art-7 consent + Art-15 access + Art-17 erasure
 * @standard eIDAS qualified-trust-services
 * @feature legal_core
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'

export const LegalAgent: DomainAgent = {
  id: 'legal',
  ownsCollections: ['contracts', 'beneficial-owners', 'kyc-checks', 'consent-records', 'data-subject-requests', 'data-processing-activities', 'evidence-attestations'],
  subscribesTo: ['contract:signed', 'kyc:approved', 'kyc:rejected', 'dsr:received'],
  emits: ['contract:signed', 'kyc:approved', 'kyc:rejected', 'dsr:fulfilled'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'legal-handled-event' } }]
  },
}
