import { describe, it, expect } from 'vitest'
import { key, sameContent } from '@/db'

describe('db — the content-addressed store (the stack\'s outside-∞ end)', () => {
  it('the key IS the content uuid — content-addressed, deterministic', () => {
    const k = key('hello')
    expect(k).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(key('hello')).toBe(k)
  })
  it('the store dedups — same content one key, different content different key', () => {
    expect(sameContent('a', 'a')).toBe(true)
    expect(sameContent('a', 'b')).toBe(false)
  })
})
