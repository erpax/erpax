import { describe, expect, it } from 'vitest'
import * as workflow from '@/receivable/workflow'

describe('receivable/workflow — the child atom, reachable through its own address', () => {
  it('offers matter through @/receivable/workflow, not only through the parent barrel', () => {
    const names = Object.keys(workflow)
    expect(names.length).toBeGreaterThan(0)
  })

  // The nesting must not change the face: the parent re-exports this child, so every name it
  // offered as a barrel sibling is still offered by @/receivable ([[rules]]/face — a refactor may
  // move anything except a name).
  it('every name it exports is still on the parent face', async () => {
    const parent = await import('@/receivable')
    for (const n of Object.keys(workflow)) expect(n in parent).toBe(true)
  })
})
