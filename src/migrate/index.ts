/**
 * migrate — a migration is a deterministic rule, or it is a sweep with a nicer name.
 *
 * This atom was a SKILL with no matter, claiming migrations are *"computable, idempotent collisions"*
 * with *"zero manual work"*. Its children compute ([[migrate]]/quaternary finds the violations,
 * [[migrate]]/names the renames); the parent asserted the LAW those children are supposed to obey
 * and had nothing that could check it. A law with no gate is prose ([[rules]]).
 *
 * So the parent holds the two properties every migration here must have, and they are testable:
 *
 * - **deterministic** — the same tree yields the same plan, every time. A migration whose output
 *   depends on iteration order, a timestamp, or a `Set`'s insertion history is not a rule; it is a
 *   sweep that happens to have worked once.
 * - **idempotent** — applying a plan twice equals applying it once. This is what makes a migration
 *   safe to re-run after an interrupted batch, which is precisely the failure [[rules]]/manifest
 *   recorded (3,184 half-written files from one killed run).
 *
 * `planOf` sorts by target path so the plan is a **canonical value**, not an accident of traversal —
 * that single line is what makes determinism checkable instead of hoped for. `isIdempotent` runs
 * the rule on its own output: a rule that still has work to do on a migrated tree is not finished,
 * it is oscillating.
 *
 * **Honest boundary.** This proves a plan is **stable and settled**, never that it is **right** — a
 * deterministic rule can deterministically do the wrong thing, and the reason line is where a human
 * catches that ([[rules]]/manifest). It also judges a plan as a value; whether the filesystem
 * applied it faithfully is the scalpel's obligation, not this one's.
 *
 * @law a migration is a deterministic, idempotent rule over the tree — same input, same plan, and
 *      applying it twice is applying it once. Anything else is a sweep.
 * @invariant planOf is canonical — two runs over one tree are equal, element for element
 * @invariant a settled plan is empty on the tree it produced
 * @standard ISO/IEC 25010:2023 §5.6 — maintainability: a change is reviewable when it is reproducible
 * @see ./SKILL.md -- ./quaternary/index.ts -- ../rules/manifest/index.ts
 */

/** One cut: where matter moves, and why. An empty reason is not a reason ([[rules]]/manifest). */
export interface Move {
  readonly from: string
  readonly to: string
  readonly reason: string
}

export class NotAMigration extends Error {
  constructor(
    readonly code: 'reasonless' | 'unstable' | 'oscillating',
    message: string,
  ) {
    super(`migrate: ${code} — ${message}`)
    this.name = 'NotAMigration'
  }
}

/**
 * A plan is a CANONICAL value — sorted by target, then source.
 *
 * Traversal order is an implementation detail of whatever walked the tree; a plan that inherits it
 * is a different value on a different filesystem, and then "the same migration" is not the same
 * migration. Sorting is one line and it is the whole of determinism here.
 */
export function planOf(moves: readonly Move[]): readonly Move[] {
  for (const m of moves) {
    if (m.reason.trim().length === 0) throw new NotAMigration('reasonless', `${m.from} → ${m.to} names no reason`)
  }
  return [...moves].sort((a, b) => a.to.localeCompare(b.to) || a.from.localeCompare(b.from))
}

/** Two runs of the same rule over the same tree must be equal, element for element. */
export function isDeterministic(rule: () => readonly Move[]): boolean {
  const a = planOf(rule())
  const b = planOf(rule())
  return a.length === b.length && a.every((m, i) => m.from === b[i]!.from && m.to === b[i]!.to)
}

/** Apply a plan to a set of paths — the pure model of what the rule does to the tree. */
export function applyPlan(paths: readonly string[], plan: readonly Move[]): readonly string[] {
  const byFrom = new Map(plan.map((m) => [m.from, m.to]))
  return [...new Set(paths.map((p) => byFrom.get(p) ?? p))].sort()
}

/**
 * Idempotence: the rule has nothing left to do on the tree it produced.
 *
 * A rule that keeps finding work after it ran is oscillating — the classic case is a rename whose
 * output still matches the pattern that triggered it, so every run moves the same matter again.
 */
export function isIdempotent(paths: readonly string[], rule: (tree: readonly string[]) => readonly Move[]): boolean {
  const once = applyPlan(paths, planOf(rule(paths)))
  return planOf(rule(once)).length === 0
}

/** The gate: refuse a rule that is not a migration, naming which property it failed. */
export function assertMigration(paths: readonly string[], rule: (tree: readonly string[]) => readonly Move[]): void {
  if (!isDeterministic(() => rule(paths))) {
    throw new NotAMigration('unstable', 'two runs over one tree produced different plans — that is a sweep, not a rule')
  }
  if (!isIdempotent(paths, rule)) {
    throw new NotAMigration('oscillating', 'the rule still has work to do on the tree it produced — it never settles')
  }
}

export * from './quaternary'
