import { describe, it, expect } from 'vitest'
import { fires } from '@/body/nerve'
import { fires as canonical } from '@/nerve'

describe('body/nerve — IS @/nerve', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(fires()).toBe(canonical())
  })
})
