import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * writing/computed — computed writing metrics from sealed coordinates.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { nodeOf } from '@/uuid/matrix'
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
    // Read the SEAL, never a copy of it. This line carried a literal uuid that the atom's own
    // frontmatter had long since moved past — the corpus's content-address stated in two places,
    // with one rotted, which is the duplication that hides drift instead of showing it. Computed
    // vs sealed is the comparison that forbids something: they must agree.
    const sealed = /contentUuid:\s*"([0-9a-f-]+)"/.exec(readFileSync('src/quantum/emr/SKILL.md', 'utf8'))?.[1]
    expect(sealed).toBeDefined()
    expect(w.contentUuid).toBe(sealed)
    // The matrix is the authority for a position, so compare against it rather than a literal.
    // NAMED DRIFT: quantum/emr's SKILL frontmatter still says `horo: 2` while the matrix has said 7
    // both before and after this session's regeneration — the sealed frontmatter is behind the
    // computed corpus. That is a real gap for the skill-upgrade wave; it is not this suite's to
    // paper over, and pinning the STALE value (which is what `toBe(2)` did) hid it completely.
    expect(w.horo).toBe(nodeOf('quantum/emr')?.horo)
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
      proseRatio: exactRound(w.proseRatio * 100) / 100,
    }).toMatchInlineSnapshot(`
      {
        "atomPath": "quantum/emr",
        "balanced": false,
        "ebPerWord": 0.0026,
        "lawLines": 1,
        "proseRatio": 0.82,
        "score": 41,
        "variance": 1,
        "wikilinkDensity": 2.77,
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
    expect(r.score).toBe(41)
    expect(r.computed.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect(r.gaps.some((g) => g.includes('prose ratio'))).toBe(true)
    expect(r.gaps.some((g) => g.includes('variance'))).toBe(true)
    expect(r.passes).toBe(false)
  })
})
