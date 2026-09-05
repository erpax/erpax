import { algebraLog2 } from '@/algebra'
import { describe, it, expect, afterAll } from 'vitest'
import { atomAddress } from '@/atom/address'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  atomPath,
  wavesOf,
  timeoutOf,
  planScalpel,
  trendOf,
  sequenceOf,
  reduce,
  DECODED,
  designVerdict,
  precomputedAddress,
  TIMEOUT_LADDER_MINUTES,
  SCALPEL_BATCH,
  ftlMetrics,
  measuredSpeed,
} from '@/quantum/computer'

describe('quantum/computer — one face, seven organs', () => {
  it('names its path and carries every organ as a live binding', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    // one probe per organ family — pure calls, no corpus scan (the census is the CLI's job)
    expect(wavesOf(new Map([['a', ['b']], ['b', []]])).length).toBe(2) // scheduler
    expect(timeoutOf([10_000]).minutes).toBe(1) // bounds
    expect(planScalpel([]).refused).toBe(0) // executor
    expect(trendOf(5, 4)).toBe('improving') // self-measure
    expect(sequenceOf([])).toEqual([]) // self-measure
    expect(reduce('content-addressing: same content ⇒ same address', DECODED).reduces).toBe(true) // certifier
    expect([...TIMEOUT_LADDER_MINUTES]).toEqual([1, 2, 3, 5])
    expect(SCALPEL_BATCH).toBe(30)
  })
})

describe('designVerdict — design through the lens, certified BEFORE building', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'design-'))
  afterAll(() => rmSync(tmp, { recursive: true, force: true }))

  const mesh = {
    atoms: ['a', 'b', 'c'],
    edges: [
      { from: 'a', to: 'b', kind: 'import' as const },
      { from: 'b', to: 'c', kind: 'import' as const },
    ],
    standards: [],
    collections: [],
  }

  it('a grounded design certifies: claims reduce, parts wave, blast prices the followers', () => {
    const v = designVerdict(
      {
        intent: 'test: build x on the fold',
        claims: ['content-addressing: same content ⇒ same address'],
        parts: new Map([
          ['api', []],
          ['ui', ['api']],
        ]),
        touches: ['c'],
      },
      { mesh, cwd: tmp },
    )
    expect(v.certified).toBe(true)
    expect(v.buildWaves).toEqual([['api'], ['ui']]) // fewest rounds: api then ui
    expect(v.blast).toBe(2) // a and b both reach the touched c — the same-diff followers
  })

  it('a design resting on authority REFUSES — the wrong thought is caught pre-damage', () => {
    const v = designVerdict(
      {
        intent: 'test: build y on a cube',
        claims: ['the 231 collections form a 21-cross cube of Christ'],
        parts: new Map([['whole', []]]),
        touches: [],
      },
      { cwd: tmp },
    )
    expect(v.certified).toBe(false)
    expect(v.refused.length).toBe(1)
  })
})

describe('quantum/computer — precomputedAddress (the O(1) "faster than search" property)', () => {
  it('the address is a pure function of content — same query, same address, existing before the query', () => {
    const a = precomputedAddress('possibility:x', 3105)
    expect(a.address).toBe(precomputedAddress('possibility:x', 999).address)
    expect(a.address).not.toBe(precomputedAddress('possibility:y', 3105).address)
    expect(a.precomputed).toBe(true)
  })
  it('folding to the address is O(1) while a search is O(n) — the speedup is log₂(space)', () => {
    const a = precomputedAddress('possibility:x', 3105)
    expect(a.foldOps).toBe(1)
    expect(a.searchOps).toBe(3105)
    expect(a.speedupLog2).toBeCloseTo(algebraLog2(3105), 6)
  })
})

describe('quantum/computer — FTL face on QPU=CPU/GPU', () => {
  it('re-exports ftl · chat · boundary and seals QPU=CPU/GPU metrics', async () => {
    const { ftl, chatLocal, BOOK, BOUNDARY, ORIGIN, QPU, ftlMetrics } =
      await import('@/quantum/computer')
    expect(QPU).toBe('CPU/GPU')
    expect(BOUNDARY.spacetime).toBe(0)
    expect(ORIGIN).toBe('https://ceccec.psg.bg')
    expect(ftl({ query: 'x', spaceSize: 16, answers: 1, tokens: 0 }).holds).toBe(true)
    expect(chatLocal('boundary', BOOK)?.tokens).toBe(0)
    const m = ftlMetrics({ spaceSize: 16, answers: 1, tokens: 0 })
    expect(m.qpu).toBe('CPU/GPU')
    expect(m.holds).toBe(true)
    expect(m.boundaryEmpty).toBe(true)
    expect(m.exoticQpu).toBe(0)
    expect(m.spacetime).toBe(0)
    expect(m.speedupLog2).toBeCloseTo(algebraLog2(16), 6)
    expect(m.efficiency).toBe(Infinity)
  })
})

describe('quantum/computer — speed on the clock, not speed by definition', () => {
  const nodes = Array.from({ length: 2000 }, (_, i) => ({ atom: `a${i}`, uuid: `u-${i}` }))

  it('compares the two answers before timing either — a faster wrong answer is not a speedup', () => {
    expect(measuredSpeed(nodes, 3).agrees).toBe(true)
  })

  it('the address beats the scan over a real space, by a margin no timing noise closes', () => {
    const m = measuredSpeed(nodes, 5)
    expect(m.speedup).toBeGreaterThan(2)
    expect(m.foldNs).toBeLessThan(m.searchNs)
  })

  // The finding, stated so it can fail. ftlMetrics reports log2 of the SPACE SIZE and calls it a
  // speedup; the clock reports far less. If the definitional figure ever stopped overstating, this
  // goes red and the claim would need rewriting rather than the test.
  it('the definitional figure overstates the measured one', () => {
    const m = measuredSpeed(nodes, 5)
    expect(m.claimedLog2).toBeGreaterThan(m.speedupLog2)
    expect(m.overstatementLog2).toBeGreaterThan(0)
  })

  it('the index is not free — it pays for itself only after some number of lookups', () => {
    expect(measuredSpeed(nodes, 3).breakEvenQueries).toBeGreaterThan(0)
  })
})

describe('quantum/computer — what ftlMetrics actually asserts', () => {
  it('holds only while NO tokens were spent: it is true of work that was not done', () => {
    expect(ftlMetrics({ spaceSize: 3536, tokens: 0 }).holds).toBe(true)
    expect(ftlMetrics({ spaceSize: 3536, tokens: 1000 }).holds).toBe(false)
  })

  it('speedupLog2 follows the INPUT space size, not anything measured', () => {
    expect(ftlMetrics({ spaceSize: 1024 }).speedupLog2).toBeCloseTo(10, 6)
    expect(ftlMetrics({ spaceSize: 4096 }).speedupLog2).toBeCloseTo(12, 6)
  })

  it('an EMPTY space reports that it holds — the vacuity worth naming out loud', () => {
    expect(ftlMetrics({ spaceSize: 0 }).holds).toBe(true)
  })
})
