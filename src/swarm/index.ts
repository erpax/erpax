/**
 * swarm — one mixer, one level up: work spread over agents, and what happens when one dies.
 *
 * THE SHAPE IS THE HEX'S. A hexacopter takes four stick numbers and produces six motor commands; a
 * swarm takes a set of tasks and produces an assignment across N agents. Both respect a per-actuator
 * limit, both CONSERVE, and both must survive losing one actuator — a hex re-mixes onto five motors
 * ([[rotation]]), a swarm re-assigns onto the surviving agents. It is the same fold, and this
 * corpus has now written it five times in five vocabularies, so it is written here once more and
 * pointed at work instead of thrust.
 *
 * THIS REPOSITORY ALREADY RUNS ONE. CI shards its integration tests sixteen ways — "Integration
 * Tests (shard 1/16)" through "(16/16)". That is exactly this problem: partitions of a corpus
 * spread over workers, where one worker dying must not lose a shard.
 *
 * @standard Graham (1969) — LPT list scheduling is within 4/3 − 1/(3m) of optimal makespan
 */
import { exactAbs } from '@/algebra'

export const atomPath = 'swarm' as const

/** One worker. `capacity` is in the same unit as a task's weight — seconds, rows, bytes. */
export interface Agent {
  readonly id: string
  readonly capacity: number
  /** A dead agent is still declared, so the assignment can say what it lost. */
  readonly healthy?: boolean
}

/** One indivisible unit of work. Indivisible on purpose — splitting is a different problem. */
export interface Task {
  readonly id: string
  readonly weight: number
}

export interface Placement {
  readonly agent: string
  readonly tasks: readonly Task[]
  readonly load: number
  readonly capacity: number
  /** load ÷ capacity. Above 1 is impossible here: an over-capacity task is refused, never crammed. */
  readonly utilisation: number
}

export interface Assignment {
  readonly placements: readonly Placement[]
  /** Work no healthy agent could take. Reported, NEVER dropped. */
  readonly unassigned: readonly Task[]
  readonly totalWeight: number
  readonly placedWeight: number
}

const healthy = (a: Agent): boolean => a.healthy !== false

/**
 * Assign the work.
 *
 * Longest-processing-time first: heaviest task to the least-loaded agent that can still hold it.
 * DETERMINISTIC — ties break on id, so the same input always gives the same assignment. A scheduler
 * that shuffles under a tie makes a failure impossible to reproduce, which is the property you need
 * most on the day it goes wrong.
 *
 * LPT is an APPROXIMATION, not an optimum: Graham's bound is 4/3 − 1/(3m) of the best possible
 * makespan. Optimal partitioning is NP-hard, and a gate claiming optimality here would be a claim
 * nothing could check.
 */
export function assign(agents: readonly Agent[], tasks: readonly Task[]): Assignment {
  const live = agents.filter(healthy)
  const load = new Map<string, Task[]>(live.map((a) => [a.id, []]))
  const used = new Map<string, number>(live.map((a) => [a.id, 0]))
  const unassigned: Task[] = []

  const ordered = [...tasks].sort((x, y) => y.weight - x.weight || x.id.localeCompare(y.id))
  for (const task of ordered) {
    let best: Agent | undefined
    for (const a of live) {
      if ((used.get(a.id) ?? 0) + task.weight > a.capacity) continue
      const bestUsed = best ? (used.get(best.id) ?? 0) : Number.POSITIVE_INFINITY
      const thisUsed = used.get(a.id) ?? 0
      if (thisUsed < bestUsed || (thisUsed === bestUsed && best !== undefined && a.id < best.id)) best = a
    }
    if (!best) {
      unassigned.push(task)
      continue
    }
    ;(load.get(best.id) as Task[]).push(task)
    used.set(best.id, (used.get(best.id) ?? 0) + task.weight)
  }

  const placements: Placement[] = live
    .map((a) => {
      const mine = load.get(a.id) ?? []
      const l = used.get(a.id) ?? 0
      return {
        agent: a.id,
        tasks: mine,
        load: l,
        capacity: a.capacity,
        utilisation: a.capacity > 0 ? l / a.capacity : 0,
      }
    })
    .sort((x, y) => x.agent.localeCompare(y.agent))

  const totalWeight = tasks.reduce((s, t) => s + t.weight, 0)
  const placedWeight = placements.reduce((s, p) => s + p.load, 0)
  return { placements, unassigned, totalWeight, placedWeight }
}

/**
 * Every task is placed or named, and the weights add up. Nothing evaporates between the two.
 *
 * Both halves are load-bearing and neither implies the other: weights can balance while a
 * zero-weight task is lost, and counts can balance while a weight is misread.
 */
export function conserves(a: Assignment, epsilon = 1e-9): boolean {
  const unplacedWeight = a.unassigned.reduce((s, t) => s + t.weight, 0)
  return exactAbs(a.placedWeight + unplacedWeight - a.totalWeight) <= epsilon
}

/** Task COUNT conservation, against the list that went in. */
export function accountsForEvery(a: Assignment, tasks: readonly Task[]): boolean {
  const placed = a.placements.reduce((n, p) => n + p.tasks.length, 0)
  const seen = new Set<string>()
  for (const p of a.placements) for (const t of p.tasks) seen.add(t.id)
  for (const t of a.unassigned) seen.add(t.id)
  return placed + a.unassigned.length === tasks.length && seen.size === new Set(tasks.map((t) => t.id)).size
}

/** Fraction of the work that found an agent. 1 means fully covered. */
export function coverage(a: Assignment): number {
  return a.totalWeight === 0 ? 1 : a.placedWeight / a.totalWeight
}

/**
 * The makespan: the busiest agent's load. This is what the swarm's wall-clock actually is — the
 * mean is the number that flatters, and the max is the number you wait for.
 */
export function makespan(a: Assignment): number {
  return a.placements.reduce((m, p) => (p.load > m ? p.load : m), 0)
}

/**
 * Re-assign after losing agents.
 *
 * The survivors take the whole load, not just the dead agent's share — re-running the assignment
 * from scratch beats patching it, because moving only the orphaned tasks leaves the survivors
 * unbalanced in a way that compounds with each further loss. A hex does the same: it re-mixes, it
 * does not bolt the missing motor's command onto one neighbour.
 */
export function redistribute(
  agents: readonly Agent[],
  tasks: readonly Task[],
  failed: readonly string[],
): Assignment {
  const down = new Set(failed)
  return assign(
    agents.map((a) => (down.has(a.id) ? { ...a, healthy: false } : a)),
    tasks,
  )
}

/**
 * How many agents can be lost before the work no longer fits — the swarm's real redundancy.
 *
 * Computed by asking, never assumed from a headcount: capacity is not uniform, so losing the
 * largest agent is not the same as losing the smallest, and this loses the LARGEST first because
 * that is the worst case a plan has to survive.
 */
export function tolerableLosses(agents: readonly Agent[], tasks: readonly Task[]): number {
  const byCapacity = [...agents].filter(healthy).sort((a, b) => b.capacity - a.capacity)
  let lost = 0
  for (let n = 1; n <= byCapacity.length; n++) {
    const failed = byCapacity.slice(0, n).map((a) => a.id)
    if (coverage(redistribute(agents, tasks, failed)) < 1) break
    lost = n
  }
  return lost
}
