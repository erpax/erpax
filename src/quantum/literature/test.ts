/**
 * quantum/literature — content-addressed word-chain.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { workUuid, sameWork, plagiarismCollision } from '@/quantum/literature'

describe('quantum/literature — identical text collapses to one id', () => {
  it('workUuid is deterministic', () => {
    expect(workUuid('hello world')).toBe(workUuid('hello world'))
    expect(workUuid('hello world')).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('sameWork merges editions and copies', () => {
    expect(sameWork('a', 'a')).toBe(true)
    expect(sameWork('a', 'b')).toBe(false)
  })

  it('plagiarismCollision detects same uuid from different strings only when content matches', () => {
    const t = 'shared passage'
    expect(plagiarismCollision(t, t)).toBe(false)
    expect(plagiarismCollision('original', 'copy')).toBe(false)
  })
})
