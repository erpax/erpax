import { describe, it, expect } from 'vitest'
import { protects } from '@/body/skin'
import { protects as canonical } from '@/skin'

describe('body/skin — IS @/skin', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(protects()).toBe(canonical())
  })
})
