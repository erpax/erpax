import { describe, it, expect } from 'vitest'
import {
  iso27002Title,
  iso27002Theme,
  ISO_27002_CATALOG,
  isIso27002ControlId,
  parseIso27002ControlId,
  resolveCoverage,
  coverageByTheme,
  aggregateCoverage,
} from '@/iso/27002'

// ISO 27002:2022 — control catalog + coverage matrix.
describe('iso/27002 — catalog lookups', () => {
  it('titles + themes resolve for known ids', () => {
    expect(iso27002Title('5.23')).toBe('Information security for use of cloud services')
    expect(iso27002Theme('5.23')).toBe('organizational')
    expect(iso27002Theme('8.15')).toBe('technological')
  })

  it('the catalog is the full TITLES list, each row id↔title↔theme consistent', () => {
    expect(ISO_27002_CATALOG.length).toBe(18)
    for (const row of ISO_27002_CATALOG) {
      expect(row.title).toBe(iso27002Title(row.id))
      expect(row.theme).toBe(iso27002Theme(row.id))
    }
  })
})

describe('iso/27002 — id guards', () => {
  it('isIso27002ControlId accepts canonical form only', () => {
    expect(isIso27002ControlId('8.3')).toBe(true)
    expect(isIso27002ControlId('A.8.3')).toBe(false)
    expect(isIso27002ControlId('9.99')).toBe(false)
  })

  it('parseIso27002ControlId strips A. / § prefixes to the canonical id', () => {
    expect(parseIso27002ControlId('A.5.23')).toBe('5.23')
    expect(parseIso27002ControlId('§5.23')).toBe('5.23')
    expect(parseIso27002ControlId('5.23')).toBe('5.23')
    expect(parseIso27002ControlId('A.9.99')).toBeNull()
    expect(parseIso27002ControlId(42)).toBeNull()
  })
})

describe('iso/27002 — coverage', () => {
  it('resolveCoverage preserves input order and resolves rows', () => {
    const rows = resolveCoverage(['8.15', '5.4'])
    expect(rows.map((r) => r.id)).toEqual(['8.15', '5.4'])
    expect(rows[0]).toEqual({ id: '8.15', title: 'Logging', theme: 'technological' })
  })

  it('coverageByTheme groups rows by theme', () => {
    const grouped = coverageByTheme(resolveCoverage(['8.15', '5.4']))
    expect(grouped.technological?.map((r) => r.id)).toEqual(['8.15'])
    expect(grouped.organizational?.map((r) => r.id)).toEqual(['5.4'])
  })

  it('aggregateCoverage deduplicates across inputs, first-seen order', () => {
    const rows = aggregateCoverage([
      ['5.4', '8.15'],
      ['8.15', '8.3'],
    ])
    expect(rows.map((r) => r.id)).toEqual(['5.4', '8.15', '8.3'])
  })
})
