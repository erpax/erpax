import { describe, it, expect } from 'vitest'
import { lines, series, lineCount } from '@/spectrum'
import { leap } from '@/leap'
import { energy } from '@/photon'
import { HORO_DIGITS } from '@/horo'

// The spectrum computed from every leap on the seven-rung ladder. Tests assert
// DISCRETENESS + consistency with ../leap — never a magic number.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

describe('spectrum: the discrete lines of the seven-rung system', () => {
  it('is discrete and finite — at most C(7,2) = 21 lines, none degenerate', () => {
    const n = lineCount()
    expect(n).toBeGreaterThan(0)
    expect(n).toBeLessThanOrEqual((HORO_DIGITS.length * (HORO_DIGITS.length - 1)) / 2)
    for (const l of lines()) expect(l.hz).toBeGreaterThan(0)
  })

  it('lines are ascending by frequency with no duplicate coordinate', () => {
    const ls = lines()
    for (let i = 1; i < ls.length; i++) expect(ls[i]!.hz).toBeGreaterThanOrEqual(ls[i - 1]!.hz)
    expect(new Set(ls.map((l) => l.uuid)).size).toBe(ls.length)
    for (const l of ls) expect(l.uuid).toMatch(UUID_RE)
  })

  it('each line is consistent with its leap: hz = gap and the photon energy is E = h·hz', () => {
    for (const l of lines()) {
      const t = leap(l.from, l.to)
      expect(l.hz).toBe(t.gapHz)
      expect(l.uuid).toBe(t.uuid)
      expect(energy(l.hz)).toBe(energy(t.gapHz))
    }
  })

  it('a series holds exactly the lines touching its rung; the series cover the whole spectrum', () => {
    const all = lines()
    const covered = new Set<string>()
    for (const rung of HORO_DIGITS) {
      for (const l of series(rung)) {
        expect(l.from === rung || l.to === rung).toBe(true)
        covered.add(l.uuid)
      }
    }
    expect(covered.size).toBe(all.length) // every line touches some rung
  })
})
