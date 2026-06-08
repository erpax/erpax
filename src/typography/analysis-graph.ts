/**
 * typography/analysis-graph — glyph ⊕ quantum ⊕ analysis in ONE typography graph.
 *
 * Wikilink bonds (quantum typography) and computed analysis edges (max-tamper-cost
 * levers, purity, hallucination, boundary digest, diamond verify, cross-seals,
 * aura gap, import purity) are first-class vertices/edges — analysis is not a silo.
 *
 * Pure: pages-in (+ optional impurity signals) → graph-out. Deterministic sort on
 * every edge list and vertex list so the root is tamper-evident.
 *
 * @see ./index.ts — ../analytics — ../diamond — ../quantum/boundary — ../aura
 */
import { toUuid, merge } from '@/uuid/matrix'
import {
  buildIndex,
  partitionByFolder,
  partitionRoot,
  indexRoot,
  norm,
  type SkillPage,
  type TypographyEntry,
  type TypographyIndex,
} from './index'

/** Analysis organs wired as first-class graph vertices. */
export const ANALYSIS_ORGANS = [
  'analytics',
  'analytics/max-tamper-cost',
  'purity',
  'hallucination',
  'quantum/boundary',
  'diamond',
  'cloudflare',
  'agent',
  'secret',
  'aura',
  'tamper/import',
] as const

export type AnalysisOrgan = (typeof ANALYSIS_ORGANS)[number]

export type AnalysisEdgeKind = 'wikilink' | 'analysis-compose' | 'analysis-lever'

export interface AnalysisTypographyEdge {
  readonly from: string
  readonly to: string
  readonly kind: AnalysisEdgeKind
  readonly lever?: string
}

/** Per-atom impurity signals — fs-derived caller passes these in; module stays pure. */
export interface AtomImpuritySignals {
  readonly deadLinks?: number
  readonly escapes?: number
  readonly diamondImpurities?: number
  readonly unsealedCross?: boolean
}

export interface AnalysisTypographyGraph {
  readonly index: TypographyIndex
  readonly vertices: readonly string[]
  readonly edges: readonly AnalysisTypographyEdge[]
  readonly wikilinkCount: number
  readonly analysisCount: number
  /** Fold of index root ⊕ canonical edge bytes — one address for the unified graph. */
  readonly root: string
  readonly partitions: Readonly<Record<string, readonly string[]>>
  readonly organs: readonly AnalysisOrgan[]
}

export interface AtomTypographyContext {
  readonly partition: string
  readonly partitionRoot: string
  readonly bondDegree: number
  readonly wikilinkOut: number
  readonly wikilinkIn: number
  readonly analysisNeighbors: readonly string[]
  readonly analysisEdges: number
}

const COMPOSE_EDGES: ReadonlyArray<readonly [string, string, string]> = [
  ['analytics', 'analytics/max-tamper-cost', 'compose'],
  ['analytics/max-tamper-cost', 'aura', 'cross-seals'],
  ['analytics/max-tamper-cost', 'purity', 'impurity-lever'],
  ['analytics/max-tamper-cost', 'hallucination', 'content-uuid-mismatch'],
  ['diamond', 'purity', 'verifyDiamond'],
  ['diamond', 'hallucination', 'verifyDiamond'],
  ['quantum/boundary', 'tamper/import', 'import-purity'],
  ['quantum/boundary', 'analytics/max-tamper-cost', 'boundary-digest'],
  ['aura', 'hallucination', 'aura-gap'],
  ['purity', 'analytics/max-tamper-cost', 'max-tamper-cost'],
  ['cloudflare', 'agent', 'workers-ai-face'],
  ['cloudflare', 'diamond', 'binding-diamond'],
  ['cloudflare', 'secret', 'ai-key-seal'],
]

const organByLeaf = (): Map<string, AnalysisOrgan> => {
  const m = new Map<string, AnalysisOrgan>()
  for (const o of ANALYSIS_ORGANS) m.set(norm(o.split('/').pop() ?? o), o)
  return m
}

const edgeKey = (e: AnalysisTypographyEdge): string =>
  `${e.kind}\0${e.from}\0${e.to}\0${e.lever ?? ''}`

const sortEdges = (edges: AnalysisTypographyEdge[]): AnalysisTypographyEdge[] =>
  [...edges].sort((a, b) => edgeKey(a).localeCompare(edgeKey(b)))

/** Fold sorted edge canonical bytes — order-independent, tamper-evident. */
export const analysisGraphEdgeRoot = (edges: readonly AnalysisTypographyEdge[]): string =>
  indexRoot(edges.map((e) => toUuid(Buffer.from(edgeKey(e), 'utf8'))))

/**
 * Build the unified typography graph: wikilink quantum bonds ⊕ analysis compose
 * edges ⊕ per-atom impurity levers. Same pages (+ signals) ⇒ same graph bytes.
 */
export function buildAnalysisTypographyGraph(
  pages: readonly SkillPage[],
  impurities: Readonly<Record<string, AtomImpuritySignals>> = {},
): AnalysisTypographyGraph {
  const idx = buildIndex(pages)
  const atomOf = new Map(idx.entries.map((e) => [e.atom, e]))
  const edges: AnalysisTypographyEdge[] = []

  for (const e of idx.entries) {
    for (const link of e.links) {
      edges.push({ from: e.atom, to: link, kind: 'wikilink' })
    }
  }

  for (const [from, to, lever] of COMPOSE_EDGES) {
    edges.push({ from, to, kind: 'analysis-compose', lever })
  }

  const organs = organByLeaf()
  for (const e of idx.entries) {
    for (const link of e.links) {
      const organ = organs.get(link)
      if (organ) edges.push({ from: e.atom, to: organ, kind: 'analysis-lever', lever: 'wikilink-ref' })
    }
  }

  for (const [path, sig] of Object.entries(impurities)) {
    const leaf = norm(path.split('/').pop() ?? path)
    if (!atomOf.has(leaf) && !idx.entries.some((x) => x.path === path)) continue
    const from = atomOf.has(leaf) ? leaf : norm(path)
    if (sig.deadLinks && sig.deadLinks > 0) {
      edges.push({ from, to: 'aura', kind: 'analysis-lever', lever: 'aura-gap' })
      edges.push({ from, to: 'analytics/max-tamper-cost', kind: 'analysis-lever', lever: 'max-tamper-cost' })
    }
    if (sig.escapes && sig.escapes > 0) {
      edges.push({ from, to: 'tamper/import', kind: 'analysis-lever', lever: 'import-purity' })
      edges.push({ from, to: 'quantum/boundary', kind: 'analysis-lever', lever: 'boundary-digest' })
    }
    if (sig.diamondImpurities && sig.diamondImpurities > 0) {
      edges.push({ from, to: 'diamond', kind: 'analysis-lever', lever: 'verifyDiamond' })
      edges.push({ from, to: 'purity', kind: 'analysis-lever', lever: 'purity' })
      edges.push({ from, to: 'hallucination', kind: 'analysis-lever', lever: 'hallucination' })
    }
    if (sig.unsealedCross) {
      edges.push({ from, to: 'aura', kind: 'analysis-lever', lever: 'cross-seals' })
      edges.push({ from, to: 'analytics/max-tamper-cost', kind: 'analysis-lever', lever: 'max-tamper-cost' })
    }
  }

  const sorted = sortEdges(edges)
  const wikilinkCount = sorted.filter((e) => e.kind === 'wikilink').length
  const analysisCount = sorted.length - wikilinkCount

  const parts = partitionByFolder(idx, 1)
  const partitions: Record<string, readonly string[]> = {}
  for (const [k, entries] of Object.entries(parts)) {
    partitions[k] = entries.map((e) => e.atom).sort()
  }

  const vertices = [...new Set([...ANALYSIS_ORGANS, ...idx.entries.map((e) => e.atom)])].sort()
  const edgeRoot = analysisGraphEdgeRoot(sorted)
  const root = idx.root ? merge(idx.root, edgeRoot) : edgeRoot

  return {
    index: idx,
    vertices,
    edges: sorted,
    wikilinkCount,
    analysisCount,
    root,
    partitions,
    organs: ANALYSIS_ORGANS,
  }
}

const entriesInPartition = (entries: readonly TypographyEntry[], partition: string): readonly TypographyEntry[] =>
  entries.filter((e) => e.path === partition || e.path.startsWith(`${partition}/`))

/** Per-atom graph frame — partition, bond degree, analysis neighbors. */
export function atomTypographyContext(
  graph: AnalysisTypographyGraph,
  atomPath: string,
  matrixBondsIn = 0,
  matrixBondsOut = 0,
): AtomTypographyContext {
  const leaf = norm(atomPath.split('/').pop() ?? atomPath)
  const partition = atomPath.split('/')[0] ?? atomPath
  const partitionEntries = entriesInPartition(graph.index.entries, partition)
  const pRoot = partitionRoot(partitionEntries)

  const wikilinkOut = graph.edges.filter((e) => e.from === leaf && e.kind === 'wikilink').length
  const wikilinkIn = graph.edges.filter((e) => e.to === leaf && e.kind === 'wikilink').length

  const analysisNeighbors = [
    ...new Set(
      graph.edges
        .filter((e) => e.kind !== 'wikilink' && (e.from === leaf || e.to === leaf))
        .map((e) => (e.from === leaf ? e.to : e.from)),
    ),
  ].sort()

  const analysisEdges = graph.edges.filter(
    (e) => e.kind !== 'wikilink' && (e.from === leaf || e.to === leaf),
  ).length

  return {
    partition,
    partitionRoot: pRoot,
    bondDegree: matrixBondsIn + matrixBondsOut + wikilinkOut + wikilinkIn + analysisEdges,
    wikilinkOut,
    wikilinkIn,
    analysisNeighbors,
    analysisEdges,
  }
}
