/**
 * computer/complexity — big-O classifier from loop-depth bindings (no AST required).
 *
 * Bindings describe nested loops, multiplicative nesting, and recursion flags;
 * the classifier maps to standard complexity classes used in CS analysis.
 *
 * @see ../algorithm — @/readme/entropy (Landauer bit floor)
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export type ComplexityClass = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2^n)'

/** One loop or recursive step in a binding table (depth from static analysis or hand supply). */
export interface LoopBinding {
  readonly depth: number
  readonly multiplicative?: boolean
  readonly recursive?: boolean
  readonly binarySplit?: boolean
}

export function maxLoopDepth(bindings: readonly LoopBinding[]): number {
  return bindings.reduce((m, b) => Math.max(m, b.depth), 0)
}

/** Classify asymptotic complexity from a loop binding table. */
export function classifyComplexity(bindings: readonly LoopBinding[]): ComplexityClass {
  if (bindings.length === 0) return 'O(1)'
  if (bindings.some((b) => b.recursive && !b.binarySplit)) return 'O(2^n)'
  const depth = maxLoopDepth(bindings)
  const multiplicative = bindings.some((b) => b.multiplicative)
  const binarySplit = bindings.some((b) => b.binarySplit)
  if (depth >= 2 && multiplicative) return 'O(n²)'
  if (depth >= 1 && binarySplit) return 'O(n log n)'
  if (depth >= 1) return 'O(n)'
  if (binarySplit) return 'O(log n)'
  return 'O(1)'
}

/** Dominant class when composing two subroutines (standard max rule). */
export function dominantComplexity(a: ComplexityClass, b: ComplexityClass): ComplexityClass {
  const rank: Record<ComplexityClass, number> = {
    'O(1)': 0,
    'O(log n)': 1,
    'O(n)': 2,
    'O(n log n)': 3,
    'O(n²)': 4,
    'O(2^n)': 5,
  }
  return rank[a] >= rank[b] ? a : b
}

export function recordComputerComplexityOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/complexity', { kind: 'computer.complexity.step', payload }, at, prevEntryUuid, seq)
}
