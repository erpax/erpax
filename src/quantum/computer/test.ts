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
