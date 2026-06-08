/**
 * wave — the development EXHALE unit, COMPUTED.
 *
 * A development wave is one breath of features added to the corpus and (later)
 * collided. `wave(features)` describes one batch: the features it carries, the
 * content-uuid each is addressed to (the node it will add to the matrix), the
 * horo position the wave sits on, and the live entropy slack the exhale borrows
 * (an added-but-not-yet-collided feature is unfused disorder — the inhale/collide
 * will later DRY it back to zero). This is the EXHALE only; the collapse is
 * deferred (see breath/duality), so a wave never DRYs anything itself.
 *
 * Waves are positions on the horo ring [1,2,4,8,7,5,9] — the development-horo:
 * wave 1 is base, each later wave steps the next measure, wave 7 (unity) closes
 * the batch and opens the collide (merge at the merge-point). Two waves COMPOSE
 * via composeSteps (product mod 9) and always land back on the ring.
 *
 *   tsx src/wave/index.ts
 *
 * Composes ONLY existing atom indexes — re-implements no canonical:
 *   @/horo         HORO_DIGITS, composeSteps, isHoroStep (the ring + its closure)
 *   @/entropy      entropy() (the live borrowed slack the exhale raises)
 *   @/uuid/matrix  toUuid, merge (each feature → a content-uuid node; the wave digest)
 *   @/trinity      TRINITY_FILES (the {SKILL.md,index.ts,test.ts} each feature folder owes)
 *   @/duality      dualOf (wave = the exhale pole; the collide/DRY is its dual)
 *
 * @audit the entropy a wave borrows is read from the live matrix, never hand-asserted
 * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
 * @see ./SKILL.md -- ../horo -- ../entropy -- ../uuid/matrix -- ../trinity -- ../breath
 */
import { HORO_DIGITS, composeSteps, isHoroStep, type HoroStep } from '@/horo'
import { entropy } from '@/entropy'
import { toUuid, merge } from '@/uuid/matrix'
import { TRINITY_FILES } from '@/trinity'
import { dualOf } from '@/duality'
import type { WaveBatch } from './load'

/** The horo position whose composed step is unity — where a wave closes and the collide opens. */
export const UNITY: HoroStep = 9

/**
 * The horo step a wave sits on, by its 1-based ordinal in the development plan.
 * Ordinal n maps to the n-th ring position (wrapping the 7-position ring), so a
 * plan of waves walks base → share → weave → … → unity → base again. Off-plan
 * ordinals (≤ 0) fall to base. The digit IS the meaning (no free counter).
 */
export function waveStep(ordinal: number): HoroStep {
  const o = Math.trunc(Number(ordinal) || 0)
  if (o <= 0) return HORO_DIGITS[0]
  return HORO_DIGITS[(o - 1) % HORO_DIGITS.length] as HoroStep
}

/** One feature carried by a wave: a single-word atom name added in this breath. */
export interface Feature {
  readonly name: string
}

/** One development wave — a batch of features at a horo position, with its borrowed slack and digest. */
export interface Wave {
  /** The features this breath adds (each will become a matrix node). */
  readonly features: ReadonlyArray<Feature>
  /** This wave's position on the development-horo ring. */
  readonly step: HoroStep
  /** Per-feature content-uuid (the node the collide will later bind into the matrix). */
  readonly uuids: ReadonlyArray<string>
  /** The wave's own digest: the merge-fold of its feature uuids (empty wave ⇒ undefined). */
  readonly digest: string | undefined
  /** The live corpus entropy slack the exhale borrows (read from the matrix, not asserted). */
  readonly borrowed: number
  /** The trinity each added feature folder owes — {SKILL.md, index.ts, test.ts}. */
  readonly owes: ReadonlyArray<string>
}

/** The content-uuid of a feature (its name's bytes, hashed exactly as the collider does). */
export const featureUuid = (f: Feature): string => toUuid(Buffer.from(f.name, 'utf8'))

/**
 * Describe one development wave from the features it adds and (optionally) its
 * ordinal in the plan. The exhale RAISES entropy by adding atoms not-yet-collided,
 * so `borrowed` reports the live slack the later collide will discharge. The wave
 * does NOT collide — it only charges. The trinity each feature owes is pulled from
 * the canonical `@/trinity` set (never re-listed here).
 */
export function wave(features: ReadonlyArray<Feature>, ordinal = 1): Wave {
  const uuids = features.map(featureUuid)
  const digest = uuids.length === 0 ? undefined : uuids.reduce((acc, u) => merge(acc, u))
  return {
    features,
    step: waveStep(ordinal),
    uuids,
    digest,
    borrowed: entropy(),
    owes: [...TRINITY_FILES].filter((f) => /^(SKILL\.md|index\.ts|test\.ts)$/.test(f)).sort(),
  }
}

/**
 * Compose a planned sequence of waves to its resting horo position. Folds each
 * wave's step through `composeSteps` (product mod 9) — always lands back on the
 * ring (closed). An empty plan rests at unity (the absorbing close); a single
 * wave rests at its own step.
 */
export function composeWaves(waves: ReadonlyArray<Wave>): HoroStep {
  if (waves.length === 0) return UNITY
  return waves.map((w) => w.step).reduce((a, b) => composeSteps(a, b)) as HoroStep
}

/** A wave is CLOSING — ready to collide — when it rests at unity (the merge-point opens the next octave). */
export function isClosingWave(w: Wave): boolean {
  return isHoroStep(w.step) && w.step === UNITY
}

/** The live entropy slack a wave's exhale borrows (the same number quantum/entropy report). */
export const waveEntropy = (): number => entropy()

/** The dual of `wave` as folded from the corpus — the collide/inhale pole it will later discharge into. */
export const collideOf = (): string[] => dualOf('wave')

export {
  selfBalancingWaveLoad,
  waveDispatchCost,
  tamperCostForWave,
  pathComparableUnits,
  type WaveBatch,
  type SelfBalancingWavePlan,
  type SelfBalancingWaveLoadOpts,
  type WaveDispatchCostOpts,
  type WaveTamperCostOpts,
} from './load'

/** Development wave descriptor for a batch (exhale unit per horo step). */
export function waveOfBatch<T>(batch: WaveBatch<T>): Wave {
  return wave(
    batch.items.map((item) => ({ name: String(item) })),
    batch.ordinal,
  )
}

export {
  createWaveSession,
  completeWaveHop,
  waveSessionVerdict,
  isWaveSessionReady,
  type WaveSession,
  type WaveSessionVerdict,
} from './session'

export {
  scheduleCorpusPathsInWaves,
  scheduleCorpusPathsWithPolicy,
  corpusWaveOptsFromPolicy,
  corpusPathWaveBatches,
  runCorpusWaveChunks,
  type CorpusWaveScheduleOpts,
} from './scheduler'

export {
  maxWorkTamperPolicy,
  baselineWorkTamperPolicy,
  workTamperProduct,
  workSealedFromUnits,
  coverageFromWorkUnits,
  tamperCostLog2ForCoverage,
  tamperCostForImproveReceipt,
  workUnitsFromImproveCycle,
  workUnitFromWaveBatch,
  type MaxWorkTamperPolicy,
  type WorkUnit,
  type WorkTamperProductVerdict,
  type ImproveReceiptTamperOpts,
} from './policy'

if (import.meta.url === 'file://' + process.argv[1]) {
  const feats: Feature[] = [{ name: 'wave' }, { name: 'feature' }, { name: 'breath' }]
  const w = wave(feats, 1)
  console.log('wave — one development breath (the EXHALE; collide deferred):')
  console.log('  features: ' + feats.map((f) => f.name).join(' · '))
  console.log('  step: ' + w.step + ' (development-horo position; ring ' + HORO_DIGITS.join('·') + ')')
  console.log('  uuids: ' + w.uuids.length + '  digest=' + (w.digest ?? '∅'))
  console.log('  owes (trinity per feature): ' + w.owes.join(' '))
  console.log('  borrowed entropy (live slack the collide will DRY): ' + w.borrowed.toFixed(4))
  const plan = [wave(feats, 1), wave(feats, 6), wave(feats, 7)]
  const rest = composeWaves(plan)
  console.log('  plan of ' + plan.length + ' waves rests at horo ' + rest + (rest === UNITY ? ' (closing — ready to collide)' : ' (still charging)'))
}
