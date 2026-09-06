/**
 * PluginsAgent — owns industry-templates + per-country-compliance.
 * Slice IIIII (2026-05-11). Manages the plugin marketplace surface (BBBBB future).
 *
 * @feature plugin_marketplace
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const PluginsAgent: DomainAgent = {
  id: 'plugins',
  ownsCollections: ['industry-templates', 'per-country-compliance'],
  subscribesTo: ['plugin:installed', 'plugin:enabled', 'plugin:disabled'],
  emits: ['plugin:installed', 'plugin:enabled', 'plugin:disabled'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'plugins-handled-event' } }]
  },
}
