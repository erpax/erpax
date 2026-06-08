/**
 * Feature-coverage calculator — Conservation Law 62 made measurable.
 *
 * Slice VVVVVVVVV-cut1 (2026-05-11). The limit-theorem memory states
 * `P(tamper) ≈ (1 - coverage)^N`. To get coverage as a runtime
 * quantity, we sample uuids across the platform and ask:
 *
 *   - Is each uuid a structured uuidv8 (Law 61)?
 *   - For its slot tag, which expected capabilities are set?
 *   - What's the ratio of structured/legacy across the sample?
 *
 * The result drives:
 *   - The `checkFeatureCoverage` invariant (warn/fail gates)
 *   - The `erpax.format.coverage` MCP tool (auditor query)
 *   - The platform-readiness manifest (Slice PPPPPPPP rollup)
 *
 * @standard ISO/IEC 27001 Annex A.18.2.3 technical compliance review
 * @standard NIST SP 800-53 CM-2 baseline configuration
 * @audit Conservation Law 61 + 62
 * @feature uuid_format_coverage
 * @see ./index.ts (encodeStructured / decodeStructured)
 */

import { horoRatio } from '@/horo'
import { decodeStructured, CAPABILITIES, SLOT_TAGS } from '@/uuid/format'
import type { SlotName } from '@/uuid/format'

/** PASS threshold for structured-uuid coverage — horo unity (9) per decade. */
export const structuredCoveragePassThreshold = (): number => horoRatio(9)

/**
 * Expected capability profile per slot. When a uuid's slot tag falls
 * in this map, we count whether each listed capability bit is set.
 * Capabilities NOT listed for a slot are excluded from its coverage
 * denominator (the slot doesn't legitimately use them).
 *
 * Keep narrow: each slot lists ONLY the capabilities that should be
 * set in steady-state operation. A coverage of 1.0 means every uuid
 * in the slot has every expected capability — the limit-theorem
 * sweet spot.
 */
export const SLOT_EXPECTED_CAPABILITIES: ReadonlyMap<SlotName, ReadonlyArray<keyof typeof CAPABILITIES>> = new Map([
  ['chainLeaf',  ['CHAINED']],
  ['share',      ['SHARED']],
  ['auditEvent', ['CHAINED']],
  ['signature',  ['SIGNED']],
  ['envelope',   ['ENCRYPTED']],
  ['kvBinding',  []],
  ['collectionRow', ['TAMPER_PROOF']],
  ['user',       []],
  ['tenant',     []],
  ['role',       []],
  ['currency',   []],
  ['locale',     []],
  ['country',    []],
  ['query',      []],
  ['rateQuote',  []],
  ['error',      ['CHAINED']],
])

/** One uuid in the sample with optional metadata about what it SHOULD be. */
export interface CoverageSample {
  readonly uuid: string
  /** Hint about the source collection / context — used for diagnostic grouping. */
  readonly source?: string
}

export interface PerCapabilityRow {
  readonly capability: keyof typeof CAPABILITIES
  readonly relevantTotal: number   // uuids where this capability is expected for their slot
  readonly setCount: number         // of those, how many had the bit set
  readonly coverage: number          // setCount / relevantTotal (0..1; 1 when relevantTotal is 0)
}

export interface PerSlotRow {
  readonly slot: SlotName
  readonly total: number
  readonly structuredCount: number
  readonly legacyCount: number
  readonly structuredCoverage: number   // structuredCount / total
}

export interface CoverageReport {
  readonly totalSamples: number
  readonly structuredCount: number
  readonly legacyCount: number
  readonly overallStructuredCoverage: number
  readonly perCapability: ReadonlyArray<PerCapabilityRow>
  readonly perSlot: ReadonlyArray<PerSlotRow>
  /**
   * Estimated tamper probability for a uuid drawn at random from
   * this sample, given N independent axes per uuid and the observed
   * coverage. `(1 - coverage)^N` — a back-of-envelope figure for
   * the limit theorem.
   */
  readonly tamperProbabilityEstimate: number
  /** N value used in the estimate — defaults to 10 (one per active capability + slot binding). */
  readonly axesPerUuid: number
}

/**
 * Compute the coverage report over a sample of uuids. Pass `axes`
 * (default 10) to adjust the estimate exponent if the operational
 * profile differs.
 */
export function computeCoverage(args: {
  samples: ReadonlyArray<CoverageSample>
  axesPerUuid?: number
}): CoverageReport {
  const axesPerUuid = args.axesPerUuid ?? 10
  const totalSamples = args.samples.length

  let structuredCount = 0
  let legacyCount = 0

  // Per-slot counts.
  const slotCounts = new Map<SlotName, { total: number; structured: number; legacy: number }>()
  for (const name of Object.keys(SLOT_TAGS) as SlotName[]) {
    slotCounts.set(name, { total: 0, structured: 0, legacy: 0 })
  }

  // Per-capability tallies, counting only against the relevant slot population.
  const capRel = new Map<keyof typeof CAPABILITIES, { relevantTotal: number; setCount: number }>()
  for (const name of Object.keys(CAPABILITIES) as Array<keyof typeof CAPABILITIES>) {
    capRel.set(name, { relevantTotal: 0, setCount: 0 })
  }

  for (const sample of args.samples) {
    let decoded
    try {
      decoded = decodeStructured(sample.uuid)
    } catch {
      legacyCount++
      // We can't attribute a legacy uuid to a slot; track aggregate only.
      continue
    }
    structuredCount++
    const slot = decoded.slotName
    const sc = slotCounts.get(slot)
    if (sc) {
      sc.total++
      sc.structured++
    }
    const expected = SLOT_EXPECTED_CAPABILITIES.get(slot) ?? []
    for (const capName of expected) {
      const rel = capRel.get(capName)
      if (!rel) continue
      rel.relevantTotal++
      if ((decoded.capabilities & CAPABILITIES[capName]) !== 0) {
        rel.setCount++
      }
    }
  }

  const perCapability: PerCapabilityRow[] = []
  for (const [capability, { relevantTotal, setCount }] of capRel.entries()) {
    perCapability.push({
      capability,
      relevantTotal,
      setCount,
      coverage: relevantTotal === 0 ? 1 : setCount / relevantTotal,
    })
  }

  const perSlot: PerSlotRow[] = []
  for (const [slot, { total, structured, legacy }] of slotCounts.entries()) {
    perSlot.push({
      slot,
      total,
      structuredCount: structured,
      legacyCount: legacy,
      structuredCoverage: total === 0 ? 1 : structured / total,
    })
  }

  const overallStructuredCoverage = totalSamples === 0 ? 1 : structuredCount / totalSamples
  // P(tamper) ≈ (1 - coverage)^N. Coverage here is overall structured
  // coverage × harmonic mean of per-capability coverage (capability-set
  // density weights the estimate).
  let capHarmonic = 0
  let capCount = 0
  for (const row of perCapability) {
    if (row.relevantTotal > 0) {
      capHarmonic += 1 / Math.max(row.coverage, 1e-9)
      capCount++
    }
  }
  const capCoverage = capCount === 0 ? 1 : capCount / capHarmonic
  const effective = overallStructuredCoverage * capCoverage
  const tamperProbabilityEstimate = Math.pow(1 - effective, axesPerUuid)

  return {
    totalSamples,
    structuredCount,
    legacyCount,
    overallStructuredCoverage,
    perCapability,
    perSlot,
    tamperProbabilityEstimate,
    axesPerUuid,
  }
}
