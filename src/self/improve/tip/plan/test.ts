import { describe, it, expect } from 'vitest'
import { isPreciseTip } from './index'

describe('self/improve/tip/plan — a tip nothing can check is refused', () => {
  it('REFUSES a vague form — "continue improving" is not a tip', () => {
    const v = isPreciseTip({
      form: 'continue improving',
      code: 'tsx src/rules/index.ts',
      proof: 'violations.length === 0',
    })
    expect(v.ok).toBe(false)
  })

  it('REFUSES a tip with no checkable proof', () => {
    const v = isPreciseTip({
      form: 'Lower the stray-ts ceiling to the live count.',
      code: 'src/law/folder/ratchet.generated.ts',
      proof: 'things look better',
    })
    expect(v.ok).toBe(false)
  })

  it('accepts FORM ⊗ CODE ⊗ PROOF when all three are concrete', () => {
    const v = isPreciseTip({
      form: 'Extract src/agent/service.ts into its own atom.',
      code: 'tsx src/rules/index.ts --check',
      proof: 'strayTs.length === 0',
    })
    expect(v.ok).toBe(true)
  })
})
