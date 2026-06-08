import { describe, it, expect } from 'vitest'
import {
  classifyComplexity,
  dominantComplexity,
  maxLoopDepth,
  type LoopBinding,
} from '@/computer/complexity'

describe('computer/complexity — O() classifier', () => {
  it('returns O(1) for empty bindings', () => {
    expect(classifyComplexity([])).toBe('O(1)')
  })

  it('classifies single loop as O(n)', () => {
    const bindings: LoopBinding[] = [{ depth: 1 }]
    expect(classifyComplexity(bindings)).toBe('O(n)')
    expect(maxLoopDepth(bindings)).toBe(1)
  })

  it('classifies nested multiplicative loops as O(n²)', () => {
    expect(classifyComplexity([{ depth: 2, multiplicative: true }])).toBe('O(n²)')
  })

  it('classifies binary-split loops as O(n log n)', () => {
    expect(classifyComplexity([{ depth: 1, binarySplit: true }])).toBe('O(n log n)')
  })

  it('classifies unbounded recursion as O(2^n)', () => {
    expect(classifyComplexity([{ depth: 1, recursive: true }])).toBe('O(2^n)')
  })

  it('dominantComplexity picks the higher class', () => {
    expect(dominantComplexity('O(n)', 'O(n²)')).toBe('O(n²)')
    expect(dominantComplexity('O(log n)', 'O(1)')).toBe('O(log n)')
  })
})
