/**
 * skill/router/upgrade — computational frontmatter self-upgrade + connection fabric.
 *
 * SKILL.md frontmatter (the form facet) is DERIVED from live corpus state — never
 * hand-pinned. `connectFrontmatter` folds atomPath · diamondUuid · matrix coordinate ·
 * typography partition/bonds · standards · bindings · wikilink/matrix/backlink neighbors
 * into one YAML block so the whole corpus frontmatter graph is connected (no orphans).
 *
 *   pnpm exec tsx src/skill/router/upgrade/index.ts --sync    # materialize drift
 *   pnpm exec tsx src/skill/router/upgrade/index.ts --verify  # fail-closed drift gate
 *
 * @see ../build — ../../../readme — ../../../typography — ../../../diamond — ../../../uuid/matrix
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  listAtomPaths,
  deriveFolderModel,
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
  type FolderReadmeContext,
} from '@/readme'
import { computeDiamond, diamondUuid } from '@/diamond'
import { coordinateAddress, neighborsOf, backlinksOf, nodeOf } from '@/uuid/matrix'
import { linksOf, partitionByFolder, type AnalysisTypographyGraph } from '@/typography'
import {
  isQuantumSkillPath,
  upgradeQuantumSkillText,
} from './quantum'
import {
  FRONTMATTER,
  stripFrontmatter,
  upgradeSkillText,
  parseSignaturesFromText,
  signaturesFromStages,
  type ConnectedFrontmatter,
  type FrontmatterSignatures,
  type FrontmatterStageSignature,
} from './seal'

const SRC = 'src'
const FM_VERSION = 2

export type { ConnectedFrontmatter, FrontmatterSignatures, FrontmatterStageSignature }
export {
  contentUuidOf,
  renderFrontmatter,
  upgradeSkillText,
  parseSignaturesFromText,
  signaturesFromStages,
} from './seal'

export interface UpgradeContext {
  readonly cwd: string
  readonly ctx: FolderReadmeContext
  readonly graph: AnalysisTypographyGraph
  readonly corpusLeaves: ReadonlySet<string>
  readonly partitionPeers: ReadonlyMap<string, readonly string[]>
}

const sortUnique = (xs: readonly string[]): string[] => [...new Set(xs)].filter(Boolean).sort()

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

const atomScope = (): readonly string[] | undefined => {
  const i = process.argv.indexOf('--atom')
  if (i < 0 || !process.argv[i + 1]) return undefined
  return process.argv[i + 1]!.split(',').map((s) => s.trim()).filter(Boolean)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const verify = process.argv.includes('--verify')
  const sync = process.argv.includes('--sync')
  const scope = atomScope()
  if (sync) {
    const n = materializeSkillFrontmatter(cwd, scope)
    console.log(`skill:upgrade — materialized ${n} SKILL.md frontmatter patch(es)`)
    if (!scope) {
      const patches = connectCorpus(cwd)
      const g = buildFrontmatterGraph(patches)
      const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
      console.log(
        `  graph: ${conn.connected ? 'connected' : 'DISCONNECTED'} · components ${conn.components} · orphans ${conn.orphans.length}`,
      )
    }
    process.exit(0)
  }
  if (verify) {
    const { ok, drift } = verifySkillFrontmatter(cwd, scope)
    if (!ok) {
      console.error(`skill:upgrade verify FAIL — ${drift.length} drift(s)`)
      for (const d of drift.slice(0, 20)) console.error(`  ${d}`)
      process.exit(1)
    }
    const patches = connectCorpus(cwd)
    const g = buildFrontmatterGraph(patches)
    const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
    console.log(`skill:upgrade verify OK — ${patches.size} atoms · graph connected=${conn.connected}`)
    process.exit(0)
  }
  const patches = connectCorpus(cwd)
  console.log(`skill:upgrade — ${patches.size} atoms (dry-run; use --sync to materialize)`)
}

export {
  parseQuantumSkill,
  generateQuantumSkill,
  upgradeQuantumSkillText,
  inferQuantumEnvironment,
  entangledFieldsOf,
  mergeEntangledFields,
  collapseTriggersOf,
  isQuantumSkillPath,
  injectQuantumBlock,
  renderQuantumBlock,
  renderContentUuidFooter,
  type QuantumSkillParsed,
  type QuantumSkillModel,
  type QuantumEnvironment,
  type EntangledField,
} from './quantum'
