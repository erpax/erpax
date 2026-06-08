/**
 * readme/quantum-thinking — agent/session thinking → quantum (superposition | collapse | seal).
 *
 * Loaded immediately during readme generation (single pass with deriveFolderModel) —
 * not a post-hoc skill:upgrade pass. Sources: path ledger entries, session diamond
 * receipts, improve receipts derived from entropy gaps, cheapAgentDispatch context.
 *
 * @audit pure transform; load reads cached path ledger + live atom facets
 * @see ./index.ts — ../skill/router/upgrade/quantum — ../memory/session — ../agent/cheap-dispatch
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { accountCodeOf } from '@/accounting'
import type { SessionArtifact } from '@/memory/session'
import { pathComparableUnits } from '@/wave/load'
import { recordOnPath, type PathCanonicalEntry } from '@/path'
import {
  collapseTriggersOf,
  entangledFieldsOf,
  isQuantumSkillPath,
  type QuantumEnvironment,
} from '@/skill/router/upgrade/quantum'
import { stripFrontmatter, FRONTMATTER } from '@/skill/router/upgrade/seal'
import type { FolderEntropyAccounting } from './entropy'

/** Minimal folder facets needed for thinking load — avoids circular import. */
export interface ThinkingFolderInput {
  readonly atomPath: string
  readonly uuid: string | null
  readonly entropy: FolderEntropyAccounting
  readonly linksTotal: number
  readonly linksResolved: number
  readonly typography: { readonly analysisNeighbors: readonly string[] }
  readonly sealed: boolean
  readonly statement: { readonly balanced: boolean; readonly variance: number }
}

const LAW_RE = /\*\*Law\s+—\s*\[\[law\]\]:\s*(.+?)\*\*/g

/** One receipt row gathered for an atom — path ledger · session · improve · dispatch. */
export interface AgentThinkingReceipt {
  readonly kind: 'path.ledger' | 'session.diamond' | 'improve.receipt' | 'dispatch.context'
  readonly atomPath: string
  readonly entryUuid?: string
  readonly contentUuid?: string
  readonly leafUuid?: string
  readonly seq?: number
}

/** Raw agent/session thinking before quantum collapse. */
export interface AgentThinking {
  readonly atomPath: string
  readonly receipts: readonly AgentThinkingReceipt[]
  readonly pathLedger: readonly PathCanonicalEntry[]
  readonly improveReceipts: readonly PathCanonicalEntry[]
  readonly sessionArtifact: SessionArtifact | null
  readonly dispatchAccount: string | null
  readonly dispatchEb: number | null
  readonly hypotheses: readonly string[]
  readonly decisions: readonly string[]
}

/** Quantum block projected into folder README — superposition | collapse | seal. */
export interface QuantumThinkingBlock {
  readonly atomPath: string
  readonly superposition: readonly string[]
  readonly collapse: readonly string[]
  readonly seal: {
    readonly entryUuids: readonly string[]
    readonly contentUuids: readonly string[]
    readonly pathFollow: boolean
    readonly receipt: boolean
    readonly sealed: boolean
  }
}

/** Corpus rollup — quantum thinking summary for root README. */
export interface CorpusQuantumThinkingRollup {
  readonly atomsWithThinking: number
  readonly totalSuperposition: number
  readonly totalCollapse: number
  readonly totalSealUuids: number
  readonly sealedThinking: number
  readonly byPartition: readonly {
    readonly partition: string
    readonly atoms: number
    readonly superposition: number
    readonly collapse: number
  }[]
}

export interface ThinkingLoadContext {
  readonly pathLedger: readonly PathCanonicalEntry[]
  readonly at?: string
}

const uniqueSorted = (items: readonly string[]): string[] =>
  [...new Set(items.filter(Boolean))].sort()

const gapHypotheses = (entropy: FolderEntropyAccounting): string[] =>
  entropy.gaps.map((g) => `gap:${g.category}:${g.account}`)

const synthesizeImproveReceipts = (
  atomPath: string,
  entropy: FolderEntropyAccounting,
  at: string,
): PathCanonicalEntry[] => {
  if (entropy.gaps.length === 0) return []
  const entries: PathCanonicalEntry[] = []
  let prev: string | null = null
  let seq = 0
  for (const gap of entropy.gaps.slice(0, 8)) {
    const entry = recordOnPath(
      'monitor',
      {
        kind: 'improve.receipt',
        atomPath,
        gapAccount: gap.account,
        gapCategory: gap.category,
        comparable: gap.comparable,
      },
      at,
      prev,
      seq,
    )
    entries.push(entry)
    prev = entry.entryUuid
    seq++
  }
  return entries
}

const readSkillMd = (atomPath: string, cwd: string): string | null => {
  const skillPath = join(cwd, 'src', atomPath, 'SKILL.md')
  if (!existsSync(skillPath)) return null
  try {
    return readFileSync(skillPath, 'utf8')
  } catch {
    return null
  }
}

const entanglementHypotheses = (atomPath: string, md: string | null): string[] => {
  if (!md) return []
  const fm = md.match(FRONTMATTER)?.[1] ?? ''
  const body = stripFrontmatter(md)
  const partition = atomPath.split('/')[0] ?? atomPath
  if (!isQuantumSkillPath(atomPath, partition)) return []
  return entangledFieldsOf(fm, body)
    .filter((f) => f.drift.length > 0)
    .flatMap((f) => f.drift.map((d) => `entangle:${f.field}:${d}`))
}

const linkHypotheses = (linksTotal: number, linksResolved: number): string[] => {
  const dangling = linksTotal - linksResolved
  return dangling > 0 ? [`links:dangling:${dangling}/${linksTotal}`] : []
}

const neighborHypotheses = (neighbors: readonly string[]): string[] =>
  neighbors.slice(0, 6).map((n) => `explore:${n}`)

/**
 * Load agent/session thinking for one atom — path ledger · session · improve · dispatch.
 * Uses cached corpus path ledger when provided (zero extra lattice walk).
 */
export function loadAgentThinking(
  atomPath: string,
  cwd: string = process.cwd(),
  ctx?: ThinkingLoadContext,
  folder?: Pick<
    ThinkingFolderInput,
    'uuid' | 'entropy' | 'linksTotal' | 'linksResolved' | 'typography' | 'sealed' | 'statement'
  >,
): AgentThinking {
  const at = ctx?.at ?? new Date().toISOString()
  const pathLedger = (ctx?.pathLedger ?? []).filter((e) => e.atomPath === atomPath)
  const entropy = folder?.entropy
  const improveReceipts = entropy ? synthesizeImproveReceipts(atomPath, entropy, at) : []
  const sessionArtifact: SessionArtifact | null =
    folder?.sealed && folder.uuid
      ? { contentUuid: folder.uuid, atomPath }
      : null

  const dispatchAccount = accountCodeOf(atomPath)
  const dispatchEb = pathComparableUnits(atomPath)

  const partition = atomPath.split('/')[0] ?? atomPath
  const needsSkillRead =
    isQuantumSkillPath(atomPath, partition) ||
    (entropy?.gaps.length ?? 0) > 0 ||
    (folder?.linksTotal ?? 0) > (folder?.linksResolved ?? 0)
  const skillMd = needsSkillRead ? readSkillMd(atomPath, cwd) : null

  const hypotheses = uniqueSorted([
    ...(entropy ? gapHypotheses(entropy) : []),
    ...entanglementHypotheses(atomPath, skillMd),
    ...linkHypotheses(folder?.linksTotal ?? 0, folder?.linksResolved ?? 0),
    ...neighborHypotheses(folder?.typography.analysisNeighbors ?? []),
  ])

  const decisions: string[] = []
  if (skillMd) {
    let lastLaw: string | null = null
    for (const m of skillMd.matchAll(LAW_RE)) lastLaw = m[1]!.trim()
    if (lastLaw) decisions.push(`law:${lastLaw}`)
    for (const t of collapseTriggersOf(skillMd).slice(0, 6)) decisions.push(`trigger:${t}`)
  }
  if (folder) {
    decisions.push(folder.statement.balanced ? 'balance:conserved' : `balance:variance=${folder.statement.variance}`)
    decisions.push(folder.sealed ? 'seal:sealed' : 'seal:unsealed')
  }

  const receipts: AgentThinkingReceipt[] = []
  for (const e of pathLedger) {
    receipts.push({
      kind: 'path.ledger',
      atomPath,
      entryUuid: e.entryUuid,
      contentUuid: e.payloadUuid,
      seq: e.seq,
    })
  }
  if (sessionArtifact) {
    receipts.push({
      kind: 'session.diamond',
      atomPath,
      contentUuid: sessionArtifact.contentUuid,
    })
  }
  for (const e of improveReceipts) {
    receipts.push({
      kind: 'improve.receipt',
      atomPath,
      entryUuid: e.entryUuid,
      contentUuid: e.payloadUuid,
      seq: e.seq,
    })
  }
  receipts.push({
    kind: 'dispatch.context',
    atomPath,
    contentUuid: undefined,
  })

  return {
    atomPath,
    receipts,
    pathLedger,
    improveReceipts,
    sessionArtifact,
    dispatchAccount,
    dispatchEb,
    hypotheses: uniqueSorted(hypotheses),
    decisions: uniqueSorted(decisions),
  }
}

/** Transform raw thinking → quantum block (superposition | collapse | seal). */
export function transformThinkingToQuantum(
  thinking: AgentThinking,
  atomPath: string,
  sealed = false,
): QuantumThinkingBlock {
  const entryUuids = uniqueSorted([
    ...thinking.pathLedger.map((e) => e.entryUuid),
    ...thinking.improveReceipts.map((e) => e.entryUuid),
  ])
  const contentUuids = uniqueSorted([
    ...thinking.pathLedger.map((e) => e.payloadUuid),
    ...(thinking.sessionArtifact ? [thinking.sessionArtifact.contentUuid] : []),
    ...thinking.improveReceipts.map((e) => e.payloadUuid),
  ])

  const superposition =
    thinking.hypotheses.length > 0
      ? thinking.hypotheses
      : thinking.dispatchEb !== null
        ? [`dispatch:eb=${thinking.dispatchEb}`]
        : ['superposition:idle']

  const collapse =
    thinking.decisions.length > 0 ? thinking.decisions : ['collapse:derive-only']

  return {
    atomPath,
    superposition: superposition.slice(0, 12),
    collapse: collapse.slice(0, 12),
    seal: {
      entryUuids,
      contentUuids,
      pathFollow: thinking.pathLedger.length > 0,
      receipt: thinking.improveReceipts.length > 0 || thinking.receipts.some((r) => r.kind === 'session.diamond'),
      sealed,
    },
  }
}

/** Derive quantum thinking for one folder model — load + transform in one pass. */
export function quantumThinkingOf(
  folder: ThinkingFolderInput,
  cwd: string = process.cwd(),
  ctx?: ThinkingLoadContext,
): QuantumThinkingBlock {
  const thinking = loadAgentThinking(folder.atomPath, cwd, ctx, folder)
  return transformThinkingToQuantum(thinking, folder.atomPath, folder.sealed)
}

/** Map quantum block to skill-upgrade environment shape (readme inline face). */
export function quantumBlockAsEnvironment(block: QuantumThinkingBlock): QuantumEnvironment {
  return {
    superposition: [...block.superposition],
    collapse: [...block.collapse],
    seal: {
      sandbox: block.seal.receipt,
      receipt: block.seal.receipt,
      pathFollow: block.seal.pathFollow,
      canonicalRecord: block.seal.pathFollow,
      analogResults: block.atomPath.includes('/emr') || block.atomPath.includes('/device'),
      speechResults: false,
      signatures: null,
      contentUuid: block.seal.contentUuids[0] ?? null,
    },
  }
}

/** Merge two corpus quantum thinking rollups — wave-batch accumulator. */
export function mergeCorpusQuantumThinking(
  a: CorpusQuantumThinkingRollup,
  b: CorpusQuantumThinkingRollup,
): CorpusQuantumThinkingRollup {
  const partAcc = new Map<string, { atoms: number; superposition: number; collapse: number }>()
  for (const row of [...a.byPartition, ...b.byPartition]) {
    const cur = partAcc.get(row.partition) ?? { atoms: 0, superposition: 0, collapse: 0 }
    cur.atoms += row.atoms
    cur.superposition += row.superposition
    cur.collapse += row.collapse
    partAcc.set(row.partition, cur)
  }
  const byPartition = [...partAcc.entries()]
    .sort((x, y) => y[1].superposition - x[1].superposition || x[0].localeCompare(y[0]))
    .map(([partition, row]) => ({ partition, ...row }))
  return {
    atomsWithThinking: a.atomsWithThinking + b.atomsWithThinking,
    totalSuperposition: a.totalSuperposition + b.totalSuperposition,
    totalCollapse: a.totalCollapse + b.totalCollapse,
    totalSealUuids: a.totalSealUuids + b.totalSealUuids,
    sealedThinking: a.sealedThinking + b.sealedThinking,
    byPartition,
  }
}

export const emptyCorpusQuantumThinking = (): CorpusQuantumThinkingRollup => ({
  atomsWithThinking: 0,
  totalSuperposition: 0,
  totalCollapse: 0,
  totalSealUuids: 0,
  sealedThinking: 0,
  byPartition: [],
})

/** Roll up per-folder quantum thinking for root README. */
export function aggregateCorpusQuantumThinking(
  models: readonly { readonly atomPath: string; readonly quantumThinking: QuantumThinkingBlock; readonly typography: { readonly partition: string } }[],
): CorpusQuantumThinkingRollup {
  let atomsWithThinking = 0
  let totalSuperposition = 0
  let totalCollapse = 0
  let totalSealUuids = 0
  let sealedThinking = 0
  const byPart = new Map<string, { atoms: number; superposition: number; collapse: number }>()

  for (const m of models) {
    const q = m.quantumThinking
    const hasContent =
      q.superposition.length > 0 ||
      q.collapse.length > 0 ||
      q.seal.entryUuids.length > 0 ||
      q.seal.contentUuids.length > 0
    if (!hasContent) continue
    atomsWithThinking++
    totalSuperposition += q.superposition.length
    totalCollapse += q.collapse.length
    totalSealUuids += q.seal.contentUuids.length
    if (q.seal.sealed) sealedThinking++
    const part = m.typography.partition
    const row = byPart.get(part) ?? { atoms: 0, superposition: 0, collapse: 0 }
    row.atoms++
    row.superposition += q.superposition.length
    row.collapse += q.collapse.length
    byPart.set(part, row)
  }

  const byPartition = [...byPart.entries()]
    .sort((a, b) => b[1].superposition - a[1].superposition || a[0].localeCompare(b[0]))
    .map(([partition, row]) => ({ partition, ...row }))

  return {
    atomsWithThinking,
    totalSuperposition,
    totalCollapse,
    totalSealUuids,
    sealedThinking,
    byPartition,
  }
}

/** Render per-folder `## quantum thinking` section — pure. */
export function renderFolderQuantumThinkingSection(block: QuantumThinkingBlock): string {
  const L: string[] = [
    '## quantum thinking',
    '',
    'Agent/session thinking collapsed at readme generation — superposition (open hypotheses) ·',
    'collapse (decisions) · seal (content-uuid receipts). Single pass; no post-hoc skill:upgrade.',
    '',
    '### superposition',
    '',
    ...(block.superposition.length > 0
      ? block.superposition.map((s) => `- \`${s}\``)
      : ['—']),
    '',
    '### collapse',
    '',
    ...(block.collapse.length > 0 ? block.collapse.map((c) => `- \`${c}\``) : ['—']),
    '',
    '### seal',
    '',
    `- path follow \`${block.seal.pathFollow ? 1 : 0}\` · receipt \`${block.seal.receipt ? 1 : 0}\` · sealed \`${block.seal.sealed ? 1 : 0}\``,
    `- entry uuids ${
      block.seal.entryUuids.length > 0
        ? block.seal.entryUuids.slice(0, 4).map((u) => `\`${u}\``).join(' · ')
        : '—'
    }${block.seal.entryUuids.length > 4 ? ` · +${block.seal.entryUuids.length - 4} more` : ''}`,
    `- content uuids ${
      block.seal.contentUuids.length > 0
        ? block.seal.contentUuids.slice(0, 4).map((u) => `\`${u}\``).join(' · ')
        : '—'
    }${block.seal.contentUuids.length > 4 ? ` · +${block.seal.contentUuids.length - 4} more` : ''}`,
    '',
  ]
  return L.join('\n')
}

/** Render corpus quantum thinking rollup for root README — pure. */
export function renderCorpusQuantumThinkingSection(rollup: CorpusQuantumThinkingRollup): string {
  const L: string[] = [
    '## corpus quantum thinking',
    '',
    'Per-folder agent thinking transformed to quantum at readme generation — rolled up from',
    'path ledger · session diamonds · improve receipts · dispatch context.',
    '',
    `- atoms with thinking \`${rollup.atomsWithThinking}\` · superposition mass \`${rollup.totalSuperposition}\` · collapse mass \`${rollup.totalCollapse}\``,
    `- seal uuids \`${rollup.totalSealUuids}\` · sealed thinking \`${rollup.sealedThinking}\``,
    '',
    '| partition | atoms | superposition | collapse |',
    '| --------- | ----: | ------------: | -------: |',
  ]
  for (const row of rollup.byPartition.slice(0, 12)) {
    L.push(`| ${row.partition} | ${row.atoms} | ${row.superposition} | ${row.collapse} |`)
  }
  if (rollup.byPartition.length > 12) {
    L.push(`| … | ${rollup.byPartition.length - 12} more | — | — |`)
  }
  return L.join('\n')
}
