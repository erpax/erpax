import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
import { assertNoDrift, assertNoStaleSizes, driftingClaims, staleSizeClaims } from '.'

const fixture = (skills: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-drift-'))
  for (const [rel, body] of Object.entries(skills)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

const ACTUAL = UUID_MATRIX_NODES.length

describe('rules/drift', () => {
  it('flags a prose line that disagrees with the arbiter', () => {
    const root = fixture({ 'a/SKILL.md': 'The corpus is a graph: 1234 nodes.\n' })
    const found = driftingClaims(root)
    expect(found).toHaveLength(1)
    expect(found[0]!.stated).toBe(1234)
    expect(found[0]!.actual).toBe(ACTUAL)
    expect(found[0]!.arbiter).toBe('UUID_MATRIX_NODES.length')
  })

  it('does not flag a line that agrees — the arbiter is read, not declared', () => {
    const root = fixture({ 'a/SKILL.md': `a graph: ${ACTUAL} nodes.\n` })
    expect(driftingClaims(root)).toHaveLength(0)
  })

  it('exempts a DATED record — bumping it would falsify the measurement', () => {
    const root = fixture({ 'a/SKILL.md': 'verified against all 3178 matrix nodes (measured 2026-07-16)\n' })
    expect(driftingClaims(root)).toHaveLength(0)
  })

  it('matches on ONE line — a port on the next line is not a node count', () => {
    const root = fixture({ 'a/SKILL.md': 'the dev server listens on 3000\nnodes are addressed elsewhere\n' })
    expect(driftingClaims(root)).toHaveLength(0)
  })

  it('reports the line number and the sentence, so the fix is one edit away', () => {
    const root = fixture({ 'a/SKILL.md': '# a\n\nThe matrix holds 9,999 node literals today.\n' })
    const [d] = driftingClaims(root)
    expect(d!.line).toBe(3)
    expect(d!.text).toContain('9,999 node literals')
  })

  it('fails closed above the floor and passes at it', () => {
    const root = fixture({ 'a/SKILL.md': 'a graph: 1234 nodes.\n' })
    expect(() => assertNoDrift(root, 1)).not.toThrow()
    expect(() => assertNoDrift(root, 0)).toThrow(/drift — 1 prose claim/)
  })

  it('the live corpus states no number the matrix contradicts', () => {
    expect(driftingClaims(process.cwd())).toEqual([])
  })
})

describe('rules/drift — a size claim about a repo file must agree with the file', () => {
  const tree = (files: Record<string, string>): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-size-'))
    for (const [rel, body] of Object.entries(files)) {
      const p = join(root, rel)
      mkdirSync(join(p, '..'), { recursive: true })
      writeFileSync(p, body)
    }
    return root
  }

  it('flags prose an order of scale away from the file it names', () => {
    // the real case: AGENTS.md called a 269-byte stub a "77MB bundle", in the file every agent
    // reads every turn
    const root = tree({
      'src/a/big.ts': 'x'.repeat(300),
      'AGENTS.md': 'never import `src/a/big.ts` (77MB bundle).\n',
    })
    const bad = staleSizeClaims(root)
    expect(bad).toHaveLength(1)
    expect(bad[0]!.file).toBe('AGENTS.md') // the ROOT, not just src — the domain must reach it
    expect(bad[0]!.actualBytes).toBe(300)
    expect(() => assertNoStaleSizes(root)).toThrow(/disagree with the file/)
  })

  it('accepts a claim within the declared tolerance — sizes move, orders of scale do not', () => {
    const root = tree({ 'src/a/big.ts': 'x'.repeat(1_500_000), 'AGENTS.md': '`src/a/big.ts` is about 1MB.\n' })
    expect(staleSizeClaims(root)).toEqual([])
  })

  it('exempts a DATED line — correcting a record would falsify the measurement it reports', () => {
    const root = tree({
      'src/a/big.ts': 'x'.repeat(300),
      'src/b/SKILL.md': 'a full build measured 68MB on 2026-07-16 for `src/a/big.ts`.\n',
    })
    expect(staleSizeClaims(root)).toEqual([])
  })

  it('ignores a claim about a file the repo does not have — that is reference rot, not drift', () => {
    const root = tree({ 'AGENTS.md': '`src/gone/away.ts` (77MB).\n' })
    expect(staleSizeClaims(root)).toEqual([])
  })

  it('the live corpus states no size an order of scale from its file', () => {
    expect(staleSizeClaims(process.cwd())).toEqual([])
  })
})
