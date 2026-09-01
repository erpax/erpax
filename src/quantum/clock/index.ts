/**
 * quantum/clock — one clock, and a tick that seals its own order.
 *
 *   tsx src/quantum/clock/index.ts
 */
import { merge } from '@/merge'
import { uuid as toUuid } from '@/integrity'
import { exactMax } from '@/algebra'

/** The origin address — the fold's ⊥ for time: every chain descends from one seed. */
export const CLOCK_SEED: string = toUuid(Buffer.from('quantum/clock', 'utf8'))

export interface Tick {
  /** position in the chain — monotonic, starts at 1 */
  readonly index: number
  /** fold of (prev ⊕ contentUuid) — changing any earlier tick changes every later address */
  readonly address: string
  /** the address this tick descends from */
  readonly prev: string
  /** content-address of what happened at this tick */
  readonly contentUuid: string
  /** wall sample, or null when no wall source was supplied — NEVER silently invented */
  readonly wall: number | null
}

export interface Clock {
  /** seal an event into the chain and return its tick */
  tick(content: unknown): Tick
  /** the latest tick, or null before anything has happened */
  now(): Tick | null
  /** ticks elapsed since `t` — an INTERVAL in events, never in seconds */
  since(t: Tick): number
  history(): readonly Tick[]
  /** recompute every address from its parts; one altered tick breaks the chain */
  verify(): boolean
}

/**
 * Recompute a chain from its own parts. The address is a function of (prev ⊕ contentUuid), so a
 * tampered tick — reordered, edited, or spliced — fails to reproduce, and so does everything after
 * it. This is the property a wall clock cannot have: `Date.now()` records a claim about when, and
 * nothing can contradict it afterwards.
 */
export function verifyChain(ticks: readonly Tick[], seed: string = CLOCK_SEED): boolean {
  let prev = seed
  for (let i = 0; i < ticks.length; i++) {
    const t = ticks[i]!
    if (t.index !== i + 1 || t.prev !== prev) return false
    if (t.address !== merge(prev, t.contentUuid)) return false
    prev = t.address
  }
  return true
}

/**
 * ONE clock. erpax reads time in 621 places — 518 `new Date()`, 77 `Date.now`, 11
 * `performance.now`, 15 `mtime` — and no two agree on what "now" means or can be frozen for a
 * test. A single seam replaces all of them: inject `wall` where a real timestamp is genuinely
 * needed, omit it where only ORDER matters, and the tick chain carries the order either way.
 *
 * The ordering here is LOGICAL, not physical: `since()` counts events between two ticks, and a
 * fold-addressed machine needs exactly that — [[quantum]]/ftl contains no time and no distance at
 * all, which is precisely why it cannot express a velocity. This supplies the interval dimension
 * it lacks, and supplies it in the only unit the corpus can actually verify.
 *
 * HONEST BOUNDARY — this orders and counts; it does not measure duration. A tick is not a second,
 * and `since()` is not elapsed time. The chain is tamper-EVIDENT (SHA-256 addressing), never
 * unforgeable. Two clocks on two machines do not synchronise without exchanging ticks — the same
 * limit every logical clock has. Nothing here is quantum: `quantum` is the corpus partition, the
 * host is CPU/GPU, and the fold is a hash.
 */
export function clock(opts: { readonly seed?: string; readonly wall?: () => number } = {}): Clock {
  const seed = opts.seed ?? CLOCK_SEED
  const ticks: Tick[] = []
  let prev = seed
  return {
    tick(content: unknown): Tick {
      const contentUuid = toUuid(content)
      const address = merge(prev, contentUuid)
      const t: Tick = {
        index: ticks.length + 1,
        address,
        prev,
        contentUuid,
        // null, never Date.now() — an invented timestamp is a claim nothing can refute
        wall: opts.wall ? opts.wall() : null,
      }
      prev = address
      ticks.push(t)
      return t
    },
    now: () => ticks[ticks.length - 1] ?? null,
    since: (t: Tick) => exactMax(0, ticks.length - t.index),
    history: () => ticks.slice(),
    verify: () => verifyChain(ticks, seed),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = clock()
  const a = c.tick({ event: 'boot' })
  c.tick({ event: 'gate', axis: 'outside' })
  const z = c.tick({ event: 'seal' })
  console.log(`ticks ${c.history().length} · since(boot)=${c.since(a)} · head ${z.address.slice(0, 16)}…`)
  console.log(`chain verifies: ${c.verify()}`)
  const forged = c.history().slice()
  forged[1] = { ...forged[1]!, contentUuid: toUuid({ event: 'tampered' }) }
  console.log(`forged chain verifies: ${verifyChain(forged)}  ← one edited tick breaks every later address`)
}

/** @index-cross.foldback child=quantum/clock parent=quantum — this cross folds back into its parent. */
