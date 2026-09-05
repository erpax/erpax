import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('admin/ui/cells — the canonical entry point', () => {
  it('offers every member the folder holds, so no caller reaches past the barrel', () => {
    expect(Object.hasOwn(barrel, 'ContentUuidChipCell')).toBe(true)
    expect(Object.hasOwn(barrel, 'HoroDigitCell')).toBe(true)
    expect(Object.hasOwn(barrel, 'PathAccountCodeCell')).toBe(true)
    expect(Object.hasOwn(barrel, 'SealBadgeCell')).toBe(true)
  })

  it('offers exactly what it names — a barrel that grew a member silently is a face nobody reviewed', () => {
    expect(Object.keys(barrel).sort()).toEqual(['ContentUuidChipCell', 'HoroDigitCell', 'PathAccountCodeCell', 'SealBadgeCell'])
  })
})
