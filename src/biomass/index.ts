/**
 * biomass -- the living STOCK carried at IAS-41 fair value, COMPUTED from mass × price.
 *
 * biomass is the total live mass of a non-individuated stock (an aquaculture pen,
 * a forest stand, a bee colony). IAS-41 carries it at fair-value-less-costs-to-sell
 * = mass × forward price − costs to sell, and splits the period change into biological
 * transformation (growth — a mass change) vs price change. Forestry's mean annual
 * increment = standing volume / stand age. Stocking density (mass / area) is the
 * carrying-capacity measure that sustainability bounds.
 *
 *   tsx src/biomass/index.ts
 *
 * @standard IFRS IAS-41 — biological assets: fair-value-less-costs-to-sell; transformation-vs-price split
 * @standard FAO — forest growth-and-yield / mean annual increment (MAI)
 * @audit computed, never hand-asserted
 * @see ../sustainability ../ecosystem ../capacity ../harvest ../measure
 */

/** Standing stock: total live mass of a stock (IAS-41 base unit). n × mean mass. */
export const standingStock = (individuals: number, meanMass: number): number =>
  individuals * meanMass

/**
 * IAS-41 fair value: biomass × forward price − costs to sell.
 * Positive = asset recognised on the balance sheet.
 */
export const fairValue = (biomass: number, forwardPrice: number, costsToSell: number): number =>
  biomass * forwardPrice - costsToSell

/**
 * Biological transformation: the mass change over a period (IAS-41 split from price change).
 * Positive = growth; negative = mortality drawdown.
 */
export const biologicalTransformation = (massStart: number, massEnd: number): number =>
  massEnd - massStart

/**
 * Mean annual increment (forestry, FAO): standing volume / stand age.
 * Returns 0 when age ≤ 0 (undefined / pre-establishment).
 */
export const meanAnnualIncrement = (volume: number, age: number): number =>
  age <= 0 ? 0 : volume / age

/**
 * Stocking density: biomass / area — the carrying-capacity measure sustainability bounds.
 * Returns 0 when area ≤ 0 (undefined / point stock).
 */
export const stockingDensity = (biomass: number, area: number): number =>
  area <= 0 ? 0 : biomass / area

if (import.meta.url === 'file://' + process.argv[1]) {
  const individuals = 1_000
  const meanMass = 2.5
  const stock = standingStock(individuals, meanMass)
  const fv = fairValue(stock, 4, 500)
  const growth = biologicalTransformation(100, 140)
  const mai = meanAnnualIncrement(300, 30)
  const density = stockingDensity(stock, 1_000)

  console.log('biomass demo:')
  console.log('  standingStock(' + individuals + ', ' + meanMass + ') = ' + stock + ' kg')
  console.log('  fairValue(' + stock + ', 4, 500) = ' + fv + '  (IAS-41)')
  console.log('  biologicalTransformation(100→140) = ' + growth + ' kg (growth)')
  console.log('  meanAnnualIncrement(300 m³, 30 yr) = ' + mai + ' m³/yr (MAI)')
  console.log('  stockingDensity(' + stock + ' kg, 1000 m²) = ' + density + ' kg/m²')
}
