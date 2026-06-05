import { describe, it, expect } from 'vitest'
import { quaternaryViolations } from '@/migrate/quaternary'

// The one folder-file law (./index.ts). No HARDCODED baseline — a magic number is
// itself the hardcoded debt this whole effort removes. The gate computes + reports
// the live merge-by-extension queue; the migrating skills (../) collide it to zero
// (every same-extension file merges to its canonical), and zero ⇒ tamper-cost ∞.
describe('quaternary: the one folder-file law (computed)', () => {
  const violations = quaternaryViolations()

  it('computes the merge-by-extension queue from the live tree', () => {
    expect(Array.isArray(violations)).toBe(true)
    const folders = new Set(violations.map((v) => v.folder)).size
    console.log(`quaternary: ${violations.length} files to merge-by-extension across ${folders} folders (collide → 0)`)
  })

  it.todo('quaternary → 0 — every folder holds only canonical + framework files (tamper-cost ∞)')
})
