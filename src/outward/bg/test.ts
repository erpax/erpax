import { describe, it, expect } from 'vitest'
import { bgContractOffline, checkBnb, checkTr } from './index'

describe('outward/bg — the frozen fixtures satisfy what erpax parses', () => {
  it('both BG rails hold against their fixture', () => {
    for (const c of bgContractOffline()) expect(c.holds, `${c.rail}: ${c.detail}`).toBe(true)
  })
})

describe('outward/bg — each check FAILS on the real break', () => {
  it('bnb: an HTML page (what the live endpoint now returns) is refused', () => {
    expect(checkBnb('<!DOCTYPE HTML><html><head>…</head></html>').holds).toBe(false)
  })

  it('bnb: RATIO=0 is refused — the client divides by it', () => {
    expect(checkBnb('<ROW><CODE>USD</CODE><RATIO>0</RATIO><RATE>1.7</RATE></ROW>').holds).toBe(false)
  })

  it('bnb: a valid row parses, RATIO respected', () => {
    const c = checkBnb('<ROW><CODE>JPY</CODE><RATIO>100</RATIO><RATE>1.05</RATE></ROW>')
    expect(c.holds).toBe(true)
    expect(c.detail).toContain('100')
  })

  it('tr: a 404 HTML page is refused', () => {
    expect(checkTr('<html>404</html>').holds).toBe(false)
  })

  it('tr: JSON missing name or status is refused', () => {
    expect(checkTr('{"status":"active"}').holds).toBe(false)
    expect(checkTr('{"name":"X"}').holds).toBe(false)
    expect(checkTr('{"name":"X","status":"active"}').holds).toBe(true)
  })
})
