/**
 * readme/entropy — gaps · seals · residual entropy in comparable units (eb).
 *
 * Every folder README balance sheet posts gap debits and seal credits on one
 * normalized scale so corpus rollups sum meaningfully. One **entropy-bit (eb)**
 * = one Landauer tamper-cost log₂ bit at the horo imperial-ratio floor:
 *
 *   eb(line) = amount × baseWeight(category) × horoScale(digit)
 *
 * where baseWeight is log₂ of the structural multiplicity opened (gap) or closed
 * (seal), and horoScale = horoRatio(digit, 10) when the facet is ring-positioned.
 *
 * @audit every line derived from folder model + cross impurities — never hand-set
 * @see ../seal — ../horo — ../entropy — ./SKILL.md
 */
import { horoRatio, isHoroStep, type HoroStep } from '@/horo'
import { entropyProofMarkdown } from '@/accounting/entropy-proof'
import { folderNameValid, trinityStateOf, type PivotFolderInput } from '@/pivot'
import type { DiamondMembershipViolation } from '@/diamond/membership'
import { COMPARABLE_UNIT, LANDAUER_BIT } from './entropy-unit'

export { COMPARABLE_UNIT, LANDAUER_BIT } from './entropy-unit'

/** Minimal statement shape — avoids readme/index circular import. */
export interface EntropyStatementInput {
  readonly debits: ReadonlyArray<{ readonly account: string; readonly amount: number }>
  readonly credits: ReadonlyArray<{ readonly account: string; readonly amount: number }>
  readonly balanced: boolean
  readonly variance: number
}

/** log₂ base weights for gap categories (disorder borrowed). */
export const GAP_BASE_WEIGHT: Readonly<Record<string, number>> = {
  trinity: Math.log2(3),
  stray: Math.log2(2),
  unfolded: Math.log2(4),
  link: LANDAUER_BIT,
  horo: LANDAUER_BIT,
  uuid: LANDAUER_BIT,
  escape: LANDAUER_BIT,
  typography: LANDAUER_BIT,
  membership: Math.log2(2),
  'folder-name': LANDAUER_BIT,
  matrix: Math.log2(2),
  ancestor: Math.log2(2),
  deployment: LANDAUER_BIT,
  partition: LANDAUER_BIT,
  path: LANDAUER_BIT,
  gravity: LANDAUER_BIT,
}

/** log₂ base weights for seal categories (order credited). */
export const SEAL_BASE_WEIGHT: Readonly<Record<string, number>> = {
  trinity: LANDAUER_BIT,
  folded: LANDAUER_BIT,
  link: LANDAUER_BIT,
  horo: LANDAUER_BIT,
  uuid: LANDAUER_BIT,
  boundary: LANDAUER_BIT,
  typography: LANDAUER_BIT,
  membership: LANDAUER_BIT,
  ancestor: LANDAUER_BIT,
  matrix: LANDAUER_BIT,
  reciprocal: LANDAUER_BIT / 2,
  deployment: LANDAUER_BIT,
  diamond: Math.log2(3),
  balanced: LANDAUER_BIT,
  entropy: LANDAUER_BIT,
  gravity: LANDAUER_BIT,
}

/** One gap debit or seal credit on the entropy balance sheet. */
export interface EntropyLine {
  readonly side: 'gap' | 'seal'
  readonly account: string
  readonly category: string
  readonly amount: number
  readonly comparable: number
  readonly source: string
}

/** Per-folder entropy accounting — gaps debited, seals credited, net residual. */
export interface FolderEntropyAccounting {
  readonly unit: typeof COMPARABLE_UNIT
  readonly gaps: readonly EntropyLine[]
  readonly seals: readonly EntropyLine[]
  readonly totalGapEb: number
  readonly totalSealEb: number
  readonly netEntropyEb: number
  readonly sealGapRatio: number
}

/** Per-sector rollup row — typography partition in comparable units. */
export interface SectorEntropyRollup {
  readonly partition: string
  readonly folders: number
  readonly gapEb: number
  readonly sealEb: number
  readonly netEb: number
}

/** Corpus-wide entropy rollup for the root README. */
export interface CorpusEntropyRollup {
  readonly unit: typeof COMPARABLE_UNIT
  readonly totalGapEb: number
  readonly totalSealEb: number
  readonly netEntropyEb: number
  readonly sealGapRatio: number
  readonly sealedMass: number
  readonly unsealedMass: number
  readonly bySector: readonly SectorEntropyRollup[]
}

const roundEb = (n: number): number => Math.round(n * 1000) / 1000

const horoScaleOf = (digit: number | null, horoScaled: boolean): number => {
  if (!horoScaled || digit === null) return 1
  return isHoroStep(digit) ? horoRatio(digit as HoroStep) : 1
}

/**
 * Map one gap/seal line to comparable units (eb).
 * eb = amount × baseWeight(category) × horoScale(digit).
 */
export function toComparableUnit(
  line: Pick<EntropyLine, 'side' | 'category' | 'amount'> & { readonly horoScaled?: boolean },
  horo: number | null = null,
): number {
  const weights = line.side === 'gap' ? GAP_BASE_WEIGHT : SEAL_BASE_WEIGHT
  const base = weights[line.category] ?? LANDAUER_BIT
  const scale = horoScaleOf(horo, line.horoScaled ?? line.category === 'horo')
  return roundEb(line.amount * base * scale)
}

const mkLine = (
  side: 'gap' | 'seal',
  category: string,
  account: string,
  amount: number,
  source: string,
  horo: number | null,
  horoScaled = false,
): EntropyLine => {
  const comparable = toComparableUnit({ side, category, amount, horoScaled }, horo)
  return { side, account, category, amount, comparable, source }
}

const liabilityKey = (account: string): string | null => {
  if (account.includes('[[trinity]]')) return 'trinity'
  if (account.includes('[[lattice]]/unfolded')) return 'unfolded'
  if (account.includes('[[links]]/dangling')) return 'link'
  if (account.includes('[[horo]]/off-ring')) return 'horo'
  if (account.includes('[[identity]]/uuid')) return 'uuid'
  if (account.includes('[[boundary]]/escape')) return 'escape'
  if (account.includes('[[typography]]/partition')) return 'typography'
  return null
}

const assetKey = (account: string): string | null => {
  if (account.includes('[[trinity]]')) return 'trinity'
  if (account.includes('[[lattice]]/folded')) return 'folded'
  if (account.includes('[[links]]/resolved')) return 'link'
  if (account.includes('[[horo]]/ring')) return 'horo'
  if (account.includes('[[identity]]/uuid')) return 'uuid'
  if (account.includes('[[boundary]]/barrel')) return 'boundary'
  if (account.includes('[[typography]]/partition')) return 'typography'
  return null
}

const impurityCategory = (imp: string): { category: string; account: string; amount: number } | null => {
  if (imp.includes('trinity.form')) return { category: 'trinity', account: '[[gap]]/[[trinity]]/form', amount: 1 }
  if (imp.includes('trinity.code')) return { category: 'trinity', account: '[[gap]]/[[trinity]]/code', amount: 1 }
  if (imp.includes('trinity.proof')) return { category: 'trinity', account: '[[gap]]/[[trinity]]/proof', amount: 1 }
  if (imp.includes('off-ring')) return { category: 'horo', account: '[[gap]]/[[horo]]/off-ring', amount: 1 }
  if (imp.includes('links unresolved')) {
    const m = imp.match(/(\d+)\/(\d+)/)
    const n = m ? Number(m[1]) : 1
    return { category: 'link', account: '[[gap]]/[[links]]/dangling', amount: n }
  }
  if (imp.includes('boundary escapes')) {
    const m = imp.match(/\((\d+)\)/)
    const n = m ? Number(m[1]) : 1
    return { category: 'escape', account: '[[gap]]/[[boundary]]/escape', amount: n }
  }
  if (imp.includes('not folded')) return { category: 'unfolded', account: '[[gap]]/[[lattice]]/unfolded', amount: 1 }
  if (imp.includes('seal propagation') || imp.includes('ancestor chain'))
    return { category: 'ancestor', account: '[[gap]]/[[path]]/ancestor', amount: 1 }
  if (imp.includes('coordinate bind broken') || imp.includes('coordinate cross incomplete'))
    return { category: 'matrix', account: '[[gap]]/[[matrix]]/bind', amount: 1 }
  if (imp.includes('<2 coordinate crosses'))
    return { category: 'matrix', account: '[[gap]]/[[matrix]]/crosses', amount: 1 }
  if (imp.includes('lacks reciprocal'))
    return { category: 'matrix', account: '[[gap]]/[[matrix]]/reciprocal', amount: 1 }
  if (imp.includes('typography plane unbound') || imp.includes('partition:'))
    return { category: 'partition', account: '[[gap]]/[[partition]]/plane', amount: 1 }
  if (imp.includes('deployment:') || imp.includes('no materialised face'))
    return { category: 'deployment', account: '[[gap]]/[[deployment]]/face', amount: 1 }
  if (imp.includes('path lattice:') || imp.includes('path ledger:') || imp.includes('not recorded+implemented'))
    return { category: 'path', account: '[[gap]]/[[path]]/lattice', amount: 1 }
  if (imp.includes('atom not folded'))
    return { category: 'unfolded', account: '[[gap]]/[[lattice]]/unfolded', amount: 1 }
  if (imp.includes('SKILL: frontmatter'))
    return { category: 'trinity', account: '[[gap]]/[[trinity]]/form', amount: 1 }
  return null
}

export interface AccountGapsAndSealsInput {
  readonly atomPath: string
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
  readonly horo: number | null
  readonly sealed: boolean
  readonly statement: EntropyStatementInput
  readonly typography: { readonly partition: string; readonly partitionRoot: string }
  readonly membershipViolations?: readonly DiamondMembershipViolation[]
  readonly crossImpurities?: readonly string[]
  readonly membershipOk?: boolean
  readonly gravityHeld?: boolean
}

/** Build gap debits + seal credits from folder facts and cross impurities — pure. */
export function accountGapsAndSeals(input: AccountGapsAndSealsInput): FolderEntropyAccounting {
  const gaps: EntropyLine[] = []
  const seals: EntropyLine[] = []
  const gapKeys = new Set<string>()
  const sealKeys = new Set<string>()
  const horo = input.horo

  const addGap = (
    category: string,
    account: string,
    amount: number,
    source: string,
    horoScaled = false,
  ): void => {
    const key = `${category}::${account}`
    if (gapKeys.has(key)) return
    gapKeys.add(key)
    gaps.push(mkLine('gap', category, account, amount, source, horo, horoScaled))
  }

  const addSeal = (
    category: string,
    account: string,
    amount: number,
    source: string,
    horoScaled = false,
  ): void => {
    const key = `${category}::${account}`
    if (sealKeys.has(key)) return
    sealKeys.add(key)
    seals.push(mkLine('seal', category, account, amount, source, horo, horoScaled))
  }

  const pivotInput: PivotFolderInput = {
    atomPath: input.atomPath,
    form: input.form,
    code: input.code,
    proof: input.proof,
    horo,
    sealed: input.sealed,
    statement: input.statement,
    typography: { ...input.typography, bondDegree: 0, graphRoot: '' },
  }

  for (const c of input.statement.credits) {
    if (!c.account.includes('[[liability]]')) continue
    const cat = liabilityKey(c.account)
    if (!cat) continue
    addGap(cat, `[[gap]]/${c.account.replace('[[liability]]/', '')}`, c.amount, 'statement')
  }

  for (const d of input.statement.debits) {
    if (!d.account.includes('[[asset]]')) continue
    const cat = assetKey(d.account)
    if (!cat) continue
    addSeal(cat, `[[seal]]/${d.account.replace('[[asset]]/', '')}`, d.amount, 'statement', cat === 'horo')
  }

  for (const v of input.membershipViolations ?? []) {
    addGap('stray', `[[gap]]/[[diamond]]/stray/${v.file}`, 1, v.reason)
  }

  if (!folderNameValid(input.atomPath)) {
    addGap('folder-name', '[[gap]]/[[folder]]/name', 1, 'one-word')
  }
  const trinity = trinityStateOf(pivotInput)
  if (trinity === 'incomplete' && input.code) {
    const missing = (['form', 'code', 'proof'] as const).filter((k) => input[k] === 0)
    for (const leg of missing) {
      addGap('trinity', `[[gap]]/[[trinity]]/${leg}`, 1, 'folder-law')
    }
  }

  for (const imp of input.crossImpurities ?? []) {
    const mapped = impurityCategory(imp)
    if (!mapped) continue
    addGap(mapped.category, mapped.account, mapped.amount, imp, mapped.category === 'horo')
  }

  if (input.sealed) {
    addSeal('diamond', '[[seal]]/[[diamond]]/sealed', 1, 'seal/index.ts')
  }
  if (input.statement.balanced && input.statement.variance === 0) {
    addSeal('balanced', '[[seal]]/[[balance]]/zero', 1, 'conservation')
  }
  if (input.gravityHeld) {
    addSeal('gravity', '[[seal]]/[[gravity]]/held', 1, 'folder-law')
  }
  if (input.membershipOk) {
    addSeal('membership', '[[seal]]/[[diamond]]/membership', 1, 'membership')
  }
  if (input.typography.partitionRoot && !sealKeys.has('typography::[[seal]]/[[typography]]/partition')) {
    addSeal('typography', '[[seal]]/[[typography]]/partition', 1, 'typography-graph')
  }

  const totalGapEb = roundEb(gaps.reduce((s, l) => s + l.comparable, 0))
  const totalSealEb = roundEb(seals.reduce((s, l) => s + l.comparable, 0))
  const netEntropyEb = roundEb(totalGapEb - totalSealEb)
  const sealGapRatio = totalGapEb > 0 ? roundEb(totalSealEb / totalGapEb) : totalSealEb > 0 ? 1 : 0

  return {
    unit: COMPARABLE_UNIT,
    gaps,
    seals,
    totalGapEb,
    totalSealEb,
    netEntropyEb,
    sealGapRatio,
  }
}

/** @deprecated alias — use accountGapsAndSeals */
export const computeFolderEntropy = accountGapsAndSeals

export interface GapsAccountedVerdict {
  readonly accounted: boolean
  readonly silent: readonly string[]
}

export interface AssertGapsAccountedOpts {
  /** When true, any remaining gap line fails closed — sealed atoms must net to zero gap eb. */
  readonly sealed?: boolean
}

/** Every finishedIdeaCrossed / folder-law impurity must appear on the entropy sheet. */
export function assertGapsAccounted(
  accounting: FolderEntropyAccounting,
  impurities: readonly string[],
  opts?: AssertGapsAccountedOpts,
): GapsAccountedVerdict {
  const silent: string[] = []
  for (const imp of impurities) {
    const mapped = impurityCategory(imp)
    if (!mapped) {
      silent.push(imp)
      continue
    }
    const found = accounting.gaps.some(
      (g) => g.category === mapped.category && (g.source === imp || g.account.includes(mapped.account.split('/').pop()!)),
    )
    if (!found) silent.push(imp)
  }
  if (opts?.sealed && accounting.gaps.length > 0) {
    for (const g of accounting.gaps) {
      silent.push(`sealed gap line: ${g.account} (${g.comparable} eb) · ${g.source}`)
    }
  }
  return { accounted: silent.length === 0, silent }
}

export interface SealsAccountedVerdict {
  readonly accounted: boolean
  readonly untraced: readonly string[]
}

const TRACEABLE_SEAL_SOURCES = new Set(['statement', 'seal/index.ts', 'conservation', 'folder-law', 'membership', 'typography-graph'])

/** Every seal credit must trace to seal/index.ts facets or the diamond sealed bit. */
export function assertSealsAccounted(
  accounting: FolderEntropyAccounting,
  sealed: boolean,
): SealsAccountedVerdict {
  const untraced: string[] = []
  for (const s of accounting.seals) {
    if (!TRACEABLE_SEAL_SOURCES.has(s.source) && s.category !== 'diamond') untraced.push(s.account)
  }
  if (sealed && !accounting.seals.some((s) => s.category === 'diamond')) {
    untraced.push('[[seal]]/[[diamond]]/sealed')
  }
  return { accounted: untraced.length === 0, untraced }
}

/** Roll up folder entropy into corpus metrics — pure, deterministic. */
export function aggregateCorpusEntropy(
  models: ReadonlyArray<{ readonly entropy: FolderEntropyAccounting; readonly sealed: boolean; readonly typography: { readonly partition: string } }>,
): CorpusEntropyRollup {
  let totalGapEb = 0
  let totalSealEb = 0
  let sealedMass = 0
  const sectorAcc = new Map<string, { gapEb: number; sealEb: number; folders: number }>()

  for (const m of models) {
    totalGapEb += m.entropy.totalGapEb
    totalSealEb += m.entropy.totalSealEb
    if (m.sealed) sealedMass++
    const part = m.typography.partition
    const row = sectorAcc.get(part) ?? { gapEb: 0, sealEb: 0, folders: 0 }
    row.gapEb += m.entropy.totalGapEb
    row.sealEb += m.entropy.totalSealEb
    row.folders++
    sectorAcc.set(part, row)
  }

  totalGapEb = roundEb(totalGapEb)
  totalSealEb = roundEb(totalSealEb)
  const netEntropyEb = roundEb(totalGapEb - totalSealEb)
  const sealGapRatio = totalGapEb > 0 ? roundEb(totalSealEb / totalGapEb) : totalSealEb > 0 ? 1 : 0

  const bySector: SectorEntropyRollup[] = [...sectorAcc.entries()]
    .sort((a, b) => b[1].gapEb - a[1].gapEb || a[0].localeCompare(b[0]))
    .map(([partition, row]) => ({
      partition,
      folders: row.folders,
      gapEb: roundEb(row.gapEb),
      sealEb: roundEb(row.sealEb),
      netEb: roundEb(row.gapEb - row.sealEb),
    }))

  return {
    unit: COMPARABLE_UNIT,
    totalGapEb,
    totalSealEb,
    netEntropyEb,
    sealGapRatio,
    sealedMass,
    unsealedMass: models.length - sealedMass,
    bySector,
  }
}

/** Merge two corpus entropy rollups — wave-batch accumulator (OOM guard). */
export function mergeCorpusEntropy(a: CorpusEntropyRollup, b: CorpusEntropyRollup): CorpusEntropyRollup {
  const totalGapEb = roundEb(a.totalGapEb + b.totalGapEb)
  const totalSealEb = roundEb(a.totalSealEb + b.totalSealEb)
  const netEntropyEb = roundEb(totalGapEb - totalSealEb)
  const sealGapRatio = totalGapEb > 0 ? roundEb(totalSealEb / totalGapEb) : totalSealEb > 0 ? 1 : 0
  const sectorAcc = new Map<string, { gapEb: number; sealEb: number; folders: number }>()
  for (const row of [...a.bySector, ...b.bySector]) {
    const cur = sectorAcc.get(row.partition) ?? { gapEb: 0, sealEb: 0, folders: 0 }
    cur.gapEb += row.gapEb
    cur.sealEb += row.sealEb
    cur.folders += row.folders
    sectorAcc.set(row.partition, cur)
  }
  const bySector: SectorEntropyRollup[] = [...sectorAcc.entries()]
    .sort((x, y) => y[1].gapEb - x[1].gapEb || x[0].localeCompare(y[0]))
    .map(([partition, row]) => ({
      partition,
      folders: row.folders,
      gapEb: roundEb(row.gapEb),
      sealEb: roundEb(row.sealEb),
      netEb: roundEb(row.gapEb - row.sealEb),
    }))
  return {
    unit: COMPARABLE_UNIT,
    totalGapEb,
    totalSealEb,
    netEntropyEb,
    sealGapRatio,
    sealedMass: a.sealedMass + b.sealedMass,
    unsealedMass: a.unsealedMass + b.unsealedMass,
    bySector,
  }
}

export interface CorpusEntropyRenderOpts {
  readonly violationCount?: number
  readonly workTamperProduct?: number
}

/** Render corpus entropy section for the root README — pure. */
export function renderCorpusEntropySection(
  rollup: CorpusEntropyRollup,
  opts: CorpusEntropyRenderOpts = {},
): string {
  const L: string[] = [
    '## corpus entropy',
    '',
    'Gap debits and seal credits roll up in **comparable units (eb)** — entropy-bits',
    '(tamper-cost log₂ mass at the horo imperial-ratio floor). Folders and sectors sum on one scale.',
    '',
    `- gap mass \`${rollup.totalGapEb}\` eb · seal mass \`${rollup.totalSealEb}\` eb · net residual \`${rollup.netEntropyEb}\` eb`,
    `- seal/gap ratio \`${rollup.sealGapRatio}\` · sealed \`${rollup.sealedMass}\` · unsealed \`${rollup.unsealedMass}\``,
    '',
    '| partition | folders | gap eb | seal eb | net eb |',
    '| --------- | ------: | -----: | ------: | -----: |',
  ]
  for (const row of rollup.bySector.slice(0, 12)) {
    L.push(`| ${row.partition} | ${row.folders} | ${row.gapEb} | ${row.sealEb} | ${row.netEb} |`)
  }
  if (rollup.bySector.length > 12) {
    L.push(`| … | ${rollup.bySector.length - 12} more sectors | — | — | — |`)
  }
  // Free-energy proof line — computed via Landauer bindings (not hand-maintained).
  L.push(
    entropyProofMarkdown({
      entropyEb: rollup.netEntropyEb,
      violationCount: opts.violationCount ?? 0,
      workTamperProduct: opts.workTamperProduct ?? 0,
      totalSealEb: rollup.totalSealEb,
      totalGapEb: rollup.totalGapEb,
    }),
  )
  return L.join('\n')
}

const fmtEbLine = (line: EntropyLine | undefined): string =>
  line ? `${line.account} \`${line.comparable}\` eb` : ''

/** Render per-folder entropy balance section — pure. */
export function renderFolderEntropySection(
  accounting: FolderEntropyAccounting,
  atomPath?: string,
): string {
  const rows = Math.max(accounting.gaps.length, accounting.seals.length)
  const L: string[] = [
    '## [[entropy]] — gaps · seals',
    '',
    ...(atomPath
      ? [`> account code \`${atomPath}\` · currency \`${accounting.unit}\` (entropy-bit)`, '']
      : []),
    `Comparable unit: **${accounting.unit}** (entropy-bit) — \`eb = amount × log₂(weight) × horoRatio/10\`.`,
    '',
    '| [[gap]] debit (eb) | [[seal]] credit (eb) |',
    '| -----------------: | -------------------: |',
  ]
  for (let i = 0; i < rows; i++) {
    L.push(`| ${fmtEbLine(accounting.gaps[i])} | ${fmtEbLine(accounting.seals[i])} |`)
  }
  L.push(
    `| Σ gap \`${accounting.totalGapEb}\` eb | Σ seal \`${accounting.totalSealEb}\` eb |`,
    '',
    `> net residual \`${accounting.netEntropyEb}\` eb · seal/gap ratio \`${accounting.sealGapRatio}\` · [[entropy]] · [[seal]]`,
    '',
  )
  return L.join('\n')
}
