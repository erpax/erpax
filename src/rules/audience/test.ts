import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { claimsFacing, facing, assertNothingUnprovenFacing, ROLE_CONCERN } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-audience-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('audience — a claim is addressed to someone', () => {
  // The cash flow statement, reconstructed: a claim to the person who signs, and nothing to refute it.
  it('an unproven claim on a SOX §302 file faces the DIRECTOR — who personally certifies it', () => {
    const cwd = corpus({
      'src/report/index.ts': '/**\n * @compliance SOX §302 disclosure-controls\n * @invariant the statement balances\n */\nexport const r = 1',
    })
    const cs = facing('director', cwd)
    expect(cs).toHaveLength(1)
    expect(cs[0]).toMatchObject({ role: 'director', kind: 'unrefutable' })
    rmSync(cwd, { recursive: true, force: true })
  })

  it("a proof beside it silences the claim — that is the whole remedy", () => {
    const cwd = corpus({
      'src/report/index.ts': '/**\n * @compliance SOX §302\n * @invariant the statement balances\n */\nexport const r = 1',
      'src/report/test.ts': 'it("balances", () => {})',
    })
    expect(facing('director', cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  // The marker class that surfaced the fabricated cash flow: the code says it is not real, in a file
  // addressed to someone who signs. A stub is reported even where a proof exists — a test does not make
  // `investingCashFlow = -100000` true.
  it('a CONFESSED stub facing a signer is reported', () => {
    const cwd = corpus({
      'src/cf/index.ts': '/**\n * @compliance SOX §302\n */\n// Placeholder: asset purchases\nexport const cf = -100000',
    })
    const cs = facing('director', cwd)
    expect(cs.some((c) => c.kind === 'stub')).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('one file can face SEVERAL readers at once — that is the point', () => {
    const cwd = corpus({
      'src/x/index.ts': '/**\n * @standard SOX §404\n * @standard ISO-19011:2018 audit-trail\n * @invariant it holds\n */\nexport const x = 1',
    })
    const roles = new Set(claimsFacing(cwd).map((c) => c.role))
    expect(roles.has('director')).toBe(true) // §404
    expect(roles.has('auditor')).toBe(true) // ISO-19011
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a file addressing nobody is not judged — silence is not a lie', () => {
    const cwd = corpus({ 'src/q/index.ts': '/**\n * @invariant x > 0\n */\nexport const q = 1' })
    expect(claimsFacing(cwd)).toHaveLength(0) // an unproven claim, but addressed to no reader
    rmSync(cwd, { recursive: true, force: true })
  })

  // A standard's name inside a STRING is data, not an address — the lie rules/reference and standards/emit
  // each paid for. syntax settles what a comment is, so this cannot inherit it.
  it('a standard named in a STRING does not address anyone', () => {
    const cwd = corpus({
      'src/s/index.ts': `export const msg = 'this mentions SOX §302 and Наредба in a string'\n/** @invariant x */\nexport const x = 1`,
    })
    expect(claimsFacing(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the role→concern map is DECLARED — the only hand-written thing here, and it is in the open', () => {
    expect(Object.keys(ROLE_CONCERN)).toContain('director')
    expect(ROLE_CONCERN['director']).toContain('SOX §302') // §302 IS the director's signature
    expect(ROLE_CONCERN['compliance-officer']).toContain('Наредба')
  })

  it('the gate ratchets per reader — fails only on getting worse', () => {
    const cwd = corpus({
      'src/r/index.ts': '/**\n * @compliance SOX §302\n * @invariant it holds\n */\nexport const r = 1',
    })
    expect(() => assertNothingUnprovenFacing('director', cwd, 1)).not.toThrow()
    expect(() => assertNothingUnprovenFacing('director', cwd, 0)).toThrow(/face the director/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
