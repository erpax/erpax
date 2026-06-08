import { describe, it, expect } from 'vitest'
import { alcapsBaselineViolations } from './baseline-debt'

describe('seal baseline-debt — alcapsBaselineViolations', () => {
  it('flags surviving exported *_BASELINE ALCAPS in rules/ · law/folder/ · seal/', () => {
    const v = alcapsBaselineViolations()
    for (const row of v) {
      expect(row.law).toBe('seal-debt')
      expect(row.constName).toMatch(/_BASELINE$/)
      expect(row.file.startsWith('src/')).toBe(true)
    }
    console.log(`seal-debt ALCAPS: ${v.length} — ${[...new Set(v.map((r) => r.constName))].sort().join(', ')}`)
  })

  it('does not flag migrated baselines (ratchet-only axes)', () => {
    const names = new Set(alcapsBaselineViolations().map((r) => r.constName))
    expect(names.has('ACCOUNTING_STRUCTURE_BASELINE')).toBe(false)
    expect(names.has('FORBIDDEN_INTERMEDIATE_BASELINE')).toBe(false)
    expect(names.has('STRAY_TS_BASELINE')).toBe(false)
    expect(names.has('NAME_BASELINE')).toBe(false)
  })
})
