import { describe, expect, it, vi } from 'vitest'
import type { PayloadRequest } from 'payload'

import { GAP, errorText, gapLexicon, recordGap } from '@/plugins/mcp/gap'
import { wordsOf } from '@/utilities/prompt'

const requestFor = (user: unknown) => {
  const create = vi.fn(async () => ({ id: 'mem-1' }))
  const find = vi.fn(async () => ({ docs: [] }))
  const warn = vi.fn()
  const req = { user, context: {}, payload: { create, find, logger: { warn } } } as unknown as PayloadRequest
  return { req, create, find, warn }
}

const failed = { isError: true, content: [{ type: 'text', text: 'Collection "orders" is not served' }] }
const agent = { id: 'agent-1', tenants: [{ tenant: 'tenant-1', roles: ['user'] }] }

describe('gap — a failed MCP call becomes an emerging_gap memory', () => {
  it('is the prompt feel think emote aware, every word known', () => {
    expect(wordsOf(GAP)).toEqual(['feel', 'think', 'emote', 'aware'])
    for (const w of wordsOf(GAP)) expect(gapLexicon).toHaveProperty(w)
  })

  it('records nothing for a successful call and returns it unchanged', async () => {
    const { req, create } = requestFor(agent)
    const ok = { content: [{ type: 'text', text: 'done' }] }
    expect(await recordGap({ input: {}, req, response: ok, toolName: 'findDocuments' })).toBe(ok)
    expect(create).not.toHaveBeenCalled()
  })

  it('records a failed call as a memory owned by the agent, in its tenant', async () => {
    const { req, create } = requestFor(agent)
    expect(await recordGap({ input: { collection: 'orders' }, req, response: failed, toolName: 'findDocuments' })).toBe(failed)
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'memories',
        overrideAccess: true,
        data: expect.objectContaining({
          kind: 'emerging_gap',
          ownerType: 'agent',
          ownerId: 'agent-1',
          key: 'findDocuments',
          tenant: 'tenant-1',
          payload: expect.objectContaining({ error: 'Collection "orders" is not served' }),
        }),
      }),
    )
    // awareness: the gap is broadcast to the tenant's chat room
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'chat',
        data: expect.objectContaining({ event: 'gap:recorded', aggregateId: 'mem-1', agent: 'agent-1', tenant: 'tenant-1' }),
      }),
    )
  })

  it('keeps the response when the memory cannot be written, and broadcasts nothing', async () => {
    const { req, create, warn } = requestFor(agent)
    create.mockRejectedValueOnce(new Error('tenant required'))
    expect(await recordGap({ input: {}, req, response: failed, toolName: 'createDocuments' })).toBe(failed)
    expect(warn).toHaveBeenCalled()
    expect(create).toHaveBeenCalledTimes(1)
  })

  it('reads the error text the client saw', () => {
    expect(errorText(failed)).toBe('Collection "orders" is not served')
    expect(errorText({})).toBe('')
  })
})
