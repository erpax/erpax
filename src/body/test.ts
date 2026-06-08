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
  recordBodyOnPath,
} from '@/body'
import { UNITY } from '@/wave'
import { HORO_DIGITS } from '@/horo'
import { finishedIdeaCrossed } from '@/seal'
import { deriveDiamond } from '@/diamond'
import { deriveFolderModel, buildReadmeCorpusContext, buildReadmeTypographyGraph } from '@/readme'

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

describe('body — path ledger hook', () => {
  it('recordBodyOnPath — content-addressed append-only entry', () => {
    const a = recordBodyOnPath({ kind: 'test' }, '2026-06-08T12:00:00.000Z', null, 0)
    const b = recordBodyOnPath({ kind: 'test' }, '2026-06-08T12:00:00.000Z', null, 0)
    expect(a.entryUuid).toBe(b.entryUuid)
    expect(a.atomPath).toBe('body')
  })
})

describe('body — finishedIdeaCrossed', () => {
  const cwd = process.cwd()
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)

  it.each(['body', 'body/heart', 'body/brain', 'body/abdomen', 'body/anatomy'] as const)(
    '%s crosses after trinity collapse',
    (atomPath) => {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    const model = deriveDiamond(atomPath)
    const cross = finishedIdeaCrossed({
      ...model,
      trinity: { form: folder.form, code: folder.code, proof: folder.proof },
      sealed: folder.sealed,
    })
    expect(folder.sealed).toBe(true)
    expect(folder.form).toBe(1)
    expect(folder.code).toBe(1)
    expect(folder.proof).toBe(1)
    expect(cross.crossed).toBe(true)
    expect(cross.impurities).toEqual([])
  })
})
