import { describe, expect, it } from 'vitest'
import type { FiscalPeriodConfig } from '@/fiscal/period/resolver'
import { chainLeaf, regulatoryCode } from './index'

const config = (regulatoryFramework: FiscalPeriodConfig['regulatoryFramework'], periodType: FiscalPeriodConfig['periodType'] = 'monthly'): FiscalPeriodConfig => ({
  fiscalYearStartMonth: 1,
  fiscalYearStartDay: 1,
  periodType,
  regulatoryFramework,
  leapYearAdjustment: 'none',
  localeCode: 'en-US',
  countryCode: 'BG',
})

describe('fiscal/period/resolver/code — regulatory code', () => {
  it('pads the period to two digits under every framework, and XBRL names a quarterly period Q', () => {
    expect(regulatoryCode(config('saf-t'), 2026, 5)).toBe('P05_2026')
    expect(regulatoryCode(config('ias-ifrs'), 2026, 12)).toBe('P12_2026')
    expect(regulatoryCode(config('xbrl', 'quarterly'), 2026, 2)).toBe('Q2_2026')
    expect(regulatoryCode(config('xbrl', 'monthly'), 2026, 2)).toBe('P02_2026')
  })
})

describe('fiscal/period/resolver/code — the chain leaf is the fold, not a base64 window', () => {
  const a = JSON.stringify({ calendarDate: '2026-05-12', fiscalYear: 2026, fiscalPeriod: 5, regulatoryCode: 'P05_2026' })
  const b = JSON.stringify({ calendarDate: '2026-05-31', fiscalYear: 2026, fiscalPeriod: 5, regulatoryCode: 'P05_2026' })

  it('two dates in one month are two leaves — the old 24-byte window made them one', () => {
    expect(chainLeaf(a, 'prior')).not.toBe(chainLeaf(b, 'prior'))
  })

  it('the prior leaf chains: the same payload after a different prior is a different leaf', () => {
    expect(chainLeaf(a, 'prior-1')).not.toBe(chainLeaf(a, 'prior-2'))
  })

  it('a rewritten fiscal year moves the leaf, and the leaf is not the plaintext', () => {
    expect(chainLeaf(a, 'p')).not.toBe(chainLeaf(a.replace('2026', '9999'), 'p'))
    expect(chainLeaf(a, 'p')).not.toContain('calendarDate')
    expect(chainLeaf(a, 'p')).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('is deterministic — the same payload and prior fold to the same leaf', () => {
    expect(chainLeaf(a, 'p')).toBe(chainLeaf(a, 'p'))
  })
})
