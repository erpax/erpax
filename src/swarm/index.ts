/**
 * swarm — one mixer, one level up: work spread over agents, and what happens when one dies. THE SHAPE IS THE HEX'S. See SKILL.md.
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

/** Assign the work. Longest-processing-time first: heaviest task to the least-loaded agent that can still hold it. See SKILL.md. */
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

/** Every task is placed or named, and the weights add up. Nothing evaporates between the two. See SKILL.md. */
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

/** The makespan: the busiest agent's load. See SKILL.md. */
export function makespan(a: Assignment): number {
  return a.placements.reduce((m, p) => (p.load > m ? p.load : m), 0)
}

/**
 * Graham's 1969 bound as arithmetic: (4m − 1) ÷ 3m, the exact rational form of
 * 4/3 − 1/(3m). One division, so `lptBound(3)` is 11/9 and never a typed 1.222.
 *
 * m = 1 gives exactly 1 — LPT on one machine IS optimal — and the bound rises toward
 * 4/3 as m grows, never reaching it.
 */
export function lptBound(m: number): number {
  return m > 0 ? (4 * m - 1) / (3 * m) : 1
}

/**
 * A lower bound on the OPTIMAL makespan: no schedule beats the heaviest single task
 * (it runs somewhere, whole — tasks are indivisible), and none beats the perfectly
 * level split of the total across m machines.
 */
export function optimalMakespanFloor(tasks: readonly Task[], m: number): number {
  if (m <= 0 || tasks.length === 0) return 0
  const total = tasks.reduce((s, t) => s + t.weight, 0)
  const heaviest = tasks.reduce((x, t) => (t.weight > x ? t.weight : x), 0)
  const level = total / m
  return heaviest > level ? heaviest : level
}

/** What `grahamVerdict` answers, including when it refuses to answer. */
export interface GrahamVerdict {
  /** False when the theorem's hypotheses do not hold here — then `holds` is null. */
  readonly applies: boolean
  readonly reason: string
  readonly machines: number
  readonly bound: number
  readonly floor: number
  readonly makespan: number
  /** makespan ÷ floor, or 0 when there is no work. */
  readonly ratio: number
  /** null when the theorem does not apply — never `false` by omission. */
  readonly holds: boolean | null
}

/**
 * Check the cited standard instead of only citing it.
 *
 * Graham's theorem is about **identical** machines and a schedule that places every
 * task. This atom's `assign` does neither by default: capacities may differ, and a
 * task heavier than every agent is REFUSED rather than crammed. So the hypotheses are
 * tested first and the verdict is `applies: false` with a reason — never a `holds:
 * false` that reads as a refutation of Graham when it is really a model mismatch
 * (rules/unraised: a claim that defaults by omission).
 *
 * Where it does apply, `ratio ≤ bound` is measured against the FLOOR, not against the
 * optimum, which nothing here can compute (partitioning is NP-hard). Since
 * floor ≤ optimum, passing against the floor is SUFFICIENT for Graham's conclusion —
 * and failing it is not a counterexample to the theorem, only a loose floor. That
 * asymmetry is the honest half, and it is why `holds` is reported beside `ratio`
 * rather than instead of it.
 */
export function grahamVerdict(agents: readonly Agent[], tasks: readonly Task[]): GrahamVerdict {
  const live = agents.filter(healthy)
  const m = live.length
  const a = assign(agents, tasks)
  const capacities = new Set(live.map((x) => x.capacity))
  const identical = capacities.size <= 1
  const complete = a.unassigned.length === 0
  const applies = m > 0 && identical && complete
  const reason =
    m === 0
      ? 'no healthy agent — no schedule to bound'
      : !identical
        ? `capacities differ (${capacities.size} distinct) — Graham's bound is for identical machines`
        : !complete
          ? `${a.unassigned.length} task(s) refused — the theorem bounds a schedule that places every task`
          : 'identical machines, every task placed'
  const bound = lptBound(m)
  const floor = optimalMakespanFloor(tasks, m)
  const span = makespan(a)
  const ratio = floor > 0 ? span / floor : 0
  return { applies, reason, machines: m, bound, floor, makespan: span, ratio, holds: applies ? ratio <= bound : null }
}

/** Re-assign after losing agents. See SKILL.md. */
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

/** How many agents can be lost before the work no longer fits — the swarm's real redundancy. See SKILL.md. */
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
