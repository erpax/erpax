import { describe, expect, it } from 'vitest'

import { priceTokens, tokenEntry, tokenLedger, type TokenSpend } from '@/accounting/token-ledger'

describe('token-ledger — every inter-agent token spend is a balanced entry (the ledger closes)', () => {
  it('prices tokens at the harmonic anchor (value = anchor × tokens, cents)', () => {
    expect(priceTokens(1000, 1)).toBe(1000)
    expect(priceTokens(1000, 7.83)).toBe(7830)
    expect(priceTokens(-5, 7.83)).toBe(0) // negative guarded — every case defined
  })

  it('one spend books a balanced double-entry (debit = credit = priced)', () => {
    const e = tokenEntry({ agent: 'agent:a', tokens: 1000 }, 1)
    expect(e.balanced).toBe(true)
    expect(e.totalDebits).toBe(1000)
    expect(e.totalCredits).toBe(1000)
    expect(e.variance).toBe(0)
  })

  it('the complete ledger conserves — Σ debit = Σ credit = Σ priced tokens', () => {
    const spends: TokenSpend[] = [
      { agent: 'a', tokens: 1000 },
      { agent: 'b', tokens: 500, kind: 'verify' },
      { agent: 'c', tokens: 250 },
    ]
    const led = tokenLedger(spends, 1)
    expect(led.totalTokens).toBe(1750)
    expect(led.totalValueCents).toBe(1750) // anchor 1 ⇒ cents == tokens
    expect(led.balanced).toBe(true)
    const sumD = led.entries.reduce((s, e) => s + e.totalDebits, 0)
    const sumC = led.entries.reduce((s, e) => s + e.totalCredits, 0)
    expect(sumD).toBe(sumC) // no unaccounted token
  })

  it('empty ledger is balanced (0 = 0 — the closed empty case)', () => {
    const led = tokenLedger([], 7.83)
    expect(led.balanced).toBe(true)
    expect(led.totalTokens).toBe(0)
    expect(led.totalValueCents).toBe(0)
  })

  it('scales the value by the anchor while conserving balance', () => {
    const led = tokenLedger([{ agent: 'a', tokens: 1000 }], 7.83)
    expect(led.totalValueCents).toBe(7830)
    expect(led.balanced).toBe(true)
  })
})
