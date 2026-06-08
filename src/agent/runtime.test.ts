/**
 * Tests for the AgentRuntime dispatcher — verifies chain-step routing
 * via the `collection=` marker, event fan-out across subscribed agents,
 * and scheduled-tick dispatch by agent id.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect, vi } from 'vitest'
import { createAgentRuntime } from './runtime'
import { createAgentRegistry } from './registry'
import type { AgentContext, AgentEffect, DomainAgent, DomainEvent } from './types'

function mockCtx(): AgentContext {
  return {
    payload: {
      create: vi.fn().mockResolvedValue({ id: 'x' }),
      update: vi.fn().mockResolvedValue({}),
    } as unknown as AgentContext['payload'],
    tenantId: 't',
    locale: 'en',
    t: (k: string) => k,
    emit: vi.fn(),
    audit: vi.fn(),
    capture: vi.fn(),
    call: vi.fn(async () => []) as AgentContext['call'],
    mcp: {} as AgentContext['mcp'],
  }
}

describe('AgentRuntime.dispatchChainStep', () => {
  it('resolves the owning agent from step.collection and processes its effects', async () => {
    const created: AgentEffect[] = [
      { kind: 'audit', leaf: { tenantId: 't', subjectCollection: 'invoices', subjectId: 'i-1', action: 'post' } },
    ]
    const finance: DomainAgent = {
      id: 'finance',
      ownsCollections: ['invoices'],
      subscribesTo: [],
      emits: [],
      onChainStep: async () => created,
    }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    const ctx = mockCtx()
    const out = await rt.dispatchChainStep(ctx, {
      chainId: 'O2C', stepIndex: 1, totalSteps: 4, note: 'collection=invoices action=post',
    })
    expect(ctx.audit).toHaveBeenCalledWith(created[0]!.kind === 'audit' ? created[0]!.leaf : undefined)
    expect(out).toEqual(created)
  })

  it('returns [] when the step note has no collection= marker', async () => {
    const finance: DomainAgent = {
      id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [],
      onChainStep: async () => [{ kind: 'emit', event: { id: 'x', tenantId: 't', payload: {}, emittedAt: '' } }],
    }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    const ctx = mockCtx()
    const out = await rt.dispatchChainStep(ctx, { chainId: 'X', stepIndex: 1, totalSteps: 1, note: 'no marker here' })
    expect(out).toEqual([])
    expect(ctx.emit).not.toHaveBeenCalled()
  })

  it('returns [] when the collection has no owning agent (Law 7 catches this at build time)', async () => {
    const rt = createAgentRuntime(createAgentRegistry([]))
    const ctx = mockCtx()
    const out = await rt.dispatchChainStep(ctx, {
      chainId: 'X', stepIndex: 1, totalSteps: 1, note: 'collection=ghost action=noop',
    })
    expect(out).toEqual([])
  })

  it('returns [] when the agent has no onChainStep hook', async () => {
    const finance: DomainAgent = { id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [] }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    const out = await rt.dispatchChainStep(mockCtx(), {
      chainId: 'O2C', stepIndex: 1, totalSteps: 4, note: 'collection=invoices action=post',
    })
    expect(out).toEqual([])
  })

  it('attaches chain context (id + step) to the effect-processing AgentContext', async () => {
    let seen: AgentContext | undefined
    const finance: DomainAgent = {
      id: 'finance', ownsCollections: ['invoices'], subscribesTo: [], emits: [],
      onChainStep: async (ctx) => { seen = ctx; return [] },
    }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    await rt.dispatchChainStep(mockCtx(), {
      chainId: 'O2C', stepIndex: 2, totalSteps: 4, note: 'collection=invoices action=post',
    })
    expect(seen?.chain?.id).toBe('O2C')
    expect(seen?.chain?.step.stepIndex).toBe(2)
  })
})

describe('AgentRuntime.dispatchEvent', () => {
  it('fans out to every subscribed agent and processes each one\'s effects', async () => {
    const a1Effects: AgentEffect[] = [{ kind: 'emit', event: { id: 'a', tenantId: 't', payload: {}, emittedAt: '' } }]
    const a2Effects: AgentEffect[] = [{ kind: 'emit', event: { id: 'b', tenantId: 't', payload: {}, emittedAt: '' } }]
    const a1: DomainAgent = {
      id: 'finance', ownsCollections: [], subscribesTo: ['payment:received'], emits: [], onEvent: async () => a1Effects,
    }
    const a2: DomainAgent = {
      id: 'sales', ownsCollections: [], subscribesTo: ['payment:received'], emits: [], onEvent: async () => a2Effects,
    }
    const rt = createAgentRuntime(createAgentRegistry([a1, a2]))
    const ctx = mockCtx()
    const ev: DomainEvent = { id: 'payment:received', tenantId: 't', payload: {}, emittedAt: '' }
    const out = await rt.dispatchEvent(ctx, ev)
    expect(out).toEqual([...a1Effects, ...a2Effects])
    expect(ctx.emit).toHaveBeenCalledTimes(2)
  })

  it('returns [] when nobody subscribes', async () => {
    const rt = createAgentRuntime(createAgentRegistry([]))
    const out = await rt.dispatchEvent(mockCtx(), { id: 'nobody-listens', tenantId: 't', payload: {}, emittedAt: '' })
    expect(out).toEqual([])
  })
})

describe('AgentRuntime.dispatchTo — the agent-to-agent address (dual of broadcast)', () => {
  it('runs EXACTLY the named agent and processes its effects', async () => {
    const fx: AgentEffect[] = [{ kind: 'emit', event: { id: 'fx', tenantId: 't', payload: {}, emittedAt: '' } }]
    const finance: DomainAgent = {
      id: 'finance', ownsCollections: [], subscribesTo: [], emits: [], onEvent: async () => fx,
    }
    const sales: DomainAgent = {
      id: 'sales', ownsCollections: [], subscribesTo: [], emits: [],
      onEvent: async () => { throw new Error('dispatchTo must address ONE agent, never fan out') },
    }
    const rt = createAgentRuntime(createAgentRegistry([finance, sales]))
    const ctx = mockCtx()
    const out = await rt.dispatchTo(ctx, 'finance', { id: 'q', tenantId: 't', payload: {}, emittedAt: '' })
    expect(out).toEqual(fx) // only the addressed agent's effects
    expect(ctx.emit).toHaveBeenCalledTimes(1) // and they were processed; sales never ran
  })

  it('returns [] for an unknown agent or one without onEvent', async () => {
    const noHook: DomainAgent = { id: 'finance', ownsCollections: [], subscribesTo: [], emits: [] }
    const rt = createAgentRuntime(createAgentRegistry([noHook]))
    const ev: DomainEvent = { id: 'q', tenantId: 't', payload: {}, emittedAt: '' }
    expect(await rt.dispatchTo(mockCtx(), 'finance', ev)).toEqual([]) // registered, no onEvent
    expect(await rt.dispatchTo(mockCtx(), 'sales', ev)).toEqual([]) // not registered
  })
})

describe('AgentRuntime.dispatchSchedule', () => {
  it('resolves the agent by id and runs its onSchedule hook', async () => {
    const ranEffects: AgentEffect[] = [{ kind: 'audit', leaf: { tenantId: 't', subjectCollection: 'x', subjectId: 'y', action: 'tick' } }]
    const finance: DomainAgent = {
      id: 'finance', ownsCollections: [], subscribesTo: [], emits: [], cron: '0 * * * *', onSchedule: async () => ranEffects,
    }
    const rt = createAgentRuntime(createAgentRegistry([finance]))
    const ctx = mockCtx()
    const out = await rt.dispatchSchedule(ctx, 'finance')
    expect(ctx.audit).toHaveBeenCalled()
    expect(out).toEqual(ranEffects)
  })

  it('returns [] when no such agent or no onSchedule hook', async () => {
    const rt = createAgentRuntime(createAgentRegistry([]))
    expect(await rt.dispatchSchedule(mockCtx(), 'finance')).toEqual([])
  })
})
