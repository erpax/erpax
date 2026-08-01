import { exactFloor } from '@/algebra'
/**
 * machine — the equipment node of the production-traceability spine, mined from the upstream source of
 * truth (etrima, 20 years of garment manufacturing: 101 machines · 172 machine_types · real prod data).
 *
 * The real schema carries a THREE-RATE spread on every machine — `pay_per_hour ≤ cost_per_hour ≤
 * price_per_hour` — which is double-entry economics on the shop floor: what labour is paid, what the run
 * truly costs, what the order is charged. `machineRate` decomposes it exactly (revenue − cost = margin;
 * cost − pay = overhead), so a machine-hour is an accounting spread, not an opaque number ([[accounting]]).
 *
 * A machine runs a [[work]]/phase for a [[lots]] variant during a work-shift — the edges (lot_work_phase,
 * 291k rows) are the larger fold; this is the node they attach to. Fields are the real etrima columns,
 * never invented.
 *
 * @standard mined from etrima (Rails source-of-truth) · the machine rate spread as double-entry
 *
 * Composes [[accounting]] · [[work]] · [[lots]] · [[law]].
 */

/** A machine's rate economics — the three real etrima per-hour rates (all in its currency). */
export interface MachineRates {
  /** What labour running it is paid per hour. */
  readonly payPerHour: number
  /** What the run truly costs per hour (labour + overhead + wear). */
  readonly costPerHour: number
  /** What an order is charged per hour. */
  readonly pricePerHour: number
}

/** A machine type — the classification (etrima machine_types): capacity + per-minute economics. */
export interface MachineType {
  readonly kind: string
  readonly code: string
  readonly machinesPerWorker: number
  readonly costPerMinute: number
  readonly pricePerMinute: number
}

export interface MachineSpread {
  readonly revenue: number
  readonly cost: number
  readonly pay: number
  /** revenue − cost — the machine's contribution margin over `hours`. */
  readonly margin: number
  /** cost − pay — overhead absorbed (wear, energy, indirect) over `hours`. */
  readonly overhead: number
  /** margin ÷ cost — the markup ratio (0 when cost is 0). */
  readonly markup: number
}

/**
 * Decompose a machine-hour into its double-entry spread over `hours`. price = cost + margin and
 * cost = pay + overhead — the same conservation the corpus books elsewhere ([[accounting]]), now on the
 * production floor. A machine-hour is Dr cost / Cr revenue; the margin is the sealed difference.
 */
export function machineRate(rates: MachineRates, hours: number): MachineSpread {
  const revenue = rates.pricePerHour * hours
  const cost = rates.costPerHour * hours
  const pay = rates.payPerHour * hours
  return {
    revenue,
    cost,
    pay,
    margin: revenue - cost,
    overhead: cost - pay,
    markup: cost === 0 ? 0 : (revenue - cost) / cost,
  }
}

/** A machine type's throughput — units it can complete in `minutes`, given per-unit work-seconds. */
export function typeThroughput(t: MachineType, minutes: number, workSecondsPerUnit: number): number {
  if (workSecondsPerUnit <= 0) return 0
  return exactFloor((minutes * 60 * t.machinesPerWorker) / workSecondsPerUnit)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = machineRate({ payPerHour: 6, costPerHour: 9, pricePerHour: 14 }, 8)
  console.log('machine — the shop-floor spread (8h at pay 6 / cost 9 / price 14):')
  console.log(`  revenue ${s.revenue} = cost ${s.cost} + margin ${s.margin} · overhead ${s.overhead} · markup ${(s.markup * 100).toFixed(0)}%`)
}
