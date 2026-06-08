/**
 * quantum/dimension-realtime — collapse → sealed update → wave emit per projection axis.
 *
 * Composes [[dimensions]] · [[team/comms]] · [[realtime]] · [[wave/session]] for live
 * Radix UI surfaces bound to every quantum projection dimension.
 *
 * @see ./dimensions.ts · ../team/comms · ../realtime · ./QuantumDimensionsProvider.tsx
 */
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { entropy } from '@/entropy'
import { computeContentUuid, jcsCanonicalize, uuid } from '@/integrity'
import { isFullyEntangled, noCloning, reciprocity } from '@/entanglement'
import { UUID_MATRIX_EDGES as MATRIX_EDGES } from '@/uuid/matrix'
import { append } from '@/realtime'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
  type TeamCommsEmit,
  type WaveInSecureCommsResult,
} from '@/team/comms'
import { uniform, collapse as collapse1D } from '@/superposition'
import { coordinateAddress } from '@/uuid/matrix'
import {
  basis2D,
  collapse2D,
  quantumInAllDimensions,
  seal2D,
  superpose2D,
  uniform2D,
  type QuantumDimensionCoverage,
  type QuantumProjectionDimension,
} from './dimensions'

export { type QuantumProjectionDimension } from './dimensions'

/** Matrix path per projection axis — coordinateAddress source. */
export const DIMENSION_ATOM_PATHS: Readonly<Record<QuantumProjectionDimension, string>> = {
  '1d-path': 'horo',
  '2d-partition': 'quantum/typography',
  '3d-trinity': 'trinity',
  matrix: 'uuid/matrix',
  deployment: 'worker',
}

/** Live axis state rendered by RadixDimensionPanel. */
export interface DimensionAxisState {
  readonly dimension: QuantumProjectionDimension
  readonly coordinateAddress: string
  readonly holds: boolean
  readonly detail: string
  readonly seal: string
  readonly horoStep?: HoroStep
  readonly partition?: string
  readonly eb: number
  readonly analogResults: number
  readonly entanglementWarnings: readonly string[]
}

export interface DimensionSnapshot {
  readonly ok: boolean
  readonly axes: readonly DimensionAxisState[]
  readonly fingerprint: string
  readonly borrowedEb: number
}

export interface DimensionRealtimeEvent {
  readonly dimension: QuantumProjectionDimension
  readonly priorSeal: string
  readonly nextSeal: string
  readonly event: string
  readonly emit: TeamCommsEmit
  readonly verdictOk: boolean
}

export interface DimensionRealtimeEmitResult extends WaveInSecureCommsResult {
  readonly dimensionEvent: DimensionRealtimeEvent
  readonly toast: { readonly title: string; readonly description: string }
}

export interface DimensionRealtimeEmitOpts {
  readonly scopeTenantId: string
  readonly tenantId: string
  readonly teamId: string
  readonly sessionId: string
  readonly agent: string
  readonly dimension: QuantumProjectionDimension
  readonly priorSeal: string
  readonly nextSeal: string
  readonly collapsedAt?: string
  readonly r?: number
  readonly waveId?: number
  readonly receipt?: {
    readonly actor: string
    readonly head: { leafUuid: string; seq: number } | null
    readonly timestampIso: string
  }
}

const analogCountFor = (dimension: QuantumProjectionDimension): number => {
  switch (dimension) {
    case '1d-path':
      return HORO_DIGITS.length
    case '2d-partition':
      return basis2D().length
    case '3d-trinity':
      return 3
    case 'matrix':
      return MATRIX_EDGES.length
    case 'deployment':
      return 3
  }
}

const entanglementWarningsFor = (holds: boolean, detail: string): string[] => {
  const warnings: string[] = []
  if (!holds) warnings.push(`projection drift — ${detail}`)
  if (!isFullyEntangled() || !noCloning()) {
    warnings.push(
      `entanglement incomplete — reciprocity ${(reciprocity() * 100).toFixed(1)}% · no-cloning ${noCloning()}`,
    )
  }
  return warnings
}

/** Collapse one projection axis at r ∈ [0,1) and seal the measured outcome. */
export function collapseDimensionState(
  dimension: QuantumProjectionDimension,
  r: number,
  opts: {
    readonly cwd?: string
    readonly coverage?: QuantumDimensionCoverage
  } = {},
): { readonly seal: string; readonly detail: string; readonly horo?: HoroStep; readonly partition?: string } {
  switch (dimension) {
    case '1d-path': {
      const horo = collapse1D(uniform(), r)
      const seal = uuid(jcsCanonicalize({ dimension, horo }))
      return { seal, detail: `horo ${horo}`, horo }
    }
    case '2d-partition': {
      const cell = collapse2D(uniform2D(), r)
      const biased = superpose2D({ [`${cell.partition}:${cell.horo}`]: 1 })
      const seal = seal2D(biased)
      return {
        seal,
        detail: `${cell.partition}×${cell.horo} (${cell.measure})`,
        horo: cell.horo,
        partition: cell.partition,
      }
    }
    case '3d-trinity':
    case 'matrix':
    case 'deployment': {
      const coverage =
        opts.coverage ??
        quantumInAllDimensions(opts.cwd ?? process.cwd()).dimensions.find((d) => d.dimension === dimension)
      const seal = uuid(
        jcsCanonicalize({ dimension, holds: coverage?.holds ?? false, detail: coverage?.detail ?? '' }),
      )
      return { seal, detail: coverage?.detail ?? 'unknown' }
    }
  }
}

/** Fingerprint the whole snapshot — drives realtime diff + toast on change. */
export const dimensionSnapshotFingerprint = (axes: readonly DimensionAxisState[]): string =>
  uuid(
    jcsCanonicalize(
      axes
        .map((a) => ({ dimension: a.dimension, seal: a.seal, holds: a.holds }))
        .sort((a, b) => a.dimension.localeCompare(b.dimension)),
    ),
  )

/** Build live axis states across all five projection dimensions. */
export function buildDimensionSnapshot(cwd = process.cwd()): DimensionSnapshot {
  const coverage = quantumInAllDimensions(cwd)
  const borrowedEb = entropy()

  const axes: DimensionAxisState[] = coverage.dimensions.map((d) => {
    const atomPath = DIMENSION_ATOM_PATHS[d.dimension]
    const collapsed = collapseDimensionState(d.dimension, 0, { cwd, coverage: d })
    return {
      dimension: d.dimension,
      coordinateAddress: coordinateAddress(atomPath),
      holds: d.holds,
      detail: d.detail,
      seal: collapsed.seal,
      horoStep: collapsed.horo,
      partition: collapsed.partition,
      eb: borrowedEb,
      analogResults: analogCountFor(d.dimension),
      entanglementWarnings: entanglementWarningsFor(d.holds, d.detail),
    }
  })

  return {
    ok: coverage.ok,
    axes,
    fingerprint: dimensionSnapshotFingerprint(axes),
    borrowedEb,
  }
}

/** Session fold uuid — quote → collapse → emit across dimension hops (0896eab2 pattern). */
export function dimensionSessionUuid(parts: {
  readonly sessionId: string
  readonly dimension: QuantumProjectionDimension
  readonly priorSeal: string
  readonly nextSeal: string
  readonly eventUuid: string
}): string {
  return uuid(
    jcsCanonicalize({
      sessionId: parts.sessionId,
      dimension: parts.dimension,
      priorSeal: parts.priorSeal,
      nextSeal: parts.nextSeal,
      eventUuid: parts.eventUuid,
    }),
  )
}

export function dimensionWaveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return waveCorrelationUuid(opts)
}

/**
 * Collapse → sealed update → team/comms wave emit for one dimension transition.
 * Returns Sonner-ready toast copy when the gate passes.
 */
export function dimensionRealtimeEmit(opts: DimensionRealtimeEmitOpts): DimensionRealtimeEmitResult {
  const collapsedAt = opts.collapsedAt ?? new Date().toISOString()
  const r = opts.r ?? 0
  const measured = collapseDimensionState(opts.dimension, r)
  const event = 'quantum:dimension:collapsed'
  const payload = {
    dimension: opts.dimension,
    priorSeal: opts.priorSeal,
    nextSeal: opts.nextSeal,
    measuredSeal: measured.seal,
    measuredDetail: measured.detail,
    collapsedAt,
    [SECURE_WAVE_PAYLOAD_KEY]: {
      waveId: opts.waveId ?? 0,
      correlationUuid: dimensionWaveCorrelationUuid({
        sessionId: opts.sessionId,
        tenantId: opts.tenantId,
        teamId: opts.teamId,
      }),
      depth: opts.waveId ?? 0,
      tenantId: opts.tenantId,
      teamId: opts.teamId,
      emittedAt: collapsedAt,
    } satisfies SecureWaveEnvelope,
  }

  const eventUuid = computeContentUuid(
    {
      id: event,
      tenantId: opts.tenantId,
      payload,
      emittedAt: collapsedAt,
    },
    opts.tenantId,
  )

  const envelope = (payload as Record<string, unknown>)[SECURE_WAVE_PAYLOAD_KEY] as SecureWaveEnvelope
  const result = waveInSecureComms({
    scopeTenantId: opts.scopeTenantId,
    envelope,
    event,
    eventUuid,
    agent: opts.agent,
    payload,
    receipt: opts.receipt,
  })

  const toastTitle = result.verdict.ok
    ? `${opts.dimension} collapsed`
    : `${opts.dimension} emit blocked`
  const toastDescription = result.verdict.ok
    ? `${measured.detail} · seal ${measured.seal.slice(0, 8)}…`
    : (result.verdict.reason ?? 'gate rejected')

  return {
    ...result,
    dimensionEvent: {
      dimension: opts.dimension,
      priorSeal: opts.priorSeal,
      nextSeal: opts.nextSeal,
      event,
      emit: result.emit,
      verdictOk: result.verdict.ok,
    },
    toast: { title: toastTitle, description: toastDescription },
  }
}

/** Append dimension realtime events to an append-only log (pull-side delivery). */
export function appendDimensionToLog<T extends DimensionRealtimeEvent>(
  log: readonly T[],
  event: T,
): T[] {
  return append(log, event)
}

/** Re-export advance for cursor-based tail tests. */
export { advance as dimensionLogAdvance } from '@/realtime'
