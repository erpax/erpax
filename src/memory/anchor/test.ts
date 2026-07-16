import { describe, it, expect } from 'vitest'
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { anchorOf, verifyAnchor, anchorsIn, atomPath } from './index'

const fixture = (body: string): { cwd: string; path: string } => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-anchor-'))
  mkdirSync(join(cwd, 'src'), { recursive: true })
  writeFileSync(join(cwd, 'src/law.md'), body)
  return { cwd, path: 'src/law.md' }
}

describe('anchor — the content-address links inside and outside, both ways', () => {
  it('names its path', () => {
    expect(atomPath).toBe('anchor')
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
