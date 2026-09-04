import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { anchorOf, verifyAnchor, anchorsIn, atomPath, atomAnchor, verifyAtomAnchor } from './index'

const fixture = (body: string): { cwd: string; path: string } => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-anchor-'))
  mkdirSync(join(cwd, 'src'), { recursive: true })
  writeFileSync(join(cwd, 'src/law.md'), body)
  return { cwd, path: 'src/law.md' }
}

describe('anchor — the content-address links inside and outside, both ways', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).leaf)
  })

  it('inside → outside: the content computes its own address', () => {
    const { cwd, path } = fixture('the law')
    const a = anchorOf(path, cwd)
    expect(a.uuid).toHaveLength(36)
    expect(anchorOf(path, cwd).uuid).toBe(a.uuid) // same content ⇒ same address: a theorem, not a scan
    rmSync(cwd, { recursive: true, force: true })
  })

  it('outside → inside: an unchanged law verifies FRESH', () => {
    const { cwd, path } = fixture('the law')
    expect(verifyAnchor(anchorOf(path, cwd), cwd).state).toBe('fresh')
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE POINT. A prose pointer says "src/law.md § the law" and keeps saying it after the law changes — which
  // is how APP_COLLECTION_SLUGS still claims to be "the source of truth for which collections the app
  // registers" while holding 8 of 231, and how the catalogue named a generator that had moved. An anchor
  // cannot: the address is DERIVED from the content, so drift is computable.
  it('a changed law reads MOVED — the memory can say "I am out of date"', () => {
    const { cwd, path } = fixture('the law')
    const a = anchorOf(path, cwd)
    writeFileSync(join(cwd, path), 'the law, amended')
    const v = verifyAnchor(a, cwd)
    expect(v.state).toBe('moved')
    expect(v.now).not.toBe(v.was) // the mismatch IS the signal
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a rotted path reads GONE — not the same failure as a changed truth', () => {
    const { cwd, path } = fixture('the law')
    const a = anchorOf(path, cwd)
    rmSync(join(cwd, path))
    expect(verifyAnchor(a, cwd).state).toBe('gone')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('reads the anchors a memory file declares', () => {
    const as = anchorsIn(
      'the laws are inside\n<!-- anchor: src/rules/SKILL.md e5d921c3-80ec-80ad-ae26-cb6a9fcfd40f -->\nrun it',
    )
    expect(as).toEqual([{ path: 'src/rules/SKILL.md', uuid: 'e5d921c3-80ec-80ad-ae26-cb6a9fcfd40f' }])
  })

  it('a memory with no anchor claims nothing — silence is not a stale claim', () => {
    expect(anchorsIn('just prose about the corpus')).toEqual([])
  })
})

describe('atomAnchor — an atom is a TRINITY, not a file', () => {
  const atom = (legs: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-trinity-'))
    mkdirSync(join(cwd, 'src/law'), { recursive: true })
    for (const [n, b] of Object.entries(legs)) writeFileSync(join(cwd, 'src/law', n), b)
    return cwd
  }

  it('folds form · code · proof to ONE address', () => {
    const cwd = atom({ 'SKILL.md': 'the law', 'index.ts': 'export const x = 1', 'test.ts': 'it("holds")' })
    const a = atomAnchor('src/law', cwd)
    expect(a.uuid).toHaveLength(36)
    expect(verifyAtomAnchor(a, cwd).state).toBe('fresh')
    rmSync(cwd, { recursive: true, force: true })
  })

  // The test changing IS the law changing: a law with no proof beside it forbids nothing (rules/refutable).
  // The trinity moves together or it is not a trinity.
  it('a changed PROOF moves the atom — the law did not survive its test changing', () => {
    const cwd = atom({ 'SKILL.md': 'the law', 'index.ts': 'export const x = 1', 'test.ts': 'it("holds")' })
    const before = atomAnchor('src/law', cwd)
    writeFileSync(join(cwd, 'src/law/test.ts'), 'it("holds differently")')
    expect(verifyAtomAnchor(before, cwd).state).toBe('moved')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an INCOMPLETE trinity cannot wear a complete one\'s address', () => {
    const full = atom({ 'SKILL.md': 'the law', 'index.ts': 'export const x = 1', 'test.ts': 'it("holds")' })
    const partial = atom({ 'SKILL.md': 'the law', 'index.ts': 'export const x = 1' }) // no proof
    expect(atomAnchor('src/law', partial).uuid).not.toBe(atomAnchor('src/law', full).uuid)
    rmSync(full, { recursive: true, force: true })
    rmSync(partial, { recursive: true, force: true })
  })

  it('an atom with no leg at all is GONE, not zero', () => {
    const cwd = atom({})
    expect(verifyAtomAnchor({ path: 'src/law', uuid: 'x' }, cwd).state).toBe('gone')
    rmSync(cwd, { recursive: true, force: true })
  })
})
