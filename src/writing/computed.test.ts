import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * writing/computed — computed writing metrics from sealed coordinates.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
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
    // The count reads SKILL + README + LLM, and the last two are GENERATED faces — gitignored,
    // and absent on a fresh checkout, which is the shape CI runs. Asserted in both: the prose is
    // there either way, and only its measured volume depends on whether the faces were built.
    const facesBuilt = existsSync('src/quantum/emr/README.md')
    expect(w.wordCount).toBeGreaterThan(facesBuilt ? 500 : 200)
    expect(w.lawLines).toBeGreaterThanOrEqual(1)
    expect(w.wikilinkCount).toBeGreaterThan(20)
    expect(w.debitTotal).toBe(w.creditTotal)
    expect(w.ebPerWord).toBeGreaterThan(0)
    expect(w.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    // The SHAPE is pinned; the three face-dependent measures are not. ebPerWord · score ·
    // wikilinkDensity all divide by a word count that reads the GENERATED README/LLM faces, so
    // they read one way with the faces built and another on a fresh checkout — the snapshot was
    // pinning "was this corpus regenerated on this machine", never the atom.
    expect({
      atomPath: w.atomPath,
      lawLines: w.lawLines,
      balanced: w.balanced,
      variance: w.variance,
      proseRatio: exactRound(w.proseRatio * 100) / 100,
    }).toMatchInlineSnapshot(`
      {
        "atomPath": "quantum/emr",
        "balanced": false,
        "lawLines": 1,
        "proseRatio": 0.82,
        "variance": 1,
      }
    `)
    // Face-dependent, so asserted as relations that hold in both shapes.
    expect(w.score).toBeGreaterThan(0)
    expect(w.wikilinkDensity).toBeGreaterThan(0)
    expect(w.ebPerWord).toBeGreaterThan(0)
    if (facesBuilt) {
      expect(w.score).toBe(41)
      expect(w.wikilinkDensity).toBeCloseTo(2.77, 2)
    }
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
    // The score folds the same face-dependent measures, so it is pinned only where the faces are
    // built; everywhere else the GAPS are the claim — they name what the atom still owes, and they
    // must be the same gaps in both shapes.
    if (existsSync('src/quantum/emr/README.md')) expect(r.score).toBe(41)
    else expect(r.score).toBeGreaterThan(0)
    expect(r.computed.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect(r.gaps.some((g) => g.includes('prose ratio'))).toBe(true)
    expect(r.gaps.some((g) => g.includes('variance'))).toBe(true)
    expect(r.passes).toBe(false)
  })
})
