import { describe, it, expect } from 'vitest'
import { componentPixel } from '@/computer/component'
import { componentPixel as canonical } from '@/component'

describe('computer/component — IS @/component', () => {
  it('re-exports the canonical verbatim', () => {
    expect(componentPixel).toBe(canonical)
  })
})
