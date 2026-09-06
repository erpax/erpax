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
import { ownedChainStepAudit } from '../step'

export const LegalAgent: DomainAgent = {
  id: 'legal',
  ownsCollections: ['contracts', 'beneficial-owners', 'kyc-checks', 'consent-records', 'data-subject-requests', 'data-processing-activities', 'evidence-attestations'],
  subscribesTo: ['contract:signed', 'kyc:approved', 'kyc:rejected', 'dsr:received'],
  emits: ['contract:signed', 'kyc:approved', 'kyc:rejected', 'dsr:fulfilled'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'legal-handled-event' } }]
  },
}
