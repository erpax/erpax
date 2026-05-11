/**
 * In-process MCP client contract tests.
 *
 * Slice GGGGGGGGG (2026-05-11). Covers the same-surface guarantee from
 * Slice DDDDD: agents call MCP tools via this in-process client, and
 * external clients hit them over HTTP through the Payload plugin — both
 * paths must share one handler. This test pins the in-process side:
 *
 *   1. `listTools()` projects each tool to its public descriptor
 *      (name + description, no handler, no zod shape leak).
 *   2. `callTool(name, args)` finds the right handler, invokes it with
 *      both args and req, and joins all `content.text` parts with '\n'.
 *   3. `callTool('does-not-exist')` rejects with a clear error.
 *
 * @standard MCP 0.6 (tools/list + tools/call)
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect, vi } from 'vitest'
import { createInProcessMcpClient } from './in-process-client'
import type { ErpaxMcpTool } from './tool-defs'
import type { PayloadRequest } from 'payload'

/** Build a fake tool with a spy handler. */
function fakeTool(name: string, description: string, output: string): ErpaxMcpTool {
  return {
    name,
    description,
    parameters: {} as ErpaxMcpTool['parameters'],
    handler: vi.fn(async () => ({
      content: [{ text: output, type: 'text' as const }],
    })),
  }
}

const fakeReq = {} as unknown as PayloadRequest

describe('createInProcessMcpClient', () => {
  it('listTools projects every tool to a public descriptor', () => {
    const t1 = fakeTool('erpax.consistency.scan', 'desc-1', 'ok')
    const t2 = fakeTool('erpax.events.list',      'desc-2', 'ok')
    const client = createInProcessMcpClient([t1, t2], fakeReq)
    const out = client.listTools()
    expect(out).toEqual([
      { name: 'erpax.consistency.scan', description: 'desc-1' },
      { name: 'erpax.events.list',      description: 'desc-2' },
    ])
    // Crucially: no handler leak.
    for (const d of out) {
      expect(d).not.toHaveProperty('handler')
      expect(d).not.toHaveProperty('parameters')
    }
  })

  it('callTool finds the handler, passes args + req, joins text parts', async () => {
    const t1 = fakeTool('erpax.consistency.scan', 'desc', 'first')
    // Custom multi-part handler — proves we join with '\n'.
    const t2: ErpaxMcpTool = {
      name: 'erpax.events.list',
      description: 'multi-part',
      parameters: {} as ErpaxMcpTool['parameters'],
      handler: vi.fn(async () => ({
        content: [
          { text: 'A', type: 'text' as const },
          { text: 'B', type: 'text' as const },
          { text: 'C', type: 'text' as const },
        ],
      })),
    }
    const client = createInProcessMcpClient([t1, t2], fakeReq)
    const out = await client.callTool('erpax.events.list', { foo: 'bar' })
    expect(out).toBe('A\nB\nC')
    expect(t2.handler).toHaveBeenCalledWith({ foo: 'bar' }, fakeReq)
    expect(t1.handler).not.toHaveBeenCalled()
  })

  it('callTool with an unknown name throws a clear error', async () => {
    const client = createInProcessMcpClient([fakeTool('erpax.x.y', 'd', '')], fakeReq)
    await expect(client.callTool('erpax.nope', {})).rejects.toThrow(
      /unknown MCP tool: erpax\.nope/,
    )
  })
})
