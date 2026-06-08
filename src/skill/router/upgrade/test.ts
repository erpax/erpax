import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  connectFrontmatter,
  upgradeSkillText,
  renderFrontmatter,
  deriveDescription,
  contentUuidOf,
  buildFrontmatterGraph,
  graphConnectivity,
  buildUpgradeContext,
  type ConnectedFrontmatter,
} from './index'

const sampleBody = `---
name: alpha
description: Use when testing alpha.
---

# alpha

Alpha bonds [[beta]] and [[gamma]].

**Law — [[law]]: alpha is a test atom.**
`

const patch = (leaf: string, extra: Partial<ConnectedFrontmatter> = {}): ConnectedFrontmatter => ({
  name: leaf,
  description: `Use when testing ${leaf}.`,
  atomPath: leaf,
  coordinate: `${leaf} · 1/first · abcd1234`,
  contentUuid: '11111111-1111-5111-8111-111111111111',
  diamondUuid: '22222222-2222-5222-8222-222222222222',
  uuid: null,
  horo: 1,
  bonds: { in: [], out: [] },
  typography: { partition: leaf, bondDegree: 0, neighbors: [] },
  standards: [],
  bindings: [],
  neighbors: { wikilink: [], matrix: [], backlinks: [] },
  version: 1,
  ...extra,
})

describe('skill/router/upgrade — computational frontmatter self-upgrade', () => {
  it('deriveDescription preserves Use-when triggers', () => {
    expect(deriveDescription('alpha', sampleBody)).toBe('Use when testing alpha.')
  })

  it('deriveDescription computes from prose when trigger absent', () => {
    const bare = `---\nname: x\ndescription: old\n---\n\n# x\n\nDoes things with [[law]].\n`
    expect(deriveDescription('x', bare)).toMatch(/^Use when reasoning about x —/)
  })

  it('deriveDescription prefixes existing descriptions with Use when', () => {
    const fm = `---\nname: router\ndescription: Barrel face for skill/router.\n---\n\n# router\n`
    expect(deriveDescription('router', fm)).toBe(
      'Use when reasoning about router — Barrel face for skill/router.',
    )
  })

  it('renderFrontmatter is deterministic for the same model', () => {
    const fm = patch('alpha', {
      bonds: { in: ['beta'], out: ['gamma'] },
      typography: { partition: 'alpha', bondDegree: 2, neighbors: ['beta'] },
      standards: ['ISO/IEC 25010:2023'],
      bindings: ['kv/TEST'],
      neighbors: { wikilink: ['beta'], matrix: ['gamma'], backlinks: ['beta'] },
    })
    expect(renderFrontmatter(fm)).toBe(renderFrontmatter(fm))
  })

  it('upgradeSkillText is idempotent on skill/router', () => {
    const ctx = buildUpgradeContext()
    const raw = readSkill('skill/router')
    const fm = connectFrontmatter('skill/router', raw, ctx)
    const once = upgradeSkillText(raw, fm)
    const twice = upgradeSkillText(once, connectFrontmatter('skill/router', once, ctx))
    expect(twice).toBe(once)
  })

  it('same atom ⇒ same connectFrontmatter patch (deterministic)', () => {
    const ctx = buildUpgradeContext()
    const raw = readSkill('skill/router')
    expect(connectFrontmatter('skill/router', raw, ctx)).toEqual(
      connectFrontmatter('skill/router', raw, ctx),
    )
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

  it('synthetic subgraph is connected with no orphans', () => {
    const patches = new Map<string, ConnectedFrontmatter>([
      ['alpha', patch('alpha', { bonds: { in: [], out: ['beta'] }, neighbors: { wikilink: ['beta'], matrix: [], backlinks: [] } })],
      ['beta', patch('beta', { bonds: { in: ['alpha'], out: ['gamma'] }, neighbors: { wikilink: ['gamma'], matrix: [], backlinks: ['alpha'] } })],
      ['gamma', patch('gamma', { bonds: { in: ['beta'], out: [] }, neighbors: { wikilink: [], matrix: [], backlinks: ['beta'] } })],
    ])
    const leaves = new Set(['alpha', 'beta', 'gamma'])
    const conn = graphConnectivity(buildFrontmatterGraph(patches), leaves)
    expect(conn.orphans).toEqual([])
    expect(conn.connected).toBe(true)
    expect(conn.components).toBe(1)
  })

  it('connectFrontmatter adds a corpus edge when an atom would be isolated', () => {
    const ctx = buildUpgradeContext()
    const lone = `---\nname: zorph\ndescription: Use when testing zorph.\n---\n\n# zorph\n\nNo links.\n`
    const fm = connectFrontmatter('zorph', lone, ctx)
    const edges = [...fm.bonds.in, ...fm.bonds.out, ...fm.neighbors.wikilink]
    expect(edges.length).toBeGreaterThan(0)
  })
})

const readSkill = (atomPath: string): string =>
  readFileSync(join(process.cwd(), 'src', atomPath, 'SKILL.md'), 'utf8')
