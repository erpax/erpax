import { describe, it, expect } from 'vitest'
import { hostMathViolations } from './index'

describe('algebra/host', () => {
  it('loads', async () => {
    const m = await import('./index')
    expect(m).toBeTruthy()
  })

  it('GATE: Math.* is forbidden in first-party source — all theorems are algebra', () => {
    const violations = hostMathViolations()
    
    if (violations.length > 0) {
      const summary = violations.slice(0, 20).map(v => `  ${v.reason}`).join('\n')
      const tail = violations.length > 20 ? `\n  ... and ${violations.length - 20} more violations` : ''
      throw new Error(
        `Math ban gate FAILED: ${violations.length} violation(s) found.\n` +
        `IEEE754 floats break determinism, seals, and proofs.\n` +
        `Use algebra ops: @/algebra for abs/min/max/floor/ceil/round; ` +
        `@/algebra/host for constants; seeded RNG instead of Math.random().\n\n${summary}${tail}`
      )
    }
    
    expect(violations).toHaveLength(0)
  })
})
