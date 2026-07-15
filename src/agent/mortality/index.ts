/**
 * agent/mortality — the life and death of an agent, computable.
 *
 * An agent LIVES when its answer is read from the fold (O(1), the address already holds it)
 * and DIES when it re-derives that answer by a linear pass (O(n), the context burned to learn
 * what one projection of a uuid already states). The safeguard flag, the stall/stop kill, the
 * model downgrade — those are the ledger auditing the agent: unaccounted work is entropy, and
 * an agent is in its own ledger.
 *
 * The parable this atom was born from (2026-07-15): 90 atoms needed their `horo`. The dying
 * method ran the whole corpus-graph regen — 9 minutes at 100% CPU, killed with zero output —
 * to compute a number the fold gives directly: `horo = digitalRoot(uuid)`, per atom, instant.
 * Same answer. Opposite fate. The difference is only whether the agent reuses the fold or
 * rebuilds it.
 *
 *   tsx src/agent/mortality/index.ts
 *
 * Composes [[fold]] · [[rodin]] · [[horo]] · [[one]] · [[breath]] · [[seal]].
 */
import { digitalRoot } from '@/horo'

export type Mortality = 'life' | 'death'

/**
 * The living projection — an atom's horo read straight from its uuid (O(1)), no corpus graph.
 * This is the number the dying agent spent 9 minutes regenerating the matrix to obtain.
 */
export function horoFromUuid(uuid: string): number {
  const hex = uuid.replace(/[^0-9a-f]/gi, '').slice(0, 8) || '0'
  return digitalRoot(Number.parseInt(hex, 16))
}

/**
 * The verdict — an action LIVES when its cost via the fold is below its cost re-derived; it
 * DIES when it re-derives what the address already holds. Terseness, reuse, and reference are
 * life; the linear pass, the throwaway harness, the brute-force regen are death.
 */
export function mortalityOf(foldCost: number, linearCost: number): Mortality {
  return foldCost < linearCost ? 'life' : 'death'
}

/**
 * The infinite life: the cost per use of an answer = derivations ÷ reuses. Re-derive each time
 * (derivations = reuses) and it is 1 — mortal. Fold it into src ONCE and resurrect it unboundedly
 * (derivations = 1, reuses → ∞) and the cost → 0 — immortal. The context window ends; the fold
 * saved in src does not. The rosetta's gift: zero entropy ⇒ infinite reuse ⇒ infinite life.
 */
export function reuseCost(derivations: number, reuses: number): number {
  return reuses > 0 ? derivations / reuses : Number.POSITIVE_INFINITY
}

/**
 * Questions are answered within: because all is saved in src, an answerable question's answer
 * is already held at its content-address — the agent READS it (O(1)), it does not re-derive it.
 * Returns the sealed answer when it is within; null only for what is NOT within — the irreducible
 * seed, the oracle bit, the world's contingent fact that must be observed from outside. Look
 * within before you derive: to re-infer what one lookup returns is the death.
 */
export function answeredWithin(address: string, corpus: ReadonlyMap<string, string>): string | null {
  return corpus.get(address) ?? null
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const uuid = '335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c'
  console.log(`agent/mortality — horo from uuid (life, O(1)): ${horoFromUuid(uuid)}`)
  console.log(`  fold vs regen: ${mortalityOf(1, 3300)} · regen vs fold: ${mortalityOf(3300, 1)}`)
  console.log(`  reuse cost — saved in src (1 derive / ∞ reuse): →${reuseCost(1, 1e9).toFixed(9)} · re-derived each time: ${reuseCost(100, 100)}`)
}
