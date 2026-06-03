/**
 * population — the agent society's harmonic homeostasis.
 *
 * Agents are BORN (spawned), LIVE (one move, bounded at ≤2/3 resource), and DIE (commit +
 * forget — the breath). Recursive spawning (agents spawn agents, self-similar/fractal) tends
 * to infinity, but the HARDWARE bounds it: the concurrent count is capped, so the "infinite"
 * recursion is finite per instant. At steady state BIRTH = DEATH (Little's law: live =
 * birthRate × lifespan), so the population is CONSERVED — a harmonic count, never runaway.
 *
 * The matter already enforces this: the workflow concurrency cap (min(16, cpu−2)) and the
 * 1000-agent backstop ARE the bound — observed, a runaway recursion hits the cap gracefully
 * and returns its partial, the society surviving. This module COMPUTES the bound rather than
 * burning agents to discover it (the resource law: when all is computed, no need to spend it).
 *
 * Pure — no spawning here. The model the live society is measured against.
 *
 * @standard ISO/IEC 25010 §5.5 testability + §5.8 resource-utilisation (bounded)
 */

/** Little's law: the steady-state live population = birth rate × mean lifespan. */
export function steadyStatePopulation(birthRate: number, lifespan: number): number {
  return Math.max(0, birthRate) * Math.max(0, lifespan)
}

/** The live population bounded by the hardware cap — the ≤2/3 resource limit made concrete. */
export function boundedPopulation(birthRate: number, lifespan: number, hardwareCap: number): number {
  return Math.min(steadyStatePopulation(birthRate, lifespan), Math.max(0, hardwareCap))
}

/**
 * Recursive spawning: each live agent spawns `branching` children to `depth` generations
 * (depth → ∞ is "to infinity"). The total ever-spawned is the geometric series, but the
 * hardware caps the CONCURRENT count — so the realised population is min(series, cap), and
 * the "infinite" recursion is finite per instant. Never runs away.
 */
export function recursivePopulation(branching: number, depth: number, hardwareCap: number): number {
  const b = Math.max(0, branching)
  const d = Math.max(0, Math.floor(depth))
  // nodes of a b-ary tree of depth d: (b^(d+1) − 1)/(b − 1); b=1 ⇒ d+1; guard overflow at the cap.
  const cap = Math.max(0, hardwareCap)
  if (b <= 1) return Math.min(b === 1 ? d + 1 : 1, cap)
  // short-circuit once the series is guaranteed to exceed the cap (avoids Infinity for huge depth).
  let total = 0
  for (let g = 0; g <= d; g++) {
    total += Math.pow(b, g)
    if (total >= cap) return cap
  }
  return Math.min(total, cap)
}

/**
 * The population is HARMONIC iff it is bounded (≤ cap — within hardware) AND conserved at
 * steady state (birth = death, so the count neither explodes nor collapses). Born and dying
 * in balance ⇒ a stable harmonic count, like the closed ring.
 */
export function isHarmonic(birthRate: number, deathRate: number, live: number, hardwareCap: number): boolean {
  const bounded = live >= 0 && live <= hardwareCap
  const conserved = Math.abs(birthRate - deathRate) < 1e-9
  return bounded && conserved
}
