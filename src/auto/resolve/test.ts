import { describe, it, expect } from 'vitest'
import { isAutoResolvable, resolvePlan } from '@/auto/resolve'
import { folderViolations } from '@/law/folder'

// The fold (./index.ts): a gap is auto-resolvable iff its matter (index.ts) exists,
// so the antimatter + proof derive from it. The partition over the live tree is
// total and disjoint — every trinity gap is either a fold or a matter gap.
describe('auto/resolve — matter present ⇒ the missing legs fold out', () => {
  it('folds iff the matter (index.ts) is present', () => {
    expect(isAutoResolvable({ folder: 'x', missing: ['test.ts'], law: 'trinity' })).toBe(true)
    expect(isAutoResolvable({ folder: 'x', missing: ['SKILL.md'], law: 'trinity' })).toBe(true)
    expect(isAutoResolvable({ folder: 'x', missing: ['SKILL.md', 'test.ts'], law: 'trinity' })).toBe(true)
    expect(isAutoResolvable({ folder: 'x', missing: ['index.ts'], law: 'trinity' })).toBe(false)
    expect(isAutoResolvable({ folder: 'x', missing: ['index.ts', 'test.ts'], law: 'trinity' })).toBe(false)
  })

  it('the partition is exhaustive and disjoint over the live trinity violations', () => {
    const v = folderViolations()
    const p = resolvePlan(v)
    expect(p.resolvable.length + p.needsMatter.length).toBe(v.trinity.length)
    expect(p.resolvable.some((t) => !isAutoResolvable(t))).toBe(false)
    expect(p.needsMatter.some((t) => isAutoResolvable(t))).toBe(false)
    expect(p.needsRename).toBe(v.name.length)
    expect(p.total).toBe(v.total)
  })

  it('auto/resolve is itself complete — never in its own resolvable set', () => {
    expect(resolvePlan().resolvable.some((t) => t.folder === 'auto/resolve')).toBe(false)
  })
})
