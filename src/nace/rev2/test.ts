import { describe, it, expect } from 'vitest'
import {
  NACE_SECTIONS,
  NACE_SECTION_LABEL,
  NACE_SECTION_OPTIONS,
  isValidNaceCodeStructure,
  sectionForNaceCode,
} from '@/nace/rev2'

// Law: NACE Rev.2 classifies an economic activity through one strict hierarchy
// — Section (A-U) → Division (2-digit) → Group (3-digit) → Class (4-digit).
describe('nace/rev2 — sections, structure validation, reverse lookup', () => {
  it('exposes the 21 sections A-U', () => {
    expect(NACE_SECTIONS).toHaveLength(21)
    expect(NACE_SECTIONS[0]).toBe('A')
    expect(NACE_SECTIONS[NACE_SECTIONS.length - 1]).toBe('U')
  })

  it('every section has a label and a select option', () => {
    expect(NACE_SECTION_OPTIONS).toHaveLength(NACE_SECTIONS.length)
    for (const section of NACE_SECTIONS) {
      expect(NACE_SECTION_LABEL[section]).toContain(section)
      const option = NACE_SECTION_OPTIONS.find((o) => o.value === section)
      expect(option).toBeDefined()
      expect(option?.label).toBe(NACE_SECTION_LABEL[section])
    }
  })

  it('isValidNaceCodeStructure accepts division and class forms', () => {
    expect(isValidNaceCodeStructure('62')).toBe(true) // division
    expect(isValidNaceCodeStructure('62.0')).toBe(true) // group
    expect(isValidNaceCodeStructure('62.01')).toBe(true) // class
    expect(isValidNaceCodeStructure(' 62.01 ')).toBe(true) // trimmed
    expect(isValidNaceCodeStructure('6')).toBe(false) // too short
    expect(isValidNaceCodeStructure('62.012')).toBe(false) // too many decimals
    expect(isValidNaceCodeStructure('AB')).toBe(false)
    expect(isValidNaceCodeStructure('')).toBe(false)
  })

  it('sectionForNaceCode maps a code to its section via the division', () => {
    expect(sectionForNaceCode('62.01')).toBe('J') // information and communication
    expect(sectionForNaceCode('01.11')).toBe('A') // agriculture
    expect(sectionForNaceCode('35')).toBe('D') // electricity
    expect(sectionForNaceCode('99')).toBe('U') // extraterritorial
  })

  it('sectionForNaceCode returns null for invalid or unmapped codes', () => {
    expect(sectionForNaceCode('not-a-code')).toBeNull()
    expect(sectionForNaceCode('04')).toBeNull() // structurally valid but no division 4
  })
})
