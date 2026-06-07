import { describe, it, expect } from 'vitest'
import {
  ORGANS,
  organWave,
  organSignal,
  allHealthy,
  dissonant,
  fullSpectrum,
  restsAtUnity,
  harmony,
  harmonizes,
  chord,
} from '@/body'
import { UNITY } from '@/wave'
import { HORO_DIGITS } from '@/horo'

describe('body — the eight organs', () => {
  it('carries all eight organs, each with a verdict and a distinct ordinal', () => {
    expect(ORGANS).toHaveLength(8)
    expect(new Set(ORGANS.map((o) => o.ordinal)).size).toBe(8)
    expect(new Set(ORGANS.map((o) => o.name)).size).toBe(8)
  })
  it('each organ sounds a note + colour through the wave/signal mechanism', () => {
    for (const o of ORGANS) {
      const s = organSignal(o)
      expect(s.step).toBe(organWave(o).step)
      expect(s.note).toMatch(/^[A-G]$/)
      expect(s.hz).toBeGreaterThan(0)
    }
  })
})

describe('body — harmonization (healthy ⊕ full-spectrum ⊕ unity)', () => {
  it('every organ is healthy — no dissonant gap', () => {
    expect(dissonant()).toEqual([])
    expect(allHealthy()).toBe(true)
  })
  it('the organs span all seven ring positions — the full-spectrum chord', () => {
    const sounded = new Set(ORGANS.map((o) => organWave(o).step))
    for (const d of HORO_DIGITS) expect(sounded.has(d), `position ${d}`).toBe(true)
    expect(fullSpectrum()).toBe(true)
  })
  it('composed as waves, the organs rest at unity — the closing wave', () => {
    expect(restsAtUnity()).toBe(true)
  })
})

describe('body — the conjunction', () => {
  it('every harmony condition is true', () => {
    for (const [k, v] of Object.entries(harmony())) expect(v, k).toBe(true)
  })
  it('the organs harmonize into one body', () => {
    expect(harmonizes()).toBe(true)
  })
  it('the chord names every organ with its note + hex', () => {
    const c = chord()
    expect(c).toHaveLength(8)
    expect(c.map((x) => x.organ)).toEqual(ORGANS.map((o) => o.name))
    expect(c[0]!.note).toBe('C') // the heart is the root (Do)
  })
})

describe('body — dissonance on a gap (harmony is not free)', () => {
  it('UNITY is the closing position', () => {
    expect(UNITY).toBe(9)
  })
  it('the chord covers a full octave: root C … back to C', () => {
    const notes = chord().map((c) => c.note)
    expect(notes[0]).toBe('C')
    expect(notes[notes.length - 1]).toBe('C') // the 8th organ closes the octave
  })
})
