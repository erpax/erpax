/**
 * solvent — what a solvent does when you heat it, and where the mass goes.
 *
 * A dry cleaner buys solvent, distils it, recovers most of it, and loses the rest
 * to the air and to the goods. Every number in that sentence is a formula, and the
 * one the whole balance turns on — how much vapour a solvent makes at a given
 * temperature — is the Antoine equation.
 *
 * @standard Antoine (1888) — log₁₀ P = A − B/(T + C), the vapour-pressure correlation
 * @standard EU 2010/75 Annex VII — solvent management plan: input = output + fugitive
 * @standard CODATA 2018 — molar gas constant R = 8.314462618 J·mol⁻¹·K⁻¹ (exact)
 * @see ./SKILL.md — ../emission
 */
import { algebraExp, algebraFloatPow, algebraLog, algebraLog10, exactMax } from '@/algebra'

export const atomPath = 'solvent' as const

/**
 * An Antoine coefficient set, with the interval it was fitted on.
 *
 * The range is not metadata. A correlation is a fit to measurements over an
 * interval, and outside it the same three numbers keep returning a value that
 * nothing measured — which is the shape of a claim stronger than its evidence.
 */
export interface Antoine {
  /** What the coefficients describe. */
  readonly species: string
  /** CAS registry number — received from a registry, never minted ([[rules]]/forge). */
  readonly cas: string
  readonly a: number
  readonly b: number
  readonly c: number
  /** Inclusive fitted interval, kelvin. */
  readonly minK: number
  readonly maxK: number
  /** Where the coefficients came from — a citation must lead to its evidence. */
  readonly source: string
}

/**
 * Tetrachloroethylene (perchloroethylene, PCE) — the dry cleaner's solvent.
 *
 * Read from the NIST Chemistry WebBook (species C127184), which reports the fit as
 * `log₁₀(P/bar) = A − B/(T/K + C)`. These are MEASURED coefficients: they are
 * received and cited, never derived here.
 */
export const ANTOINE_PCE: Antoine = Object.freeze({
  species: 'tetrachloroethylene',
  cas: '127-18-4',
  a: 4.18056,
  b: 1440.819,
  c: -49.171,
  minK: 301.03,
  maxK: 380.84,
  source: 'NIST Chemistry WebBook C127184 — Polak, Murakami et al. (1970), coefficients calculated by NIST',
})

/** A vapour pressure, and whether the correlation was asked outside its fit. */
export interface VapourReading {
  readonly pressureBar: number
  /** True when the temperature lies outside the fitted interval. */
  readonly extrapolated: boolean
  readonly temperatureK: number
  readonly species: string
}

/**
 * Antoine: `log₁₀ P = A − B/(T + C)`, so `P = 10^(A − B/(T + C))`.
 *
 * Returns the extrapolation flag beside the number rather than throwing, because a
 * caller sweeping a temperature range has a legitimate reason to pass 298 K and a
 * legitimate need to know that 298 K is 3 K below anything Polak measured. A bare
 * number cannot carry that, and a thrown error cannot be plotted.
 */
export function vapourPressure(antoine: Antoine, temperatureK: number): VapourReading {
  if (temperatureK + antoine.c === 0) throw new Error('vapourPressure: T + C = 0 — the correlation has a pole here')
  const log10P = antoine.a - antoine.b / (temperatureK + antoine.c)
  return {
    pressureBar: algebraFloatPow(10, log10P),
    extrapolated: temperatureK < antoine.minK || temperatureK > antoine.maxK,
    temperatureK,
    species: antoine.species,
  }
}

/**
 * The same law read backwards — the temperature at which a solvent boils under a
 * given pressure: `T = B/(A − log₁₀ P) − C`.
 *
 * One correlation, two readings, exactly as [[inertia]] reads `F = m·v²/r` as both a
 * radius and a speed. Nothing new is measured by inverting it.
 */
export function boilingPointK(antoine: Antoine, pressureBar: number): number {
  if (pressureBar <= 0) throw new Error('boilingPointK: pressure must be positive')
  const denominator = antoine.a - algebraLog10(pressureBar)
  if (denominator === 0) throw new Error('boilingPointK: A = log₁₀ P — the inverse has a pole here')
  return antoine.b / denominator - antoine.c
}

/**
 * The gas/liquid equilibrium ratio the poster wrote as a CONSTANT.
 *
 * `K = P_sat(T) / P_total` — a Raoult-type partition for the pure solvent. It is a
 * function of temperature, and freezing it is the simplification the source document
 * names as its own limitation: phase equilibrium "varies dynamically with temperature
 * and pressure", and a constant K cannot say that a warm tank holds more vapour.
 */
export function equilibriumRatio(antoine: Antoine, temperatureK: number, totalPressureBar = 1.01325): number {
  if (totalPressureBar <= 0) throw new Error('equilibriumRatio: total pressure must be positive')
  return vapourPressure(antoine, temperatureK).pressureBar / totalPressureBar
}

/** CODATA 2018 molar gas constant, J·mol⁻¹·K⁻¹ — exact by SI definition since 2019. */
export const GAS_CONSTANT = 8.314462618

/**
 * Arrhenius: `k = A·e^(−Ea/RT)`.
 *
 * The source document calls its decay "Arrhenius-like" and never writes it. This is
 * the equation that word names.
 */
export function arrheniusRate(preExponential: number, activationEnergyJPerMol: number, temperatureK: number): number {
  if (temperatureK <= 0) throw new Error('arrheniusRate: temperature must be above absolute zero')
  return preExponential * algebraExp(-activationEnergyJPerMol / (GAS_CONSTANT * temperatureK))
}

/** First-order decay: `C(t) = C₀·e^(−kt)`. Never negative, never rising. */
export function firstOrderDecay(initial: number, ratePerSecond: number, seconds: number): number {
  return initial * algebraExp(-ratePerSecond * seconds)
}

/** `t½ = ln 2 / k` — the time a first-order process takes to halve. */
export function halfLifeSeconds(ratePerSecond: number): number {
  if (ratePerSecond <= 0) throw new Error('halfLifeSeconds: rate must be positive')
  return algebraLog(2) / ratePerSecond
}

/** One accounting period's solvent movements, in mass units. */
export interface SolventInputs {
  /** Solvent bought into the installation. */
  readonly purchased: number
  /** Solvent recovered by distillation and returned to the machine. */
  readonly recovered: number
  /** Solvent leaving in the cleaned goods and in the still residue. */
  readonly retained: number
}

/** Where the period's solvent went — the balance, and whether it closes. */
export interface SolventBalance extends SolventInputs {
  /** purchased − recovered − retained: what left as vapour, unmeasured. */
  readonly fugitive: number
  /** True when nothing is unaccounted for below zero — outputs cannot exceed input. */
  readonly conserves: boolean
  /** fugitive ÷ purchased, the figure a solvent management plan reports. */
  readonly fugitiveFraction: number
}

/**
 * Input = output + fugitive, which is the whole of a solvent management plan.
 *
 * The poster wrote this as `m_solv = m_solv + m_soil` — an equation whose only
 * solution is `m_soil = 0`, and therefore a statement that no soil exists. A mass
 * balance names the sides: what came in, what was recovered, what left in the goods,
 * and what is left over is the fugitive loss nobody metered.
 *
 * A negative fugitive is not a negative emission; it means the declared outputs
 * exceed the declared input, so `conserves` is false and the figure is refused
 * rather than reported as a credit.
 */
export function solventBalance(i: SolventInputs): SolventBalance {
  const fugitive = i.purchased - i.recovered - i.retained
  return {
    ...i,
    fugitive,
    conserves: fugitive >= 0,
    fugitiveFraction: i.purchased > 0 ? exactMax(fugitive, 0) / i.purchased : 0,
  }
}
