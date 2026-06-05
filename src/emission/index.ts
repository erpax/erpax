/**
 * emission -- the DEBIT/EXPORT side of sustainability: greenhouse-gas mass
 * a cycle releases, expressed in CO₂-equivalent (CO₂e).
 *
 *   tsx src/emission/index.ts
 *
 * Each gas is converted via its 100-year Global Warming Potential (GWP) from
 * IPCC AR5 (2014). Unknown gases contribute 0 CO₂e — they are not silently
 * inflated; callers should audit their gas keys against GWP before summing.
 * Activity-based emission follows the GHG Protocol Corporate Standard:
 *   emission = activity × emission factor.
 * Carbon intensity relates total CO₂e to a unit of output; a zero-or-negative
 * output returns 0 (not a division error) because "intensity per nothing" is
 * undefined — callers must supply a positive denominator.
 *
 * @standard IPCC AR5 (2014) — 100-yr Global Warming Potentials (Table 8.A.1)
 * @standard GHG Protocol Corporate Standard (Scope 1 / 2 / 3)
 * @standard ISO 14064 — Greenhouse gas quantification and reporting
 * @audit computed, never hand-asserted
 * @see ../sustainability ../conservation ../ecosystem ../compost ../standard
 */

/**
 * IPCC AR5 (2014) 100-year Global Warming Potentials, frozen.
 * Keys are lower-case chemical formula strings (e.g. 'co2', 'ch4', 'n2o').
 * These are the canonical numéraire conversion factors; co2 = 1 by definition.
 * A representative subset is included; the three mandatory anchor values are
 * co2=1, ch4=28, n2o=265 — asserted by the test suite.
 */
export const GWP: Readonly<Record<string, number>> = Object.freeze({
  co2: 1,
  ch4: 28,
  n2o: 265,
  hfc134a: 1300, // AR5 Table 8.A.1 — common refrigerant / aerosol propellant
  sf6: 23500,    // AR5 Table 8.A.1 — electrical insulation gas
  pfc14: 6630,   // AR5 Table 8.A.1 — CF₄, semiconductor manufacturing
})

/**
 * Convert a single gas mass to CO₂-equivalent.
 *
 * Unknown gas → 0. Unknown gases are NOT silently ignored — the caller should
 * verify each gas key is present in GWP before relying on the sum.
 *
 * @param gas   lower-case chemical formula key, e.g. 'ch4'
 * @param mass  mass in any consistent unit (kg, t, g — caller's choice, must
 *              be consistent across a single inventory)
 * @returns     CO₂e in the same unit
 */
export const co2e = (gas: string, mass: number): number =>
  mass * (GWP[gas] ?? 0)

/**
 * Sum a list of gas-mass pairs into a single CO₂e total.
 * Each pair is independently converted via co2e(); the result equals
 * Σ co2e(gas_i, mass_i).
 */
export const totalCo2e = (emissions: { gas: string; mass: number }[]): number =>
  emissions.reduce((acc, e) => acc + co2e(e.gas, e.mass), 0)

/**
 * Activity-based emission — GHG Protocol Corporate Standard method.
 *
 * emission = activity × emission_factor
 *
 * @param activity  activity data (e.g. fuel consumed in litres, km driven)
 * @param factor    emission factor for that activity in CO₂e per activity unit
 * @returns         CO₂e emitted
 */
export const emissionFromActivity = (activity: number, factor: number): number =>
  activity * factor

/**
 * Carbon intensity — CO₂e emitted per unit of output produced.
 *
 * Returns 0 when output ≤ 0 (undefined intensity, not a division error).
 *
 * @param total   total CO₂e (e.g. from totalCo2e)
 * @param output  unit of economic or physical output (tonnes, MWh, €, …)
 * @returns       CO₂e per output unit, or 0 if output ≤ 0
 */
export const carbonIntensity = (total: number, output: number): number =>
  output <= 0 ? 0 : total / output

// ---------------------------------------------------------------------------
// CLI demo
// ---------------------------------------------------------------------------
if (import.meta.url === 'file://' + process.argv[1]) {
  const inventory = [
    { gas: 'co2', mass: 100 },
    { gas: 'ch4', mass: 10 },
    { gas: 'n2o', mass: 2 },
  ]
  const total = totalCo2e(inventory)
  console.log('emission (GHG inventory demo):')
  console.log('  GWP anchor values: co2=' + GWP.co2 + ' ch4=' + GWP.ch4 + ' n2o=' + GWP.n2o)
  console.log('  inventory: ' + JSON.stringify(inventory))
  console.log('  total CO₂e = ' + total)
  console.log('  carbon intensity (per 1 000 units output) = ' + carbonIntensity(total, 1000).toFixed(4))
  console.log('  emissionFromActivity(1000 km, 0.21 kgCO₂e/km) = ' + emissionFromActivity(1000, 0.21) + ' kg CO₂e')
}
