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
    // Slice QQQQQ — meta-automation. Hourly sweep:
    //   1. Call erpax.invariants.runOnSchedule (TBD MCP tool) OR
    //      delegate to in-process proposer with a small recent-result window.
    //   2. For each WARN/FAIL, propose a fix; auto-apply where safe.
    //   3. Emit fix:proposed for every proposal so the audit trail
    //      shows what the meta-agent decided.
    //
    // The proposer logic lives in src/services/meta-automation/ —
    // ctx.mcp gives this agent access to every erpax.* tool.
    const effects: AgentEffect[] = [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: 'meta-sweep', action: 'scheduled-sweep' } },
    ]
    // The actual invariant-run + proposer-dispatch is invoked here in
    // production — keep the agent itself thin so onSchedule stays under
    // the Worker CPU budget. The dispatcher reads results from the
    // architecture-invariants suite + persists fix:proposed events.
    effects.push({
      kind: 'emit',
      event: {
        id: 'meta:sweep:tick',
        tenantId: ctx.tenantId,
        payload: { at: new Date().toISOString() },
        emittedAt: new Date().toISOString(),
      },
    })
    return effects
  },
}
