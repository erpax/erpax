import { describe, it, expect } from 'vitest'
import { CASE_RING, caseStepOf, nextCaseStep } from './index'

describe('cases/lifecycle', () => {
  it('CASE_RING has 7 positions', () => {
    expect(CASE_RING).toHaveLength(7)
  })

  it('caseStepOf returns correct step for status code', () => {
    expect(caseStepOf('filed')).toBe(1)
    expect(caseStepOf('sealed')).toBe(9)
  })

  it('nextCaseStep advances through the ring', () => {
    expect(nextCaseStep(1)).toBe(2)
    expect(nextCaseStep(9)).toBeUndefined()
  })
})
