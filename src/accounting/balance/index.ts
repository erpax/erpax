/**
 * accounting/balance — all meetings resolve to one balance equation.
 *
 *   debit + credit = 0   (typography partition)
 *   gap + seal = net     (corpus entropy)
 *   word ⊗ digit = 128   (quantum double fold)
 *
 * @audit every value derived — never hand-set
 * @see ../../readme/compute — ../../quantum/word — ./SKILL.md
 */
import { atomPathUuid, toAtomPath } from '@/path'
import { digitAddress } from '@/digit'
import { nodeOf } from '@/uuid/matrix'
import type { FolderReadmeModel } from '@/readme/compute'
import {
  architectureMask,
  combineArchitectures,
  interact64,
  wordAddress,
} from '@/quantum/word'

const foldHex = (n: bigint, bits = 64): string => {
  const w = (bits / 4) | 0
  return n.toString(16).padStart(w, '0')
}

const uuidFold64 = (uuid: string): bigint => {
  const hex = uuid.replace(/-/g, '')
  return BigInt('0x' + hex) & architectureMask()
}

/** First fold — word/path address half. */
export const wordFold = (atomPath: string): bigint =>
  uuidFold64(atomPathUuid(toAtomPath(atomPath)))

/** Second fold — digit/horo address half. */
export const digitFold = (atomPath: string): bigint => {
  const path = toAtomPath(atomPath)
  const leaf = path.split('/').pop() ?? path
  const da = digitAddress(path) ?? digitAddress(leaf)
  if (da) return uuidFold64(wordAddress(da))
  const n = nodeOf(path) ?? nodeOf(leaf)
  if (n) return uuidFold64(n.uuid)
  return 0n
}

/** Pack word ⊗ digit into the 128-bit double-torus word. */
export const doubleFold = (atomPath: string): bigint =>
  combineArchitectures(wordFold(atomPath), digitFold(atomPath))

/** Pivot subsection — typography statement meets corpus entropy. */
export function renderBalanceMeetingPivotSection(model: FolderReadmeModel): string {
  const stmt = model.statement
  const ent = model.entropy
  return [
    '### balance meeting',
    '',
    `- typography debit \`${stmt.totalDebits}\` · credit \`${stmt.totalCredits}\` · variance \`${stmt.variance}\` · balanced \`${stmt.balanced ? 1 : 0}\``,
    `- entropy gap eb \`${ent.totalGapEb.toFixed(3)}\` · seal eb \`${ent.totalSealEb.toFixed(3)}\` · net \`${ent.netEntropyEb.toFixed(3)}\``,
    `- analytics variance \`${model.analytics.variance}\` · balanced \`${model.analytics.balanced}\``,
    '',
  ].join('\n')
}

/** Pivot subsection — quantum double fold (word ⊗ digit) until seal. */
export function renderQuantumFoldSection(model: FolderReadmeModel): string {
  const path = model.atomPath
  const wh = wordFold(path)
  const dh = digitFold(path)
  const ix = interact64(wh, dh)
  const combined = combineArchitectures(wh, dh)
  return [
    '### quantum fold',
    '',
    `- word half \`0x${foldHex(wh)}\` · digit half \`0x${foldHex(dh)}\``,
    `- interact64 \`0x${foldHex(ix)}\` · combined128 \`0x${foldHex(combined, 128)}\``,
    `- superposition \`${model.sealed ? 0 : 1}\``,
    '',
  ].join('\n')
}
