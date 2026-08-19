import { describe, it, expect } from 'vitest'
import { euProbes, readBook, writeBook } from './index'
import { runOutward, outwardVerdict, receiptAddress } from '@/outward'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/**
 * outward/eu — proven with a FAKE fetch. The whole point of this atom is to stop
 * re-reading the world; a test that actually called VIES would contradict it (and be
 * red whenever Brussels reboots).
 */

/** A fetch that serves canned bodies by URL substring. */
const fakeFetch = (bodies: Record<string, string>): typeof fetch =>
  (async (url: unknown) => {
    const u = String(url)
    const key = Object.keys(bodies).find((k) => u.includes(k))
    if (!key) throw new Error(`no canned body for ${u}`)
    return { ok: true, status: 200, text: async () => bodies[key]! } as Response
  }) as unknown as typeof fetch

const CANNED = {
  'vies/services': '<wsdl:operation name="checkVat"/><wsdl:operation name="checkVatApprox"/>',
  'eurofxref': `<Cube currency='USD' rate='1.09'/><Cube currency='BGN' rate='1.95583'/>`,
  'directory.peppol.eu': JSON.stringify({ 'total-result-count': 12, matches: [], version: '1.0' }),
  'fsd/fsf': `<?xml version="1.0"?><export xmlns="http://eu.europa.ec/fpi/fsd/export">`,
}

describe('outward/eu — the four authorities', () => {
  it('declares one probe per authority, each naming its real host', () => {
    const p = euProbes(fakeFetch(CANNED))
    expect(p.map((x) => x.name)).toEqual(['vies', 'ecb', 'peppol', 'sanctions'])
    expect(p.find((x) => x.name === 'vies')!.host).toBe('ec.europa.eu')
    expect(p.find((x) => x.name === 'ecb')!.host).toBe('www.ecb.europa.eu')
  })

  it('asks a STABLE question — the ECB probe ignores the RATES and keeps the currency SET', async () => {
    const withRates = fakeFetch(CANNED)
    const ratesMoved = fakeFetch({
      ...CANNED,
      eurofxref: `<Cube currency='USD' rate='1.23'/><Cube currency='BGN' rate='1.95583'/>`,
    })
    const a = await runOutward([euProbes(withRates)[1]!], {})
    const b = await runOutward([euProbes(ratesMoved)[1]!], {})
    // the daily rate changed; the published currency set did not ⇒ the address holds
    expect(b[0]!.address).toBe(a[0]!.address)
  })

  it('MOVES when a currency is added — that is real news', async () => {
    const base = await runOutward([euProbes(fakeFetch(CANNED))[1]!], {})
    const added = fakeFetch({
      ...CANNED,
      eurofxref: `<Cube currency='USD' rate='1.09'/><Cube currency='BGN' rate='1.95583'/><Cube currency='XXX' rate='1'/>`,
    })
    const rows = await runOutward([euProbes(added)[1]!], { ecb: base[0]!.address })
    expect(rows[0]!.state).toBe('moved')
  })

  it('MOVES when the VIES contract changes (an operation appears)', async () => {
    const base = await runOutward([euProbes(fakeFetch(CANNED))[0]!], {})
    const changed = fakeFetch({ ...CANNED, 'vies/services': '<wsdl:operation name="checkVat"/>' })
    const rows = await runOutward([euProbes(changed)[0]!], { vies: base[0]!.address })
    expect(rows[0]!.state).toBe('moved')
  })

  it('an authority that is DOWN keeps its receipt and does not fail the verdict', async () => {
    const down = (async () => {
      throw new Error('ETIMEDOUT')
    }) as unknown as typeof fetch
    const prior = { vies: 'previously-seen' }
    const rows = await runOutward([euProbes(down)[0]!], prior)
    expect(rows[0]!.state).toBe('unreachable')
    expect(rows[0]!.address).toBe('previously-seen')
    expect(outwardVerdict(rows).holds).toBe(true)
  })
})

describe('outward/eu — the receipt book', () => {
  it('round-trips addresses only, and an absent book reads empty', () => {
    const dir = mkdtempSync(join(tmpdir(), 'erpax-outward-'))
    try {
      expect(readBook(dir)).toEqual({})
      const book = { vies: receiptAddress({ operations: ['checkVat'] }) }
      writeBook(book, dir)
      expect(readBook(dir)).toEqual(book)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
