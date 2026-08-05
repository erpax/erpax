import { describe, it, expect } from 'vitest'
import { threadUuid, messageUuid } from './index'

describe('quantum/chat/merkle', () => {
  it('threadUuid is deterministic', () => {
    const msgs = ['a', 'b', 'c']
    const u1 = threadUuid(msgs)
    const u2 = threadUuid(msgs)
    expect(u1).toBe(u2)
  })
})
