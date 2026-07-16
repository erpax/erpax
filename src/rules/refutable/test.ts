import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { claimSurface, assertClaimsRefutable } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-refutable-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rules/refutable — a claim nothing can refute is where a lie lives', () => {
  it('flags an @invariant with no proof beside it — unfalsifiable, so it reads as true forever', () => {
    const cwd = corpus({
      'src/ledger/index.ts': '/** @invariant debits.sum() === credits.sum() */\nexport const post = () => 1',
    })
    const r = claimSurface(cwd)
    expect(r.claims).toBe(1)
    expect(r.unrefutable.map((u) => u.claim)).toEqual(['debits.sum() === credits.sum()'])
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a claim with a test beside it is refutable — reality can say no', () => {
    const cwd = corpus({
      'src/ledger/index.ts': '/** @invariant debits.sum() === credits.sum() */\nexport const post = () => 1',
      'src/ledger/test.ts': 'it("balances", () => {})',
    })
    const r = claimSurface(cwd)
    expect(r.refutable).toBe(1)
    expect(r.unrefutable).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('counts every claim in a file, not just the first', () => {
    const cwd = corpus({
      'src/ledger/index.ts':
        '/**\n * @invariant debits === credits\n * @invariant polarity matches account type\n */\nexport const x = 1',
    })
    expect(claimSurface(cwd).claims).toBe(2)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an atom asserting nothing is not judged — silence is not a lie', () => {
    const cwd = corpus({ 'src/quiet/index.ts': 'export const x = 1', 'src/quiet/SKILL.md': '# quiet' })
    const r = claimSurface(cwd)
    expect(r.claims).toBe(0)
    expect(r.unrefutable).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the test file itself is not scanned — a fixture may quote a claim as data', () => {
    const cwd = corpus({
      'src/ledger/index.ts': 'export const x = 1',
      'src/ledger/test.ts': 'const fixture = "@invariant this is a string, not a claim"',
    })
    expect(claimSurface(cwd).claims).toBe(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const cwd = corpus({ 'src/a/index.ts': '/** @invariant x > 0 */\nexport const x = 1' })
    expect(() => assertClaimsRefutable(cwd, 1)).not.toThrow()
    expect(() => assertClaimsRefutable(cwd, 0)).toThrow(/nothing can refute/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
