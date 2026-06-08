import { describe, it, expect } from 'vitest'
import { breathes } from '@/body/lung'
import { breathes as canonical } from '@/lung'

describe('body/lung — IS @/lung', () => {
  it('re-exports the canonical organ verbatim', () => {
    expect(breathes()).toBe(canonical())
  })
})
