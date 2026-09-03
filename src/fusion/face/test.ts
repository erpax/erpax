import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { foldFaces, loadFaces, repoFace, type FaceClaim } from '.'

const drop = (files: Record<string, string>): string => {
  const d = mkdtempSync(join(tmpdir(), 'erpax-face-'))
  for (const [n, body] of Object.entries(files)) writeFileSync(join(d, n), body)
  return d
}
const claim = (repo: string, path: string, c: string): FaceClaim => ({ repo, path, claim: c })

describe('fusion/face', () => {
  it('parses a stated law and strips the wikilink markup', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-tree-'))
    mkdirSync(join(root, 'src', 'a'), { recursive: true })
    writeFileSync(join(root, 'src', 'a', 'SKILL.md'), '# a\n\n**Law — [[law]]: a [[thing]] holds.**\n')
    const face = repoFace('t', root)
    expect(face).toHaveLength(1)
    expect(face[0]!.claim).toBe('a thing holds.')
    expect(face[0]!.origin).toBe('self')
  })

  it('skips a file that states no law rather than summarising it', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-tree-'))
    mkdirSync(join(root, 'src', 'b'), { recursive: true })
    writeFileSync(join(root, 'src', 'b', 'SKILL.md'), '# b\n\nProse with no assertion.\n')
    expect(repoFace('t', root)).toEqual([])
  })

  it('counts a malformed line, never guesses at it', () => {
    const d = drop({ 'x.jsonl': '{"repo":"r","path":"p","claim":"c"}\nnot json\n{"repo":"r"}\n' })
    const { rows, malformed } = loadFaces(d)
    expect(rows).toHaveLength(1)
    expect(malformed).toBe(2)
  })

  it('collides an identical claim across repos and marks the class cross-repo', () => {
    const f = foldFaces([claim('a', 'p1', 'one law'), claim('b', 'p2', 'one law'), claim('a', 'p3', 'other')])
    expect(f.claims).toBe(3)
    expect(f.distinct).toBe(2)
    expect(f.crossRepo).toHaveLength(1)
    expect(f.crossRepo[0]!.map((m) => m.repo).sort()).toEqual(['a', 'b'])
  })

  it('does NOT mark an internal duplication as cross-repo', () => {
    const f = foldFaces([claim('a', 'p1', 'same'), claim('a', 'p2', 'same')])
    expect(f.classes).toHaveLength(1)
    expect(f.crossRepo).toHaveLength(0)
  })

  it('resemblance is not collision — two near claims stay distinct', () => {
    const f = foldFaces([claim('a', 'p1', 'a module may not depend on itself'), claim('b', 'p2', 'a module must not depend on itself')])
    expect(f.crossRepo).toHaveLength(0)
    expect(f.distinct).toBe(2)
  })

  it('erpax states more laws than it has repos, and every one is non-empty', () => {
    const face = repoFace('erpax')
    expect(face.length).toBeGreaterThan(1000)
    expect(face.every((c) => c.claim.length > 0)).toBe(true)
  })
})
