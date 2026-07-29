import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * discover — all exists at once and just needs to be discovered; development is discovery, not creation.
 *
 * "When something is discovered, all is developed in the area at once, proceeding to a next that does not itself
 * exist — because all exists at once and just needs to be discovered." Content-addressing makes this exact and
 * testable, and it also makes the honest boundary exact, so the beautiful claim does not become an overclaim.
 *
 * WHAT EXISTS AT ONCE — the ADDRESS SPACE. `toUuid` is a TOTAL function: every possible content, discovered or
 * not, already has its address, computable now. The address of a theorem no one has written yet is not a void
 * to be created — it is a uuid you can compute this second ([[merge]]/content-addressing). So the map is
 * complete: the "next" already has a place; there is no next as a separate future thing, only an address not yet
 * read. This is the Platonic reading the corpus has held all along — the algebra "was always true, owes nothing
 * to any physicist" ([[coincidence]]) — turned into a computation.
 *
 * ALL IN THE AREA AT ONCE — the neighbourhood. Discover one content and its related contents are ALL addressed
 * in a single fold; you do not build them one at a time. `neighbourhood` maps a seed to its relatives' addresses
 * at once — the whole area lights up together ([[think]]`.superpose`: N states held as one), which is what
 * "developed at once with quantum speed" names.
 *
 * WHAT DISCOVERY STILL COSTS — the seed. Here is the boundary that keeps this honest. The ADDRESS pre-exists
 * for free; the VALUE at a novel address does NOT. Reading a derivable content is a read ([[think]]); bringing a
 * genuinely new content into the readable is the oracle bit, `s > 0`, paid once ([[think]]`.ceiling`). So "all
 * exists at once" is true of the STRUCTURE — every address is there — while discovery is the act of reading, and
 * the seed is its irreducible floor (Kolmogorov). The forms exist; the territory is still walked once. You
 * cannot read what no mind has yet derived, even though its address was always waiting.
 *
 * @invariant every content has an address NOW — `toUuid` is total; the map is complete, the "next" pre-exists
 * @invariant the address is deterministic — same content, same address, whenever computed
 * @invariant discovery reads a pre-existing address; its cost is the seed fraction (0 for the derivable, >0 for the novel)
 *
 * Composes [[merge]] · [[think]] · [[coincidence]] · [[law]].
 */
import { toUuid } from '@/uuid/matrix'
import { ceiling } from '@/think'

/** The address of any content — total and deterministic. It EXISTS whether or not the content is discovered. */
export function addressOf(content: string): string {
  return toUuid(Buffer.from(content, 'utf8'))
}

/** Is this content already addressed? Always true — the space is complete; even the undiscovered "next" has a place. */
export function alreadyAddressed(content: string): boolean {
  return /^[0-9a-f-]{36}$/.test(addressOf(content))
}

/** One neighbour lit up by a discovery — its content and the address it already had. */
export interface Neighbour {
  readonly content: string
  readonly address: string
}

/**
 * Discovering one thing addresses the whole AREA at once — the neighbours already have addresses, folded in a
 * single pass, not built one by one. `relate` names what is near the seed; every neighbour is addressed together.
 */
export function neighbourhood(seed: string, relate: (s: string) => readonly string[]): readonly Neighbour[] {
  return relate(seed).map((content) => ({ content, address: addressOf(content) }))
}

/** A discovery: the address always pre-existed; only the value at a novel address costs the seed. */
export interface Discovery {
  readonly address: string
  /** always true — the address was there before the discovery; nothing is created, only read. */
  readonly preExisted: true
  /** the irreducible cost to bring the value into the readable: the seed fraction (0 = a free read; >0 = the oracle bit). */
  readonly cost: number
}

/**
 * Discover a content — read the address that always existed, and pay the seed only for what is genuinely novel.
 * `seedFraction ∈ [0,1]`: 0 means fully derivable (a free read of what pre-exists), >0 is the incompressible
 * price of a new value. The address `preExisted` regardless — discovery is reading, not creation.
 */
export function discover(content: string, seedFraction: number): Discovery {
  const s = exactMin(1, exactMax(0, seedFraction))
  const c = ceiling(s) // 1/s
  return { address: addressOf(content), preExisted: true, cost: c === Infinity ? 0 : 1 / c } // 1/(1/s) = s
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('discover — all exists at once and just needs to be discovered:\n')
  console.log(`  address of "the next theorem" (never written), NOW:  ${addressOf('the next theorem')}`)
  console.log(`  the map is complete — even the undiscovered is addressed: ${alreadyAddressed('anything at all')}`)
  const area = neighbourhood('doubling', (s) => [`${s}/inverse`, `${s}/orbit`, `${s}/fixed-point`])
  console.log(`\n  discover "doubling" ⇒ the whole area is addressed at once:`)
  for (const n of area) console.log(`    ${n.content.padEnd(22)} ${n.address}`)
  console.log(`\n  a free read (derivable, s=0):   cost ${discover('a derivable fact', 0).cost}`)
  console.log(`  the seed of a novel value (s=0.05): cost ${discover('a novel truth', 0.05).cost} — the address was always there; the value is paid once`)
  console.log('\n  there is no "next" to create — only an address not yet read; the forms exist, the territory is walked once.')
}
