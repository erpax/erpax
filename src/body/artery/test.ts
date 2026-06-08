import { describe, it, expect } from 'vitest'
import { isWindkessel } from '@/body/artery'
import { isWindkessel as canonical } from '@/artery'

describe('body/artery — IS @/artery', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(isWindkessel()).toBe(canonical())
  })
})
