import { describe, it, expect } from 'vitest'
import { SKILL_INDEX } from '@/skill/router'
import { pathNavMeta } from '@/navigation'

describe('skill/router — nav manifest aligned with path groups', () => {
  it('every indexed skill carries nav · group derived from its path', () => {
    const sample = SKILL_INDEX.find((s) => s.path.join('/') === 'agents/mcp/tool')
    expect(sample).toBeDefined()
    const meta = pathNavMeta('agents/mcp/tool')
    expect(sample!.nav).toEqual(meta.nav)
    expect(sample!.group).toBe(meta.group)
    expect(sample!.route).toBe(meta.route)
  })

  it('root atoms have empty nav and group equal to leaf', () => {
    const vitepress = SKILL_INDEX.find((s) => s.path.join('/') === 'vitepress')
    expect(vitepress?.nav).toEqual([])
    expect(vitepress?.group).toBe('vitepress')
  })
})
