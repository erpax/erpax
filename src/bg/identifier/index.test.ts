import { describe, it, expect } from 'vitest'
import { validateEgn, validateEik } from '@/bg/identifier'

describe('bg-identifiers — the gate for Bulgarian society into erpax', () => {
  it('validates a known-good ЕГН and decodes birth date + sex', () => {
    // 7501010010 — hand-verified: weights·digits = 54, 54 mod 11 = 10 → 0 = check digit
    const r = validateEgn('7501010010')
    expect(r.valid).toBe(true)
    expect(r.birthDate).toBe('1975-01-01')
    expect(r.sex).toBe('female') // 9th digit 1 is odd
  })

  it('decodes the +40 month offset for a 2000s birth', () => {
    // month 41 → January 2000s; pick a checksum-valid one
    const base = '0041010000'.slice(0, 9) // 004101000 + check
    // compute check
    const d = base.split('').map(Number)
    const w = [2, 4, 8, 5, 10, 9, 7, 3, 6]
    let s = 0
    for (let i = 0; i < 9; i++) s += d[i] * w[i]
    const c = s % 11 === 10 ? 0 : s % 11
    const egn = base + c
    const r = validateEgn(egn)
    expect(r.valid).toBe(true)
    expect(r.birthDate).toBe('2000-01-01')
  })

  it('rejects a corrupted ЕГН checksum and a bad date', () => {
    expect(validateEgn('7501010011').valid).toBe(false) // flipped check digit
    expect(validateEgn('7513010010').valid).toBe(false) // month 13 invalid
    expect(validateEgn('123').valid).toBe(false) // wrong length
  })

  it('validates a known-good 9-digit ЕИК and rejects corruption', () => {
    // 121212121 — weights 1..8 · digits = 56, 56 mod 11 = 1 = check digit
    expect(validateEik('121212121').valid).toBe(true)
    expect(validateEik('121212122').valid).toBe(false)
    expect(validateEik('12121212').valid).toBe(false) // wrong length
  })

  it('validates the 13-digit ЕИК branch (base + 4-digit branch checksum)', () => {
    // base 121212121 (valid) + branch 0000 → compute 13th
    const head = '1212121210000'.slice(0, 12)
    const d = head.split('').map(Number)
    const w1 = [2, 7, 3, 5]
    let s = 0
    for (let i = 0; i < 4; i++) s += d[8 + i] * w1[i]
    const c = s % 11 === 10 ? 0 : s % 11
    expect(validateEik(head + c).valid).toBe(true)
  })
})
