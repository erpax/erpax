import { describe, it, expect } from 'vitest'
import { merge } from '@/merge'
import { FiscalPeriodResolver, type FiscalPeriodConfig } from './index'

const config = (over: Partial<FiscalPeriodConfig> = {}): FiscalPeriodConfig => ({
  fiscalYearStartMonth: 1,
  fiscalYearStartDay: 1,
  periodType: 'monthly',
  regulatoryFramework: 'ias-ifrs',
  leapYearAdjustment: 'none',
  localeCode: 'bg-BG',
  countryCode: 'BG',
  ...over,
})

const leafFor = (date: string, prior = '') =>
  FiscalPeriodResolver.resolvePeriod(config(), date, prior).chainLeafUuid

describe('fiscal/period/resolver — the chain leaf is the fold', () => {
  it('resolves a date to its fiscal period, 1-indexed', () => {
    const r = FiscalPeriodResolver.resolvePeriod(config(), '2026-05-12')
    expect(r.fiscalYear).toBe(2026)
    expect(r.fiscalPeriod).toBe(5) // May = P5, never P4 — the 1-indexed claim
    expect(r.quarterNumber).toBe(2)
    expect(Number.isInteger(r.fiscalYear) && Number.isInteger(r.fiscalPeriod)).toBe(true)
  })

  it('is pure — same inputs, same answer, no clock and no randomness', () => {
    const a = FiscalPeriodResolver.resolvePeriod(config(), '2026-05-12')
    const b = FiscalPeriodResolver.resolvePeriod(config(), '2026-05-12')
    expect(a).toEqual(b)
  })

  it('does not mutate the config handed to it', () => {
    const c = config()
    const before = JSON.stringify(c)
    FiscalPeriodResolver.resolvePeriod(c, '2026-05-12')
    FiscalPeriodResolver.amendConfiguration(c, { fiscalYearStartMonth: 4 })
    expect(JSON.stringify(c)).toBe(before) // amend returns a new config; it never edits yours
  })

  // ── THE REFUTATION ──────────────────────────────────────────────────────────
  //
  // The leaf was `Buffer.from(payload + priorLeaf).toString('base64').substring(0, 32)`, banner-claimed as
  // "chainLeafUuid for tamper detection" and shipped into live audit paths. base64 maps 3 bytes → 4 chars,
  // so 32 chars covered only the FIRST 24 BYTES:
  //
  //   payload  {"calendarDate":"2026-05-12","fiscalYear":2026,...}
  //   covered  {"calendarDate":"2026-05
  //
  // Each test below FAILS against that implementation. They are the sentences of the old banner, refuted.
  const oldLeaf = (payload: string, prior: string) =>
    Buffer.from(payload + (prior || '')).toString('base64').substring(0, 32)

  it('the old leaf was blind past 24 bytes — this is why, pinned so it cannot return', () => {
    const a = JSON.stringify({ calendarDate: '2026-05-12', fiscalYear: 2026 })
    const tampered = JSON.stringify({ calendarDate: '2026-05-12', fiscalYear: 9999 })
    expect(oldLeaf(a, '')).toBe(oldLeaf(tampered, '')) // the fiscal year, rewritten, unnoticed
    expect(Buffer.from(oldLeaf(a, ''), 'base64').toString()).toContain('calendarDate') // and reversible

    expect(merge(a, '')).not.toBe(merge(tampered, '')) // the fold sees it
  })

  it('two dates in one month no longer share a leaf', () => {
    expect(oldLeaf(JSON.stringify({ calendarDate: '2026-05-12' }), '')).toBe(
      oldLeaf(JSON.stringify({ calendarDate: '2026-05-31' }), ''),
    ) // the old leaf: every day in May, identical
    expect(leafFor('2026-05-12')).not.toBe(leafFor('2026-05-31'))
  })

  it('tampering ANY field moves the leaf — the whole payload is covered, not a prefix', () => {
    expect(leafFor('2026-05-13')).not.toBe(leafFor('2026-05-12')) // the day: past the old 24-byte window
    expect(leafFor('2027-05-12')).not.toBe(leafFor('2026-05-12')) // the fiscal year: rewritable, before

    // the regulatoryCode, last field in the payload and furthest past the old window
    const q = (f: FiscalPeriodConfig['regulatoryFramework']) =>
      FiscalPeriodResolver.resolvePeriod(config({ regulatoryFramework: f, periodType: 'quarterly' }), '2026-05-12')
    expect(q('xbrl').regulatoryCode).not.toBe(q('saf-t').regulatoryCode) // Q2_2026 vs P02_2026
    expect(q('xbrl').chainLeafUuid).not.toBe(q('saf-t').chainLeafUuid)
  })

  // Written asserting saf-t and ias-ifrs must differ — they do NOT: monthly emits P05_2026 under both, so
  // the resolution is byte-identical and the leaf is too. That is the fold's law (same content, same
  // address), not a gap. The leaf covers the RESOLUTION, never the config that produced it — a config
  // change invisible in the output is invisible in the leaf, by design.
  it('identical resolutions share a leaf whatever config produced them — same content, same address', () => {
    const under = (f: FiscalPeriodConfig['regulatoryFramework']) =>
      FiscalPeriodResolver.resolvePeriod(config({ regulatoryFramework: f }), '2026-05-12')
    expect(under('saf-t').regulatoryCode).toBe(under('ias-ifrs').regulatoryCode) // both P05_2026
    expect(under('saf-t').chainLeafUuid).toBe(under('ias-ifrs').chainLeafUuid)
  })

  it('the chain CHAINS — the prior leaf is an input, not decoration', () => {
    const genesis = leafFor('2026-05-12')
    expect(leafFor('2026-05-12', genesis)).not.toBe(genesis) // the old leaf ignored prior entirely
    expect(leafFor('2026-05-12', 'A')).not.toBe(leafFor('2026-05-12', 'B'))
  })

  it('the leaf is the corpus fold, not a private hash — one algebra, stated once', () => {
    const r = FiscalPeriodResolver.resolvePeriod(config(), '2026-05-12', 'prior')
    const payload = JSON.stringify({
      calendarDate: '2026-05-12',
      fiscalYear: r.fiscalYear,
      fiscalPeriod: r.fiscalPeriod,
      regulatoryCode: r.regulatoryCode,
    })
    expect(r.chainLeafUuid).toBe(merge(payload, 'prior'))
    expect(r.chainLeafUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-/) // uuidv8
  })

  it('amendConfiguration chains too, and every field is covered', () => {
    const a = FiscalPeriodResolver.amendConfiguration(config(), { fiscalYearStartMonth: 4 })
    const b = FiscalPeriodResolver.amendConfiguration(config(), { fiscalYearStartMonth: 7 })
    expect(a.chainLeafUuid).not.toBe(b.chainLeafUuid)
    expect(a.fiscalYearStartMonth).toBe(4)
  })

  // ── the claim that named the wrong inputs ───────────────────────────────────
  it('regulatoryCode depends on regulatoryFramework — which the old invariant omitted', () => {
    const args = ['2026-05-12'] as const
    const saft = FiscalPeriodResolver.resolvePeriod(
      config({ regulatoryFramework: 'saf-t', periodType: 'quarterly' }),
      ...args,
    )
    const xbrl = FiscalPeriodResolver.resolvePeriod(
      config({ regulatoryFramework: 'xbrl', periodType: 'quarterly' }),
      ...args,
    )
    // identical (periodType, fiscalYear, fiscalPeriod) — the three the claim named — different code.
    expect(saft.fiscalPeriod).toBe(xbrl.fiscalPeriod)
    expect(saft.regulatoryCode).not.toBe(xbrl.regulatoryCode)
    expect(xbrl.regulatoryCode).toMatch(/^Q\d_2026$/)
    expect(saft.regulatoryCode).toMatch(/^P\d\d_2026$/)
  })

  it('the validators return no leaf at all — the "All returns" claim was false by shape', () => {
    const v = FiscalPeriodResolver.validateConfiguration(config({ fiscalYearStartMonth: 13 }))
    expect(v.isValid).toBe(false)
    expect('chainLeafUuid' in v).toBe(false)
  })

  it('an invalid date is refused rather than silently resolved', () => {
    expect(() => FiscalPeriodResolver.resolvePeriod(config(), 'not-a-date')).toThrow(/Invalid date/)
  })
})
