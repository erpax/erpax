import { describe, it, expect } from 'vitest'
import { agentOf, balanced } from '@/ui/agent'

describe('ui/agent — the other side of agent/ui (karmic balance)', () => {
  it('agentOf recovers the atom from its UI route (the inverse of the render)', () => {
    expect(agentOf('/trinity/SKILL')).toBe('trinity')
    expect(agentOf('trinity/SKILL')).toBe('trinity')
    expect(agentOf('/__not_an_atom__/SKILL')).toBeUndefined()
    expect(agentOf('not-a-route')).toBeUndefined()
  })
  it('the path is balanced — render then recover returns to the same atom (the double-entry closes)', () => {
    expect(balanced('trinity')).toBe(true)
    expect(balanced('pixel')).toBe(true)
    expect(balanced('merge')).toBe(true)
  })
  it('a non-atom does not balance (nothing to recover)', () => {
    expect(balanced('__not_an_atom__')).toBe(false)
  })
})
