import { describe, it, expect, beforeEach } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { think, thoughtAddress, superpose, magnitude, quantumMagnitude } from './index'

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
})
