/**
 * seal — the cross of every guardian into ONE whole-corpus verdict.
 *
 * SEALED iff every guardian holds (the AND of the immune cells). Fail-closed: an
 * EMPTY set of guardians is NOT a seal — nothing checked is not the same as nothing
 * wrong. Pure (no fs, no process) ⇒ regression-locked by test.ts. This is the verdict
 * the auto-commit/push waves gate on (@/confirm): only a sealed tree may be committed.
 *
 * **Propagation law:** parentSealed ⇒ ∀ child sealed. An unsealed parent (missing
 * trinity, phantom prefix, impure diamond) forbids any descendant from reporting sealed
 * — the child seal is subsumed by the parent envelope ([[readme]]/deriveFolderModel).
 *
 * **Finished idea:** `finishedIdeaCrossed` — a sealed diamond crossed in ALL directions
 * (path axis · matrix parent/prev/next · trinity · horo ring · deployment faces ·
 * 2D partition plane). Unfinished = form-only, partial trinity, broken bind, <2 crosses.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function
 * @see ./SKILL.md (the law) · ../guardian (one axis each) · ../law/folder (folder's two guardians sealed)
 */
import type { GuardianVerdict } from '@/guardian'
import { createRequire } from 'node:module'
import {
  deriveDiamond,
  verifyDiamond,
  deploymentFaces,
  type DiamondModel,
  type CollectionDiamondModel,
} from '@/diamond'
import { HORO_DIGITS } from '@/horo'
import {
  coordinateAddress,
  coordinateOf,
  horoCrossed,
  nodeOf,
  verifyBind,
  neighborsOf,
  bindingOf,
} from '@/uuid/matrix'
import {
  assertEveryPathFollowed,
  assertPathCanonicallyRecorded,
  followEveryPath,
  pathWalkCoverage,
  toAtomPath,
  type PathCanonicalEntry,
  type PathFollowVerdict,
  type PathRecordVerdict,
} from '@/path'
import {
  assertGapsAccounted,
  assertSealsAccounted,
  type FolderEntropyAccounting,
} from '@/readme/entropy'
import { computedAtAllScalesVerdict } from './computed-at-all-scales'

/** NIL parent uuid on the matrix tree axis — not a resolved atom parent. */
const NIL_PARENT = '00000000-0000-8000-8000-000000000000'

/** Immediate parent atom path, or null at root / single-segment paths. */
export function parentAtomPath(atomPath: string): string | null {
  const i = atomPath.lastIndexOf('/')
  return i > 0 ? atomPath.slice(0, i) : null
}

/**
 * Seal propagation — child sealed only when locally sealed AND every ancestor holds.
 * Fail-closed: parent unsealed ⇒ child never sealed (save(thought) ⇐ isDiamond).
 */
export function assertSealPropagation(localSealed: boolean, ancestorsSealed: boolean): boolean {
  return localSealed && ancestorsSealed
}

/**
 * Walk path prefixes — every atom ancestor must be sealed; a phantom prefix
 * (path segment with no SKILL.md atom) is unsealed and forbids descendants.
 * Pure on injected predicates (no fs).
 */
export function sealPropagatedFromAncestors(
  atomPath: string,
  localSealed: boolean,
  isAtom: (path: string) => boolean,
  ancestorSealed: (path: string) => boolean,
): boolean {
  if (!localSealed) return false
  const parts = atomPath.split('/')
  for (let i = 1; i < parts.length; i++) {
    const prefix = parts.slice(0, i).join('/')
    if (!isAtom(prefix)) return false
    if (!ancestorSealed(prefix)) return false
  }
  return true
}

export interface SealVerdict {
  readonly sealed: boolean
  readonly guardians: readonly GuardianVerdict[]
  readonly reason: string
}

export interface FinishedIdeaCrossOpts {
  /** Parent envelope sealed — child cannot cross if false (path-axis propagation). */
  readonly parentSealed?: boolean
  /** Inject live-tree walk: every ancestor sealed (path axis). */
  readonly ancestorsSealed?: (path: string) => boolean
  readonly isAtom?: (path: string) => boolean
  /** SKILL frontmatter @standard / signature lines when form is present. */
  readonly skillSignatures?: readonly string[]
  /** Paths visited before persist — gate requires full required-path coverage. */
  readonly pathsVisited?: ReadonlySet<string>
  /** Required paths for the path-follow gate (default: full matrix lattice). */
  readonly requiredPaths?: readonly string[]
  /** Canonical path ledger — every visited step must be recorded before seal. */
  readonly pathLedger?: readonly PathCanonicalEntry[]
  /** Folder entropy balance — gaps and seals must be accounted before crossed verdict. */
  readonly entropyAccounting?: FolderEntropyAccounting
  /** When true with `cwd`, run computedAtAllScalesVerdict and emit hand-maintained impurities. */
  readonly computedDriftCheck?: boolean
  /** Skip expensive SKILL frontmatter verify inside computed drift check. */
  readonly computedDriftLight?: boolean
  readonly cwd?: string
  /** When true with cwd, emit literary-word impurity via caseOf (lazy rules import). */
  readonly literaryWordCheck?: boolean
  /** When true with cwd, emit classical-mode for poll-only watch loops without subscribe. */
  readonly classicalModeCheck?: boolean
}

export { assertEveryPathFollowed, followEveryPath, pathWalkCoverage, type PathFollowVerdict } from '@/path'

/**
 * Path-follow gate — every required atom path must appear in `visited`.
 * Alias for agents/readme gravity that persist only after a full lattice walk.
 */
export function assertPathFollowed(
  visited: ReadonlySet<string>,
  required?: readonly string[],
): PathFollowVerdict {
  return assertEveryPathFollowed(visited, required)
}

export interface RecordedImplementedVerdict {
  readonly path: string
  readonly recorded: boolean
  readonly implemented: boolean
  readonly proven: boolean
  readonly trinityComplete: boolean
  /** recorded ∧ implemented ∧ proven — persist/seal only when true. */
  readonly complete: boolean
  readonly impurities: readonly string[]
}

/**
 * Law: every path step is recorded canonically AND implemented (executable matter).
 * Record without implementation ⇒ unfinished; implementation without record ⇒ unsealed.
 */
export function recordedAndImplementedVerdict(
  atomPath: string,
  opts?: { readonly ledger?: readonly PathCanonicalEntry[]; readonly cwd?: string },
): RecordedImplementedVerdict {
  const path = toAtomPath(atomPath, 'fs') || atomPath.replace(/^src\//, '').replace(/^\//, '')
  const model = deriveDiamond(path, opts?.cwd)
  const { form, code, proof } = model.trinity
  const trinityComplete = Boolean(form && code && proof)
  const implemented = Boolean(code)
  const proven = Boolean(proof)
  const recorded = opts?.ledger
    ? opts.ledger.some((e) => e.atomPath === path)
    : false
  const impurities: string[] = []
  if (!form) impurities.push('trinity.form missing (SKILL.md)')
  if (!code) impurities.push('trinity.code missing (index.ts)')
  if (!proof) impurities.push('trinity.proof missing (test.ts)')
  if (opts?.ledger && !recorded) impurities.push(`path ledger: no canonical entry for ${path}`)
  const complete = recorded && trinityComplete && proven && implemented
  return { path, recorded, implemented, proven, trinityComplete, complete, impurities }
}

export interface RecordedImplementedBatchVerdict {
  readonly complete: boolean
  readonly paths: readonly RecordedImplementedVerdict[]
  readonly recordGate: PathRecordVerdict | null
  readonly incomplete: readonly string[]
}

/** Batch gate — every visited path recorded + implemented before persist. */
export function assertRecordedAndImplemented(
  visitedPaths: ReadonlySet<string>,
  ledger: readonly PathCanonicalEntry[],
  cwd?: string,
): RecordedImplementedBatchVerdict {
  const recordGate = assertPathCanonicallyRecorded(visitedPaths, ledger)
  const paths = [...visitedPaths].map((p) =>
    recordedAndImplementedVerdict(p, { ledger, cwd }),
  )
  const incomplete = paths.filter((v) => !v.complete).map((v) => v.path)
  return {
    complete: recordGate.recorded && incomplete.length === 0,
    paths,
    recordGate,
    incomplete,
  }
}

export interface FinishedIdeaVerdict {
  readonly crossed: boolean
  readonly impurities: string[]
}

function trinityImpurities(model: DiamondModel | CollectionDiamondModel): string[] {
  const impurities: string[] = []
  const { trinity } = model
  if (!trinity.form) impurities.push('trinity.form missing (SKILL.md)')
  if (!trinity.code) impurities.push('trinity.code missing (index.ts)')
  if (!trinity.proof) impurities.push('trinity.proof missing (test.ts)')
  return impurities
}

function matrixCrossImpurities(atomPath: string): string[] {
  const impurities: string[] = []
  const n = nodeOf(atomPath)
  if (!n) {
    impurities.push(`matrix: atom not folded (${atomPath})`)
    return impurities
  }
  const addr = coordinateAddress(atomPath)
  if (!verifyBind(atomPath)) impurities.push(`matrix: coordinate bind broken (${addr})`)
  const coord = coordinateOf(atomPath)
  if (!coord) {
    impurities.push(`matrix: coordinate cross incomplete (${addr})`)
    return impurities
  }
  const crosses = [coord.parent, coord.prev, coord.next].filter((u) => u && u !== NIL_PARENT).length
  if (crosses < 2) impurities.push(`matrix: <2 coordinate crosses (${addr})`)
  for (const nb of neighborsOf(atomPath)) {
    const target = nb.path ?? nb.atom
    if (bindingOf(atomPath, target) && !bindingOf(target, atomPath)) {
      impurities.push(`matrix: bond ${atomPath}→${target} lacks reciprocal`)
    }
  }
  return impurities
}

function partitionPlaneHolds(atomPath: string): string[] {
  const root = atomPath.split('/')[0] ?? atomPath
  const node = nodeOf(atomPath) ?? nodeOf(root)
  if (!node?.path) {
    return [`partition: typography plane unbound (${coordinateAddress(atomPath)})`]
  }
  return []
}

/**
 * Finished idea — sealed diamond crossed in ALL directions.
 * Fail-closed: any impurity ⇒ not crossed; partial trinity / broken bind / lone atom ⇒ unfinished.
 */
export function finishedIdeaCrossed(
  model: DiamondModel | CollectionDiamondModel,
  opts?: FinishedIdeaCrossOpts,
): FinishedIdeaVerdict {
  const impurities: string[] = []
  const atomPath = model.atomPath

  const diamond = verifyDiamond(model, { parentSealed: opts?.parentSealed })
  impurities.push(
    ...diamond.impurities.filter(
      (i) => !(i.startsWith('horo ') && i.endsWith(' off-ring') && horoCrossed(atomPath, model.horo)),
    ),
  )
  impurities.push(...trinityImpurities(model).filter((i) => !impurities.includes(i)))

  if (opts?.ancestorsSealed && opts?.isAtom) {
    if (!sealPropagatedFromAncestors(atomPath, model.sealed, opts.isAtom, opts.ancestorsSealed)) {
      impurities.push('path axis: ancestor chain unsealed')
    }
  }

  impurities.push(...matrixCrossImpurities(atomPath))
  impurities.push(...partitionPlaneHolds(atomPath))

  if (model.horo !== null && !horoCrossed(atomPath, model.horo)) {
    const off = `horo ${model.horo} off-ring`
    if (!impurities.includes(off)) impurities.push(off)
  }

  if (model.trinity.code) {
    const faces = deploymentFaces(model)
    if (!faces.worker && !faces.plugin && !faces.pwa) {
      impurities.push('deployment: no materialised face (worker/plugin/pwa)')
    }
  }

  if (model.trinity.form && opts?.skillSignatures !== undefined && opts.skillSignatures.length === 0) {
    impurities.push('SKILL: frontmatter signatures missing (@standard)')
  }

  if (opts?.pathsVisited) {
    const pathGate = assertPathFollowed(opts.pathsVisited, opts.requiredPaths)
    if (!pathGate.followed) {
      impurities.push(
        `path lattice: ${pathGate.missing.length} path(s) not followed (${(pathGate.coverage * 100).toFixed(2)}% coverage)`,
      )
    }
    if (opts.pathLedger) {
      const recordGate = assertPathCanonicallyRecorded(opts.pathsVisited, opts.pathLedger)
      if (!recordGate.recorded) {
        impurities.push(
          `path ledger: ${recordGate.missing.length} path(s) not canonically recorded (${(recordGate.coverage * 100).toFixed(2)}% coverage)`,
        )
      }
      const batch = assertRecordedAndImplemented(opts.pathsVisited, opts.pathLedger)
      for (const v of batch.paths) {
        if (!v.complete) {
          impurities.push(`path ${v.path}: not recorded+implemented (${v.impurities.join('; ')})`)
        }
      }
    }
  }

  const preEntropy = [...new Set(impurities)]
  let gapsAccounted = true
  let sealsAccounted = true
  if (opts?.entropyAccounting) {
    const gapsGate = assertGapsAccounted(opts.entropyAccounting, preEntropy, { sealed: model.sealed })
    gapsAccounted = gapsGate.accounted
    if (!gapsAccounted) {
      impurities.push(`entropy: ${gapsGate.silent.length} gap(s) not on balance sheet`)
    }
    const sealsGate = assertSealsAccounted(opts.entropyAccounting, model.sealed)
    sealsAccounted = sealsGate.accounted
    if (!sealsAccounted) {
      impurities.push(`entropy: ${sealsGate.untraced.length} seal credit(s) untraced`)
    }
  }

  if (opts?.computedDriftCheck && opts.cwd) {
    const drift = computedAtAllScalesVerdict(atomPath, opts.cwd, {
      skipSkillFrontmatter: opts.computedDriftLight,
    })
    for (const hm of drift.handMaintained) {
      if (!impurities.includes(hm)) impurities.push(hm)
    }
  }

  if (opts?.literaryWordCheck && opts.cwd) {
    try {
      const requireRules = createRequire(import.meta.url)
      const { caseOf } = requireRules('@/rules/word-without-logic') as typeof import('@/rules/word-without-logic')
      const uc = caseOf(atomPath, opts.cwd)
      if (uc.isLiterary) {
        impurities.push(
          `literary-word: no code logic (${uc.readmeWords} readme words · ${uc.linesOfCode} loc · ${uc.importerCount} importers)`,
        )
      }
    } catch {
      /* literary scan unavailable — cross continues */
    }
  }

  if (opts?.classicalModeCheck && opts.cwd) {
    if (
      atomPath === 'quantum' ||
      atomPath.startsWith('quantum/') ||
      atomPath === 'agent/communication' ||
      atomPath === 'agent'
    ) {
      const requireQuantum = createRequire(import.meta.url)
      const { classicalModeWatchViolations } = requireQuantum('@/quantum/context') as typeof import('@/quantum/context')
      for (const rel of classicalModeWatchViolations(opts.cwd)) {
        impurities.push(`classical-mode: ${rel} poll-only watch without subscribe`)
      }
    }
  }

  const unique = [...new Set(impurities)]
  const crossed =
    unique.length === 0 && model.sealed && diamond.sealed && gapsAccounted && sealsAccounted
  return { crossed, impurities: unique }
}

export {
  alcapsBaselineViolations,
  type AlcapsBaselineViolation,
} from './baseline-debt'

export {
  COMPUTED_AT_ALL_SCALES_COORDINATE,
  COMPUTED_SCALES,
  computedAtAllScalesVerdict,
  globalsCssFallbackViolations,
  hardcodedAdminGroupViolations,
  skillsIndexRuntimeViolations,
  type ComputedAtAllScalesVerdict,
  type ComputedAtAllScalesOpts,
  type ComputedFace,
  type ComputedFaceCheck,
  type ComputedScale,
  type ComputedScaleSummary,
} from './computed-at-all-scales'

export {
  crossConceptForViolation,
  crossConceptNotificationPayload,
  crossEducationMarkdown,
  crossPrimerMarkdown,
  assertAgentUnderstandsCross,
  issueCrossAcknowledgementReceipt,
  resolveViolationAxis,
  violationCrossFingerprint,
  violationsFromUnsealedAxes,
  RULE_AXIS_CROSS,
  type CrossDimension,
  type CrossConceptInput,
  type CrossConceptVerdict,
  type CrossConceptNotificationPayload,
  type CrossUnderstandVerdict,
  type AssertAgentUnderstandsCrossOpts,
  type IssueCrossAcknowledgementOpts,
} from './cross-concept'

/** Cross the guardians: sealed only when all hold; an empty set is fail-closed. */
export function seal(guardians: readonly GuardianVerdict[]): SealVerdict {
  if (!Array.isArray(guardians) || guardians.length === 0)
    return { sealed: false, guardians: [], reason: 'no guardians — an empty set is NOT sealed (fail-closed)' }
  const broken = guardians.filter((g) => !g.ok)
  const sealed = broken.length === 0
  return {
    sealed,
    guardians,
    reason: sealed
      ? `sealed — all ${guardians.length} guardian(s) hold`
      : `NOT sealed — ${broken.length}/${guardians.length} guardian(s) red:\n` + broken.map((g) => '  ✗ ' + g.reason).join('\n'),
  }
}
