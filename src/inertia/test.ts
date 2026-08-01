import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { cornerLimit } from '@/horo'

import {
  cheapest,
  EQUIVALENCE_BOUND,
  evasions,
  radiusForTolerance,
  render,
  speedForTolerance,
  STANDARD_GRAVITY,
  turnLoad,
} from './index'

/** A craft-scale corner: 1 tonne, 300 m/s, one metre of radius. */
const CORNER = { mass: 1000, speed: 300, radius: 1 } as const
/** Sustained human tolerance, in g — DECLARED, and the atom's numbers move when it does. */
const CREW_TOLERANCE = 9

describe('inertia — the corner bound on a body', () => {
  it('the SI-defined standard gravity, never a rounded 9.8', () => {
    expect(STANDARD_GRAVITY).toBe(9.80665)
  })

  it('F = m·v²/r — the load, computed', () => {
    const load = turnLoad(CORNER)
    expect(load.acceleration).toBe(90000) // 300² / 1
    expect(load.force).toBe(9e7) // 1000 kg × 90000
    expect(load.gees).toBeCloseTo(90000 / STANDARD_GRAVITY, 6)
    expect(load.gees).toBeGreaterThan(9000) // ~9177 g — three orders past any crew
  })

  it('a true vertex is unbounded, and at rest it is free — the two halves of the same law', () => {
    expect(turnLoad({ ...CORNER, radius: 0 }).force).toBe(Infinity)
    expect(turnLoad({ mass: 1000, speed: 0, radius: 0 }).force).toBe(0) // no speed, no force
    // and it agrees with horo's kinematic bound, arrived at from the other direction
    expect(cornerLimit(0, 1e12).maxSpeed).toBe(0)
    expect(speedForTolerance(1, CREW_TOLERANCE)).toBeCloseTo(cornerLimit(1, CREW_TOLERANCE * STANDARD_GRAVITY).maxSpeed, 9)
  })

  it('the radius a tolerance forces — a "corner" at 300 m/s is a kilometre wide', () => {
    const r = radiusForTolerance(300, CREW_TOLERANCE)
    expect(r).toBeCloseTo(90000 / (CREW_TOLERANCE * STANDARD_GRAVITY), 6)
    expect(r).toBeGreaterThan(1000) // ~1020 m — not a corner by any reading
    expect(radiusForTolerance(300, 0)).toBe(Infinity) // zero tolerance ⇒ no turn at all
  })

  it('rejects negative inputs rather than returning a number for them', () => {
    expect(() => turnLoad({ ...CORNER, mass: -1 })).toThrow(/negative/)
    expect(() => turnLoad({ ...CORNER, speed: -1 })).toThrow(/negative/)
    expect(() => turnLoad({ ...CORNER, radius: -1 })).toThrow(/negative/)
  })

  it('THE NUMBER: mass-reduction needs ~1e15× what measurement allows', () => {
    const e = evasions(CORNER, CREW_TOLERANCE).find((x) => x.id === 'reduced-inertial-mass')!
    expect(e.changes).toBe('inertial-mass')
    expect(e.bound).toBe(EQUIVALENCE_BOUND) // MICROSCOPE 2022, |η| ≲ 1e-15
    // to bring 9177 g down to 9 g, ~99.9% of inertial mass must not respond
    expect(e.required).toBeGreaterThan(0.99)
    expect(e.required).toBeLessThan(1)
    expect(e.status).toBe('refuted-at-bound')
    expect(e.exceedsBoundBy).toBeGreaterThan(1e14)
    expect(e.refutedBy).toMatch(/MICROSCOPE/)
  })

  it('an evasion with no experiment is LENSLESS — never "open", and never refuted', () => {
    const es = evasions(CORNER, CREW_TOLERANCE)
    const lensless = es.filter((e) => e.status === 'lensless')
    expect(lensless.map((e) => e.id)).toEqual(['no-proper-acceleration', 'not-a-rigid-body', 'not-a-corner'])
    // calling an unmeasured claim refuted would be judgment without measurement — rule 2
    for (const e of lensless) {
      expect(e.bound).toBeNull()
      expect(e.required).toBeNull()
      expect(e.refutedBy.length).toBeGreaterThan(20) // it still names what WOULD decide it
    }
  })

  it('every evasion names a refuting test — there is no evasion without one', () => {
    for (const e of evasions(CORNER, CREW_TOLERANCE)) {
      expect(e.refutedBy.trim().length).toBeGreaterThan(0)
      expect(e.mechanism.length).toBeGreaterThan(20)
    }
    // and the four exhaust the factors of F = m·v²/r
    expect(new Set(evasions(CORNER, CREW_TOLERANCE).map((e) => e.changes)).size).toBe(4)
  })

  it('ranked by what must be ASSUMED — a refuted mechanism sorts last, lensless is not promoted', () => {
    const ranked = cheapest(evasions(CORNER, CREW_TOLERANCE))
    expect(ranked[ranked.length - 1]!.id).toBe('reduced-inertial-mass')
    expect(ranked[ranked.length - 1]!.status).toBe('refuted-at-bound')
    // lensless comes first only because it assumes least — NOT because it is supported
    expect(ranked[0]!.status).toBe('lensless')
    expect(ranked[0]!.bound).toBeNull() // nothing measured stands behind it either
  })

  it('a gentle turn does NOT refute anything — the bound is not a foregone conclusion', () => {
    // 300 m/s through a 2 km radius is ~4.6 g: inside crew tolerance, no evasion needed
    const easy = evasions({ mass: 1000, speed: 300, radius: 2000 }, CREW_TOLERANCE).find((e) => e.id === 'reduced-inertial-mass')!
    expect(turnLoad({ mass: 1000, speed: 300, radius: 2000 }).gees).toBeLessThan(CREW_TOLERANCE)
    expect(easy.required).toBe(0) // nothing has to disappear
    expect(easy.status).toBe('within-bound')
  })

  it('the report carries the numbers, not adjectives', () => {
    const out = render(CORNER, CREW_TOLERANCE).join('\n')
    expect(out).toMatch(/lateral force\s+9\.00e\+7 N/)
    expect(out).toMatch(/needs 9\.99e\+14× its measured bound/)
    expect(out).toMatch(/1000 kg at 300 m\/s/)
    // it never names an object, an event, or a craft
    expect(out).not.toMatch(/UFO|UAP|alien|craft|sighting/i)
  })
})

describe('inertia — judged by the constitution', () => {
  const change: Change = {
    atom: 'inertia',
    dualities: [
      { builds: 'turnLoad', breaks: 'a true vertex reports Infinity, and at rest it reports 0' },
      { builds: 'evasions', breaks: 'an unmeasured evasion is lensless, never refuted' },
      { builds: 'cheapest', breaks: 'lensless ranks first for cheapness, and is not thereby supported' },
    ],
    // the NORMS the quantities answer to. MICROSCOPE is evidence, not a norm — it belongs in
    // `refutedBy` where it already is, and the legality law was right to refuse it here.
    anchors: [
      'ISO 80000-4:2019 — quantities and units, mechanics: force and acceleration',
      'NIST SP 811 §B.8 — standard acceleration of free fall, 9.80665 m/s²',
    ],
    claims: [
      {
        text: 'this decides how a right-angle manoeuvre could be performed',
        boundary:
          'it decides nothing of the kind. It computes what each hypothesis COSTS — the factor by ' +
          'which it must exceed its own measured bound — and three of the four have no measured ' +
          'bound at all, so they are lensless: undecided, not supported. No object, event or ' +
          'observation is identified anywhere in this atom, and no mechanism is proposed',
      },
      {
        text: 'mass-reduction is ruled out',
        boundary:
          'it is refuted AT THE MICROSCOPE BOUND, for this turn and this tolerance — a declared ' +
          'citation to apparatus this corpus does not own, and a bound that a future experiment may ' +
          'move. A gentler turn needs no evasion at all, which the test pins',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'computed⊕declared', ring: [2, 2] },
    ],
    served: [{ result: 'the evasion ranking', recompute: 'src/inertia/index.ts' }],
    postings: [
      { debit: 'hypothesis/claim', credit: 'experiment/bound', amount: 4 },
      { debit: 'experiment/bound', credit: 'hypothesis/claim', amount: 4 },
    ],
    edges: [
      { from: 'inertia', to: 'horo' },
      { from: 'horo', to: 'inertia' },
    ],
    quantities: [
      { name: 'g at 300 m/s through r=1m', value: 9177, derivation: 'src/inertia/index.ts' },
      { name: 'factor over the equivalence bound', value: 999000000000000, derivation: 'src/inertia/index.ts' },
    ],
    keepers: [],
    seed: ['src/inertia/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
