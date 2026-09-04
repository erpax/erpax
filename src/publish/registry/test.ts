import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertResultsUnique, citationGraph, duplicateResults, foreignCollisions, publishableResults, resultManifest, resultUuid, slugOf, type PublishableResult } from '@/publish/registry'

const atom = (law: string | null, boundary: string | null, gate: boolean, extra = ''): Record<string, string> => ({
  'SKILL.md': [
    '# a',
    '',
    boundary === null ? '' : `**Honest boundary.** ${boundary}`,
    '',
    law === null ? '' : `**Law — [[law]]: ${law}**`,
    '',
    extra,
  ].join('\n'),
  'index.ts': gate ? 'export function assertThing(): void {}\n' : 'export const x = 1\n',
})

const tree = (atoms: Record<string, Record<string, string>>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-reg-'))
  for (const [path, files] of Object.entries(atoms)) {
    for (const [name, body] of Object.entries(files)) {
      const p = join(root, 'src', path, name)
      mkdirSync(join(p, '..'), { recursive: true })
      writeFileSync(p, body)
    }
  }
  return root
}

describe('publish/registry — a result is publishable only with all three legs', () => {
  it('publishes an atom stating a law, a boundary AND exporting a fail-closed gate', () => {
    const root = tree({ 'a/b': atom('the law holds', 'it proves X, never Y', true) })
    const rs = publishableResults(root)
    expect(rs).toHaveLength(1)
    expect(rs[0]!.slug).toBe('a-b')
    expect(rs[0]!.claim).toBe('the law holds')
    expect(rs[0]!.boundary).toBe('it proves X, never Y')
    expect(rs[0]!.method).toBe('tsx src/a/b/index.ts')
  })

  it('refuses a claim with NO stated boundary — every overreach here began without one', () => {
    const root = tree({ a: atom('the law holds', null, true) })
    expect(publishableResults(root)).toEqual([])
  })

  it('refuses a claim with NO falsifier — a law nothing can contradict is not a result', () => {
    const root = tree({ a: atom('the law holds', 'proves X only', false) })
    expect(publishableResults(root)).toEqual([])
  })

  it('refuses an atom stating no law at all', () => {
    const root = tree({ a: atom(null, 'proves X only', true) })
    expect(publishableResults(root)).toEqual([])
  })

  it('cross-links the atom, its law, its gate and both DOIs', () => {
    const root = tree({ a: atom('l', 'b', true) })
    const rels = publishableResults(root)[0]!.links.map((l) => l.rel)
    expect(rels).toContain('atom')
    expect(rels).toContain('law')
    expect(rels).toContain('gate')
    expect(rels).toContain('archived-version')
    expect(rels).toContain('archived-all-versions')
  })

  it('cites only results that are THEMSELVES published — a dangling citation is forbidden', () => {
    const root = tree({
      a: atom('l', 'b', true, 'Composes: [[c]] · [[ghost]] · [[law]].'),
      c: atom('l', 'b', true),
      ghost: { 'SKILL.md': '# ghost\n\nno law, no boundary, no gate\n', 'index.ts': 'export const y = 1\n' },
    })
    const rs = publishableResults(root)
    const graph = citationGraph(rs)
    expect(graph.get('a')).toEqual(['c']) // ghost is not published, so it is not cited
  })

  it('never cites itself', () => {
    const root = tree({ a: atom('l', 'b', true, 'Composes: [[a]].') })
    expect(citationGraph(publishableResults(root)).get('a')).toEqual([])
  })

  it('slugs are path-derived and stable', () => {
    expect(slugOf('rules/drift')).toBe('rules-drift')
    expect(slugOf('merge/order')).toBe('merge-order')
  })

  it('the live corpus publishes a connected body of work, not a heap', () => {
    const rs = publishableResults(process.cwd())
    expect(rs.length).toBeGreaterThanOrEqual(40)
    const graph = citationGraph(rs)
    const edges = [...graph.values()].reduce((n, xs) => n + xs.length, 0)
    expect(edges).toBeGreaterThan(20)
    // every published result states what it does not prove
    expect(rs.every((r) => r.boundary.length > 0)).toBe(true)
  })
})

describe('publish/registry — a result is unique no matter which repo derives it', () => {
  const R = (slug: string, claim: string, boundary: string): PublishableResult =>
    ({ slug, claim, boundary, uuid: resultUuid(claim, boundary), atomPath: slug, title: slug, method: '', standards: [], composes: [], proof: null, links: [] }) as PublishableResult

  it('identity addresses the CLAIM, never the path — a sibling lands on the same uuid', () => {
    expect(resultUuid('c', 'b')).toBe(resultUuid('c', 'b'))
    expect(resultUuid('c', 'b')).not.toBe(resultUuid('c', 'b2'))
    // the path is repo-local; if it were in the address every sibling copy would look novel
    expect(R('a/x', 'c', 'b').uuid).toBe(R('totally/other/path', 'c', 'b').uuid)
  })

  it('flags one finding published twice in this repo', () => {
    const dupes = duplicateResults([R('a', 'same claim', 'same boundary'), R('b', 'same claim', 'same boundary')])
    expect(dupes).toHaveLength(1)
    expect([dupes[0]!.here, dupes[0]!.there].sort()).toEqual(['a', 'b'])
  })

  it('finds a sibling repo publishing the same result, matched by identity not title', () => {
    const mine = [R('merge-order', 'a root declares its kind', 'proves declaration, not truth')]
    const drop = mkdtempSync(join(tmpdir(), 'erpax-drop-'))
    writeFileSync(
      join(drop, 'sibling.results.json'),
      JSON.stringify({
        repo: 'sibling',
        versionDoi: '10.5281/zenodo.1',
        // a DIFFERENT slug and title for the SAME claim — only the identity catches it
        results: [{ uuid: mine[0]!.uuid, slug: 'root-kinds', title: 'Root kinds', claim: 'a root declares its kind' }],
      }),
    )
    const { collisions, manifestsRead } = foreignCollisions(mine, drop)
    expect(manifestsRead).toBe(1)
    expect(collisions).toEqual([{ uuid: mine[0]!.uuid, here: 'merge-order', there: 'root-kinds', repo: 'sibling' }])
  })

  it('an EMPTY drop reports UNCHECKED, never clean — absence of evidence is not evidence', () => {
    const drop = mkdtempSync(join(tmpdir(), 'erpax-drop-empty-'))
    const { collisions, manifestsRead } = foreignCollisions([R('a', 'c', 'b')], drop)
    expect(manifestsRead).toBe(0) // the caller must distinguish this from a clean check
    expect(collisions).toEqual([])
  })

  it('never reports the repo against itself', () => {
    const mine = [R('a', 'c', 'b')]
    const drop = mkdtempSync(join(tmpdir(), 'erpax-drop-self-'))
    writeFileSync(join(drop, 'erpax.results.json'), JSON.stringify(resultManifest('erpax', mine)))
    expect(foreignCollisions(mine, drop).manifestsRead).toBe(0)
  })

  it('the live corpus publishes each finding exactly once', () => {
    expect(() => assertResultsUnique(process.cwd())).not.toThrow()
    const rs = publishableResults(process.cwd())
    expect(new Set(rs.map((r) => r.uuid)).size).toBe(rs.length)
  })
})
