import { describe, it, expect } from 'vitest'
import {
  buildErrorTools,
  buildChainTools,
  buildFormatTools,
  buildGovernanceTools,
  buildSecurityTools,
} from '@/agents/mcp/tool'

// The per-area MCP tool barrel (./index.ts): each factory is self-contained and
// every tool it yields carries the erpax.<area>.* name prefix — the naming
// convention IS the contract that lets tool-defs.ts concatenate the surface.
describe('agents/mcp/tool — per-area builders, erpax.<area>.* prefix invariant', () => {
  const cases: ReadonlyArray<[string, () => ReadonlyArray<{ name: string; description: string }>]> = [
    ['erpax.error.', buildErrorTools],
    ['erpax.chain.', buildChainTools],
    ['erpax.format.', buildFormatTools],
    ['erpax.governance.', buildGovernanceTools],
    ['erpax.security.', buildSecurityTools],
  ]

  it('every dep-free factory is an exported function', () => {
    for (const [, factory] of cases) expect(typeof factory).toBe('function')
  })

  it('every factory yields at least one tool, all carrying its area prefix', () => {
    for (const [prefix, factory] of cases) {
      const tools = factory()
      expect(tools.length).toBeGreaterThan(0)
      for (const t of tools) {
        expect(t.name.startsWith(prefix)).toBe(true)
        expect(typeof t.description).toBe('string')
        expect(t.description.length).toBeGreaterThan(0)
      }
    }
  })

  it('tool names are unique within and across the area families', () => {
    const names = cases.flatMap(([, factory]) => factory().map((t) => t.name))
    expect(new Set(names).size).toBe(names.length)
  })

  it('each factory is pure — re-invoking yields the same tool name set', () => {
    for (const [, factory] of cases) {
      const a = factory().map((t) => t.name).sort()
      const b = factory().map((t) => t.name).sort()
      expect(a).toEqual(b)
    }
  })
})
