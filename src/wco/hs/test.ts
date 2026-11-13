import { describe, it, expect } from 'vitest'
import {
  HS_SECTIONS,
  isValidHsCodeStructure,
  hsChapter,
  sectionForChapter,
} from '@/wco/hs'

// WCO Harmonised System: 21 sections covering chapters 1..99; structure
// validator confirms 6–10 digit shape (NOT existence); chapter/section
// lookups derive from the first two digits.
describe('wco/hs — Harmonised System section index + structure validator', () => {
  it('has the 21 sections I..XXI covering chapters 1..99 contiguously', () => {
    expect(HS_SECTIONS).toHaveLength(21)
    expect(HS_SECTIONS[0].section).toBe('I')
    expect(HS_SECTIONS[HS_SECTIONS.length - 1].section).toBe('XXI')
    // ranges are ordered, non-overlapping, and tile chapters 1..99
    let expectedLo = 1
    for (const { chapters: [lo, hi] } of HS_SECTIONS) {
      expect(lo).toBe(expectedLo)
      expect(hi).toBeGreaterThanOrEqual(lo)
      expectedLo = hi + 1
    }
    expect(expectedLo - 1).toBe(99)
  })

  it('isValidHsCodeStructure accepts 6–10 digits, ignoring spaces/dots', () => {
    expect(isValidHsCodeStructure('850440')).toBe(true) // 6-digit HS root
    expect(isValidHsCodeStructure('8504.40.30')).toBe(true) // dotted CN
    expect(isValidHsCodeStructure('8504 40 30 80')).toBe(true) // 10-digit HTS w/ spaces
    expect(isValidHsCodeStructure('12345')).toBe(false) // too short
    expect(isValidHsCodeStructure('12345678901')).toBe(false) // too long
    expect(isValidHsCodeStructure('85A440')).toBe(false) // non-digit
    expect(isValidHsCodeStructure('')).toBe(false)
  })

  it('hsChapter extracts the leading two digits, null when malformed', () => {
    expect(hsChapter('850440')).toBe(85)
    expect(hsChapter('8504.40.30')).toBe(85)
    expect(hsChapter('010121')).toBe(1)
    expect(hsChapter('123')).toBe(null) // fails structure check
    expect(hsChapter('ABCDEF')).toBe(null)
  })

  it('sectionForChapter maps a chapter into its section, null when none', () => {
    expect(sectionForChapter(1)).toBe('I') // live animals
    expect(sectionForChapter(85)).toBe('XVI') // electrical equipment
    expect(sectionForChapter(99)).toBe('XXI')
    expect(sectionForChapter(0)).toBe(null)
    expect(sectionForChapter(100)).toBe(null)
  })

  it('every chapter 1..99 resolves to exactly one section', () => {
    for (let ch = 1; ch <= 99; ch++) {
      expect(sectionForChapter(ch)).not.toBe(null)
    }
  })
})
