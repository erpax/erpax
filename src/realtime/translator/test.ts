import { describe, it, expect } from 'vitest'
import { interlinguaTail, sameMeaningTail } from '@/realtime/translator'

describe('realtime/translator — translate the live tail as it arrives', () => {
  it('reduces each tail message to a stable meaning-uuid', () => {
    const tail = interlinguaTail(['hello', 'world'], 0)
    expect(tail).toHaveLength(2)
    // deterministic: same text → same meaning-uuid
    expect(interlinguaTail(['hello'], 0)[0]).toBe(tail[0])
  })
  it('a tail carries the same meanings as itself', () => {
    expect(sameMeaningTail(['a', 'b'], ['a', 'b'])).toBe(true)
  })
  it('different-length or different-meaning tails are not the same', () => {
    expect(sameMeaningTail(['a'], ['a', 'b'])).toBe(false)
    expect(sameMeaningTail(['a'], ['zzz'])).toBe(false)
  })
})
