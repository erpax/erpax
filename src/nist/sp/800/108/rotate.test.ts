/**
 * Horo-dance key rotation — the refutable proofs.
 *
 * The claims this pins: the dance is a public period-6 cycle (forward ×2,
 * reverse ×5); the KEY never repeats though the ring position does; the ratchet
 * is forward-secret + reproducible; the stateless mode is reproducible without
 * chaining; dimensions and directions are independent; and the secret — never
 * the ring — carries the unpredictability (a missing master yields no key).
 */
import { describe, it, expect } from 'vitest'
import {
  horoPosition,
  horoLabel,
  advanceKey,
  rotateKey,
  foldDimensions,
} from '@/nist/sp/800/108'

const MASTER = 'a-test-master-secret-32-characters!!'

describe('horoPosition — the public, deterministic dance', () => {
  it('forward dances the doubling ring [1,2,4,8,7,5]', () => {
    expect([0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, 'forward'))).toEqual([1, 2, 4, 8, 7, 5])
  })
  it('reverse dances the inverse ring [1,5,7,8,4,2]', () => {
    expect([0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, 'reverse'))).toEqual([1, 5, 7, 8, 4, 2])
  })
  it('has period 6 — the ring position returns', () => {
    for (const e of [0, 1, 2, 3, 7, 13]) expect(horoPosition(e + 6)).toBe(horoPosition(e))
  })
})

describe('rotateKey — the dance returns, the key never does', () => {
  it('ratchet: the ring position repeats at epoch 6 but the key does NOT', () => {
    expect(horoPosition(0)).toBe(horoPosition(6)) // dance returned
    const k0 = rotateKey({ master: MASTER, epoch: 0 })
    const k6 = rotateKey({ master: MASTER, epoch: 6 })
    expect(k0).toBe(MASTER) // epoch 0 = the master itself
    expect(k6).not.toBe(k0) // one-way chain — the key moved on
  })
  it('ratchet: every epoch is a distinct, non-repeating key (forward secrecy shape)', () => {
    const keys = Array.from({ length: 20 }, (_, e) => rotateKey({ master: MASTER, epoch: e }))
    expect(new Set(keys).size).toBe(keys.length)
  })
  it('ratchet: reproducible AND equals the hand-chained advanceKey walk', () => {
    const viaRotate = rotateKey({ master: MASTER, epoch: 3 })
    let manual = MASTER
    for (const e of [1, 2, 3]) manual = advanceKey(manual, e)
    expect(viaRotate).toBe(manual)
    expect(rotateKey({ master: MASTER, epoch: 3 })).toBe(viaRotate) // deterministic
  })
  it('stateless: reproducible from the master at any epoch, each epoch distinct', () => {
    const a = rotateKey({ master: MASTER, epoch: 9, mode: 'stateless' })
    const b = rotateKey({ master: MASTER, epoch: 9, mode: 'stateless' })
    expect(a).toBe(b)
    const seq = [1, 2, 3, 4].map((e) => rotateKey({ master: MASTER, epoch: e, mode: 'stateless' }))
    expect(new Set(seq).size).toBe(seq.length)
    // stateless ≠ ratchet — different construction, different key
    expect(rotateKey({ master: MASTER, epoch: 4, mode: 'stateless' })).not.toBe(rotateKey({ master: MASTER, epoch: 4 }))
  })
})

describe('direction + dimension independence (agnostic)', () => {
  it('forward and reverse yield different keys at the same epoch', () => {
    expect(rotateKey({ master: MASTER, epoch: 3, direction: 'forward' }))
      .not.toBe(rotateKey({ master: MASTER, epoch: 3, direction: 'reverse' }))
  })
  it('different dimensions yield different keys', () => {
    expect(rotateKey({ master: MASTER, epoch: 5, dimension: 'accounting' }))
      .not.toBe(rotateKey({ master: MASTER, epoch: 5, dimension: 'audit' }))
  })
  it('horoLabel is unique per (epoch,dimension,direction)', () => {
    expect(horoLabel(3, 'a', 'forward')).not.toBe(horoLabel(3, 'b', 'forward'))
    expect(horoLabel(3, 'a', 'forward')).not.toBe(horoLabel(4, 'a', 'forward'))
    expect(horoLabel(3, 'a', 'forward')).not.toBe(horoLabel(3, 'a', 'reverse'))
  })
})

describe('foldDimensions — the cross-dimension fold', () => {
  it('is deterministic and order-sensitive (dimensions are distinct)', () => {
    const a = rotateKey({ master: MASTER, epoch: 2, dimension: 'x' })
    const b = rotateKey({ master: MASTER, epoch: 2, dimension: 'y' })
    expect(foldDimensions([a, b])).toBe(foldDimensions([a, b]))
    expect(foldDimensions([a, b])).not.toBe(foldDimensions([b, a]))
  })
})

describe('honest boundary — the secret carries the unpredictability, never the ring', () => {
  it('the dance is pure/public: horoPosition needs no secret', () => {
    expect(horoPosition(4, 'forward')).toBe(7) // computable by anyone (Kerckhoffs)
  })
  it('no master ⇒ no key — the ring alone derives nothing', () => {
    expect(rotateKey({ master: undefined, epoch: 5, mode: 'stateless' })).toBe('')
    expect(rotateKey({ master: '', epoch: 5, mode: 'stateless' })).toBe('')
  })
})
