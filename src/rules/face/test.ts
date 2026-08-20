import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterAll, describe, expect, it } from 'vitest'

import { type CorpusFace, assertFacePreserved, corpusFace, faceLosses, faceOf } from './index'

const root = mkdtempSync(join(tmpdir(), 'erpax-face-'))
const atom = (path: string, files: Record<string, string>): void => {
  mkdirSync(join(root, 'src', path), { recursive: true })
  for (const [name, body] of Object.entries(files)) writeFileSync(join(root, 'src', path, name), body)
}

describe('rules/face', () => {
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  it('a named re-export of a symbol the target does NOT define offers nothing', () => {
    atom('real', { 'index.ts': 'export const present = 1\n' })
    atom('phantom', { 'index.ts': "export { present, absent } from '../real'\n" })
    const face = faceOf('phantom', root)
    expect(face).toContain('present')
    expect(face).not.toContain('absent') // the phantom — counted unverified, it reads as real
  })

  it('a re-export through an UNRESOLVABLE target is trusted, never invented against', () => {
    atom('external', { 'index.ts': "export { readFileSync } from 'node:fs'\n" })
    expect(faceOf('external', root)).toContain('readFileSync')
  })

  it('emptying a child silently is a face LOSS at the parent that re-exports it', () => {
    atom('hub/child', { 'index.ts': 'export const wired = 1\nexport const alsoWired = 2\n' })
    atom('hub', { 'index.ts': "export * from './child'\n" })
    const before = { hub: faceOf('hub', root) }
    atom('hub/child', { 'index.ts': 'export const wired = 1\n' }) // the split that drops one
    expect(faceLosses(before, { hub: faceOf('hub', root) })).toEqual([
      { atom: 'hub', lost: ['alsoWired'] },
    ])
  })
  it('reads an atom face through its barrel, including transitive star re-exports', () => {
    const face = faceOf('rules/face')
    expect(face).toContain('faceOf')
    expect(face).toContain('assertFacePreserved')
    // horo re-exports its children through the barrel; the face must see through it
    expect(faceOf('horo').length).toBeGreaterThan(0)
  })

  it('a missing atom has an empty face rather than throwing', () => {
    expect(faceOf('no/such/atom')).toEqual([])
  })

  it('reports a LOST name and stays silent about a gained one', () => {
    const before: CorpusFace = { a: ['x', 'y'], b: ['z'] }
    const after: CorpusFace = { a: ['x'], b: ['z', 'extra'] }
    expect(faceLosses(before, after)).toEqual([{ atom: 'a', lost: ['y'] }])
  })

  it('an atom deleted entirely is a total loss, not an absence', () => {
    expect(faceLosses({ a: ['x'] }, {})).toEqual([{ atom: 'a', lost: ['x'] }])
  })

  it('fails closed on a dropped name and names the atom', () => {
    expect(() => assertFacePreserved({ a: ['x'] }, { a: [] })).toThrow(/@\/a lost x/)
    expect(() => assertFacePreserved({ a: ['x'] }, { a: ['x'] })).not.toThrow()
  })

  it('the live corpus is its own fixed point — a snapshot loses nothing against itself', () => {
    const face = corpusFace()
    expect(Object.keys(face).length).toBeGreaterThan(500)
    expect(faceLosses(face, face)).toEqual([])
  })
})
