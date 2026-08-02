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
  opposite,
  merkaba,
  PYRAMID,
  INVERTED_PYRAMID,
  type HoroDirection,
} from '@/nist/sp/800/108'

const MASTER = 'a-test-master-secret-32-characters!!'
const ALL_DIRECTIONS: HoroDirection[] = ['forward', 'reverse', 'right', 'left', 'up', 'down']

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

describe('six directions — the sequence and its own inverted reflection, on every axis', () => {
  it('every `+` direction dances the sequence [1,2,4,8,7,5]', () => {
    for (const d of ['forward', 'right', 'up'] as HoroDirection[]) {
      expect([0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, d))).toEqual([1, 2, 4, 8, 7, 5])
    }
  })
  it('every `−` direction dances the inverted reflection [1,5,7,8,4,2]', () => {
    for (const d of ['reverse', 'left', 'down'] as HoroDirection[]) {
      expect([0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, d))).toEqual([1, 5, 7, 8, 4, 2])
    }
  })
  it("opposite is the inverted reflection: a direction's sequence reversed-about-1 is its opposite's", () => {
    for (const d of ['forward', 'right', 'up'] as HoroDirection[]) {
      const fwd = [0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, d))
      const rev = [0, 1, 2, 3, 4, 5].map((e) => horoPosition(e, opposite(d)))
      expect(rev).toEqual([fwd[0], ...fwd.slice(1).reverse()])
      expect(opposite(opposite(d))).toBe(d) // reflection of the reflection returns
    }
  })
  it('all six directions produce distinct keys at the same epoch (three independent axes)', () => {
    const keys = ALL_DIRECTIONS.map((direction) => rotateKey({ master: MASTER, epoch: 4, direction }))
    expect(new Set(keys).size).toBe(6)
  })
  it('the pyramid and its inverted reflection partition the six directions', () => {
    expect([...PYRAMID, ...INVERTED_PYRAMID].sort()).toEqual([...ALL_DIRECTIONS].sort())
    expect(PYRAMID.map(opposite)).toEqual([...INVERTED_PYRAMID]) // each apex-out face reflects to an apex-in face
  })
})

describe('merkaba — pyramid entangled to inverted pyramid', () => {
  it('is deterministic and needs the master', () => {
    expect(merkaba(MASTER, 3)).toBe(merkaba(MASTER, 3))
    expect(merkaba(undefined, 3)).toBe(merkaba(undefined, 3)) // stable, but derives from no secret
    expect(merkaba(MASTER, 3)).not.toBe(merkaba(MASTER, 4)) // rotates per epoch
  })
  it('is entangled: flipping ANY single direction/dimension changes the whole fold', () => {
    const base = merkaba(MASTER, 3, 'accounting')
    expect(merkaba(MASTER, 3, 'audit')).not.toBe(base) // a different dimension is a different merkaba
    expect(merkaba(MASTER, 3)).not.toBe(base) // the default dimension too
  })
})
