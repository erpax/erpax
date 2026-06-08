import { describe, it, expect } from 'vitest'
import { isCourier } from '@/body/blood'
import { isCourier as canonical } from '@/blood'

describe('body/blood — IS @/blood', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(isCourier()).toBe(canonical())
  })
})
