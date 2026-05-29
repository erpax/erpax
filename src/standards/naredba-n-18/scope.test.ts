/**
 * Fiscalization-scope tests — Наредба Н-18 чл. 3 ал. 1: cash/card/voucher are in
 * scope (must fiscalize); bank transfer / direct debit / PSP / postal money
 * transfer are lawfully exempt; unknown defaults to in-scope (no silent bypass).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §чл.3-ал.1
 * @see src/standards/naredba-n-18/scope.ts
 */

import { describe, it, expect } from 'vitest'
import { requiresFiscalization } from './scope'

describe('requiresFiscalization', () => {
  it('requires a касов бон for cash / card / voucher (in scope)', () => {
    expect(requiresFiscalization('cash')).toBe(true)
    expect(requiresFiscalization('card')).toBe(true)
    expect(requiresFiscalization('voucher')).toBe(true)
  })

  it('exempts non-cash settlement channels (чл. 3 ал. 1)', () => {
    expect(requiresFiscalization('bank_transfer')).toBe(false)
    expect(requiresFiscalization('direct_debit')).toBe(false)
    expect(requiresFiscalization('psp_transfer')).toBe(false)
    expect(requiresFiscalization('postal_money_transfer')).toBe(false)
  })

  it('treats a blank/unknown payment type as in-scope (no silent bypass)', () => {
    expect(requiresFiscalization()).toBe(true)
    expect(requiresFiscalization('')).toBe(true)
    expect(requiresFiscalization('crypto')).toBe(true)
  })
})
