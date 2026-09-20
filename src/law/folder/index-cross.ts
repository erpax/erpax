import { exactMax } from '@/algebra'
/**
 * law/folder/index-cross — index.ts is the cross; wire bidirectionally; linear folds into quantum whole.
 *
 * @see ./SKILL.md — ../../path/merge — ../../tamper/import — ../../quantum/fold
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import ts from 'typescript'
import { join, relative } from 'node:path'
import { nonIndexImports, type ImportViolation } from '@/tamper/import'
import { importsOf } from '@/rules/cycle'
import { wordFold, digitFold } from '@/quantum/fold'
import { interact64 } from '@/quantum/word'

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const TS_EXT = /\.tsx?$/i
const SKIP_FILE = /\.(generated|d\.ts|test\.ts)$/i
/**
 * A React atom's proof is `test.tsx`, and it was missing here while `index.tsx` was present.
 *
 * Consequence: every such proof read as a STRAY CROSS needing a re-export from its own barrel —
 * `index cross missing re-export for ./test` — which a barrel must never do. 34 of the 115
 * violations attributable to this session's atoms were that, and nothing else was wrong with them.
 * Fifth place in one day where a filter named the `.ts` spelling and could not see its twin.
 */
const COLOCATED = new Set(['index.ts', 'index.tsx', 'test.ts', 'test.tsx', 'translations.ts', 'seed.ts'])

export const INDEX_CROSS_PRIORITY: readonly string[] = [
  'quantum',
  'quantum/fold',
  'book',
  'science',
  'navigation',
  'pivot',
  'accounting/balance',
] as const

export type IndexCrossViolationKind =
  | 'missing-reexport'
  | 'missing-foldback'
  | 'deep-import'
  | 'one-way-bond'
  | 'one-way-path'
  | 'depth-exceeds-wire'
  | 'linear-bypass'
  | 'unwired-cross'

export interface IndexCrossViolation {
  readonly atomPath: string
  readonly kind: IndexCrossViolationKind
  readonly detail: string
  readonly paths?: readonly string[]
  readonly interact64?: string
}

export interface IndexCrossAudit {
  readonly scope: string | null
  readonly folders: number
  readonly violations: readonly IndexCrossViolation[]
  /** The GATED figure: actionable wiring defects, each pair counted once. */
  readonly violationCount: number
  /** Every violation before classification or dedupe — kept so nothing is hidden. */
  readonly rawViolationCount: number
  readonly wiring: readonly IndexCrossViolation[]
  /** Reported, never gated by count: a consequence of the tree's shape, not a defect. */
  readonly structural: readonly IndexCrossViolation[]
  readonly deepImports: readonly ImportViolation[]
  readonly deepImportCount: number
  readonly byKind: Readonly<Record<IndexCrossViolationKind, number>>
  readonly unwiredCrosses: readonly string[]
}

export interface LinearSpace {
  readonly chain: readonly string[]
  readonly nearestCross: string
  readonly foldHint: string
  readonly interact64: string
}

export interface LinearSpacesScan {
  readonly spaces: readonly LinearSpace[]
  readonly count: number
}

export interface WireIndexCrossResult {
  readonly before: number
  readonly after: number
  readonly wired: number
  readonly deepImportsFixed: number
  readonly paths: readonly string[]
  readonly samples: readonly string[]
}

const normalize = (atomPath: string): string =>
  atomPath.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const bondHex = (a: string, b?: string): string => {
  const base = interact64(wordFold(a), digitFold(a))
  if (!b) return base.toString(16)
  return interact64(base, interact64(wordFold(b), digitFold(b))).toString(16)
}

/**
 * What a barrel re-exports — including the TYPE-ONLY forms, which this missed entirely.
 *
 * `export type * from './x'` and `export type { X } from './x'` are re-exports; the pattern required
 * exactly one token between `export` and `from`, so `type *` and `type {…}` both fell through and the
 * parent read as not naming its child. It matters beyond tidiness: a client-component child CANNOT be
 * re-exported at runtime from a barrel the server config imports — doing so pulls its `.scss` into the
 * boot graph and `tsx src/run/load/index.ts` dies on the extension. The type space is the honest
 * maximum there, and it was the one spelling the detector could not see.
 */
export const reexportTargets = (indexContent: string): Set<string> => {
  const out = new Set<string>()
  for (const m of indexContent.matchAll(/export\s+(?:type\s+)?(?:\*|{[^}]*}|\w+)\s+from\s+['"]\.\/([^'"]+)['"]/g)) {
    out.add(m[1]!.replace(/\.tsx?$/, ''))
  }
  return out
}

/** A child declares its fold-back as INDEX_CROSS_FOLD; the legacy call form still counts. */
const hasFoldback = (content: string, parentPath: string): boolean => {
  if (content.includes('@index-cross.foldback')) return true
  if (content.includes('INDEX_CROSS_FOLD')) return true
  if (content.includes('recordOnPathMerged')) return true
  if (!content.includes('recordOnPath')) return false
  return [`'${parentPath}'`, `"${parentPath}"`].some((q) => content.includes(q))
}

const matterStemsInFolder = (dir: string): string[] => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const stems: string[] = []
  for (const e of entries) {
    if (!TS_EXT.test(e) || SKIP_FILE.test(e) || COLOCATED.has(e)) continue
    stems.push(e.replace(/\.tsx?$/, ''))
  }
  return stems.sort()
}

const childIndexFolders = (dir: string): string[] => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const children: string[] = []
  for (const e of entries) {
    if (e.startsWith('.')) continue
    const p = join(dir, e)
    // a child crosses through `index.tsx` too — the same door, a different extension
    if (isDir(p) && (existsSync(join(p, 'index.ts')) || existsSync(join(p, 'index.tsx')))) children.push(e)
  }
  return children.sort()
}

const listIndexFolders = (cwd: string, scope?: string): string[] => {
  const root = scope ? join(cwd, SRC, normalize(scope)) : join(cwd, SRC)
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    if (existsSync(join(dir, 'index.ts')) || existsSync(join(dir, 'index.tsx'))) out.push(rel)
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      const seg = rel ? `${rel}/${e}` : e
      if (SKIP_TREES.has(seg.split('/')[0]!)) continue
      walk(p, seg)
    }
  }
  if (scope && existsSync(root)) walk(root, normalize(scope))
  else if (!scope) walk(join(cwd, SRC), '')
  return out.sort()
}

const emptyByKind = (): Record<IndexCrossViolationKind, number> => ({
  'missing-reexport': 0,
  'missing-foldback': 0,
  'deep-import': 0,
  'one-way-bond': 0,
  'one-way-path': 0,
  'depth-exceeds-wire': 0,
  'linear-bypass': 0,
  'unwired-cross': 0,
})

/** Atom folder — form or matter present (defines the path lattice). */
const isAtomDir = (dir: string): boolean => {
  if (!isDir(dir)) return false
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return false
  }
  return (
    entries.includes('SKILL.md') ||
    entries.includes('index.ts') ||
    entries.includes('index.tsx')
  )
}

/** Every atom path under src/ (SKILL.md or index cross). */
export function listAtomPathsOnDisk(cwd: string = process.cwd()): string[] {
  const root = join(cwd, SRC)
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    if (isAtomDir(dir)) out.push(rel || '.')
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      const seg = rel ? `${rel}/${e}` : e
      if (!rel && SKIP_TREES.has(seg)) continue
      walk(p, seg)
    }
  }
  walk(root, '')
  return out.sort()
}

const reciprocalPath = (atomPath: string): string | null => {
  const parts = normalize(atomPath).split('/').filter(Boolean)
  if (parts.length !== 2) return null
  return `${parts[1]}/${parts[0]}`
}

/**
 * Path double-wire — subfolders exist only as reciprocal pairs (law/order ↔ order/law).
 * Depth > 2 is entropy; depth 2 without reverse path is a one-way bond.
 */
export function pathDoubleWireViolations(cwd: string = process.cwd()): IndexCrossViolation[] {
  const atoms = new Set(listAtomPathsOnDisk(cwd).filter((p) => p !== '.'))
  const violations: IndexCrossViolation[] = []
  for (const atomPath of atoms) {
    const parts = atomPath.split('/').filter(Boolean)
    if (parts.length <= 1) continue
    if (parts.length > 2) {
      violations.push({
        atomPath,
        kind: 'depth-exceeds-wire',
        detail: `path depth ${parts.length} — only A/B ↔ B/A double-wire subfolders permitted`,
        interact64: bondHex(atomPath),
      })
      continue
    }
    const rev = reciprocalPath(atomPath)!
    if (!atoms.has(rev)) {
      violations.push({
        atomPath,
        kind: 'one-way-path',
        detail: `missing reciprocal path ${rev}`,
        paths: [atomPath, rev],
        interact64: bondHex(atomPath, rev),
      })
    }
  }
  return violations
}

/** Seal path-axis impurities for finishedIdeaCrossed. */
export function pathDoubleWireImpurities(atomPath: string, cwd: string = process.cwd()): string[] {
  const path = normalize(atomPath)
  if (!path || path === '.') return []
  const parts = path.split('/').filter(Boolean)
  if (parts.length <= 1) return []
  if (parts.length > 2) {
    return [`path: depth ${parts.length} exceeds double-wire (only A/B ↔ B/A subfolders)`]
  }
  const rev = reciprocalPath(path)!
  const revDir = join(cwd, SRC, rev)
  if (!isAtomDir(revDir)) {
    return [`path: ${path} lacks reciprocal atom ${rev}`]
  }
  return []
}

export interface SealPathDoubleWireResult {
  readonly before: number
  readonly after: number
  readonly sealed: number
  readonly paths: readonly string[]
}

const stubSkill = (p: string, pair: string): string =>
  `---\nname: ${p.split('/').pop()}\natomPath: ${p}\n---\n\n# ${p}\n\nReciprocal cross of \`${pair}\` — path double-wire seal.\n`

const stubIndex = (p: string, pair: string): string =>
  `import { recordOnPath } from '@/path'\nexport const atomPath = '${p}' as const\nexport * from '@/${pair}'\nrecordOnPath(atomPath, { kind: 'path-double-wire', pair: '${pair}' })\n`

/**
 * The stub's proof, written so it CAN FAIL.
 *
 * It used to be `expect(atomPath).toBe('<p>')` against an `index.ts` reading
 * `export const atomPath = '<p>'` — which is [[rules]]/mirror's canonical example, verbatim. The
 * corpus's own autoclean generated the exact assertion the gate exists to remove, and running it
 * over the 2,315 one-way paths would have minted that many vacuous proofs in one batch.
 *
 * Now it compares the declared path against the address the FILESYSTEM gives, so moving the
 * folder reddens it. That is the same conversion that took 453 of erpax's 507 mirrors to
 * refutable claims.
 */
const stubTest = (p: string): string =>
  `import { describe, it, expect } from 'vitest'\nimport { atomAddress } from '@/atom/address'\nimport { atomPath } from './index'\ndescribe('${p}', () => { it('declares the path it lives at', () => { expect(atomPath).toBe(atomAddress(import.meta.url).path) }) })\n`

/** Autoclean — materialise missing B/A for each one-way A/B (bounded batch). */
export function sealPathDoubleWire(cwd: string = process.cwd(), max = 30): SealPathDoubleWireResult {
  const before = pathDoubleWireViolations(cwd).filter((v) => v.kind === 'one-way-path').length
  const paths: string[] = []
  const seen = new Set<string>()
  for (const v of pathDoubleWireViolations(cwd)) {
    if (v.kind !== 'one-way-path' || !v.paths?.[1]) continue
    const pair = v.paths[0]!
    const rev = v.paths[1]!
    if (seen.has(rev)) continue
    seen.add(rev)
    const dir = join(cwd, SRC, rev)
    mkdirSync(dir, { recursive: true })
    const skill = join(dir, 'SKILL.md')
    const index = join(dir, 'index.ts')
    const test = join(dir, 'test.ts')
    if (!existsSync(skill)) writeFileSync(skill, stubSkill(rev, pair))
    if (!existsSync(index)) writeFileSync(index, stubIndex(rev, pair))
    if (!existsSync(test)) writeFileSync(test, stubTest(rev))
    paths.push(rev)
    if (paths.length >= max) break
  }
  const after = pathDoubleWireViolations(cwd).filter((x) => x.kind === 'one-way-path').length
  return { before, after, sealed: exactMax(0, before - after), paths }
}

const auditFolder = (atomPath: string, cwd: string): IndexCrossViolation[] => {
  const violations: IndexCrossViolation[] = []
  const dir = join(cwd, SRC, atomPath)
  // `index.tsx` IS a cross. A React component folder crosses through the same door with a
  // different extension, and this check looked only for `.ts` — so `admin/bar`,
  // `before/login`, every `blocks/form/*` and 32 more were reported as having no cross
  // while holding one. The corpus's own COLOCATED set has always listed both.
  const indexPath = ['index.ts', 'index.tsx']
    .map((n) => join(dir, n))
    .find((p) => existsSync(p)) ?? null
  if (!indexPath) {
    violations.push({
      atomPath,
      kind: 'unwired-cross',
      detail: 'code folder missing index cross (index.ts / index.tsx)',
      interact64: bondHex(atomPath),
    })
    return violations
  }
  const indexContent = readFileSync(indexPath, 'utf8')
  const reexported = reexportTargets(indexContent)
  const parent = atomPath.includes('/') ? atomPath.split('/').slice(0, -1).join('/') : null

  for (const stem of matterStemsInFolder(dir)) {
    if (!reexported.has(stem)) {
      violations.push({
        atomPath,
        kind: 'missing-reexport',
        detail: `index cross missing re-export for ./${stem}`,
        paths: [`${atomPath}/${stem}.ts`],
        interact64: bondHex(atomPath, stem),
      })
    }
  }

  for (const child of childIndexFolders(dir)) {
    if (!reexported.has(child)) {
      violations.push({
        atomPath,
        kind: 'one-way-bond',
        detail: `parent index does not re-export child ./${child}`,
        paths: [`${atomPath}/${child}`],
        interact64: bondHex(atomPath, `${atomPath}/${child}`),
      })
    }
    const childIndexPath = join(dir, child, 'index.ts')
    if (existsSync(childIndexPath) && parent) {
      const childContent = readFileSync(childIndexPath, 'utf8')
      if (!hasFoldback(childContent, atomPath)) {
        violations.push({
          atomPath: `${atomPath}/${child}`,
          kind: 'missing-foldback',
          detail: `child does not recordOnPath back to parent ${atomPath}`,
          paths: [`${atomPath}/${child}/index.ts`],
          interact64: bondHex(`${atomPath}/${child}`, atomPath),
        })
      }
    }
  }

  if (parent && existsSync(join(cwd, SRC, parent, 'index.ts'))) {
    const leaf = atomPath.split('/').pop()!
    const parentContent = readFileSync(join(cwd, SRC, parent, 'index.ts'), 'utf8')
    if (!reexportTargets(parentContent).has(leaf)) {
      violations.push({
        atomPath,
        kind: 'missing-foldback',
        detail: `nested cross not bonded in parent ${parent} index`,
        paths: [parent, atomPath],
        interact64: bondHex(atomPath, parent),
      })
    }
  }

  return violations
}

const deepImportsInScope = (cwd: string, scope?: string): ImportViolation[] => {
  const prefix = scope ? normalize(scope) : null
  return nonIndexImports(join(cwd, SRC)).filter((v) => {
    if (!prefix) return true
    const specPath = v.spec.replace(/^@\//, '')
    return specPath.startsWith(prefix) || v.file.startsWith(prefix)
  })
}

/**
 * STRUCTURAL or WIRING — the split that makes this axis mean something.
 *
 * `one-way-path` demands a MIRROR atom for every `a/b` (so `quantum/interval` requires
 * `interval/quantum`), and `depth-exceeds-wire` forbids any atom nested more than two segments.
 * Both are unconditional facts about the SHAPE of the tree, and this corpus has a deep tree by
 * design: every lawful atom it adds violates them, so a ceiling on the total gates GROWTH rather
 * than decay. Measured: ~1.083 violations per atom, and ten atoms added in one session added 18.
 *
 * The wiring kinds are different in kind, not degree — a careful author incurs none of them, and
 * each names a concrete edit. Those are gated; the structural ones are reported.
 */
export type IndexCrossClass = 'structural' | 'wiring'

export const indexCrossClassOf = (kind: IndexCrossViolationKind): IndexCrossClass =>
  kind === 'one-way-path' || kind === 'depth-exceeds-wire' ? 'structural' : 'wiring'

/**
 * One condition was counted TWICE under two names.
 *
 * `one-way-bond` says "parent index does not re-export child ./x" keyed on the parent;
 * `missing-foldback` says "nested cross not bonded in parent" keyed on the child. Measured: 467
 * pairs appear under both, out of 470 and 467. The axis inflated its own number by 467 — a
 * seventh of the total — and no reading of the count could have shown it.
 */
export function dedupeIndexCross(violations: readonly IndexCrossViolation[]): IndexCrossViolation[] {
  const bonded = new Set(
    violations.filter((v) => v.kind === 'one-way-bond').map((v) => String(v.paths?.[0] ?? '')),
  )
  return violations.filter(
    (v) => !(v.kind === 'missing-foldback' && String(v.detail).includes('not bonded in parent') && bonded.has(v.atomPath)),
  )
}

export function indexCrossAudit(path?: string, cwd: string = process.cwd()): IndexCrossAudit {
  const scope = path ? normalize(path) : null
  const folders = listIndexFolders(cwd, scope ?? undefined)
  const violations: IndexCrossViolation[] = []
  const deepImports = deepImportsInScope(cwd, scope ?? undefined)

  for (const v of deepImports) {
    const target = v.spec.replace(/^@\//, '')
    const cross = target.split('/').slice(0, -1).join('/') || target
    violations.push({
      atomPath: cross,
      kind: 'deep-import',
      detail: `${v.file} imports ${v.spec} past index cross`,
      paths: [v.file, v.spec],
      interact64: bondHex(cross, target),
    })
  }

  for (const folder of folders) violations.push(...auditFolder(folder, cwd))
  violations.push(...pathDoubleWireViolations(cwd))

  const byKind = emptyByKind()
  for (const v of violations) byKind[v.kind]++

  const unwiredCrosses = [
    ...new Set(violations.filter((v) => v.kind !== 'deep-import').map((v) => v.atomPath)),
  ].sort()

  const deduped = dedupeIndexCross(violations)
  const wiring = deduped.filter((v) => indexCrossClassOf(v.kind) === 'wiring')
  const structural = deduped.filter((v) => indexCrossClassOf(v.kind) === 'structural')

  return {
    scope,
    folders: folders.length,
    violations,
    /** The GATED figure: actionable wiring defects, each pair counted once. */
    violationCount: wiring.length,
    /** Every violation before classification or dedupe — kept so nothing is hidden. */
    rawViolationCount: violations.length,
    wiring,
    /** Reported, never gated by count: a consequence of the tree's shape, not a defect. */
    structural,
    deepImports,
    deepImportCount: deepImports.length,
    byKind,
    unwiredCrosses,
  }
}

export function indexCrossViolationCount(path?: string, cwd: string = process.cwd()): number {
  return indexCrossAudit(path, cwd).violationCount
}

/**
 * Barrels a published package BUNDLES — COMPUTED, not supplied by whoever runs the pass.
 *
 * `export * from './child'` on one of these drags the child into every consumer's install:
 * wiring 89 such edges blind took @erpax/cloudflare from 73 atoms to 92, +68 files and
 * +193KB, and blew three closure ratchets. Outside a package closure the identical edge
 * costs a stranger nothing, which is why this is a refusal and not a ban.
 *
 * The `protectedIndexes` PARAMETER below expresses exactly this, and nothing in the tree
 * ever passed it — the one run that did computed the set inline and threw it away. A
 * refusal that depends on the caller remembering is not a refusal ([[rules]]: a gate that
 * can be skipped is prose), so the pass now computes it for itself: every `index.ts`
 * reachable from a `packages/<atom>` entry over the PARSED import graph.
 *
 * HONEST BOUNDARY: the parsed graph OVER-approximates esbuild's closure — a type-only edge
 * the bundler erases is still an edge here — so it refuses slightly more than it must,
 * which is the safe direction for a tool that writes bytes. The metafile in
 * `packages/build.mjs` remains the ratchet's authority; this only decides where not to write.
 */
let bundledMemo: { cwd: string; barrels: ReadonlySet<string> } | null = null

export function packageBundledBarrels(cwd: string = process.cwd()): ReadonlySet<string> {
  if (bundledMemo && bundledMemo.cwd === cwd) return bundledMemo.barrels
  const entries: string[] = []
  const pkgRoot = join(cwd, 'packages')
  let names: string[] = []
  try {
    names = readdirSync(pkgRoot)
  } catch {
    names = []
  }
  for (const name of names) {
    if (!existsSync(join(pkgRoot, name, 'package.json'))) continue
    const entry = join(cwd, SRC, name, 'index.ts')
    if (existsSync(entry)) entries.push(entry)
  }
  const seen = new Set<string>(entries)
  const queue = [...entries]
  while (queue.length) {
    const file = queue.pop()!
    for (const next of importsOf(file, cwd)) {
      if (seen.has(next)) continue
      seen.add(next)
      queue.push(next)
    }
  }
  const barrels = new Set<string>()
  for (const file of seen) {
    const rel = relative(join(cwd, SRC), file)
    if (rel.startsWith('..')) continue
    if (rel.endsWith('index.ts') || rel.endsWith('index.tsx')) barrels.add(`${SRC}/${rel}`)
  }
  bundledMemo = { cwd, barrels }
  return barrels
}

/**
 * A barrel whose OWN PROOF pins its face may not be widened — the test states the law.
 *
 * `src/skill/test.ts` asserts the barrel re-exports `./frontmatter` and nothing else, and
 * says why: `skill/router/skills.index.ts` is a ~77MB generated bundle, so a barrel that
 * reached it would cost every importer the whole corpus. A wiring pass that appends an
 * `export *` there does not widen a face — it BREAKS a proof, and it did: two red CI runs
 * on `expected [ './frontmatter', './wire' ] to deeply equal [ './frontmatter' ]`.
 *
 * COMPUTED, never declared. The pin is read from the sibling proof's GRAMMAR — a
 * `toEqual`/`toStrictEqual` over an array literal of `./…` specifiers — so a barrel earns
 * protection by writing its proof, not by being added to a list somebody maintains. A
 * regex over TypeScript is a guess ([[rules]]/cycle); this parses.
 *
 * HONEST BOUNDARY: it proves a proof pins A specifier list, never that the list is the
 * BARREL's own — a test pinning some other module's specifiers protects this folder too.
 * That errs toward refusing, which is the safe direction for a tool that writes bytes.
 */
export function isPinnedBarrel(dir: string): boolean {
  const proof = join(dir, 'test.ts')
  if (!existsSync(proof)) return false
  let source: ts.SourceFile
  try {
    source = ts.createSourceFile(proof, readFileSync(proof, 'utf8'), ts.ScriptTarget.Latest, true)
  } catch {
    return false
  }
  let pinned = false
  const visit = (node: ts.Node): void => {
    if (pinned) return
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      /^(toEqual|toStrictEqual)$/.test(node.expression.name.text) &&
      node.arguments.length === 1
    ) {
      const arg = node.arguments[0]
      if (
        ts.isArrayLiteralExpression(arg) &&
        arg.elements.length > 0 &&
        arg.elements.every((e) => ts.isStringLiteral(e) && e.text.startsWith('./'))
      ) {
        pinned = true
        return
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return pinned
}
