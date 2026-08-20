import { describe, it, expect } from 'vitest'
import {
  cycleMole, overUnityWitness, inputMJPerLitre, versusReverseOsmosis, storageYield,
  SPLIT_KJ_PER_MOL, HHV_KJ_PER_MOL, LHV_KJ_PER_MOL, MOL_PER_LITRE, RO_MJ_PER_LITRE,
} from './index'

const FUEL_CELL = { electrolyser: 0.8, engine: 0.6, generator: 1, condensing: true }
const ICE = { electrolyser: 0.8, engine: 0.4, generator: 0.95 }

describe('water/cycle — Hess’s law, as a refusal', () => {
  it('splitting costs exactly what condensing combustion returns', () => {
    // Same start state, same end state ⇒ the enthalpies cancel. Not an engineering
    // limit; an identity. This is why no device arrangement can win.
    expect(HHV_KJ_PER_MOL).toBe(SPLIT_KJ_PER_MOL)
  })

  it('NO efficiency triple in the whole space generates net energy', () => {
    // Searched, not asserted: 8000 combinations of (electrolyser, engine, generator).
    expect(overUnityWitness(0.05)).toBeUndefined()
  })

  it('breaks even only in the perfect limit, and never exceeds it', () => {
    const perfect = cycleMole({ electrolyser: 1, engine: 1, generator: 1, condensing: true })
    expect(perfect.roundTrip).toBe(1)
    expect(perfect.generatesNet).toBe(false)
  })

  it('every real arrangement loses, and the loss is the point', () => {
    for (const eff of [FUEL_CELL, ICE]) {
      const v = cycleMole(eff)
      expect(v.roundTrip).toBeLessThan(1)
      expect(v.netKJ).toBeLessThan(0)
      expect(v.generatesNet).toBe(false)
    }
  })

  it('an engine exhausting VAPOUR cannot even reach the condensing case', () => {
    expect(LHV_KJ_PER_MOL).toBeLessThan(HHV_KJ_PER_MOL)
    expect(cycleMole({ ...ICE, condensing: true }).outKJ).toBeGreaterThan(cycleMole(ICE).outKJ)
  })
})

describe('water/cycle — what it costs as a purifier', () => {
  it('needs ~19.8 MJ per litre — three orders above reverse osmosis', () => {
    const r = versusReverseOsmosis(FUEL_CELL)
    expect(r.loopMJ).toBeCloseTo(19.8, 1)
    expect(r.roMJ).toBe(RO_MJ_PER_LITRE)
    expect(r.timesWorse).toBeGreaterThan(1000)
  })

  it('the purification cost does not depend on the ENGINE — only on splitting', () => {
    // A better engine recovers more energy; it does not make the water cheaper.
    expect(inputMJPerLitre(FUEL_CELL)).toBeCloseTo(inputMJPerLitre(ICE), 6)
  })

  it('one litre is one litre — the water is conserved, only the energy is spent', () => {
    expect(storageYield(FUEL_CELL).potableLitres).toBe(1)
    expect(MOL_PER_LITRE).toBeCloseTo(55.34, 2)
  })
})

describe('water/cycle — the honest framing is STORAGE', () => {
  it('recovers less than it stores, always', () => {
    const y = storageYield(FUEL_CELL)
    expect(y.recoverableKJ).toBeLessThan(y.storedKJ)
    expect(y.recoverableKJ).toBeGreaterThan(0)
  })

  it('a fuel cell beats a combustion engine — the only lever that exists', () => {
    // Nothing changes the thermodynamics; the device choice changes only the losses.
    expect(cycleMole(FUEL_CELL).roundTrip).toBeGreaterThan(cycleMole(ICE).roundTrip)
  })
})
