import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  deadReferences,
  deadStatutoryReferences,
  assertStatutoryTraceResolves,
  assertReferencesResolve,
} from './index'

/** A throwaway corpus: `src/<atom>/<file>` with the given text. */
const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-ref-'))
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(join(cwd, path, '..'), { recursive: true })
    writeFileSync(join(cwd, path), text)
  }
  return cwd
}

describe('rules/reference — the statute→code trace must resolve', () => {
  it('flags a reference to a path that does not exist', () => {
    const cwd = corpus({ 'src/supto/SKILL.md': 'УНП format — `src/standards/naredba-n-18/unp.ts`.' })
    const dead = deadReferences(cwd)
    expect(dead).toHaveLength(1)
    expect(dead[0]!.target).toBe('src/standards/naredba-n-18/unp.ts')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a reference that resolves is not flagged (the repaired trace)', () => {
    const cwd = corpus({
      'src/supto/SKILL.md': 'УНП format — `src/naredba/n/18/unp.ts`.',
      'src/naredba/n/18/unp.ts': 'export const UNP_RE = /x/',
    })
    expect(deadReferences(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('resolves bare module spellings — a folder or an implied extension is not dead', () => {
    const cwd = corpus({
      'src/a/index.ts': 'see src/oid and src/b/Widget',
      'src/oid/index.ts': 'export const x = 1',
      'src/b/Widget.tsx': 'export const W = 1',
    })
    expect(deadReferences(cwd)).toHaveLength(0) // src/oid → folder; Widget → .tsx
    rmSync(cwd, { recursive: true, force: true })
  })

  it('generated faces are skipped — they regenerate, their refs are not hand-maintained', () => {
    const cwd = corpus({ 'src/a/LLM.md': 'see src/gone/nowhere.ts', 'src/a/index.ts': 'export const a = 1' })
    expect(deadReferences(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('separates the STATUTORY surface — only files citing Bulgarian statute count for the legal gate', () => {
    const cwd = corpus({
      'src/supto/SKILL.md': '@standard BG Наредба-Н-18 §СУПТО — see src/gone/unp.ts',
      'src/other/index.ts': 'see src/gone/other.ts', // not statutory
    })
    expect(deadReferences(cwd)).toHaveLength(2)
    expect(deadStatutoryReferences(cwd)).toHaveLength(1) // only the Наредба citer
    expect(deadStatutoryReferences(cwd)[0]!.from).toBe('src/supto/SKILL.md')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the legal gate fails closed at zero — a broken clause→code trace is unreviewable', () => {
    const cwd = corpus({ 'src/supto/SKILL.md': '@standard BG Наредба-Н-18 — see src/gone/unp.ts' })
    expect(() => assertStatutoryTraceResolves(cwd)).toThrow(/dead STATUTORY pointer/)
    expect(() => assertStatutoryTraceResolves(cwd, 1)).not.toThrow() // ceiling blocks regression only
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the whole-tree ratchet fails only on getting WORSE than its ceiling', () => {
    const cwd = corpus({ 'src/a/index.ts': 'see src/gone/x.ts and src/gone/y.ts' })
    expect(() => assertReferencesResolve(cwd, 2)).not.toThrow()
    expect(() => assertReferencesResolve(cwd, 1)).toThrow(/exceeds the ratchet ceiling/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
