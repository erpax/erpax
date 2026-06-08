/**
 * writing/computed — computed writing metrics from sealed coordinates.
 */
import { describe, it, expect } from 'vitest'
import { computedWritingForPath, writingScore } from '@/writing/computed'
import { improveWritingSkill } from '@/writing/skills'

describe('computedWritingForPath — diamond-derived prose metrics', () => {
  it('same atomPath ⇒ same score map', () => {
    const a = computedWritingForPath('quantum/emr')
    const b = computedWritingForPath('quantum/emr')
    expect(a).toEqual(b)
  })

  it('quantum/emr sample — debit/credit · law · wikilink · eb/word', () => {
    const w = computedWritingForPath('quantum/emr')
    expect(w.atomPath).toBe('quantum/emr')
    expect(w.contentUuid).toBe('1df171af-6048-53d7-9ddd-8a1f4b547f42')
    expect(w.horo).toBe(1)
    expect(w.wordCount).toBeGreaterThan(500)
    expect(w.lawLines).toBeGreaterThanOrEqual(1)
    expect(w.wikilinkCount).toBeGreaterThan(20)
    expect(w.debitTotal).toBe(w.creditTotal)
    expect(w.ebPerWord).toBeGreaterThan(0)
    expect(w.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect({
      atomPath: w.atomPath,
      score: w.score,
      lawLines: w.lawLines,
      wikilinkDensity: w.wikilinkDensity,
      ebPerWord: w.ebPerWord,
      balanced: w.balanced,
      variance: w.variance,
      proseRatio: Math.round(w.proseRatio * 100) / 100,
    }).toMatchInlineSnapshot(`
      {
        "atomPath": "quantum/emr",
        "balanced": false,
        "ebPerWord": 0.0035,
        "lawLines": 1,
        "proseRatio": 0.82,
        "score": 43,
        "variance": 1,
        "wikilinkDensity": 3.79,
      }
    `)
  })

  it('writingScore penalises high prose ratio and variance', () => {
    const good = writingScore({
      variance: 0,
      proseRatio: 0.3,
      balanced: true,
      wikilinkDensity: 5,
      lawLines: 1,
      trinity: { form: 1, code: 1, proof: 1 },
    })
    const bad = writingScore({
      variance: 2,
      proseRatio: 0.9,
      balanced: false,
      wikilinkDensity: 0,
      lawLines: 0,
      trinity: { form: 1, code: 0, proof: 0 },
    })
    expect(good).toBeGreaterThan(bad)
  })
})

describe('improveWritingSkill — scored exercise', () => {
  it('quantum/emr surfaces prose and balance gaps deterministically', () => {
    const r = improveWritingSkill({ atomPath: 'quantum/emr' })
    expect(r.score).toBe(43)
    expect(r.computed.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect(r.gaps.some((g) => g.includes('prose ratio'))).toBe(true)
    expect(r.gaps.some((g) => g.includes('variance'))).toBe(true)
    expect(r.passes).toBe(false)
  })
})
