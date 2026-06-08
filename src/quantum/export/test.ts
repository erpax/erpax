/**
 * quantum/export — computed export facet from live source.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { parseTsExports, exportBoundaryFlips } from '@/quantum/export'

describe('quantum/export — algorithmically derived public facet', () => {
  it('parseTsExports derives named exports from braced export lists', () => {
    const body = 'export { a, b }\nexport default 0\n'
    expect(parseTsExports(body)).toEqual(expect.arrayContaining(['a', 'b', 'default']))
  })

  it('exportBoundaryFlips when a symbol is added or removed', () => {
    const path = 'quantum/export/index.ts'
    const before = 'export { x }\n'
    const after = 'export { x, y }\n'
    expect(exportBoundaryFlips(path, before, before)).toBe(false)
    expect(exportBoundaryFlips(path, before, after)).toBe(true)
  })
})
