/**
 * development — building toward a goal: a feasibility-ranked [[roadmap]] of capabilities, driven
 * by the self-building loop ([[generate]] → [[aura]] whole, [[society]]). A Development is a
 * planned capability with a feasibility; `ranked` orders them (now → near → research), `nextMove`
 * picks the first to do, and the society advances one gate-verified step at a time ([[sequence]]).
 *
 * HONEST: this is a planning/ranking structure over named capabilities — the ENGINEERING sense of
 * "development", composed with the corpus self-build loop; not economic or human development.
 *
 *   tsx src/development/index.ts
 *
 * @see ../roadmap -- ../generate -- ../society -- ../sequence -- ../quantum/development -- ./SKILL.md
 */

/** How soon a development can ship. */
export type Feasibility = 'now' | 'near' | 'research'

export interface Development {
  readonly name: string
  readonly what: string
  readonly feasibility: Feasibility
  /** existing atoms it would compose */
  readonly composes: readonly string[]
}

export type Roadmap = readonly Development[]

const ORDER: Record<Feasibility, number> = { now: 0, near: 1, research: 2 }

/** Rank a roadmap by feasibility (now first), stable within a tier. */
export const ranked = (r: Roadmap): Development[] => [...r].sort((a, b) => ORDER[a.feasibility] - ORDER[b.feasibility])

/** The next move: the highest-feasibility development (the first `now`, else the nearest). */
export const nextMove = (r: Roadmap): Development | undefined => ranked(r)[0]

/** Developments at a given feasibility tier. */
export const atTier = (r: Roadmap, f: Feasibility): Development[] => r.filter((d) => d.feasibility === f)

if (import.meta.url === 'file://' + process.argv[1]) {
  const demo: Roadmap = [
    { name: 'b', what: 'a near thing', feasibility: 'near', composes: [] },
    { name: 'a', what: 'a now thing', feasibility: 'now', composes: [] },
  ]
  console.log('development — roadmap mechanics: nextMove = ' + nextMove(demo)?.name + ' (now-first)')
}
