import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import { meshOf, meshWaves, meshShape, standardsOf, atomsOf, atomOfFile } from '@/mesh'

// Hermetic fixture corpus: three atoms in a chain a→b→c, one standard banner, one
// import-shaped STRING that must never become an edge (the phantom class every
// parsed instrument was converted to refuse).
const tmp = mkdtempSync(join(tmpdir(), 'mesh-'))
const src = join(tmp, 'src')

const seed = (): void => {
  for (const atom of ['a', 'b', 'c']) mkdirSync(join(src, atom), { recursive: true })
  writeFileSync(
    join(src, 'a', 'index.ts'),
    "/**\n * @standard ISO-4217:2015 currency-codes\n */\nimport { b } from '../b'\nexport const a = b + 1\n",
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
})
