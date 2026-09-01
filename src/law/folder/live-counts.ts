/**
 * live-counts — live violation counts per ratchet axis (corpus scan).
 */
import { join } from 'node:path'
import { folderViolations, alphanumericNameViolations, strayTsViolations, nonTsLanguageViolations } from './scan'
import {
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
import { userWordUnprovenViolations } from '@/law/folder'
import { indexCrossViolationCount } from './index-cross'
import { linearGapCount, linearLogicCount } from '@/quantum'
import { handMaintainedViolations } from '@/readme'
import { corpusScanFold, sealedScan, sealScan } from '@/gate/receipt'
import type { RatchetAxis } from './baseline-types'
import { RATCHET_AXES } from './ratchet/math'

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

const SCAN_RECEIPT_KEY = 'live-violation-counts'
let liveCountsCache: { cwd: string; fold: string; counts: Readonly<Record<RatchetAxis, number>> } | null = null

/**
 * Live counts, addressed by the CONTENT they are computed from — never by a clock.
 *
 * assertRulesHold runs computeRulesOf then bypassMathViolations; without reuse the second
 * call re-ran every scan (measured 47.5s of pure duplication inside one gate run). That was
 * first fixed with a 60-second TTL, which is wrong in BOTH directions: it served a stale
 * verdict for a minute after an edit, and threw a valid one away at 61 seconds.
 *
 * The fold is the fix. Folding everything a scan can read costs 954ms against the scan's
 * 45,950ms (measured, this tree), and SAME CONTENT means SAME COUNTS — so an unchanged
 * corpus cites its receipt across processes, and the first byte that moves invalidates it
 * exactly. Minting the address is free; only forging one is expensive.
 */
export function liveViolationCounts(cwd: string = process.cwd()): Readonly<Record<RatchetAxis, number>> {
  const fold = corpusScanFold(cwd)
  if (liveCountsCache && liveCountsCache.cwd === cwd && liveCountsCache.fold === fold) {
    return liveCountsCache.counts
  }
  const sealed = sealedScan<Record<RatchetAxis, number>>(SCAN_RECEIPT_KEY, fold, cwd)
  if (sealed && RATCHET_AXES.every((axis) => Number.isFinite(sealed[axis]))) {
    liveCountsCache = { cwd, fold, counts: sealed }
    return sealed
  }
  const counts = computeLiveViolationCounts(cwd)
  sealScan(SCAN_RECEIPT_KEY, fold, counts, cwd)
  liveCountsCache = { cwd, fold, counts }
  return counts
}

function computeLiveViolationCounts(cwd: string): Readonly<Record<RatchetAxis, number>> {
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
    'ts-only': nonTsLanguageViolations(cwd).length,
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

/** Memory law — single-path runners, bounded batches (no full-corpus OOM). */
export function memoryFootprintHints(): readonly string[] {
  return [
    'readme paths — one atom path per process (never 3166-folder waves in CI)',
    'MAX_HAND_MAINTAINED_PATHS = 30 — hand-maintained scan cap',
    'MAX_SEAL_BATCH = 30 — linear-gap seal cap',
    'deriveFolderModel — lazy per path; no all-models array in one runner',
    'index cross — priority hubs only; rest computed from index.ts barrel',
  ]
}
