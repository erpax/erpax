/**
 * createAgentContext — the one context seam, proved. Green by construction:
 * an unwired substrate gets safe defaults, provided substrate passes through,
 * and `ctx.call` is wired to `runtime.dispatchTo` on THIS context (the
 * agent-to-agent wire). @see ./context.ts
 */
import { describe, it, expect, vi } from 'vitest'
import { createAgentContext } from './context'
import type { AgentContext, AgentEffect, AgentRuntime, DomainEvent } from './types'

const PAYLOAD = {} as AgentContext['payload']
const MCP = {} as AgentContext['mcp']

function stubRuntime() {
  const dispatchTo = vi.fn(async () => [] as AgentEffect[])
  return { runtime: { dispatchTo } as unknown as AgentRuntime, dispatchTo }
}

describe('createAgentContext — the single AgentContext seam', () => {
  it('fills safe defaults for an unwired substrate (locale / passthrough t / no-op emit·audit·capture)', () => {
    const { runtime } = stubRuntime()
    const ctx = createAgentContext({ runtime, payload: PAYLOAD, tenantId: 't', mcp: MCP })
    expect(ctx.locale).toBe('en')
    expect(ctx.t('some.key', ctx.locale)).toBe('some.key') // passthrough returns the key
    expect(ctx.chain).toBeUndefined()
    expect(() => {
      ctx.emit({ id: 'x', tenantId: 't', payload: {}, emittedAt: '' })
      ctx.audit({ tenantId: 't', subjectCollection: 'x', subjectId: '1', action: 'a' })
      ctx.capture({ workflow: 'w', stepId: 's', captionKey: 'k' })
    }).not.toThrow() // no-op defaults never blow up
  })

  it('wires ctx.call to runtime.dispatchTo on THIS context (the agent-to-agent wire)', async () => {
    const { runtime, dispatchTo } = stubRuntime()
    const ctx = createAgentContext({ runtime, payload: PAYLOAD, tenantId: 't', mcp: MCP })
    const ev: DomainEvent = { id: 'q', tenantId: 't', payload: {}, emittedAt: '' }
    await ctx.call('finance', ev)
    expect(dispatchTo).toHaveBeenCalledWith(ctx, 'finance', ev) // the SAME ctx is threaded to the callee
  })

  it('passes provided substrate through verbatim (t + emit override the defaults)', () => {
    const { runtime } = stubRuntime()
    const emit = vi.fn()
    const t = ((k: string) => `T:${k}`) as AgentContext['t']
    const ctx = createAgentContext({ runtime, payload: PAYLOAD, tenantId: 't', mcp: MCP, emit, t })
    expect(ctx.t('greeting', ctx.locale)).toBe('T:greeting') // not the passthrough default
    ctx.emit({ id: 'x', tenantId: 't', payload: {}, emittedAt: '' })
    expect(emit).toHaveBeenCalledTimes(1)
  })
})
