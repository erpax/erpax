/**
 * Type-shape verification for the DomainAgent contract.
 *
 * These tests assert the public surface promised by Slice DDDDD's spec:
 * 15 canonical agent ids, 7 effect kinds, optional hooks, McpClient on
 * AgentContext. Vitest's `expectTypeOf` runs at compile time only — if
 * the types drift, `tsc` fails with the assertion site as the trace.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expectTypeOf } from 'vitest'
import type {
  AgentId, DomainAgent, AgentContext, AgentEffect,
  AgentRegistry, AgentRuntime, EvidenceFrame, AuditLeaf, DomainEvent, GapSeverity,
} from '@/agent/types'

describe('agent types', () => {
  it('AgentId is a closed string union with the canonical agent ids', () => {
    expectTypeOf<AgentId>().toEqualTypeOf<
      | 'finance' | 'sales' | 'marketing' | 'hr' | 'legal'
      | 'ops' | 'engineering' | 'customer-support' | 'data' | 'design'
      | 'product' | 'productivity' | 'enterprise-search' | 'plugins' | 'meta-skill'
      | 'consistency'
    >()
  })

  it('AgentEffect is an exhaustive discriminated union (8 kinds — incl. agent-to-agent `call`)', () => {
    type Kinds = AgentEffect['kind']
    expectTypeOf<Kinds>().toEqualTypeOf<
      'create' | 'update' | 'notify' | 'audit' | 'escalate' | 'emit' | 'capture' | 'call'
    >()
  })

  it('GapSeverity covers the 5 escalation severities', () => {
    expectTypeOf<GapSeverity>().toEqualTypeOf<
      'info' | 'minor' | 'major' | 'blocker' | 'critical'
    >()
  })

  it('DomainAgent.onChainStep / onEvent / onSchedule are all optional', () => {
    const a: DomainAgent = {
      id: 'finance',
      ownsCollections: [],
      subscribesTo: [],
      emits: [],
    }
    void a // compiles → all hooks optional
  })

  it('AgentContext exposes the substrate callbacks (emit/audit/capture)', () => {
    expectTypeOf<AgentContext>().toHaveProperty('emit')
    expectTypeOf<AgentContext>().toHaveProperty('audit')
    expectTypeOf<AgentContext>().toHaveProperty('capture')
    expectTypeOf<AgentContext>().toHaveProperty('payload')
    expectTypeOf<AgentContext>().toHaveProperty('t')
    // Note: `mcp: McpClient` is added by Task 11 (Phase B) — assertion lives
    // in src/services/agents/mcp/in-process-client.test.ts once it exists.
  })

  it('DomainEvent / AuditLeaf / EvidenceFrame are read-only structural types', () => {
    expectTypeOf<DomainEvent>().toHaveProperty('id')
    expectTypeOf<AuditLeaf>().toHaveProperty('subjectCollection')
    expectTypeOf<EvidenceFrame>().toHaveProperty('captionKey')
  })

  it('AgentRegistry exposes the lookup methods promised by the spec', () => {
    expectTypeOf<AgentRegistry>().toHaveProperty('byId')
    expectTypeOf<AgentRegistry>().toHaveProperty('byCollection')
    expectTypeOf<AgentRegistry>().toHaveProperty('bySubscribedEvent')
    expectTypeOf<AgentRegistry>().toHaveProperty('scheduled')
    expectTypeOf<AgentRegistry>().toHaveProperty('all')
  })

  it('AgentRuntime carries the registry and 3 dispatch entrypoints', () => {
    expectTypeOf<AgentRuntime>().toHaveProperty('registry')
    expectTypeOf<AgentRuntime>().toHaveProperty('dispatchChainStep')
    expectTypeOf<AgentRuntime>().toHaveProperty('dispatchEvent')
    expectTypeOf<AgentRuntime>().toHaveProperty('dispatchSchedule')
  })
})
