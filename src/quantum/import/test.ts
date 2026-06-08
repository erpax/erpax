/**
 * quantum/import — computed barrel entanglement only.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { parseTsImports, classifyImports, importLawHolds } from '@/quantum/import'

describe('quantum/import — computed import graph', () => {
  it('parseTsImports extracts sorted unique @/ specs', () => {
    const body = "import { a } from '@/horo'\nimport { b } from '@/uuid'\n"
    expect(parseTsImports(body)).toEqual(['@/horo', '@/uuid'])
  })

  it('classifyImports separates barrels from deep escapes', () => {
    const { barrels, escapes } = classifyImports(['@/digit', '@/no/such/deep/path'])
    expect(barrels).toContain('@/digit')
    expect(escapes).toContain('@/no/such/deep/path')
  })

  it('importLawHolds when escapes collapse to barrels', () => {
    expect(importLawHolds(['@/digit'])).toBe(true)
    expect(importLawHolds(['@/no/such/deep/path'])).toBe(false)
  })
})
