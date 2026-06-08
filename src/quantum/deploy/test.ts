/**
 * quantum/deploy — gate-green collapse order only.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { collapseOrder, mayCollapse } from '@/quantum/deploy'
import { harmonized } from '@/deploy'

describe('quantum/deploy — ordered collapse into reality', () => {
  it('collapseOrder is gate → migrate → build → push', () => {
    expect(collapseOrder()).toEqual(['gate', 'migrate', 'build', 'push'])
  })

  it('mayCollapse holds only for the harmonized band', () => {
    expect(mayCollapse(collapseOrder())).toBe(true)
    expect(mayCollapse(['build', 'gate', 'migrate', 'push'])).toBe(false)
    expect(mayCollapse(collapseOrder().slice(0, 2))).toBe(false)
    expect(mayCollapse(collapseOrder())).toBe(harmonized(collapseOrder()))
  })
})
