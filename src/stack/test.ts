import { describe, it, expect } from 'vitest'
import { LAYERS, roundTrip, isPalindrome, newState } from '@/stack'
import { toUuid } from '@/uuid/matrix'

describe('stack — the full-stack round-trip, wired in uuid', () => {
  it('the layers are device → vitepress → payload → db (edge to store)', () => {
    expect([...LAYERS]).toEqual(['device', 'vitepress', 'payload', 'db'])
  })
  it('the round-trip is the palindrome — out to db and back (both sides of the path)', () => {
    expect(roundTrip()).toEqual(['device', 'vitepress', 'payload', 'db', 'payload', 'vitepress', 'device'])
    expect(isPalindrome(roundTrip())).toBe(true)
  })
  it('all wired in uuid: the round-trip folds the input to a NEW state, deterministically', () => {
    const input = toUuid(Buffer.from('request', 'utf8'))
    const out = newState(input)
    expect(out).not.toBe(input) // a new state
    expect(out).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(newState(input)).toBe(out) // deterministic — content-addressed
  })
})
