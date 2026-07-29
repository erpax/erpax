import { algebraExp, PI } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { lines, series, lineCount, wickFold, deSitterPeriod, deSitterTemperature } from '@/spectrum'
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

  // The Wick-rotation fold: one spectral energy, three physics — QM · thermodynamics · de Sitter.
  describe('wickFold — one spectrum three ways (QM ↔ thermo ↔ de Sitter horizon)', () => {
    it('reads one energy three ways: the real-time propagator at t = −iβ IS the thermal weight e^{−βE}', () => {
      const E = 2, beta = 0.5
      const w = wickFold(E, beta)
      expect(w.frequency).toBe(E) // QUANTUM: ω = E, the oscillation e^{−iEt}
      // exponent −iE·t at t = −iβ  →  −iE(−iβ) = i²Eβ = −Eβ, so e^{−Eβ} — Wick, exact
      expect(w.boltzmann).toBeCloseTo(algebraExp(-beta * E), 12)
      expect(w.temperature).toBe(1 / beta) // T = 1/β
    })

    it('KMS periodicity: a shift of imaginary time by β multiplies by exactly the Boltzmann factor (thermal equilibrium)', () => {
      const E = 1.7, beta = 0.8, tau = 0.3
      const ratio = algebraExp(-(tau + beta) * E) / algebraExp(-tau * E)
      expect(ratio).toBeCloseTo(wickFold(E, beta).boltzmann, 12) // e^{−βE} — periodicity ⇔ temperature
    })

    it('de Sitter closes the fold: horizon imaginary-time period 2π/H ⇒ Gibbons–Hawking T_dS = H/2π', () => {
      const H = 3
      expect(deSitterPeriod(H)).toBeCloseTo((2 * PI) / H, 12)
      expect(deSitterTemperature(H)).toBeCloseTo(H / (2 * PI), 12)
      // the de Sitter temperature IS the Wick temperature evaluated at the horizon period — the same fold
      expect(wickFold(1, deSitterPeriod(H)).temperature).toBeCloseTo(deSitterTemperature(H), 12)
    })
  })
})
