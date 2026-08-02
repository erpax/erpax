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

  // `import type {…}` is obvious; `import { type X, type Y }` is the same erasure in different syntax, and
  // TypeScript elides it just as completely. Counting it invents an edge — and an invented edge in a cycle
  // gate is an invented cycle. Measured: 5 of 3,995 braced @/ imports. Small, and still 5 lies.
  it('an import whose specifiers are ALL inline type is erased — not an edge', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { type B, type C } from '@/b'\nexport const a = (x: B, y: C) => [x, y]",
      'src/b/index.ts': "import { a } from '@/a'\nexport type B = number\nexport type C = string\nexport const b = () => a(1, 'x')",
    })
    expect(importCycles(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('but ONE value specifier makes the whole statement an edge', () => {
    const cwd = corpus({
      'src/a/index.ts': "import { real, type B } from '@/b'\nexport const a = (x: B) => real(x)",
      'src/b/index.ts': "import { a } from '@/a'\nexport type B = number\nexport const real = (n: number) => n\nexport const b = () => a(1)",
    })
    expect(importCycles(cwd)).toHaveLength(1) // `real` is a value — the edge is genuine
    rmSync(cwd, { recursive: true, force: true })
  })

  // The edges come from ts.createSourceFile, not from a pattern. Against 6,203 files the regex it replaced
  // was wrong in 115: it INVENTED 4 edges and MISSED 211. These two classes are why — a pattern that
  // "usually matches" a language is a heuristic wearing a theorem's clothes, and it under-reports as readily
  // as it over-reports. Both tests below found NOTHING under the regex.
  it('a side-effect import IS an edge — it has no `from`, so the pattern never saw it', () => {
    const cwd = corpus({
      'src/a/index.ts': "import '@/b'\nexport const a = 1",
      'src/b/index.ts': "import { a } from '@/a'\nexport const b = () => a",
    })
    expect(importCycles(cwd)).toHaveLength(1) // the module is loaded and its top level runs: a real loop
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a dynamic import IS an edge — the pattern had no way to express it', () => {
    const cwd = corpus({
      'src/a/index.ts': "export const a = async () => (await import('@/b')).b",
      'src/b/index.ts': "import { a } from '@/a'\nexport const b = () => a()",
    })
    expect(importCycles(cwd)).toHaveLength(1)
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

    /**
     * A MULTI-LINE concise arrow body is deferred, and the line scanner said otherwise.
     *
     * `export const p = (): string =>\n  make()` — line one's initialiser starts with `(`, so it
     * was correctly skipped; but a concise arrow body opens NO BRACE, so the brace-depth counter
     * stayed at 0 and line two matched the "bare call statement" branch. The continuation line of
     * a deferred function was reported as running at load time. Seven live sites had this shape.
     */
    it('does NOT flag a MULTI-LINE concise arrow body — the continuation line is still deferred', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { make } from '@/b'\nexport const build = (): string =>\n  make() || 'fallback'",
        'src/b/index.ts': "import { build } from '@/a'\nexport const make = () => build",
      })
      expect(fatalCycleUses(cwd)).toHaveLength(0)
      rmSync(cwd, { recursive: true, force: true })
    })

    /**
     * The worse bug, and the reason this is parsed rather than matched.
     *
     * The line scanner only judged depth 0, so EVERY top-level `if` / `try` / `for` block was
     * invisible to it — a call that genuinely runs at module load, reported green. A false
     * negative in a gate is worse than a false positive: it reports clean over the exact case the
     * gate exists for. Ancestry is the theorem — a call is evaluated at load time iff no ancestor
     * is function-like.
     */
    /**
     * The CLI main-guard is deferral, and missing it cost 34 of 46 reported sites.
     *
     * `if (import.meta.url === \`file://${process.argv[1]}\`)` sits at module scope, so "no
     * function ancestor" is literally true and the wrong question: that body runs ONLY when the
     * file is the process entry point, never on import. It cannot be in an import cycle's dead
     * zone, because by the time a CLI entry executes every module it imported has initialised.
     */
    it('does NOT flag a call inside the CLI main-guard — it never runs on import', () => {
      const guard = 'if (import.meta.url === `file://${process.argv[1]}`) {\n  make()\n}'
      const cwd = corpus({
        'src/a/index.ts': `import { make } from '@/b'\n${guard}`,
        'src/b/index.ts': "import { a } from '@/a'\nexport const make = () => a",
      })
      expect(fatalCycleUses(cwd)).toHaveLength(0)
      rmSync(cwd, { recursive: true, force: true })
    })

    it('DOES flag a call inside a top-level block — depth is not deferral', () => {
      const cwd = corpus({
        'src/a/index.ts': "import { make } from '@/b'\nexport let built\nif (process.env.X) {\n  built = make()\n}",
        'src/b/index.ts': "import { built } from '@/a'\nexport const make = () => built",
      })
      const uses = fatalCycleUses(cwd)
      expect(uses).toHaveLength(1)
      expect(uses[0]).toMatchObject({ file: 'src/a/index.ts', binding: 'make' })
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
