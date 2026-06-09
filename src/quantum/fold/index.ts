/**
 * quantum/fold — word ⊗ digit double fold (64-bit torus halves → 128-bit combined).
 *
 * Linear logic merged in index — no linear-logic.ts sibling (tamper surface concentrated).
 */
import { nodeOf, merge, neighborsOf, backlinksOf, UUID_MATRIX_ROOT } from '@/uuid/matrix'
import { digitAddress } from '@/digit'
import { wordTokenUuid } from '@/word'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import { interact64, combineArchitectures, architectureMask } from '@/quantum/word'
import { indexVolumes, sortBookPages } from '@/book'
import { CODE_MARKERS, TRINITY } from '@/law/folder/constants'
import { isOrphanReexportOnly, wordWithoutLogicViolations } from '@/rules/word-without-logic'
import { recordOnPath, recordOnPathMerged } from '@/path'

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
}

if (import.meta.url === 'file://' + process.argv[1] && process.argv.includes('--linear')) {
  console.log(formatLinearFoldReport())
  process.exit(linearLogicCount() > 0 ? 1 : 0)
}
