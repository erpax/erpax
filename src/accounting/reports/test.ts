import { describe, it, expect } from 'vitest'
import { generateTrialBalance } from './index'

describe('accounting/reports — financial statement generators', () => {
  it('generateTrialBalance is exported from the nested atom face', () => {
    expect(typeof generateTrialBalance).toBe('function')
  })
})
