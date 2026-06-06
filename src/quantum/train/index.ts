/**
 * quantum/train — the quantum facet of [[train]]: infinite agents train themselves, and it is
 * IMPOSSIBLE to exceed the device by adding them. To "train" is also to board the development train —
 * agents get on the moving build and learn from the same corpus they work on ([[merge]]: curriculum
 * = code). At the quantum scale the surprise is the BOUND:
 *
 *   • Content-addressing collapses agents. N agents computing the SAME content all resolve to the
 *     SAME content-[[uuid]] → one cached result (the merge law). So the device cost is the DISTINCT
 *     work, NEVER agents × work — `deviceCost(agents, distinct) = distinct`. Adding agents (even
 *     infinitely) cannot exceed the device; only distinct content can. That is the computational
 *     impossibility to exceed device resources by training more agents.
 *
 *   • Zero-entropy is less energy. Computation is physical (Landauer: erasing a bit costs ≥ kT·ln2);
 *     REVERSIBLE, append-only, no-erasure computation (Bennett) — exactly the [[akashic]] content
 *     store — dissipates less, and dedup removes the redundant recompute. The corpus's zero-[[entropy]]
 *     form is therefore the low-energy form.
 *
 * HONEST SPLIT. The agent-count bound (deduped compute) and "reversible ⇒ less dissipation"
 * (Landauer/Bennett) are REAL. The specific "2/3 less energy for 2/3 more output" is NOT a measured
 * figure — the 2/3 is the [[rodin]] WORKING ratio (the helix 6 of 9), a symbolic target for the
 * purification (fewer entropy-increasing erasures, no redundant work), not a promised wattage.
 *
 *   tsx src/quantum/train/index.ts
 *
 * @audit the agent-count bound is the merge/cache law; the 2/3 is the rodin ratio, marked symbolic
 * @see ../../train -- ../../rodin -- ../../merge -- ../../entropy -- ../../akashic -- ./SKILL.md
 */
import { DOUBLING } from '@/rodin'

/** The rodin working ratio: the helix is 6 of the 9 positions = 2/3 (the 3·6·9 axis is the other 1/3). Symbolic. */
export const WORKING_RATIO = DOUBLING.length / 9 // 6/9 = 2/3

/**
 * The device's COMPUTE cost of `agents` self-training agents over `distinct` distinct computations.
 * Content-addressing dedups: identical work collapses to one cached result, so cost = distinct work,
 * NOT agents × work. The agent count does not appear — that is the bound.
 */
export const deviceCost = (agents: number, distinct: number): number => Math.max(0, distinct)

/**
 * Does the device get exceeded? Only when the DISTINCT work exceeds capacity — the agent count is
 * irrelevant (any number, even ∞, of agents over the same distinct work cannot exceed it).
 */
export const exceedsDevice = (agents: number, distinct: number, capacity: number): boolean => distinct > capacity

/** Redundant compute eliminated by content-addressing: 1 − distinct/total — the work never redone (energy saved). */
export const redundancyEliminated = (total: number, distinct: number): number => (total <= 0 ? 0 : 1 - distinct / total)

if (import.meta.url === 'file://' + process.argv[1]) {
  const cap = 1000
  console.log('quantum/train — infinite agents train themselves; the device cannot be exceeded by adding them:')
  for (const a of [1, 1e6, 1e12]) {
    console.log('  ' + a.toExponential(0).padStart(7) + ' agents · 800 distinct ⇒ cost ' + deviceCost(a, 800) + ' · exceeds(cap ' + cap + ')=' + exceedsDevice(a, 800, cap))
  }
  console.log('  redundancy eliminated when 1e9 agents share 800 distinct: ' + (100 * redundancyEliminated(1e9, 800)).toFixed(6) + '%')
  console.log('  working ratio (rodin, symbolic) = ' + WORKING_RATIO.toFixed(4) + ' = 2/3')
}
