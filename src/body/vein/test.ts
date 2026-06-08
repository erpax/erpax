import { describe, it, expect } from 'vitest'
import { returns } from '@/body/vein'
import { returns as canonical } from '@/vein'

describe('body/vein — IS @/vein', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(returns()).toBe(canonical())
  })
})
