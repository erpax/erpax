/**
 * accounting/balance — all meetings resolve to one balance equation.
 *
 * partition: Σdebit − Σcredit = variance
 * entropy: Σgap − Σseal = netEb
 * fold: wordFold ⊗ digitFold → combined128 · interact64
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
import { architectureMask } from '@/quantum/word'
import { exactMax } from '@/algebra'

export const BALANCE_EQUATION =
  'Σdebit − Σcredit = 0 · Σgap − Σseal = netEb · wordHalf ⊗ digitHalf = combined128'

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
    sealed: model.sealed,
  }
}

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
    `| partition | \`${m.totalDebits}\` | \`${m.totalCredits}\` | variance \`${m.partitionVariance}\` |`,
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
