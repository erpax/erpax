import { describe, it, expect } from 'vitest'
import { wallet, credit, debit } from '@/wallet'

describe('wallet — holds value (pure)', () => {
  it('opens with an owner + balance', () => {
    expect(wallet('alice', 50)).toEqual({ owner: 'alice', balance: 50 })
    expect(wallet('bob').balance).toBe(0)
  })
  it('credit/debit return a new wallet with the adjusted balance', () => {
    const w = wallet('alice', 100)
    expect(credit(w, 30).balance).toBe(130)
    expect(debit(w, 30).balance).toBe(70)
    expect(w.balance).toBe(100) // immutable
  })
})
