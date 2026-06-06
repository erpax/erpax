import { describe, it, expect } from 'vitest'
import { architecturalDefault, isByArchitecture } from '@/default'
import { uuidOfName } from '@/name'

describe('default — nothing defines a default; the default is by architecture', () => {
  it('the architectural default is COMPUTED from the name, deterministically', () => {
    const d = architecturalDefault('collider')
    expect(d.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(architecturalDefault('collider').uuid).toBe(d.uuid)
    expect(d.digit).toBeGreaterThanOrEqual(1)
    expect(d.digit).toBeLessThanOrEqual(9)
  })
  it('a value is by architecture iff it was derived, not defaulted', () => {
    expect(isByArchitecture('x', uuidOfName('x'))).toBe(true)
    expect(isByArchitecture('x', 'a-defined-default')).toBe(false)
  })
})
