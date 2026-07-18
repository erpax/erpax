/**
 * law/folder/index-cross — index.ts is the cross; wire bidirectionally; linear folds into quantum whole.
 *
 * @see ./SKILL.md — ../../path/merge — ../../tamper/import — ../../quantum/fold
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { recordOnPathMerged } from '@/path'
import { nonIndexImports, resolveBarrel, type ImportViolation } from '@/tamper/import'
import { wordFold, digitFold } from '@/quantum/fold'
import { interact64 } from '@/quantum/word'

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const TS_EXT = /\.tsx?$/i
const SKIP_FILE = /\.(generated|d\.ts|test\.ts)$/i
const COLOCATED = new Set(['index.ts', 'index.tsx', 'test.ts', 'translations.ts', 'seed.ts'])

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

const hasFoldback = (content: string, parentPath: string): boolean => {
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
    if (isDir(p) && existsSync(join(p, 'index.ts'))) children.push(e)
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

const stubTest = (p: string): string =>
  `import { describe, it, expect } from 'vitest'\nimport { atomPath } from './index'\ndescribe('${p}', () => { it('names path', () => { expect(atomPath).toBe('${p}') }) })\n`

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
  return { before, after, sealed: Math.max(0, before - after), paths }
}

const auditFolder = (atomPath: string, cwd: string): IndexCrossViolation[] => {
  const violations: IndexCrossViolation[] = []
  const dir = join(cwd, SRC, atomPath)
  const indexPath = existsSync(join(dir, 'index.ts')) ? join(dir, 'index.ts') : null
  if (!indexPath) {
    violations.push({
      atomPath,
      kind: 'unwired-cross',
      detail: 'code folder missing index.ts cross',
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

const appendReexport = (indexContent: string, target: string): string => {
  const line = `export * from './${target}'`
  if (indexContent.includes(`'./${target}'`)) return indexContent
  return `${indexContent.trimEnd()}\n\n${line}\n`
}

const appendFoldback = (indexContent: string, parentPath: string, childPath: string): string => {
  if (hasFoldback(indexContent, parentPath)) return indexContent
  return `${indexContent.trimEnd()}
import { recordOnPathMerged } from '@/path'

/** Fold-back to parent cross — ${parentPath}. */
export const INDEX_CROSS_FOLD = recordOnPathMerged('${childPath}', { kind: 'index-cross.foldback', parent: '${parentPath}' })
`
}

export function wireIndexCross(path?: string, cwd: string = process.cwd(), max = 25): WireIndexCrossResult {
  const before = indexCrossAudit(path, cwd).violationCount
  const paths: string[] = []
  let deepImportsFixed = 0
  let wired = 0

  const targetFolders = path
    ? [normalize(path)]
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

    for (const stem of matterStemsInFolder(dir)) {
      const next = appendReexport(indexContent, stem)
      if (next !== indexContent) {
        indexContent = next
        changed = true
      }
    }

    for (const child of childIndexFolders(dir)) {
      const next = appendReexport(indexContent, child)
      if (next !== indexContent) {
        indexContent = next
        changed = true
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
      recordOnPathMerged(atomPath, { kind: 'index-cross.wire', wired: true })
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
