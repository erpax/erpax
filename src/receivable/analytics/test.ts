import { describe, expect, it } from 'vitest'
import * as analytics from '@/receivable/analytics'

describe('receivable/analytics — the child atom, reachable through its own address', () => {
  it('offers matter through @/receivable/analytics, not only through the parent barrel', () => {
    const names = Object.keys(analytics)
    expect(names.length).toBeGreaterThan(0)
  })

  // The nesting must not change the face: the parent re-exports this child, so every name it
  // offered as a barrel sibling is still offered by @/receivable ([[rules]]/face — a refactor may
  // move anything except a name).
  it('every name it exports is still on the parent face', async () => {
    const parent = await import('@/receivable')
    for (const n of Object.keys(analytics)) expect(n in parent).toBe(true)
  })
})
