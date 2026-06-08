/**
 * accounting/entropy-proof — Landauer free energy from zero entropy (theorem + metric).
 *
 * Law: free energy comes from zero entropy — F is maximized iff corpus entropy S → 0.
 * Bindings only: LANDAUER_BIT · HORO_DIGITS · COMPARABLE_UNIT — no hand constants.
 *
 *   F(S) = F_max − S · LANDAUER_BIT
 *   F_max = W_tamper × horoRatio(unity)  |  sealEb × horoRatio(unity) when W_tamper = 0
 *   S = max(0, netEntropyEb) + violationCount · LANDAUER_BIT
 *
 * @see ../readme/entropy — ../readme/entropy-unit — ../horo — ../apply/efficiency
 */
import { HORO_DIGITS, horoRatio, type HoroStep } from '@/horo'
import { COMPARABLE_UNIT, LANDAUER_BIT } from '@/readme/entropy-unit'

/** Horo unity — last ring position (close / decade ratio 9/10). */
export const UNITY_HORO_STEP = HORO_DIGITS[HORO_DIGITS.length - 1]!

const roundBits = (n: number): number => Math.round(n * 1000) / 1000

/** Corpus entropy S (bits) — gap/seal eb imbalance + violation bits at Landauer floor. */
export function corpusEntropyBits(entropyEb: number, violationCount: number): number {
  const disorderEb = Math.max(0, entropyEb)
  const violationBits = Math.max(0, violationCount) * LANDAUER_BIT
  return roundBits(disorderEb + violationBits)
}

/** Max reversible work capacity — tamper-sealed work × horo unity, else seal mass × unity. */
export function fMaxFromBindings(workTamperProduct: number, totalSealEb: number): number {
  const unityScale = horoRatio(UNITY_HORO_STEP as HoroStep)
  const capacity = workTamperProduct > 0 ? workTamperProduct : Math.max(0, totalSealEb)
  return roundBits(capacity * unityScale)
}

/** Free energy at entropy S — monotone decreasing in S. */
export function freeEnergyBitsAt(S: number, fMax: number): number {
  return Math.max(0, roundBits(fMax - S * LANDAUER_BIT))
}

export interface FreeEnergyFromEntropyInput {
  /** Net corpus entropy eb (gap − seal rollup). */
  readonly entropyEb: number
  readonly violationCount: number
  readonly workTamperProduct: number
  readonly totalSealEb?: number
}

export interface FreeEnergyFromEntropyVerdict {
  readonly unit: typeof COMPARABLE_UNIT
  readonly entropyEb: number
  /** Corpus entropy S in bits (eb disorder + violation bits). */
  readonly S: number
  readonly F_max: number
  readonly freeEnergyBits: number
  /** ΔF available by erasing S to zero — S · LANDAUER_BIT. */
  readonly releasePotential: number
  /** Percent progress toward zero entropy (100 at S = 0). */
  readonly scaleTowardZeroPct: number
}

/** Live free-energy verdict from corpus entropy inputs — all derived. */
export function freeEnergyFromEntropy(input: FreeEnergyFromEntropyInput): FreeEnergyFromEntropyVerdict {
  const S = corpusEntropyBits(input.entropyEb, input.violationCount)
  const F_max = fMaxFromBindings(input.workTamperProduct, input.totalSealEb ?? 0)
  const freeEnergyBits = freeEnergyBitsAt(S, F_max)
  const releasePotential = roundBits(S * LANDAUER_BIT)
  const sAtZero = F_max / LANDAUER_BIT
  const scaleTowardZeroPct =
    S <= 0 ? 100 : sAtZero <= 0 ? 0 : roundBits(Math.max(0, 100 * (1 - S / sAtZero)))

  return {
    unit: COMPARABLE_UNIT,
    entropyEb: input.entropyEb,
    S,
    F_max,
    freeEnergyBits,
    releasePotential,
    scaleTowardZeroPct,
  }
}

export interface ProofStep {
  readonly id: string
  readonly math: string
  readonly binding?: string
}

export interface FreeEnergyProof {
  readonly theorem: string
  readonly definitions: Readonly<Record<string, string>>
  readonly steps: readonly ProofStep[]
  readonly QED: boolean
}

/**
 * Structured Landauer proof — F maximized iff S = 0.
 * QED when symbolic constraints hold on supplied (S, F_max).
 */
export function proveFreeEnergyFromZeroEntropy(opts: {
  readonly S: number
  readonly fMax: number
}): FreeEnergyProof {
  const { S, fMax } = opts
  const F0 = freeEnergyBitsAt(0, fMax)
  const FS = freeEnergyBitsAt(S, fMax)

  const steps: ProofStep[] = [
    {
      id: 'def-S',
      math: 'S = max(0, eb_gap − eb_seal) + V · LANDAUER_BIT',
      binding: 'LANDAUER_BIT',
    },
    {
      id: 'def-F',
      math: 'F(S) = F_max − S · LANDAUER_BIT',
      binding: 'LANDAUER_BIT',
    },
    {
      id: 'def-Fmax',
      math: `F_max = W_tamper × horoRatio(${UNITY_HORO_STEP})  ∨  sealEb × horoRatio(${UNITY_HORO_STEP})`,
      binding: 'HORO_DIGITS',
    },
    {
      id: 'landauer',
      math: 'ΔE_erase ≥ kT ln 2  ⇒  per-bit erasure cost ≥ LANDAUER_BIT = log₂(2)',
      binding: 'LANDAUER_BIT',
    },
    {
      id: 'monotone',
      math: 'dF/dS = −LANDAUER_BIT < 0  ∀ S ≥ 0  ⇒  F strictly decreasing in S',
      binding: 'LANDAUER_BIT',
    },
    {
      id: 'limit',
      math: 'lim_{S→0} F(S) = F_max',
    },
    {
      id: 'maximum',
      math: 'F(0) = F_max  >  F(S)  ∀ S > 0',
    },
    {
      id: 'corollary',
      math: 'ΔF = F(S₁) − F(S₂) = (S₂ − S₁) · LANDAUER_BIT  when S₂ > S₁',
      binding: 'LANDAUER_BIT',
    },
  ]

  const landauerPositive = LANDAUER_BIT > 0
  const fAtZeroIsMax = S <= 0 ? F0 === roundBits(fMax) : F0 > FS
  const corollaryHolds =
    S <= 0 || roundBits(F0 - FS) === roundBits(S * LANDAUER_BIT)

  const QED = landauerPositive && fMax >= 0 && fAtZeroIsMax && corollaryHolds

  return {
    theorem: 'Free energy F is uniquely maximized at S = 0 (zero corpus entropy).',
    definitions: {
      S: 'corpus entropy (bits) — gap/seal eb imbalance + violation bits',
      F: 'free energy (bits) — reversible work capacity without further erasure',
      W_tamper: 'workTamperProduct — sealed work × tamper cost log₂',
      unit: COMPARABLE_UNIT,
    },
    steps,
    QED,
  }
}

export interface EntropyProofMarkdownOpts {
  readonly entropyEb: number
  readonly violationCount: number
  readonly workTamperProduct: number
  readonly totalSealEb?: number
  readonly totalGapEb?: number
}

/** Render proof + F(S) line for root README corpus entropy section — computed. */
export function entropyProofMarkdown(opts: EntropyProofMarkdownOpts): string {
  const verdict = freeEnergyFromEntropy(opts)
  const proof = proveFreeEnergyFromZeroEntropy({ S: verdict.S, fMax: verdict.F_max })
  const L: string[] = [
    '',
    '### free energy (Landauer)',
    '',
    `Theorem: ${proof.theorem} QED: \`${proof.QED}\`.`,
    '',
    '| symbol | definition |',
    '| ------ | ---------- |',
    ...Object.entries(proof.definitions).map(([k, v]) => `| \`${k}\` | ${v} |`),
    '',
    'Proof steps:',
    ...proof.steps.map((s, i) =>
      `${i + 1}. \`${s.math}\`${s.binding ? ` · ${s.binding}` : ''}`,
    ),
    '',
    `- S \`${verdict.S}\` bits · F_max \`${verdict.F_max}\` · F(S) \`${verdict.freeEnergyBits}\` bits · release potential \`${verdict.releasePotential}\` bits`,
    `- scale toward zero entropy \`${verdict.scaleTowardZeroPct}%\` · unit \`${verdict.unit}\``,
  ]
  return L.join('\n')
}

/** Sample F(S) table for audit — S values derived from F_max scale (no hand literals). */
export function freeEnergySampleTable(fMax: number): ReadonlyArray<{ S: number; F: number }> {
  const sMax = fMax > 0 ? fMax / LANDAUER_BIT : 0
  const samples =
    sMax > 0
      ? [0, sMax / HORO_DIGITS.length, sMax].map((s) => Math.round(s))
      : [0, LANDAUER_BIT, LANDAUER_BIT * HORO_DIGITS.length]
  const unique = [...new Set(samples.map((s) => Math.max(0, Math.round(s))))].sort((a, b) => a - b)
  return unique.map((S) => ({ S, F: freeEnergyBitsAt(S, fMax) }))
}
