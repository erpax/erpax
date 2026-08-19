import { describe, it, expect } from 'vitest'
import { bgContractOffline, checkBnb, checkTr } from './index'

/**
 * Proven against REAL captures from the working endpoints. Both addresses were
 * dead until 2026-08-19 (БНБ served HTML, TR served 404), so these fixtures
 * replace the reconstructions that stood in while nothing answered.
 */

const HEADER_ROW =
  '<ROW><F_ORDER>0</F_ORDER><NAME_>Currency</NAME_><CODE>Code</CODE>' +
  '<REVERSERATE>Euro per unit of foreign currency</REVERSERATE>' +
  '<RATE>Foreign currency per 1 euro</RATE><CURR_DATE>Date</CURR_DATE></ROW>'
const dataRow = (code: string, rev: string, rate: string, day = '19.08.2026') =>
  `<ROW><F_ORDER>1</F_ORDER><CODE>${code}</CODE><REVERSERATE>${rev}</REVERSERATE>` +
  `<RATE>${rate}</RATE><CURR_DATE>${day}</CURR_DATE></ROW>`
const feed = (rows: string) => `<ROWSET>${HEADER_ROW}${rows}</ROWSET>`

describe('outward/bg — the captured fixtures satisfy what erpax parses', () => {
  it('both BG rails hold against their fixture', () => {
    for (const c of bgContractOffline()) expect(c.holds, `${c.rail}: ${c.detail}`).toBe(true)
  })
})

describe('outward/bg — БНБ', () => {
  it('refuses the WAF error page — HTML arrives under a 200, not a 4xx', () => {
    expect(checkBnb('<!DOCTYPE html><html><head><title>Error</title></head></html>').holds).toBe(false)
  })

  it('refuses a header-only feed — every CODE is a column label, not a currency', () => {
    const c = checkBnb(feed(''))
    expect(c.holds).toBe(false)
    expect(c.detail).toMatch(/header-only|no data rows/)
  })

  it('does NOT read the header row as a currency', () => {
    const c = checkBnb(feed(dataRow('USD', '0.8639', '1.1576')))
    expect(c.holds).toBe(true)
    expect(c.detail).toContain('USD')
    expect(c.detail).not.toContain('Code')
  })

  it('refuses the lev-era shape — RATIO is gone and REVERSERATE is required', () => {
    const legacy = '<ROWSET><ROW><CODE>USD</CODE><RATIO>1</RATIO><RATE>1.83456</RATE></ROW></ROWSET>'
    expect(checkBnb(legacy).holds).toBe(false)
  })

  it('requires CURR_DATE — the date is what the fixing is valid FOR', () => {
    const undated = '<ROWSET><ROW><CODE>USD</CODE><REVERSERATE>0.86</REVERSERATE><RATE>1.15</RATE></ROW></ROWSET>'
    expect(checkBnb(undated).holds).toBe(false)
  })

  it('pins DD.MM.YYYY — an ISO-shaped date is NOT what this feed sends', () => {
    // Assuming ISO here is what made the client silently date a fixing "today".
    expect(checkBnb(feed(dataRow('USD', '0.8639', '1.1576', '2026-08-19'))).holds).toBe(false)
  })
})

describe('outward/bg — Търговски Регистър', () => {
  const deed = (over: Record<string, unknown> = {}) =>
    JSON.stringify([
      {
        incomingNumber: '20260817102911',
        incomingLinkedDeeds: [
          {
            uic: '831641791',
            companyName: 'ИНФОРМАЦИОННО ОБСЛУЖВАНЕ',
            companyFullName: '"ИНФОРМАЦИОННО ОБСЛУЖВАНЕ" АД',
            legalForm: 5,
            status: 2,
            ...over,
          },
        ],
      },
    ])

  it('refuses the SPA shell — the portal answers 200 with HTML for a wrong path', () => {
    expect(checkTr('<!DOCTYPE html><html><title>ЕПЗЕУ</title>').holds).toBe(false)
  })

  it('refuses a дело with no заявления', () => {
    expect(checkTr('[]').holds).toBe(false)
  })

  it('refuses заявления carrying no linked deed — the identity lives there', () => {
    expect(checkTr(JSON.stringify([{ incomingNumber: '1' }])).holds).toBe(false)
  })

  it('parses the merchant off the дело', () => {
    const c = checkTr(deed())
    expect(c.holds).toBe(true)
    expect(c.detail).toContain('ИНФОРМАЦИОННО ОБСЛУЖВАНЕ')
  })

  it('refuses a status that is not a code', () => {
    expect(checkTr(deed({ status: 'active' })).holds).toBe(false)
  })
})
