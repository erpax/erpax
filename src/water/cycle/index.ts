import { LN2 } from '@/algebra'
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
  return (BOLTZMANN_J_PER_K * kelvin * LN2 * AVOGADRO_PER_MOL) / 1000
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

/**
 * The plant, sized by its STORAGE duty. Water is the byproduct, and that is
 * the whole design: charge the electrolyser because the grid needs storage,
 * and the distillate arrives at no additional energy cost.
 */
export interface PlantSpec {
  readonly megawatts: number
  readonly hoursPerDay: number
  readonly kwhCharged: number
  readonly kwhReturned: number
  readonly litresPerDay: number
  /** at the WHO minimum for drinking and cooking */
  readonly peopleServed: number
}

export const DRINKING_LITRES_PER_DAY = 20

export function plantSpec(
  megawatts: number,
  hoursPerDay: number,
  eff: CycleEfficiency,
): PlantSpec {
  const yielded = storageYield(eff)
  const kwhPerLitreIn = yielded.storedKJ / 3600
  const kwhPerLitreOut = yielded.recoverableKJ / 3600
  const kwhCharged = megawatts * 1000 * hoursPerDay
  const litresPerDay = kwhCharged / kwhPerLitreIn
  return {
    megawatts,
    hoursPerDay,
    kwhCharged,
    kwhReturned: litresPerDay * kwhPerLitreOut,
    litresPerDay,
    peopleServed: litresPerDay / DRINKING_LITRES_PER_DAY,
  }
}

/**
 * What the litre costs, and the answer depends entirely on why the plant runs.
 *
 * Charged to purification alone the loop is absurd — three orders of magnitude
 * worse than reverse osmosis. Charged to storage, which is a duty the grid
 * pays for anyway, the water is free at the margin. Same hardware, same
 * physics; only the accounting question changes.
 */
export function marginalWaterCostKwh(eff: CycleEfficiency, storageIsThePrimaryDuty: boolean): number {
  if (storageIsThePrimaryDuty) return 0
  const yielded = storageYield(eff)
  return (yielded.storedKJ - yielded.recoverableKJ) / 3600
}

// Molar masses, CODATA/IUPAC. Units in the names.
export const WATER_G_PER_MOL = 18.015
export const HYDROGEN_G_PER_MOL = 2.016
export const OXYGEN_G_PER_MOL = 31.998
/** Ideal gas at STP (0 °C, 100 kPa). */
export const MOLAR_VOLUME_L_PER_MOL = 22.414

export interface SplitProducts {
  readonly litresWater: number
  readonly molesWater: number
  readonly gramsWater: number
  readonly molesHydrogen: number
  readonly molesOxygen: number
  readonly gramsHydrogen: number
  readonly gramsOxygen: number
  readonly litresHydrogenStp: number
  readonly litresOxygenStp: number
  /** the 2:1 that makes oxyhydrogen self-stoichiometric */
  readonly moleRatioH2ToO2: number
  /** the classic 1:8 by weight */
  readonly massFractionHydrogen: number
  /** every gram back, because the end state IS the start state */
  readonly exhaustGramsWater: number
  readonly massClosesExactly: boolean
}

/**
 * What one litre of water becomes, and what burning it back exhausts.
 *
 * The answer is the reason the loop cannot generate: the exhaust is the feed,
 * mole for mole and gram for gram. Nothing else comes out — no CO2, and no NOx
 * either, PROVIDED the hydrogen is burned in the oxygen the split produced.
 * Burn it in air instead and atmospheric nitrogen makes NOx at flame
 * temperature; that pollutant comes from the air, never from the water.
 */
export function splitProducts(litresWater = 1): SplitProducts {
  const molesWater = MOL_PER_LITRE * litresWater
  const molesHydrogen = molesWater // H2O → H2 + ½O2
  const molesOxygen = molesWater / 2
  const gramsHydrogen = molesHydrogen * HYDROGEN_G_PER_MOL
  const gramsOxygen = molesOxygen * OXYGEN_G_PER_MOL
  const gramsWater = molesWater * WATER_G_PER_MOL
  return {
    litresWater,
    molesWater,
    gramsWater,
    molesHydrogen,
    molesOxygen,
    gramsHydrogen,
    gramsOxygen,
    litresHydrogenStp: molesHydrogen * MOLAR_VOLUME_L_PER_MOL,
    litresOxygenStp: molesOxygen * MOLAR_VOLUME_L_PER_MOL,
    moleRatioH2ToO2: molesHydrogen / molesOxygen,
    massFractionHydrogen: gramsHydrogen / (gramsHydrogen + gramsOxygen),
    exhaustGramsWater: gramsWater,
    massClosesExactly: (() => {
      const drift = gramsHydrogen + gramsOxygen - gramsWater
      return drift < 0.5 && drift > -0.5
    })(),
  }
}
