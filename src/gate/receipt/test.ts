import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import { suiteClosureHash, sealSuiteReceipt, suiteReceiptFresh, planSuites } from '@/gate/receipt'

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
