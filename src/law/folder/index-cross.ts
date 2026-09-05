import { exactMax } from '@/algebra'
/**
 * law/folder/index-cross — index.ts is the cross; wire bidirectionally; linear folds into quantum whole.
 *
 * @see ./SKILL.md — ../../path/merge — ../../tamper/import — ../../quantum/fold
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import ts from 'typescript'
import { join, relative } from 'node:path'
import { nonIndexImports, resolveBarrel, type ImportViolation } from '@/tamper/import'
import { exportedNames } from '@/rules/face'
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
  readonly violationCount: number
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

const reexportTargets = (indexContent: string): Set<string> => {
  const out = new Set<string>()
  for (const m of indexContent.matchAll(/export\s+(?:\*|{[^}]*}|\w+)\s+from\s+['"]\.\/([^'"]+)['"]/g)) {
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

export function pathDoubleWireHolds(atomPath: string, cwd: string = process.cwd()): boolean {
  return pathDoubleWireImpurities(atomPath, cwd).length === 0
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

  return {
    scope,
    folders: folders.length,
    violations,
    violationCount: violations.length,
    deepImports,
    deepImportCount: deepImports.length,
    byKind,
    unwiredCrosses,
  }
}

export function indexCrossViolationCount(path?: string, cwd: string = process.cwd()): number {
  return indexCrossAudit(path, cwd).violationCount
}

const nearestIndexCross = (atomPath: string, cwd: string): string => {
  const parts = normalize(atomPath).split('/').filter(Boolean)
  for (let len = parts.length; len >= 1; len--) {
    const candidate = parts.slice(0, len).join('/')
    if (existsSync(join(cwd, SRC, candidate, 'index.ts'))) return candidate
  }
  return parts[0] ?? atomPath
}

export function linearSpacesInWhole(cwd: string = process.cwd()): LinearSpacesScan {
  const spaces: LinearSpace[] = []
  const importRe = /(?:from|import)\s+['"](@\/[^'"]+)['"]/g
  const fileImports = new Map<string, string[]>()
  const srcRoot = join(cwd, SRC)

  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (isDir(p)) {
        if (SKIP_TREES.has(e) && !rel) continue
        walk(p, rel ? `${rel}/${e}` : e)
        continue
      }
      if (!TS_EXT.test(e) || SKIP_FILE.test(e)) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const specs: string[] = []
      for (let m; (m = importRe.exec(content)); ) {
        const spec = m[1]!
        if (!resolveBarrel(spec, srcRoot)) specs.push(spec.replace(/^@\//, ''))
      }
      if (specs.length) fileImports.set(rel ? `${rel}/${e}` : e, specs)
    }
  }
  walk(srcRoot, '')

  const seen = new Set<string>()
  for (const [file, specs] of fileImports) {
    const fileAtom = file.replace(/\/[^/]+$/, '').replace(/\.tsx?$/, '')
    for (const spec of specs) {
      if (!spec.includes('/')) continue
      const key = `${fileAtom}→${spec}`
      if (seen.has(key)) continue
      seen.add(key)
      const cross = nearestIndexCross(spec, cwd)
      spaces.push({
        chain: [fileAtom, spec],
        nearestCross: cross,
        foldHint: `redirect @/${spec} → @/${cross}`,
        interact64: bondHex(fileAtom, spec),
      })
    }
  }

  return { spaces: spaces.sort((a, b) => a.nearestCross.localeCompare(b.nearestCross)), count: spaces.length }
}

/**
 * UNIQUE-OR-REFUSE, applied to a barrel.
 *
 * `export * from './child'` is the lawful shape until two siblings export the same
 * word: the parent then stops compiling (TS2308), and `quantum` alone has four such
 * pairs — coverage · atomPath · dedupHolds · queryUuid. Both names are real; deciding
 * which one a barrel offers is a judgement about MEANING, and the scalpel's own law
 * says a cut that cannot be made uniquely is refused rather than forced.
 *
 * The offered set is carried IN MEMORY across the loop. Reading it back from disk each
 * time sees only the parent's committed face, so two siblings added in the same pass
 * collide with each other and nothing notices until tsc — which is exactly what
 * happened on the first run (`body/index.ts`, four names, 314 files to roll back).
 */
/**
 * A child that reaches a NODE BUILTIN may not be re-exported from a barrel.
 *
 * `export * from './harvest'` on `@/i18n` broke the production build:
 * `UnhandledSchemeError: Reading from "node:fs" is not handled` — harvest reads the
 * filesystem, `@/i18n` is imported by client components, and a barrel re-export drags
 * the whole child into the browser bundle. Nothing about the NAMES says so.
 *
 * The published-package closure was the first consumer I measured and the browser is the
 * second. Both are the same law: a barrel edge is free only where nobody downstream pays
 * for it. Refusing every node-reaching child is conservative — a server-only barrel loses
 * a wire it could have carried — and it cannot break a bundle.
 */
const reachesNodeBuiltin = (childFile: string, cwd: string): boolean => {
  const seen = new Set<string>([childFile])
  const queue = [childFile]
  let visits = 0
  while (queue.length > 0 && visits < 300) {
    const file = queue.shift() as string
    visits++
    let text = ''
    try {
      text = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    if (/from\s+['"]node:/.test(text)) return true
    for (const next of importsOf(file, cwd)) {
      if (seen.has(next)) continue
      seen.add(next)
      queue.push(next)
    }
  }
  return false
}

/**
 * A barrel edge that closes a LOOP is refused.
 *
 * `export * from './fold'` looked safe — no name collided — and it broke 34 suites with
 * `toUuid is not a function`. The edge closed algebra → fold → merge → algebra, and
 * `merge` calls `toUuid` at module scope, so the binding was read before it existed.
 * That is the TDZ this corpus collapsed its own boot on once ([[rules]]/cycle): a loop
 * decides initialisation order by accident, and nothing about the NAMES reveals it.
 *
 * Edges are PARSED (`importsOf`), never matched, and the walk is bounded — a barrel
 * wiring pass may not cost a full graph traversal per candidate.
 */
const wouldCloseALoop = (parentAtom: string, childFile: string, cwd: string): boolean => {
  const parentDir = join(cwd, SRC, parentAtom) + '/'
  const seen = new Set<string>([childFile])
  const queue = [childFile]
  let visits = 0
  while (queue.length > 0 && visits < 400) {
    const file = queue.shift() as string
    visits++
    for (const next of importsOf(file, cwd)) {
      if (seen.has(next)) continue
      if (next.startsWith(parentDir) || next === join(cwd, SRC, parentAtom, 'index.ts')) return true
      seen.add(next)
      queue.push(next)
    }
  }
  return false
}

const faceNames = (file: string): Set<string> => {
  try {
    return existsSync(file) ? exportedNames(file) : new Set<string>()
  } catch {
    return new Set<string>()
  }
}

const childFaceFile = (dir: string, target: string): string => {
  const asAtom = join(dir, target, 'index.ts')
  return existsSync(asAtom) ? asAtom : join(dir, `${target}.ts`)
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

const appendReexport = (
  indexContent: string,
  target: string,
  dir: string,
  offered: Set<string>,
  atomPath: string,
  cwd: string,
  protectedIndexes?: ReadonlySet<string>,
): string => {
  const face = `${SRC}/${atomPath}/index.ts`
  if (protectedIndexes?.has(face)) return indexContent
  if (packageBundledBarrels(cwd).has(face)) return indexContent
  if (isPinnedBarrel(dir)) return indexContent
  if (indexContent.includes(`'./${target}'`)) return indexContent
  const file = childFaceFile(dir, target)
  if (!existsSync(file)) return indexContent
  if (wouldCloseALoop(atomPath, file, cwd)) return indexContent
  if (reachesNodeBuiltin(file, cwd)) return indexContent
  const theirs = faceNames(file)
  if (theirs.size === 0) return indexContent
  for (const name of theirs) if (offered.has(name)) return indexContent
  for (const name of theirs) offered.add(name)
  return `${indexContent.trimEnd()}\n\nexport * from './${target}'\n`
}

/** The fold-back is a banner, not an export: it collides with nothing and runs nothing. */
const FOLDBACK_BANNER = '@index-cross.foldback'

const appendFoldback = (indexContent: string, parentPath: string, childPath: string): string => {
  if (hasFoldback(indexContent, parentPath)) return indexContent
  return `${indexContent.trimEnd()}

/** ${FOLDBACK_BANNER} child=${childPath} parent=${parentPath} — this cross folds back into its parent. */
`
}

/**
 * `foldbackOnly` wires the half that cannot collide.
 *
 * `export * from './child'` is the lawful barrel shape until two siblings export the
 * same word — then the parent stops compiling (TS2308), and `quantum` alone has four
 * such pairs (coverage · atomPath · dedupHolds · queryUuid). Naming which of two real
 * homonyms a barrel offers is a judgement, not a sweep. The fold-back banner is data:
 * it collides with nothing and can be wired at scale.
 */
export function wireIndexCross(
  path?: string,
  cwd: string = process.cwd(),
  max = 25,
  opts: {
    readonly foldbackOnly?: boolean
    /**
     * Barrels a published package BUNDLES — repo-relative, e.g. `src/accounting/index.ts`.
     *
     * `export * from './child'` on one of these drags the child into every consumer's
     * install: wiring 89 such edges blind took @erpax/cloudflare from 73 to 92 atoms,
     * +68 files and +193KB, and blew three closure ratchets. Outside a package closure
     * the identical edge costs a stranger nothing.
     *
     * The caller computes this from the SAME esbuild bundle the closure ratchet measures
     * with, so the refusal and the ceiling are one measurement rather than two opinions.
     */
    readonly protectedIndexes?: ReadonlySet<string>
  } = {},
): WireIndexCrossResult {
  const before = indexCrossAudit(path, cwd).violationCount
  const paths: string[] = []
  let deepImportsFixed = 0
  let wired = 0

  // The fold-back pass visits EVERY parent that has children.
  //
  // It used to inherit the re-export pass's target list — priority hubs plus the
  // `unwiredCrosses` — so a parent that was already wired never had its children
  // bannered, and 393 fold-backs the tool could have written for free sat there while
  // the sweep reported "0 files" and stopped. A banner is a comment: it collides with
  // nothing, closes no loop, and costs no consumer a byte, so there is no reason to
  // ration it to the folders some other pass happened to select.
  const targetFolders = path
    ? [normalize(path)]
    : opts.foldbackOnly
      ? listIndexFolders(cwd)
      : [
          ...INDEX_CROSS_PRIORITY.filter((p) => existsSync(join(cwd, SRC, p))),
          ...indexCrossAudit(path, cwd).unwiredCrosses.filter((p) => !INDEX_CROSS_PRIORITY.includes(p)),
        ]

  const deepBySpec = new Map<string, ImportViolation[]>()
  for (const v of indexCrossAudit(path, cwd).deepImports) {
    const list = deepBySpec.get(v.spec) ?? []
    list.push(v)
    deepBySpec.set(v.spec, list)
  }

  for (const [spec, hits] of deepBySpec) {
    const parts = spec.replace(/^@\//, '').split('/')
    for (let len = parts.length - 1; len >= 1; len--) {
      const barrel = '@/' + parts.slice(0, len).join('/')
      if (!resolveBarrel(barrel, join(cwd, SRC))) continue
      for (const hit of hits) {
        const filePath = join(cwd, SRC, hit.file)
        if (!existsSync(filePath)) continue
        const content = readFileSync(filePath, 'utf8')
        const next = content.split(spec).join(barrel)
        if (next !== content) {
          writeFileSync(filePath, next)
          deepImportsFixed++
          paths.push(hit.file)
        }
      }
      break
    }
  }

  for (const atomPath of targetFolders.slice(0, max)) {
    const dir = join(cwd, SRC, atomPath)
    const indexPath = join(dir, 'index.ts')
    if (!existsSync(indexPath)) continue
    let indexContent = readFileSync(indexPath, 'utf8')
    let changed = false
    const offered = faceNames(indexPath)

    if (!opts.foldbackOnly) {
      for (const stem of matterStemsInFolder(dir)) {
        const next = appendReexport(indexContent, stem, dir, offered, atomPath, cwd, opts.protectedIndexes)
        if (next !== indexContent) {
          indexContent = next
          changed = true
        }
      }
    }

    for (const child of childIndexFolders(dir)) {
      if (!opts.foldbackOnly) {
        const next = appendReexport(indexContent, child, dir, offered, atomPath, cwd, opts.protectedIndexes)
        if (next !== indexContent) {
          indexContent = next
          changed = true
        }
      }
      const childIndexPath = join(dir, child, 'index.ts')
      if (existsSync(childIndexPath)) {
        const childContent = readFileSync(childIndexPath, 'utf8')
        const childNext = appendFoldback(childContent, atomPath, `${atomPath}/${child}`)
        if (childNext !== childContent) {
          writeFileSync(childIndexPath, childNext)
          paths.push(`${atomPath}/${child}/index.ts`)
        }
      }
    }

    if (changed) {
      writeFileSync(indexPath, indexContent)
      paths.push(`${atomPath}/index.ts`)
      wired++
    }
  }

  const after = indexCrossAudit(path, cwd).violationCount
  return {
    before,
    after,
    wired,
    deepImportsFixed,
    paths: [...new Set(paths)].sort(),
    samples: paths.slice(0, 8),
  }
}

export function formatIndexCrossReport(audit: IndexCrossAudit, wire?: WireIndexCrossResult): string {
  const lines: string[] = ['erpax law index-cross — index.ts is the cross\n']
  lines.push(`  scope            ${audit.scope ?? 'whole corpus'}`)
  lines.push(`  folders          ${audit.folders}`)
  lines.push(`  violations       ${audit.violationCount}`)
  lines.push(`  deep-imports     ${audit.deepImportCount}`)
  lines.push(`  unwired crosses  ${audit.unwiredCrosses.length}`)
  for (const kind of [
    'missing-reexport',
    'missing-foldback',
    'one-way-bond',
    'one-way-path',
    'depth-exceeds-wire',
    'deep-import',
    'linear-bypass',
    'unwired-cross',
  ] as const) {
    if (audit.byKind[kind]) lines.push(`    ${kind.padEnd(18)} ${audit.byKind[kind]}`)
  }
  if (audit.violations.length) {
    lines.push('  sample violations:')
    for (const v of audit.violations.slice(0, 8)) {
      lines.push(`    ${v.kind} · ${v.atomPath} — ${v.detail}`)
    }
  }
  if (wire) {
    lines.push(`  wired            ${wire.wired} folders`)
    lines.push(`  deep-import fix  ${wire.deepImportsFixed}`)
    lines.push(`  before → after   ${wire.before} → ${wire.after}`)
    if (wire.samples.length) lines.push(`  sample paths     ${wire.samples.join(' · ')}`)
  }
  lines.push('\nAxis: index-cross · fix: pnpm erpax law index-cross --wire')
  return lines.join('\n')
}
