/**
 * MetaSkillAgent — pure observer / meta-automation hook (slice QQQQQ scope).
 * Slice IIIII (2026-05-11). Owns no Payload collections. Listens to every
 * conservation-invariant failure, every gap-detected escalation, every
 * spec-coverage warning — and (in QQQQQ) proposes fixes via MCP tools.
 *
 * @feature meta_automation
 */
import type { DomainAgent, AgentContext, AgentEffect, DomainEvent } from '../types'

export const MetaSkillAgent: DomainAgent = {
  id: 'meta-skill',
  ownsCollections: [],
  subscribesTo: ['invariant:failed', 'invariant:warned', 'gap:detected', 'spec:coverage:warned', 'i18n:stub:detected'],
  emits: ['fix:proposed', 'spec:tag:suggested', 'i18n:translation:requested'],
  cron: '0 */1 * * *',  // hourly — sweep for new gaps, propose fixes (QQQQQ)
  async onEvent(ctx: AgentContext, ev: DomainEvent): Promise<AgentEffect[]> {
    // Today: just record the event for traceability.
    // QQQQQ slice extends this to call erpax.spec.fillBanner / erpax.i18n.translateBatch
    // / erpax.chain.backfillMarkup via ctx.mcp and emit fix:proposed.
    return [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'meta-observed' } },
    ]
  },
  async onSchedule(ctx: AgentContext): Promise<AgentEffect[]> {
    // Hourly sweep stub. QQQQQ replaces with: run conservation invariants
    // → for each WARN/FAIL, call ctx.mcp.callTool('erpax.invariants.proposeFix', ...)
    // → emit fix:proposed.
    return [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: 'meta-sweep', action: 'scheduled-sweep' } },
    ]
  },
}
