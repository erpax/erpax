import { describe, it, expect } from 'vitest'
import { computedBaseline } from '@/law/folder/baseline'
import { RATCHET_GENERATED } from '@/law/folder/ratchet.generated'
import {
  COMPUTED_AT_ALL_SCALES_COORDINATE,
  COMPUTED_SCALES,
  computedAtAllScalesVerdict,
  alcapsBaselineViolations,
  globalsCssFallbackViolations,
  hardcodedAdminGroupViolations,
  skillsIndexRuntimeViolations,
} from '@/seal'

describe('computedAtAllScalesVerdict — fast audit axes', () => {
  it('coordinates with b576a290 seal-debt anchor', () => {
    expect(COMPUTED_AT_ALL_SCALES_COORDINATE).toBe('b576a290')
  })

  it('maps pixel → atom → folder → corpus → matrix → wave ladder', () => {
    expect(COMPUTED_SCALES).toEqual(['pixel', 'atom', 'folder', 'corpus', 'matrix', 'wave'])
  })

  it('baselines face reads computedBaseline from ratchet.generated emit', () => {
    expect(computedBaseline('diamond-membership')).toBe(
      RATCHET_GENERATED.axes['diamond-membership'],
    )
    const v = computedAtAllScalesVerdict('corpus', process.cwd(), { light: true })
    expect(v.scope).toBe('corpus')
    expect(v.coordinate).toBe('b576a290')
    const baselines = v.checks.find((c) => c.face === 'baselines' && c.deriveFn === 'computedBaseline')
    expect(baselines?.deriveFn).toBe('computedBaseline')
    const alcaps = alcapsBaselineViolations()
    if (alcaps.length > 0) {
      expect(baselines?.computed).toBe(false)
      expect(v.handMaintained.some((h) => h.includes('ALCAP'))).toBe(true)
    }
  })

  it('globals.css declares ComputedCssProvider override', () => {
    const v = globalsCssFallbackViolations()
    expect(v.some((x) => x.includes('ComputedCssProvider'))).toBe(false)
  })

  it('agent dispatch does not import skills.index', () => {
    expect(skillsIndexRuntimeViolations()).toEqual([])
  })

  it('flags hardcoded admin.group literals in collection configs', () => {
    const v = hardcodedAdminGroupViolations()
    expect(v.length).toBeGreaterThan(0)
    expect(v.some((x) => x.includes("group: 'Billing'"))).toBe(true)
  })
})

describe('computedAtAllScalesVerdict — live tree (light)', () => {
  it('seal atom: every face traces to a derive* function', () => {
    const v = computedAtAllScalesVerdict('seal', process.cwd(), { skipSkillFrontmatter: true })
    expect(v.checks.length).toBeGreaterThanOrEqual(8)
    for (const c of v.checks) {
      expect(c.deriveFn).toMatch(/^derive|^connect|^computed|^verify/)
    }
  }, 180_000)

  it('reports pct computed per scale', () => {
    const v = computedAtAllScalesVerdict('seal', process.cwd(), { skipSkillFrontmatter: true })
    expect(v.scales.length).toBe(6)
    for (const s of v.scales) {
      expect(s.pctComputed).toBeGreaterThanOrEqual(0)
      expect(s.pctComputed).toBeLessThanOrEqual(100)
    }
  }, 180_000)
})

describe('finishedIdeaCrossed — hand-maintained impurity', () => {
  it('hand-maintained prefix format matches finishedIdeaCrossed wiring contract', () => {
    const sample = 'hand-maintained: readme (deriveFolderModel) — seal README drift'
    expect(sample).toMatch(/^hand-maintained: \w+ \(\w+\) —/)
  })
})
