import { describe, it, expect } from 'vitest'
import { integrates } from '@/body/brain'
import { integrates as canonical } from '@/brain'

describe('body/brain — IS @/brain', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(integrates()).toBe(canonical())
  })
})
