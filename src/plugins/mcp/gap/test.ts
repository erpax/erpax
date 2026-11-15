import { describe, expect, it, vi } from 'vitest'
import type { PayloadRequest } from 'payload'

import { errorText, gapOf, recordGap } from '@/plugins/mcp/gap'

const requestFor = (user: unknown) => {
  const create = vi.fn(async () => ({}))
  const warn = vi.fn()
  const req = { user, payload: { create, logger: { warn } } } as unknown as PayloadRequest
  return { req, create, warn }
}

const failed = { isError: true, content: [{ type: 'text', text: 'Collection "orders" is not served' }] }
const agent = { id: 'agent-1', tenants: [{ tenant: 'tenant-1', roles: ['user'] }] }

describe('gap — a failed MCP call becomes an emerging_gap memory', () => {
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
        data: expect.objectContaining({ kind: 'emerging_gap', ownerType: 'agent', ownerId: 'agent-1', key: 'findDocuments', tenant: 'tenant-1' }),
      }),
    )
  })

  it('keeps the response when the memory cannot be written', async () => {
    const { req, create, warn } = requestFor(agent)
    create.mockRejectedValueOnce(new Error('tenant required'))
    expect(await recordGap({ input: {}, req, response: failed, toolName: 'createDocuments' })).toBe(failed)
    expect(warn).toHaveBeenCalled()
  })

  it('names an anonymous caller and leaves the tenant out when there is none', () => {
    const { req } = requestFor(null)
    const gap = gapOf({ input: {}, req, response: failed, toolName: 'getConfigInfo' })
    expect(gap.ownerId).toBe('anonymous')
    expect('tenant' in gap).toBe(false)
    expect(errorText(failed)).toBe('Collection "orders" is not served')
  })
})
