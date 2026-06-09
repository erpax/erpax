/**
 * live-counts — live violation counts per ratchet axis (corpus scan).
 */
import { join } from 'node:path'
import { folderViolations, alphanumericNameViolations } from './scan'
import {
  strayTsViolations,
  multiSegmentFileViolations,
  accountingStructureViolations,
  forbiddenIntermediateViolations,
  diamondMembershipScan,
} from '@/rules/tightened-scans'
import { concentrationViolations } from '@/rules/concentration'
import { wordMatterViolations } from '@/rules/word-matter'
import { wordWithoutLogicViolations } from '@/rules/word-without-logic'
import { nonIndexImports } from '@/tamper/import'
import { matrixCrackViolations } from '@/matrix'
import { wordFolderViolations, wordDiamondViolations } from './word'
import { userWordUnprovenViolations } from './user-word'
import { indexCrossViolationCount } from './index-cross'
import { linearLogicCount, linearGapCount } from '@/quantum'
import { handMaintainedViolations } from '@/readme/hand-maintained'
import type { RatchetAxis } from './baseline-types'
import { RATCHET_AXES } from './ratchet-math'

export const PARALLEL_SCAN_AXES = RATCHET_AXES.filter(
  (axis): axis is RatchetAxis =>
    axis !== 'word-matter' &&
    axis !== 'matrix-crack' &&
    axis !== 'logic-concentration' &&
    axis !== 'word-without-code' &&
    axis !== 'word-without-logic' &&
    axis !== 'phrase-without-diamond' &&
    axis !== 'hand-maintained' &&
    axis !== 'index-cross' &&
    axis !== 'linear-logic' &&
    axis !== 'linear-gap',
)

export function liveViolationCounts(cwd: string = process.cwd()): Readonly<Record<RatchetAxis, number>> {
  const folder = folderViolations(join(cwd, 'src'))
  const wordFolder = wordFolderViolations(cwd)
  const wordDiamond = wordDiamondViolations(cwd)
  let deepImports = 0
  try {
    deepImports = nonIndexImports().length
  } catch {
    deepImports = Number.NaN
  }

  const counts: Record<RatchetAxis, number> = {
    'folder-name': folder.name.length,
    'folder-trinity': folder.trinity.length,
    'alphanumeric-name': alphanumericNameViolations(cwd).length,
    'stray-ts': strayTsViolations(cwd).length,
    'multi-segment-file': multiSegmentFileViolations(cwd).length,
    'accounting-structure': accountingStructureViolations(cwd).length,
    'forbidden-intermediate': forbiddenIntermediateViolations(cwd).length,
    'diamond-membership': diamondMembershipScan(cwd).length,
    'import-purity': deepImports,
    'logic-concentration': concentrationViolations(cwd).length,
    'word-matter': wordMatterViolations(cwd).length,
    'word-without-code': wordFolder.violationCount,
    'word-without-logic': wordWithoutLogicViolations(cwd).violationCount,
    'word-incomplete-diamond': wordDiamond.uselessWords,
    'phrase-without-diamond': userWordUnprovenViolations(cwd).violationCount,
    'index-cross': indexCrossViolationCount(undefined, cwd),
    'linear-logic': linearLogicCount(cwd),
    'linear-gap': linearGapCount(cwd),
    'hand-maintained': handMaintainedViolations({ cwd }).violationCount,
    'matrix-crack': matrixCrackViolations(cwd).length,
  }

  for (const axis of RATCHET_AXES) {
    if (!Number.isFinite(counts[axis])) {
      throw new Error(`live-counts: scan failed for axis "${axis}"`)
    }
  }
  return counts
}
