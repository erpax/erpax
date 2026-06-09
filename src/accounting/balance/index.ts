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
import { quantumFoldOf } from '@/quantum/fold'
import { architectureMask } from '@/quantum/word'

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

const hexTrunc = (n: bigint, len = 16): string => {
  const h = n.toString(16)
  return h.length > len ? `${h.slice(0, len)}…` : h
}

const hexFull = (n: bigint): string => `0x${n.toString(16)}`

/** Unified meeting — partition · entropy · double fold on one folder model. */
export function balanceMeetingOf(model: FolderReadmeModel): BalanceMeeting {
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

/** Pivot block — debit·credit · gap·seal · word·digit meet in balance. */
export function renderBalanceMeetingPivotSection(model: BalanceFolderInput): string {
  const m = balanceMeetingOf(model)
  const combinedHex = m.combined128.toString(16)
  return [
    '### all meet in balance',
    '',
    `debit·credit meet at variance \`${m.partitionVariance}\` (debit \`${m.totalDebits}\` · credit \`${m.totalCredits}\`); gap·seal meet at net \`${m.netEb}\` eb; word·digit meet at \`${combinedHex.slice(0, 16)}${combinedHex.length > 16 ? '…' : ''}\` — **all meet in balance** · sealed \`${m.sealed ? 1 : 0}\`.`,
    '',
    '> equation `Σdebit − Σcredit = 0 · Σgap − Σseal = netEb · wordHalf ⊗ digitHalf = combined128`',
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

/** Double-fold face — wordFold · digitFold · interact64 only (no literary adjectives). */
export function renderQuantumFoldSection(model: BalanceFolderInput): string {
  const m = balanceMeetingOf(model)
  const rows = Math.max(model.statement.debits.length, model.statement.credits.length)
  const fmt = (account: string, amount: number): string => `[[${account}]] ${amount}`
  const L: string[] = [
    '## double fold',
    '',
    `- wordFold \`${hexFull(m.wordHalf)}\` · digitFold \`${hexFull(m.digitHalf)}\``,
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
