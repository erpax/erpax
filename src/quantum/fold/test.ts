import { trinityPresent } from '@/law/folder/constants'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { folderNameValid } from '@/pivot'
import {
  doubleFold,
  findLinearLogic,
  foldLinearPair,
  applyLinearFolds,
  linearGaps,
  sealLinearGaps,
} from './index'
import { existsSync } from 'node:fs'

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

  it('foldLinearPair returns the fold plan — the merged export, target and runner from the registry', () => {
    const folded = foldLinearPair(
      { linearId: 'a', path: 'a.ts', kind: 'duplicate-helper', shape: 'measureOf', foldHint: 'fold' },
      { linearId: 'b', path: 'b.ts', kind: 'duplicate-helper', shape: 'measureOf', foldHint: 'fold' },
    )
    // no longer a null stub — a measureOf pair folds to horoMeasureOf from @/horo
    expect(folded.mergedExport).toBe('horoMeasureOf')
    expect(folded.runner).toBe('@/horo')
    expect(folded.bond).toMatch(/^[0-9a-f]+$/)
  })

  describe('linear gaps', () => {
    let gapCwd: string
    beforeEach(() => {
      gapCwd = mkdtempSync(join(tmpdir(), 'lg-'))
      mkdirSync(join(gapCwd, 'src'), { recursive: true })
    })
    afterEach(() => rmSync(gapCwd, { recursive: true, force: true }))

    it('linearGaps scan shape', () => {
      expect(linearGaps(gapCwd).byKind).toHaveProperty('trinity-incomplete')
    })

    it('sealLinearGaps stubs trinity for incomplete atoms', async () => {
      mkdirSync(join(gapCwd, 'src/hub/gap'), { recursive: true })
      writeFileSync(join(gapCwd, 'src/hub/index.ts'), 'export const x=1\n')
      writeFileSync(join(gapCwd, 'src/hub/gap/index.ts'), 'export const y=1\n')
      const before = linearGaps(gapCwd).gaps.filter((g) => g.atomPath === 'hub/gap').length
      await sealLinearGaps(gapCwd, 5)
      expect(linearGaps(gapCwd).gaps.filter((g) => g.atomPath === 'hub/gap').length).toBeLessThan(before)
      expect(existsSync(join(gapCwd, 'src/hub/gap/test.ts'))).toBe(true)
    })

    it('REFUSES to overwrite a real barrel — a re-export from a live sibling is matter, not an orphan (the pagination bug)', async () => {
      mkdirSync(join(gapCwd, 'src/pager'), { recursive: true })
      // the exact shape that was destroyed: index re-exports a real sibling component
      writeFileSync(join(gapCwd, 'src/pager/index.ts'), "export { Pager } from './index.tsx'\n")
      writeFileSync(join(gapCwd, 'src/pager/index.tsx'), 'export const Pager = () => null\n')
      await sealLinearGaps(gapCwd, 20)
      // the barrel is UNTOUCHED — its public face survives
      expect(readFileSync(join(gapCwd, 'src/pager/index.ts'), 'utf8')).toContain("export { Pager } from './index.tsx'")
      expect(readFileSync(join(gapCwd, 'src/pager/index.ts'), 'utf8')).not.toContain('spreadOf')
    })
  })
})

describe('quantum/fold — a React atom spells its barrel with an x', () => {
  // It read `index.ts` literally, so it charged a JSX atom for a name a JSX barrel cannot have,
  // and the walk stopped dead at a `.tsx` barrel so those subtrees were never judged at all. The
  // false negative is the worse half: a folder outside the law is not a folder passing it.
  // Live count moved 38 → 23 when both spellings were read.
  it('reports no trinity gap against an atom whose barrel and proof are BOTH .tsx', () => {
    const gaps = linearGaps(process.cwd()).gaps.filter((g) => g.kind === 'trinity-incomplete')
    for (const g of gaps) {
      const dir = join(process.cwd(), 'src', g.atomPath)
      const complete =
        trinityPresent(dir, 'SKILL.md') && trinityPresent(dir, 'index.ts') && trinityPresent(dir, 'test.ts')
      expect(complete, `${g.atomPath} is complete under both spellings and was still charged`).toBe(false)
    }
  })

  it('admin/bar is complete in the .tsx spelling, and is not charged', () => {
    const dir = join(process.cwd(), 'src', 'admin', 'bar')
    expect(trinityPresent(dir, 'index.ts')).toBe(true)
    expect(existsSync(join(dir, 'index.ts'))).toBe(false)
    expect(linearGaps(process.cwd()).gaps.some((g) => g.atomPath === 'admin/bar')).toBe(false)
  })
})
