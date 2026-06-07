import { describe, it, expect } from 'vitest'
import {
  INCOTERMS_2020,
  INCOTERM_FAMILY,
  INCOTERM_LABEL,
  INCOTERM_OPTIONS,
  isIncoterm2020,
} from '@/incoterms/2020'

// INCOTERMS 2020 (ICC 723E): exactly 11 three-letter codes, split into
// 7 multimodal + 4 sea/inland-waterway. The matter (./index.ts) is the
// canonical registry — these are its invariants.
describe('incoterms/2020 — ICC 723E canonical 11-code set', () => {
  it('holds exactly the 11 canonical codes', () => {
    expect(INCOTERMS_2020).toHaveLength(11)
    expect([...INCOTERMS_2020]).toEqual([
      'EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP',
      'FAS', 'FOB', 'CFR', 'CIF',
    ])
    // no duplicates
    expect(new Set(INCOTERMS_2020).size).toBe(11)
  })

  it('splits into 7 multimodal + 4 sea-only families', () => {
    const families = INCOTERMS_2020.map((c) => INCOTERM_FAMILY[c])
    expect(families.filter((f) => f === 'multimodal')).toHaveLength(7)
    expect(families.filter((f) => f === 'sea_only')).toHaveLength(4)
    // the sea/inland-waterway four are exactly FAS FOB CFR CIF
    const seaOnly = INCOTERMS_2020.filter((c) => INCOTERM_FAMILY[c] === 'sea_only')
    expect([...seaOnly]).toEqual(['FAS', 'FOB', 'CFR', 'CIF'])
  })

  it('every code carries a label beginning with its own code', () => {
    for (const code of INCOTERMS_2020) {
      expect(INCOTERM_LABEL[code].startsWith(code)).toBe(true)
    }
  })

  it('options mirror the code set 1:1 with label/value pairs', () => {
    expect(INCOTERM_OPTIONS).toHaveLength(11)
    expect(INCOTERM_OPTIONS.map((o) => o.value)).toEqual([...INCOTERMS_2020])
    for (const opt of INCOTERM_OPTIONS) {
      expect(opt.label).toBe(INCOTERM_LABEL[opt.value])
    }
  })

  it('isIncoterm2020 accepts canonical codes and rejects everything else', () => {
    for (const code of INCOTERMS_2020) expect(isIncoterm2020(code)).toBe(true)
    expect(isIncoterm2020('EXW')).toBe(true)
    // legacy / domestic / junk are out of scope
    expect(isIncoterm2020('DAT')).toBe(false) // 2010 code dropped in 2020
    expect(isIncoterm2020('exw')).toBe(false) // case-sensitive
    expect(isIncoterm2020('')).toBe(false)
    expect(isIncoterm2020(123)).toBe(false)
    expect(isIncoterm2020(null)).toBe(false)
    expect(isIncoterm2020(undefined)).toBe(false)
  })
})
