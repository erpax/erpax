/**
 * vocabulary — the 0-ENTROPY gate. Every atom's word must come from the shared
 * vocabulary (./words.ts); an ungrounded word is entropy. When it fails, the
 * error does not merely flag — it carries the COMPUTED zero-entropy solution
 * (the nearest vocabulary word, or the decomposition), so the fix that maximises
 * tamper-cost is read straight off the failure. Tighten to zero.
 *
 * @standard ISO 25964 / SKOS — controlled vocabulary
 * @audit recomputed from the live matrix against ./words.ts, never a fixture
 */
import { describe, it, expect } from 'vitest'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
import { audit, isGrounded, decompose, suggest } from '@/vocabulary'

describe('vocabulary — every word from the shared vocabulary (0 entropy)', () => {
  it('grounds a root, a plural, and a composition; rejects a stray', () => {
    expect(isGrounded('invoice')).toBe(true)
    expect(isGrounded('invoices')).toBe(true) // plural of a root
    expect(decompose('budgetvariance')).toEqual(['budget', 'variance']) // composes from roots
    expect(isGrounded('zxqwk')).toBe(false)
  })

  it('a stray gets a COMPUTED zero-entropy solution (the nearest vocabulary word)', () => {
    expect(suggest('balanse')).toContain('balance') // one edit from the vocabulary
    expect(suggest('zxqwk')).toMatch(/extend the shared vocabulary|nearest|split/)
  })

  // THE 0-ENTROPY RATCHET — every atom's word is from the shared vocabulary. A stray fails HERE
  // with its computed solution attached; the ceiling ONLY ratchets DOWN as strays are grounded
  // (vocab-gen extends the vocabulary, or the atom is renamed/merged). Zero is the horizon — the
  // maximum-tamper-cost state where every word is grounded. Baseline measured 2026-07-26.
  const VOCAB_ENTROPY_CEILING = 545
  it('vocabulary entropy ratchets toward zero (down-only)', () => {
    const r = audit(UUID_MATRIX_NODES.map((n) => n.atom))
    if (r.flagged.length > VOCAB_ENTROPY_CEILING) {
      console.log(
        `\nvocabulary entropy: ${r.flagged.length} > ceiling ${VOCAB_ENTROPY_CEILING} (REGRESSION) — computed solutions:\n` +
          r.flagged.slice(0, 40).map((f) => `  ${f.atom}  ${f.suggestion}`).join('\n'),
      )
    }
    expect(r.flagged.length).toBeLessThanOrEqual(VOCAB_ENTROPY_CEILING)
  })
})
