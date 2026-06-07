import { describe, it, expect } from 'vitest'
import {
  OECD_TP_METHODS,
  OECD_TP_METHOD_LABEL,
  OECD_TP_METHOD_OPTIONS,
  BEPS_TP_FILE_TYPES,
  BEPS_TP_FILE_TYPE_LABEL,
  BEPS_TP_FILE_TYPE_OPTIONS,
  CBCR_REVENUE_THRESHOLD_EUR,
  PILLAR_TWO_REVENUE_THRESHOLD_EUR,
  type OecdTpMethod,
  type BepsTpFileType,
} from '@/oecd/tpg'

// OECD TPG — Chapter II methods + BEPS Action 13 documentation file types,
// and the shared €750m CbCR / Pillar Two revenue threshold.
describe('oecd/tpg — transfer-pricing method & documentation taxonomy', () => {
  it('enumerates the OECD TPG Chapter II methods', () => {
    expect(OECD_TP_METHODS).toEqual([
      'cup',
      'resale_price',
      'cost_plus',
      'tnmm',
      'profit_split',
      'other',
    ])
    for (const m of OECD_TP_METHODS) expect(OECD_TP_METHOD_LABEL[m]).toBeTruthy()
    expect(OECD_TP_METHOD_OPTIONS).toHaveLength(OECD_TP_METHODS.length)
  })

  it('enumerates the BEPS Action 13 documentation file types', () => {
    expect(BEPS_TP_FILE_TYPES).toEqual([
      'master_file',
      'local_file',
      'cbcr',
      'benchmark',
      'apa',
      'tp_adjustment',
    ])
    for (const f of BEPS_TP_FILE_TYPES) expect(BEPS_TP_FILE_TYPE_LABEL[f]).toBeTruthy()
    expect(BEPS_TP_FILE_TYPE_OPTIONS).toHaveLength(BEPS_TP_FILE_TYPES.length)
  })

  it('option rows pair each value with its label', () => {
    const m0: { label: string; value: OecdTpMethod } = OECD_TP_METHOD_OPTIONS[0]
    expect(m0).toEqual({ value: 'cup', label: OECD_TP_METHOD_LABEL['cup'] })
    const f0: { label: string; value: BepsTpFileType } = BEPS_TP_FILE_TYPE_OPTIONS[0]
    expect(f0).toEqual({
      value: 'master_file',
      label: BEPS_TP_FILE_TYPE_LABEL['master_file'],
    })
  })

  it('CbCR and Pillar Two share the €750m consolidated-revenue threshold', () => {
    expect(CBCR_REVENUE_THRESHOLD_EUR).toBe(750_000_000)
    expect(PILLAR_TWO_REVENUE_THRESHOLD_EUR).toBe(750_000_000)
    expect(PILLAR_TWO_REVENUE_THRESHOLD_EUR).toBe(CBCR_REVENUE_THRESHOLD_EUR)
  })
})
