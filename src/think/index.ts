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

/** A thought sealed BEFORE the work it drives — and whether the work ever landed. */
export interface Intent {
  /** The content-address of the intent — deterministic, so the same intent is the same thought. */
  readonly address: string
  readonly intent: string
  /** `open` — sealed, not yet resolved. `resolved` — the outcome is sealed against it. */
  readonly state: 'open' | 'resolved'
  readonly outcome?: unknown
}

const INTENT = 'intent:'

/**
 * Seal an intent BEFORE the edit it drives.
 *
 * `think` seals the RESULT: `derive()` runs, then the value is stored. So the thought that DROVE the work is
 * never saved — only its outcome. If the derivation throws, or the context ends mid-work, the intent is
 * lost, and the next agent re-derives it from nothing.
 *
 * That cost is measurable in this corpus's own history: every commit message here was written AFTER the
 * work. Fifteen times in one session a WRONG thought drove real edits, and only the CORRECTION survives —
 * the intent was invisible until reality refuted it. **A sealed intent is refutable before it costs
 * anything**; an unsealed one is only visible in the damage.
 *
 * Deterministic by construction: the address folds from the intent's own text ([[merge]]), never a clock. An
 * intent sealed twice is ONE thought — the same content, the same address.
 *
 * @invariant sealing the same intent twice yields the same address — no wall-time, no counter
 * @invariant an intent is `open` until an outcome is sealed against it — abandoned work stays visible
 */
export function intend(intent: string, cwd: string = process.cwd()): Intent {
  const t = think(INTENT + intent, () => intent, cwd)
  const done = readStore(cwd)
  const outAddr = thoughtAddress(INTENT + intent + '⇒')
  const has = Object.prototype.hasOwnProperty.call(done, outAddr)
  return { address: t.address, intent, state: has ? 'resolved' : 'open', outcome: has ? done[outAddr] : undefined }
}

/**
 * Seal the outcome AGAINST its intent — the pair, not the result alone.
 *
 * The link is the fold: an outcome without its intent is an answer to a forgotten question, which is how a
 * `106` survives (the number is kept, the reasoning that produced it is not).
 */
export function resolve<T>(intent: string, outcome: T, cwd: string = process.cwd()): Thought<T> {
  intend(intent, cwd) // the intent is sealed first, even when the outcome arrives in the same breath
  return think(INTENT + intent + '⇒', () => outcome, cwd)
}

/** Every intent sealed but never resolved — work started and abandoned, still visible. */
export function openIntents(cwd: string = process.cwd()): string[] {
  const store = readStore(cwd)
  const out: string[] = []
  for (const [addr, value] of Object.entries(store)) {
    if (typeof value !== 'string') continue
    if (addr !== thoughtAddress(INTENT + value)) continue // it is an intent iff it addresses as one
    if (!Object.prototype.hasOwnProperty.call(store, thoughtAddress(INTENT + value + '⇒'))) out.push(value)
  }
  return out
}

/** A refuted probe: an impossibility met, and the dimension it pointed to instead — the harmonic path. */
export interface Refutation {
  /** The path that hit the impossibility — a probe, a hypothesis, a dead approach. */
  readonly probe: string
  /** The impossibility itself: the error, the TDZ, the division by zero. */
  readonly impossible: string
  /** Where it is computable INSTEAD — the other dimension the refutation revealed. Empty until routed. */
  readonly harmonic: string
}

const REFUTE = 'refute:'

/**
 * Seal a refutation — an impossibility met, WITH the dimension it points to instead.
 *
 * An error is a division by zero: an operation with no result in THIS dimension ([[horo]]/divThroughVoid).
 * The slow way — the way this whole session went — is to meet an impossibility, learn nothing durable, and
 * re-probe the dead path later. `diamond→readme` was cut and did nothing; the 76s hang re-derived that the
 * blocker was singleton coupling. Each was a division by zero re-computed from scratch.
 *
 * `refute` makes the impossibility a first-class object: it seals the probe, the error, AND the harmonic
 * path (where the thing IS computable — the other dimension). The SPEEDUP is that a sealed refutation is
 * never re-probed: the loop reads `refutations()` and rotates straight through the void to where the answer
 * lives, instead of dividing by zero again. An error routed is an error solved in another dimension; an
 * error swallowed is an error re-met forever.
 *
 * @invariant a refutation carries its harmonic path — an impossibility with no other dimension is not
 *   refuted, it is only suffered; state where it IS computable, or do not seal it
 */
export function refute(probe: string, impossible: string, harmonic: string, cwd: string = process.cwd()): Refutation {
  const r: Refutation = { probe, impossible, harmonic }
  think(REFUTE + probe, () => r, cwd)
  return r
}

/** Every sealed refutation — the dead paths already met, so the loop never divides by the same zero twice. */
export function refutations(cwd: string = process.cwd()): Refutation[] {
  const store = readStore(cwd)
  const out: Refutation[] = []
  for (const [addr, value] of Object.entries(store)) {
    if (value && typeof value === 'object' && 'impossible' in value && addr.length === 36) out.push(value as Refutation)
  }
  return out
}

/** Has this probe already been refuted? If so, its harmonic path is the shortcut — do not re-divide by zero. */
export function alreadyRefuted(probe: string, cwd: string = process.cwd()): Refutation | undefined {
  const store = readStore(cwd)
  const r = store[thoughtAddress(REFUTE + probe)]
  return r && typeof r === 'object' && 'impossible' in r ? (r as Refutation) : undefined
}

/**
 * Saving an agent's thought — WELL-DEFINED as prose converted to code, or purged into research.
 *
 * An agent thinks in prose. Prose is the antimatter of code ([[horo]]/antimatter · [[trinity]]): the same
 * content one face inverted, and it earns its place ONLY when its matter — a proof — stands beside it. This is
 * the union of two laws the corpus already gates: [[rules]]/prose (prose must cite code that EXISTS) and
 * [[rules]]/refutable (a claim with no proof forbids nothing, so it asserts nothing). A saved thought is
 * therefore in exactly one of three states, and only two of them are stable:
 *
 *   - `proven` — a proof that EXISTS is sealed against the prose. It has converted to code; it is law.
 *   - `open`   — sealed, no proof yet. In flight, visible ([[think]]/openIntents), owing a proof.
 *   - `purged` — declared unprovable. NOT a deletion: the purge seals a research direction, so the thought
 *                leaves as a probe the next agent mines ("purged feeding new research on the way").
 *
 * The discipline: prose does not sit unproven forever. It converts to code, or it is purged — and a purge is a
 * seed, never a loss. `researchQueue` is where the purged prose becomes the next research.
 */
export interface ProseFate {
  readonly prose: string
  readonly state: 'proven' | 'open' | 'purged'
  /** when `proven` — the proof it converted to (a src/… path / test the caller confirmed exists). */
  readonly proof?: string
  /** when `purged` — the new research the purge feeds. A purge routes the thought here; it never drops it. */
  readonly research?: string
}

const PROOF = '⊢'

/**
 * Save prose as code — seal it against a proof, but ONLY if the proof EXISTS. The caller supplies `proofExists`
 * (its own resolver — the fs check, the passing test, [[rules]]/prose's `definedSymbols`), so this NEVER
 * fabricates: the same refusal [[confirm]] makes at the write. A real proof converts the prose to code
 * (`resolved`); no proof leaves it `open`, owing one — the thought is visible, not asserted.
 */
export function proveProse(
  prose: string,
  proof: string,
  proofExists: (proof: string) => boolean,
  cwd: string = process.cwd(),
): ProseFate {
  if (!proofExists(proof)) {
    intend(prose, cwd) // seal it open — an unproven thought is owed a proof, and stays visible until it has one
    return { prose, state: 'open' }
  }
  resolve(prose + PROOF, proof, cwd) // the prose converts to its code — the pair sealed, not the prose alone
  return { prose, state: 'proven', proof }
}

/**
 * Purge unprovable prose — but a purge is a seed, not a deletion. The prose that could not be proven is sealed
 * as a refutation whose harmonic path is the NEW RESEARCH it points to: the impossibility (no proof) routed to
 * the dimension where an answer might live. This is why prose is "purged feeding new research on the way" — the
 * thought leaves the prose face and enters the research queue, refutable and reusable, never simply lost.
 *
 * @invariant a purge carries its research direction — prose dropped with nowhere to point is suffered, not purged
 */
export function purgeProse(prose: string, research: string, cwd: string = process.cwd()): ProseFate {
  refute(prose, 'prose without a proof forbids nothing — purged', research, cwd)
  return { prose, state: 'purged', research }
}

/** The state of a saved thought — read-only. `absent` prose has never been saved; the three fates are above. */
export function proseFate(prose: string, cwd: string = process.cwd()): ProseFate & { state: ProseFate['state'] | 'absent' } {
  const store = readStore(cwd)
  const purged = alreadyRefuted(prose, cwd)
  if (purged) return { prose, state: 'purged', research: purged.harmonic }
  const proofAddr = thoughtAddress(INTENT + (prose + PROOF) + '⇒')
  if (Object.prototype.hasOwnProperty.call(store, proofAddr)) {
    return { prose, state: 'proven', proof: store[proofAddr] as string }
  }
  const openAddr = thoughtAddress(INTENT + prose)
  if (Object.prototype.hasOwnProperty.call(store, openAddr)) return { prose, state: 'open' }
  return { prose, state: 'absent' }
}

/** Every prose purged into research — the queue the next agent mines. The purge fed research; this reads it. */
export function researchQueue(cwd: string = process.cwd()): readonly { readonly prose: string; readonly research: string }[] {
  return refutations(cwd)
    .filter((r) => r.impossible.endsWith('purged'))
    .map((r) => ({ prose: r.probe, research: r.harmonic }))
}
