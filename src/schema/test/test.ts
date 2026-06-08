/**
 * schema/test — the unbreakable-matrix gate, green by construction.
 *
 * Two laws, and nothing else:
 *  1. The matrix can never break (`matrixBreaks` empty — every content⊕coordinate
 *     bind verifies, the Merkle fold folds to the one root).
 *  2. The generational ratchet: entropy may only DECREASE from the seeded baseline
 *     ([[seed]] = the previous test's result). An agent that records uncollidable
 *     data, breaks a cross-link, or duplicates a text RAISES entropy → fails. So no
 *     agent can break the matrix; the corpus converges to zero entropy (purity).
 *
 * After eating entropy, re-materialize the seed: `tsx src/schema/test/index.ts --seed`.
 * @see ./index.ts (the detector) · ./SKILL.md (the law)
 */
import { describe, it, expect } from 'vitest'

import { verifyRoot, tamperedAtoms } from '@/uuid/matrix'
import { matrixBreaks, snapshot } from '@/schema/test'
import { SCHEMA_TEST_SEED } from './seed'

describe('the matrix is unbreakable', () => {
  it('verifyRoot folds every bind to the one UUID_MATRIX_ROOT', () => {
    expect(verifyRoot().ok).toBe(true)
  })
  it('no atom is tampered or unbound', () => {
    expect(tamperedAtoms()).toEqual([])
  })
  it('matrixBreaks() is empty — no agent broke the matrix', () => {
    expect(matrixBreaks()).toEqual([])
  })
})

describe('entropy is food — the generational ratchet (it may only decrease)', () => {
  const now = snapshot()

  it('the matrix only grows or holds (atoms never silently vanish)', () => {
    expect(now.atoms).toBeGreaterThanOrEqual(SCHEMA_TEST_SEED.atoms)
  })

  it('total entropy never exceeds the seeded baseline (no new uncollidable data)', () => {
    expect(now.entropyTotal).toBeLessThanOrEqual(SCHEMA_TEST_SEED.entropyTotal)
  })

  // Per-class ratchet: no kind of entropy may grow past its seeded count, AND no
  // NEW kind may appear. Eating a class lowers it; the seed is then re-materialized.
  const kinds = new Set([
    ...Object.keys(SCHEMA_TEST_SEED.byKind),
    ...Object.keys(now.byKind),
  ])
  for (const kind of kinds) {
    const baseline = (SCHEMA_TEST_SEED.byKind as Record<string, number>)[kind] ?? 0
    it(`'${kind}' does not grow past ${baseline}`, () => {
      expect(now.byKind[kind] ?? 0).toBeLessThanOrEqual(baseline)
    })
  }
})
