import { describe, it, expect } from 'vitest'
import { VAGUE_TIP_RE, CONCRETE_CODE_RE, CONCRETE_PROOF_RE, ADMIN_TTFB_MS_OK, ADMIN_TTFB_MS_RESIDUAL, atomPath } from './index'

describe('self/improve/tip/model — the vocabulary of a precise tip', () => {
  it('names its own path', () => {
    expect(atomPath).toBe('self/improve/tip')
  })

  it('the vague pattern MATCHES the sentences that forbid nothing', () => {
    for (const vague of ['continue improving', 'keep going', 'polish it somehow', 'maybe do better']) {
      expect(VAGUE_TIP_RE.test(vague)).toBe(true)
    }
  })

  it('and does NOT match a sentence that names a command and a signal', () => {
    expect(VAGUE_TIP_RE.test('run tsx src/rules/index.ts --check until stray-ts is 0')).toBe(false)
  })

  it('a concrete tip needs a real command and a real green signal', () => {
    expect(CONCRETE_CODE_RE.test('tsx src/rules/index.ts')).toBe(true)
    expect(CONCRETE_PROOF_RE.test('violations.length === 0')).toBe(true)
    expect(CONCRETE_PROOF_RE.test('it looks fine afterwards')).toBe(false)
    expect(CONCRETE_CODE_RE.test('somewhere in the code')).toBe(false)
  })

  it('the thresholds are ordered — OK is faster than the residual it tolerates', () => {
    expect(ADMIN_TTFB_MS_OK).toBeLessThan(ADMIN_TTFB_MS_RESIDUAL)
  })
})
