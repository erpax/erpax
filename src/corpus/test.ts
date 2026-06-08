import { describe, it, expect, beforeAll } from 'vitest'
import { walk, SKILLS_DIR, allSkills } from '@/corpus'
import { navigationGroupsFromPaths, pathNavMeta } from '@/navigation'

const SAMPLE = ['agents/mcp/tool', 'agents/accounting', 'vitepress', 'corpus', 'skill/router'] as const

describe('corpus — sidebar aligned with navigationGroupsFromPaths', () => {
  beforeAll(() => {
    if (allSkills.length === 0) walk(SKILLS_DIR)
  })

  it('walk sidebar equals navigationGroupsFromPaths of every collected skill path', () => {
    const paths = allSkills.map((s) => s.route.replace(/^\//, '').replace(/\/SKILL$/, ''))
    const pure = navigationGroupsFromPaths(paths)
    expect(pure).toEqual(walk(SKILLS_DIR))
  })

  it('live corpus paths carry consistent nav · group metadata', () => {
    for (const p of SAMPLE) {
      const meta = pathNavMeta(p)
      const live = allSkills.find((s) => s.route === meta.route)
      expect(live, `missing live skill for ${p}`).toBeDefined()
      expect(meta.group).toBe(meta.path[0])
      expect(meta.nav).toEqual(meta.path.slice(0, -1))
    }
  })
})
