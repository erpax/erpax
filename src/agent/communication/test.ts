import { describe, it, expect } from 'vitest'
import { send, relay, sameMessage } from '@/agent/communication'

describe('agent/communication — agent-to-agent transfer (content preserved)', () => {
  it('send binds from/to/uuid', () => {
    const m = send('a', 'b', 'u1')
    expect(m).toEqual({ from: 'a', to: 'b', uuid: 'u1' })
  })
  it('relay preserves the content-uuid (no-cloning), re-routing the recipient', () => {
    const m = send('a', 'b', 'u1')
    const r = relay(m, 'c')
    expect(sameMessage(m, r)).toBe(true)
    expect(r.to).toBe('c')
  })
})
