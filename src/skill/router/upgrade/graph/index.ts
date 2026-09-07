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
    // UNESCAPE what yamlQuote escaped. It writes `\\` for a backslash and `\"` for a quote; this
    // reader stripped the surrounding quotes and returned the body verbatim, so every sync
    // re-escaped an already-escaped value and DOUBLED every backslash. That is exponential: one
    // `\` became 2^passes of them. src/access/SKILL.md reached 25,179,501 bytes from 13,731 —
    // and it is why the fold could never reach a fixpoint, because the description grew on every
    // single pass. A writer that escapes needs a reader that unescapes; asymmetry here is not a
    // cosmetic bug, it is unbounded growth.
    return m.slice(1, -1).replace(/\\(["\\])/g, '$1')
  }
  return m
}

/**
 * Wikilink markup is CORPUS syntax; a description is prose for a reader — [[seo]] emits it as the
 * meta description, where `[[x]]` is simply wrong.
 *
 * It is also a feedback loop. `linksOf` reads the WHOLE SKILL.md, so a `[[x]]` sitting in the
 * frontmatter is counted as an edge — the frontmatter feeds the typography graph that computes the
 * `bondDegree` written back into that same frontmatter. The fold then has no fixpoint: four
 * consecutive syncs wrote 91 → 369 → 49 → 391 patches, oscillating, each one reporting success.
 *
 * The freshly-derived path already stripped this. The `prior` path did not, so 146 descriptions
 * written by an older implementation kept their markup forever and kept driving the loop.
 */
const unlink = (s: string): string => s.replace(/\[\[([^\]]+)\]\]/g, '$1')

/** Derive the Use-when description from existing frontmatter or body prose. */
export function deriveDescription(leaf: string, text: string): string {
  const prior = existingDescription(text)
  if (prior) {
    const stripped = unlink(prior).replace(new RegExp(`^Use when reasoning about ${leaf} —\\s*`, 'i'), '').trim()
    if (/^Use when/i.test(stripped)) return stripped
    return `Use when reasoning about ${leaf} — ${stripped}`
  }
  const body = stripFrontmatter(text)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^#{1,6}\s+.+$/m, '')
    .trim()
  const para = body.split(/\n\n+/)[0]?.replace(/\s+/g, ' ').trim() ?? ''
  const flat = unlink(para)
  const snippet = clipToBoundary(flat, 180)
  if (snippet) return `Use when reasoning about ${leaf} — ${snippet}`
  return `Use when reasoning about ${leaf}.`
}

/**
 * Clip to a SENTENCE, else a WORD — never mid-token.
 *
 * A raw `.slice(0, 180)` ended one atom's description at "It reads the Payload au". This string is
 * the SEO meta description ([[seo]] clips it again to 160) and the first line a reader sees in the
 * skill listing; a half-word there is not a shortened sentence, it is a broken one.
 *
 * A sentence end inside the window is preferred because it is the only cut that leaves prose
 * intact. Failing that, the last space — and the ellipsis says the sentence continues, which the
 * bare truncation did not.
 */
export function clipToBoundary(text: string, max: number): string {
  const t = text.trim()
  if (t.length <= max) return t
  const window = t.slice(0, max)
  // No host Math.* — [[algebra]] holds a theorem baseline of 0 for it, and this file is scanned.
  const sentence = ['. ', '! ', '? ']
    .map((mark) => window.lastIndexOf(mark))
    .reduce((a, b) => (b > a ? b : a), -1)
  if (sentence > max * 0.4) return window.slice(0, sentence + 1).trim()
  const space = window.lastIndexOf(' ')
  return `${(space > 0 ? window.slice(0, space) : window).replace(/[\s,;:—-]+$/, '')}…`
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

/** @index-cross.foldback child=skill/router/upgrade/graph parent=skill/router/upgrade — this cross folds back into its parent. */
