import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import { meshOf, meshWaves, meshShape, standardsOf, atomsOf, atomOfFile, upstreamOf, failureRoots, costRoots, failedFilesFromVitestJson, standardApiCross, apiStandardsCross, apiOf } from '@/mesh'

// Hermetic fixture corpus: three atoms in a chain a→b→c, one standard banner, one
// import-shaped STRING that must never become an edge (the phantom class every
// parsed instrument was converted to refuse).
const tmp = mkdtempSync(join(tmpdir(), 'mesh-'))
const src = join(tmp, 'src')

const seed = (): void => {
  for (const atom of ['a', 'b', 'c']) mkdirSync(join(src, atom), { recursive: true })
  // atom 'a' is a Payload COLLECTION (has a slug) citing a standard — the cross's anchor
  writeFileSync(
    join(src, 'a', 'index.ts'),
    "/**\n * @standard ISO-4217:2015 currency-codes\n */\nimport { b } from '../b'\nconst Accounts: CollectionConfig = { slug: 'accounts', fields: [] }\nexport const a = Accounts\n",
  )
  writeFileSync(
    join(src, 'b', 'index.ts'),
    "import { c } from '../c'\nexport const b = c + 1\nconst phantom = \"import { x } from '../a'\"\nexport const keep = phantom.length\n",
  )
  writeFileSync(join(src, 'c', 'index.ts'), 'export const c = 1\n')
}
seed()
afterAll(() => rmSync(tmp, { recursive: true, force: true }))

describe('mesh — one quantum mesh: atoms ⊕ imports ⊕ standards', () => {
  const mesh = meshOf(tmp)

  it('folds files to their atom (the folder IS the atom)', () => {
    expect(atomOfFile(join(src, 'a', 'index.ts'), tmp)).toBe('a')
  })

  it('import edges are PARSED — a chain a→b→c, and an import-shaped string is never an edge', () => {
    const keys = mesh.edges.map((e) => `${e.from}→${e.to}`).sort()
    expect(keys).toEqual(['a→b', 'b→c'])
  })

  it('a standard banner in a COMMENT becomes a mesh citation on its atom', () => {
    const s = standardsOf(mesh, 'a')
    expect(s.length).toBe(1)
    expect(s[0]!.tag).toBe('standard')
    expect(s[0]!.id).toContain('ISO-4217:2015')
  })

  it('the clause→code trace runs backwards: atomsOf(standard) names the citing atoms', () => {
    expect(atomsOf(mesh, 'ISO-4217')).toEqual(['a'])
    expect(atomsOf(mesh, 'ISO-9999')).toEqual([])
  })

  it('waves level the chain — depth 3, sources first (Mirsky over the mesh)', () => {
    const w = meshWaves(mesh)
    expect(w.length).toBe(3)
    expect(w[0]).toContain('c')
    expect(w[2]).toContain('a')
    expect(meshShape(mesh)).toEqual({ depth: 3, parallelism: 1 })
  })

  it('upstreamOf is the causal space — a depends transitively on b and c', () => {
    expect([...upstreamOf(mesh, 'a')].sort()).toEqual(['b', 'c'])
    expect([...upstreamOf(mesh, 'c')]).toEqual([])
  })

  it('failures are linear, converted quantum — two failures collapse onto their sharpest root', () => {
    // suites for a AND b both red: linear reads two grinds; the mesh says one root. b explains both
    // AND its whole blast radius failed (lift 1.0) — the sharpest cause ranks first; c also explains
    // both but its blast includes the innocent c itself, so it ranks second. Fix b, the wave collapses.
    const roots = failureRoots(mesh, ['a', 'b'])
    expect(roots[0]!.root).toBe('b')
    expect(roots[0]!.explains).toEqual(['a', 'b'])
    expect(roots[0]!.lift).toBe(1)
    const c = roots.find((r) => r.root === 'c')!
    expect(c.explains).toEqual(['a', 'b'])
    expect(c.lift).toBeLessThan(1)
  })

  it('cost collapses onto the shared root — the optimisation target is computed, not guessed', () => {
    // a costs 30s, b costs 20s: c sits under BOTH (50s total) — the deepest shared root carries
    // the whole bill; fixing c collapses both. Self-optimisation reads the ranking, not taste.
    const roots = costRoots(mesh, new Map([['a', 30_000], ['b', 20_000]]))
    const c = roots.find((r) => r.root === 'c')!
    expect(c.costMs).toBe(50_000)
    expect(c.explains).toEqual(['a', 'b'])
    expect(roots[0]!.costMs).toBe(50_000)
  })

  describe('the navigational cross — standard ↔ collection ↔ Payload API (quantum ERP)', () => {
    it('a collection atom is detected with its slug and the plugin-mcp operations', () => {
      expect(mesh.collections).toEqual([{ slug: 'accounts', atom: 'a', operations: ['find', 'create', 'update', 'delete'] }])
    })

    it('standardApiCross reaches the API — a standard → collections → find/create/update/delete endpoints', () => {
      const cross = standardApiCross(mesh, 'ISO-4217')
      expect(cross.collections.map((c) => c.slug)).toEqual(['accounts'])
      expect(cross.endpoints.map((e) => e.tool)).toEqual(['find-accounts', 'create-accounts', 'update-accounts', 'delete-accounts'])
    })

    it('apiStandardsCross is the inverse — a collection knows its own governing standards', () => {
      const cross = apiStandardsCross(mesh, 'accounts')
      expect(cross.atom).toBe('a')
      expect(cross.standards.some((s) => s.id.includes('ISO-4217:2015'))).toBe(true)
      expect(apiStandardsCross(mesh, 'nonexistent').standards).toEqual([])
    })

    it('apiOf lists a collection\'s endpoints; an unknown slug is empty', () => {
      expect(apiOf(mesh, 'accounts')).toHaveLength(4)
      expect(apiOf(mesh, 'ghost')).toEqual([])
    })
  })

  it('the strategy is a TOOL — failedFilesFromVitestJson reads a vitest report, only the failures', () => {
    const report = {
      testResults: [
        { name: '/repo/src/a/test.ts', status: 'failed' },
        { name: '/repo/src/b/test.ts', status: 'passed' },
        { name: '/repo/src/c/test.ts', status: 'failed' },
      ],
    }
    expect(failedFilesFromVitestJson(report)).toEqual(['/repo/src/a/test.ts', '/repo/src/c/test.ts'])
    expect(failedFilesFromVitestJson(null)).toEqual([])
  })
})
