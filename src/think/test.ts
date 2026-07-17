import { describe, it, expect, beforeEach } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { think, thoughtAddress, superpose, magnitude, quantumMagnitude, ceiling , intend, resolve, openIntents, refute, refutations, alreadyRefuted, proveProse, purgeProse, proseFate, researchQueue } from './index'

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

// An error is a division by zero — no result in this dimension. refute seals the impossibility WITH its
// harmonic path (where it IS computable), so the loop never re-probes the dead path. The speedup: a sealed
// refutation is a shortcut, not a wound.
describe('refute — an impossibility routed to another dimension, sealed so it is met once', () => {
  it('seals a refutation with its harmonic path', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-refute-'))
    const r = refute('cut diamond→readme edge', 'still TDZ at fixed/assets:34', 'the SCC has many paths — cut the shared choke point tool-defs→collections', cwd)
    expect(r.harmonic).toMatch(/many paths/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('alreadyRefuted returns the harmonic shortcut — do not divide by the same zero twice', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-refute-'))
    refute('unit-test the posting hooks', 'hook calls the module-singleton journalEntryService (76s DB hang)', 'inject the service so the JE booking is stubbable', cwd)
    const shortcut = alreadyRefuted('unit-test the posting hooks', cwd)
    expect(shortcut?.harmonic).toMatch(/inject the service/)
    expect(alreadyRefuted('a fresh probe never tried', cwd)).toBeUndefined()
    rmSync(cwd, { recursive: true, force: true })
  })

  it('refutations lists every dead path already met', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-refute-'))
    refute('a', 'x', 'route to b', cwd)
    refute('c', 'y', 'route to d', cwd)
    expect(refutations(cwd).length).toBe(2)
    rmSync(cwd, { recursive: true, force: true })
  })
})

// "Prose needs proof also or be purged feeding new research." Saving an agent's thought, well-defined: prose
// converts to code (a proof that EXISTS), or is purged into research — never left unproven, never simply lost.
describe('prose → code, or purge → research', () => {
  const tmp = (): string => mkdtempSync(join(tmpdir(), 'erpax-prose-'))

  it('proveProse with a REAL proof converts prose to code — the pair sealed', () => {
    const cwd = tmp()
    const fate = proveProse('debits equal credits', 'src/double/entry/validator/test.ts', () => true, cwd)
    expect(fate).toEqual({ prose: 'debits equal credits', state: 'proven', proof: 'src/double/entry/validator/test.ts' })
    expect(proseFate('debits equal credits', cwd).state).toBe('proven')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('proveProse with NO proof NEVER fabricates — the prose stays open, owing one, and visible', () => {
    const cwd = tmp()
    const fate = proveProse('the cash flow balances', 'src/report/nowhere.ts', () => false, cwd)
    expect(fate.state).toBe('open')
    expect(fate.proof).toBeUndefined()
    expect(openIntents(cwd)).toContain('the cash flow balances') // visible, not asserted
    rmSync(cwd, { recursive: true, force: true })
  })

  it('purgeProse is a SEED not a deletion — the thought leaves as research', () => {
    const cwd = tmp()
    const fate = purgeProse('the biofield is measurable', 'rPPG on Workers measures heart-rate; the aura field does not')
    // (default cwd) — re-run against explicit cwd for the store assertions
    const c2 = tmp()
    purgeProse('the biofield is measurable', 'rPPG measures heart-rate; the field does not', c2)
    expect(proseFate('the biofield is measurable', c2)).toMatchObject({ state: 'purged' })
    expect(researchQueue(c2)).toEqual([
      { prose: 'the biofield is measurable', research: 'rPPG measures heart-rate; the field does not' },
    ])
    expect(fate.state).toBe('purged')
    rmSync(c2, { recursive: true, force: true })
  })

  it('a purge is refutable and never re-suffered — alreadyRefuted short-circuits the dead prose', () => {
    const cwd = tmp()
    purgeProse('perfect erasure exists', 'content-addressing dedups; true deletion is impossible — detect not prevent', cwd)
    expect(alreadyRefuted('perfect erasure exists', cwd)?.harmonic).toMatch(/detect not prevent/)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an unsaved thought is absent — silence is not a claim', () => {
    const cwd = tmp()
    expect(proseFate('never thought this', cwd).state).toBe('absent')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the three fates are mutually exclusive and deterministic', () => {
    const cwd = tmp()
    proveProse('A holds', 'src/a/test.ts', () => true, cwd) // proven
    proveProse('B pending', 'src/b/test.ts', () => false, cwd) // open
    purgeProse('C unprovable', 'research C elsewhere', cwd) // purged
    expect(proseFate('A holds', cwd).state).toBe('proven')
    expect(proseFate('B pending', cwd).state).toBe('open')
    expect(proseFate('C unprovable', cwd).state).toBe('purged')
    rmSync(cwd, { recursive: true, force: true })
  })
})
