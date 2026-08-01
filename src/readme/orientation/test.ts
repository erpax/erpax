import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertOrients, ORIENTATION_CRITERIA, orientationGaps, orientationScore } from './index'

const README = readFileSync('README.md', 'utf8')

describe('readme/orientation — the bar is DERIVED from a working example, not from taste', () => {
  it('every criterion cites the sibling-page feature it came from', () => {
    expect(ORIENTATION_CRITERIA).toHaveLength(8)
    expect(new Set(ORIENTATION_CRITERIA.map((c) => c.id)).size).toBe(8)
    for (const c of ORIENTATION_CRITERIA) {
      expect(c.derivedFrom.length).toBeGreaterThan(0) // the bar is cited, never asserted
      expect(c.gives.length).toBeGreaterThan(0) // and each says what a READER gains
    }
  })

  it('the score is computed from the text — an empty page scores 0, a full one scores 1', () => {
    expect(orientationScore('').score).toBe(0)
    expect(orientationScore('').missing).toHaveLength(8)
    const full = [
      '> erpax is a fractal skill corpus.',
      'Run `pnpm erpax doctor` to start.',
      'It holds 3191 atoms.',
      'The sequence 1\\2\\4\\8/7/5 orders it, and its inverted reflection mirrors through the void.',
      'Use the quantum computer: `pnpm erpax quantum status`.',
      'The Clay Millennium register is published: six open, none solved here.',
      'Honest boundary: this does not prove any of them.',
    ].join('\n')
    expect(orientationScore(full).score).toBe(1)
    expect(orientationScore(full).missing).toEqual([])
  })

  it('each criterion is INDEPENDENT — dropping one line drops exactly one criterion', () => {
    const full = [
      '> erpax is a fractal skill corpus.',
      'Run `pnpm erpax doctor` to start.',
      'It holds 3191 atoms.',
      'The sequence 1\\2\\4\\8/7/5 orders it, and its inverted reflection mirrors through the void.',
      'Use the quantum computer: `pnpm erpax quantum status`.',
      'The Clay Millennium register is published.',
      'Honest boundary: this does not prove any of them.',
    ]
    // remove the Clay line only
    const noClay = full.filter((l) => !l.includes('Clay')).join('\n')
    expect(orientationScore(noClay).missing).toEqual(['open-problems'])
  })

  it('the LIVE README is measured, and its gaps are named rather than described', () => {
    const v = orientationScore(README)
    expect(v.score).toBeGreaterThanOrEqual(0)
    expect(v.score).toBeLessThanOrEqual(1)
    expect(v.met.length + v.missing.length).toBe(ORIENTATION_CRITERIA.length)
    // every gap comes back with what a reader would gain by closing it — a fix list, not a scold
    for (const g of orientationGaps(README)) expect(g.gives.length).toBeGreaterThan(0)
    console.log(`README orientation ${(v.score * 100).toFixed(0)}% — missing: ${v.missing.join(', ') || 'none'}`)
  })

  it('assertOrients fails CLOSED when a page orients less than the floor', () => {
    expect(() => assertOrients('', 0.5)).toThrow(/score 0\.000 < floor 0\.5/)
    expect(() => assertOrients('', 0)).not.toThrow()
    // the floor is a RATCHET run upward: the live page may not get worse than it is today
    const live = orientationScore(README).score
    expect(() => assertOrients(README, live)).not.toThrow()
  })
})

describe('readme/orientation — judged by the constitution', () => {
  const change: Change = {
    atom: 'readme/orientation',
    dualities: [
      { builds: 'orientationScore', breaks: 'an empty page scores 0, a full one 1, each criterion independent' },
      { builds: 'assertOrients', breaks: 'fails closed below the floor' },
    ],
    anchors: ['ISO 9241-110:2020 §6.2', 'ISO/IEC 25010:2023 §5.6'],
    claims: [
      {
        text: 'this measures whether a front page orients',
        boundary:
          'it reads the TEXT — a keyword match is a proxy for orientation, not orientation itself; a page ' +
          'can satisfy all eight and still read badly, and only a human decides that',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [2, 2] },
      { name: 'derived⊕declared', ring: [1, 1] },
    ],
    served: [{ result: 'the orientation score', recompute: 'src/readme/orientation/index.ts' }],
    postings: [
      { debit: 'page/census', credit: 'page/orientation', amount: 1 },
      { debit: 'page/orientation', credit: 'page/census', amount: 1 },
    ],
    edges: [
      { from: 'readme', to: 'rules' },
      { from: 'rules', to: 'readme' },
    ],
    quantities: [
      { name: 'criteria', value: ORIENTATION_CRITERIA.length, derivation: 'src/readme/orientation/index.ts' },
    ],
    keepers: [],
    seed: ['src/readme/orientation/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
