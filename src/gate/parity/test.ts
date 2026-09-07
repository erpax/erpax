import { describe, expect, it } from 'vitest'
import { GATE_LANES } from '@/cli/gate'
import { GATE_SURFACES, driftCount, executableText, laneGaps } from '@/gate/parity'

describe('gate/parity — the definitions of "the gate" must be one', () => {
  // The header of .husky/pre-push says "Same checks as `pnpm run check`" and names lint, tsc and
  // vitest. It runs none of them. A lane MENTIONED in a comment is prose about the gate, and
  // counting it is how that sentence stayed true-looking for as long as it did.
  it('a lane named only in a comment is not a lane the surface runs', () => {
    const text = '# runs pnpm erpax lint and pnpm erpax rules check\nbash scripts/other.sh\n'
    expect(executableText(text)).not.toContain('pnpm erpax lint')
    expect(executableText(text)).toContain('bash scripts/other.sh')
  })

  it('keeps a lane whose command is genuinely executed, including mid-line', () => {
    expect(executableText('  pnpm erpax lint # inline note\n')).toContain('pnpm erpax lint')
  })

  it('every gap names a real lane and at least one real surface', () => {
    const lanes = new Set(GATE_LANES.map(([l]) => l))
    const surfaces = new Set(GATE_SURFACES.map((s) => s.name))
    for (const g of laneGaps(process.cwd())) {
      expect(lanes.has(g.lane)).toBe(true)
      expect(g.missingFrom.length).toBeGreaterThan(0)
      for (const s of g.missingFrom) expect(surfaces.has(s)).toBe(true)
    }
  })

  // The drift is a (lane, surface) count, so it cannot exceed the product — a bound that catches a
  // reader that has started counting something else.
  it('the drift is bounded by lanes x surfaces and is measured, not asserted', () => {
    const n = driftCount(process.cwd())
    expect(n).toBeGreaterThanOrEqual(0)
    expect(n).toBeLessThanOrEqual(GATE_LANES.length * GATE_SURFACES.length)
  })
})
