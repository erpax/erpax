import { describe, expect, it } from 'vitest'
import { paperMetadata } from '@/publish/paper'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertResultsUnique, citationGraph, duplicateResults, foreignCollisions, normaliseStatement, paperInputs, publishableResults, relatedIdentifiers, resultManifest, resultUuid, slugOf, statementAddress, statementFixture, type PublishableResult } from '@/publish/registry'

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

describe('publish/registry — the wiring publish/paper never had', () => {
  it('maps every publishable result to a paper input, carrying the cross-repo identity', () => {
    const inputs = paperInputs(process.cwd())
    const results = publishableResults(process.cwd())
    expect(inputs).toHaveLength(results.length)
    for (const [i, input] of inputs.entries()) {
      expect(input.contentUuid).toBe(results[i]!.uuid) // the deposition names the FINDING
      expect(input.boundary.length).toBeGreaterThan(0) // never a paper without a stated limit
      expect(input.title).toBe(results[i]!.title)
    }
  })

  it('a deposition titles itself with the ATOM title, not the claim sentence', () => {
    const input = paperInputs(process.cwd()).find((i) => i.atomPath === 'merge/order')!
    const meta = paperMetadata(input) as { title: string; description: string }
    expect(meta.title).toBe(input.title)
    expect(meta.title).not.toBe(input.claim)
    // the claim still leads the description, where a full sentence belongs
    expect(meta.description).toContain(input.claim)
  })

  it('the deposition carries the cross-links and no undocumented attribute', () => {
    const results = publishableResults(process.cwd())
    const r = results.find((x) => x.atomPath === 'merge/order')!
    const rel = relatedIdentifiers(r, citationGraph(results).get(r.slug) ?? [], 'https://erpax.com')
    expect(rel.length).toBeGreaterThan(5)
    expect(rel.some((x) => x.relation === 'isIdenticalTo' && x.identifier === `urn:uuid:${r.uuid}`)).toBe(true)
    // `scheme` is not a documented Zenodo attribute — identifier · relation · resource_type
    expect(rel.every((x) => !('scheme' in x))).toBe(true)
  })
})

describe('publish/registry — the cross-repo statement address', () => {
  it('keeps the space that Lean application depends on, in ASCII', () => {
    expect(normaliseStatement('List.range 7 is  finite')).toBe('List.range 7 is finite')
    expect(normaliseStatement('a == b')).toBe('a=b')
    expect(normaliseStatement('x != y')).toBe('x≠y')
    expect(normaliseStatement('foo ( bar )')).toBe('foo(bar)')
  })

  it('keeps case — lowercasing conflates case-sensitive identifiers', () => {
    expect(normaliseStatement('Level')).toBe('Level')
    expect(statementAddress('Level')).not.toBe(statementAddress('level'))
  })

  it('judges each space independently, not against a consumed neighbour', () => {
    // a capture-group form consumed its neighbours, so after deciding "e 7" the next space was
    // compared against the wrong left character and the sentence lost a space it must keep
    expect(normaliseStatement('List.range 7 is finite')).toContain(' 7 is ')
  })

  // v3. The ASCII class was agreed by three parties and wrong in the merging direction for the
  // third time — it corrupts every non-ASCII identifier, including two of erpax's own claims.
  // The FIXTURE is the artifact, not the sentence: this rule has been specified in prose three
  // times and refuted by measurement twice, so a sibling checks CASES rather than a description.
  it('matches every case in the shared fixture', () => {
    for (const [input, want] of statementFixture()) {
      expect(normaliseStatement(input)).toBe(want)
    }
    expect(statementFixture().length).toBeGreaterThan(8)
  })

  it('keeps the space beside a GREEK identifier — the case the ASCII rule corrupted', () => {
    expect(normaliseStatement('σ (σ l) = l')).toBe('σ(σ l)=l')
    expect(normaliseStatement('H₁(Σ₂) = ℤ⁴ with χ = −2')).toBe('H₁(Σ₂)=ℤ⁴ with χ=−2')
    expect(normaliseStatement('self-dual under φ(d) = 432/d')).toBe('self-dual under φ(d)=432/d')
  })

  it('two statements differing only in case do not collide', () => {
    expect(statementAddress('Nat.succ 1')).not.toBe(statementAddress('nat.succ 1'))
  })

  it('the manifest carries both addresses — ours and the cross-repo key', () => {
    const rs = publishableResults(process.cwd())
    const m = resultManifest('erpax', rs)
    expect(m.results[0]!.statementUuid).toBe(statementAddress(rs[0]!.claim))
    expect(m.results[0]!.uuid).not.toBe(m.results[0]!.statementUuid) // different questions
  })
})
