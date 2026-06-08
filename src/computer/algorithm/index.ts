/**
 * computer/algorithm — executable search/sort primitives under the machine model.
 *
 * Pivot for CS algorithm matter nested under [[computer]]; complements the
 * vocabulary-only top-level @/algorithm atom.
 *
 * @see ../complexity — ../processor
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Binary search on a sorted array; returns index or -1. O(log n). */
export function binarySearch(sorted: readonly number[], target: number): number {
  let lo = 0
  let hi = sorted.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    const v = sorted[mid]!
    if (v === target) return mid
    if (v < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}

/** True when every element is ≤ the next (non-decreasing). */
export function isSorted(arr: readonly number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! < arr[i - 1]!) return false
  }
  return true
}

/** In-place stable insertion sort for small arrays — O(n²). */
export function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]!
    let j = i - 1
    while (j >= 0 && arr[j]! > key) {
      arr[j + 1] = arr[j]!
      j--
    }
    arr[j + 1] = key
  }
  return arr
}

export function recordComputerAlgorithmOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/algorithm', { kind: 'computer.algorithm.step', payload }, at, prevEntryUuid, seq)
}
