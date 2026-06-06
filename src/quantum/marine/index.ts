/**
 * quantum/marine — the LAW OF THE SEA, encoded in math. Maritime jurisdiction is geometry: a
 * position's distance from the baseline fixes the zone, and the zone fixes the sovereign. UNCLOS
 * (1982) sets the thresholds as exact distances — pure math, computable from a coordinate:
 *   • ≤ 12 nm  territorial sea (Art. 3): coastal-state sovereignty, subject to innocent passage.
 *   • ≤ 24 nm  contiguous zone (Art. 33): limited enforcement (customs · immigration · sanitary).
 *   • ≤ 200 nm EEZ (Art. 57): coastal-state sovereign rights over resources; high-seas freedoms remain.
 *   • > 200 nm high seas (Art. 86): no sovereignty — FLAG-STATE jurisdiction (Art. 92): a [[vessel]]'s
 *     registry (its [[identity]] = a content-[[uuid]]) is the law that governs it.
 *
 * And general average (the York-Antwerp principle): a sacrifice for the common voyage is shared by
 * ALL interests in proportion to value at risk — maritime double-entry ([[balance]] · [[accounting]]):
 * the saved are debited, the sacrificer credited, the books balance even at sea.
 *
 * HONEST: the zone thresholds are treaty FACTS (nautical miles, UNCLOS articles); general average is
 * the proportional principle in my own words, not a reproduction of any rule text. Educational, not
 * legal advice.
 *
 *   tsx src/quantum/marine/index.ts
 *
 * @audit zones are computed from distance; general average is proportional to value — never asserted
 * @see ../../vessel -- ../../cargo -- ../../accounting -- ../../balance -- ./SKILL.md
 */

/** UNCLOS zone thresholds (nautical miles from the baseline) — treaty facts. */
export const NM_TERRITORIAL = 12
export const NM_CONTIGUOUS = 24
export const NM_EEZ = 200

export type MaritimeZone = 'territorial' | 'contiguous' | 'eez' | 'high-seas'

/** Distance from the baseline (nautical miles) → the UNCLOS zone (pure geometry). */
export function zoneOf(distanceNm: number): MaritimeZone {
  if (distanceNm <= NM_TERRITORIAL) return 'territorial'
  if (distanceNm <= NM_CONTIGUOUS) return 'contiguous'
  if (distanceNm <= NM_EEZ) return 'eez'
  return 'high-seas'
}

/** Who governs in a zone — the coastal state (sovereignty/rights) or the vessel's flag state. */
export function jurisdiction(zone: MaritimeZone): 'coastal-state' | 'flag-state' {
  return zone === 'high-seas' ? 'flag-state' : 'coastal-state'
}

/**
 * General average — a sacrifice for the common safety is shared by all interests in proportion to
 * the value each had at risk. Returns each interest's contribution; their sum equals the loss
 * (conservation — the maritime double-entry).
 */
export function generalAverage(loss: number, valuesAtRisk: readonly number[]): number[] {
  const total = valuesAtRisk.reduce((a, b) => a + b, 0)
  return total === 0 ? valuesAtRisk.map(() => 0) : valuesAtRisk.map((v) => (loss * v) / total)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/marine — the law of the sea, encoded in math:')
  for (const d of [6, 18, 100, 500]) console.log('  ' + String(d).padStart(3) + ' nm → ' + zoneOf(d).padEnd(11) + ' (' + jurisdiction(zoneOf(d)) + ')')
  const ga = generalAverage(90, [300, 600]) // jettison worth 90, shared over ship 300 + cargo 600
  console.log('  general average: loss 90 over [300,600] ⇒ [' + ga.join(', ') + ']  (Σ=' + (ga[0]! + ga[1]!) + ' = the loss)')
}
