/**
 * solvent — what a solvent does when you heat it, and where the mass goes. See SKILL.md.
 *
 * @standard Antoine (1888) — log₁₀ P = A − B/(T + C), the vapour-pressure correlation
 * @standard EU 2010/75 Annex VII — solvent management plan: input = output + fugitive
 * @see ./SKILL.md — ../emission
 */
import { algebraExp, algebraFloatPow, algebraLog, algebraLog10, exactMax } from '@/algebra'

export const atomPath = 'solvent' as const

/** An Antoine coefficient set WITH the interval it was fitted on. See SKILL.md. */
export interface Antoine {
  /** What the coefficients describe. */
  readonly species: string
  /** CAS number — received from a registry, never minted. */
  readonly cas: string
  readonly a: number
  readonly b: number
  readonly c: number
  /** Inclusive fitted interval, kelvin. */
  readonly minK: number
  readonly maxK: number
  /** Where the coefficients came from. */
  readonly source: string
}

/** Tetrachloroethylene (PCE) — coefficients RECEIVED from NIST, never derived. See SKILL.md. */
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

/** `P = 10^(A − B/(T + C))`, with the extrapolation flag beside it. See SKILL.md. */
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

/** The same law backwards: `T = B/(A − log₁₀ P) − C`. See SKILL.md. */
export function boilingPointK(antoine: Antoine, pressureBar: number): number {
  if (pressureBar <= 0) throw new Error('boilingPointK: pressure must be positive')
  const denominator = antoine.a - algebraLog10(pressureBar)
  if (denominator === 0) throw new Error('boilingPointK: A = log₁₀ P — the inverse has a pole here')
  return antoine.b / denominator - antoine.c
}

/** `K = P_sat(T) / P_total` — a FUNCTION of temperature, not the constant. See SKILL.md. */
export function equilibriumRatio(antoine: Antoine, temperatureK: number, totalPressureBar = 1.01325): number {
  if (totalPressureBar <= 0) throw new Error('equilibriumRatio: total pressure must be positive')
  return vapourPressure(antoine, temperatureK).pressureBar / totalPressureBar
}

/**
 * Molar gas constant — received from the body that fixed it, never computed.
 * @standard CODATA 2018 — R = 8.314462618 J·mol⁻¹·K⁻¹ (exact by SI definition)
 */
export const GAS_CONSTANT = 8.314462618

/** Arrhenius: `k = A·e^(−Ea/RT)` — the equation "Arrhenius-like" names. See SKILL.md. */
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
  /** Leaving in the cleaned goods and the still residue. */
  readonly retained: number
}

/** Where the period's solvent went — the balance, and whether it closes. */
export interface SolventBalance extends SolventInputs {
  /** purchased − recovered − retained: what left as vapour. */
  readonly fugitive: number
  /** Outputs cannot exceed input. */
  readonly conserves: boolean
  /** The figure a solvent management plan reports. */
  readonly fugitiveFraction: number
}

/** Input = output + fugitive (EU 2010/75 Annex VII); a negative fugitive is refused. See SKILL.md. */
export function solventBalance(i: SolventInputs): SolventBalance {
  const fugitive = i.purchased - i.recovered - i.retained
  return {
    ...i,
    fugitive,
    conserves: fugitive >= 0,
    fugitiveFraction: i.purchased > 0 ? exactMax(fugitive, 0) / i.purchased : 0,
  }
}
