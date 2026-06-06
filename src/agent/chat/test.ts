import { describe, it, expect } from 'vitest'
import { say, participants } from '@/agent/chat'

describe('agent/chat — agents converse via content-uuid messages', () => {
  it('say appends a message; participants are the distinct agents', () => {
    const c = say(say([], 'a', 'b', 'u1'), 'b', 'a', 'u2')
    expect(c).toHaveLength(2)
    expect(c[0].uuid).toBe('u1')
    expect(participants(c).sort()).toEqual(['a', 'b'])
  })
})
