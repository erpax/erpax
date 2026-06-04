import { describe, it, expect } from 'vitest'
import { checkSeparationOfPowers } from '@/separation'

describe('separation of powers — tyranny foreclosed by the SAME law that catches fraud', () => {
  it('three distinct branch-holders: powers are separated', () => {
    expect(checkSeparationOfPowers({ legislative: 'parliament', executive: 'government', judicial: 'courts' }).separated).toBe(true)
  })

  it('one actor holding two branches is a concentration — caught like self-dealing', () => {
    const r = checkSeparationOfPowers({ legislative: 'ruler', executive: 'ruler', judicial: 'courts' })
    expect(r.separated).toBe(false)
    expect(r.concentrations).toContainEqual(['legislative', 'executive'])
  })

  it('one actor seizing all three branches trips every pair (full tyranny)', () => {
    const r = checkSeparationOfPowers({ legislative: 'ruler', executive: 'ruler', judicial: 'ruler' })
    expect(r.separated).toBe(false)
    expect(r.concentrations).toHaveLength(3)
  })
})
