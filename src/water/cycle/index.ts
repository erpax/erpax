/**
 * water/cycle — split water, burn it back. It purifies and stores; it cannot
 * generate. Why, and what the numbers mean, is in ./SKILL.md.
 *
 * @standard NIST — ΔH°f H2O(l) = −285.83 kJ/mol · H2O(g) = −241.83 kJ/mol
 */

/** NIST enthalpies. HHV == SPLIT is Hess's law, and is why the loop cannot win. */
export const SPLIT_KJ_PER_MOL = 285.83
export const HHV_KJ_PER_MOL = 285.83
export const LHV_KJ_PER_MOL = 241.83
export const MOL_PER_LITRE = 55.34

export interface CycleEfficiency {
  /** electricity → H2 (best commercial PEM/alkaline ≈ 0.8) */
  readonly electrolyser: number
  /** H2 → shaft or electric work (heat engine, or fuel cell) */
  readonly engine: number
  /** shaft → electricity; 1 for a fuel cell */
  readonly generator: number
  /** exhaust condensed, so the HHV is recoverable */
  readonly condensing?: boolean
}

export interface CycleVerdict {
  readonly inKJ: number
  readonly outKJ: number
  /** out ÷ in — below 1 for any real device, at most 1 in the limit */
  readonly roundTrip: number
  readonly netKJ: number
  /** always false — a field so the claim is refuted rather than omitted */
  readonly generatesNet: boolean
}

/** One mole around the loop. Pure arithmetic — no device, no opinion. */
export function cycleMole(eff: CycleEfficiency): CycleVerdict {
  const inKJ = SPLIT_KJ_PER_MOL / eff.electrolyser
  const released = eff.condensing ? HHV_KJ_PER_MOL : LHV_KJ_PER_MOL
  const outKJ = released * eff.engine * eff.generator
  return { inKJ, outKJ, roundTrip: outKJ / inKJ, netKJ: outKJ - inKJ, generatesNet: outKJ > inKJ }
}

/**
 * Hess's law as a refusal: searches the efficiency space for an over-unity
 * counter-example rather than asserting none exists. Returns undefined.
 *
 * @invariant ∀ efficiencies ∈ (0,1] : outKJ ≤ inKJ
 */
export function overUnityWitness(step = 0.05): CycleEfficiency | undefined {
  for (let a = step; a <= 1; a += step) {
    for (let b = step; b <= 1; b += step) {
      for (let c = step; c <= 1; c += step) {
        const eff = { electrolyser: a, engine: b, generator: c, condensing: true }
        if (cycleMole(eff).generatesNet) return eff
      }
    }
  }
  return undefined
}

/** MJ of input electricity to run one litre of water through the loop. */
export function inputMJPerLitre(eff: CycleEfficiency): number {
  return (cycleMole(eff).inKJ * MOL_PER_LITRE) / 1000
}

/** Cost as a PURIFIER against reverse osmosis (~3–4 kWh/m³). The ratio is the finding. */
export const RO_MJ_PER_LITRE = 0.0126

export function versusReverseOsmosis(eff: CycleEfficiency): {
  readonly loopMJ: number
  readonly roMJ: number
  /** times MORE energy the loop needs for the same litre */
  readonly timesWorse: number
} {
  const loopMJ = inputMJPerLitre(eff)
  return { loopMJ, roMJ: RO_MJ_PER_LITRE, timesWorse: loopMJ / RO_MJ_PER_LITRE }
}

/** The honest framing — STORAGE that yields potable water. What one litre buys. */
export function storageYield(eff: CycleEfficiency): {
  readonly storedKJ: number
  readonly recoverableKJ: number
  readonly potableLitres: number
} {
  const v = cycleMole(eff)
  return { storedKJ: v.inKJ * MOL_PER_LITRE, recoverableKJ: v.outKJ * MOL_PER_LITRE, potableLitres: 1 }
}

// NIST / CODATA. Units live in the NAMES, not in comments beside them — a physical
// constant read at a call site should carry its unit where it cannot be missed.
export const SPLIT_GIBBS_KJ_PER_MOL = 237.13  // quantum scale: this IS the electronic-structure answer
export const FARADAY_C_PER_MOL = 96485
export const BOLTZMANN_J_PER_K = 1.380649e-23
export const AVOGADRO_PER_MOL = 6.02214076e23

/** The reversible cell voltage — ΔG/(2F). Every real cell needs more. */
export function reversibleVoltage(): number {
  return (SPLIT_GIBBS_KJ_PER_MOL * 1000) / (2 * FARADAY_C_PER_MOL)
}

/** Landauer floor per mole of erased bits — the demon pays kT ln2 and mints nothing. */
export function landauerKJPerMol(kelvin = 298): number {
  return (BOLTZMANN_J_PER_K * kelvin * Math.LN2 * AVOGADRO_PER_MOL) / 1000
}

export interface PhotonPath {
  /** solar-to-hydrogen; twoStep is the PV → electricity → electrolyser it replaces */
  readonly sth: number
  readonly twoStep: number
  readonly beatsTwoStep: boolean
}

/** Photocatalysis — photons split directly, skipping two conversions. The sun still pays. */
export function photonPath(sth: number, pv = 0.22, electrolyser = 0.8): PhotonPath {
  const twoStep = pv * electrolyser
  return { sth, twoStep, beatsTwoStep: sth > twoStep }
}
