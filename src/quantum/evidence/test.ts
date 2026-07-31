import { describe, it, expect } from 'vitest'
import { EVIDENCE, byVerdict, unrefutable, assertEvidenceRefutable, evidenceUuid, type Claim } from './index'

describe('quantum/evidence — claims held at their real status', () => {
  it('every EMPIRICAL claim states what would kill it', () => {
    // The one invariant that matters. A claim reading as empirical while nothing could contradict
    // it is where a lie is safe ([[rules]]/refutable) — so the ceiling is zero, not a ratchet.
    expect(assertEvidenceRefutable().ok).toBe(true)
    expect(unrefutable()).toHaveLength(0)
  })

  it('unfalsifiable and metaphor are exempt only BY DECLARING their emptiness', () => {
    for (const c of EVIDENCE) {
      if (c.refutedBy === null) expect(['unfalsifiable', 'metaphor']).toContain(c.verdict)
    }
  })

  it('a claim that reads empirical with no refutation condition is CAUGHT', () => {
    const smuggled: Claim[] = [
      { claim: 'X is true of nature.', verdict: 'theorem', refutedBy: null, boundary: 'none stated' },
    ]
    expect(assertEvidenceRefutable(smuggled).ok).toBe(false)
    expect(unrefutable(smuggled)).toHaveLength(1)
  })

  it('every claim carries an honest boundary', () => {
    for (const c of EVIDENCE) expect(c.boundary.length).toBeGreaterThan(0)
  })

  it('claims are stated agnostically — no appeal to a source as evidence', () => {
    // "the video says" / "experts agree" is authority, and authority is never a step.
    for (const c of EVIDENCE) {
      expect(c.claim).not.toMatch(/\b(video|channel|they say|experts? (?:say|agree)|according to)\b/i)
    }
  })

  it('the distribution is computed and sums to the corpus', () => {
    const d = byVerdict()
    expect(Object.values(d).reduce((a, b) => a + b, 0)).toBe(EVIDENCE.length)
    expect(d.error).toBeGreaterThan(0)
    expect(d.theorem).toBeGreaterThan(0)
  })

  it('the body is content-addressed — reordering or editing changes the address', () => {
    const base = evidenceUuid()
    expect(evidenceUuid([...EVIDENCE].reverse())).not.toBe(base)
    const edited = EVIDENCE.map((c, i) => (i === 0 ? { ...c, verdict: 'metaphor' as const } : c))
    expect(evidenceUuid(edited)).not.toBe(base)
    expect(evidenceUuid([...EVIDENCE])).toBe(base)
  })
})
