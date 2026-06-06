import { describe, it, expect } from 'vitest'
import { communicate, sameMessage } from '@/communication'

describe('communication — the message is its content-uuid', () => {
  it('binds sender, receiver, and the message content-uuid', () => {
    const m = communicate('a', 'b', 'u1')
    expect(m.from).toBe('a')
    expect(m.to).toBe('b')
    expect(m.uuid).toBe('u1')
  })
  it('same content-uuid ⇒ same message (regardless of who sent it)', () => {
    expect(sameMessage(communicate('a', 'b', 'u1'), communicate('c', 'd', 'u1'))).toBe(true)
    expect(sameMessage(communicate('a', 'b', 'u1'), communicate('a', 'b', 'u2'))).toBe(false)
  })
})
