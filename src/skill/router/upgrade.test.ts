import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  connectFrontmatter,
  connectCorpus,
  upgradeSkillText,
  renderFrontmatter,
  deriveDescription,
  contentUuidOf,
  buildFrontmatterGraph,
  graphConnectivity,
  buildUpgradeContext,
  type ConnectedFrontmatter,
} from './upgrade'

const sampleBody = `---
name: alpha
description: Use when testing alpha.
---

# alpha

Alpha bonds [[beta]] and [[gamma]].

**Law — [[law]]: alpha is a test atom.**
`

const sampleBeta = `---
name: beta
description: Use when testing beta.
---

# beta

Beta links [[alpha]].
`

describe('skill/router/upgrade — computational frontmatter self-upgrade', () => {
  it('deriveDescription preserves Use-when triggers', () => {
    expect(deriveDescription('alpha', sampleBody)).toBe('Use when testing alpha.')
  })

  it('deriveDescription computes from prose when trigger absent', () => {
    const bare = `---\nname: x\ndescription: old\n---\n\n# x\n\nDoes things with [[law]].\n`
    expect(deriveDescription('x', bare)).toMatch(/^Use when reasoning about x —/)
  })

  it('renderFrontmatter is deterministic for the same model', () => {
    const fm: ConnectedFrontmatter = {
      name: 'alpha',
      description: 'Use when testing alpha.',
      atomPath: 'alpha',
      coordinate: 'alpha · 1/first · abcd1234',
      contentUuid: '11111111-1111-5111-8111-111111111111',
      diamondUuid: '22222222-2222-5222-8222-222222222222',
      uuid: '33333333-3333-5333-8333-333333333333',
      horo: 1,
      bonds: { in: ['beta'], out: ['gamma'] },
      typography: { partition: 'alpha', bondDegree: 2, neighbors: ['beta'] },
      standards: ['ISO/IEC 25010:2023'],
      bindings: ['kv/TEST'],
      neighbors: { wikilink: ['beta'], matrix: ['gamma'], backlinks: ['beta'] },
      version: 1,
    }
    expect(renderFrontmatter(fm)).toBe(renderFrontmatter(fm))
  })

  it('upgradeSkillText is idempotent', () => {
    const ctx = buildUpgradeContext()
    const fm = connectFrontmatter('skill/router', readSkill('skill/router'), ctx)
    const once = upgradeSkillText(readSkill('skill/router'), fm)
    const twice = upgradeSkillText(once, connectFrontmatter('skill/router', once, ctx))
    expect(twice).toBe(once)
  })

  it('same corpus ⇒ same connectCorpus patches', () => {
    const a = connectCorpus()
    const b = connectCorpus()
    expect([...a.keys()].sort()).toEqual([...b.keys()].sort())
    for (const k of a.keys()) {
      expect(a.get(k)).toEqual(b.get(k))
    }
  })

  it('contentUuidOf is stable on fixed bytes', () => {
    const bytes = '---\nname: z\n---\n\n# z\n'
    expect(contentUuidOf(bytes)).toBe(contentUuidOf(bytes))
  })
})

describe('skill/router/upgrade — frontmatter connects all', () => {
  it('connectFrontmatter wires matrix, typography, and wikilink neighbors', () => {
    const ctx = buildUpgradeContext()
    const fm = connectFrontmatter('typography', readSkill('typography'), ctx)
    expect(fm.atomPath).toBe('typography')
    expect(fm.name).toBe('typography')
    expect(fm.diamondUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(fm.coordinate).toContain('typography')
    expect(fm.typography.partition).toBeTruthy()
    expect(fm.neighbors.wikilink.length + fm.bonds.in.length + fm.bonds.out.length).toBeGreaterThan(0)
  })

  it('derived frontmatter graph is connected with no orphans (live corpus sample)', () => {
    const patches = connectCorpus()
    const leaves = new Set([...patches.keys()].map((p) => p.split('/').pop()!))
    const sample = [...patches.keys()]
      .filter((p) => ['skill/router', 'typography', 'readme', 'diamond', 'confirm'].includes(p))
      .map((p) => [p, patches.get(p)!] as const)
    const sub = new Map(sample)
    const g = buildFrontmatterGraph(sub)
    const conn = graphConnectivity(g, new Set(sample.map(([p]) => p.split('/').pop()!)))
    expect(conn.orphans).toEqual([])
    expect(conn.connected).toBe(true)
  })

  it('full corpus frontmatter graph has a single component', () => {
    const patches = connectCorpus()
    const leaves = new Set([...patches.keys()].map((p) => p.split('/').pop()!))
    const g = buildFrontmatterGraph(patches)
    const conn = graphConnectivity(g, leaves)
    expect(conn.components).toBe(1)
    expect(conn.orphans).toEqual([])
    expect(conn.connected).toBe(true)
  })
})

const readSkill = (atomPath: string): string =>
  readFileSync(join(process.cwd(), 'src', atomPath, 'SKILL.md'), 'utf8')
