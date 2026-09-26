import { describe, it, expect } from 'vitest'
import { buildOutwardTools } from './index'

describe('agents/mcp/tool/outward — the boundary, asked over MCP', () => {
  const tools = buildOutwardTools()

  it('offers exactly the two erpax.outward.* tools', () => {
    expect(tools.map((t) => t.name)).toEqual(['erpax.outward.leads', 'erpax.outward.next'])
  })

  it('every description carries its own honest boundary, so a caller cannot read the number alone', () => {
    const leads = tools.find((t) => t.name === 'erpax.outward.leads')!
    const next = tools.find((t) => t.name === 'erpax.outward.next')!
    // the refusal that keeps a downed rail from reading as news
    expect(String(leads.description)).toMatch(/UNREACHABLE IS NOT A LEAD/i)
    // and the admission that there is no priority model
    expect(String(next.description)).toMatch(/not the most important/i)
  })

  it('leads is READ-ONLY unless `write` is asked for — the book is not advanced by a query', () => {
    const leads = tools.find((t) => t.name === 'erpax.outward.leads')!
    expect(Object.keys(leads.parameters)).toEqual(['write'])
    // `next` takes nothing: asking what is next cannot change what is next
    expect(Object.keys(tools.find((t) => t.name === 'erpax.outward.next')!.parameters)).toEqual([])
  })

  it('the tool names match the atom they expose, so the surface cannot drift from the law', () => {
    for (const t of tools) expect(t.name.startsWith('erpax.outward.')).toBe(true)
  })
})

describe('outward — the factory is not the surface', () => {
  it('reaches the LIVE MCP surface, not just this factory', async () => {
    // `buildOutwardTools` was exported from the tool barrel and never CALLED in tool-defs: its
    // tools were built, tested green, and reachable from nothing. Measured after: 8 of 8 tool atoms
    // tested only their own factory. A test that exercises a builder proves the builder builds and
    // cannot prove anything asks it — rules/canonical's law, restated for a test.
    const { toolsLiveUnder } = await import('@/agents/mcp')
    expect(await toolsLiveUnder('erpax.outward.')).toBe(true)
  })
})
