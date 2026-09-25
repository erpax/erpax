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

  it('neverDelete refuses EVERY principal — a super-admin cannot erase a sealed matter', () => {
    // called the way Payload calls it, and asserted against the strongest caller there is:
    // `expect(neverDelete()).toBe(false)` proved only that a constant function is constant
    const asPayloadCalls = (user: unknown) =>
      neverDelete({ req: { user } } as unknown as Parameters<typeof neverDelete>[0])
    expect(asPayloadCalls(null)).toBe(false)
    expect(asPayloadCalls({ roles: ['admin'] })).toBe(false)
    expect(asPayloadCalls({ roles: ['super-admin'] })).toBe(false)
  })
})
