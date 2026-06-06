import { describe, it, expect } from 'vitest'
import { intact, noCloningHolds } from '@/quantum/communication'
import { communicate } from '@/communication'

describe('quantum/communication — no-cloning + tamper-evidence', () => {
  it('a message is intact iff its content-uuid matches the original', () => {
    const o = communicate('a', 'b', 'u1')
    expect(intact(o, communicate('a', 'b', 'u1'))).toBe(true)
    expect(intact(o, communicate('a', 'b', 'u2'))).toBe(false)
  })
  it('no-cloning holds on the live matrix (every content-uuid is unique)', () => {
    expect(noCloningHolds()).toBe(true)
  })
})
