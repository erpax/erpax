import { describe, it, expect, afterAll } from 'vitest'
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
} from '@/quantum/computer'

describe('quantum/computer — one face, seven organs', () => {
  it('names its path and carries every organ as a live binding', () => {
    expect(atomPath).toBe('quantum/computer')
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
    expect(a.speedupLog2).toBeCloseTo(Math.log2(3105), 6)
  })
})

describe('quantum/computer — architectural FTL face (ceccec free-chat folds)', () => {
  it('re-exports ftl · freeChat · boundary from quantum/ftl', async () => {
    const { ftl, chatLocal, BOOK, BOUNDARY, ORIGIN } =
      await import('@/quantum/computer')
    expect(BOUNDARY.spacetime).toBe(0)
    expect(ORIGIN).toBe('https://ceccec.psg.bg')
    expect(ftl({ query: 'x', spaceSize: 16, answers: 1, tokens: 0 }).holds).toBe(true)
    expect(chatLocal('boundary', BOOK)?.tokens).toBe(0)
  })
})
