/**
 * sustainability -- ENDURES because each cycle nets zero (the closed loop), COMPUTED.
 *
 * HONEST SCOPE: nature is NOT a closed perpetual machine -- it is a sun-driven
 * *dissipative structure* (Prigogine 1977). Matter cycles; energy flows one-way
 * and degrades. Local order is maintained ONLY by importing low-entropy energy
 * and exporting high-entropy heat. Sustainability means the driving flow is
 * replenished as fast as it is spent AND the entropy budget closes per cycle.
 * These functions model carrying capacity (Verhulst) and the Second-Law budget
 * for that export. They make NO claim about perpetual motion.
 *
 *   tsx src/sustainability/index.ts
 *
 * @standard Verhulst logistic growth (1838) — carrying capacity K; dN/dt = r·N·(1 − N/K)
 * @standard Prigogine dissipative structures (Nobel Chemistry, 1977) — order by dissipation
 * @standard Brundtland Report, Our Common Future (1987) — canonical sustainability definition
 * @standard Second Law of Thermodynamics — local order requires entropy export
 * @audit computed, never hand-asserted
 * @see ../conservation ../entropy ../capacity ../compost ../ecosystem
 */

/**
 * Verhulst logistic growth: dN/dt = r·N·(1 − N/K).
 * - At N=0 or N=K growth is 0 (equilibria).
 * - Growth is maximal at N=K/2 (the MSY point).
 */
export const logisticGrowth = (N: number, r: number, K: number): number =>
  r * N * (1 - N / K)

/**
 * Maximum Sustainable Yield: r·K/4.
 * This equals logisticGrowth(K/2, r, K) — the peak of the logistic curve.
 * Harvesting above MSY drives the stock below K/2 and risks collapse.
 */
export const carryingYield = (r: number, K: number): number => (r * K) / 4

/**
 * True iff the harvest does not exceed regeneration — the stock is not drawn
 * down faster than it recovers.  Equality is the sustainable boundary.
 */
export const sustainableHarvest = (harvest: number, regen: number): boolean =>
  harvest <= regen

/**
 * Net entropy added to the local system in one cycle: produced − exported.
 * Prigogine: a living cycle holds local order only when this is ≤ 0 (it
 * exports AT LEAST as much entropy as it produces internally).
 */
export const netEntropy = (produced: number, exported: number): number =>
  produced - exported

/**
 * One full sustainability cycle.
 * - harvest / regen: mass-flow balance (Verhulst side).
 * - entropyProduced / entropyExported: thermodynamic budget (Prigogine side).
 */
export type Cycle = {
  harvest: number
  regen: number
  entropyProduced: number
  entropyExported: number
}

/**
 * A cycle is sustainable iff BOTH conditions hold simultaneously:
 *   1. sustainableHarvest(c.harvest, c.regen)  — stock does not collapse.
 *   2. netEntropy(c.entropyProduced, c.entropyExported) ≤ 0  — entropy budget closes.
 * Either failure alone breaks sustainability.
 */
export const isSustainable = (c: Cycle): boolean =>
  sustainableHarvest(c.harvest, c.regen) &&
  netEntropy(c.entropyProduced, c.entropyExported) <= 0

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = 0.8,
    K = 1000
  const msy = carryingYield(r, K)
  const growthAtMsy = logisticGrowth(K / 2, r, K)
  console.log('sustainability demo (r=' + r + ', K=' + K + '):')
  console.log('  MSY = r·K/4 = ' + msy + '  ==  logisticGrowth(K/2)=' + growthAtMsy)
  console.log(
    '  isSustainable({harvest:180,regen:200,entropyProduced:50,entropyExported:60}) = ' +
      isSustainable({ harvest: 180, regen: 200, entropyProduced: 50, entropyExported: 60 }),
  )
}
