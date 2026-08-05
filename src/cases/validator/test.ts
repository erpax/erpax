import { describe, it, expect } from 'vitest'
import { requireJudgmentToSeal, validateCaseTransition, neverDelete } from './index'

describe('cases/validator', () => {
  it('requireJudgmentToSeal rejects sealing without judgment', () => {
    expect(() =>
      requireJudgmentToSeal({ data: { status: 'sealed', judgment: '' } } as any)
    ).toThrow(/judgment/)
  })

  it('requireJudgmentToSeal allows sealing with judgment', () => {
    const result = requireJudgmentToSeal({
      data: { status: 'sealed', judgment: 'Judgment rendered' },
    } as any)
    expect(result).toBeDefined()
  })

  it('validateCaseTransition allows forward movement', () => {
    expect(validateCaseTransition(1, 2)).toBe(true)
    expect(validateCaseTransition(1, 1)).toBe(true)
  })

  it('neverDelete always returns false', () => {
    expect(neverDelete()).toBe(false)
  })
})
