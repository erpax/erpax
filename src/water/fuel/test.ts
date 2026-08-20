import { describe, expect, it } from 'vitest'

import { overUnityWitness } from '../cycle/index'
import {
  AERATION_KWH_PER_LITRE,
  COD_KJ_PER_G,
  EFFLUENTS,
  ROUTES,
  breakEvenCod,
  chemicalKJPerLitre,
  harvest,
  netPositiveWitness,
} from './index'

const routeNamed = (name: string) => ROUTES.find((r) => r.name === name)!
const effluentNamed = (name: string) => EFFLUENTS.find((e) => e.name === name)!

describe('water/fuel — the contaminant is the fuel', () => {
  it('THE contrast: the splitting cycle cannot generate, this one can', () => {
    // same shape of search, opposite answer — that is the whole finding
    expect(overUnityWitness()).toBeUndefined()
    expect(netPositiveWitness()).toBeDefined()
    expect(netPositiveWitness()?.generatesNet).toBe(true)
  })

  it('COD is the fuel content, so energy scales linearly with filth', () => {
    const dirty = chemicalKJPerLitre({ name: 'x', codGramsPerLitre: 10 })
    const filthier = chemicalKJPerLitre({ name: 'x', codGramsPerLitre: 20 })
    expect(filthier).toBeCloseTo(dirty * 2, 6)
    expect(dirty).toBeCloseTo(10 * COD_KJ_PER_G, 6)
  })

  it('a route cannot reach COD it cannot degrade', () => {
    const mfc = routeNamed('microbial fuel cell')
    const sco = routeNamed('supercritical oxidation')
    expect(mfc.biodegradable).toBeLessThan(1)
    expect(sco.biodegradable).toBe(1) // heat and pressure reach the refractory fraction
  })

  it('municipal sewage sits at the knife-edge, which is where real plants sit', () => {
    const sewage = effluentNamed('municipal sewage')
    const chp = routeNamed('digestion + CHP')
    const h = harvest(sewage, chp)
    expect(h.generatesNet).toBe(true)
    expect(h.timesAeration).toBeGreaterThan(1)
    expect(h.timesAeration).toBeLessThan(1.5) // marginal, not abundant — as measured in the field
    // and the weakest route does NOT clear it
    expect(harvest(sewage, routeNamed('microbial fuel cell')).generatesNet).toBe(false)
  })

  it('industrial effluent is not marginal — it exports by an order of magnitude', () => {
    const h = harvest(effluentNamed('brewery effluent'), routeNamed('digestion + CHP'))
    expect(h.timesAeration).toBeGreaterThan(40)
    expect(h.netKwh).toBeGreaterThan(0)
  })

  it('break-even COD is the threshold the whole design turns on', () => {
    for (const r of ROUTES) {
      const cod = breakEvenCod(r)
      const at = harvest({ name: 'at', codGramsPerLitre: cod }, r)
      expect(at.harvestedKwh).toBeCloseTo(AERATION_KWH_PER_LITRE, 9)
      expect(harvest({ name: 'below', codGramsPerLitre: cod * 0.9 }, r).generatesNet).toBe(false)
      expect(harvest({ name: 'above', codGramsPerLitre: cod * 1.1 }, r).generatesNet).toBe(true)
    }
  })

  it('a better route lowers the threshold — it does not raise the ceiling on a clean feed', () => {
    const mfc = breakEvenCod(routeNamed('microbial fuel cell'))
    const sco = breakEvenCod(routeNamed('supercritical oxidation'))
    expect(sco).toBeLessThan(mfc)
    // distilled water has no COD, so no route makes it a fuel
    expect(harvest({ name: 'distilled', codGramsPerLitre: 0 }, routeNamed('supercritical oxidation')).generatesNet).toBe(false)
  })
})
