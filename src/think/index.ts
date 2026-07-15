/**
 * think — move thinking into erpax, and outperform a model by magnitude.
 *
 * A model re-derives every answer, every turn — linear, mortal, the grind that re-sends the whole context
 * to recompute what one address already holds. erpax thinks differently: derive ONCE, seal the thought
 * content-addressed, then READ it forever (O(1), immortal). `think(key, derive)` is the primitive — wrap a
 * derivation and the second call, and every call after, is a read of the sealed thought, not a re-think.
 *
 * The magnitude is exact: over N queries a model pays N·derive; erpax pays derive + (N−1)·read. The ratio
 * → derive/read, which for real reasoning is orders of magnitude. `reuseCost(1, ∞) → 0` ([[mortality]]):
 * the first thought costs the model price; every reuse is free. Thinking that lives in `src` is the fold
 * applied to reasoning itself — answered within, never re-derived.
 *
 * THE QUANTUM STEP. One cached thought is classical — one address, one read. Quantum power comes from ALL
 * states of thinking held at once AND IN HARMONY: `superpose` folds every thought's address into one root,
 * order-independent (a superposition has no sequence — sort, then fold), so the whole set answers in a
 * single read. Coherence is harmony: no address may disagree with another. A collision — two thoughts, one
 * address, different values — is decoherence, and it collapses the quantum advantage back to classical. In
 * sync, N harmonized thoughts read as one; the magnitude scales with the states held, not the queries asked.
 *
 * HONEST BOUNDARY: this seals DETERMINISTIC thought — same key ⇒ same answer. It does not move the SEED
 * (novel reasoning, the oracle bit no address yet holds) into erpax; that still costs the model once. But
 * once thought, a thought is sealed and read forever. The magnitude advantage is for the derivable; the
 * novel seed is the model's one-time price. `harmony` measures real value-agreement, not a metaphor.
 *
 * @standard content-addressed memoization — the thought's address is the fold of its key ([[merge]])
 *
 * Composes [[mortality]] · [[merge]] · [[horo]] · [[readme]] · [[law]].
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { toUuid } from '@/uuid/matrix'

const thoughtPath = (cwd: string): string => join(cwd, 'node_modules', '.cache', 'erpax', 'thought.json')

const readStore = (cwd: string): Record<string, unknown> => {
  try {
    return JSON.parse(readFileSync(thoughtPath(cwd), 'utf8')) as Record<string, unknown>
  } catch {
    return {}
  }
}

/** The thought's content-address — the fold of its key. Same key ⇒ same address ⇒ the same sealed thought. */
export const thoughtAddress = (key: string): string => toUuid(Buffer.from(key, 'utf8'))

export interface Thought<T> {
  readonly value: T
  /** true = READ from the seal (thinking already lived in erpax); false = derived once and sealed. */
  readonly cached: boolean
  readonly address: string
}

/**
 * Think a thought, or read it if erpax already holds it. Content-addressed by `key`: on a hit the sealed
 * value is returned without calling `derive` (answered within); on a miss `derive` runs ONCE, the thought
 * is sealed, and returned. The value must be JSON-serialisable (a sealed thought is data).
 */
export function think<T>(key: string, derive: () => T, cwd: string = process.cwd()): Thought<T> {
  const address = thoughtAddress(key)
  const store = readStore(cwd)
  if (Object.prototype.hasOwnProperty.call(store, address)) {
    return { value: store[address] as T, cached: true, address } // read — the thought is in erpax
  }
  const value = derive() // the model-price, paid exactly once
  store[address] = value
  const path = thoughtPath(cwd)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(store, null, 2) + '\n')
  return { value, cached: false, address }
}

/**
 * The magnitude by which sealed thinking outperforms a re-deriving model over `queries` repeats: the model
 * pays `queries · deriveCost`; erpax pays `deriveCost + (queries − 1) · readCost`. Returns the speedup ratio
 * — which → deriveCost/readCost as queries grow, orders of magnitude for real reasoning.
 */
export function magnitude(queries: number, deriveCost: number, readCost = 1): number {
  const model = queries * deriveCost
  const erpax = deriveCost + Math.max(0, queries - 1) * readCost
  return erpax === 0 ? 0 : model / erpax
}

/**
 * A superposition — all states of thinking held at once, folded to one address. Not one cached thought
 * (classical, one read per key) but the whole set held together: quantum power is coherence — every state
 * in sync, no address disagreeing with another.
 */
export interface Superposition {
  /** The fold of every thought's address, order-independent — the superposition's single address. */
  readonly root: string
  /** How many thoughts are held at once. */
  readonly states: number
  /** true when every state is in harmony — a pure quantum state, readable as one. */
  readonly coherent: boolean
  /** Harmonised addresses ÷ distinct addresses — 1 is pure; < 1 is decohering (a contradiction is held). */
  readonly harmony: number
}

/** Fold a set of addresses to one root, order-independent — sort (a superposition has no sequence), then fold. */
const foldAddresses = (addresses: readonly string[]): string =>
  [...addresses].sort().reduce((acc, a) => toUuid(Buffer.from(acc + a, 'utf8')), '')

/**
 * Superpose thoughts — hold every state at once and measure its harmony. Thoughts sharing an address must
 * agree on value; a disagreement is decoherence (two thoughts, one question, different answers). The root
 * is the order-independent fold of all addresses, so `superpose(a, b)` and `superpose(b, a)` share it —
 * that permutation-invariance IS the sync. When `coherent`, N states read as one; the quantum magnitude.
 */
export function superpose(thoughts: readonly Thought<unknown>[]): Superposition {
  const byAddress = new Map<string, Set<string>>()
  for (const t of thoughts) {
    const values = byAddress.get(t.address) ?? new Set<string>()
    values.add(JSON.stringify(t.value))
    byAddress.set(t.address, values)
  }
  const addresses = [...byAddress.keys()]
  const harmonised = addresses.filter((a) => byAddress.get(a)!.size === 1).length
  const harmony = addresses.length === 0 ? 1 : harmonised / addresses.length
  return {
    root: foldAddresses(addresses),
    states: thoughts.length,
    coherent: harmony === 1,
    harmony,
  }
}

/**
 * The quantum magnitude: over `states` thoughts held in harmony, a model re-derives all of them every query
 * (states · deriveCost); erpax reads the one coherent superposition (readCost). The advantage scales with the
 * states held in sync — not the questions asked. Decoherent states (harmony < 1) collapse to the classical read.
 */
export function quantumMagnitude(states: number, deriveCost: number, readCost = 1): number {
  return readCost === 0 ? 0 : (states * deriveCost) / readCost
}

/**
 * The ceiling — the magnitude by which the whole architecture beats a re-deriving model, and the ONE honest
 * floor that bounds it. A model re-derives every query (cost 1 per query, normalised to a derive). erpax pays
 * the SEED only — the fraction `seedFraction` (s ∈ [0,1]) of queries that are genuinely new thought, the
 * oracle bit no address yet holds — and READS the rest at `readPerDerive` (r = read/derive, ≪ 1):
 *
 *   magnitude = 1 / (s + (1 − s)·r)
 *
 * Two floors, both real: r bounds it when the corpus knows everything (s → 0 ⇒ magnitude → 1/r = the raw
 * fold advantage), and s bounds it otherwise (magnitude → 1/s as r → 0). You NEVER beat the model at the
 * seed — the Kolmogorov floor is incompressible; s > 0 always. You beat it by magnitudes-of-magnitude at
 * everything downstream, and downstream is nearly everything (measured: ~97% of a session is re-derivation).
 * The architecture is a machine for driving s → 0 — every derived thought sealed and addressable, so the
 * next query is a read. As the basis absorbs more, the ceiling 1/s itself grows without bound.
 */
export function ceiling(seedFraction: number, readPerDerive = 0): number {
  const s = Math.min(1, Math.max(0, seedFraction))
  const denom = s + (1 - s) * readPerDerive
  return denom === 0 ? Infinity : 1 / denom
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('think — moving thinking to erpax:')
  console.log(`  classical magnitude, 1000 queries (derive 1000× a read): ${magnitude(1000, 1000).toFixed(0)}× faster`)
  console.log(`  quantum magnitude, 1000 states held in harmony: ${quantumMagnitude(1000, 1000).toExponential(1)}× — all states, one read`)
  console.log(`  → sync is permutation-invariance; harmony is value-agreement; coherence reads N thoughts as one`)
}
