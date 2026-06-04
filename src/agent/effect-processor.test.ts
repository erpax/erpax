/**
 * Tests for the AgentEffect processor — verifies each kind routes to
 * the correct substrate callback (no direct Payload create for notify
 * or escalate; both fan out via ctx.emit).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect, vi } from 'vitest'
import { processEffect, processEffects } from '@/agent/effect-processor'
import type { AgentContext, AgentEffect } from '@/agent/types'

function mockCtx(overrides: Partial<AgentContext> = {}): AgentContext {
  return {
    payload: {
      create: vi.fn().mockResolvedValue({ id: 'new-id' }),
      update: vi.fn().mockResolvedValue({}),
    } as unknown as AgentContext['payload'],
    tenantId: 'tenant-1',
    locale: 'en',
    t: (key: string) => key,
    emit: vi.fn(),
    audit: vi.fn(),
    capture: vi.fn(),
    call: vi.fn(async () => []) as AgentContext['call'],
    mcp: {} as AgentContext['mcp'],
    ...overrides,
  }
}

describe('processEffect', () => {
  it('handles create — calls payload.create with collection + data', async () => {
    const ctx = mockCtx()
    await processEffect({ kind: 'create', collection: 'invoices', data: { amount: 100 } }, ctx)
    expect(ctx.payload.create).toHaveBeenCalledWith({
      collection: 'invoices',
      data: { amount: 100 },
      overrideAccess: true,
    })
  })

  it('handles update — calls payload.update with collection + id + patch', async () => {
    const ctx = mockCtx()
    await processEffect(
      { kind: 'update', collection: 'invoices', id: 'inv-1', patch: { status: 'paid' } },
      ctx,
    )
    expect(ctx.payload.update).toHaveBeenCalledWith({
      collection: 'invoices',
      id: 'inv-1',
      data: { status: 'paid' },
      overrideAccess: true,
    })
  })

  it('handles emit — routes through ctx.emit verbatim', async () => {
    const ctx = mockCtx()
    const ev = { id: 'invoice:activated', tenantId: 't', payload: {}, emittedAt: '2026-05-11T00:00:00Z' }
    await processEffect({ kind: 'emit', event: ev }, ctx)
    expect(ctx.emit).toHaveBeenCalledWith(ev)
  })

  it('handles audit — routes through ctx.audit', async () => {
    const ctx = mockCtx()
    const leaf = { tenantId: 't', subjectCollection: 'invoices', subjectId: 'i-1', action: 'create' }
    await processEffect({ kind: 'audit', leaf }, ctx)
    expect(ctx.audit).toHaveBeenCalledWith(leaf)
  })

  it('handles capture — routes through ctx.capture', async () => {
    const ctx = mockCtx()
    const frame = { workflow: 'o2c', stepId: '01', captionKey: 'workflow.o2c.steps.01' }
    await processEffect({ kind: 'capture', frame }, ctx)
    expect(ctx.capture).toHaveBeenCalledWith(frame)
  })

  it('handles call — addresses one named agent via ctx.call (the agent-to-agent effect twin)', async () => {
    const ctx = mockCtx()
    const event = { id: 'fx:quote-requested', tenantId: 't', payload: { pair: 'EURBGN' }, emittedAt: '' }
    await processEffect({ kind: 'call', agentId: 'finance', event }, ctx)
    expect(ctx.call).toHaveBeenCalledWith('finance', event)
  })

  it('handles notify — composes template + emits notification:<channel> domain event', async () => {
    const ctx = mockCtx({ t: (key: string) => (key === 'notify.welcome' ? 'Welcome {{name}}' : key) })
    await processEffect(
      { kind: 'notify', channel: 'email', templateKey: 'notify.welcome', vars: { name: 'Tsvetan' } },
      ctx,
    )
    expect(ctx.payload.create).not.toHaveBeenCalled()
    expect(ctx.emit).toHaveBeenCalledWith(expect.objectContaining({
      id: 'notification:email',
      tenantId: 'tenant-1',
      payload: expect.objectContaining({
        channel: 'email',
        body: 'Welcome Tsvetan',
        templateKey: 'notify.welcome',
        vars: { name: 'Tsvetan' },
      }),
    }))
  })

  it('handles escalate — composes template + emits escalation:raised domain event', async () => {
    const ctx = mockCtx({ t: (_key: string) => 'Order is overdue' })
    await processEffect(
      { kind: 'escalate', severity: 'major', templateKey: 'escalate.overdue', vars: {} },
      ctx,
    )
    expect(ctx.payload.create).not.toHaveBeenCalled()
    expect(ctx.emit).toHaveBeenCalledWith(expect.objectContaining({
      id: 'escalation:raised',
      tenantId: 'tenant-1',
      payload: expect.objectContaining({
        severity: 'major',
        description: 'Order is overdue',
        templateKey: 'escalate.overdue',
      }),
    }))
  })

  it('exhaustiveness — unknown kind throws (TypeScript prevents this; runtime guard)', async () => {
    const ctx = mockCtx()
    await expect(
      processEffect({ kind: 'bogus' } as unknown as AgentEffect, ctx),
    ).rejects.toThrow(/unknown effect kind: bogus/)
  })
})

describe('processEffects', () => {
  it('processes a sequence in order', async () => {
    const ctx = mockCtx()
    const effects: AgentEffect[] = [
      { kind: 'create', collection: 'a', data: {} },
      { kind: 'audit', leaf: { tenantId: 't', subjectCollection: 'a', subjectId: '1', action: 'x' } },
      { kind: 'capture', frame: { workflow: 'w', stepId: 's', captionKey: 'k' } },
    ]
    await processEffects(effects, ctx)
    expect(ctx.payload.create).toHaveBeenCalledTimes(1)
    expect(ctx.audit).toHaveBeenCalledTimes(1)
    expect(ctx.capture).toHaveBeenCalledTimes(1)
  })
})
