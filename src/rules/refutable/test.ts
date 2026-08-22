import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { claimSurface, assertClaimsRefutable , hollowProofs, assertProofsForbidSomething} from './index'

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

describe('hollow proofs — a test that cannot fail', () => {
  it('flags a file whose every assertion is a tautology', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-hollow-'))
    mkdirSync(join(root, 'src', 'a'), { recursive: true })
    writeFileSync(join(root, 'src', 'a', 'test.ts'), "it('x', () => { expect(true).toBe(true) })")
    expect(hollowProofs(root).map((h) => h.file)).toEqual(['src/a/test.ts'])
    rmSync(root, { recursive: true, force: true })
  })

  it('one real assertion beside a tautology is NOT hollow — the proof still forbids something', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-hollow2-'))
    mkdirSync(join(root, 'src', 'b'), { recursive: true })
    writeFileSync(
      join(root, 'src', 'b', 'test.ts'),
      "it('x', () => { expect(true).toBe(true); expect(sum(1,1)).toBe(2) })",
    )
    expect(hollowProofs(root)).toEqual([])
    rmSync(root, { recursive: true, force: true })
  })

  it('the live corpus count is the ratchet, and it fails closed above it', () => {
    const live = hollowProofs().length
    expect(() => assertProofsForbidSomething(process.cwd(), live)).not.toThrow()
    expect(() => assertProofsForbidSomething(process.cwd(), live - 1)).toThrow(/hollow proof/)
  })
})
