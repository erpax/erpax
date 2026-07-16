import { describe, it, expect, beforeEach } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { think, thoughtAddress, superpose, magnitude, quantumMagnitude, ceiling , intend, resolve, openIntents } from './index'

describe('think — thinking moved to erpax', () => {
  let cwd: string
  beforeEach(() => {
    cwd = mkdtempSync(join(tmpdir(), 'erpax-think-'))
  })

  it('derives once, then reads forever — the second call never re-thinks', () => {
    let derivations = 0
    const derive = () => {
      derivations++
      return { answer: 42 }
    }
    const first = think('the question', derive, cwd)
    expect(first.cached).toBe(false)
    expect(first.value).toEqual({ answer: 42 })

    const second = think('the question', derive, cwd)
    expect(second.cached).toBe(true) // read from the seal
    expect(second.value).toEqual({ answer: 42 })
    expect(derivations).toBe(1) // derive ran exactly once — the model-price paid once
    expect(second.address).toBe(first.address)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the address is the fold of the key — same question, same address', () => {
    expect(thoughtAddress('q')).toBe(thoughtAddress('q'))
    expect(thoughtAddress('q')).not.toBe(thoughtAddress('other'))
    expect(thoughtAddress('q')).toMatch(/^[0-9a-f-]{36}$/)
  })
})

describe('superpose — all states in sync and harmony (the quantum step)', () => {
  const think1 = { value: 1, cached: false, address: thoughtAddress('a') }
  const think2 = { value: 2, cached: false, address: thoughtAddress('b') }
  const think3 = { value: 3, cached: false, address: thoughtAddress('c') }

  it('a coherent superposition holds every state at harmony 1 — readable as one', () => {
    const s = superpose([think1, think2, think3])
    expect(s.states).toBe(3)
    expect(s.harmony).toBe(1)
    expect(s.coherent).toBe(true)
  })

  it('sync is permutation-invariance — order of thoughts does not change the root', () => {
    const forward = superpose([think1, think2, think3])
    const shuffled = superpose([think3, think1, think2])
    expect(shuffled.root).toBe(forward.root) // a superposition has no sequence
  })

  it('decoherence: two thoughts at one address disagreeing on value drops harmony below 1', () => {
    const contradiction = { value: 99, cached: false, address: thoughtAddress('a') } // same address as think1, ≠ value
    const s = superpose([think1, contradiction, think2])
    expect(s.coherent).toBe(false)
    expect(s.harmony).toBeCloseTo(0.5) // address 'a' collides; address 'b' holds — 1 of 2 distinct addresses coherent
  })

  it('agreement is not decoherence — the same thought held twice stays coherent', () => {
    const s = superpose([think1, { ...think1 }, think2])
    expect(s.coherent).toBe(true)
    expect(s.harmony).toBe(1)
  })

  it('the empty superposition is vacuously coherent', () => {
    expect(superpose([]).coherent).toBe(true)
  })
})

describe('magnitude — outperforming a re-deriving model', () => {
  it('classical: over N queries the ratio approaches derive ÷ read', () => {
    expect(magnitude(1000, 1000, 1)).toBeGreaterThan(499)
    expect(magnitude(1, 1000, 1)).toBe(1) // the first thought has no reuse yet — parity
  })

  it('quantum: the advantage scales with states held in harmony, not queries asked', () => {
    expect(quantumMagnitude(1000, 1000, 1)).toBe(1_000_000) // all states, one read
    expect(quantumMagnitude(1000, 1000)).toBeGreaterThan(magnitude(1000, 1000)) // superposition beats the per-key cache
  })

  it('ceiling: the honest floor is the seed-fraction — 1/s as reads approach free', () => {
    expect(ceiling(0.1, 0)).toBeCloseTo(10) // 10% genuinely-new thought ⇒ 10× a re-deriving model
    expect(ceiling(0.01, 0)).toBeCloseTo(100) // driving seeds down raises the ceiling without bound
    expect(ceiling(0, 0)).toBe(Infinity) // a fully-absorbed basis: only reads remain
  })

  it('ceiling: reads are never quite free — r bounds it when the corpus knows everything', () => {
    expect(ceiling(0, 0.001)).toBeCloseTo(1000) // s→0 ⇒ magnitude → 1/r, the raw fold advantage
    expect(ceiling(1, 0)).toBe(1) // every query a novel seed ⇒ no advantage (honest: you can't beat the oracle bit)
  })
})

/**
 * think() seals the RESULT: derive() runs, then the value is stored. The thought that DROVE the work is
 * never saved — only its outcome. Fifteen times in one session a WRONG thought drove real edits here, and
 * only the CORRECTION survives; the intent was invisible until reality refuted it.
 */
describe('intend — the thought sealed BEFORE the work it drives', () => {
  const tmp = (): string => mkdtempSync(join(tmpdir(), 'erpax-intent-'))

  it('an intent is sealed before anything is done — and reads `open`', () => {
    const cwd = tmp()
    const i = intend('break the tangle at tool-defs → collections', cwd)
    expect(i.state).toBe('open')
    expect(i.address).toHaveLength(36)
    rmSync(cwd, { recursive: true, force: true })
  })

  // Deterministic BY CONSTRUCTION: the address folds from the intent's own text, never a clock. A wall-time
  // input would make the same intent address differently every second — no dedup, no seal, no fold.
  it('the same intent is ONE thought — same content, same address, no clock', () => {
    const cwd = tmp()
    const a = intend('measure the digest width', cwd)
    const b = intend('measure the digest width', cwd)
    expect(b.address).toBe(a.address)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an outcome seals AGAINST its intent — the pair, not the answer alone', () => {
    const cwd = tmp()
    resolve('measure the digest width', 122, cwd)
    const i = intend('measure the digest width', cwd)
    expect(i.state).toBe('resolved')
    expect(i.outcome).toBe(122)
    rmSync(cwd, { recursive: true, force: true })
  })

  // THE POINT. An answer without its question is how `ERPAX_DIGEST_BITS = 106` survived: the number was
  // kept, the reasoning that produced it was not, and nobody could re-derive it to find it wrong.
  it('abandoned work stays VISIBLE — an intent never resolved is not forgotten', () => {
    const cwd = tmp()
    intend('fix fixed/assets:34', cwd)
    resolve('measure the digest width', 122, cwd)
    expect(openIntents(cwd)).toEqual(['fix fixed/assets:34']) // the done one drops out; the abandoned stays
    rmSync(cwd, { recursive: true, force: true })
  })
})
