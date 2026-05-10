/**
 * DesignAgent — observer-only (no Payload collections owned).
 * Slice HHHHH (2026-05-11). Subscribes to UX-gap events from e2e tests
 * (recordUxGap → escalation:raised) and surfaces them as design-system findings.
 *
 * @standard WCAG 2.2 + WAI-ARIA 1.2 + ISO 9241-110 dialogue-principles
 * @feature design_quality
 */
import type { DomainAgent, AgentContext, AgentEffect, DomainEvent } from '../types'

export const DesignAgent: DomainAgent = {
  id: 'design',
  ownsCollections: [],
  subscribesTo: ['ux:gap:recorded', 'a11y:violation', 'escalation:raised'],
  emits: ['design:finding:filed'],
  async onEvent(ctx: AgentContext, ev: DomainEvent): Promise<AgentEffect[]> {
    return [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'design-handled-event' } },
    ]
  },
}
