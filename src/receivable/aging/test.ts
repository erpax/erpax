import { describe, expect, it } from 'vitest'
import * as aging from '@/receivable/aging'

describe('receivable/aging — the child atom, reachable through its own address', () => {
  it('offers matter through @/receivable/aging, not only through the parent barrel', () => {
    const names = Object.keys(aging)
    expect(names.length).toBeGreaterThan(0)
  })

  // The nesting must not change the face: the parent re-exports this child, so every name it
  // offered as a barrel sibling is still offered by @/receivable ([[rules]]/face — a refactor may
  // move anything except a name).
  it('every name it exports is still on the parent face', async () => {
    const parent = await import('@/receivable')
    for (const n of Object.keys(aging)) expect(n in parent).toBe(true)
  })
})
