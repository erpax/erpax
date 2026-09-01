/**
 * quantum/coalesce — same content ⇒ same address ⇒ ONE upstream call.
 *
 *   tsx src/quantum/coalesce/index.ts
 */
import { requestUuid } from '@/quantum/request'
import { exactMax, exactTrunc } from '@/algebra'

export interface CoalesceStats {
  readonly requests: number
  /** calls actually made upstream — the only number that costs anything */
  readonly upstream: number
  readonly reuses: number
  /** highest simultaneous upstream calls — never exceeds `concurrency` */
  readonly peak: number
}

/**
 * The telemetry `amortize` needs, MEASURED rather than supplied.
 *
 * `ftl.holds` today rests on caller-supplied `answers`/`tokens`, so `efficiency → ∞` reduces to
 * `tokens === 0 && answers > 0` — the claim restating its own arguments. These two numbers come
 * from what the coalescer actually did, so feeding them to `amortize` makes the FTL claim
 * REFUTABLE: run traffic with novel bodies and `upstream > 0` contradicts it.
 */
export interface AmortizeInput {
  readonly answers: number
  readonly tokens: number
  readonly reuses: number
}

export interface Coalescer<T> {
  run(body: unknown, call: () => Promise<T>): Promise<T>
  stats(): CoalesceStats
  amortizeInput(): AmortizeInput
}

/**
 * Collapse identical concurrent work onto one upstream call, and bound how much runs at once.
 *
 * Two independent folds, both classical and both exact:
 *
 *   1. ADDRESS — `requestUuid(body)` is a pure function of content, so two callers asking the same
 *      thing produce the same key BEFORE either call is made. The second attaches to the first
 *      instead of duplicating it. N identical requests ⇒ 1 upstream call.
 *   2. BACKPRESSURE — millions of accepted requests do NOT become millions of simultaneous calls.
 *      `concurrency` is a hard ceiling; the rest queue. Firing everything at once is how a client
 *      gets rate-limited or runs out of sockets — the ceiling is the feature, not a limitation.
 *
 * HONEST BOUNDARY — this reduces the NUMBER of upstream calls; it does not make a single remote
 * call faster, and it cannot exceed a provider's quota. It is not a quantum algorithm: the host is
 * CPU/GPU (`QPU`), and the fold here is a hash and a map. What it does deliver is exact — duplicate
 * work provably collapses, because the address is a function of the content.
 *
 * Results are cached only while in flight unless `retain` is set: a settled answer is a value with
 * a lifetime, and pretending otherwise would serve stale data forever.
 */
export function coalescer<T>(opts: { readonly concurrency?: number; readonly retain?: boolean } = {}): Coalescer<T> {
  const limit = exactMax(1, exactTrunc(opts.concurrency ?? 8))
  const retain = opts.retain === true
  const inflight = new Map<string, Promise<T>>()
  const settled = new Map<string, T>()
  let requests = 0
  let upstream = 0
  let reuses = 0
  let peak = 0
  let active = 0
  const queue: (() => void)[] = []

  const release = (): void => {
    active--
    const next = queue.shift()
    if (next) next()
  }
  const acquire = (): Promise<void> =>
    new Promise<void>((go) => {
      const start = (): void => {
        active++
        peak = exactMax(peak, active)
        go()
      }
      if (active < limit) start()
      else queue.push(start)
    })

  return {
    async run(body: unknown, call: () => Promise<T>): Promise<T> {
      requests++
      const key = requestUuid(body)
      if (retain && settled.has(key)) {
        reuses++
        return settled.get(key) as T
      }
      const joined = inflight.get(key)
      if (joined) {
        reuses++
        return joined
      }
      const p = (async () => {
        await acquire()
        upstream++
        try {
          const out = await call()
          if (retain) settled.set(key, out)
          return out
        } finally {
          release()
          inflight.delete(key)
        }
      })()
      inflight.set(key, p)
      return p
    },
    stats: () => ({ requests, upstream, reuses, peak }),
    // answers = what callers got; tokens = what it actually cost upstream.
    amortizeInput: () => ({ answers: requests, tokens: upstream, reuses }),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = coalescer<number>({ concurrency: 4, retain: true })
  const bodies = Array.from({ length: 1_000_000 }, (_, i) => ({ q: i % 1000 }))
  let calls = 0
  Promise.all(bodies.map((b) => c.run(b, async () => ++calls))).then(() => {
    const s = c.stats()
    console.log(`requests ${s.requests} · upstream ${s.upstream} · reuses ${s.reuses} · peak ${s.peak}`)
    console.log(`collapse ratio ${(s.requests / exactMax(1, s.upstream)).toFixed(1)}×`)
  })
}

/** @index-cross.foldback child=quantum/coalesce parent=quantum — this cross folds back into its parent. */
