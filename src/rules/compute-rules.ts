/**
 * compute-rules — live-tree gate scans derived from sealed ratchet + folder law.
 *
 * All baselines read via `computedBaseline(axis)` from law/folder/ratchet.generated —
 * no hand ALCAPS. Bindings wire points live in ./bindings.ts.
 *
 * @see ./index.ts — ../law/folder/baseline
 */
import { join } from 'node:path'
import { folderViolations, alphanumericNameViolations } from '@/law/folder/scan'
import {
  wordFolderViolations,
  wordDiamondViolations,
  type WordFolderAudit,
  type WordDiamondAudit,
} from '@/law/folder/word'
import { computedBaseline } from '@/law/folder/baseline'
import type { FolderViolations, AlphanumericNameViolation } from '@/law/folder/scan'
import type { DiamondMembershipViolation } from '@/diamond/membership'
import { nonIndexImports } from '@/tamper/import'
import { concentrationViolations } from './concentration'
import { wordMatterViolations } from './word-matter'
import { wordWithoutLogicViolations, type WordWithoutLogicAudit } from './word-without-logic'
import {
  listAtomPaths,
  diamondMembershipScan,
  isMultiSegmentFilename,
  strayTsViolations,
  multiSegmentFileViolations,
  forbiddenIntermediateViolations,
  accountingStructureViolations,
  tightenedFolderLaw,
  type TightenedViolation,
} from './tightened-scans'

export type { TightenedViolation }
export {
  listAtomPaths,
  diamondMembershipScan,
  isMultiSegmentFilename,
  strayTsViolations,
  multiSegmentFileViolations,
  forbiddenIntermediateViolations,
  accountingStructureViolations,
  tightenedFolderLaw,
}

const SRC = 'src'

export interface RuleAxis {
  readonly axis: string
  readonly violations: number
  readonly baseline: number
  readonly source: string
  readonly samples?: readonly string[]
}

export interface RulesSnapshot {
  readonly folder: FolderViolations
  readonly alphanumeric: readonly AlphanumericNameViolation[]
  readonly tightened: readonly TightenedViolation[]
  readonly strayTs: readonly TightenedViolation[]
  readonly multiSegment: readonly TightenedViolation[]
  readonly accountingStructure: readonly TightenedViolation[]
  readonly forbiddenIntermediate: readonly TightenedViolation[]
  readonly diamondMembership: readonly DiamondMembershipViolation[]
  readonly deepImports: number
  readonly concentration: readonly import('./concentration').ConcentrationViolation[]
  readonly wordMatter: readonly import('./word-matter').WordMatterViolation[]
  readonly wordWithoutLogic: WordWithoutLogicAudit
  readonly wordFolder: WordFolderAudit
  readonly wordDiamond: WordDiamondAudit
  readonly axes: readonly RuleAxis[]
}

/** Live registry of every gate axis — all baselines from computed ratchet emit. */
export function computeRulesOf(cwd: string = process.cwd()): RulesSnapshot {
  const folder = folderViolations(join(cwd, SRC))
  const alphanumeric = alphanumericNameViolations(cwd)
  const strayTs = strayTsViolations(cwd)
  const multiSegment = multiSegmentFileViolations(cwd)
  const accountingStructure = accountingStructureViolations(cwd)
  const forbiddenIntermediate = forbiddenIntermediateViolations(cwd)
  const tightened = tightenedFolderLaw(cwd)
  const diamondMembership = diamondMembershipScan(cwd)
  const concentration = concentrationViolations(cwd)
  const wordMatter = wordMatterViolations(cwd)
  const wordWithoutLogic = wordWithoutLogicViolations(cwd)
  const wordFolder = wordFolderViolations(cwd)
  const wordDiamond = wordDiamondViolations(cwd)
  let deepImports = 0
  try {
    deepImports = nonIndexImports().length
  } catch {
    deepImports = Number.NaN
  }

  const acctSamples = accountingStructure.slice(0, 6).map((v) => `${v.file}→${v.compliant ?? '?'}`)

  const axes: RuleAxis[] = [
    {
      axis: 'folder-name',
      violations: folder.name.length,
      baseline: computedBaseline('folder-name', cwd),
      source: '@/law/folder/ratchet.generated',
    },
    {
      axis: 'folder-trinity',
      violations: folder.trinity.length,
      baseline: computedBaseline('folder-trinity', cwd),
      source: '@/law/folder/ratchet.generated',
    },
    {
      axis: 'alphanumeric-name',
      violations: alphanumeric.length,
      baseline: computedBaseline('alphanumeric-name', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: alphanumeric.slice(0, 5).map((v) => `${v.kind}:${v.path}`),
    },
    {
      axis: 'stray-ts',
      violations: strayTs.length,
      baseline: computedBaseline('stray-ts', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: strayTs.slice(0, 5).map((v) => `${v.atomPath}/${v.file}`),
    },
    {
      axis: 'multi-segment-file',
      violations: multiSegment.length,
      baseline: computedBaseline('multi-segment-file', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: multiSegment.slice(0, 5).map((v) => `${v.atomPath}/${v.file}`),
    },
    {
      axis: 'accounting-structure',
      violations: accountingStructure.length,
      baseline: computedBaseline('accounting-structure', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: acctSamples,
    },
    {
      axis: 'forbidden-intermediate',
      violations: forbiddenIntermediate.length,
      baseline: computedBaseline('forbidden-intermediate', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: forbiddenIntermediate.slice(0, 5).map((v) => `${v.atomPath}/${v.file}`),
    },
    {
      axis: 'diamond-membership',
      violations: diamondMembership.length,
      baseline: computedBaseline('diamond-membership', cwd),
      source: '@/law/folder/ratchet.generated',
    },
    {
      axis: 'import-purity',
      violations: deepImports,
      baseline: computedBaseline('import-purity', cwd),
      source: '@/law/folder/ratchet.generated',
    },
    {
      axis: 'logic-concentration',
      violations: concentration.length,
      baseline: computedBaseline('logic-concentration', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: concentration.slice(0, 5).map((v) => `${v.file} (${v.metrics.concentrationScore.toFixed(2)})`),
    },
    {
      axis: 'word-matter',
      violations: wordMatter.length,
      baseline: computedBaseline('word-matter', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: wordMatter.slice(0, 5).map((v) => `${v.kind}:${v.file}${v.identifier ? `:${v.identifier}` : ''}`),
    },
    {
      axis: 'word-without-code',
      violations: wordFolder.violationCount,
      baseline: computedBaseline('word-without-code', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: wordFolder.violations.slice(0, 5).map((v) => `${v.word} (${v.kind})`),
    },
    {
      axis: 'word-without-logic',
      violations: wordWithoutLogic.violationCount,
      baseline: computedBaseline('word-without-logic', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: wordWithoutLogic.top50
        .slice(0, 5)
        .map((v) => `${v.atomPath} (${v.kind} · ${v.readmeWords}w)`),
    },
    {
      axis: 'word-incomplete-diamond',
      violations: wordDiamond.uselessWords,
      baseline: computedBaseline('word-incomplete-diamond', cwd),
      source: '@/law/folder/ratchet.generated',
      samples: wordDiamond.top50.slice(0, 5).map((v) => `${v.word} (${v.kind})`),
    },
    {
      axis: 'matrix-crack',
      violations: 0,
      baseline: computedBaseline('matrix-crack', cwd),
      source: '@/matrix/constants-audit',
    },
  ]

  return {
    folder,
    alphanumeric,
    tightened,
    strayTs,
    multiSegment,
    accountingStructure,
    forbiddenIntermediate,
    diamondMembership,
    deepImports,
    concentration,
    wordMatter,
    wordWithoutLogic,
    wordFolder,
    wordDiamond,
    axes,
  }
}
