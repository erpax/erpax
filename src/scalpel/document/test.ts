import { describe, it, expect } from 'vitest'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { manifestOf, refactor, refactoringMarkdown, refactoringPath, refactoringRows, type Refactoring } from '@/scalpel/document'

const tree = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'refactor-'))
  for (const [name, text] of Object.entries(files)) writeFileSync(join(cwd, name), text)
  return cwd
}
const r: Refactoring = {
  name: 'Rename Old To New',
  why: 'The path already says the word.',
  ops: [
    { file: 'a.ts', find: "import { old } from './x'", replace: "import { fresh } from './x'", reason: 'the export was renamed' },
    { file: 'b.ts', find: 'old()', replace: 'fresh()', reason: 'its one caller follows' },
  ],
}

describe('scalpel/document — a refactoring is a document', () => {
  it('writes the document and reads the same cuts back', () => {
    const md = refactoringMarkdown(r)
    expect(md.startsWith('# Rename Old To New\n\nThe path already says the word.')).toBe(true)
    expect(manifestOf(md)).toEqual(r.ops)
  })

  it('refuses a document with no block, a block that does not parse, or a cut missing a part', () => {
    expect(() => manifestOf('# no cuts here')).toThrow(/carries no/)
    expect(() => manifestOf('```json\n{ not json\n```')).toThrow(/does not parse/)
    expect(() => manifestOf('```json\n[{"file":"a.ts","find":"x","replace":"y"}]\n```')).toThrow(/list of \{ file, find, replace, reason \}/)
    expect(() => manifestOf('```json\n{"file":"a.ts"}\n```')).toThrow(/list of/)
  })

  it('is a nested page under refactors, addressed by its name', () => {
    expect(refactoringPath('Rename Old To New')).toBe('refactors/rename-old-to-new')
    const rows = refactoringRows([r])
    expect(rows.map((x) => [x.slug, x.parent])).toEqual([['refactors', null], ['refactors-rename-old-to-new', 'refactors']])
    expect(manifestOf(rows[1]!.markdown)).toEqual(r.ops)
  })
})

describe('scalpel/document — erpax applies it', () => {
  const files = { 'a.ts': "import { old } from './x'\n", 'b.ts': 'old()\n' }

  it('a dry run names what it would cut and writes nothing', () => {
    const cwd = tree(files)
    const out = refactor(refactoringMarkdown(r), { cwd })
    expect(out.plan.cuts).toHaveLength(2)
    expect(out.refused).toEqual([])
    expect(out.complete).toBe(false)
    expect(readFileSync(join(cwd, 'a.ts'), 'utf8')).toBe(files['a.ts'])
  })

  it('applies every cut and verifies', () => {
    const cwd = tree(files)
    expect(refactor(refactoringMarkdown(r), { cwd, apply: true, verify: () => true }).complete).toBe(true)
    expect(readFileSync(join(cwd, 'a.ts'), 'utf8')).toBe("import { fresh } from './x'\n")
    expect(readFileSync(join(cwd, 'b.ts'), 'utf8')).toBe('fresh()\n')
  })

  it('refuses the WHOLE refactoring when one cut is ambiguous — nothing is half-applied', () => {
    const cwd = tree({ 'a.ts': files['a.ts'], 'b.ts': 'old()\nold()\n' })
    const out = refactor(refactoringMarkdown(r), { cwd, apply: true, verify: () => true })
    expect(out.complete).toBe(false)
    expect(out.refused).toEqual(['b.ts: ambiguous (2 matches) — its one caller follows'])
    expect(readFileSync(join(cwd, 'a.ts'), 'utf8')).toBe(files['a.ts'])
  })

  it('a red ring restores every touched file to the byte', () => {
    const cwd = tree(files)
    expect(refactor(refactoringMarkdown(r), { cwd, apply: true, verify: () => false }).complete).toBe(false)
    expect(readFileSync(join(cwd, 'a.ts'), 'utf8')).toBe(files['a.ts'])
    expect(readFileSync(join(cwd, 'b.ts'), 'utf8')).toBe(files['b.ts'])
  })
})
