import { FRONTMATTER, stripFrontmatter } from '../seal'
import type { ConnectedFrontmatter, FrontmatterSignatures } from '../seal'

/**
 * skill/router/upgrade/graph — the frontmatter-graph primitives.
 *
 * The leaf layer of the upgrade flow: derive a Use-when description, compare
 * signature chains, and build/verify the undirected connection graph the corpus
 * frontmatter encodes. Split from the hub so its index.ts re-exports only
 * ([[rules]]/concentration); the connect flow consumes these, never the reverse.
 */
export const sortUnique = (xs: readonly string[]): string[] => [...new Set(xs)].filter(Boolean).sort()

const existingDescription = (text: string): string | undefined => {
  const fm = text.match(FRONTMATTER)?.[1] ?? ''
  const m = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim()
  if (!m) return undefined
  if ((m.startsWith('"') && m.endsWith('"')) || (m.startsWith("'") && m.endsWith("'"))) {
    return m.slice(1, -1)
  }
  return m
}

/** Derive the Use-when description from existing frontmatter or body prose. */
export function deriveDescription(leaf: string, text: string): string {
  const prior = existingDescription(text)
  if (prior) {
    const stripped = prior.replace(new RegExp(`^Use when reasoning about ${leaf} —\\s*`, 'i'), '').trim()
    if (/^Use when/i.test(stripped)) return stripped
    return `Use when reasoning about ${leaf} — ${stripped}`
  }
  const body = stripFrontmatter(text)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^#{1,6}\s+.+$/m, '')
    .trim()
  const para = body.split(/\n\n+/)[0]?.replace(/\s+/g, ' ').trim() ?? ''
  const snippet = para.replace(/\[\[([^\]]+)\]\]/g, '$1').slice(0, 180)
  if (snippet) return `Use when reasoning about ${leaf} — ${snippet}`
  return `Use when reasoning about ${leaf}.`
}

/** Compare stored frontmatter signatures against the recomputed diamond chain. */
export function signaturesMatch(
  stored: FrontmatterSignatures | null,
  expected: FrontmatterSignatures,
): { ok: boolean; reasons: readonly string[] } {
  if (!stored) return { ok: false, reasons: ['missing-signatures'] }
  const reasons: string[] = []
  if (stored.computationUuid !== expected.computationUuid) reasons.push('computationUuid-mismatch')
  if (stored.stages.length !== expected.stages.length) {
    reasons.push('stage-count-mismatch')
  } else {
    for (let i = 0; i < expected.stages.length; i++) {
      const e = expected.stages[i]!
      const s = stored.stages[i]!
      if (s.stage !== e.stage || s.stageUuid !== e.stageUuid) reasons.push(`stage-mismatch:${e.stage}`)
    }
  }
  return { ok: reasons.length === 0, reasons }
}

/** All outgoing edges encoded in one frontmatter patch — the connection fabric. */
export function frontmatterEdges(fm: ConnectedFrontmatter): readonly string[] {
  const parent = fm.atomPath.includes('/') ? fm.atomPath.split('/').slice(-2, -1)[0] : undefined
  return sortUnique([
    ...fm.bonds.in,
    ...fm.bonds.out,
    ...fm.neighbors.wikilink,
    ...fm.neighbors.matrix,
    ...fm.neighbors.backlinks,
    ...fm.typography.neighbors,
    ...(parent ? [parent] : []),
  ])
}

/** Undirected graph from frontmatter connection fields (leaf-word keys). */
export function buildFrontmatterGraph(
  patches: ReadonlyMap<string, ConnectedFrontmatter>,
): Map<string, Set<string>> {
  const g = new Map<string, Set<string>>()
  const touch = (k: string): Set<string> => {
    if (!g.has(k)) g.set(k, new Set())
    return g.get(k)!
  }
  for (const [atomPath, fm] of patches) {
    const leaf = atomPath.split('/').pop()!
    touch(leaf)
    for (const e of frontmatterEdges(fm)) {
      touch(e)
      touch(leaf).add(e)
      touch(e).add(leaf)
    }
  }
  return g
}

export interface GraphConnectivity {
  readonly connected: boolean
  readonly orphans: readonly string[]
  readonly components: number
}

/** Verify the derived frontmatter graph spans the corpus without isolated leaves. */
export function graphConnectivity(
  graph: Map<string, Set<string>>,
  corpusLeaves: ReadonlySet<string>,
): GraphConnectivity {
  if (corpusLeaves.size <= 1) {
    return { connected: true, orphans: [], components: corpusLeaves.size }
  }
  const orphans = [...corpusLeaves].filter((l) => (graph.get(l)?.size ?? 0) === 0).sort()
  const visited = new Set<string>()
  let components = 0
  for (const start of [...corpusLeaves].sort()) {
    if (visited.has(start)) continue
    components++
    const q = [start]
    while (q.length) {
      const n = q.pop()!
      if (visited.has(n)) continue
      visited.add(n)
      for (const nb of graph.get(n) ?? []) {
        if (corpusLeaves.has(nb) && !visited.has(nb)) q.push(nb)
      }
    }
  }
  return { connected: components === 1 && orphans.length === 0, orphans, components }
}
