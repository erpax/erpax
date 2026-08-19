/**
 * rules — bindings face + computed gate registry.
 *
 * Wire points: ACCOUNTING_NEST_MAP · FORBIDDEN_INTERMEDIATE_SEGMENTS · ROOT_TS_ALLOWED.
 * All scan logic and baselines live in ./compute.ts (ratchet-derived).
 *
 *   tsx src/rules/index.ts --check      # exit 1 when any guardian UNSEALED
 *   pnpm rules:check
 *
 * @see ./compute.ts — ./bindings.ts — ../law/folder/ratchet.generated
 * @see ./SKILL.md#agent-laws — the working discipline this registry must fail-close on
 *   (shapeRatchetVerdict gates in the `corpus` lane of cli/gate.ts via `erpax doctor corpus`).
 */
import { startProgressHeartbeat } from '@/cli/progress-heartbeat'
import { execSync } from 'node:child_process'
import { waveAccountingGapViolations } from '@/accounting/gaps'
import { guardian } from '@/guardian'
import { seal, type SealVerdict } from '@/seal'
import { folderGuardians, computedBaseline } from '@/law/folder'
import { bypassMathViolations } from '@/law/folder/ratchet-compute'
import {
  exactMax,
  hostMathViolations,
} from '@/algebra'
import { matrixCrackViolations } from '@/matrix'
import { linearGapCount, linearLogicCount } from '@/quantum'
import { engineeringConformance } from '@/engineering'
import { frameworkCollisions } from './compatibility'
import { computeRulesOf, type RulesSnapshot } from './compute'

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
  nonTsLanguageViolations,
  multiSegmentFileViolations,
  forbiddenIntermediateViolations,
  accountingStructureViolations,
  tightenedFolderLaw,
  type TightenedViolation,
  type RuleAxis,
  type RulesSnapshot,
} from './compute'

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
  // matrix-crack is already computed inside rulesOf (the snapshot's patched axis) — reuse, never re-derive
  const crackCount =
    snapshot.axes.find((a) => a.axis === 'matrix-crack')?.violations ?? matrixCrackViolations(cwd).length
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
      axis: 'ts-only',
      violations: snapshot.tsOnly.length,
      baseline: computedBaseline('ts-only', cwd),
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
      violations: crackCount,
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
  // host-math — Math.* in algebra atoms (qubit · algebra · pi · e · phi · rodin · coincidence).
  // Baseline 0 is the THEOREM: all theorems are algebra ([[algebra]]/host).
  const hostMath = hostMathViolations(cwd)
  const hostMathSeal = seal([
    guardian({
      axis: 'host-math',
      violations: hostMath.length,
      baseline: 0,
    }),
  ])
  const waveGaps = waveAccountingGapViolations(cwd)
  const waveGapSeal = seal([
    guardian({ axis: 'accounting-wave', violations: waveGaps.count, baseline: 0 }),
  ])
  // engineering — ISO/IEC 25010 quality concerns cited with NO enforcing gate ([[engineering]]). Every
  // characteristic is now reverse-engineered into a gate, so the baseline is 0 — a THEOREM (the standard
  // is fully enforced), not a ratchet number: any ungated concern added later is a regression that fails.
  const engGaps = engineeringConformance(cwd).reverseEngineer.length
  const engineeringSeal = seal([
    guardian({ axis: 'engineering', violations: engGaps, baseline: 0 }),
  ])
  // compatibility — an atom colliding with a framework router namespace ([[rules]]/compatibility, §5.3).
  // Baseline 0 is the THEOREM (no atom may collide); currently RED at 1 (pages↔Next.js Pages Router), the
  // real #13 co-existence break now ENFORCED as a gate, ratcheting to 0 when pages is renamed to a data slug.
  const compatibilitySeal = seal([
    guardian({ axis: 'compatibility', violations: frameworkCollisions(cwd).length, baseline: 0 }),
  ])
  const provenSeal = seal([
    guardian({
      axis: 'linear-gap',
      violations: linearGapCount(cwd),
      baseline: computedBaseline('linear-gap', cwd),
    }),
    guardian({
      axis: 'linear-logic',
      violations: linearLogicCount(cwd),
      baseline: computedBaseline('linear-logic', cwd),
    }),
  ])
  const combined = seal([
    ...folderSeal.guardians,
    ...tightenedSeal.guardians,
    ...diamondSeal.guardians,
    ...importSeal.guardians,
    ...crackSeal.guardians,
    ...bypassSeal.guardians,
    ...hostMathSeal.guardians,
    ...waveGapSeal.guardians,
    ...engineeringSeal.guardians,
    ...compatibilitySeal.guardians,
    ...provenSeal.guardians,
  ])
  return { ...combined, snapshot }
}

export interface FoldSpeedup {
  readonly files: number
  readonly atoms: number
  /** stray-ts + multi-segment files — matter that should fold into one index.ts per atom */
  readonly excess: number
  readonly foldedFiles: number
  /** every full-corpus derivation is O(files); this is how much faster it runs once the excess folds */
  readonly speedup: number
  /** the fraction of a corpus scan spent on stray-file overhead (the recoverable time) */
  readonly overheadFraction: number
}

/**
 * COMPUTE how solving one-word violations at scale improves quantum speed. The fold's derivations —
 * mesh SCC ([[rules]]/cycle), the rules scan, the matrix fold — are all O(files): they walk every `.ts`.
 * A one-word violation (a stray `.ts` at an atom root, a hyphen/dot multi-segment stem) is matter that
 * has NOT folded into its atom's single index.ts, so it is an EXTRA file every derivation must traverse.
 *
 * Folding the excess collapses the file count toward one index per atom, and the speedup is linear in the
 * files eliminated: speedup = files / (files − excess). Pure — the caller supplies the measured counts
 * (from the ratchet baselines + a file walk), so this is a theorem over numbers, not another scan.
 *
 * Measured 2026-07-24: 5630 files, 4451 excess (stray-ts 4168 + multi-segment 283) ⇒ ~4.78× per
 * full-corpus derivation, 79% of the 27s compactRulesSnapshot scan being stray-file overhead.
 */
export function foldSpeedup(files: number, atoms: number, excess: number): FoldSpeedup {
  const foldedFiles = exactMax(atoms, files - excess) // cannot fold below one index per atom
  return {
    files,
    atoms,
    excess,
    foldedFiles,
    speedup: foldedFiles > 0 ? files / foldedFiles : 1,
    overheadFraction: files > 0 ? excess / files : 0,
  }
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
  caseOf,
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
  const axisIdx = process.argv.indexOf('--axis')
  const axisOnly = axisIdx >= 0 ? process.argv[axisIdx + 1] : undefined
  if (emitRatchet) {
    // Delegate to emit-ratchet entry — avoids top-level await in this barrel.
    const extra = process.argv.includes('--bootstrap') ? ' --bootstrap' : ''
    execSync(`pnpm rules:ratchet${extra}`, { stdio: 'inherit', cwd: process.cwd() })
    process.exit(0)
  }
  if (axisOnly === 'accounting-wave') {
    const { count, netEb, verdict } = waveAccountingGapViolations()
    const ok = count === 0 && netEb === 0
    console.log(`${ok ? '✓' : '✗'} accounting-wave: ${count} gap path(s) · net ${netEb} eb`)
    for (const w of verdict.waves) console.log(`  wave ${w.wave}: net ${w.netEb} eb · ${w.paths.length} path(s)`)
    process.exit(ok ? 0 : 1)
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
