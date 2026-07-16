import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { importCycles, importsOf, assertNoNewCycles, fatalCycleUses } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-cycle-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rules/cycle — an import loop decides initialisation order', () => {
  it('finds a two-file loop', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { b } from '@/b'\nexport const a = () => b()",
      'src/b/index.ts': "import { a } from '@/a'\nexport const b = () => a()",
    })
    const cs = importCycles(cwd)
    expect(cs).toHaveLength(1)
    expect(cs[0]).toEqual(['src/a/index.ts', 'src/b/index.ts'])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an acyclic graph is silent', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { b } from '@/b'\nexport const a = () => b()",
      'src/b/index.ts': 'export const b = () => 1',
    })
    expect(importCycles(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  /**
   * THE BUG THIS GATE SHIPPED WITH, pinned so it cannot return.
   *
   * The first implementation was a DFS that marked nodes `done` and reported the stack slice on a back-edge
   * — with a comment boasting "Tarjan-free". Against the live tree it reported 90 loops and MISSED the one
   * it was written for: a finished node is never re-entered, so a loop reachable only THROUGH it is
   * invisible. Here `entry` is walked first and finishes `x`; the b↔c loop is only reachable through `x`.
   */
  it('finds a loop reachable only THROUGH an already-finished node — the false negative', () => {
    const cwd = corpus({
      'src/entry/index.ts': "import { x } from '@/x'\nexport const e = () => x()",
      'src/x/index.ts': "import { b } from '@/b'\nexport const x = () => b()",
      'src/b/index.ts': "import { c } from '@/c'\nexport const b = () => c()",
      'src/c/index.ts': "import { b } from '@/b'\nexport const c = () => b()",
    })
    const cs = importCycles(cwd)
    expect(cs).toHaveLength(1) // the DFS version found ZERO here
    expect(cs[0]).toEqual(['src/b/index.ts', 'src/c/index.ts'])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('reports one TANGLE, not every ring — enumerating rings is exponential, the component is not', () => {
    // a,b,c all mutually reachable: 3 files, many rings, ONE component
    const cwd = corpus({
      'src/a/index.ts': "import { b } from '@/b'\nimport { c } from '@/c'\nexport const a = () => b() + c()",
      'src/b/index.ts': "import { c } from '@/c'\nexport const b = () => c()",
      'src/c/index.ts': "import { a } from '@/a'\nexport const c = () => a()",
    })
    const cs = importCycles(cwd)
    expect(cs).toHaveLength(1)
    expect(cs[0]).toEqual(['src/a/index.ts', 'src/b/index.ts', 'src/c/index.ts'])
    rmSync(cwd, { recursive: true, force: true })
  })

  // `import type` is erased before runtime, so it cannot cause a TDZ. Counting it would invent loops that
  // do not exist — the false-positive class this corpus has paid for repeatedly (reference counted string
  // literals; standards/emit counted prose about banners).
  it('a type-only import is NOT an edge — it is erased before it can bite', () => {
    const cwd = corpus({
      'src/a/index.ts': "import type { B } from '@/b'\nexport const a = (x: B) => x",
      'src/b/index.ts': "import { a } from '@/a'\nexport type B = number\nexport const b = () => a(1)",
    })
    expect(importCycles(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('importsOf reads runtime edges only', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { b } from '@/b'\nimport type { T } from '@/c'\nimport fs from 'node:fs'",
      'src/b/index.ts': 'export const b = 1',
      'src/c/index.ts': 'export type T = 1',
    })
    const es = importsOf(join(cwd, 'src/a/index.ts'), cwd)
    expect(es).toHaveLength(1) // @/b only: the type import is erased, node:fs is not ours
    expect(es[0]).toContain('src/b/index.ts')
    rmSync(cwd, { recursive: true, force: true })
  })

  // Entangled is not fatal. ES modules tolerate a loop unless someone USES a binding while the graph is
  // still initialising — so the interesting question is not "who is in a ring" (174 files) but "who runs a
  // ring-mate at load time" (20).
  describe('topLevelUses — where a cycle stops being latent', () => {
    it('flags a top-level CALL to a binding from the same tangle', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { make } from '@/b'\nexport const built = make()",
        'src/b/index.ts': "import { built } from '@/a'\nexport const make = () => built",
      })
      const uses = fatalCycleUses(cwd)
      expect(uses).toHaveLength(1)
      expect(uses[0]).toMatchObject({ file: 'src/a/index.ts', binding: 'make' })
      rmSync(cwd, { recursive: true, force: true })
    })

    it('does NOT flag a function that calls the same import — it runs long after init', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { make } from '@/b'\nexport const build = () => make()",
        'src/b/index.ts': "import { build } from '@/a'\nexport const make = () => build",
      })
      expect(fatalCycleUses(cwd)).toHaveLength(0) // entangled, but nothing runs at load time
      rmSync(cwd, { recursive: true, force: true })
    })

    // The scan reported 49 uses until this check existed; ~44 were `join`, `existsSync`, `createRequire` —
    // node builtins, fully initialised before our graph starts and incapable of the failure being hunted.
    it('does NOT flag a builtin called at top level — node:path cannot be in a dead zone', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { join } from 'node:path'\nimport { m } from '@/b'\nexport const p = join('x', 'y')\nexport const a = () => m",
        'src/b/index.ts': "import { a } from '@/a'\nexport const m = () => a()",
      })
      expect(fatalCycleUses(cwd)).toHaveLength(0)
      rmSync(cwd, { recursive: true, force: true })
    })

    it('judges nothing outside a tangle — a top-level call is normal when nothing points back', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { make } from '@/b'\nexport const built = make()",
        'src/b/index.ts': 'export const make = () => 1',
      })
      expect(fatalCycleUses(cwd)).toHaveLength(0) // acyclic: no dead zone to fall into
      rmSync(cwd, { recursive: true, force: true })
    })
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { b } from '@/b'\nexport const a = () => b()",
      'src/b/index.ts': "import { a } from '@/a'\nexport const b = () => a()",
    })
    expect(() => assertNoNewCycles(cwd, 1)).not.toThrow()
    expect(() => assertNoNewCycles(cwd, 0)).toThrow(/import loop/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
