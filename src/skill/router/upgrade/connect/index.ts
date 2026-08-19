import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { listAtomPaths, deriveFolderModel, buildReadmeCorpusContext, buildReadmeTypographyGraph } from '@/readme'
import type { FolderReadmeContext } from '@/readme'
import { computeDiamond, diamondUuid } from '@/diamond'
import { coordinateAddress, neighborsOf, backlinksOf, nodeOf } from '@/uuid/matrix'
import { linksOf, partitionByFolder } from '@/typography'
import type { AnalysisTypographyGraph } from '@/typography'
import { isQuantumSkillPath, upgradeQuantumSkillText } from '../quantum'
import { upgradeSkillText, parseSignaturesFromText, signaturesFromStages } from '../seal'
import type { ConnectedFrontmatter } from '../seal'
import { sortUnique, deriveDescription, signaturesMatch, frontmatterEdges } from '../graph'

/**
 * skill/router/upgrade/connect — the connect/materialise/verify flow.
 *
 * Builds the per-atom upgrade context, folds live corpus state into one connected
 * frontmatter block, materialises SKILL.md patches, and verifies drift. Split from
 * the hub so its index.ts re-exports only ([[rules]]/concentration); consumes the
 * graph · seal · quantum leaves, never the reverse. The CLI stays on the parent.
 */

const SRC = 'src'
const FM_VERSION = 2

export interface UpgradeContext {
  readonly cwd: string
  readonly ctx: FolderReadmeContext
  readonly graph: AnalysisTypographyGraph
  readonly corpusLeaves: ReadonlySet<string>
  readonly partitionPeers: ReadonlyMap<string, readonly string[]>
}

export function buildUpgradeContext(cwd: string = process.cwd()): UpgradeContext {
  const ctx = buildReadmeCorpusContext(cwd)
  const graph = buildReadmeTypographyGraph(cwd)
  const atomPaths = listAtomPaths(cwd)
  const corpusLeaves = new Set(atomPaths.map((p) => p.split('/').pop()!))
  const parts = partitionByFolder(graph.index, 1)
  const partitionPeers = new Map<string, readonly string[]>()
  for (const [key, entries] of Object.entries(parts)) {
    partitionPeers.set(
      key,
      entries.map((e) => e.atom).sort(),
    )
  }
  return { cwd, ctx, graph, corpusLeaves, partitionPeers }
}

/**
 * Compute the connection-fabric frontmatter patch for one atom — pure given context + body.
 * Ensures at least one corpus edge so the derived graph has no orphans.
 */
export function connectFrontmatter(
  atomPath: string,
  text: string,
  upgradeCtx: UpgradeContext,
): ConnectedFrontmatter {
  const { cwd, ctx, graph, corpusLeaves, partitionPeers } = upgradeCtx
  const leaf = atomPath.split('/').pop() ?? atomPath
  const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
  const computation = computeDiamond({ kind: 'path', path: atomPath, cwd })
  const diamond = computation.model
  const signatures = signaturesFromStages(computation.stages)
  const matrixIn = sortUnique(backlinksOf(folder.leaf).map((n) => n.atom))
  const matrixOut = sortUnique(neighborsOf(folder.leaf).map((n) => n.atom))
  const wikilink = sortUnique(linksOf(text))
  const typographyNeighbors = sortUnique([...folder.typography.analysisNeighbors])
  const standards = sortUnique(folder.standards.map((s) => s.id))
  const bindings = sortUnique(folder.bindings.map((b) => `${b.type}/${b.name}`))
  const partition = folder.typography.partition
  const peers = (partitionPeers.get(partition) ?? []).filter((p) => p !== leaf)

  let bondsIn = [...matrixIn]
  const bondsOut = [...matrixOut]
  const parent = atomPath.includes('/') ? atomPath.split('/').slice(-2, -1)[0] : undefined
  if (parent && corpusLeaves.has(parent)) bondsIn = sortUnique([...bondsIn, parent])

  const draft: ConnectedFrontmatter = {
    name: leaf,
    description: deriveDescription(leaf, text),
    atomPath,
    coordinate: nodeOf(atomPath) ? coordinateAddress(atomPath) : atomPath,
    contentUuid: '',
    diamondUuid: diamondUuid(diamond),
    uuid: folder.uuid,
    horo: folder.horo,
    bonds: { in: bondsIn, out: bondsOut },
    typography: {
      partition,
      bondDegree: folder.typography.bondDegree,
      neighbors: typographyNeighbors,
    },
    standards,
    bindings,
    neighbors: {
      wikilink,
      matrix: sortUnique([...matrixIn, ...matrixOut]),
      backlinks: matrixIn,
    },
    signatures,
    version: FM_VERSION,
  }

  const edges = frontmatterEdges(draft).filter((e) => corpusLeaves.has(e) && e !== leaf)
  if (edges.length === 0 && peers.length > 0) {
    return {
      ...draft,
      bonds: { in: draft.bonds.in, out: sortUnique([...draft.bonds.out, peers[0]!]) },
    }
  }
  if (edges.length === 0 && corpusLeaves.has('readme')) {
    return {
      ...draft,
      bonds: { in: sortUnique([...draft.bonds.in, 'readme']), out: draft.bonds.out },
    }
  }
  return draft
}

/** Connect atoms — same tree ⇒ same patches. Optional scope limits the walk. */
export function connectCorpus(
  cwd: string = process.cwd(),
  scope?: readonly string[],
): Map<string, ConnectedFrontmatter> {
  const upgradeCtx = buildUpgradeContext(cwd)
  const out = new Map<string, ConnectedFrontmatter>()
  const paths = scope ? [...scope].sort() : listAtomPaths(cwd)
  for (const atomPath of paths) {
    const text = readFileSync(join(cwd, SRC, atomPath, 'SKILL.md'), 'utf8')
    const fm = connectFrontmatter(atomPath, text, upgradeCtx)
    const upgraded = isQuantumSkillPath(atomPath, fm.typography.partition)
      ? upgradeQuantumSkillText(text, fm)
      : upgradeSkillText(text, fm)
    const uuid =
      upgraded.match(/^contentUuid:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '') ?? ''
    out.set(atomPath, { ...fm, contentUuid: uuid })
  }
  return out
}

/** Materialize upgraded frontmatter to disk; returns count written. */
export function materializeSkillFrontmatter(
  cwd: string = process.cwd(),
  scope?: readonly string[],
): number {
  const patches = connectCorpus(cwd, scope)
  let n = 0
  for (const [atomPath, fm] of patches) {
    if (scope && !scope.includes(atomPath)) continue
    const path = join(cwd, SRC, atomPath, 'SKILL.md')
    const text = readFileSync(path, 'utf8')
    const expected = isQuantumSkillPath(atomPath, fm.typography.partition)
      ? upgradeQuantumSkillText(text, fm)
      : upgradeSkillText(text, fm)
    if (expected !== text) {
      writeFileSync(path, expected)
      n++
    }
  }
  return n
}

/** Verify signature chain alone — stored frontmatter vs recomputed diamond stages. */
export function verifySignatures(
  atomPath: string,
  text: string,
  upgradeCtx: UpgradeContext,
): { ok: boolean; reasons: readonly string[] } {
  const expected = connectFrontmatter(atomPath, text, upgradeCtx).signatures
  return signaturesMatch(parseSignaturesFromText(text), expected)
}

/** Drift gate — committed SKILL.md frontmatter ≡ computed upgrade + stage seals. */
export function verifySkillFrontmatter(
  cwd: string = process.cwd(),
  scope?: readonly string[],
): { ok: boolean; drift: string[] } {
  const upgradeCtx = buildUpgradeContext(cwd)
  const paths = scope ? [...scope].sort() : listAtomPaths(cwd)
  const drift: string[] = []
  for (const atomPath of paths) {
    const path = join(cwd, SRC, atomPath, 'SKILL.md')
    const text = readFileSync(path, 'utf8')
    const fm = connectFrontmatter(atomPath, text, upgradeCtx)
    const expected = isQuantumSkillPath(atomPath, fm.typography.partition)
      ? upgradeQuantumSkillText(text, fm)
      : upgradeSkillText(text, fm)
    if (expected !== text) {
      drift.push(atomPath)
      continue
    }
    const sig = verifySignatures(atomPath, text, upgradeCtx)
    if (!sig.ok) drift.push(`${atomPath} (${sig.reasons.join(', ')})`)
  }
  return { ok: drift.length === 0, drift }
}
