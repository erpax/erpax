/**
 * ProductAgent — owns project work (milestones, tasks, projects).
 * Slice HHHHH (2026-05-11).
 *
 * @standard PMI PMBOK 7th-edition project-management
 * @feature project_management
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const ProductAgent: DomainAgent = {
  id: 'product',
  ownsCollections: ['project-milestones', 'project-tasks', 'projects'],
  subscribesTo: ['milestone:reached', 'project:completed'],
  emits: ['milestone:reached', 'project:completed'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'product-handled-event' } }]
  },
}
