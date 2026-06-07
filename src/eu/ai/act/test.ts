import { describe, it, expect } from 'vitest'
import {
  EU_AI_ACT_RISK_CLASSES,
  EU_AI_ACT_RISK_LABEL,
  EU_AI_ACT_RISK_OPTIONS,
  isEuAiActRiskClass,
  canAutoAccept,
} from '@/eu/ai/act'

// Law: the registry of the four-class AI risk taxonomy
// (minimal/limited/high/prohibited) and the canAutoAccept predicate that
// forces human-in-the-loop for high-risk per Art.14.
describe('eu/ai/act — risk taxonomy + auto-accept predicate', () => {
  it('exposes exactly the four classes, lowest to highest impact', () => {
    expect(EU_AI_ACT_RISK_CLASSES).toEqual([
      'minimal',
      'limited',
      'high',
      'prohibited',
    ])
  })

  it('every class has a label and a select option', () => {
    expect(EU_AI_ACT_RISK_OPTIONS).toHaveLength(EU_AI_ACT_RISK_CLASSES.length)
    for (const cls of EU_AI_ACT_RISK_CLASSES) {
      expect(EU_AI_ACT_RISK_LABEL[cls].length).toBeGreaterThan(0)
      const option = EU_AI_ACT_RISK_OPTIONS.find((o) => o.value === cls)
      expect(option?.label).toBe(EU_AI_ACT_RISK_LABEL[cls])
    }
  })

  it('isEuAiActRiskClass guards membership', () => {
    expect(isEuAiActRiskClass('high')).toBe(true)
    expect(isEuAiActRiskClass('prohibited')).toBe(true)
    expect(isEuAiActRiskClass('unacceptable')).toBe(false)
    expect(isEuAiActRiskClass('')).toBe(false)
    expect(isEuAiActRiskClass(0)).toBe(false)
  })

  it('canAutoAccept allows minimal/limited, forces oversight for high/prohibited', () => {
    expect(canAutoAccept('minimal')).toBe(true)
    expect(canAutoAccept('limited')).toBe(true)
    expect(canAutoAccept('high')).toBe(false) // Art.14 human-in-the-loop
    expect(canAutoAccept('prohibited')).toBe(false) // Art.5 must refuse
  })
})
