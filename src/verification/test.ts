import { describe, it, expect } from 'vitest'
import { token, verify, needsReverification } from '@/verification'

// Content-addressed verification: the token IS the content-uuid, so a verified claim
// self-invalidates the instant the content changes (re-verification by architecture).
describe('verification — content-addressed proof, self-invalidating on change', () => {
  it('token is the content-uuid — deterministic for the same content', () => {
    expect(token('hello world')).toBe(token('hello world'))
    expect(token('hello world')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('verify holds while the content is unchanged', () => {
    const t = token('the object')
    expect(verify(t, 'the object')).toBe(true)
    expect(needsReverification(t, 'the object')).toBe(false)
  })
  it('any change to the content requires re-verification (by architecture)', () => {
    const t = token('the object')
    expect(verify(t, 'the object (v2)')).toBe(false)
    expect(needsReverification(t, 'the object (v2)')).toBe(true)
  })
})
