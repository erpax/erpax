/**
 * quantum/ftl/memo — does asking twice cost twice?
 *
 * `amortize` models cost as `c₀/(m+1)`: it FALLS as reuses grow. This measures whether any reuse is
 * actually realised, by asking the same question twice and comparing. See ./SKILL.md.
 *
 * Both thresholds are module-PRIVATE and argued in ./SKILL.md. Exporting them would be seal-debt on
 * the matrix ratchet, and a test that read one back would be asserting this module's own literal
 * ([[rules]]/mirror) rather than any behaviour.
 *
 * @standard ISO/IEC 25010:2023 §5.2 — performance efficiency: time behaviour under repetition
 */
import { createHash } from 'node:crypto'
import { statSync } from 'node:fs'
import { amortize } from '@/quantum/ftl/metrics'
import { allFiles, corpusFiles } from '@/syntax/cache'
import { contentKey, forgetContentKeys, readSealed, writeSealed } from '@/quantum/ftl/memo/disk'
import { exactMax, exactRound } from '@/algebra'

/** Below this share of the first ask, a re-ask is free and the answer has a receipt. DECLARED. */
const MEMO_RATIO = 0.05

/**
 * A first ask shorter than this cannot be judged: at sub-millisecond durations the ratio is timer
 * noise, and a trivially cached lookup measured 6 % purely because both asks rounded near zero.
 * An unmeasurable question is reported as such, never as an answer.
 */
const MIN_MEASURABLE_MS = 5

export type MemoShape = 'memoized' | 'partial' | 'rederives' | 'unmeasured'

export interface MemoVerdict {
  readonly label: string
  readonly firstMs: number
  readonly secondMs: number
  /** `secondMs / firstMs` — the share of the work a re-ask repeats. */
  readonly reaskRatio: number
  /** What `amortize` PREDICTS per answer over two asks: `c₀/(m+1)` with one reuse. */
  readonly predictedPerAnswerMs: number
  readonly measuredPerAnswerMs: number
  /** predicted ÷ measured. 1 means the model holds; 0.5 means none of the promised reuse happened. */
  readonly realisedAmortisation: number
  readonly shape: MemoShape
}

const shapeOf = (ratio: number, firstMs: number): MemoShape => {
  if (firstMs < MIN_MEASURABLE_MS) return 'unmeasured'
  // A ratio ABOVE 1 means the re-ask cost MORE — JIT, GC or a cold cache, never partial reuse. It is
  // certainly not memoized, so it lands with the re-derivers rather than being smoothed away.
  if (ratio >= 0.5) return 'rederives'
  return ratio < MEMO_RATIO ? 'memoized' : 'partial'
}

/**
 * Ask twice, back to back, and report what the second ask cost.
 *
 * The RATIO is the evidence, not the milliseconds: both asks run under the same load, so a busy
 * machine inflates them together and cancels out. Absolute wall time under contention is not
 * evidence — a lesson this corpus has already paid for — but `second ÷ first` survives it.
 *
 * @invariant a receipt-backed answer reports a ratio below MEMO_RATIO
 * @invariant realisedAmortisation is 1 when the second ask is free, 0.5 when it costs the same
 */
export function timeTwice(label: string, ask: () => unknown): MemoVerdict {
  const a = performance.now()
  ask()
  const firstMs = performance.now() - a
  const b = performance.now()
  ask()
  const secondMs = performance.now() - b
  const reaskRatio = firstMs > 0 ? secondMs / firstMs : 0
  // amortize with ONE reuse is the promise; (first+second)/2 is what actually happened per answer.
  const predictedPerAnswerMs = amortize(2, 0, { firstComputeCost: firstMs, reuses: 1 }).amortizedCost
  const measuredPerAnswerMs = (firstMs + secondMs) / 2
  return {
    label,
    firstMs: exactRound(firstMs),
    secondMs: exactRound(secondMs),
    reaskRatio,
    predictedPerAnswerMs,
    measuredPerAnswerMs,
    realisedAmortisation: measuredPerAnswerMs > 0 ? predictedPerAnswerMs / measuredPerAnswerMs : 1,
    shape: shapeOf(reaskRatio, firstMs),
  }
}

export interface MemoCensus {
  readonly rows: readonly MemoVerdict[]
  /** Operations whose re-ask is free — the part of the corpus that is already quantum. */
  readonly memoized: readonly string[]
  /** Too fast to judge. Not a pass: the question could not be asked. */
  readonly unmeasured: readonly string[]
  /** Operations that re-derive: `amortize` cannot fall for these, however often they are asked. */
  readonly rederives: readonly string[]
  /** Milliseconds a single extra ask of everything costs — the bill for having no receipt. */
  readonly reaskCostMs: number
}

/**
 * The census. Every operation that re-derives is a place the FTL claim does NOT hold, and naming
 * them is the point: the substrate can be O(1) by address while the laws computed over it are not.
 */
export function memoCensus(asks: ReadonlyArray<readonly [string, () => unknown]>): MemoCensus {
  const rows = asks.map(([label, fn]) => timeTwice(label, fn))
  return {
    rows: [...rows].sort((x, y) => y.secondMs - x.secondMs),
    memoized: rows.filter((r) => r.shape === 'memoized').map((r) => r.label),
    unmeasured: rows.filter((r) => r.shape === 'unmeasured').map((r) => r.label),
    rederives: rows.filter((r) => r.shape === 'rederives').map((r) => r.label),
    reaskCostMs: exactRound(rows.reduce((n, r) => n + exactMax(0, r.secondMs), 0)),
  }
}

// ─── Input-keyed memos: the receipt that lets c0/(m+1) actually fall ─────────
//
// The pattern is already in this repo: `scripts/payload-input-key.sh` content-keys the Payload
// generators on exactly what their verdict depends on. A gate is the same shape — a pure function of
// the files it reads — so its verdict can be returned unchanged while the input address is unchanged.

/**
 * The surface a memo's key must cover. DECLARED, because a key that misses an input returns a STALE
 * VERDICT, and a wrong gate is worse than a slow one.
 *
 * `ts` is the 7,865 `.ts`/`.tsx` files the parse gates read — 346 ms cold, 69 ms warm, and those
 * texts are read by the gates anyway, so the marginal cost is the hashing alone.
 *
 * `src` is all 22,416 files under `src/`, including the `.md`/`.json` that `skillWeights` reads. It
 * costs **3701 ms**, which is dearer than every gate that would need it — so nothing uses it yet, and
 * that is a measurement rather than an omission.
 *
 * Neither is enough for a gate reading OUTSIDE `src`: [[rules]]/command reads `package.json`,
 * `.husky/` and `.github/workflows/`, so it is deliberately left un-memoized rather than memoized
 * unsoundly.
 */
export type MemoSurface = 'ts' | 'src'

const keys = new Map<string, string>()
const verdicts = new Map<string, unknown>()

/**
 * The input address of a surface — path, size and mtime for every file on it.
 *
 * Memoized per process, so the ~25 ms is paid once and every gate keyed on it re-asks for the price
 * of a map lookup. Why stat rather than content is argued at the loop below, and it was measured.
 */
export function inputKey(cwd: string = process.cwd(), surface: MemoSurface = 'src'): string {
  const memoKey = `${surface} ${cwd}`
  const hit = keys.get(memoKey)
  if (hit !== undefined) return hit
  const h = createHash('sha256')
  for (const f of surface === 'ts' ? corpusFiles(cwd) : allFiles(cwd)) {
    h.update(f)
    // SIZE AND MTIME, not content — and that is a measured choice, not a shortcut.
    //
    // A content hash was the first design and it was WRONG in both directions. It could not see an
    // in-process edit at all, because `textOf` is itself memoized and returned the stale text: the
    // key did not move when a file was rewritten, which is the stale-verdict defect arriving through
    // the very cache the gates share. And it cost 1432 ms cold, because hashing content means READING
    // every file before any gate has asked for it — more than the gate it was meant to save.
    //
    // `statSync` is not cached, so an edit always moves the key, and it is ~25 ms over the surface.
    // That is sound for an IN-PROCESS memo, which is what this is. A cross-process memo on disk would
    // need the content address instead, because mtime granularity cannot be trusted between runs —
    // `scripts/payload-input-key.sh` does exactly that, keyed on git blobs.
    try {
      const st = statSync(f)
      h.update(`${st.size}:${st.mtimeMs}`)
    } catch {
      h.update('::unstattable')
    }
  }
  const key = h.digest('hex').slice(0, 32)
  keys.set(memoKey, key)
  return key
}

/**
 * Return the sealed verdict while the input address holds; compute and seal it otherwise.
 *
 * @invariant a changed input address always recomputes
 * @invariant the same label under one key computes exactly once
 */
export function memoized<T>(label: string, key: string, compute: () => T): T {
  const at = `${label}@${key}`
  if (verdicts.has(at)) return verdicts.get(at) as T
  const value = compute()
  verdicts.set(at, value)
  return value
}

/** Drop every memo — for a test, and for a caller that has changed the tree in-process. */
export function forgetMemos(): void {
  keys.clear()
  verdicts.clear()
  forgetContentKeys()
}

/**
 * Seal a gate's verdict at both layers — the one call a gate makes.
 *
 * In-process first (a map lookup), then on disk (free across processes). The address is git's content
 * key where git can give one, because it is both cheaper than walking `stat` over the surface and
 * sound across runs; the stat key is the fallback when there is no git metadata, and it is sound
 * in-process, which is all the in-process layer needs.
 *
 * A value that does not survive a JSON round-trip is NOT sealed to disk. A `Map`, a `Set` or an
 * `undefined` would come back as something else, and a gate reading a corrupted verdict is worse than
 * one that recomputes — so the round-trip is checked before the seal, once, on the way in.
 *
 * `surface` is the git pathspec the address covers, defaulting to `src`. A gate reading WIDER must
 * say so or it is sealed on a key blind to its own inputs: `deadLoaderPaths` tests whether targets
 * under `scripts/` and `packages/` exist, so on the default key a deleted script would keep serving
 * the green verdict that preceded it — the exact failure that gate exists to catch.
 *
 * @invariant the in-process layer always applies; the disk layer only with a content address
 * @invariant a verdict that does not round-trip through JSON is never sealed to disk
 * @invariant a wider surface is a different address — it never reads what a narrower one sealed
 */
export function sealed<T>(label: string, cwd: string, compute: () => T, surface?: readonly string[]): T {
  const content = contentKey(cwd, surface)
  const key = content ?? inputKey(cwd, 'ts')
  return memoized(label, key, () => {
    const hit = readSealed<T>(label, content, cwd)
    if (hit !== undefined) return hit
    const value = compute()
    // The decision to seal happens AFTER computing, and a verdict that does not survive the
    // round-trip is simply not written. An earlier draft returned a value with a marker field bolted
    // on and sealed it anyway, which is the corruption this guard exists to prevent.
    if (roundTrips(value)) writeSealed(label, content, value, cwd)
    return value
  })
}

/** Does JSON return what it was given? A `Map`, a `Set` or an `undefined` does not, and is not sealed. */
function roundTrips(value: unknown): boolean {
  try {
    return JSON.stringify(JSON.parse(JSON.stringify(value))) === JSON.stringify(value)
  } catch {
    return false
  }
}
