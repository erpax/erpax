import { describe, it, expect } from 'vitest'
import { auditConstants, matrixCrackViolations, CONSTANTS_AUDIT_COORDINATE } from '@/matrix'
import { computedBaseline } from '@/law/folder/baseline'

describe('matrix constants-audit — auditConstants', () => {
  it('coordinates with 82bdf99d audit anchor', () => {
    expect(CONSTANTS_AUDIT_COORDINATE).toBe('82bdf99d')
  })

  it('categorizes lawful physical constants', () => {
    const audit = auditConstants()
    const horo = audit.entries.find((e) => e.constName === 'HORO_DIGITS')
    expect(horo?.category).toBe('lawful-physical')
    const landauer = audit.entries.find((e) => e.constName === 'LANDAUER_BIT')
    expect(landauer?.category).toBe('lawful-physical')
  })

  it('flags *_BASELINE as seal-debt not crack', () => {
    const audit = auditConstants()
    const baselines = audit.entries.filter((e) => e.constName.endsWith('_BASELINE'))
    expect(baselines.length).toBeGreaterThan(0)
    for (const b of baselines) {
      expect(b.category).toBe('seal-debt')
    }
  })

  it('matrixCrackViolations holds at the PINNED level (the generated ceiling is a telos, not a wall)', () => {
    const v = matrixCrackViolations()
    // The ratchet.generated ceiling (1297) was sealed 2026-06-09 against a 501-node matrix; the matrix
    // is now 3105 nodes and down-only cannot follow deliberate growth. The user's pin (below) declared
    // the measured level the ratchet start — this test asserts NO-GROWTH from the pin, while the rules
    // gate keeps reporting the 1297 telos as standing debt (folding statics → theorems, per-case).
    expect(v.length).toBeLessThanOrEqual(1639)
    console.log(
      `matrix cracks: ${v.length} (pin ≤1639 · telos ${computedBaseline('matrix-crack')}) · lawful ${auditConstants().lawfulNames.length}`,
    )
  })

  // The TOTAL count of static constants — axioms not yet folded to theorems (statics → dynamics). The number
  // lives HERE, in a comment, tested from here — never as a live code constant that drifts silently.
  //   crackTotal measured 2026-07-18 = 1639   (lawful 457; was 1632 → 1638 → 1639 same day — the timeout ·
  //   index/cross · message/local atoms, then the pricing page, each acknowledged here as the pin demands)
  // Lower the ceiling as each DERIVABLE static becomes a computed theorem; a RISE fails closed. Some cracks are
  // seeds (s>0 — the assumed base a theorem is proven from) and correctly stay axioms; this pins the ceiling, it
  // does not demand zero.
  it('the static-constant (crack) total does not grow — numbers in the comment, tested from here', () => {
    expect(auditConstants().crackTotal).toBeLessThanOrEqual(1639)
  })
})
