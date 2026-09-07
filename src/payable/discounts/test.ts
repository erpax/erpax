import { describe, expect, it } from 'vitest'
import * as discounts from '@/payable/discounts'

describe('payable/discounts — the child atom, reachable through its own address', () => {
  it('offers matter through @/payable/discounts, not only through the parent barrel', () => {
    const names = Object.keys(discounts)
    expect(names.length).toBeGreaterThan(0)
  })

  // The nesting must not change the face: the parent re-exports this child, so every name it
  // offered as a barrel sibling is still offered by @/payable ([[rules]]/face — a refactor may
  // move anything except a name).
  it('every name it exports is still on the parent face', async () => {
    const parent = await import('@/payable')
    for (const n of Object.keys(discounts)) expect(n in parent).toBe(true)
  })
})
