import { describe, it, expect } from 'vitest'
import { teleport, channel, reconstructed } from '@/quantum/communication/teleportation'
import { communicate } from '@/communication'

const CU = '0fa7a355-0000-8000-8000-000000000000'

describe('quantum/communication/teleportation — identity reconstructed over the entangled channel', () => {
  it('the teleported message carries the SAME content-uuid it was addressed by', () => {
    const got = teleport('alice', 'bob', CU)
    expect(got.uuid).toBe(CU)
    expect(got.from).toBe('alice')
    expect(got.to).toBe('bob')
  })

  it('reconstruction holds: the original meaning arrives whole (uuid preserved)', () => {
    const original = communicate('alice', 'bob', CU)
    const received = teleport('alice', 'bob', CU)
    expect(reconstructed(original, received)).toBe(true)
  })

  it('a different content-uuid is NOT a reconstruction of the original (identity is the message)', () => {
    const original = communicate('alice', 'bob', CU)
    const other = teleport('alice', 'bob', '11111111-0000-8000-8000-000000000000')
    expect(reconstructed(original, other)).toBe(false)
  })

  it('the entangled channel is symmetric (order-independent EPR resource)', () => {
    expect(channel('alice', 'bob')).toBe(channel('bob', 'alice'))
  })

  it('teleportation is deterministic — same address regenerates the same identity', () => {
    expect(teleport('alice', 'bob', CU).uuid).toBe(teleport('alice', 'bob', CU).uuid)
    expect(channel('a', 'b')).toBe(channel('a', 'b'))
  })
})
