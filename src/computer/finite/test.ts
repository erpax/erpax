import { describe, it, expect } from 'vitest'
import { accepts, step, SEAL_CHECK_FSM } from '@/computer/finite'

describe('computer/finite — finite automata', () => {
  it('step follows a defined transition', () => {
    expect(step(SEAL_CHECK_FSM, 'unsealed', 'check')).toBe('checking')
    expect(step(SEAL_CHECK_FSM, 'checking', 'pass')).toBe('sealed')
    expect(step(SEAL_CHECK_FSM, 'checking', 'fail')).toBe('rejected')
  })

  it('accepts a passing seal check sequence', () => {
    expect(accepts(SEAL_CHECK_FSM, ['check', 'pass'])).toBe(true)
  })

  it('rejects failed or incomplete sequences', () => {
    expect(accepts(SEAL_CHECK_FSM, ['check', 'fail'])).toBe(false)
    expect(accepts(SEAL_CHECK_FSM, ['check'])).toBe(false)
    expect(accepts(SEAL_CHECK_FSM, [])).toBe(false)
  })

  it('tamper from sealed returns to unsealed (non-accepting)', () => {
    expect(step(SEAL_CHECK_FSM, 'sealed', 'tamper')).toBe('unsealed')
    expect(accepts(SEAL_CHECK_FSM, ['check', 'pass', 'tamper'])).toBe(false)
  })
})
