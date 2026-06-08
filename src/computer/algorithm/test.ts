import { describe, it, expect } from 'vitest'
import { binarySearch, isSorted, insertionSort } from '@/computer/algorithm'

describe('computer/algorithm — search and sort', () => {
  const sorted = [1, 3, 5, 7, 9, 11]

  it('binarySearch finds present and absent targets', () => {
    expect(binarySearch(sorted, 7)).toBe(3)
    expect(binarySearch(sorted, 4)).toBe(-1)
    expect(binarySearch([], 1)).toBe(-1)
  })

  it('isSorted detects order', () => {
    expect(isSorted(sorted)).toBe(true)
    expect(isSorted([1, 2, 1])).toBe(false)
    expect(isSorted([])).toBe(true)
  })

  it('insertionSort orders a small array in place', () => {
    const arr = [5, 2, 4, 1, 3]
    expect(insertionSort(arr)).toEqual([1, 2, 3, 4, 5])
    expect(isSorted(arr)).toBe(true)
  })
})
