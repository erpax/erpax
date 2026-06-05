import { describe, it, expect } from 'vitest'
import { quaternaryViolations } from '@/migrate/quaternary'

// The four-file folder law (./index.ts). Ratchet: the violation set (the collision
// queue) may only SHRINK toward zero — a NEW violation (count grows past the
// baseline) fails the gate. The migrating skills (../) drive the baseline to 0,
// at which point every folder is exactly {SKILL.md, index.ts, test.ts, translations.ts}.
const BASELINE = 767

describe('quaternary: the four-file folder law (ratchet → 0)', () => {
  const violations = quaternaryViolations()

  it(`no NEW structural violations (baseline ${BASELINE}; only shrinks)`, () => {
    if (violations.length > BASELINE) {
      console.error(
        'NEW violations:',
        violations.slice(0, 40).map((v) => `${v.folder}/${v.file}`).join(', '),
      )
    }
    expect(violations.length).toBeLessThanOrEqual(BASELINE)
  })

  it('reports the collision queue (feed for the migrating skills)', () => {
    console.log(`quaternary violations: ${violations.length} (collide → 0)`)
    expect(Array.isArray(violations)).toBe(true)
  })

  it.todo('quaternary violations → 0 — every folder exactly {SKILL.md, index.ts, test.ts, translations.ts}')
})
