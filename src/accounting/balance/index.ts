/**
 * accounting/balance — all meetings resolve to one balance equation.
 *
 * partition: Σdebit − Σcredit = 0        (identity — every posting carries a [[balance]] contra)
 * purity:   variance = Σ[[liability]] + membership shortfall
 * entropy:  Σgap − Σseal = netEb
 * pack:     wordHalf ‖ digitHalf = combined128   (concatenation on the double torus)
 * interact: wordHalf ∧ digitHalf ∧ mask = interact64   (AND on the ring)
 *
 * @see ../../quantum/fold — ../../readme/compute — ../../balance
 */
import type { FolderReadmeModel } from '@/readme/compute'
import {
  doubleFold,
  quantumFoldOf,
  wordFold,
  digitFold,
} from '@/quantum/fold'
import { architectureBits, architectureMask } from '@/quantum/word'
import { exactMax, exactRound, roundTo } from '@/algebra'

/**
 * Every equation this section prints, each as the code evaluates it.
 *
 * `Σdebit − Σcredit = 0` was already right, and it is an IDENTITY, not a finding: every
 * posting carries a `[[balance]]` contra leg, so the sums conserve whatever state the
 * atom is in. What was missing is the formula for the number printed beside them —
 * `variance` is the **liability-gap mass** (`applyFolderGravityGate`), plus a membership
 * shortfall, and nothing said so. A table reading `debit 9 · credit 9 · variance 1` is
 * therefore consistent, and it looks like an arithmetic error until the second formula
 * is on the page. A leg posted to `[[liability]]` is answered by a `[[balance]]` debit,
 * which is exactly why the difference cannot see it.
 *
 * `⊗` also did two jobs. The 128-bit word is a CONCATENATION (`combineArchitectures`
 * packs the halves side by side) while `interact64` is a bitwise AND masked to the ring
 * — and the AND had no formula printed at all, only a number. `‖` is the pack and `∧`
 * is the interaction, so the symbol no longer decides which of the two a reader means.
 *
 * @accounting IAS-1 §27 — the accrual basis: every posting carries its contra, so the
 *   sums conserve and `Σdebit − Σcredit = 0` is an identity rather than a finding
 */
export const BALANCE_EQUATION =
  'Σdebit − Σcredit = 0 · variance = Σ[[liability]] + membership · Σgap − Σseal = netEb · wordHalf ‖ digitHalf = combined128 · wordHalf ∧ digitHalf ∧ mask = interact64'

export interface BalanceMeeting {
  readonly partitionVariance: number
  readonly totalDebits: number
  readonly totalCredits: number
  readonly gapEb: number
  readonly sealEb: number
  readonly netEb: number
  readonly wordHalf: bigint
  readonly digitHalf: bigint
  readonly combined128: bigint
  readonly interact: bigint
  /**
   * Σ of the `[[liability]]` credit legs — what `variance` is made of.
   *
   * Summed here rather than through `readme/compute`'s `folderLiabilityGap`: that module
   * value-imports this one, so reaching back for the helper would close a runtime import
   * loop ([[rules]]/cycle). Two lines against an initialisation-order accident.
   */
  readonly liabilityMass: number
  readonly sealed: boolean
}

export interface PartitionBalance {
  readonly debitBits: number
  readonly creditBits: number
  readonly variance: number
  readonly balanced: boolean
}

export interface CorpusBalance {
  readonly netEb: number
  readonly gapEb: number
  readonly sealEb: number
  readonly variance: number
  readonly balanced: number
  readonly atomCount: number
}

export interface AllMeetsInBalanceInput {
  readonly folder?: FolderReadmeModel
  readonly corpus?: CorpusBalance
  readonly atomPath?: string
}

export interface AllMeetsInBalanceResult {
  readonly scope: string
  readonly equation: string
  readonly atomPath: string
  readonly partitionVariance: number
  readonly netEb: number
  readonly corpusNetEb?: number
  readonly fold128: string
  readonly wordHalf: bigint
  readonly digitHalf: bigint
  readonly interact64: bigint
  readonly sealed: boolean
}

const hexTrunc = (n: bigint, len = 16): string => {
  const h = n.toString(16)
  return h.length > len ? `${h.slice(0, len)}…` : h
}

const hexFull = (n: bigint): string => `0x${n.toString(16)}`

const fold128Hex = (combined128: bigint): string =>
  combined128.toString(16).padStart(32, '0').slice(-32)

export function partitionBalance(model: FolderReadmeModel): PartitionBalance {
  const debitBits = model.statement.debits.reduce((s, l) => s + l.amount, 0)
  const creditBits = model.statement.credits.reduce((s, l) => s + l.amount, 0)
  return {
    debitBits,
    creditBits,
    variance: model.statement.variance,
    balanced: model.statement.balanced,
  }
}

export function corpusBalanceFromModels(
  models: readonly FolderReadmeModel[],
): CorpusBalance {
  let netEb = 0
  let gapEb = 0
  let sealEb = 0
  let variance = 0
  let balanced = 0
  for (const m of models) {
    netEb += m.entropy.netEntropyEb
    gapEb += m.entropy.totalGapEb
    sealEb += m.entropy.totalSealEb
    variance += m.statement.variance
    if (m.statement.balanced) balanced++
  }
  return { netEb, gapEb, sealEb, variance, balanced, atomCount: models.length }
}

export function foldBalance(atomPath: string, model?: FolderReadmeModel) {
  if (!model) return doubleFold(atomPath)
  return quantumFoldOf(atomPath, {
    sealed: model.sealed,
    debits: model.statement.debits,
    credits: model.statement.credits,
  })
}

export function plainLanguageOf(meeting: AllMeetsInBalanceResult): string {
  return [
    `scope \`${meeting.scope}\` on \`${meeting.atomPath}\``,
    `partition variance \`${meeting.partitionVariance}\` · net \`${meeting.netEb}\` eb`,
    `word·digit fold128 \`${meeting.fold128}\``,
    'debit·credit · gap·seal · word·digit — **all meet in balance**',
  ].join(' · ')
}

export function allMeetsInBalance(
  scope: string,
  input: AllMeetsInBalanceInput,
): AllMeetsInBalanceResult {
  const atomPath = input.atomPath ?? scope
  const model = input.folder
  const fold = foldBalance(atomPath, model)
  const partition = model ? partitionBalance(model) : null
  return {
    scope,
    equation: BALANCE_EQUATION,
    atomPath,
    partitionVariance: partition?.variance ?? input.corpus?.variance ?? 0,
    netEb: model?.entropy.netEntropyEb ?? input.corpus?.netEb ?? 0,
    corpusNetEb: input.corpus?.netEb,
    fold128: fold128Hex(fold.combined128),
    wordHalf: fold.wordHalf,
    digitHalf: fold.digitHalf,
    interact64: fold.interact64,
    sealed: model?.sealed ?? false,
  }
}

export function balanceMeetingFromModel(model: FolderReadmeModel): BalanceMeeting {
  const fold = quantumFoldOf(model.atomPath, {
    sealed: model.sealed,
    debits: model.statement.debits,
    credits: model.statement.credits,
  })
  return {
    partitionVariance: model.statement.variance,
    totalDebits: model.statement.totalDebits,
    totalCredits: model.statement.totalCredits,
    gapEb: model.entropy.totalGapEb,
    sealEb: model.entropy.totalSealEb,
    netEb: model.entropy.netEntropyEb,
    wordHalf: fold.wordHalf,
    digitHalf: fold.digitHalf,
    combined128: fold.combined128,
    interact: fold.interact64,
    liabilityMass: model.statement.credits
      .filter((c) => c.account.includes('[[liability]]'))
      .reduce((sum, c) => sum + c.amount, 0),
    sealed: model.sealed,
  }
}

/** One stated equation and whether the numbers beside it satisfy it. */
export interface EquationCheck {
  readonly stated: string
  readonly holds: boolean
}

/**
 * Check the printed equation against the printed numbers.
 *
 * `BALANCE_EQUATION` is emitted above the table it describes, so the two can disagree
 * — and did, for every unbalanced atom, because the string asserted `= 0`. This makes
 * the sentence refutable: change one side of any meeting and a leg goes red.
 *
 * `variance` is the statement's own figure rather than `Σdebit − Σcredit`: a leg posted
 * on the wrong side leaves both sums equal while the atom is out of balance, which is
 * exactly the case that produces `debit 9 · credit 9 · variance 3`. So the partition
 * leg checks the IMPLICATION the equation really carries — variance 0 iff balanced —
 * not a subtraction that cannot see a side error.
 */
export function balanceEquationHolds(m: BalanceMeeting): readonly EquationCheck[] {
  const mask = architectureMask()
  const bits = BigInt(architectureBits())
  return [
    { stated: 'Σdebit − Σcredit = 0', holds: m.totalDebits - m.totalCredits === 0 },
    {
      // The shortfall is ≥ 0 and invisible from here, so the checkable half is the
      // inequality plus the balanced ⇒ zero implication. Equality holds iff membership
      // is pure, which only the model that produced the statement knows.
      stated: 'variance = Σ[[liability]] + membership',
      holds: m.partitionVariance >= m.liabilityMass && (!m.sealed || m.partitionVariance === 0),
    },
    { stated: 'Σgap − Σseal = netEb', holds: roundTo3(m.gapEb - m.sealEb) === roundTo3(m.netEb) },
    {
      stated: 'wordHalf ‖ digitHalf = combined128',
      holds: m.combined128 === (((m.wordHalf & mask) << bits) | (m.digitHalf & mask)),
    },
    { stated: 'wordHalf ∧ digitHalf ∧ mask = interact64', holds: m.interact === ((m.wordHalf & m.digitHalf) & mask) },
  ]
}

const roundTo3 = (n: number): number => roundTo(n, 3)

export function balanceMeetingOf(model: FolderReadmeModel): BalanceMeeting
export function balanceMeetingOf(
  scope: string,
  input: AllMeetsInBalanceInput,
): AllMeetsInBalanceResult
export function balanceMeetingOf(
  scopeOrModel: string | FolderReadmeModel,
  input?: AllMeetsInBalanceInput,
): BalanceMeeting | AllMeetsInBalanceResult {
  if (typeof scopeOrModel !== 'string') return balanceMeetingFromModel(scopeOrModel)
  return allMeetsInBalance(scopeOrModel, input!)
}

export function renderBalanceMeetingPivotSection(model: FolderReadmeModel): string {
  const m = balanceMeetingFromModel(model)
  const combinedHex = m.combined128.toString(16)
  return [
    '### all meet in balance',
    '',
    `debit·credit meet at variance \`${m.partitionVariance}\` (debit \`${m.totalDebits}\` · credit \`${m.totalCredits}\`); gap·seal meet at net \`${m.netEb}\` eb; word·digit meet at \`${combinedHex.slice(0, 16)}${combinedHex.length > 16 ? '…' : ''}\` — **all meet in balance** · sealed \`${m.sealed ? 1 : 0}\`.`,
    '',
    `> equation \`${BALANCE_EQUATION}\``,
    '',
    '| meeting | debit / word | credit / digit | balance |',
    '| ------- | ------------ | -------------- | ------- |',
    `| partition | \`${m.totalDebits}\` | \`${m.totalCredits}\` | Σdebit − Σcredit \`${m.totalDebits - m.totalCredits}\` |`,
    `| purity | [[liability]] \`${m.liabilityMass}\` | membership \`${m.partitionVariance - m.liabilityMass}\` | variance \`${m.partitionVariance}\` |`,
    `| entropy | gap \`${m.gapEb}\` | seal \`${m.sealEb}\` | net \`${m.netEb}\` eb |`,
    `| double fold | word \`${hexTrunc(m.wordHalf)}\` | digit \`${hexTrunc(m.digitHalf)}\` | combined \`${hexTrunc(m.combined128)}\` |`,
    '',
    `- interact64 \`${hexTrunc(m.interact)}\` · torus mask \`${hexTrunc(architectureMask())}\``,
    '- debit·credit meet here; gap·seal meet here; word·digit meet here — **all meet in balance**',
    '',
  ].join('\n')
}

export function renderQuantumFoldSection(model: FolderReadmeModel): string {
  const m = balanceMeetingFromModel(model)
  const rows = exactMax(model.statement.debits.length, model.statement.credits.length)
  const fmt = (account: string, amount: number): string => `[[${account}]] ${amount}`
  const L: string[] = [
    '## quantum fold',
    '',
    `- wordFold \`${hexFull(wordFold(model.atomPath))}\` · digitFold \`${hexFull(digitFold(model.atomPath))}\``,
    `- interact64 \`${hexFull(m.interact)}\` · superposition \`${m.sealed ? 0 : 1}\``,
    '',
    '### 2D partition — debit·credit meet in balance',
    '',
    '| debit | credit |',
    '| ----- | ------ |',
  ]
  for (let i = 0; i < rows; i++) {
    const d = model.statement.debits[i]
    const c = model.statement.credits[i]
    L.push(
      `| ${d ? fmt(d.account, d.amount) : '—'} | ${c ? fmt(c.account, c.amount) : '—'} |`,
    )
  }
  L.push('')
  return L.join('\n')
}

/** @index-cross.foldback child=accounting/balance parent=accounting — this cross folds back into its parent. */
