import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('admin/ui/violations — the canonical entry point', () => {
  it('offers the monitor surface, so the panel imports the folder rather than a component file', () => {
    expect(Object.keys(barrel).length).toBeGreaterThan(0)
  })

  it('every member it offers is defined — a barrel re-exporting a moved file fails here, not at render', () => {
    for (const [name, m] of Object.entries(barrel)) {
      expect(m, name).not.toBeUndefined()
    }
  })
})
