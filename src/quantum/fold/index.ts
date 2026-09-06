import { exactMax } from '@/algebra'
/**
 * quantum/fold — word ⊗ digit double fold (64-bit torus halves → 128-bit combined).
 *
 * Linear logic merged in index — no linear-logic.ts sibling (tamper surface concentrated).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import { indexVolumes, sortBookPages } from '@/book'
import { CODE_MARKERS, TRINITY, trinityPresent } from '@/law/folder/constants'
import { isOrphanReexportOnly, wordWithoutLogicViolations } from '@/rules/word-without-logic'
import { recordOnPath, recordOnPathMerged } from '@/path'
import { nodeOf, neighborsOf, backlinksOf, UUID_MATRIX_ROOT, architectureBond } from '@/uuid/matrix'
import { digitAddress } from '@/digit'
import { wordTokenUuid } from '@/word'
import { interact64, combineArchitectures, architectureMask } from '@/quantum/word'
import { commentSites } from '@/syntax'

/**
 * CODE with comment ranges blanked — a doc comment that WRITES the ring literal
 * (`the ring is [1,2,4,8,7,5,9]`) is prose describing the constant, never code
 * re-typing it. 14 of 16 horoDigits hits were the ring named in a docstring; the
 * corpus's law is emphatic (a comment is data, [[syntax]]), so match the grammar,
 * not the bytes. Whitespace-fills each comment so line/offset positions are kept.
 */
const codeOnly = (file: string, text: string): string => {
  // ts comment positions are UTF-16 offsets — use slice (UTF-16), never a code-point array.
  let out = text
  for (const c of commentSites(file, text)) {
    const end = c.pos + c.text.length
    const blank = c.text.replace(/[^\n]/g, ' ')
    out = out.slice(0, c.pos) + blank + out.slice(end)
  }
  return out
}

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
// Skip generated · declaration · TEST files. The prior `/\.(…|test)$/` never matched a
// real test: `test.ts` / `x.test.ts` end in `.ts`, not `.test`, so every test file that
// asserts the ring literal (`[1,2,4,8,7,5,9]`) was flagged as re-typing it — but a test
// pinning a constant to its literal is the proof, not linear logic. Anchor on the extension.
const LINEAR_SKIP_FILE = /(?:^|\.)(?:test|generated)\.tsx?$|\.d\.ts$/i

const shapeFold64 = (shape: string): bigint => uuidFold64(shape) & architectureMask()
const linearBondOf = (a: string, b: string): string =>
  interact64(wordFold(a), wordFold(b)).toString(16)
const linearIdOf = (path: string, shape: string): string =>
  interact64(wordFold(path), shapeFold64(shape)).toString(16).padStart(16, '0').slice(0, 16)

const FOLD_REGISTRY: Readonly<
  Record<string, { readonly export: string; readonly target: string; readonly runner: string }>
> = {
  // The definition sites — excluded from their own axis. HORO_DIGITS / horoMeasureOf moved
  // to horo/constants/index.ts in the facade split (967bc70a7); the stale `horo/index.ts`
  // target stopped excluding the real definition, so the ring's home was flagged for
  // containing the ring. The runner stays the `@/horo` barrel, which re-exports both.
  measureOf: { export: 'horoMeasureOf', target: 'horo/constants/index.ts', runner: '@/horo' },
  trinityOf: { export: 'trinityFlagsOf', target: 'pivot/horo-table.ts', runner: '@/pivot/compute' },
  sealedFromReadme: { export: 'sealedFromReadme', target: 'pivot/horo-table.ts', runner: '@/pivot/compute' },
  horoDigits: { export: 'HORO_DIGITS', target: 'horo/constants/index.ts', runner: '@/horo' },
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
      const code = codeOnly(rel, content)
      for (const { name, re } of HELPER_PATTERNS) {
        if (!re.test(code)) continue
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
      if (rel === FOLD_REGISTRY.horoDigits.target) continue // the ring's definition site
      if (!HORO_ARRAY_RE.test(codeOnly(rel, content))) continue // the ring in CODE, not a docstring
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
  // Key by the EXACT path+shape, never linearId: linearId folds the path through a 64-bit hash, and two
  // distinct files can collide there — which made both paired segments resolve to the SAME entry, so only
  // one of a duplicate pair was ever folded (the other kept its copy). The exact string cannot collide.
  const keyOf = (s: LinearSegment): string => `${s.path}\u0000${s.shape}`
  const paired = new Map<string, LinearSegment>()
  for (const [, list] of byShape) {
    if (list.length < 2) continue
    const sorted = [...list].sort((a, b) => a.path.localeCompare(b.path))
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i]!
      const b = sorted[(i + 1) % sorted.length]!
      if (a.path !== b.path) paired.set(keyOf(a), { ...a, pairedWith: b.path })
    }
  }
  return segments.map((s) => paired.get(keyOf(s)) ?? s)
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

export type LinearGapKind = 'harmony-jump' | 'trinity-incomplete' | 'readme-seal-break' | 'orphan-reexport'
export type SealHintAction = 'stub-index' | 'recordOnPath' | 'readme-paths' | 'reexport-pivot'
export interface SealHint {
  readonly action: SealHintAction
  readonly atomPath: string
  readonly paths?: readonly string[]
  readonly detail: string
}
export interface LinearGap {
  readonly kind: LinearGapKind
  readonly atomPath: string
  readonly detail: string
  readonly entanglement: string
  readonly sealHint: SealHint
}
export interface LinearGapScan {
  readonly gaps: readonly LinearGap[]
  readonly byKind: Readonly<Record<LinearGapKind, number>>
}
export interface SealLinearGapsResult {
  readonly before: number
  readonly after: number
  readonly sealed: number
  readonly remainder: number
  readonly paths: readonly string[]
  readonly byKind: Readonly<Partial<Record<LinearGapKind, number>>>
}

const GAP_SRC = 'src'
const GAP_TS_EXT = /\.tsx?$/i
const GAP_SKIP_FILE = /\.(generated|d\.ts)$/i

const gapIsDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}
const gapWordFold = (atomPath: string): bigint =>
  uuidFold64(wordTokenUuid(atomPath.split('/').pop() ?? atomPath)) & architectureMask()
const gapDigitFold = (atomPath: string): bigint => {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const da = digitAddress(atomPath) ?? digitAddress(leaf)
  if (da) return uuidFold64(wordTokenUuid(da)) & architectureMask()
  const n = nodeOf(atomPath) ?? nodeOf(leaf)
  return n ? uuidFold64(n.uuid) & architectureMask() : 0n
}
const isSealedReadme = (cwd: string, atomPath: string): boolean => {
  const readme = join(cwd, GAP_SRC, atomPath, 'README.md')
  return existsSync(readme) && /\[\[seal\]\] `1`/.test(readFileSync(readme, 'utf8'))
}
export function entanglementScore(atomPath: string, other?: string): bigint {
  const base = interact64(gapWordFold(atomPath), gapDigitFold(atomPath))
  return other ? interact64(base, interact64(gapWordFold(other), gapDigitFold(other))) : base
}
const entHex = (n: bigint): string => n.toString(16)
const pop64 = (n: bigint): number => {
  let c = 0
  let v = n
  while (v > 0n) {
    c += Number(v & 1n)
    v >>= 1n
  }
  return c
}
const volLinked = (a: string, b: string): boolean => {
  const na = nodeOf(a)
  const nb = nodeOf(b)
  if (!na || !nb) return false
  const link = (k: string, tp: string, ta: string) =>
    neighborsOf(k).some((n) => (n.path ?? n.atom) === tp || n.atom === ta) ||
    backlinksOf(k).some((n) => (n.path ?? n.atom) === tp || n.atom === ta)
  return link(na.atom, b, nb.atom) || link(nb.atom, a, na.atom)
}
const sharedPairs = (cwd: string, vols: ReadonlySet<string>): ReadonlyMap<string, number> => {
  const m = new Map<string, number>()
  const bump = (a: string, b: string) => {
    const k = a < b ? `${a}|${b}` : `${b}|${a}`
    m.set(k, (m.get(k) ?? 0) + 1)
  }
  const walk = (dir: string) => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (gapIsDir(p)) {
        walk(p)
        continue
      }
      if (!GAP_TS_EXT.test(e) || GAP_SKIP_FILE.test(e)) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const tops = new Set<string>()
      for (const mm of content.matchAll(/from\s+['"]@\/([^/'"]+)/g)) {
        const t = mm[1]!.split('/')[0]!
        if (vols.has(t)) tops.add(t)
      }
      const arr = [...tops]
      for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) bump(arr[i]!, arr[j]!)
    }
  }
  walk(join(cwd, GAP_SRC))
  return m
}
const harmonyJumpGaps = (cwd: string): LinearGap[] => {
  const vols = [...indexVolumes(cwd)]
  const ord = sortBookPages(vols)
  const shared = sharedPairs(cwd, new Set(vols))
  const out: LinearGap[] = []
  for (let i = 0; i < ord.length - 1; i++) {
    const a = ord[i]!
    const b = ord[i + 1]!
    if (volLinked(a, b)) continue
    const n = shared.get(a < b ? `${a}|${b}` : `${b}|${a}`) ?? 0
    if (!n) continue
    out.push({
      kind: 'harmony-jump',
      atomPath: a,
      detail: `bond=0 shared=${n}`,
      entanglement: entHex(entanglementScore(a, b)),
      sealHint: { action: 'recordOnPath', atomPath: a, paths: [a, b], detail: 'record' },
    })
  }
  return out
}
const trinityIncompleteGaps = (cwd: string): LinearGap[] => {
  const out: LinearGap[] = []
  const src = join(cwd, GAP_SRC)
  const scan = (atomPath: string, dir: string) => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    const files = new Set(entries.filter((e) => !gapIsDir(join(dir, e))))
    if (CODE_MARKERS.some((m) => files.has(m))) {
      // Both lawful spellings. Reading `index.ts` literally made this blind in both directions at
      // once — it charged a React atom for lacking the `.ts` name it cannot have, and the recursion
      // below stopped dead at a `.tsx` barrel, so those subtrees were never walked at all. The false
      // negative is the worse half: they were not passing the law, they were outside it.
      const missing = TRINITY.filter((f) => !trinityPresent(dir, f))
      if (missing.length)
        out.push({
          kind: 'trinity-incomplete',
          atomPath,
          detail: `missing ${missing.join(',')}`,
          entanglement: entHex(entanglementScore(atomPath)),
          sealHint: { action: 'stub-index', atomPath, detail: 'stub' },
        })
    }
    if (!trinityPresent(dir, 'index.ts')) return
    for (const e of entries)
      if (!e.startsWith('.')) {
        const p = join(dir, e)
        if (gapIsDir(p)) scan(atomPath ? `${atomPath}/${e}` : e, p)
      }
  }
  for (const hub of readdirSync(src)) {
    if (hub.startsWith('.')) continue
    const hubDir = join(src, hub)
    if (!gapIsDir(hubDir) || !existsSync(join(hubDir, 'index.ts'))) continue
    for (const child of readdirSync(hubDir))
      if (!child.startsWith('.')) {
        const d = join(hubDir, child)
        if (gapIsDir(d)) scan(`${hub}/${child}`, d)
      }
  }
  return out
}
const readmeSealBreakGaps = (cwd: string): LinearGap[] => {
  const out: LinearGap[] = []
  const src = join(cwd, GAP_SRC)
  const walk = (atomPath: string, dir: string) => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.')) continue
      const p = join(dir, e)
      if (!gapIsDir(p)) continue
      const child = `${atomPath}/${e}`
      if (
        (existsSync(join(p, 'README.md')) || existsSync(join(p, 'index.ts'))) &&
        !isSealedReadme(cwd, child)
      )
        out.push({
          kind: 'readme-seal-break',
          atomPath: child,
          detail: 'seal break',
          entanglement: entHex(entanglementScore(child, atomPath)),
          sealHint: { action: 'readme-paths', atomPath: child, paths: [child], detail: 'readme' },
        })
      if (existsSync(join(p, 'index.ts'))) walk(child, p)
    }
  }
  for (const vol of indexVolumes(cwd))
    if (isSealedReadme(cwd, vol)) walk(vol, join(src, vol))
  return out
}
const orphanReexportGaps = (cwd: string): LinearGap[] =>
  wordWithoutLogicViolations(cwd)
    .violations.filter((v) => v.kind === 'orphan-export')
    .map((v) => ({
      kind: 'orphan-reexport' as const,
      atomPath: v.atomPath,
      detail: v.reason,
      entanglement: entHex(entanglementScore(v.atomPath)),
      sealHint: { action: 'reexport-pivot' as const, atomPath: v.atomPath, detail: 'pivot' },
    }))
const dedupeGaps = (gaps: readonly LinearGap[]): LinearGap[] => {
  const s = new Set<string>()
  return gaps.filter((g) => {
    const k = `${g.kind}:${g.atomPath}`
    if (s.has(k)) return false
    s.add(k)
    return true
  })
}
const sortEnt = (gaps: readonly LinearGap[]): LinearGap[] =>
  [...gaps].sort((a, b) => {
    const sa = BigInt(`0x${a.entanglement || '0'}`)
    const sb = BigInt(`0x${b.entanglement || '0'}`)
    const pa = pop64(sa)
    const pb = pop64(sb)
    if (pb !== pa) return pb - pa
    if (sb !== sa) return sb > sa ? 1 : -1
    return a.atomPath.localeCompare(b.atomPath)
  })

export function linearGaps(cwd: string = process.cwd()): LinearGapScan {
  const gaps = sortEnt(
    dedupeGaps([
      ...harmonyJumpGaps(cwd),
      ...trinityIncompleteGaps(cwd),
      ...readmeSealBreakGaps(cwd),
      ...orphanReexportGaps(cwd),
    ]),
  )
  const byKind: Record<LinearGapKind, number> = {
    'harmony-jump': 0,
    'trinity-incomplete': 0,
    'readme-seal-break': 0,
    'orphan-reexport': 0,
  }
  for (const g of gaps) byKind[g.kind]++
  return { gaps, byKind }
}

export function linearGapCount(cwd: string = process.cwd()): number {
  return linearGaps(cwd).gaps.length
}

export const stubSkillMd = (p: string): string => {
  const leaf = p.split('/').pop() ?? p
  return `---\nname: ${leaf}\natomPath: ${p}\n---\n\n# ${p}\n`
}
export const stubIndexTs = (p: string): string =>
  `import{deriveFolderModel}from'@/readme/compute'\nexport const atomPath='${p}' as const\nexport function spreadOf(path:string=atomPath){const m=deriveFolderModel(path);return{debit:m.statement.totalDebits,credit:m.statement.totalCredits}}\n`
export const stubTestTs = (p: string): string =>
  `import{describe,it,expect}from'vitest'\nimport{atomPath,spreadOf}from'@/${p}'\ndescribe('${p}',()=>{it('ok',()=>{expect(atomPath).toBe('${p}');expect(spreadOf().debit).toBeGreaterThanOrEqual(0)})})\n`

export async function sealLinearGaps(
  cwd: string = process.cwd(),
  max = 30,
): Promise<SealLinearGapsResult> {
  const beforeScan = linearGaps(cwd)
  const before = beforeScan.gaps.length
  const readmePaths = new Set<string>()
  const sealedPaths: string[] = []
  const at = UUID_MATRIX_ROOT
  for (const gap of beforeScan.gaps.slice(0, max)) {
    let acted = false
    switch (gap.sealHint.action) {
      case 'stub-index': {
        const dir = join(cwd, GAP_SRC, gap.atomPath)
        mkdirSync(dir, { recursive: true })
        if (!existsSync(join(dir, 'index.ts'))) writeFileSync(join(dir, 'index.ts'), stubIndexTs(gap.atomPath))
        if (!existsSync(join(dir, 'SKILL.md'))) writeFileSync(join(dir, 'SKILL.md'), stubSkillMd(gap.atomPath))
        if (!existsSync(join(dir, 'test.ts'))) writeFileSync(join(dir, 'test.ts'), stubTestTs(gap.atomPath))
        acted = true
        break
      }
      case 'reexport-pivot': {
        const ip = join(cwd, GAP_SRC, gap.atomPath, 'index.ts')
        // the scalpel law: never replace matter that EXISTS. A re-export `from './x'` whose
        // target is a real sibling file (index.tsx, a component, a submodule) is a live barrel,
        // not an orphan — overwriting it deletes the atom's public face. It overwrote
        // pagination's `export { Pagination } from './index.tsx'` (two live consumers) exactly here.
        const body = existsSync(ip) ? readFileSync(ip, 'utf8') : ''
        const reexportTargetsRealSibling = [...body.matchAll(/from\s*['"]\.\/([\w.-]+)['"]/g)].some((m) => {
          const t = m[1]!
          const dir = join(cwd, GAP_SRC, gap.atomPath)
          return ['', '.ts', '.tsx', '.mts', '.js'].some((ext) => existsSync(join(dir, t + ext)))
        })
        if (existsSync(ip) && !reexportTargetsRealSibling && isOrphanReexportOnly(body)) {
          writeFileSync(ip, stubIndexTs(gap.atomPath))
          const tp = join(cwd, GAP_SRC, gap.atomPath, 'test.ts')
          if (!existsSync(tp)) writeFileSync(tp, stubTestTs(gap.atomPath))
          acted = true
        }
        break
      }
      case 'readme-paths':
        for (const p of gap.sealHint.paths ?? [gap.atomPath]) readmePaths.add(p)
        acted = true
        break
      case 'recordOnPath':
        recordOnPathMerged(gap.atomPath, { kind: 'linear-gap.seal', gapKind: gap.kind }, at)
        acted = true
        break
    }
    if (acted && gap.sealHint.action !== 'readme-paths') sealedPaths.push(gap.atomPath)
  }
  if (readmePaths.size > 0) {
    const paths = [...readmePaths].sort()
    const { materializeComputedFacesForPathsStable } = await import('@/readme/compute')
    materializeComputedFacesForPathsStable(paths, cwd)
    for (const p of paths) {
      recordOnPath(p, { kind: 'linear-gap.readme-paths', paths }, at)
      sealedPaths.push(p)
    }
  }
  const after = linearGaps(cwd).gaps.length
  const byKind: Partial<Record<LinearGapKind, number>> = {}
  for (const g of beforeScan.gaps) byKind[g.kind] = (byKind[g.kind] ?? 0) + 1
  return {
    before,
    after,
    sealed: exactMax(0, before - after),
    remainder: after,
    paths: [...new Set(sealedPaths)].sort(),
    byKind,
  }
}

export function formatLinearGapReport(
  scan: ReturnType<typeof linearGaps>,
  seal?: Awaited<ReturnType<typeof sealLinearGaps>>,
): string {
  const lines = ['erpax quantum seal — linear gaps\n', `  gaps found     ${scan.gaps.length}`]
  for (const kind of ['harmony-jump', 'trinity-incomplete', 'readme-seal-break', 'orphan-reexport'] as const) {
    lines.push(`    ${kind.padEnd(20)} ${scan.byKind[kind]}`)
  }
  if (seal) {
    lines.push(
      `  sealed         ${seal.sealed} (before ${seal.before} → after ${seal.after})`,
      `  remainder      ${seal.remainder}`,
    )
    if (seal.paths.length) lines.push(`  sample paths   ${seal.paths.slice(0, 8).join(' · ')}`)
  } else {
    for (const g of scan.gaps.slice(0, 5)) lines.push(`    ${g.kind} · ${g.atomPath} · 0x${g.entanglement}`)
  }
  lines.push('\nAxis: linear-gap · fix: pnpm erpax quantum seal')
  return lines.join('\n')
}

export async function runQuantumSeal(apply = true): Promise<number> {
  const scan = linearGaps()
  if (!apply) {
    console.log(formatLinearGapReport(scan))
    return scan.gaps.length > 0 ? 1 : 0
  }
  const seal = await sealLinearGaps()
  console.log(formatLinearGapReport(scan, seal))
  return seal.remainder > 0 ? 1 : 0
}
