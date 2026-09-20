/**
 * energy — allocating a demand across sources, and why a closed loop cannot feed itself.
 *
 * ALLOCATION IS THE SAME FOLD AS A MOTOR MIXER. A hex has six actuators and four axes; a hybrid
 * bus has N sources and one demand. Both are: take a command, distribute it across actuators by
 * declared coefficients, respect each actuator's limit, and CONSERVE. In the mixer the conservation
 * shows up as a column summing to zero ([[rotation]]); here it shows up as
 * Σ drawn = demand + losses. Same law, different units.
 *
 * AND THE LOOP LAW, which is the reason this atom exists rather than just an allocator. A chain of
 * conversions has gain equal to the PRODUCT of its stage efficiencies. Every real stage has
 * efficiency below 1, so a closed loop — output fed back as its own input — has gain below 1 and
 * decays. There is no arrangement of stages that escapes this, because the bound is multiplicative
 * and each factor is ≤ 1.
 *
 * That is what `selfSustaining` reports, and it is the honest answer to the water-fuel cycle:
 * splitting water costs ΔH = +285.8 kJ/mol and burning the hydrogen back returns 285.8 kJ/mol, so
 * the IDEAL loop gain is exactly 1.0 with nothing left over for work. Real hardware is far below
 * that. See WATER_CYCLE.
 *
 * @standard ISO 80000-5 — thermodynamics quantities
 * @standard IEC 60050-482 — primary and secondary cells
 */
export const atomPath = 'energy' as const

/** Watt-hours. Every quantity here is Wh or W; no mixed units. */
export interface Source {
  readonly id: string
  /** Energy remaining, Wh. */
  readonly available: number
  /** Maximum instantaneous draw, W. */
  readonly maxPower: number
  /** Round-trip or conversion efficiency in (0, 1]. */
  readonly efficiency: number
  /** Lower number is drawn first. A declared policy, not a derivation. */
  readonly priority: number
}

export interface Draw {
  readonly id: string
  /** Power taken FROM the source, W — including what its own inefficiency wastes. */
  readonly drawn: number
  /** Power the source actually delivers to the bus, W. */
  readonly delivered: number
}

export interface Allocation {
  readonly demand: number
  readonly draws: readonly Draw[]
  /** Total delivered to the bus, W. */
  readonly delivered: number
  /** demand − delivered. Positive means the bus is SHORT; the demand was not met. */
  readonly shortfall: number
  /** Total wasted in conversion, W. */
  readonly losses: number
}

const clampEff = (e: number): number => (e > 0 && e <= 1 ? e : 1)

/**
 * Meet a demand from the sources, cheapest priority first.
 *
 * A source that cannot deliver is not silently skipped — it contributes what it can and the
 * SHORTFALL is reported. An allocator that reports a met demand it did not meet is the typed
 * closing total one atom over ([[float]]): a number asserted instead of counted.
 */
export function allocate(sources: readonly Source[], demand: number): Allocation {
  const want = demand > 0 ? demand : 0
  const order = [...sources].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))
  const draws: Draw[] = []
  let delivered = 0
  let losses = 0

  for (const s of order) {
    const remaining = want - delivered
    if (remaining <= 0) {
      draws.push({ id: s.id, drawn: 0, delivered: 0 })
      continue
    }
    const eff = clampEff(s.efficiency)
    const canDeliver = Math.max(0, Math.min(s.maxPower * eff, remaining))
    const drawn = eff > 0 ? canDeliver / eff : 0
    draws.push({ id: s.id, drawn, delivered: canDeliver })
    delivered += canDeliver
    losses += drawn - canDeliver
  }

  return { demand: want, draws, delivered, shortfall: want - delivered, losses }
}

/** Conservation: everything drawn is either delivered or lost, to within a rounding epsilon. */
export function conserves(a: Allocation, epsilon = 1e-9): boolean {
  const drawn = a.draws.reduce((s, d) => s + d.drawn, 0)
  return Math.abs(drawn - (a.delivered + a.losses)) <= epsilon
}

/** One conversion in a chain: what it is, and what fraction survives it. */
export interface Stage {
  readonly name: string
  /** Efficiency in (0, 1]. A stage claiming more than 1 is refused by `loopGain`. */
  readonly efficiency: number
}

/**
 * The gain of a chain: the PRODUCT of its stage efficiencies.
 *
 * Returns NaN if any stage claims efficiency above 1 — a refusal rather than a computation, because
 * multiplying a claim greater than one through a chain produces a number that looks like an answer.
 */
export function loopGain(stages: readonly Stage[]): number {
  if (stages.length === 0) return 1
  if (stages.some((s) => s.efficiency > 1 || s.efficiency <= 0)) return Number.NaN
  return stages.reduce((g, s) => g * s.efficiency, 1)
}

/**
 * Can this chain, fed back into itself, run forever with energy to spare?
 *
 * Only if its gain is at least 1, which needs every stage lossless — and no real stage is. This
 * returns false for every chain containing a real conversion, and that is not a limitation of the
 * function ([[rules]]/refutable: the claim must be able to fail, and here it is the CLAIM of
 * self-sustenance that fails, every time, for a reason that is arithmetic).
 */
export function selfSustaining(stages: readonly Stage[]): boolean {
  const g = loopGain(stages)
  return Number.isFinite(g) && g >= 1
}

/** Which water cycle to read back: the one hardware can build, or the one physics allows. */
export type CycleKind = 'real' | 'ideal'

/**
 * The water cycle as a chain of stages.
 *
 * Splitting water is endothermic: ΔH = +285.8 kJ/mol for the higher heating value of hydrogen, and
 * burning that hydrogen returns the same 285.8 kJ/mol. So even at the thermodynamic limit the loop
 * gain is exactly 1.0 and there is NOTHING left to do work with — the cycle is closed, not
 * generative. With the best commercial hardware it is roughly a third.
 *
 * Returned from a function rather than exported as two constants: a caller modelling their own
 * plant supplies their own stages, and these are a REFERENCE to argue with, not an API to build on.
 */
export function referenceCycle(kind: CycleKind): readonly Stage[] {
  return kind === 'ideal'
    ? [
        { name: 'electrolysis at the thermodynamic limit', efficiency: 1 },
        { name: 'recombination at the thermodynamic limit', efficiency: 1 },
      ]
    : [
        { name: 'PEM electrolysis — water to hydrogen', efficiency: 0.7 },
        { name: 'compression and storage', efficiency: 0.9 },
        { name: 'PEM fuel cell — hydrogen back to water', efficiency: 0.55 },
      ]
}
