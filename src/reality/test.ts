import { describe, it, expect } from 'vitest'
import { realityRoot, isReal } from '@/reality'

describe('reality — the live deployed state', () => {
  it('realityRoot is the live matrix root (a uuid)', () => {
    expect(realityRoot()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('isReal matches only the live root', () => {
    expect(isReal(realityRoot())).toBe(true)
    expect(isReal('00000000-0000-8000-8000-000000000000')).toBe(false)
  })
})
