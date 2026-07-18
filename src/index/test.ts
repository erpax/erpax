import { describe, it, expect } from 'vitest'
import { childWordFromBasename, pathWireViolations } from '@/index/cross'

describe('index/cross', () => {
  it('childWordFromBasename uses last one-word segment', () => {
    expect(childWordFromBasename('strict-apply.ts')).toBe('apply')
    expect(childWordFromBasename('effect-processor.ts')).toBe('processor')
  })

  it('pathWireViolations is computable', () => {
    expect(Array.isArray(pathWireViolations())).toBe(true)
  })
})
