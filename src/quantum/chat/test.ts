import { describe, it, expect } from 'vitest'
import { threadUuid, appended } from '@/quantum/chat'

// message-uuids ARE content-uuids (hex uuid format), as merge requires.
const U1 = '11111111-1111-8111-8111-111111111111'
const U2 = '22222222-2222-8222-8222-222222222222'
const U3 = '33333333-3333-8333-8333-333333333333'

describe('quantum/chat — the thread is a merkle chain of message-uuids', () => {
  it('threadUuid is deterministic for the same message sequence', () => {
    expect(threadUuid([U1, U2, U3])).toBe(threadUuid([U1, U2, U3]))
    expect(threadUuid([])).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('order matters + appending changes the thread-uuid (tamper-evident history)', () => {
    expect(threadUuid([U1, U2])).not.toBe(threadUuid([U2, U1]))
    expect(appended([U1, U2], U3)).toBe(true)
  })
})
