import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import {
  suiteClosureHash,
  sealSuiteReceipt,
  suiteReceiptFresh,
  planSuites,
  corpusScanFold,
  sealedScan,
  sealScan,
} from '@/gate/receipt'

const tmp = mkdtempSync(join(tmpdir(), 'receipt-'))
afterAll(() => rmSync(tmp, { recursive: true, force: true }))

const seed = (): void => {
  mkdirSync(join(tmp, 'src', 'a'), { recursive: true })
  writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 1\n')
  writeFileSync(join(tmp, 'src', 'a', 'test.ts'), "import { a } from './index'\nexport const t = a\n")
}
seed()

describe('gate/receipt — same content ⇒ same verdict; only changed suites re-run', () => {
  it('the closure hash is deterministic and moves when ANY closure member moves', () => {
    const h1 = suiteClosureHash('src/a/test.ts', tmp)
    expect(suiteClosureHash('src/a/test.ts', tmp)).toBe(h1)
    writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 2\n')
    const h2 = suiteClosureHash('src/a/test.ts', tmp)
    expect(h2).not.toBe(h1) // the DEPENDENCY moved — the suite file itself did not
  })

  it('a sealed green receipt covers the suite while the hash stands, and expires when it moves', () => {
    const h = suiteClosureHash('src/a/test.ts', tmp)
    expect(suiteReceiptFresh('src/a/test.ts', h, tmp)).toBe(false)
    sealSuiteReceipt('src/a/test.ts', h, tmp)
    expect(suiteReceiptFresh('src/a/test.ts', h, tmp)).toBe(true)
    writeFileSync(join(tmp, 'src', 'a', 'index.ts'), 'export const a = 3\n')
    expect(suiteReceiptFresh('src/a/test.ts', suiteClosureHash('src/a/test.ts', tmp), tmp)).toBe(false)
  })

  it('planSuites splits the roster — covered receipts are cited, changed suites re-run', () => {
    const h = suiteClosureHash('src/a/test.ts', tmp)
    sealSuiteReceipt('src/a/test.ts', h, tmp)
    const plan = planSuites(['src/a/test.ts'], tmp)
    expect(plan.covered).toEqual(['src/a/test.ts'])
    expect(plan.changed).toEqual([])
  })
})

describe('scan receipt — the corpus answers from its address', () => {
  const fixture = (): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-scan-fold-'))
    mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 1\n')
    writeFileSync(join(cwd, 'src', 'atom', 'SKILL.md'), '# atom\n')
    return cwd
  }

  it('same content folds to the same address, and a changed byte does not', () => {
    const cwd = fixture()
    try {
      const before = corpusScanFold(cwd)
      expect(corpusScanFold(cwd)).toBe(before)
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 2\n')
      expect(corpusScanFold(cwd)).not.toBe(before)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('MOVING a file moves the fold — the path is bound, not just the bytes', () => {
    const cwd = fixture()
    try {
      const before = corpusScanFold(cwd)
      renameSync(join(cwd, 'src', 'atom', 'index.ts'), join(cwd, 'src', 'atom', 'moved.ts'))
      // Byte-identical content at a different path. A fold over bytes alone would
      // call this unchanged — and this corpus's most common edit is exactly a move.
      expect(corpusScanFold(cwd)).not.toBe(before)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('a sealed verdict is cited at its fold and REFUSED at any other', () => {
    const cwd = fixture()
    try {
      const fold = corpusScanFold(cwd)
      expect(sealedScan<number>('axis', fold, cwd)).toBeNull()
      sealScan('axis', fold, 7, cwd)
      expect(sealedScan<number>('axis', fold, cwd)).toBe(7)
      // The receipt is addressed, not remembered: at a different fold it is gone,
      // never merely old. A stale answer is the one thing a gate may not give.
      expect(sealedScan<number>('axis', 'ffffffffffffffff', cwd)).toBeNull()
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const A = 3\n')
      expect(sealedScan<number>('axis', corpusScanFold(cwd), cwd)).toBeNull()
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
