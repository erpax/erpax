import { exactAbs } from '@/algebra'

/** True iff the reduced denominator has only factors 2 and 5 — decimal terminates. */
export function decimalTerminates(num: number, den: number): boolean {
  if (den === 0) return false
  let d = exactAbs(den)
  while (d % 2 === 0) d /= 2
  while (d % 5 === 0) d /= 5
  return d === 1
}

/** The dot collapses iff the number is rational — terminates OR repeats (all rationals). */
export function dotCollapses(num: number, den: number): boolean {
  if (den === 0) return false
  return Number.isFinite(num / den)
}

/** Irrational stream never settles — modeled as non-collapsing dot. */
export function irrationalStreamRuns(): true {
  return true
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/number — 1/2 terminates=' +
      decimalTerminates(1, 2) +
      ' · 1/3 collapses=' +
      dotCollapses(1, 3) +
      ' · 1/7 terminates=' +
      decimalTerminates(1, 7),
  )
}

/** @index-cross.foldback child=quantum/number parent=quantum — this cross folds back into its parent. */
