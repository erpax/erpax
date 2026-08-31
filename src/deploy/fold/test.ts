import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import {
  PACKED_WORKER_DIR,
  PRODUCTION_FOLDS,
  WORKER_LIMIT_BYTES,
  assertFoldsHold,
  assertWorkerFitsBudget,
  foldWeight,
  staleFolds,
  workerBudget,
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

  it('reports nothing when nothing is packed — a missing artifact is not a green one', () => {
    const b = workerBudget(tmp())
    expect(b.packed).toBe(false)
    expect(b.gzip).toBe(0)
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

  it('the packed directory is where the budget looks — not a second spelling of it', () => {
    // PACKED_WORKER_DIR is the ONE spelling: the budget reads it and the CLI prints the command
    // around it. A second exported const holding the same command was seal-debt saying nothing new.
    expect(PACKED_WORKER_DIR).toBe('.open-next/packed')
    expect(workerBudget(tmp(), PACKED_WORKER_DIR).packed).toBe(false)
  })
})
