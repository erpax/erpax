import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/measurement'

describe('body/measurement — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe(atomAddress(import.meta.url).leaf)
    expect(CANONICAL).toBe(atomAddress(import.meta.url).leaf)
    expect(PARENT).toBe(atomAddress(import.meta.url).parent)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(reexportFrom).toBe(atomAddress(import.meta.url).canonical)
  })
})
