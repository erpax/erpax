import { describe, it, expect } from 'vitest'
import {
  worldContractOffline,
  checkBrreg,
  checkOfac,
  checkSecEdgar,
  checkFrankfurter,
  checkExchangeRateApi,
  checkOpenFoodFacts,
} from './index'

/**
 * Proven against REAL captures taken with the exact request each client makes.
 * Nothing here reaches the network — the online lane is `erpax outward world --online`.
 */

describe('outward/world — the captured fixtures satisfy what erpax parses', () => {
  it('every world rail holds against its fixture', () => {
    const checks = worldContractOffline()
    expect(checks).toHaveLength(6)
    for (const c of checks) expect(c.holds, `${c.rail}: ${c.detail}`).toBe(true)
  })
})

describe('outward/world — a 200 carrying a failure is the trap', () => {
  it('off: status 0 under a 200 is a MISS, not an empty product', () => {
    const miss = JSON.stringify({ status: 0 })
    expect(checkOpenFoodFacts(miss).holds).toBe(false)
    expect(checkOpenFoodFacts(miss).detail).toMatch(/status 0/)
  })

  it('erapi: result "error" under a 200 is a failure, not data', () => {
    const c = checkExchangeRateApi(JSON.stringify({ result: 'error', 'error-type': 'unsupported-code' }))
    expect(c.holds).toBe(false)
    expect(c.detail).toMatch(/200 can carry an error/)
  })

  it('every check refuses HTML served under a 200', () => {
    const html = '<!DOCTYPE html><html><body>error</body></html>'
    for (const check of [checkBrreg, checkSecEdgar, checkFrankfurter, checkExchangeRateApi, checkOpenFoodFacts]) {
      expect(check(html).holds).toBe(false)
    }
  })
})

describe('outward/world — brreg', () => {
  const base = { navn: 'EQUINOR ASA', organisasjonsform: { kode: 'ASA' }, registrertIMvaregisteret: true }

  it('reads the NESTED organisasjonsform.kode, not a flat field', () => {
    expect(checkBrreg(JSON.stringify({ ...base, organisasjonsform: 'ASA' })).holds).toBe(false)
    expect(checkBrreg(JSON.stringify(base)).holds).toBe(true)
  })

  it('refuses a non-boolean MVA flag', () => {
    expect(checkBrreg(JSON.stringify({ ...base, registrertIMvaregisteret: 'true' })).holds).toBe(false)
  })
})

describe('outward/world — ofac', () => {
  const head =
    '<?xml version="1.0" standalone="yes"?><sdnList xmlns="x"><publshInformation>' +
    '<Publish_Date>08/18/2026</Publish_Date><Record_Count>19202</Record_Count>' +
    '</publshInformation>'

  it('accepts the real SDN header', () => {
    expect(checkOfac(head).holds).toBe(true)
  })

  it('refuses a ZERO record count — an empty sanctions list must never read as clean', () => {
    // The consequence if this passed: every counterparty screens as unsanctioned.
    const empty = head.replace('19202', '0')
    expect(checkOfac(empty).holds).toBe(false)
  })

  it('refuses a list with no publication date', () => {
    expect(checkOfac('<sdnList><publshInformation><Record_Count>5</Record_Count></publshInformation>').holds).toBe(false)
  })

  it('refuses an error page in place of the export', () => {
    expect(checkOfac('<!DOCTYPE html><html>Access Denied</html>').holds).toBe(false)
  })
})

describe('outward/world — sec', () => {
  const rec = { cik: '0000320193', entityType: 'operating', filings: { recent: { accessionNumber: ['x'] } } }

  it('requires filings.recent.accessionNumber — the filings index', () => {
    expect(checkSecEdgar(JSON.stringify({ cik: '1', entityType: 'operating', filings: {} })).holds).toBe(false)
    expect(checkSecEdgar(JSON.stringify(rec)).holds).toBe(true)
  })

  it('names the contact-UA requirement when the body is not JSON', () => {
    expect(checkSecEdgar('<html>403</html>').detail).toMatch(/User-Agent/)
  })
})

describe('outward/world — frankfurter', () => {
  it('requires a date — a rate without the day it is valid for is unusable', () => {
    expect(checkFrankfurter(JSON.stringify({ base: 'EUR', rates: { USD: 1.16 } })).holds).toBe(false)
  })

  it('refuses a non-numeric rate', () => {
    expect(checkFrankfurter(JSON.stringify({ base: 'EUR', date: '2026-08-19', rates: { USD: '1.16' } })).holds).toBe(false)
  })

  it('refuses an empty rate table', () => {
    expect(checkFrankfurter(JSON.stringify({ base: 'EUR', date: '2026-08-19', rates: {} })).holds).toBe(false)
  })
})

describe('outward/world — erapi', () => {
  it('reads base_code, NOT base — they are different fields on this API', () => {
    const wrong = { result: 'success', base: 'EUR', rates: { USD: 1.16 } }
    expect(checkExchangeRateApi(JSON.stringify(wrong)).holds).toBe(false)
    const right = { result: 'success', base_code: 'EUR', rates: { USD: 1.16 } }
    expect(checkExchangeRateApi(JSON.stringify(right)).holds).toBe(true)
  })
})
