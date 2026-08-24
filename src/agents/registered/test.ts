import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of agents/registered and forbade nothing. What registered actually owes its
// callers is its FACE: import { X } from '@/agents/registered' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "ConsistencyAgent",
  "CustomerSupportAgent",
  "DataAgent",
  "DesignAgent",
  "EngineeringAgent",
  "EnterpriseSearchAgent",
  "HrAgent",
  "LegalAgent",
  "MarketingAgent",
  "MetaSkillAgent",
  "OpsAgent",
  "PluginsAgent",
  "ProductAgent",
  "ProductivityAgent",
  "SalesAgent",
  "TRAINING_EMIT",
  "TRAINING_TRIGGER",
  "planTrainingEffects"
] as const

describe('agents/registered — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('agents/registered'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 18 name(s) — a silent drop changes the count', () => {
    expect(faceOf('agents/registered').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('agents/registered')
    expect(new Set(live).size).toBe(live.length)
  })
})
