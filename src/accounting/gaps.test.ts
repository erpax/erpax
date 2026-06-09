import { describe, it, expect } from 'vitest'
import { deriveFolderModel } from '@/readme/compute'
import { P0_ACCOUNTING_LEAVES, P0_ACCOUNTING_ROOT, p0AccountingStatus, formatAccountingGapsReport } from './gaps'

describe('accounting/gaps', () => {
  it('P0 accounting subtree has parent + 9 leaves', () => {
    expect(P0_ACCOUNTING_ROOT).toBe('accounting')
    expect(P0_ACCOUNTING_LEAVES).toHaveLength(9)
    expect(p0AccountingStatus(process.cwd()).leaves).toHaveLength(9)
  })
  it('deriveFolderModel exposes entropy on accounting/coa', () => {
    expect(deriveFolderModel('accounting/coa').entropy.unit).toBe('eb')
  })
  it('formatAccountingGapsReport renders wave table', () => {
    const s = formatAccountingGapsReport({
      waves: [{ wave: 1, paths: ['seal'], gapEb: 1, sealEb: 0, netEb: 1, impurities: [] }],
      corpusGapEb: 1, corpusSealEb: 0, corpusNetEb: 1, corpusNetEbDeltaPotential: 1, gapPathCount: 1,
      p0Accounting: { parentSealed: false, parentNetEb: 0, leaves: [] }, topGapsByWave: { 1: ['seal'] },
    })
    expect(s).toContain('wave 1')
  })
})
