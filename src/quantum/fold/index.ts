/**
 * quantum/fold — word ⊗ digit double fold (64-bit torus halves → 128-bit combined).
 *
 * Linear logic merged in index — no linear-logic.ts sibling (tamper surface concentrated).
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import { nodeOf, merge } from '@/uuid/matrix'
import { digitAddress } from '@/digit'
import { wordTokenUuid } from '@/word'
import { interact64, combineArchitectures, architectureMask } from '@/quantum/word'

const hexOf = (uuid: string): string => uuid.replace(/[^0-9a-fA-F]/g, '')

export function uuidFold64(uuid: string): bigint {
  const h = hexOf(uuid).slice(0, 16)
  return h.length > 0 ? BigInt(`0x${h}`) : 0n
}

export function wordFold(atomOrPath: string): bigint {
  const leaf = atomOrPath.split('/').pop() ?? atomOrPath
  return uuidFold64(wordTokenUuid(leaf)) & architectureMask()
}

export function digitFold(atomOrPath: string): bigint {
  const leaf = atomOrPath.split('/').pop() ?? atomOrPath
  const node = nodeOf(atomOrPath) ?? nodeOf(leaf)
  return node?.uuid ? uuidFold64(node.uuid) & architectureMask() : 0n
}

export interface Partition2d {
  readonly debitSum: number
  readonly creditSum: number
}

export interface QuantumFoldResult {
  readonly wordHalf: bigint
  readonly digitHalf: bigint
  readonly combined128: bigint
  readonly interact64: bigint
  readonly digitAddress: string | null
  readonly architectureBond: string
  readonly superposition: 0 | 1
}

const architectureBond = (): string => {
  const w = nodeOf('word')?.uuid ?? ''
  const d = nodeOf('digit')?.uuid ?? ''
  return w <= d ? merge(w, d) : merge(d, w)
}

export function doubleFold(atomOrPath: string, sealed = false): QuantumFoldResult {
  const wordHalf = wordFold(atomOrPath)
  const digitHalf = digitFold(atomOrPath)
  const leaf = atomOrPath.split('/').pop() ?? atomOrPath
  return {
    wordHalf,
    digitHalf,
    combined128: combineArchitectures(wordHalf, digitHalf),
    interact64: interact64(wordHalf, digitHalf),
    digitAddress: digitAddress(leaf) ?? null,
    architectureBond: architectureBond(),
    superposition: sealed ? 0 : 1,
  }
}

export interface QuantumFoldOpts {
  readonly sealed?: boolean
  readonly debits?: readonly { readonly account: string; readonly amount: number }[]
  readonly credits?: readonly { readonly account: string; readonly amount: number }[]
}

export function quantumFoldOf(atomPath: string, opts?: QuantumFoldOpts): QuantumFoldResult {
  const base = doubleFold(atomPath, opts?.sealed ?? false)
  const debitSum = opts?.debits?.reduce((s, l) => s + l.amount, 0) ?? 0
  const creditSum = opts?.credits?.reduce((s, l) => s + l.amount, 0) ?? 0
  if (debitSum === 0 && creditSum === 0) return base
  const mask = architectureMask()
  const wordHalf = (base.wordHalf ^ BigInt(debitSum) ^ BigInt(creditSum << 16)) & mask
  return {
    ...base,
    wordHalf,
    combined128: combineArchitectures(wordHalf, base.digitHalf),
    interact64: interact64(wordHalf, base.digitHalf),
  }
}

export function quantumFoldPresentation(fold: QuantumFoldResult): {
  readonly wordFold: string
  readonly digitFold: string
  readonly interact64: string
  readonly combined128: string
} {
  const hex = (n: bigint): string => {
    const v = n & architectureMask()
    return v === 0n ? '0' : v.toString(16)
  }
  return {
    wordFold: hex(fold.wordHalf),
    digitFold: hex(fold.digitHalf),
    interact64: hex(fold.interact64),
    combined128: fold.combined128.toString(16),
  }
}

export type LinearKind = 'duplicate-helper' | 'hand-array' | 'import-chain' | 'readme-linear'

export interface LinearSegment {
  readonly linearId: string
  readonly path: string
  readonly kind: LinearKind
  readonly shape: string
  readonly foldHint: string
  readonly pairedWith?: string
}

export interface FoldedLinearPair {
  readonly mergedExport: string
  readonly runner: string
  readonly targetPath: string
  readonly bond: string
}

export interface LinearLogicScan {
  readonly segments: readonly LinearSegment[]
  readonly pairs: readonly FoldedLinearPair[]
}

export interface ApplyLinearFoldsResult {
  readonly applied: number
  readonly scan: LinearLogicScan
}

const LINEAR_SRC = 'src'
const LINEAR_SKIP_TREES = new Set(['app', 'migrations'])
const LINEAR_TS_EXT = /\.tsx?$/i
const LINEAR_SKIP_FILE = /\.(generated|d\.ts|test)$/i

const shapeFold64 = (shape: string): bigint => uuidFold64(shape) & architectureMask()
const linearBondOf = (a: string, b: string): string =>
  interact64(wordFold(a), wordFold(b)).toString(16)
const linearIdOf = (path: string, shape: string): string =>
  interact64(wordFold(path), shapeFold64(shape)).toString(16).padStart(16, '0').slice(0, 16)

const FOLD_REGISTRY: Readonly<
  Record<string, { readonly export: string; readonly target: string; readonly runner: string }>
> = {
  measureOf: { export: 'horoMeasureOf', target: 'horo/index.ts', runner: '@/horo' },
  trinityOf: { export: 'trinityFlagsOf', target: 'pivot/horo-table.ts', runner: '@/pivot/compute' },
  sealedFromReadme: { export: 'sealedFromReadme', target: 'pivot/horo-table.ts', runner: '@/pivot/compute' },
  horoDigits: { export: 'HORO_DIGITS', target: 'horo/index.ts', runner: '@/horo' },
}

const HELPER_PATTERNS: ReadonlyArray<{ readonly name: string; readonly re: RegExp }> = [
  { name: 'measureOf', re: /(?:const|function)\s+measureOf\s*=?\s*\([^)]*\)[^{]*\{[^}]*HORO_DIGITS\.indexOf/s },
  { name: 'trinityOf', re: /(?:const|function)\s+trinityOf\s*=?\s*\([^)]*\)[^{]*\{[^}]*SKILL\.md/s },
  {
    name: 'sealedFromReadme',
    re: /(?:const|function)\s+sealedFromReadme\s*=?\s*\([^)]*\)[^{]*\{[^}]*\[\[seal\]\]/s,
  },
]

const HORO_ARRAY_RE = /\[1,\s*2,\s*4,\s*8,\s*7,\s*5,\s*9\]/

const linearIsDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const scanDuplicateHelpers = (cwd: string): LinearSegment[] => {
  const src = join(cwd, LINEAR_SRC)
  const hits: LinearSegment[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (linearIsDir(p)) {
        walk(p)
        continue
      }
      if (!LINEAR_TS_EXT.test(e) || LINEAR_SKIP_FILE.test(e)) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const rel = relative(src, p).replace(/\\/g, '/')
      for (const { name, re } of HELPER_PATTERNS) {
        if (!re.test(content)) continue
        const fold = FOLD_REGISTRY[name]!
        if (rel === fold.target) continue
        hits.push({
          linearId: linearIdOf(rel, name),
          path: rel,
          kind: 'duplicate-helper',
          shape: name,
          foldHint: `fold ${name} → ${fold.export} from ${fold.runner}`,
        })
      }
    }
  }
  walk(src)
  return hits
}

const scanHandArrays = (cwd: string): LinearSegment[] => {
  const src = join(cwd, LINEAR_SRC)
  const hits: LinearSegment[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (linearIsDir(p)) {
        walk(p)
        continue
      }
      if (!LINEAR_TS_EXT.test(e) || LINEAR_SKIP_FILE.test(e)) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const rel = relative(src, p).replace(/\\/g, '/')
      if (rel === 'horo/index.ts') continue
      if (!HORO_ARRAY_RE.test(content)) continue
      hits.push({
        linearId: linearIdOf(rel, 'horoDigits'),
        path: rel,
        kind: 'hand-array',
        shape: 'horoDigits',
        foldHint: 'fold horo ring array → HORO_DIGITS from @/horo',
      })
    }
  }
  walk(src)
  return hits
}

const scanImportChains = (cwd: string): LinearSegment[] => {
  const src = join(cwd, LINEAR_SRC)
  const graph = new Map<string, Set<string>>()
  const fileOfAtom = new Map<string, string>()
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
      const childRel = rel ? `${rel}/${e}` : e
      if (linearIsDir(p)) {
        if (!rel && LINEAR_SKIP_TREES.has(e)) continue
        walk(p, childRel)
        continue
      }
      if (!LINEAR_TS_EXT.test(e) || LINEAR_SKIP_FILE.test(e)) continue
      if (e !== 'index.ts' && !childRel.includes('/')) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const atom = childRel.replace(/\/index\.tsx?$/, '').replace(/\.tsx?$/, '')
      fileOfAtom.set(atom, childRel)
      const deps = new Set<string>()
      for (const m of content.matchAll(/from\s+['"]@\/([^'"]+)['"]/g)) {
        deps.add((m[1] ?? '').split('/')[0]!)
      }
      graph.set(atom, deps)
    }
  }
  walk(src, '')
  const isFoldBarrel = (atom: string): boolean =>
    atom === 'quantum/fold' || atom.endsWith('/fold') || atom === 'horo' || atom === 'pivot/compute'
  const hits: LinearSegment[] = []
  for (const [start, deps] of graph) {
    for (const mid of deps) {
      const midDeps = graph.get(mid)
      if (!midDeps) continue
      for (const end of midDeps) {
        if (start === end || mid === end || isFoldBarrel(mid)) continue
        hits.push({
          linearId: linearIdOf(start, `${start}→${mid}→${end}`),
          path: fileOfAtom.get(start) ?? start,
          kind: 'import-chain',
          shape: 'chain',
          foldHint: `fold chain via @/quantum/fold — ${start}→${mid}→${end}`,
        })
      }
    }
  }
  return hits
}

const scanReadmeLinear = (cwd: string): LinearSegment[] => {
  const compute = join(cwd, LINEAR_SRC, 'readme/compute.ts')
  if (!existsSync(compute)) return []
  const loops = (readFileSync(compute, 'utf8').match(/for\s*\([^)]*HORO_DIGITS/g) ?? []).length
  if (loops < 2) return []
  return [
    {
      linearId: linearIdOf('readme/compute.ts', 'horo-loop'),
      path: 'readme/compute.ts',
      kind: 'readme-linear',
      shape: 'horo-loop',
      foldHint: 'fold horo ring walks via horoMeasureOf single pass',
    },
  ]
}

const pairSegments = (segments: readonly LinearSegment[]): LinearSegment[] => {
  const byShape = new Map<string, LinearSegment[]>()
  for (const s of segments) {
    if (s.kind !== 'duplicate-helper' && s.kind !== 'hand-array') continue
    const list = byShape.get(s.shape) ?? []
    list.push(s)
    byShape.set(s.shape, list)
  }
  const paired = new Map<string, LinearSegment>()
  for (const [, list] of byShape) {
    if (list.length < 2) continue
    const sorted = [...list].sort((a, b) => a.path.localeCompare(b.path))
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i]!
      const b = sorted[(i + 1) % sorted.length]!
      if (a.path !== b.path) paired.set(a.linearId, { ...a, pairedWith: b.path })
    }
  }
  return segments.map((s) => paired.get(s.linearId) ?? s)
}

export function foldLinearPair(a: LinearSegment, b: LinearSegment): FoldedLinearPair {
  const reg = FOLD_REGISTRY[a.shape] ?? FOLD_REGISTRY[b.shape]
  return {
    bond: linearBondOf(a.path, b.path),
    targetPath: reg?.target ?? 'quantum/fold/index.ts',
    mergedExport: reg?.export ?? 'doubleFold',
    runner: reg?.runner ?? '@/quantum/fold',
  }
}

export function findLinearLogic(cwd: string = process.cwd()): LinearLogicScan {
  const segments = pairSegments([
    ...scanDuplicateHelpers(cwd),
    ...scanHandArrays(cwd),
    ...scanImportChains(cwd),
    ...scanReadmeLinear(cwd),
  ])
  const pairs: FoldedLinearPair[] = []
  const seen = new Set<string>()
  for (const s of segments) {
    if (!s.pairedWith) continue
    const key = [s.path, s.pairedWith].sort().join('|')
    if (seen.has(key)) continue
    seen.add(key)
    pairs.push(
      foldLinearPair(s, {
        linearId: linearIdOf(s.pairedWith, s.shape),
        path: s.pairedWith,
        kind: s.kind,
        shape: s.shape,
        foldHint: s.foldHint,
      }),
    )
  }
  return { segments, pairs: pairs.sort((a, b) => b.bond.localeCompare(a.bond)) }
}

export function linearLogicCount(cwd: string = process.cwd()): number {
  return findLinearLogic(cwd).pairs.length
}

const foldMeasureFile = (cwd: string, rel: string): boolean => {
  const file = join(cwd, LINEAR_SRC, rel)
  if (!existsSync(file)) return false
  let content = readFileSync(file, 'utf8')
  if (!content.includes('measureOf') || content.includes('horoMeasureOf')) return false
  if (!content.includes('horoMeasureOf')) {
    content = content.replace(
      /import\s*\{([^}]+)\}\s*from\s*'@\/horo'/,
      (_, names: string) =>
        `import {${names.includes('horoMeasureOf') ? names : `${names.trim()}, horoMeasureOf`}} from '@/horo'`,
    )
    if (!content.includes('horoMeasureOf')) {
      content = `import { horoMeasureOf } from '@/horo'\n${content}`
    }
  }
  content = content.replace(/\bmeasureOf\b/g, 'horoMeasureOf')
  content = content.replace(
    /const horoMeasureOf\s*=\s*\([^)]*\)[^}]*\{[^}]*HORO_DIGITS[^}]*\}\s*\n/s,
    '',
  )
  const prior = readFileSync(file, 'utf8')
  if (prior === content) return false
  writeFileSync(file, content)
  return true
}

const foldTrinityFile = (cwd: string, rel: string): boolean => {
  const file = join(cwd, LINEAR_SRC, rel)
  if (!existsSync(file)) return false
  let content = readFileSync(file, 'utf8')
  if (!content.includes('trinityOf') && !content.match(/const sealedFromReadme\s*=/)) return false
  if (content.includes('trinityFlagsOf') && !content.match(/const sealedFromReadme\s*=/)) return false
  if (!content.includes("from '@/pivot")) {
    content = `import { trinityFlagsOf, sealedFromReadme } from '@/pivot/compute'\n${content}`
  }
  content = content.replace(/\btrinityOf\b/g, 'trinityFlagsOf')
  content = content.replace(
    /const trinityFlagsOf\s*=\s*\([^)]*\)[^}]*\{[^}]*SKILL\.md[^}]*\}\s*\n/s,
    '',
  )
  content = content.replace(
    /const sealedFromReadme\s*=\s*\([^)]*\)[^}]*\{[^}]*\[\[seal\]\][^}]*\}\s*\n/s,
    '',
  )
  const prior = readFileSync(file, 'utf8')
  if (prior === content) return false
  writeFileSync(file, content)
  return true
}

export function applyLinearFolds(cwd: string = process.cwd(), max = 15): ApplyLinearFoldsResult {
  const before = findLinearLogic(cwd)
  let applied = 0
  const exports = new Set(before.pairs.slice(0, max).map((p) => p.mergedExport))
  if (exports.has('horoMeasureOf')) {
    for (const seg of before.segments.filter((s) => s.shape === 'measureOf')) {
      if (foldMeasureFile(cwd, seg.path)) applied++
    }
  }
  if (exports.has('trinityFlagsOf') || exports.has('sealedFromReadme')) {
    for (const seg of before.segments.filter((s) => s.shape === 'trinityOf' || s.shape === 'sealedFromReadme')) {
      if (foldTrinityFile(cwd, seg.path)) applied++
    }
  }
  return { applied, scan: findLinearLogic(cwd) }
}

export function formatLinearFoldReport(scan: LinearLogicScan = findLinearLogic()): string {
  const lines = [
    'erpax quantum fold — linear logic',
    `  segments found   ${scan.segments.length}`,
    `  pairs (unfolded) ${scan.pairs.length}`,
  ]
  for (const s of scan.segments.slice(0, 10)) {
    lines.push(`    ${s.kind} · ${s.path}${s.pairedWith ? ` · pair ${s.pairedWith}` : ''}`)
    lines.push(`      ${s.foldHint}`)
  }
  for (const p of scan.pairs.slice(0, 5)) {
    lines.push(`    bond 0x${p.bond} → ${p.runner}.${p.mergedExport}`)
  }
  lines.push('Axis: linear-logic · fix: pnpm erpax quantum fold --linear --apply')
  return lines.join('\n')
}

export function runQuantumFoldLinear(apply = false, max = 15): number {
  if (!apply) {
    console.log(formatLinearFoldReport())
    return linearLogicCount() > 0 ? 1 : 0
  }
  const result = applyLinearFolds(process.cwd(), max)
  console.log(formatLinearFoldReport(result.scan))
  console.log(`  applied ${result.applied} fold(s)`)
  return result.scan.pairs.length > 0 ? 1 : 0
}

const __cli = process.argv[1]
if (__cli && import.meta.url === pathToFileURL(__cli).href && process.argv.includes('--linear')) {
  process.exit(runQuantumFoldLinear(process.argv.includes('--apply')))
}

/** Gap scan/seal — re-exported from ../gap (HEAD split); barrel satisfies ./fold imports. */
export {
  linearGaps,
  linearGapCount,
  sealLinearGaps,
  formatLinearGapReport,
  runQuantumSeal,
  entanglementScore,
  stubSkillMd,
  stubIndexTs,
  stubTestTs,
} from '../gap'
export type {
  LinearGap,
  LinearGapKind,
  LinearGapScan,
  SealLinearGapsResult,
  SealHint,
  SealHintAction,
} from '../gap'
