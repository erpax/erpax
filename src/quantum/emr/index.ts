/**
 * quantum/emr — health-state snapshot chain: append-only, supersede never delete.
 *
 * Each encounter/observation is content-addressed and immutable; a correction is a
 * new superseding entry — the full history stays reversible and tamper-evident.
 * The chain collapses to an **analog result stream**: continuous measured quantities
 * ([[observation]] · [[vital]] signs, labs) with supersede semantics and point-in-time
 * reconstruction — not binary on/off, but a timeline you can replay at any instant.
 *
 *   tsx src/quantum/emr/index.ts
 *
 * @audit pure chain invariants; never hand-asserted clinical records
 * @see ../../patient — ../../record — ../../analog — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import type { DeviceReading } from '@/readings'
import { readingBoundaryHolds, readingUuid } from '@/readings'

export interface EmrEntry {
  readonly id: string
  readonly supersedes?: string | null
  readonly deleted?: boolean
}

/** Measured clinical capture — vitals, labs, [[observation]]s (continuous quantities). */
export interface EmrObservation extends EmrEntry {
  readonly kind: 'observation'
  readonly code: string
  readonly value: number
  readonly unit?: string
  readonly at: string
}

/** One point on the analog result timeline derived from the EMR snapshot chain. */
export interface AnalogResult {
  readonly entryId: string
  readonly code: string
  readonly value: number
  readonly unit?: string
  readonly at: string
  /** True when a later entry supersedes this one (correction, never deletion). */
  readonly superseded: boolean
  /** True when this is the winning value for its code at the evaluation instant. */
  readonly active: boolean
}

/** Content-address one clinical capture — encounter, observation, or diagnosis. */
export const entryUuid = (payload: unknown): string => uuid(payload)

/** Canonical ledger hook — record quantum/emr path step (append-only). */
export function recordEmrOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/emr', { kind: 'emr.step', payload }, at, prevEntryUuid, seq)
}

/**
 * Fold a device-collapsed reading into an append-only EMR observation.
 * Composes [[quantum/device]] boundary checks, `readingUuid`, and `entryUuid`.
 */
export function observationFromDeviceReading(reading: DeviceReading, code: string): EmrObservation {
  if (!readingBoundaryHolds(reading)) {
    throw new Error('device reading does not cross boundary')
  }
  const value = reading.numbers[0]
  if (value === undefined) {
    throw new Error('reading has no scalar value')
  }
  const payload = {
    kind: 'observation' as const,
    code,
    value,
    unit: reading.unit,
    at: reading.at,
    snapshot: readingUuid(reading),
  }
  return {
    id: entryUuid(payload),
    kind: 'observation',
    code,
    value,
    unit: reading.unit,
    at: reading.at,
  }
}

/** EMR never deletes — corrections supersede; deletions are impurity. */
export function emrAppendOnlyHolds(entries: readonly EmrEntry[]): boolean {
  return !entries.some((e) => e.deleted === true)
}

/** A correction is a new entry pointing at the prior id — never an in-place edit. */
export function correctionSupersedes(priorId: string, correction: EmrEntry): boolean {
  return correction.supersedes === priorId && correction.id !== priorId
}

/** Ids superseded by any entry in the chain (direct supersession only). */
export function supersededIds(entries: readonly EmrEntry[]): ReadonlySet<string> {
  const ids = new Set<string>()
  for (const e of entries) {
    if (e.supersedes) ids.add(e.supersedes)
  }
  return ids
}

/** Latest ISO instant among observations, or the empty-chain sentinel. */
export function latestAt(entries: readonly EmrObservation[]): string | null {
  if (entries.length === 0) return null
  return entries.reduce((max, e) => (e.at > max ? e.at : max), entries[0]!.at)
}

/** Active winning entry per code at instant `at` (inclusive). */
export function reconstructAt(
  entries: readonly EmrObservation[],
  at: string,
): ReadonlyMap<string, AnalogResult> {
  const visible = entries.filter((e) => e.at <= at)
  const superseded = supersededIds(visible)
  const byCode = new Map<string, EmrObservation[]>()
  for (const e of visible) {
    if (superseded.has(e.id)) continue
    const list = byCode.get(e.code) ?? []
    list.push(e)
    byCode.set(e.code, list)
  }
  const out = new Map<string, AnalogResult>()
  for (const [code, list] of byCode) {
    const winner = list.reduce((best, e) => (e.at > best.at ? e : best), list[0]!)
    out.set(code, {
      entryId: winner.id,
      code,
      value: winner.value,
      unit: winner.unit,
      at: winner.at,
      superseded: false,
      active: true,
    })
  }
  return out
}

/**
 * Map the append-only snapshot chain → analog result stream (continuous timeline).
 * Corrections mark prior readings superseded; `active` reflects the winner at `asOf`.
 */
export function analogResults(
  entries: readonly EmrObservation[],
  opts?: { asOf?: string },
): AnalogResult[] {
  const asOf = opts?.asOf ?? latestAt(entries) ?? ''
  const active = reconstructAt(entries, asOf)
  const superseded = supersededIds(entries)
  return [...entries]
    .sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
    .map((e) => ({
      entryId: e.id,
      code: e.code,
      value: e.value,
      unit: e.unit,
      at: e.at,
      superseded: superseded.has(e.id),
      active: active.get(e.code)?.entryId === e.id,
    }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const prior = entryUuid({ kind: 'observation', code: '8480-6', value: 120, at: '2026-06-08T10:00:00.000Z' })
  const fix = {
    id: entryUuid({ kind: 'observation', code: '8480-6', value: 118, at: '2026-06-08T10:05:00.000Z' }),
    kind: 'observation' as const,
    code: '8480-6',
    value: 118,
    at: '2026-06-08T10:05:00.000Z',
    unit: 'mmHg',
    supersedes: prior,
  }
  const series: EmrObservation[] = [
    { id: prior, kind: 'observation', code: '8480-6', value: 120, unit: 'mmHg', at: '2026-06-08T10:00:00.000Z' },
    fix,
    {
      id: entryUuid({ kind: 'observation', code: '8480-6', value: 122, at: '2026-06-08T11:00:00.000Z' }),
      kind: 'observation',
      code: '8480-6',
      value: 122,
      unit: 'mmHg',
      at: '2026-06-08T11:00:00.000Z',
    },
  ]
  const stream = analogResults(series)
  const at10 = reconstructAt(series, '2026-06-08T10:03:00.000Z')
  console.log(
    'quantum/emr — appendOnly=' +
      emrAppendOnlyHolds(series) +
      ' · stream=' +
      stream.length +
      ' · active@10:03=' +
      at10.get('8480-6')?.value,
  )
}
