import { describe, it, expect } from 'vitest'
import { isDoubleTorusPump } from '@/body/heart'
import { isDoubleTorusPump as canonical } from '@/heart'

describe('body/heart — IS @/heart', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(isDoubleTorusPump()).toBe(canonical())
  })
})
