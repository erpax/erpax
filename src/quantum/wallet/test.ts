import { describe, it, expect } from 'vitest'
import { stateUuid, transfer, balanced } from '@/quantum/wallet'
import { wallet, credit } from '@/wallet'

describe('quantum/wallet — tamper-evident state + balanced transfer', () => {
  it('stateUuid changes when the balance changes (tamper-evident)', () => {
    const w = wallet('alice', 100)
    expect(stateUuid(w)).toBe(stateUuid(wallet('alice', 100)))
    expect(stateUuid(w)).not.toBe(stateUuid(credit(w, 1)))
  })
  it('a transfer is a balanced double-entry', () => {
    const e = transfer('alice', 'bob', 30)
    expect(balanced(e)).toBe(true)
  })
})
