import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { folderNameValid } from '@/pivot'
import { doubleFold, findLinearLogic, foldLinearPair, applyLinearFolds } from './index'

describe('quantum/fold', () => {
  it('doubleFold is stable for the same atom path', () => {
    const a = doubleFold('quantum')
    const b = doubleFold('quantum')
    expect(a.wordHalf).toBe(b.wordHalf)
    expect(a.digitHalf).toBe(b.digitHalf)
    expect(a.combined128).toBe(b.combined128)
    expect(a.interact64).toBe(b.interact64)
  })

  it('doubleFold partition superposition is open when unsealed', () => {
    expect(doubleFold('readme', false).superposition).toBe(1)
  })

  it('doubleFold partition superposition collapses when sealed', () => {
    expect(doubleFold('readme', true).superposition).toBe(0)
  })

  it('has no hyphenated child folders', () => {
    const dir = import.meta.dirname
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isDirectory() || ent.name.startsWith('.')) continue
      expect(folderNameValid(`quantum/fold/${ent.name}`)).toBe(true)
    }
    expect(folderNameValid('quantum/fold/linear-logic')).toBe(false)
    expect(folderNameValid('quantum/fold/linear-gap')).toBe(false)
  })
})

describe('linear-logic', () => {
  let cwd: string

  beforeEach(() => {
    cwd = mkdtempSync(join(tmpdir(), 'erpax-linear-'))
    mkdirSync(join(cwd, 'src'), { recursive: true })
  })

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true })
  })

  it('findLinearLogic returns segments and pairs', () => {
    const scan = findLinearLogic(cwd)
    expect(Array.isArray(scan.segments)).toBe(true)
    expect(Array.isArray(scan.pairs)).toBe(true)
  })

  it('foldLinearPair reduces duplicate measureOf on fixture', () => {
    for (const name of ['one', 'two']) {
      const dir = join(cwd, 'src', name)
      mkdirSync(dir, { recursive: true })
      writeFileSync(
        join(dir, 'index.ts'),
        `import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
const measureOf = (digit: number | null): string | null => {
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? HORO_MEASURE[i]! : String(digit)
}
export const x = measureOf(4)
`,
      )
    }
    const before = findLinearLogic(cwd).segments.filter((s) => s.shape === 'measureOf').length
    applyLinearFolds(cwd)
    const after = findLinearLogic(cwd).segments.filter((s) => s.shape === 'measureOf').length
    expect(after).toBeLessThan(before)
    expect(readFileSync(join(cwd, 'src/one/index.ts'), 'utf8')).toContain('horoMeasureOf')
  })

  it('foldLinearPair stub returns null until pairs are wired', () => {
    const folded = foldLinearPair(
      { linearId: 'a', path: 'a.ts', kind: 'duplicate-helper', shape: 'measureOf', foldHint: 'fold' },
      { linearId: 'b', path: 'b.ts', kind: 'duplicate-helper', shape: 'measureOf', foldHint: 'fold' },
    )
    expect(folded).toBeNull()
  })
})
