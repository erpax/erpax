import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('admin/ui/fields — the canonical entry point', () => {
  it('offers every member the folder holds, so no caller reaches past the barrel', () => {
    expect(Object.hasOwn(barrel, 'EntanglementField')).toBe(true)
    expect(Object.hasOwn(barrel, 'EntanglementWarningField')).toBe(true)
    expect(Object.hasOwn(barrel, 'ErpaxMetaField')).toBe(true)
    expect(Object.hasOwn(barrel, 'MatrixBondField')).toBe(true)
    expect(Object.hasOwn(barrel, 'MedicalModalityPickerField')).toBe(true)
  })

  it('offers exactly what it names — a barrel that grew a member silently is a face nobody reviewed', () => {
    expect(Object.keys(barrel).sort()).toEqual(['EntanglementField', 'EntanglementWarningField', 'ErpaxMetaField', 'MatrixBondField', 'MedicalModalityPickerField'])
  })
})
