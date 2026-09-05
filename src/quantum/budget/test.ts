import { describe, it, expect } from 'vitest'
import { MAX_AGENT_SKILL_CONTEXT_BYTES } from '@/agent/skill-context'
import { ftlMetrics } from '@/quantum/computer'
import { assertSkillFaceBudget, atomsWithinBudget, efficiencyPerToken, faceCost, injectedCost, skillWeights } from './index'

describe('quantum/budget — what the corpus costs a turn', () => {
  it('counts every atom that carries a SKILL, and names the cost by face', () => {
    const c = faceCost(process.cwd())
    expect(c.atoms).toBeGreaterThan(3000)
    expect(c.bytes['SKILL.md']).toBeGreaterThan(0)
    expect(c.totalTokens).toBe(c.totalBytes / 4)
  })

  it('ranks the SKILL faces heaviest first, so the expensive one is named not averaged', () => {
    const w = skillWeights(process.cwd())
    expect(w.length).toBeGreaterThan(3000)
    for (let i = 1; i < 50; i++) expect(w[i]!.bytes).toBeLessThanOrEqual(w[i - 1]!.bytes)
  })

  it('an unmaterialised face costs nothing rather than throwing — README and LLM are gitignored', () => {
    const c = injectedCost(['quantum/budget'], process.cwd(), ['SKILL.md', 'nope.md'])
    expect(c.atoms).toBe(1)
    expect(c.bytes['nope.md']).toBe(0)
  })

  it('a path that is not an atom is not counted', () => {
    expect(injectedCost(['no/such/atom/anywhere'], process.cwd()).atoms).toBe(0)
  })

  // The finding, stated so it can fail: the declared ceiling is worth a SMALL number of atoms, and a
  // door that hands over whole faces passes that number long before it notices.
  it('the declared ceiling is worth only a couple of dozen atoms at the mean SKILL size', () => {
    const n = atomsWithinBudget(process.cwd())
    expect(n).toBeGreaterThan(0)
    expect(n).toBeLessThan(100)
    expect(n * (MAX_AGENT_SKILL_CONTEXT_BYTES / n)).toBeCloseTo(MAX_AGENT_SKILL_CONTEXT_BYTES, 6)
  })

  it('fails closed on a face over the ceiling, and passes when nothing exceeds it', () => {
    expect(() => assertSkillFaceBudget(process.cwd(), 1)).toThrow(/SKILL face/)
    expect(() => assertSkillFaceBudget(process.cwd(), 10_000_000)).not.toThrow()
  })
})

describe('quantum/budget — efficiency with a denominator that was measured', () => {
  const atoms = ['quantum/budget', 'rules/probe', 'fund']

  it('is FINITE, where ftlMetrics reports Infinity by dividing by a token count of zero', () => {
    const e = efficiencyPerToken(3, atoms, process.cwd())
    expect(e.finite).toBe(true)
    expect(Number.isFinite(e.answersPerKiloToken)).toBe(true)
    expect(e.answersPerKiloToken).toBeGreaterThan(0)
    expect(ftlMetrics({ spaceSize: 3536 }).efficiency).toBe(Infinity)
  })

  it('feeding the measured tokens back makes the machine report a quantity, not a symbol', () => {
    const e = efficiencyPerToken(1, atoms, process.cwd())
    const m = ftlMetrics({ spaceSize: 3536, answers: 1, tokens: (e.contextTokens | 0) })
    expect(Number.isFinite(m.efficiency)).toBe(true)
    expect(m.efficiency).toBeLessThan(1)
  })

  it('no atoms means no denominator, and it says so rather than dividing', () => {
    const e = efficiencyPerToken(5, [], process.cwd())
    expect(e.finite).toBe(false)
    expect(e.answersPerKiloToken).toBe(0)
  })
})
