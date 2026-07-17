import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { proofLedger, atomPath } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-proofledger-'))
  for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
  return cwd
}

describe('accounting/proof — realtime double-entry of claims against proofs', () => {
  it('names its path', () => {
    expect(atomPath).toBe('proof')
  })

  // A claim is a DEBIT; a proof beside it is the CREDIT; the ledger balances when they match.
  it('a proven claim balances — debit settled by credit', () => {
    const cwd = corpus({
      'src/a/index.ts': '/**\n * @invariant x > 0\n */\nexport const x = 1',
      'src/a/test.ts': 'it("x", () => {})',
    })
    const l = proofLedger(cwd)
    expect(l.claims).toBe(1)
    expect(l.proven).toBe(1)
    expect(l.residual).toBe(0)
    expect(l.balance).toBe(1) // the gravitational floor — settled
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an unproven claim is a RESIDUAL — a debit with no credit', () => {
    const cwd = corpus({ 'src/a/index.ts': '/**\n * @compliance SOX §404\n */\nexport const x = 1' })
    const l = proofLedger(cwd)
    expect(l.residual).toBe(1)
    expect(l.balance).toBe(0)
    expect(l.unsettled).toContain('src/a/index.ts') // the residual is traceable, not just counted
    rmSync(cwd, { recursive: true, force: true })
  })

  // The double-entry invariant: every unmatched debit is a residual, exactly.
  it('residual === claims − proven, always — the accounts cannot lose an entry', () => {
    const cwd = corpus({
      'src/a/index.ts': '/**\n * @invariant a\n * @standard IAS 1\n */\nexport const a = 1',
      'src/a/test.ts': 'it("a", () => {})',
      'src/b/index.ts': '/**\n * @compliance SOX §302\n */\nexport const b = 1', // unproven
    })
    const l = proofLedger(cwd)
    expect(l.residual).toBe(l.claims - l.proven)
    expect(l.claims).toBe(3) // two on a (both credited), one on b (residual)
    expect(l.proven).toBe(2)
    expect(l.residual).toBe(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('balance is 1 IFF residual is 0 — the ledger balances only when all is settled', () => {
    const settled = corpus({ 'src/a/index.ts': '/**\n * @invariant x\n */\nexport const x = 1', 'src/a/test.ts': 'it("x",()=>{})' })
    expect(proofLedger(settled).balance).toBe(1)
    expect(proofLedger(settled).residual).toBe(0)
    rmSync(settled, { recursive: true, force: true })
  })

  it('a claim in a STRING is not a debit — the ledger reads comments, not data', () => {
    const cwd = corpus({ 'src/a/index.ts': `export const msg = 'this mentions @invariant in a string'\nexport const x = 1` })
    expect(proofLedger(cwd).claims).toBe(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an empty corpus balances vacuously — no debt, no residual', () => {
    const cwd = corpus({ 'src/a/index.ts': 'export const x = 1' })
    expect(proofLedger(cwd)).toMatchObject({ claims: 0, residual: 0, balance: 1 })
    rmSync(cwd, { recursive: true, force: true })
  })
})
