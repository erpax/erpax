import { describe, it, expect, afterAll } from 'vitest'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, utimesSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import {
  LEAK_SHARE,
  PACKED_WORKER_DIR,
  PRODUCTION_FOLDS,
  WORKER_LIMIT_BYTES,
  assertFoldsHold,
  assertNoFoldLeaks,
  assertWorkerFitsBudget,
  foldReadings,
  foldWeight,
  staleFolds,
  workerBudget,
  type Fold,
} from './index'

const dirs: string[] = []
const tmp = (): string => {
  const d = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
  dirs.push(d)
  return d
}
const write = (root: string, rel: string, body: string | Buffer): void => {
  mkdirSync(dirname(join(root, rel)), { recursive: true })
  writeFileSync(join(root, rel), body)
}
afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })))

describe('deploy/fold — every production fold still folds', () => {
  it('is clean against the live tree', () => {
    expect(staleFolds()).toEqual([])
    expect(() => assertFoldsHold()).not.toThrow()
  })

  it('names matter that is genuinely heavy — the matrix alone is over a megabyte compressed', () => {
    const weight = foldWeight()
    const matrix = weight.find((w) => w.target === 'src/uuid/matrix/generated.ts')
    expect(matrix?.gzip).toBeGreaterThan(1_000_000)
    // Every declared fold swaps out real matter; a zero-byte fold is a fold with nothing behind it.
    expect(weight.every((w) => w.bytes > 0)).toBe(true)
  })
})

describe('deploy/fold — the detector CATCHES the regression it was written for', () => {
  it('rejects the pre-rename pattern against the post-rename tree (the d828b72d3 defect)', () => {
    // Verbatim the pattern next.config carried after the scalpel renamed
    // src/uuid/matrix/matrix.generated.ts → src/uuid/matrix/generated.ts. It matched nothing,
    // nothing failed, and ~4 MiB of corpus matrix shipped.
    const stale = staleFolds(process.cwd(), [
      {
        target: 'src/uuid/matrix/generated.ts',
        stub: '.stubs/matrix.generated.js',
        pattern: /uuid[\\/]matrix[\\/]matrix\.generated(\.ts)?$/,
        side: 'both',
        why: 'the historical pattern',
      },
    ])
    expect(stale).toHaveLength(1)
    expect(stale[0]?.reason).toBe('pattern-misses-target')
  })

  it('rejects a fold whose target has moved away', () => {
    const stale = staleFolds(tmp(), [PRODUCTION_FOLDS[0]!])
    expect(stale.map((v) => v.reason)).toContain('target-missing')
  })

  it('rejects a fold whose stub resolves nowhere', () => {
    const root = tmp()
    const fold = PRODUCTION_FOLDS[0]!
    write(root, fold.target, '// the real matter')
    expect(staleFolds(root, [fold]).map((v) => v.reason)).toEqual(['stub-missing'])
  })

  it('accepts only when the pattern, the matter and the stub all agree', () => {
    const root = tmp()
    const fold = PRODUCTION_FOLDS[0]!
    write(root, fold.target, '// the real matter')
    write(root, fold.stub, 'export const UUID_MATRIX_NODES = []')
    expect(staleFolds(root, [fold])).toEqual([])
  })

  it('assertFoldsHold throws, and the message names the stale target', () => {
    const root = tmp()
    expect(() => assertFoldsHold(root)).toThrow(/no longer fold/)
    expect(() => assertFoldsHold(root)).toThrow(new RegExp(PRODUCTION_FOLDS[0]!.target))
  })
})

describe('deploy/fold — the packed artifact is weighed against the paid ceiling', () => {
  /** A packed bundle of incompressible bytes — a repeated filler would gzip away and flatter the reading. */
  const pack = (root: string, bytes: number): void => write(root, `${PACKED_WORKER_DIR}/worker.js`, randomBytes(bytes))
  const build = (root: string): void => write(root, '.open-next/worker.js', 'export { default } from "./server"')

  it('with no build at all there is nothing to weigh, and it says so rather than passing a weight', () => {
    const b = workerBudget(tmp())
    expect(b.built).toBe(false)
    expect(b.packed).toBe(false)
    expect(b.gzip).toBe(0)
  })

  it('refuses a build nobody packed — nothing weighed is not a Worker that fits', () => {
    const root = tmp()
    build(root)
    expect(workerBudget(root)).toMatchObject({ built: true, packed: false })
    expect(() => assertWorkerFitsBudget(root)).toThrow(/nothing is packed/)
  })

  it('refuses a pack older than the build beside it — it weighs a Worker that will not ship', () => {
    const root = tmp()
    build(root)
    pack(root, 1024)
    const past = new Date(Date.now() - 3_600_000)
    utimesSync(join(root, PACKED_WORKER_DIR, 'worker.js'), past, past)
    expect(workerBudget(root).stale).toBe(true)
    expect(() => assertWorkerFitsBudget(root)).toThrow(/older than the build/)
  })

  it('accepts a pack made after the build', () => {
    const root = tmp()
    build(root)
    const past = new Date(Date.now() - 3_600_000)
    utimesSync(join(root, '.open-next/worker.js'), past, past)
    pack(root, 1024)
    expect(workerBudget(root).stale).toBe(false)
    expect(() => assertWorkerFitsBudget(root)).not.toThrow()
  })

  it('fails closed on a Worker Cloudflare would refuse, naming the overage', () => {
    const root = tmp()
    pack(root, WORKER_LIMIT_BYTES + 1024 * 1024)
    const b = workerBudget(root)
    expect(b.fits).toBe(false)
    expect(b.headroom).toBeLessThan(0)
    expect(() => assertWorkerFitsBudget(root)).toThrow(/over the .* ceiling by/)
  })

  it('passes a Worker inside the ceiling and reports the spare', () => {
    const root = tmp()
    pack(root, 1024 * 1024)
    const b = workerBudget(root)
    expect(b.fits).toBe(true)
    expect(b.headroom).toBeGreaterThan(8 * 1024 * 1024)
    expect(b.share).toBeLessThan(0.2)
    expect(() => assertWorkerFitsBudget(root)).not.toThrow()
  })

  it('weighs the packed worker only — the sourcemap beside it is never uploaded', () => {
    const root = tmp()
    pack(root, 512 * 1024)
    write(root, `${PACKED_WORKER_DIR}/worker.js.map`, randomBytes(20 * 1024 * 1024))
    expect(workerBudget(root).fits).toBe(true)
  })

  it('the deploy lane packs into the directory the budget reads — one spelling, two readers', () => {
    // A pack written anywhere else is a pack this gate never weighs: it would refuse the build as
    // unpacked, or worse, weigh a stale one left behind in the old place.
    const workflow = readFileSync(join(process.cwd(), '.github', 'workflows', 'cloudflare.yml'), 'utf8')
    expect(workflow).toContain(`wrangler deploy --dry-run --outdir ${PACKED_WORKER_DIR}`)
    expect(workerBudget(tmp(), PACKED_WORKER_DIR).packed).toBe(false)
  })
})

describe('deploy/fold — the bundle is read for each fold, not only the config', () => {
  // The config check read "8 folds hold" while a Turbopack build shipped all four server folds:
  // next.config's patterns still matched their files, and only webpack applies them.
  const fixture: Fold = {
    target: 'src/fixture/generated.ts',
    stub: '.stubs/fixture.js',
    pattern: /fixture[\\/]generated(\.ts)?$/,
    side: 'both',
    why: 'a generated leaf a bundler would inline',
  }
  const entries = Array.from({ length: 24 }, (_, i) => [
    `fixture-entry-${String(i).padStart(2, '0')}-content-address`,
    `the prose entry ${i} — carried into the Worker bundle`,
  ])
  const repo = (bundle: string, target?: string): string => {
    const root = tmp()
    const body = entries.map(([id, text]) => `  { id: '${id}', text: '${text}' },`).join('\n')
    write(root, fixture.target, target ?? `export const FIXTURE = [\n${body}\n]\n`)
    write(root, fixture.stub, 'export const FIXTURE = []')
    write(root, `${PACKED_WORKER_DIR}/worker.js`, bundle)
    return root
  }
  /** What a minifier leaves of the target: the same strings in the same order, other quotes, no whitespace. */
  const inlined = `var FIXTURE=[${entries.map(([id, text]) => `{id:${JSON.stringify(id)},text:${JSON.stringify(text)}}`).join(',')}];`

  it('fails when the server output carries the target, and names the fold that leaked', () => {
    const root = repo(`export default{fetch(){}};${inlined}`)
    expect(foldReadings(root, undefined, [fixture])[0]?.share).toBe(1)
    expect(() => assertNoFoldLeaks(root, undefined, [fixture])).toThrow(/leaked: src\/fixture\/generated\.ts — \d+\/\d+ of its literal pairs/)
  })

  it('passes when only the stub shipped', () => {
    const root = repo('export default{fetch(){}};var FIXTURE=[];')
    expect(foldReadings(root, undefined, [fixture])[0]).toMatchObject({ present: 0, share: 0 })
    expect(() => assertNoFoldLeaks(root, undefined, [fixture])).not.toThrow()
  })

  it('a leak packed with its non-ASCII escaped is still a leak — wrangler packs with esbuild`s ASCII charset', () => {
    const escaped = inlined.replace(/[^\x00-\x7f]/g, (c) => `\\u${c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`)
    expect(escaped).not.toContain('—')
    const root = repo(`export default{fetch(){}};${escaped}`)
    expect(foldReadings(root, undefined, [fixture])[0]?.share).toBe(1)
    expect(() => assertNoFoldLeaks(root, undefined, [fixture])).toThrow(/leaked: src\/fixture\/generated\.ts/)
  })

  it('two atom paths side by side are shared vocabulary, never the fold — any sorted path list has them', () => {
    // Every pair the folded Worker matched for the atom catalogue was one of these (2026-09-11):
    // gl/accounts/period/end/adjustments → …/hooks, found in another module's sorted path list.
    const paths = entries.map((_, i) => `fixture/atoms/entry/${String(i).padStart(2, '0')}/content`)
    const target = `export const FIXTURE = [\n${paths.map((p, i) => `  { path: '${p}', text: '${entries[i]![1]}' },`).join('\n')}\n]\n`
    const root = repo(`export default{fetch(){}};var PATHS=${JSON.stringify(paths)};`, target)
    expect(foldReadings(root, undefined, [fixture])[0]).toMatchObject({ present: 0, share: 0 })
  })

  it('a stray copy of each string is not the fold — only its content in source order is', () => {
    // Lone literals of the atom catalogue recur in the correctly folded Worker through other
    // modules: 56% of a 64-literal sample (2026-09-11). Scattered and reordered, they are not the leaf.
    const scattered = entries.flat().reverse().map((s) => `${JSON.stringify(s)};/*${' '.repeat(1000)}*/`).join('')
    const root = repo(`export default{fetch(){}};${scattered}`)
    expect(foldReadings(root, undefined, [fixture])[0]?.share).toBeLessThan(LEAK_SHARE)
    expect(() => assertNoFoldLeaks(root, undefined, [fixture])).not.toThrow()
  })

  it('refuses a target too plain to fingerprint — unverifiable is not held', () => {
    const root = repo(inlined, "export const FIXTURE = ['one literal long enough to count, alone']\n")
    expect(() => assertNoFoldLeaks(root, undefined, [fixture])).toThrow(/unfingerprinted: src\/fixture\/generated\.ts/)
  })

  it('refuses to read a bundle that is not there', () => {
    expect(() => assertNoFoldLeaks(tmp(), undefined, [fixture])).toThrow(/no server bundle/)
  })

  it.runIf(existsSync(join(process.cwd(), PACKED_WORKER_DIR, 'worker.js')))(
    'the Worker packed on this machine carries none of the server folds',
    () => {
      const readings = assertNoFoldLeaks()
      expect(readings.map((r) => r.target)).toEqual(PRODUCTION_FOLDS.filter((f) => f.side === 'both').map((f) => f.target))
      expect(readings.every((r) => r.share < LEAK_SHARE)).toBe(true)
    },
    60_000,
  )
})
