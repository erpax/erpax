import { describe, it, expect, beforeAll } from 'vitest'
import { walk, SKILLS_DIR, allSkills } from '@/corpus'
import { navigationGroupsFromPaths, pathNavMeta } from '@/navigation'

const SAMPLE = ['agents/mcp/tool', 'agents/accounting', 'vitepress', 'corpus', 'skill/router'] as const

const subsetTree = (items: ReturnType<typeof navigationGroupsFromPaths>) =>
  items
    .filter((i) => ['agents', 'corpus', 'skill', 'vitepress'].includes(i.text))
    .map((i) => ({
      text: i.text,
      link: i.link,
      collapsed: i.collapsed,
      items: i.items?.map((c) => ({
        text: c.text,
        link: c.link,
        collapsed: c.collapsed,
        items: c.items,
      })),
    }))

describe('corpus — sidebar aligned with navigationGroupsFromPaths', () => {
  beforeAll(() => {
    if (allSkills.length === 0) walk(SKILLS_DIR)
  })

  it('walk sidebar matches pure path-derived groups for sample atoms', () => {
    const pure = navigationGroupsFromPaths([...SAMPLE])
    const live = walk(SKILLS_DIR).filter((i) => subsetTree(pure).some((p) => p.text === i.text))
    expect(subsetTree(pure)).toEqual(subsetTree(live))
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
