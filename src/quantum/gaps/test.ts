import { describe, it, expect } from 'vitest'
import { QM_GAPS, fillsAnyGap, lensFor } from './index'

// "Fill the gaps in quantum mechanics." The only honest toolbox NAMES them and refuses to fill them. Every gap's
// `fills` is the literal false — the type forbids claiming a solution. The corpus offers LENSES (analogies to
// learn through), never fillings. HARMONY ≠ TRUTH.
describe('quantum/gaps — the open gaps, taught as lenses, never fillings', () => {
  it('names the real open gaps of QM', () => {
    const names = QM_GAPS.map((g) => g.name)
    for (const gap of ['measurement-problem', 'born-rule', 'preferred-basis', 'quantum-gravity', 'interpretation']) {
      expect(names).toContain(gap)
    }
  })

  it('the corpus fills NONE of them — honest by construction (fills is the literal false)', () => {
    expect(fillsAnyGap()).toBe(false)
    for (const g of QM_GAPS) expect(g.fills).toBe(false) // no entry can claim a filling
  })

  it('every gap carries its open question, a lens (or honest "none"), and WHY the lens is not a solution', () => {
    for (const g of QM_GAPS) {
      expect(g.openQuestion.length).toBeGreaterThan(0)
      expect(g.lens.length).toBeGreaterThan(0) // 'none' for quantum-gravity — no invented lens
      expect(g.why.length).toBeGreaterThan(0) // the reason it teaches but does not solve
    }
  })

  it('quantum-gravity honestly has NO lens — I did not invent one', () => {
    expect(lensFor('quantum-gravity')!.lens).toMatch(/none/)
    expect(lensFor('quantum-gravity')!.fills).toBe(false)
  })

  it('the real partial constraints are named as PHYSICS, not as the corpus’s doing', () => {
    expect(lensFor('born-rule')!.realConstraint).toMatch(/Gleason/)
    expect(lensFor('preferred-basis')!.realConstraint).toMatch(/einselection/)
    expect(lensFor('measurement-problem')!.realConstraint).toMatch(/decoherence/)
  })

  it('lensFor is the tutorial for one gap — the honest map', () => {
    const m = lensFor('measurement-problem')!
    expect(m.lens).toMatch(/superpose/) // the corpus tool to learn decoherence-as-contradiction through
    expect(m.why).toMatch(/does not explain|untouched|hard core/) // and the honest limit
  })
})
