/**
 * fuel — the contaminant is the fuel, and the water is the product.
 *
 * The inverse of [[water]]/cycle. That loop splits water and burns it back, so
 * it can never generate: start state and end state are the same, and Hess's
 * law closes it. This one never touches the water at all. It oxidises the
 * REDUCED CARBON dissolved in it — sewage, food waste, brewery effluent — and
 * the water leaves as vapour because water is what oxidised carbon and
 * hydrogen produce.
 *
 * So the sign flips. In the cycle, purity costs energy. Here, purity RELEASES
 * it, and the dirtier the feed the more there is.
 */

/**
 * Chemical oxygen demand is not a proxy for the fuel content — it IS the fuel
 * content, measured as the oxygen needed to burn what is dissolved.
 */
export const COD_KJ_PER_G = 13.9

/** Conventional activated-sludge aeration — what treating a litre costs today. */
export const AERATION_KWH_PER_LITRE = 0.00045

export interface Effluent {
  readonly name: string
  readonly codGramsPerLitre: number
}

/** Representative loads, declared so they can be argued with. */
export const EFFLUENTS: readonly Effluent[] = [
  { name: 'municipal sewage', codGramsPerLitre: 0.5 },
  { name: 'food processing', codGramsPerLitre: 5 },
  { name: 'brewery effluent', codGramsPerLitre: 20 },
  { name: 'landfill leachate', codGramsPerLitre: 50 },
]

export interface HarvestRoute {
  readonly name: string
  /** chemical energy → electricity */
  readonly electrical: number
  /** the fraction of COD this route can reach */
  readonly biodegradable: number
}

export const ROUTES: readonly HarvestRoute[] = [
  { name: 'microbial fuel cell', electrical: 0.2, biodegradable: 0.7 },
  { name: 'digestion + CHP', electrical: 0.35, biodegradable: 0.7 },
  { name: 'supercritical oxidation', electrical: 0.3, biodegradable: 1 },
]

/** The fuel in one litre, before any device gets to it. */
export function chemicalKJPerLitre(effluent: Effluent): number {
  return effluent.codGramsPerLitre * COD_KJ_PER_G
}

export interface Harvest {
  readonly effluent: string
  readonly route: string
  readonly chemicalKJ: number
  readonly harvestedKwh: number
  readonly treatmentKwh: number
  readonly netKwh: number
  /** unlike the cycle, this CAN be true */
  readonly generatesNet: boolean
  /** harvested ÷ what conventional treatment spends */
  readonly timesAeration: number
}

export function harvest(effluent: Effluent, route: HarvestRoute): Harvest {
  const chemicalKJ = chemicalKJPerLitre(effluent)
  const harvestedKwh = (chemicalKJ * route.biodegradable * route.electrical) / 3600
  return {
    effluent: effluent.name,
    route: route.name,
    chemicalKJ,
    harvestedKwh,
    treatmentKwh: AERATION_KWH_PER_LITRE,
    netKwh: harvestedKwh - AERATION_KWH_PER_LITRE,
    generatesNet: harvestedKwh > AERATION_KWH_PER_LITRE,
    timesAeration: harvestedKwh / AERATION_KWH_PER_LITRE,
  }
}

/** The COD (g/L) at which a litre pays for its own treatment. */
export function breakEvenCod(route: HarvestRoute): number {
  return (AERATION_KWH_PER_LITRE * 3600) / (COD_KJ_PER_G * route.biodegradable * route.electrical)
}

/**
 * A witness that this loop DOES generate — the search that returns undefined
 * for the splitting cycle.
 *
 * @invariant ∃ effluent, route : harvested > treatment cost
 */
export function netPositiveWitness(): Harvest | undefined {
  for (const e of EFFLUENTS) for (const r of ROUTES) {
    const h = harvest(e, r)
    if (h.generatesNet) return h
  }
  return undefined
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('water/fuel — the contaminant is the fuel, the water is the exhaust')
  for (const e of EFFLUENTS) {
    console.log(`  ${e.name} (COD ${e.codGramsPerLitre} g/L = ${chemicalKJPerLitre(e).toFixed(1)} kJ/L)`)
    for (const r of ROUTES) {
      const h = harvest(e, r)
      console.log(
        `    ${r.name.padEnd(24)} ${h.harvestedKwh.toFixed(5)} kWh/L · ${h.timesAeration.toFixed(1)}× aeration · ${h.generatesNet ? 'EXPORTS' : 'consumes'}`,
      )
    }
  }
  console.log('\n  break-even COD:')
  for (const r of ROUTES)
    console.log(`    ${r.name.padEnd(24)} ${breakEvenCod(r).toFixed(3)} g/L`)
}
