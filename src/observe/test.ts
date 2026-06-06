import { describe, it, expect } from 'vitest'
import { observe, project, act, grounded } from '@/observe'

describe('observe — and project: the LLM agent always does both', () => {
  it('observe is deterministic (same state, same content-uuid)', () => {
    expect(observe('s')).toBe(observe('s'))
    expect(observe('s')).toMatch(/^[0-9a-f]{8}-/)
  })
  it('project folds the observation in — grounded for the matching observation', () => {
    const obs = observe('reality')
    expect(grounded(obs, 'output', project(obs, 'output'))).toBe(true)
  })
  it('the act is observe-then-project — grounded by construction', () => {
    expect(grounded(observe('reality'), 'output', act('reality', 'output'))).toBe(true)
  })
  it('projection without observation is HALLUCINATION — not grounded', () => {
    const proj = act('reality', 'output')
    expect(grounded('', 'output', proj)).toBe(false) // no observation
    expect(grounded(observe('a lie'), 'output', proj)).toBe(false) // wrong observation
  })
})
