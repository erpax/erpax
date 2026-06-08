import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import {
  connectFrontmatter,
  upgradeSkillText,
  deriveDescription,
  buildFrontmatterGraph,
  graphConnectivity,
  buildUpgradeContext,
  parseSignaturesFromText,
  signaturesMatch,
  verifySignatures,
  type ConnectedFrontmatter,
  type UpgradeContext,
} from './index'

let ctx: UpgradeContext

beforeAll(() => {
  ctx = buildUpgradeContext()
}, 120_000)

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
  signatures: { computationUuid: '00000000-0000-5000-8000-000000000001', stages: [] },
  version: 2,
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

  it('upgradeSkillText is idempotent on skill/router', () => {
    const raw = readSkill('skill/router')
    const fm = connectFrontmatter('skill/router', raw, ctx)
    const once = upgradeSkillText(raw, fm)
    const twice = upgradeSkillText(once, connectFrontmatter('skill/router', once, ctx))
    expect(twice).toBe(once)
  }, 120_000)

  it('same atom ⇒ same connectFrontmatter patch (deterministic)', () => {
    const raw = readSkill('skill/router')
    expect(connectFrontmatter('skill/router', raw, ctx)).toEqual(
      connectFrontmatter('skill/router', raw, ctx),
    )
  }, 120_000)

})

describe('skill/router/upgrade — frontmatter connects all', () => {
  it('connectFrontmatter wires matrix, typography, and wikilink neighbors', () => {
    const fm = connectFrontmatter('typography', readSkill('typography'), ctx)
    expect(fm.atomPath).toBe('typography')
    expect(fm.name).toBe('typography')
    expect(fm.diamondUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(fm.coordinate).toContain('typography')
    expect(fm.typography.partition).toBeTruthy()
    expect(fm.neighbors.wikilink.length + fm.bonds.in.length + fm.bonds.out.length).toBeGreaterThan(0)
  }, 120_000)

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
    const lone = `---\nname: zorph\ndescription: Use when testing zorph.\n---\n\n# zorph\n\nNo links.\n`
    const fm = connectFrontmatter('zorph', lone, ctx)
    const edges = [...fm.bonds.in, ...fm.bonds.out, ...fm.neighbors.wikilink]
    expect(edges.length).toBeGreaterThan(0)
  }, 120_000)
})

describe('skill/router/upgrade — stage signatures at every pipeline step', () => {
  it('connectFrontmatter folds diamond stage chain into signatures', () => {
    const fm = connectFrontmatter('skill/router', readSkill('skill/router'), ctx)
    expect(fm.signatures.computationUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(fm.signatures.stages.map((s) => s.stage)).toEqual([
      'path',
      'trinity',
      'boundary',
      'links',
      'horo',
      'seal',
      'uuid',
    ])
    for (const s of fm.signatures.stages) {
      expect(s.stageUuid).toMatch(/^[0-9a-f-]{36}$/)
    }
  }, 120_000)

  it('parseSignaturesFromText round-trips rendered frontmatter', () => {
    const raw = readSkill('skill/router')
    const fm = connectFrontmatter('skill/router', raw, ctx)
    const text = upgradeSkillText(raw, fm)
    const parsed = parseSignaturesFromText(text)
    expect(signaturesMatch(parsed, fm.signatures).ok).toBe(true)
  }, 120_000)

  it('tampered stageUuid fails signature verify', () => {
    const raw = readSkill('skill/router')
    const fm = connectFrontmatter('skill/router', raw, ctx)
    const stageUuid = fm.signatures.stages[0]!.stageUuid
    const tampered = upgradeSkillText(raw, fm).replace(stageUuid, '00000000-0000-5000-8000-000000000000')
    expect(verifySignatures('skill/router', tampered, ctx).ok).toBe(false)
  }, 120_000)

  it('idempotent upgrade preserves signatures', () => {
    const raw = readSkill('skill/router')
    const once = upgradeSkillText(raw, connectFrontmatter('skill/router', raw, ctx))
    const twice = upgradeSkillText(once, connectFrontmatter('skill/router', once, ctx))
    expect(parseSignaturesFromText(twice)).toEqual(parseSignaturesFromText(once))
  }, 120_000)
})

const readSkill = (atomPath: string): string =>
  readFileSync(join(process.cwd(), 'src', atomPath, 'SKILL.md'), 'utf8')
