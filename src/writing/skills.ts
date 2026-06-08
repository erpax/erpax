/**
 * writing/skills — scored exercises for improving writing craft from computed metrics.
 *
 * Scored by variance · trinity · word-matter · prose entropy — not template checklists.
 *
 * @see ./computed — ../rules/word-matter — ../speech — ./SKILL.md
 */
import { wordMatterViolations } from '@/rules/word-matter'
import { computedWritingForPath, writingScore, type ComputedWriting } from './computed'

export interface WritingSkillModel {
  readonly atomPath: string
  readonly cwd?: string
}

export interface SpeechSkillModel extends WritingSkillModel {
  readonly horo?: number
}

export interface SkillExerciseResult {
  readonly score: number
  readonly passes: boolean
  readonly gaps: readonly string[]
  readonly computed: ComputedWriting
}

const PASS_THRESHOLD = 70

/** Identify gaps and score writing craft for one atom — deterministic. */
export function improveWritingSkill(model: WritingSkillModel): SkillExerciseResult {
  const computed = computedWritingForPath(model.atomPath, { cwd: model.cwd })
  const gaps: string[] = []
  if (computed.variance > 0) gaps.push(`balance variance ${computed.variance} — debit/credit mismatch`)
  if (computed.proseRatio > 0.55) gaps.push(`prose ratio ${computed.proseRatio.toFixed(2)} — drive [[links]] up`)
  if (computed.lawLines === 0) gaps.push('missing **Law — [[law]]:** line')
  if (computed.trinity.form + computed.trinity.code + computed.trinity.proof < 3) {
    gaps.push(`trinity incomplete ${computed.trinity.form}${computed.trinity.code}${computed.trinity.proof}`)
  }
  if (!computed.balanced) gaps.push('README debit/credit unbalanced')
  const wm = wordMatterViolations(model.cwd).filter((v) => v.atomPath === model.atomPath)
  if (wm.length > 0) gaps.push(`${wm.length} word-matter violation(s) in matter-twin`)
  let score = writingScore(computed)
  score = Math.max(0, score - wm.length * 5)
  return {
    score,
    passes: score >= PASS_THRESHOLD && computed.balanced && gaps.length === 0,
    gaps,
    computed,
  }
}

/** Writing exercise extended with speech readiness — lower prose + sealed uuid. */
export function improveSpeechSkill(model: SpeechSkillModel): SkillExerciseResult & {
  readonly speechReady: boolean
} {
  const base = improveWritingSkill(model)
  const gaps = [...base.gaps]
  if (!base.computed.contentUuid) gaps.push('missing contentUuid — speech cannot seal')
  const speechReady = Boolean(base.computed.contentUuid) && base.computed.lawLines > 0
  return {
    ...base,
    gaps,
    passes: base.passes && speechReady,
    speechReady,
  }
}
