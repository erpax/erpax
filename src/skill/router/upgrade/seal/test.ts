import { describe, it, expect } from 'vitest'
import {
  renderFrontmatter,
  upgradeSkillText,
  contentUuidOf,
  parseSignaturesFromText,
  stripFrontmatter,
  type ConnectedFrontmatter,
} from './index'

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

const sampleBody = `---
name: alpha
description: Use when testing alpha.
---

# alpha

Alpha bonds [[beta]] and [[gamma]].
`

describe('skill/router/upgrade/seal — renderFrontmatter', () => {
  it('is deterministic for the same model', () => {
    const fm = patch('alpha', {
      bonds: { in: ['beta'], out: ['gamma'] },
      typography: { partition: 'alpha', bondDegree: 2, neighbors: ['beta'] },
      standards: ['ISO/IEC 25010:2023'],
      bindings: ['kv/TEST'],
      neighbors: { wikilink: ['beta'], matrix: ['gamma'], backlinks: ['beta'] },
    })
    expect(renderFrontmatter(fm)).toBe(renderFrontmatter(fm))
  })
})

describe('skill/router/upgrade/seal — contentUuidOf', () => {
  it('is stable on fixed bytes', () => {
    const bytes = '---\nname: z\n---\n\n# z\n'
    expect(contentUuidOf(bytes)).toBe(contentUuidOf(bytes))
  })
})

describe('skill/router/upgrade/seal — upgradeSkillText', () => {
  it('is idempotent when frontmatter matches body', () => {
    const fm = patch('alpha')
    const once = upgradeSkillText(sampleBody, fm)
    const twice = upgradeSkillText(once, { ...fm, contentUuid: parseContentUuid(once) })
    expect(twice).toBe(once)
  })

  it('stripFrontmatter removes YAML block', () => {
    expect(stripFrontmatter(sampleBody).trimStart()).toMatch(/^# alpha/)
  })

  it('parseSignaturesFromText round-trips rendered frontmatter', () => {
    const fm = patch('alpha', {
      signatures: {
        computationUuid: 'aaaaaaaa-bbbb-5ccc-8ddd-eeeeeeeeeeee',
        stages: [{ stage: 'path', stageUuid: '11111111-1111-5111-8111-111111111111' }],
      },
    })
    const text = upgradeSkillText(sampleBody, fm)
    const parsed = parseSignaturesFromText(text)
    expect(parsed?.computationUuid).toBe(fm.signatures.computationUuid)
    expect(parsed?.stages).toEqual(fm.signatures.stages)
  })
})

const parseContentUuid = (text: string): string =>
  text.match(/^contentUuid:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '') ?? ''
