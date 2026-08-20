import { describe, it, expect } from 'vitest'
import { exactRound } from '@/algebra'
import {
  cycleMole, overUnityWitness, inputMJPerLitre, versusReverseOsmosis, storageYield,
  SPLIT_KJ_PER_MOL, HHV_KJ_PER_MOL, LHV_KJ_PER_MOL, MOL_PER_LITRE, RO_MJ_PER_LITRE,
  reversibleVoltage, landauerKJPerMol, photonPath,
  plantSpec, marginalWaterCostKwh, splitProducts,
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

describe('water/cycle — "at quantum scale" is where the constraint COMES FROM', () => {
  it('the reversible voltage is 1.229 V — the floor every real cell exceeds', () => {
    // ΔG/(2F). A quantum result: it IS the electronic-structure answer for O–H.
    expect(reversibleVoltage()).toBeCloseTo(1.229, 3)
  })

  it('a Maxwell demon pays Landauer, and cannot mint the bond energy', () => {
    // Any scheme that SORTS by measuring must erase, at kT ln2 per bit. Erasure is
    // a cost, not a source — and the bond energy dwarfs it by two orders anyway.
    const floor = landauerKJPerMol(298)
    expect(floor).toBeGreaterThan(0)
    expect(SPLIT_KJ_PER_MOL / floor).toBeGreaterThan(100)
  })

  it('the Landauer floor RISES with temperature — no cold trick escapes it either', () => {
    expect(landauerKJPerMol(400)).toBeGreaterThan(landauerKJPerMol(200))
  })

  it('photocatalysis changes the PATH, and can beat the two-step', () => {
    // The real headroom: photons split directly, skipping generator + electrical
    // stage. Lab STH records (~19–30%) exceed PV 22% × electrolyser 80% = 17.6%.
    expect(photonPath(0.19).beatsTwoStep).toBe(true)
    expect(photonPath(0.10).beatsTwoStep).toBe(false)
    expect(photonPath(0.19).twoStep).toBeCloseTo(0.176, 3)
  })

  it('but the photon path is still not GENERATION — the sun pays every joule', () => {
    // Efficiency is measured against incident light; nothing here returns more than
    // it received, which is the whole claim under test.
    for (const sth of [0.1, 0.19, 0.3, 0.99]) expect(photonPath(sth).sth).toBeLessThan(1)
  })

  it('the plant is sized by storage duty and the water follows from it', () => {
    const eff = { electrolyser: 0.8, engine: 0.6, generator: 1, condensing: true }
    const spec = plantSpec(100, 8, eff)
    expect(spec.kwhCharged).toBe(800_000)
    expect(exactRound(spec.litresPerDay)).toBe(145_658)
    expect(exactRound(spec.peopleServed)).toBe(7283)
    // returned is the round-trip fraction of charged — no energy appears
    expect(spec.kwhReturned).toBeLessThan(spec.kwhCharged)
    expect(spec.kwhReturned / spec.kwhCharged).toBeCloseTo(cycleMole(eff).roundTrip, 6)
  })

  it('the litre is free at the margin ONLY when storage is the reason the plant runs', () => {
    const eff = { electrolyser: 0.8, engine: 0.6, generator: 1, condensing: true }
    expect(marginalWaterCostKwh(eff, true)).toBe(0)
    expect(marginalWaterCostKwh(eff, false)).toBeGreaterThan(2)
    // and charging it to purification alone is what makes the loop absurd
    expect(versusReverseOsmosis(eff).timesWorse).toBeGreaterThan(1000)
  })

  it('what a split litre becomes, and what burning it back exhausts', () => {
    const p = splitProducts(1)
    expect(p.moleRatioH2ToO2).toBeCloseTo(2, 9)          // 2:1 by volume — self-stoichiometric
    expect(p.gramsOxygen / p.gramsHydrogen).toBeCloseTo(7.94, 2) // ~1:8 by mass
    expect(p.massFractionHydrogen).toBeCloseTo(0.1119, 4)
    expect(p.massClosesExactly).toBe(true)
    expect(p.exhaustGramsWater).toBeCloseTo(p.gramsWater, 6) // the exhaust IS the feed
  })

  it('the gas is 1861x the volume of the water it came from', () => {
    const p = splitProducts(1)
    expect(exactRound(p.litresHydrogenStp + p.litresOxygenStp)).toBe(1861)
    expect(exactRound(p.litresHydrogenStp)).toBe(1240)
    expect(exactRound(p.litresOxygenStp)).toBe(620)
  })

  it('scaling is linear and mass still closes', () => {
    const ten = splitProducts(10)
    expect(ten.molesWater).toBeCloseTo(splitProducts(1).molesWater * 10, 6)
    expect(ten.massClosesExactly).toBe(true)
  })
})
