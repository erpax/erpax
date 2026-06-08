/**
 * quantum/emr — append-only snapshot chain; supersede never delete; analog results.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  entryUuid,
  emrAppendOnlyHolds,
  correctionSupersedes,
  analogResults,
  reconstructAt,
  supersededIds,
  observationFromDeviceReading,
} from '@/quantum/emr'
import { readingUuid } from '@/readings'

describe('quantum/emr — health-state snapshot chain', () => {
  it('entryUuid is deterministic content-address', () => {
    const obs = { kind: 'observation', code: '8480-6', value: 120 }
    expect(entryUuid(obs)).toBe(entryUuid(obs))
  })

  it('emrAppendOnlyHolds rejects deletions', () => {
    expect(emrAppendOnlyHolds([{ id: 'a' }])).toBe(true)
    expect(emrAppendOnlyHolds([{ id: 'a', deleted: true }])).toBe(false)
  })

  it('correctionSupersedes requires a new id referencing the prior', () => {
    const prior = entryUuid({ v: 1 })
    const fix = { id: entryUuid({ v: 2 }), supersedes: prior }
    expect(correctionSupersedes(prior, fix)).toBe(true)
    expect(correctionSupersedes(prior, { id: prior, supersedes: prior })).toBe(false)
  })
})

describe('quantum/emr — analog results (vital sign series)', () => {
  const priorId = entryUuid({ kind: 'observation', code: '8480-6', value: 120, at: '2026-06-08T10:00:00.000Z' })
  const fixId = entryUuid({ kind: 'observation', code: '8480-6', value: 118, at: '2026-06-08T10:05:00.000Z' })
  const laterId = entryUuid({ kind: 'observation', code: '8480-6', value: 122, at: '2026-06-08T11:00:00.000Z' })

  const series = [
    {
      id: priorId,
      kind: 'observation' as const,
      code: '8480-6',
      value: 120,
      unit: 'mmHg',
      at: '2026-06-08T10:00:00.000Z',
    },
    {
      id: fixId,
      kind: 'observation' as const,
      code: '8480-6',
      value: 118,
      unit: 'mmHg',
      at: '2026-06-08T10:05:00.000Z',
      supersedes: priorId,
    },
    {
      id: laterId,
      kind: 'observation' as const,
      code: '8480-6',
      value: 122,
      unit: 'mmHg',
      at: '2026-06-08T11:00:00.000Z',
    },
  ]

  it('supersededIds collects direct supersession targets', () => {
    expect(supersededIds(series).has(priorId)).toBe(true)
    expect(supersededIds(series).has(fixId)).toBe(false)
  })

  it('reconstructAt replays the chart at a past instant', () => {
    const at103 = reconstructAt(series, '2026-06-08T10:03:00.000Z')
    expect(at103.get('8480-6')?.value).toBe(120)

    const at1105 = reconstructAt(series, '2026-06-08T10:05:00.000Z')
    expect(at1105.get('8480-6')?.value).toBe(118)
  })

  it('analogResults yields a chronological stream with supersede flags', () => {
    const stream = analogResults(series)
    expect(stream).toHaveLength(3)
    expect(stream[0]!.superseded).toBe(true)
    expect(stream[1]!.superseded).toBe(false)
    expect(stream[2]!.active).toBe(true)
    expect(stream[2]!.value).toBe(122)
  })

  it('reconstructAt at asOf matches analogResults active winners', () => {
    const asOf = '2026-06-08T10:05:00.000Z'
    const stream = analogResults(series, { asOf })
    const active = stream.filter((r) => r.active)
    expect(active).toHaveLength(1)
    expect(active[0]!.value).toBe(118)
    expect(reconstructAt(series, asOf).get('8480-6')?.value).toBe(118)
  })
})

describe('quantum/emr — device reading → observation', () => {
  it('observationFromDeviceReading composes boundary and entryUuid', () => {
    const at = '2026-06-08T10:00:00.000Z'
    const reading = { signal: 'rppg', numbers: [120], at, unit: 'mmHg' } as const
    const obs = observationFromDeviceReading(reading, '8480-6')
    expect(obs.kind).toBe('observation')
    expect(obs.code).toBe('8480-6')
    expect(obs.value).toBe(120)
    expect(obs.id).toBe(
      entryUuid({
        kind: 'observation',
        code: '8480-6',
        value: 120,
        unit: 'mmHg',
        at,
        snapshot: readingUuid(reading),
      }),
    )
  })
})

describe('quantum/emr — lab panel (multi-code)', () => {
  const at = '2026-06-08T08:00:00.000Z'

  const panel = [
    observationFromDeviceReading(
      { signal: 'rppg', numbers: [140], at, unit: 'mg/dL' },
      '2345-7',
    ),
    observationFromDeviceReading(
      { signal: 'rppg', numbers: [1.1], at, unit: 'mg/dL' },
      '2160-0',
    ),
  ]

  it('reconstructAt returns active winner per analyte at draw instant', () => {
    const state = reconstructAt(panel, at)
    expect(state.size).toBe(2)
    expect(state.get('2345-7')?.value).toBe(140)
    expect(state.get('2160-0')?.value).toBe(1.1)
  })

  it('analogResults marks both panel analytes active at draw', () => {
    const stream = analogResults(panel, { asOf: at })
    const active = stream.filter((r) => r.active)
    expect(active).toHaveLength(2)
    expect(active.map((r) => r.code).sort()).toEqual(['2160-0', '2345-7'])
  })
})
