/**
 * rules — bindings face + computed gate registry.
 *
 * Wire points: ACCOUNTING_NEST_MAP · FORBIDDEN_INTERMEDIATE_SEGMENTS · ROOT_TS_ALLOWED.
 * All scan logic and baselines live in ./compute-rules.ts (ratchet-derived).
 *
 *   tsx src/rules/index.ts --check      # exit 1 when any guardian UNSEALED
 *   pnpm rules:check
 *
 * @see ./compute-rules.ts — ./bindings.ts — ../law/folder/ratchet.generated
 */
import { startProgressHeartbeat } from '@/cli/progress-heartbeat'
import { guardian } from '@/guardian'
import { seal, type SealVerdict } from '@/seal'
import { folderGuardians, computedBaseline } from '@/law/folder'
import { bypassMathViolations } from '@/law/folder/ratchet-compute'
import { matrixCrackViolations } from '@/matrix'
import {
  computeRulesOf,
  type RulesSnapshot,
  type TightenedViolation,
  type RuleAxis,
} from './compute-rules'

export {
  ACCOUNTING_NEST_MAP,
  FORBIDDEN_INTERMEDIATE_SEGMENTS,
  ROOT_TS_ALLOWED,
} from './bindings'

export {
  computeRulesOf,
  listAtomPaths,
  diamondMembershipScan,
  isMultiSegmentFilename,
  strayTsViolations,
  multiSegmentFileViolations,
  forbiddenIntermediateViolations,
  accountingStructureViolations,
  tightenedFolderLaw,
  type TightenedViolation,
  type RuleAxis,
  type RulesSnapshot,
} from './compute-rules'

/** Default TTL for cached `rulesOf` snapshot (agent dispatch warm path). */
export const RULES_CACHE_TTL_MS = 5 * 60 * 1000

export interface RulesCacheEntry {
  readonly cwd: string
  readonly expiresAt: number
  readonly snapshot: RulesSnapshot
}

export interface RulesOfOpts {
  readonly force?: boolean
}

let rulesCache: RulesCacheEntry | null = null

export function clearRulesCache(): void {
  rulesCache = null
}

export function getRulesCache(cwd = process.cwd()): RulesCacheEntry | null {
  if (!rulesCache || rulesCache.cwd !== cwd || Date.now() >= rulesCache.expiresAt) {
    return null
  }
  return rulesCache
}

/** Cached live gate registry — full tree scan at most once per TTL window per cwd. */
export function rulesOf(cwd: string = process.cwd(), opts?: RulesOfOpts): RulesSnapshot {
  if (!opts?.force) {
    const hit = getRulesCache(cwd)
    if (hit) return hit.snapshot
  }
  const snapshot = computeRulesOf(cwd)
  const cracks = matrixCrackViolations(cwd)
  const axes = snapshot.axes.map((a) =>
    a.axis === 'matrix-crack' ? { ...a, violations: cracks.length } : a,
  )
  const patched = { ...snapshot, axes }
  rulesCache = {
    cwd,
    expiresAt: Date.now() + RULES_CACHE_TTL_MS,
    snapshot: patched,
  }
  return patched
}

export interface RulesHoldVerdict extends SealVerdict {
  readonly snapshot: RulesSnapshot
}

/** Fail-closed cross of folder · tightened · diamond · import · matrix-crack guardians. */
export function assertRulesHold(cwd: string = process.cwd()): RulesHoldVerdict {
  const snapshot = rulesOf(cwd)
  const cracks = matrixCrackViolations(cwd)
  const folderSeal = folderGuardians(snapshot.folder)
  const tightenedSeal = seal([
    guardian({
      axis: 'alphanumeric-name',
      violations: snapshot.alphanumeric.length,
      baseline: computedBaseline('alphanumeric-name', cwd),
    }),
    guardian({
      axis: 'stray-ts',
      violations: snapshot.strayTs.length,
      baseline: computedBaseline('stray-ts', cwd),
    }),
    guardian({
      axis: 'multi-segment-file',
      violations: snapshot.multiSegment.length,
      baseline: computedBaseline('multi-segment-file', cwd),
    }),
    guardian({
      axis: 'accounting-structure',
      violations: snapshot.accountingStructure.length,
      baseline: computedBaseline('accounting-structure', cwd),
    }),
    guardian({
      axis: 'forbidden-intermediate',
      violations: snapshot.forbiddenIntermediate.length,
      baseline: computedBaseline('forbidden-intermediate', cwd),
    }),
  ])
  const diamondSeal = seal([
    guardian({
      axis: 'diamond-files',
      violations: snapshot.diamondMembership.length,
      baseline: computedBaseline('diamond-membership', cwd),
    }),
  ])
  let importSeal: SealVerdict
  try {
    importSeal = seal([
      guardian({
        axis: 'import-purity',
        violations: snapshot.deepImports,
        baseline: computedBaseline('import-purity', cwd),
      }),
    ])
  } catch {
    importSeal = seal([
      guardian({
        axis: 'import-purity',
        violations: Number.NaN,
        baseline: computedBaseline('import-purity', cwd),
      }),
    ])
  }
  const crackSeal = seal([
    guardian({
      axis: 'matrix-crack',
      violations: cracks.length,
      baseline: computedBaseline('matrix-crack', cwd),
    }),
  ])
  const bypass = bypassMathViolations(cwd)
  const bypassSeal = seal([
    guardian({
      axis: 'bypass-math',
      violations: bypass.length,
      baseline: 0,
    }),
  ])
  const combined = seal([
    ...folderSeal.guardians,
    ...tightenedSeal.guardians,
    ...diamondSeal.guardians,
    ...importSeal.guardians,
    ...crackSeal.guardians,
    ...bypassSeal.guardians,
  ])
  return { ...combined, snapshot }
}

export {
  folderViolations,
  folderGuardians,
  ALPHANUMERIC_NAME,
  alphanumericNameViolations,
  alphanumericFileStem,
  isAlphanumericStem,
  computedBaseline,
  wordFolderViolations,
  wordDiamondViolations,
  wordDiamondFixSuggestion,
  matterForWord,
} from '@/law/folder'
export type {
  FolderViolations,
  NameViolation,
  TrinityViolation,
  AlphanumericNameViolation,
  WordFolderAudit,
  WordDiamondAudit,
  MatterPrescription,
} from '@/law/folder'
export {
  diamondMembershipViolations,
  diamondMembershipOk,
  ALLOWED_DIAMOND_FILES,
  TRINITY_FORM,
  TRINITY_CODE,
} from '@/diamond/membership'
export type { DiamondMembershipViolation, DiamondAtomKind } from '@/diamond/membership'
export {
  finishedIdeaCrossed,
  recordedAndImplementedVerdict,
  assertRecordedAndImplemented,
  assertPathFollowed,
  followEveryPath,
  seal,
} from '@/seal'
export type { FinishedIdeaVerdict, RecordedImplementedVerdict, SealVerdict } from '@/seal'
export { toAtomPath, assertEveryPathFollowed, pathWalkCoverage } from '@/path'
export type { PathFollowVerdict } from '@/path'
export {
  concentrationViolations,
  topConcentrations,
  analyzeIndexConcentration,
  concentrationFixSuggestion,
  childAtomDirs,
  isConcentrationViolation,
  CONCENTRATION_LINE_THRESHOLD,
  CONCENTRATION_EXPORT_THRESHOLD,
  CONCENTRATION_SCORE_THRESHOLD,
} from './concentration'
export type { ConcentrationViolation, ConcentrationMetrics, ConcentrationRank } from './concentration'
export {
  wordMatterViolations,
  wordMatterAuditTop,
  wordMatterFixSuggestion,
  camelTokens,
  WORD_MATTER_AUDIT_ATOMS,
  IDENTIFIER_MAX_LEN,
  IDENTIFIER_MAX_TOKENS,
} from './word-matter'
export type { WordMatterViolation, WordMatterKind } from './word-matter'
export {
  wordWithoutLogicViolations,
  useCaseOf,
  wordWithoutLogicFixSuggestion,
  buildImportIndex,
  isOrphanReexportOnly,
  hasVocabularyException,
  PROSE_HEAVY_README_WORDS,
} from './word-without-logic'
export type {
  WordWithoutLogicViolation,
  WordWithoutLogicKind,
  WordWithoutLogicAudit,
  UseCaseVerdict,
} from './word-without-logic'
export { auditConstants, matrixCrackViolations } from '@/matrix'

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes('--check')
  const emitRatchet = process.argv.includes('--emit-ratchet')
  const accountingOnly = process.argv.includes('--accounting-only')
  if (emitRatchet) {
    // Delegate to emit-ratchet entry — avoids top-level await in this barrel.
    const { execSync } = require('node:child_process') as typeof import('node:child_process')
    const extra = process.argv.includes('--bootstrap') ? ' --bootstrap' : ''
    execSync(`pnpm rules:ratchet${extra}`, { stdio: 'inherit', cwd: process.cwd() })
    process.exit(0)
  }
  const stopHeartbeat = check ? startProgressHeartbeat('rules:check') : () => {}
  const snapshot = rulesOf()
  if (accountingOnly) {
    console.log(`accounting-structure: ${snapshot.accountingStructure.length} violation(s)`)
    for (const v of snapshot.accountingStructure) {
      console.log(`   ${v.file} → nest accounting/${v.compliant ?? '?'}`)
    }
    process.exit(
      snapshot.accountingStructure.length > computedBaseline('accounting-structure') ? 1 : 0,
    )
  }
  console.log('rules — tightened erpax gate registry')
  for (const a of snapshot.axes) {
    const mark = a.violations <= a.baseline ? '✓' : '✗'
    console.log(`${mark} ${a.axis.padEnd(22)} ${a.violations} (≤${a.baseline}) · ${a.source}`)
    if (a.samples?.length) console.log(`     e.g. ${a.samples.join(', ')}`)
  }
  console.log(
    `tightened total: ${snapshot.tightened.length} (stray-ts ${snapshot.strayTs.length} · multi-segment ${snapshot.multiSegment.length} · forbidden-intermediate ${snapshot.forbiddenIntermediate.length} · accounting ${snapshot.accountingStructure.length})`,
  )
  if (check) {
    stopHeartbeat()
    const verdict = assertRulesHold()
    for (const g of verdict.guardians) console.log((g.ok ? '✓ ' : '✗ ') + g.reason)
    console.log(verdict.sealed ? '✓ rules sealed' : '✗ rules UNSEALED')
    process.exit(verdict.sealed ? 0 : 1)
  }
}
