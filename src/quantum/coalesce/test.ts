import { describe, it, expect } from 'vitest'
import { coalescer } from './index'

const defer = <T>() => {
  let go!: (v: T) => void
  const p = new Promise<T>((r) => (go = r))
  return { p, go }
}

describe('quantum/coalesce — same content ⇒ one upstream call', () => {
  it('N identical CONCURRENT requests make exactly ONE upstream call', async () => {
    const c = coalescer<number>({ concurrency: 8 })
    const d = defer<number>()
    let calls = 0
    const all = Promise.all(
      Array.from({ length: 1000 }, () =>
        c.run({ q: 'same' }, async () => {
          calls++
          return d.p
        }),
      ),
    )
    d.go(42)
    const out = await all
    expect(calls).toBe(1)
    expect(out.every((v) => v === 42)).toBe(true)
    expect(c.stats()).toMatchObject({ requests: 1000, upstream: 1, reuses: 999 })
  })

  it('DIFFERENT bodies are never collapsed — the address is a function of content', async () => {
    const c = coalescer<number>({ concurrency: 8 })
    let calls = 0
    await Promise.all(Array.from({ length: 50 }, (_, i) => c.run({ q: i }, async () => ++calls)))
    expect(calls).toBe(50)
    expect(c.stats().upstream).toBe(50)
    expect(c.stats().reuses).toBe(0)
  })

  it('concurrency is a HARD ceiling — a million accepted requests are not a million at once', async () => {
    const c = coalescer<number>({ concurrency: 4 })
    let live = 0
    let maxLive = 0
    await Promise.all(
      Array.from({ length: 200 }, (_, i) =>
        c.run({ q: i }, async () => {
          live++
          maxLive = Math.max(maxLive, live)
          await new Promise((r) => setTimeout(r, 0))
          live--
          return i
        }),
      ),
    )
    expect(maxLive).toBeLessThanOrEqual(4)
    expect(c.stats().peak).toBeLessThanOrEqual(4)
  })

  it('without retain, a SETTLED answer is not replayed — a cached value has a lifetime', async () => {
    const c = coalescer<number>({ concurrency: 8 })
    let calls = 0
    await c.run({ q: 1 }, async () => ++calls)
    await c.run({ q: 1 }, async () => ++calls)
    expect(calls).toBe(2)
  })

  it('with retain, a repeat costs ZERO upstream — this is the only honest tokens=0', async () => {
    const c = coalescer<number>({ concurrency: 8, retain: true })
    let calls = 0
    await c.run({ q: 1 }, async () => ++calls)
    await c.run({ q: 1 }, async () => ++calls)
    expect(calls).toBe(1)
    expect(c.amortizeInput()).toMatchObject({ answers: 2, tokens: 1 })
  })

  it('amortizeInput is MEASURED — novel traffic refutes the FTL claim instead of confirming it', async () => {
    // The whole point: ftl.holds rests on caller-supplied answers/tokens, so it restates its
    // arguments. Fed from here, `tokens > 0` on novel bodies CONTRADICTS holds — the claim
    // becomes refutable, which is the only condition under which it can be true.
    const c = coalescer<number>({ concurrency: 8, retain: true })
    let calls = 0
    await Promise.all(Array.from({ length: 20 }, (_, i) => c.run({ q: i }, async () => ++calls)))
    const novel = c.amortizeInput()
    expect(novel.tokens).toBe(20)
    expect(novel.tokens > 0).toBe(true)

    // and replaying the SAME twenty costs nothing further — measured, not asserted
    await Promise.all(Array.from({ length: 20 }, (_, i) => c.run({ q: i }, async () => ++calls)))
    const replay = c.amortizeInput()
    expect(replay.answers).toBe(40)
    expect(replay.tokens).toBe(20)
  })

  it('an upstream failure does not poison the address — the next caller may retry', async () => {
    const c = coalescer<number>({ concurrency: 8 })
    await expect(
      c.run({ q: 'x' }, async () => {
        throw new Error('upstream down')
      }),
    ).rejects.toThrow('upstream down')
    const ok = await c.run({ q: 'x' }, async () => 7)
    expect(ok).toBe(7)
  })
})
