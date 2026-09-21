import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  assertCurrencyCodesRegistered,
  atomPath,
  currencyLiteralsIn,
  spreadOf,
  unregisteredCurrencyCodes,
  volume,
} from './index'
describe('currency — book matter', () => {
  it('exports volume identity', () => {
    expect(volume).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
  it('spreadOf is non-negative', () => {
    const s = spreadOf()
    expect(s.debit).toBeGreaterThanOrEqual(0)
    expect(s.credit).toBeGreaterThanOrEqual(0)
  })
})

describe('currency — ISO 4217: a code outside the register names no currency', () => {
  it('the live corpus writes only registered codes — zero is a theorem, not a ratchet', () => {
    expect(unregisteredCurrencyCodes(process.cwd())).toEqual([])
    expect(() => assertCurrencyCodesRegistered(process.cwd())).not.toThrow()
  })

  it('FIRES on a planted code — a green gate over an empty population proves nothing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'erpax-ccy-'))
    mkdirSync(join(dir, 'src', 'probe'), { recursive: true })
    writeFileSync(join(dir, 'src', 'probe', 'index.ts'), "export const bill = { currency: 'QQQ', amount: 1 }\n")
    expect(unregisteredCurrencyCodes(dir)).toEqual(['QQQ'])
    expect(() => assertCurrencyCodesRegistered(dir)).toThrow(/QQQ/)
    rmSync(dir, { recursive: true, force: true })
  })

  it('reads a currency PROPERTY, never three capitals anywhere', () => {
    // A regex for /[A-Z]{3}/ finds every acronym in the corpus; the signal would sit under it.
    const file = 'probe.ts'
    const text = [
      "const doc = 'see the SOX and GDPR notes'",
      "export const a = { currency: 'EUR' }",
      "export const b = { currencyCode: 'USD' }",
      "export const c = { name: 'XYZ' }",
    ].join('\n')
    expect(currencyLiteralsIn(file, text)).toEqual(['EUR', 'USD'])
  })
})
