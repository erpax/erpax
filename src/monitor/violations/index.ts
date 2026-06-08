/**
 * monitor/violations — realtime corpus violation scan across all gate axes.
 *
 * Aggregates folder law · rules:check · diamond strays · gap eb · finishedIdeaCrossed
 * (wave-sampled) · import/boundary · path-follow · field entanglement. Each event
 * bonds `accountCodeOf(atomPath)` per the path-is-account-code law.
 *
 *   tsx src/monitor/violations/index.ts --watch
 *   pnpm violations:watch
 *
 * @see ../index.ts — @/rules — @/readme/entropy — ./realtime.ts
 */
import { join } from 'node:path'
import { accountCodeOf } from '@/accounting'
import { deriveDiamond } from '@/diamond'
import { jcsCanonicalize, uuid } from '@/integrity'
import { folderViolations, alphanumericNameViolations } from '@/law/folder'
import {
  assertPathFollowed,
  alcapsBaselineViolations,
  crossConceptForViolation,
  crossConceptNotificationPayload,
  finishedIdeaCrossed,
  type CrossDimension,
} from '@/seal'
import {
  drainCrossViolationStream,
  pushCrossViolationToStream,
  type CrossViolationOrigin,
} from './stream'
import { fieldEntanglementUnhooked } from './entanglement'
import { report as entanglementReport } from '@/quantum/entanglement'
import {
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
  corpusPathFollowOpts,
  deriveFolderModel,
  type FolderReadmeContext,
} from '@/readme'
import { rulesOf, concentrationFixSuggestion, wordMatterFixSuggestion, wordWithoutLogicFixSuggestion } from '@/rules'
import { matterForWord, wordDiamondFixSuggestion } from '@/law/folder'
import { nonIndexImports } from '@/tamper/import'
import type { AnalysisTypographyGraph } from '@/typography'
import type { WaveBatch } from '@/wave/load'
import { maxWorkTamperPolicy } from '@/wave/policy'
import { corpusPathWaveBatches, corpusWaveOptsLiteraryPriority } from '@/wave/scheduler'

/** Gate axis that produced the violation event. */
export type ViolationSource =
  | 'folder-law'
  | 'alphanumeric-name'
  | 'rules-stray-ts'
  | 'rules-multi-segment'
  | 'rules-accounting'
  | 'diamond-stray'
  | 'gap-eb'
  | 'finished-idea-cross'
  | 'cross-concept'
  | 'import-boundary'
  | 'path-follow'
  | 'entanglement'
  | 'logic-concentration'
  | 'word-without-code'
  | 'word-without-logic'
  | 'word-incomplete-diamond'
  | 'word-matter'
  | 'seal-debt'

export type ViolationSeverity = 'info' | 'warning' | 'error'

/** One normalized violation — stable id for realtime diff + Sonner toast. */
export interface ViolationEvent {
  readonly id: string
  readonly source: ViolationSource
  readonly atomPath: string
  readonly accountCode: string
  readonly detail: string
  readonly severity: ViolationSeverity
  readonly scannedAt: string
  readonly eb?: number
  /** Cross dimension when source is cross-concept or rules/cross class. */
  readonly crossDimension?: CrossDimension
  /** Education markdown from finishedIdeaCrossed / crossConceptForViolation. */
  readonly crossEducation?: string
  readonly uncrossedAxes?: readonly string[]
  readonly origin?: CrossViolationOrigin
  readonly gate?: string
}

export interface ViolationSourceCounts {
  readonly total: number
  readonly bySource: Readonly<Partial<Record<ViolationSource, number>>>
}

export interface ViolationScanSnapshot {
  readonly ok: boolean
  readonly scannedAt: string
  readonly fingerprint: string
  readonly events: readonly ViolationEvent[]
  readonly counts: ViolationSourceCounts
  readonly waveOrdinal: number | null
  readonly wavePathsSampled: number
}

export interface ScanViolationsOpts {
  readonly cwd?: string
  /** Include one horo wave batch of finishedIdeaCrossed + gap eb (default true). */
  readonly waveSample?: boolean
  /** Cap events returned (UI / CLI tail). */
  readonly maxEvents?: number
}

const SRC = 'src'

let waveBatchIndex = 0
let cachedReadmeCtx: FolderReadmeContext | null = null
let cachedReadmeGraph: AnalysisTypographyGraph | null = null
let cachedWaveBatches: readonly WaveBatch<string>[] | null = null
let cachedWaveBatchesRoot: string | null = null

/** Reset wave cursor + readme / wave-plan caches (tests). */
export function resetViolationScanCache(): void {
  waveBatchIndex = 0
  cachedReadmeCtx = null
  cachedReadmeGraph = null
  cachedWaveBatches = null
  cachedWaveBatchesRoot = null
}

const waveBatchesFor = (cwd: string): readonly WaveBatch<string>[] => {
  if (cachedWaveBatches && cachedWaveBatchesRoot === cwd) return cachedWaveBatches
  const policy = maxWorkTamperPolicy()
  // Matrix walk — do not pass fs `src/` root (followEveryPath expects atom paths).
  let batches = [...corpusPathWaveBatches(corpusWaveOptsLiteraryPriority(cwd, undefined, policy))]
  if (batches.length === 0) {
    batches = [...corpusPathWaveBatches({})]
  }
  cachedWaveBatches = batches
  cachedWaveBatchesRoot = cwd
  return cachedWaveBatches
}

export const violationEventId = (
  source: ViolationSource,
  atomPath: string,
  detail: string,
): string => uuid(jcsCanonicalize({ source, atomPath, detail }))

const makeEvent = (
  source: ViolationSource,
  atomPath: string,
  detail: string,
  severity: ViolationSeverity,
  scannedAt: string,
  extra?: {
    readonly eb?: number
    readonly crossDimension?: CrossDimension
    readonly crossEducation?: string
    readonly uncrossedAxes?: readonly string[]
    readonly origin?: CrossViolationOrigin
    readonly gate?: string
  },
): ViolationEvent => ({
  id: violationEventId(source, atomPath, detail),
  source,
  atomPath,
  accountCode: accountCodeOf(atomPath),
  detail,
  severity,
  scannedAt,
  ...(extra?.eb !== undefined ? { eb: extra.eb } : {}),
  ...(extra?.crossDimension ? { crossDimension: extra.crossDimension } : {}),
  ...(extra?.crossEducation ? { crossEducation: extra.crossEducation } : {}),
  ...(extra?.uncrossedAxes ? { uncrossedAxes: extra.uncrossedAxes } : {}),
  ...(extra?.origin ? { origin: extra.origin } : {}),
  ...(extra?.gate ? { gate: extra.gate } : {}),
})

/** Sources that spawn a companion cross-concept education event. */
const CROSS_TRIGGER_SOURCES = new Set<ViolationSource>([
  'alphanumeric-name',
  'rules-stray-ts',
  'rules-multi-segment',
  'rules-accounting',
  'finished-idea-cross',
  'folder-law',
  'import-boundary',
  'path-follow',
  'gap-eb',
  'logic-concentration',
  'word-matter',
  'word-without-code',
  'word-without-logic',
  'word-incomplete-diamond',
  'seal-debt',
])

const makeCrossConceptEvent = (
  parent: ViolationEvent,
  scannedAt: string,
  origin: CrossViolationOrigin = 'scan',
): ViolationEvent => {
  const notify = crossConceptNotificationPayload(
    { source: parent.source, detail: parent.detail, atomPath: parent.atomPath },
    { accountCode: parent.accountCode, gate: origin === 'strict-apply' ? 'strict-apply' : 'scan' },
  )
  const detail = `cross-education: ${notify.axis} → ${notify.dimension} (${parent.source})`
  return makeEvent('cross-concept', parent.atomPath, detail, 'error', scannedAt, {
    crossDimension: notify.dimension,
    crossEducation: notify.crossEducation,
    uncrossedAxes: notify.uncrossedAxes,
    origin,
    gate: parent.gate,
  })
}

/** Append cross-concept events for rules/* and finishedIdeaCrossed impurities. */
export function enrichCrossConceptEvents(
  events: ViolationEvent[],
  scannedAt: string,
): void {
  const seen = new Set(events.filter((e) => e.source === 'cross-concept').map((e) => e.id))
  for (const e of [...events]) {
    if (!CROSS_TRIGGER_SOURCES.has(e.source)) continue
    const cross = makeCrossConceptEvent(e, scannedAt, e.origin ?? 'scan')
    if (!seen.has(cross.id)) {
      events.push(cross)
      seen.add(cross.id)
    }
  }
}

/** Merge strict-apply stream into scan events. */
function mergeStreamCrossViolations(events: ViolationEvent[], scannedAt: string): void {
  for (const s of drainCrossViolationStream()) {
    events.push(
      makeEvent('cross-concept', s.atomPath, s.detail, s.severity, scannedAt, {
        crossDimension: s.crossDimension,
        crossEducation: s.crossEducation,
        uncrossedAxes: s.uncrossedAxes,
        origin: s.origin,
        gate: s.gate,
      }),
    )
  }
}

/** Registry fields with no collapse hook wired — re-export from entanglement child atom. */
export { fieldEntanglementUnhooked, fieldEntanglementUnhookedCount } from './entanglement'

export const violationSnapshotFingerprint = (events: readonly ViolationEvent[]): string =>
  uuid(
    jcsCanonicalize(
      events
        .map((e) => ({ id: e.id, source: e.source, atomPath: e.atomPath }))
        .sort((a, b) => a.id.localeCompare(b.id)),
    ),
  )

const readmeWalkCtx = (cwd: string): { ctx: FolderReadmeContext; graph: AnalysisTypographyGraph } => {
  if (!cachedReadmeCtx || !cachedReadmeGraph) {
    cachedReadmeGraph = buildReadmeTypographyGraph(cwd)
    cachedReadmeCtx = buildReadmeCorpusContext(cwd, { frozenGraph: cachedReadmeGraph })
  }
  return { ctx: cachedReadmeCtx, graph: cachedReadmeGraph }
}

/** Advance one horo wave batch per call — OOM-safe finishedIdeaCrossed sampling. */
export function nextViolationWaveBatch(cwd: string = process.cwd()): {
  readonly ordinal: number
  readonly paths: readonly string[]
} {
  const batches = waveBatchesFor(cwd)
  if (batches.length === 0) return { ordinal: 0, paths: [] }
  const batch = batches[waveBatchIndex % batches.length]!
  const ordinal = batch.ordinal
  waveBatchIndex = (waveBatchIndex + 1) % batches.length
  return { ordinal, paths: batch.items }
}

const scanWaveSample = (
  cwd: string,
  scannedAt: string,
  events: ViolationEvent[],
): { waveOrdinal: number | null; wavePathsSampled: number } => {
  const { ordinal, paths } = nextViolationWaveBatch(cwd)
  if (paths.length === 0) return { waveOrdinal: null, wavePathsSampled: 0 }

  const { ctx, graph } = readmeWalkCtx(cwd)
  for (const atomPath of paths) {
    try {
      const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
      if (folder.entropy.netEntropyEb > 0) {
        events.push(
          makeEvent(
            'gap-eb',
            atomPath,
            `net ${folder.entropy.netEntropyEb} eb · gap ${folder.entropy.totalGapEb} eb`,
            'warning',
            scannedAt,
            { eb: folder.entropy.netEntropyEb },
          ),
        )
      }
      const diamond = deriveDiamond(atomPath, cwd)
      const cross = finishedIdeaCrossed(diamond, {
        entropyAccounting: folder.entropy,
        computedDriftCheck: true,
        computedDriftLight: true,
        literaryWordCheck: true,
        cwd,
      })
      for (const imp of cross.impurities) {
        events.push(makeEvent('finished-idea-cross', atomPath, imp, 'warning', scannedAt))
      }
    } catch {
      /* skip unreadable atom — scan continues */
    }
  }
  return { waveOrdinal: ordinal, wavePathsSampled: paths.length }
}

/** Live scan — all fast axes + one wave batch of cross/entropy per call. */
export function scanViolationsRealtime(opts: ScanViolationsOpts = {}): ViolationScanSnapshot {
  const cwd = opts.cwd ?? process.cwd()
  const scannedAt = new Date().toISOString()
  const events: ViolationEvent[] = []

  const folder = folderViolations(join(cwd, SRC))
  for (const v of folder.name) {
    events.push(makeEvent('folder-law', v.folder, `one-word law: ${v.folder}`, 'warning', scannedAt))
  }
  for (const v of folder.trinity) {
    events.push(
      makeEvent(
        'folder-law',
        v.folder,
        `trinity missing: ${v.missing.join(', ')}`,
        'error',
        scannedAt,
      ),
    )
  }

  for (const v of alphanumericNameViolations(cwd)) {
    const atomPath =
      v.kind === 'folder'
        ? v.path
        : v.path.includes('/')
          ? v.path.slice(0, v.path.lastIndexOf('/'))
          : v.path.replace(/\.[^.]+$/, '')
    events.push(
      makeEvent(
        'alphanumeric-name',
        atomPath,
        `${v.kind} ${v.path} — ${v.reason}`,
        'warning',
        scannedAt,
      ),
    )
  }

  const rules = rulesOf(cwd)
  for (const v of rules.strayTs) {
    events.push(makeEvent('rules-stray-ts', v.atomPath, `${v.file} — ${v.reason}`, 'warning', scannedAt))
  }
  for (const v of rules.multiSegment) {
    events.push(
      makeEvent('rules-multi-segment', v.atomPath, `${v.file} — ${v.reason}`, 'warning', scannedAt),
    )
  }
  for (const v of rules.accountingStructure) {
    events.push(
      makeEvent(
        'rules-accounting',
        v.atomPath,
        `${v.file} → nest ${v.compliant ?? '?'}`,
        'error',
        scannedAt,
      ),
    )
  }
  for (const v of rules.diamondMembership) {
    events.push(makeEvent('diamond-stray', v.atomPath, `${v.file} — ${v.reason}`, 'warning', scannedAt))
  }
  for (const v of rules.concentration) {
    events.push(
      makeEvent(
        'logic-concentration',
        v.atomPath,
        `${v.file} — ${v.reason} · fix: ${concentrationFixSuggestion(v)}`,
        'warning',
        scannedAt,
      ),
    )
  }
  for (const v of rules.wordMatter) {
    events.push(
      makeEvent(
        'word-matter',
        v.atomPath,
        `${v.file} — ${v.kind}: ${v.reason} · fix: ${wordMatterFixSuggestion(v)}`,
        'warning',
        scannedAt,
      ),
    )
  }
  for (const v of alcapsBaselineViolations(cwd)) {
    const atomPath = v.file.replace(/^src\//, '').replace(/\/[^/]+$/, '') || 'seal'
    events.push(
      makeEvent('seal-debt', atomPath, `${v.constName} in ${v.file} — ${v.reason}`, 'warning', scannedAt),
    )
  }

  for (const v of rules.wordFolder.violations.slice(0, 48)) {
    const rx = crossConceptForViolation({
      axis: 'word-without-code',
      atomPath: v.atomPath ?? v.word,
      detail: v.reason,
      law: v.law,
    })
    events.push(
      makeEvent(
        'word-without-code',
        v.atomPath ?? v.word,
        `${v.word} — ${v.reason} · fix: ${matterForWord(v.word, cwd).reason}`,
        'warning',
        scannedAt,
        {
          crossDimension: rx.dimension,
          crossEducation: rx.crossEducation,
          uncrossedAxes: [rx.axis],
        },
      ),
    )
  }

  for (const v of rules.wordDiamond.top50) {
    const rx = crossConceptForViolation({
      axis: 'word-incomplete-diamond',
      atomPath: v.atomPath ?? v.word,
      detail: v.reason,
      law: v.law,
    })
    events.push(
      makeEvent(
        'word-incomplete-diamond',
        v.atomPath ?? v.word,
        `${v.word} — ${v.reason} · fix: ${wordDiamondFixSuggestion(v, cwd)}`,
        'warning',
        scannedAt,
        {
          crossDimension: rx.dimension,
          crossEducation: rx.crossEducation,
          uncrossedAxes: [rx.axis],
        },
      ),
    )
  }

  for (const v of rules.wordWithoutLogic.top50) {
    const rx = crossConceptForViolation({
      axis: 'word-without-logic',
      atomPath: v.atomPath,
      detail: v.reason,
      law: v.law,
    })
    events.push(
      makeEvent(
        'word-without-logic',
        v.atomPath,
        `${v.atomPath} — ${v.kind}: ${v.reason} · fix: ${wordWithoutLogicFixSuggestion(v)}`,
        'warning',
        scannedAt,
        {
          crossDimension: rx.dimension,
          crossEducation: rx.crossEducation,
          uncrossedAxes: [rx.axis],
        },
      ),
    )
  }

  try {
    for (const v of nonIndexImports(join(cwd, SRC))) {
      const rel = v.file.replace(/^src\//, '')
      const atomPath = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : rel.replace(/\.[^.]+$/, '')
      events.push(
        makeEvent('import-boundary', atomPath || 'src', `${v.file} imports ${v.spec}`, 'error', scannedAt),
      )
    }
  } catch {
    /* import scan unavailable */
  }

  try {
    const { pathsVisited } = corpusPathFollowOpts()
    const gate = assertPathFollowed(pathsVisited)
    if (!gate.followed) {
      for (const p of gate.missing.slice(0, 24)) {
        events.push(
          makeEvent('path-follow', p, 'path not followed in corpus lattice walk', 'error', scannedAt),
        )
      }
      if (gate.missing.length > 24) {
        events.push(
          makeEvent(
            'path-follow',
            'matrix',
            `${gate.missing.length - 24} additional paths missing (${(gate.coverage * 100).toFixed(2)}% coverage)`,
            'error',
            scannedAt,
          ),
        )
      }
    }
  } catch {
    /* path-follow gate unavailable */
  }

  for (const entry of fieldEntanglementUnhooked()) {
    events.push(
      makeEvent(
        'entanglement',
        entry.collection,
        `${entry.path}: unhooked collapse (${entry.collapse.join(', ') || 'none'})`,
        'warning',
        scannedAt,
      ),
    )
  }
  const ent = entanglementReport()
  if (!ent.maximal) {
    events.push(
      makeEvent(
        'entanglement',
        'matrix',
        `matrix reciprocity ${(ent.reciprocity * 100).toFixed(1)}% · no-cloning=${ent.noCloning}`,
        'warning',
        scannedAt,
      ),
    )
  }

  let waveOrdinal: number | null = null
  let wavePathsSampled = 0
  if (opts.waveSample !== false) {
    const wave = scanWaveSample(cwd, scannedAt, events)
    waveOrdinal = wave.waveOrdinal
    wavePathsSampled = wave.wavePathsSampled
  }

  mergeStreamCrossViolations(events, scannedAt)
  enrichCrossConceptEvents(events, scannedAt)

  events.sort((a, b) => a.source.localeCompare(b.source) || a.atomPath.localeCompare(b.atomPath))

  const max = opts.maxEvents ?? events.length
  const capped = events.slice(0, max)

  const bySource: Partial<Record<ViolationSource, number>> = {}
  for (const e of events) {
    bySource[e.source] = (bySource[e.source] ?? 0) + 1
  }

  return {
    ok: events.length === 0,
    scannedAt,
    fingerprint: violationSnapshotFingerprint(events),
    events: capped,
    counts: { total: events.length, bySource },
    waveOrdinal,
    wavePathsSampled,
  }
}

export {
  appendViolationToLog,
  violationLogAdvance,
  violationRealtimeEmit,
  type ViolationRealtimeEmitOpts,
  type ViolationRealtimeEmitResult,
  type ViolationRealtimeEvent,
} from './realtime'

export {
  crossViolationRealtimeEmit,
  crossNotificationFromViolation,
  isCrossEducationViolation,
  CROSS_EDUCATION_SOURCES,
  CROSS_VIOLATION_EVENT,
  type CrossViolationRealtimeEmitOpts,
  type CrossViolationRealtimeEmitResult,
  type CrossViolationRealtimeEvent,
} from './cross-realtime'

export {
  pushCrossViolationToStream,
  drainCrossViolationStream,
  peekCrossViolationStream,
  resetCrossViolationStream,
  type StreamedCrossViolation,
  type CrossViolationOrigin,
} from './stream'

/** Build a cross-concept stream event from strict-apply block (education gate). */
export function crossViolationFromStrictApply(opts: {
  readonly atomPath: string
  readonly gate: string
  readonly reason: string
  readonly crossEducation: string
  readonly source?: ViolationSource
  readonly detail?: string
  readonly scannedAt?: string
}): void {
  const scannedAt = opts.scannedAt ?? new Date().toISOString()
  const input = {
    source: opts.source ?? 'rules-stray-ts',
    detail: opts.detail ?? opts.reason,
    atomPath: opts.atomPath,
  }
  const verdict = crossConceptForViolation(input)
  const notify = crossConceptNotificationPayload(input, { gate: 'strict-apply' })
  pushCrossViolationToStream({
    id: violationEventId('cross-concept', opts.atomPath, `strict-apply:${opts.gate}:${opts.reason}`),
    atomPath: opts.atomPath,
    accountCode: accountCodeOf(opts.atomPath),
    detail: `strict-apply (${opts.gate}): ${opts.reason}`,
    severity: 'error',
    scannedAt,
    crossDimension: verdict.dimension,
    crossEducation: opts.crossEducation || notify.crossEducation,
    uncrossedAxes: notify.uncrossedAxes,
    origin: 'strict-apply',
    gate: opts.gate,
  })
}

export {
  improveInRealtime,
  violationImproveClass,
  prioritizeViolations,
  resetImproveReceiptChain,
  HUMAN_GATE_COLLECTIONS,
  type ImproveClass,
  type ImproveAction,
  type ImproveResult,
  type ImproveInRealtimeOpts,
} from './improve'

export {
  runRealtimeImproveCycle,
  RealtimeImproveLoop,
  type RealtimeImproveLoopOpts,
  type RealtimeImproveCycleResult,
} from './loop'

if (import.meta.url === `file://${process.argv[1]}`) {
  const watch = process.argv.includes('--watch')
  const intervalMs = Number(process.argv.find((a) => a.startsWith('--interval='))?.slice(11) ?? 5000)
  let priorIds = new Set<string>()

  const tick = (): void => {
    const snap = scanViolationsRealtime({ waveSample: true })
    const fresh = snap.events.filter((e) => !priorIds.has(e.id))
    if (fresh.length > 0) {
      console.log(`violations — ${fresh.length} new · ${snap.counts.total} total · wave ${snap.waveOrdinal ?? '—'}`)
      const crossFresh = fresh.filter((e) => e.source === 'cross-concept')
      if (crossFresh.length > 0) {
        console.log(`  cross-concept — ${crossFresh.length} education notification(s)`)
        for (const e of crossFresh.slice(0, 6)) {
          const axes = e.uncrossedAxes?.join(', ') ?? '—'
          console.log(`    [cross] ${e.crossDimension ?? '?'} · axes ${axes} · ${e.accountCode}`)
          if (e.crossEducation) {
            const line = e.crossEducation.split('\n').find((l) => l.startsWith('**Uncrossed axis:**'))
            if (line) console.log(`      ${line}`)
          }
        }
      }
      for (const e of fresh.filter((ev) => ev.source !== 'cross-concept').slice(0, 12)) {
        console.log(`  [${e.source}] ${e.accountCode} — ${e.detail}`)
      }
      const nonCrossShown = Math.min(12, fresh.filter((ev) => ev.source !== 'cross-concept').length)
      const hidden = fresh.length - crossFresh.length - nonCrossShown
      if (hidden > 0) console.log(`  … +${hidden} more`)
    } else if (!watch) {
      console.log(`violations — ${snap.counts.total} total · fingerprint ${snap.fingerprint.slice(0, 8)}…`)
    }
    priorIds = new Set(snap.events.map((e) => e.id))
    if (!watch) process.exit(snap.ok ? 0 : 1)
  }

  tick()
  if (watch) {
    console.log(`violations:watch — polling every ${intervalMs}ms (Ctrl+C to stop)`)
    setInterval(tick, intervalMs)
  }
}
