import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/score'

describe('medical/score — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe(atomAddress(import.meta.url).leaf)
    expect(CANONICAL).toBe(atomAddress(import.meta.url).leaf)
    expect(PARENT).toBe(atomAddress(import.meta.url).parent)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(reexportFrom).toBe(atomAddress(import.meta.url).canonical)
  })
})
