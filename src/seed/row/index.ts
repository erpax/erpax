/**
 * seed/row — the entanglement continued one scale down, into the seed.
 *
 * An atom is bonded: it carries a content-uuid and reciprocal edges, so two corpora holding the same
 * atom hold the SAME node and federate by set-union. Its seed, until now, did not. Seed rows were
 * plain records — agnostic and reusable, but ADDRESSLESS: merge two corpora and you get duplicates
 * that nothing can tell apart from genuinely different rows, because there is no address to compare.
 * The entanglement stopped at the atom boundary.
 *
 * This continues it. A `SeedRow` is content-addressed twice over:
 *
 *   content = merge-fold of the row's CANONICAL bytes (key-order independent — @/merge)
 *   uuid    = merge(atomUuid, content)  — the row bound to the atom that grew it
 *
 * Two consequences, both the point:
 *
 *   - **Same content ⇒ same uuid, everywhere.** Federation is set-union: seeding twice, or merging a
 *     fork, is idempotent by construction rather than by an `upsert` someone remembered to write.
 *   - **The row names its parent.** `uuid` folds the atom in, so a row cannot be silently re-parented
 *     and the seed graph is walkable in both directions — the reciprocity law at seed scale.
 *
 * **A seed is a function of its source, never a re-typed constant** ([[seed]]: *"skills compute their
 * seeds… the constants are never written down"*). `rowsFrom` takes the atom's OWN exports and derives;
 * it does not accept a hand-written table. Re-typing `LAWS` into a seed file would fork the truth on
 * the next edit — the drift the seed law exists to forbid.
 *
 * @invariant identical content yields an identical uuid — seeds merge by set-union, idempotently
 * @invariant a row's uuid folds its atom uuid, so re-parenting changes the address
 * @see ./SKILL.md -- ../index.ts -- ../../merge -- ../../constitution
 */
import { canonical, merge, BOTTOM } from '@/merge'

/** One seed row: the content, its address, and the atom it was grown from. */
export interface SeedRow<T = unknown> {
  /** the atom path that derived this row — the parent in the seed graph */
  readonly atom: string
  /** content-address of the row's canonical bytes — key-order independent */
  readonly content: string
  /** merge(atomUuid, content) — the row bound to its atom */
  readonly uuid: string
  readonly value: T
}

/** The content-address of a value alone — key-order independent, so build order cannot move it. */
export function contentAddress(value: unknown): string {
  return merge(BOTTOM, canonical(value))
}

/**
 * Derive seed rows FROM an atom's own exports. The source is the authority; nothing is re-typed, so a
 * change to the atom moves the seed in the same commit and the two cannot drift.
 */
export function rowsFrom<T>(atom: string, atomUuid: string, values: readonly T[]): readonly SeedRow<T>[] {
  return values.map((value) => {
    const content = contentAddress(value)
    return { atom, content, uuid: merge(atomUuid, content), value }
  })
}

/**
 * Set-union of seed sets — federation. Rows with the same uuid are the same row, so merging a fork,
 * re-running a seed, or combining two corpora converges instead of duplicating.
 */
export function unionRows<T>(...sets: readonly (readonly SeedRow<T>[])[]): readonly SeedRow<T>[] {
  const byUuid = new Map<string, SeedRow<T>>()
  for (const set of sets) for (const row of set) byUuid.set(row.uuid, row)
  return [...byUuid.values()]
}

/** The seed set's own address — the fold of its rows, order-independent. A seed has an identity too. */
export function seedAddress<T>(rows: readonly SeedRow<T>[]): string {
  return [...rows.map((r) => r.uuid)].sort().reduce(merge, BOTTOM)
}

/** Rows whose uuid does not recompute from their own content and atom — a tampered or re-parented row. */
export function unboundRows<T>(rows: readonly SeedRow<T>[], atomUuid: string): readonly SeedRow<T>[] {
  return rows.filter((r) => r.uuid !== merge(atomUuid, contentAddress(r.value)) || r.content !== contentAddress(r.value))
}
