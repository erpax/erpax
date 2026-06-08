/**
 * medical — clinical hub proof (device registry + EMR wire).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  MODALITIES,
  wireModalityToEmr,
  allModalitiesBoundaryHold,
  observationsFromMedicalDevice,
} from '@/medical'
import { deviceReadingFromMonitor } from '@/medical/device'
import { finishedIdeaCrossed } from '@/seal'
import { deriveDiamond } from '@/diamond'
import { deriveFolderModel, buildReadmeCorpusContext, buildReadmeTypographyGraph } from '@/readme'

describe('medical — clinical hub', () => {
  it('re-exports device registry with lawful modalities', () => {
    expect(MODALITIES.length).toBeGreaterThan(0)
    expect(allModalitiesBoundaryHold()).toBe(true)
  })

  it('wires monitor readings to LOINC observations via EMR', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const [hr, spo2, systolic] = [78, 97, 118] as const
    const reading = deviceReadingFromMonitor(hr, spo2, systolic, at)
    const obs = wireModalityToEmr('monitor', [hr, spo2, systolic], at)
    expect(obs.map((o) => o.code).sort()).toEqual(['2708-6', '8480-6', '8867-4'])
    expect(observationsFromMedicalDevice('monitor', reading)).toEqual(obs)
  })
})

describe('medical — finishedIdeaCrossed', () => {
  const cwd = process.cwd()
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)

  it.each(['medical', 'medical/device'] as const)('%s crosses after trinity collapse', (atomPath) => {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    const model = deriveDiamond(atomPath)
    const cross = finishedIdeaCrossed({
      ...model,
      trinity: { form: folder.form, code: folder.code, proof: folder.proof },
      sealed: folder.sealed,
    })
    expect(folder.sealed).toBe(true)
    expect({ form: folder.form, code: folder.code, proof: folder.proof }).toEqual({ form: 1, code: 1, proof: 1 })
    expect(cross.crossed).toBe(true)
    expect(cross.impurities).toEqual([])
  })
})
