/**
 * convention/fronted — the fronted convention is its own test: coverage is a real fraction over the
 * live corpus, deterministic, and the frontmatter markers actually discriminate. No hand-asserted
 * number — the value is whatever the real tree computes; we assert only the invariants that must
 * always hold.
 */
import { describe, it, expect } from 'vitest'
import {
  coverage,
  fronted,
  total,
  isFronted,
  frontmatter,
  NAME_MARKER,
  DESCRIPTION_MARKER,
} from './index'

describe('convention/fronted', () => {
  it('coverage ∈ [0,1] — a fraction by construction, no clamp needed', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('is deterministic — the same live tree yields the same coverage', () => {
    expect(coverage()).toBe(coverage())
  })

  it('fronted ≤ total and total > 0 — the corpus is non-empty, fronted is a subset', () => {
    expect(total()).toBeGreaterThan(0)
    expect(fronted()).toBeGreaterThanOrEqual(0)
    expect(fronted()).toBeLessThanOrEqual(total())
  })

  it('coverage = fronted / total — the ratio is exactly the composition, no fallback', () => {
    expect(coverage()).toBe(fronted() / total())
  })

  it('the markers discriminate — both name: and description: are required', () => {
    const valid = '---\nname: fronted\ndescription: Use when checking the front door\n---\n# body'
    const noName = '---\ndescription: Use when checking the front door\n---\n# body'
    const noDesc = '---\nname: fronted\n---\n# body'
    const empty = '---\nname:\ndescription:\n---\n# body'
    expect(isFronted(valid)).toBe(true)
    expect(isFronted(noName)).toBe(false)
    expect(isFronted(noDesc)).toBe(false)
    expect(isFronted(empty)).toBe(false)
    expect(isFronted('# body with no frontmatter at all')).toBe(false)
  })

  it('frontmatter extracts the head block, or empty string when absent', () => {
    expect(frontmatter('---\nname: x\n---\nbody')).toContain('name: x')
    expect(frontmatter('no head here')).toBe('')
    expect(NAME_MARKER.test('name: x')).toBe(true)
    expect(NAME_MARKER.test('description: y')).toBe(false)
    expect(DESCRIPTION_MARKER.test('description: y')).toBe(true)
    expect(DESCRIPTION_MARKER.test('name: x')).toBe(false)
  })

  it("this atom's own SKILL.md is fronted — it has valid frontmatter, so it self-counts", () => {
    // The audit measures the live tree including this atom; a frontless fronted atom
    // would be self-refuting. So fronted ≥ 1 (at minimum, this one).
    expect(fronted()).toBeGreaterThanOrEqual(1)
  })
})
