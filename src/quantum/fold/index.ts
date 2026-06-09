/**
 * quantum/fold — word ⊗ digit double fold (64-bit torus halves → 128-bit combined).
 */
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

export {
  findLinearLogic,
  linearLogicCount,
  applyLinearFolds,
  formatLinearFoldReport,
  runQuantumFoldLinear,
} from './linear-logic'

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
