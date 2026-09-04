import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  assertPhenomenaBacked,
  boostT,
  boostX,
  causalCharacter,
  composeVelocity,
  interval,
  phenomena,
  reversingFrame,
  sealable,
  simultaneousFrame,
  subluminal,
  unbackedPhenomena,
} from '@/quantum/interval'

/** Every subluminal rational frame with denominator up to `n`. */
const frames = (n: number): [number, number][] => {
  const out: [number, number][] = []
  for (let q = 1; q <= n; q++) for (let p = -q + 1; p < q; p++) out.push([p, q])
  return out
}

const separations = (n: number): [number, number][] => {
  const out: [number, number][] = []
  for (let t = -n; t <= n; t++) for (let x = -n; x <= n; x++) out.push([t, x])
  return out
}

describe('quantum/interval — the decidable core of special relativity', () => {
  it('the interval scales by exactly q² - p², and that factor is positive', () => {
    for (const [p, q] of frames(6)) {
      for (const [t, x] of separations(5)) {
        expect(interval(boostT(p, q, t, x), boostX(p, q, t, x))).toBe((q * q - p * p) * interval(t, x))
      }
      expect(q * q - p * p).toBeGreaterThan(0)
    }
  })

  it('causal character is absolute — no boost moves an event across the light cone', () => {
    for (const [t, x] of separations(6)) {
      const here = causalCharacter(t, x)
      for (const [p, q] of frames(7)) {
        expect(causalCharacter(boostT(p, q, t, x), boostX(p, q, t, x))).toBe(here)
      }
    }
  })

  it('TIMELIKE order is the same for every observer — the ledger theorem', () => {
    for (const [t, x] of separations(7)) {
      if (!sealable(t, x)) continue
      for (const [p, q] of frames(16)) expect(boostT(p, q, t, x)).toBeGreaterThan(0)
    }
  })

  it('null separation IS sealable — a light signal carries causation, so its order is absolute', () => {
    for (let t = 1; t <= 9; t++) {
      for (const x of [t, -t]) {
        expect(causalCharacter(t, x)).toBe('null')
        expect(sealable(t, x)).toBe(true)
        for (const [p, q] of frames(16)) expect(boostT(p, q, t, x)).toBeGreaterThan(0)
      }
    }
  })

  it('SPACELIKE order is not — the reversing frame is exhibited and it works', () => {
    for (let t = 1; t <= 8; t++) {
      for (let x = t + 1; x <= 12; x++) {
        expect(sealable(t, x)).toBe(false)
        const r = reversingFrame(t, x)!
        expect(subluminal(r.p, r.q)).toBe(true)
        expect(r.boosted).toBe(-x)
        expect(r.boosted).toBeLessThan(0) // the later event is now the earlier one
        const s = simultaneousFrame(t, x)!
        expect(subluminal(s.p, s.q)).toBe(true)
        expect(s.boosted).toBe(0) // …and a frame where they happen at once
      }
    }
  })

  // This test is what corrected the definition. `sealable` was written `x*x < t*t`, and the
  // frames agreed on the null separations it excluded — a light signal carries causation, so
  // the set is the CLOSED cone. The error was in the physics, and the exhaustion found it.
  it('`sealable` is EXACTLY the set on which all frames agree — no wider, no narrower', () => {
    for (const [t, x] of separations(7)) {
      // frames must be rich enough to CONTAIN the reversing boost (q = 2x); truncating the
      // frame set is how a narrow domain reports agreement that does not exist
      const agree = frames(2 * 7 + 2).every(([p, q]) => boostT(p, q, t, x) > 0)
      expect(sealable(t, x)).toBe(agree)
    }
  })

  it('composing two subluminal velocities never reaches c', () => {
    for (const [p1, q1] of frames(7)) {
      for (const [p2, q2] of frames(7)) {
        const [n, d] = composeVelocity(p1, q1, p2, q2)
        expect(subluminal(n, d)).toBe(true)
      }
    }
  })

  it('there is no frame at or above c', () => {
    expect(subluminal(1, 1)).toBe(false) // β = 1 exactly
    expect(subluminal(2, 1)).toBe(false) // β = 2
    expect(subluminal(-1, 1)).toBe(false)
    expect(subluminal(0, 0)).toBe(false)
  })

  // The verdict table is checked against the kernel file, so it cannot become prose. Planted,
  // not re-read: a claim-checker that fires on nothing proves nothing.
  it('fires on a PLANTED unbacked claim — a phenomenon citing a theorem that is not there', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-phys-'))
    mkdirSync(join(root, 'src/verify/lean'), { recursive: true })
    writeFileSync(join(root, 'src/verify/lean/Spacetime.lean'), 'theorem interval_scales : True := trivial\n')
    const bad = unbackedPhenomena(root)
    expect(bad.length).toBeGreaterThan(0)
    expect(bad.every((p) => p.note.startsWith('UNBACKED'))).toBe(true)
    expect(bad.some((p) => p.proof === 'interval_scales')).toBe(false) // that one IS present
    expect(() => assertPhenomenaBacked(root)).toThrow(/claim a theorem that does not exist/)
  })

  it('a missing kernel file leaves every theorem claim UNBACKED, never silently backed', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-phys-none-'))
    expect(unbackedPhenomena(root).length).toBe(phenomena(root).filter((p) => p.verdict === 'theorem').length)
  })

  it('the live table cites only theorems the kernel file actually states', () => {
    expect(unbackedPhenomena(process.cwd())).toEqual([])
    expect(() => assertPhenomenaBacked(process.cwd())).not.toThrow()
  })

  it('names what it REFUSES, so the absence is on the record', () => {
    const refused = phenomena().filter((p) => p.verdict === 'refused').map((p) => p.name)
    expect(refused.some((n) => n.includes('faster-than-light'))).toBe(true)
    expect(refused.some((n) => n.includes('entanglement'))).toBe(true)
    // and no refused claim carries a proof, which would be a contradiction in the table itself
    expect(phenomena().filter((p) => p.verdict !== 'theorem').every((p) => p.proof === null)).toBe(true)
  })
})
