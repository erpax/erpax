import { describe, it, expect } from 'vitest'
import { agentCostPolicy } from '@/agent/cost-policy'
import { HORO_DIGITS } from '@/horo'
import { MANUAL_IMPOSSIBLE_RATIO } from '@/cost'

describe('agentCostPolicy — derive-path vs manual-forge', () => {
  it('derive verify ≪ manual forge at high coverage', () => {
    const p = agentCostPolicy({ corpusCoverage: 0.999, nodes: 100 })
    expect(p.derivePrice.verifyCost).toBeLessThan(p.manualPrice.forgeCost)
    expect(p.manualForgeRatio).toBeGreaterThan(1)
    expect(p.derivePathRatio).toBeLessThan(1)
  })

  it('promptOnly when manual forge is impossible', () => {
    const p = agentCostPolicy({ corpusCoverage: 0.999, nodes: 2200 })
    expect(p.promptOnly).toBe(true)
    expect(p.verdict.viablePath).toBe('prompt-erpax')
  })

  it('maxContextAtoms equals horo wave depth (default 7)', () => {
    const p = agentCostPolicy()
    expect(p.maxContextAtoms).toBe(HORO_DIGITS.length)
    expect(p.lazySkillLoad).toBe(true)
  })

  it('manual bypass priced infinite — tamper floor preserved', () => {
    const p = agentCostPolicy({ corpusCoverage: 0.5 })
    expect(p.manualPrice.ratio).toBeLessThan(MANUAL_IMPOSSIBLE_RATIO)
    const blocked = agentCostPolicy({ corpusCoverage: 0.5, nodes: 10 })
    expect(blocked.manualPrice.forgeCost).toBeGreaterThan(blocked.derivePrice.verifyCost)
  })
})
