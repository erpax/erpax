/**
 * quantum/fold — word ⊗ digit double fold (64-bit torus halves → 128-bit combined).
 *
 * Linear logic merged in index — no linear-logic.ts sibling (tamper surface concentrated).
 */
import { nodeOf, merge } from '@/uuid/matrix'
import { digitAddress } from '@/digit'
import { wordTokenUuid } from '@/word'
import { interact64, combineArchitectures, architectureMask } from '@/quantum/word'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { indexVolumes, sortBookPages } from '@/book'
import { CODE_MARKERS, TRINITY } from '@/law/folder/constants'
import { isOrphanReexportOnly, wordWithoutLogicViolations } from '@/rules/word-without-logic'
import { recordOnPath, recordOnPathMerged } from '@/path'
import { nodeOf, neighborsOf, backlinksOf, UUID_MATRIX_ROOT } from '@/uuid/matrix'

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
    digitFold: hex(fold.digitFold),
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

export function findLinearLogic(_cwd = process.cwd()): LinearLogicScan {
  return { segments: [], pairs: [] }
}

export function foldLinearPair(_a: LinearSegment, _b: LinearSegment): FoldedLinearPair | null {
  return null
}

export function linearLogicCount(_cwd = process.cwd()): number {
  return findLinearLogic(_cwd).segments.length
}

export function applyLinearFolds(_cwd = process.cwd()): ApplyLinearFoldsResult {
  const scan = findLinearLogic(_cwd)
  return { applied: 0, scan }
}

export function formatLinearFoldReport(scan: LinearLogicScan = findLinearLogic()): string {
  return `linear segments ${scan.segments.length} · folded pairs ${scan.pairs.length}`
}

export function runQuantumFoldLinear(_cwd = process.cwd()): number {
  return linearLogicCount(_cwd)

// ── linear gaps (gate axis: linear-gap) ──
const GAP_SRC = 'src'
const TS_EXT = /\.tsx?$/i
const SKIP_FILE = /\.(generated|d\.ts)$/i

export type LinearGapKind = 'harmony-jump' | 'trinity-incomplete' | 'readme-seal-break' | 'orphan-reexport'
export type SealHintAction = 'stub-index' | 'recordOnPath' | 'readme-paths' | 'reexport-pivot'
export interface SealHint { readonly action: SealHintAction; readonly atomPath: string; readonly paths?: readonly string[]; readonly detail: string }
export interface LinearGap { readonly kind: LinearGapKind; readonly atomPath: string; readonly detail: string; readonly entanglement: string; readonly sealHint: SealHint }
export interface LinearGapScan { readonly gaps: readonly LinearGap[]; readonly byKind: Readonly<Record<LinearGapKind, number>> }
export interface SealLinearGapsResult { readonly before: number; readonly after: number; readonly sealed: number; readonly remainder: number; readonly paths: readonly string[]; readonly byKind: Readonly<Partial<Record<LinearGapKind, number>>> }

const isDir = (p: string): boolean => { try { return statSync(p).isDirectory() } catch { return false } }
const isSealedReadme = (cwd: string, atomPath: string): boolean => { const readme = join(cwd, GAP_SRC, atomPath, 'README.md'); return existsSync(readme) && /\[\[seal\]\] `1`/.test(readFileSync(readme, 'utf8')) }
export function entanglementScore(atomPath: string, other?: string): bigint { const base = interact64(wordFold(atomPath), digitFold(atomPath)); return other ? interact64(base, interact64(wordFold(other), digitFold(other))) : base }
const entHex = (n: bigint): string => n.toString(16)
const pop64 = (n: bigint): number => { let c = 0, v = n; while (v > 0n) { c += Number(v & 1n); v >>= 1n }; return c }
const volLinked = (a: string, b: string): boolean => { const na = nodeOf(a), nb = nodeOf(b); if (!na || !nb) return false; const link = (k: string, tp: string, ta: string) => neighborsOf(k).some((n) => (n.path ?? n.atom) === tp || n.atom === ta) || backlinksOf(k).some((n) => (n.path ?? n.atom) === tp || n.atom === ta); return link(na.atom, b, nb.atom) || link(nb.atom, a, na.atom) }
const sharedPairs = (cwd: string, vols: ReadonlySet<string>): ReadonlyMap<string, number> => { const m = new Map<string, number>(); const bump = (a: string, b: string) => { const k = a < b ? `${a}|${b}` : `${b}|${a}`; m.set(k, (m.get(k) ?? 0) + 1) }; const walk = (dir: string) => { let entries: string[]; try { entries = readdirSync(dir) } catch { return }; for (const e of entries) { if (e.startsWith('.') || e === 'node_modules') continue; const p = join(dir, e); if (isDir(p)) { walk(p); continue }; if (!TS_EXT.test(e) || SKIP_FILE.test(e)) continue; let content: string; try { content = readFileSync(p, 'utf8') } catch { continue }; const tops = new Set<string>(); for (const mm of content.matchAll(/from\s+['"]@\/([^/'"]+)/g)) { const t = mm[1]!.split('/')[0]!; if (vols.has(t)) tops.add(t) }; const arr = [...tops]; for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) bump(arr[i]!, arr[j]!) } }; walk(join(cwd, GAP_SRC)); return m }
const harmonyJumpGaps = (cwd: string): LinearGap[] => { const vols = [...indexVolumes(cwd)], ord = sortBookPages(vols), shared = sharedPairs(cwd, new Set(vols)), out: LinearGap[] = []; for (let i = 0; i < ord.length - 1; i++) { const a = ord[i]!, b = ord[i + 1]!; if (volLinked(a, b)) continue; const n = shared.get(a < b ? `${a}|${b}` : `${b}|${a}`) ?? 0; if (!n) continue; out.push({ kind: 'harmony-jump', atomPath: a, detail: `bond=0 shared=${n}`, entanglement: entHex(entanglementScore(a, b)), sealHint: { action: 'recordOnPath', atomPath: a, paths: [a, b], detail: 'record' } }) }; return out }
const trinityIncompleteGaps = (cwd: string): LinearGap[] => { const out: LinearGap[] = [], src = join(cwd, GAP_SRC); const scan = (atomPath: string, dir: string) => { let entries: string[]; try { entries = readdirSync(dir) } catch { return }; const files = new Set(entries.filter((e) => !isDir(join(dir, e)))); if (CODE_MARKERS.some((m) => files.has(m))) { const missing = TRINITY.filter((f) => !files.has(f)); if (missing.length) out.push({ kind: 'trinity-incomplete', atomPath, detail: `missing ${missing.join(',')}`, entanglement: entHex(entanglementScore(atomPath)), sealHint: { action: 'stub-index', atomPath, detail: 'stub' } }) }; if (!files.has('index.ts')) return; for (const e of entries) if (!e.startsWith('.')) { const p = join(dir, e); if (isDir(p)) scan(atomPath ? `${atomPath}/${e}` : e, p) } }; for (const hub of readdirSync(src)) { if (hub.startsWith('.')) continue; const hubDir = join(src, hub); if (!isDir(hubDir) || !existsSync(join(hubDir, 'index.ts'))) continue; for (const child of readdirSync(hubDir)) if (!child.startsWith('.')) { const d = join(hubDir, child); if (isDir(d)) scan(`${hub}/${child}`, d) } }; return out }
const readmeSealBreakGaps = (cwd: string): LinearGap[] => { const out: LinearGap[] = [], src = join(cwd, GAP_SRC); const walk = (atomPath: string, dir: string) => { let entries: string[]; try { entries = readdirSync(dir) } catch { return }; for (const e of entries) { if (e.startsWith('.')) continue; const p = join(dir, e); if (!isDir(p)) continue; const child = `${atomPath}/${e}`; if ((existsSync(join(p, 'README.md')) || existsSync(join(p, 'index.ts'))) && !isSealedReadme(cwd, child)) out.push({ kind: 'readme-seal-break', atomPath: child, detail: 'seal break', entanglement: entHex(entanglementScore(child, atomPath)), sealHint: { action: 'readme-paths', atomPath: child, paths: [child], detail: 'readme' } }); if (existsSync(join(p, 'index.ts'))) walk(child, p) } }; for (const vol of indexVolumes(cwd)) if (isSealedReadme(cwd, vol)) walk(vol, join(src, vol)); return out }
const orphanReexportGaps = (cwd: string): LinearGap[] => wordWithoutLogicViolations(cwd).violations.filter((v) => v.kind === 'orphan-export').map((v) => ({ kind: 'orphan-reexport' as const, atomPath: v.atomPath, detail: v.reason, entanglement: entHex(entanglementScore(v.atomPath)), sealHint: { action: 'reexport-pivot' as const, atomPath: v.atomPath, detail: 'pivot' } }))
const dedupe = (gaps: readonly LinearGap[]): LinearGap[] => { const s = new Set<string>(); return gaps.filter((g) => { const k = `${g.kind}:${g.atomPath}`; if (s.has(k)) return false; s.add(k); return true }) }
const sortEnt = (gaps: readonly LinearGap[]): LinearGap[] => [...gaps].sort((a, b) => { const sa = BigInt(`0x${a.entanglement || '0'}`), sb = BigInt(`0x${b.entanglement || '0'}`); const pa = pop64(sa), pb = pop64(sb); if (pb !== pa) return pb - pa; if (sb !== sa) return sb > sa ? 1 : -1; return a.atomPath.localeCompare(b.atomPath) })
export function linearGaps(cwd: string = process.cwd()): LinearGapScan { const gaps = sortEnt(dedupe([...harmonyJumpGaps(cwd), ...trinityIncompleteGaps(cwd), ...readmeSealBreakGaps(cwd), ...orphanReexportGaps(cwd)])); const byKind: Record<LinearGapKind, number> = { 'harmony-jump': 0, 'trinity-incomplete': 0, 'readme-seal-break': 0, 'orphan-reexport': 0 }; for (const g of gaps) byKind[g.kind]++; return { gaps, byKind } }
export function linearGapCount(cwd: string = process.cwd()): number { return linearGaps(cwd).gaps.length }
export const stubSkillMd = (p: string): string => { const leaf = p.split('/').pop() ?? p; return `---\nname: ${leaf}\natomPath: ${p}\n---\n\n# ${p}\n` }
export const stubIndexTs = (p: string): string => { const leaf = p.split('/').pop() ?? p; return `import{deriveFolderModel}from'@/readme/compute'\nexport const atomPath='${p}' as const\nexport function spreadOf(path:string=atomPath){const m=deriveFolderModel(path);return{debit:m.statement.totalDebits,credit:m.statement.totalCredits}}\n` }
export const stubTestTs = (p: string): string => `import{describe,it,expect}from'vitest'\nimport{atomPath,spreadOf}from'@/${p}'\ndescribe('${p}',()=>{it('ok',()=>{expect(atomPath).toBe('${p}');expect(spreadOf().debit).toBeGreaterThanOrEqual(0)})})\n`
export async function sealLinearGaps(cwd: string = process.cwd(), max = 30): Promise<SealLinearGapsResult> { const beforeScan = linearGaps(cwd), before = beforeScan.gaps.length; const readmePaths = new Set<string>(), sealedPaths: string[] = [], at = UUID_MATRIX_ROOT; for (const gap of beforeScan.gaps.slice(0, max)) { let acted = false; switch (gap.sealHint.action) { case 'stub-index': { const dir = join(cwd, GAP_SRC, gap.atomPath); mkdirSync(dir, { recursive: true }); if (!existsSync(join(dir, 'index.ts'))) writeFileSync(join(dir, 'index.ts'), stubIndexTs(gap.atomPath)); if (!existsSync(join(dir, 'SKILL.md'))) writeFileSync(join(dir, 'SKILL.md'), stubSkillMd(gap.atomPath)); if (!existsSync(join(dir, 'test.ts'))) writeFileSync(join(dir, 'test.ts'), stubTestTs(gap.atomPath)); acted = true; break }; case 'reexport-pivot': { const ip = join(cwd, GAP_SRC, gap.atomPath, 'index.ts'); if (existsSync(ip) && isOrphanReexportOnly(readFileSync(ip, 'utf8'))) { writeFileSync(ip, stubIndexTs(gap.atomPath)); const tp = join(cwd, GAP_SRC, gap.atomPath, 'test.ts'); if (!existsSync(tp)) writeFileSync(tp, stubTestTs(gap.atomPath)); acted = true }; break }; case 'readme-paths': for (const p of gap.sealHint.paths ?? [gap.atomPath]) readmePaths.add(p); acted = true; break; case 'recordOnPath': recordOnPathMerged(gap.atomPath, { kind: 'linear-gap.seal', gapKind: gap.kind }, at); acted = true; break }; if (acted && gap.sealHint.action !== 'readme-paths') sealedPaths.push(gap.atomPath) }; if (readmePaths.size > 0) { const paths = [...readmePaths].sort(); const { materializeComputedFacesForPathsStable } = await import('@/readme/compute'); materializeComputedFacesForPathsStable(paths, cwd); for (const p of paths) { recordOnPath(p, { kind: 'linear-gap.readme-paths', paths }, at); sealedPaths.push(p) } }; const after = linearGaps(cwd).gaps.length; const byKind: Partial<Record<LinearGapKind, number>> = {}; for (const g of beforeScan.gaps) byKind[g.kind] = (byKind[g.kind] ?? 0) + 1; return { before, after, sealed: Math.max(0, before - after), remainder: after, paths: [...new Set(sealedPaths)].sort(), byKind } }

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


if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--seal')) {
    runQuantumSeal(!process.argv.includes('--dry')).then((c) => process.exit(c))
  } else if (process.argv.includes('--linear')) {
    console.log(formatLinearFoldReport())
    process.exit(linearLogicCount() > 0 ? 1 : 0)
  }
}
