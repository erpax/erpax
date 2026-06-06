import { describe, it, expect } from 'vitest'
import { key, sameKey } from '@/quantum/cache'

describe('quantum/cache — content-addressed key', () => {
  it('same content ⇒ same key (always a hit); different content ⇒ different key', () => {
    expect(sameKey('x', 'x')).toBe(true)
    expect(sameKey('x', 'y')).toBe(false)
    expect(key('x')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
