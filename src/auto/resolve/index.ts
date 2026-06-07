/**
 * auto/resolve — the self-describing fold: which trinity gaps an archangel can AUTO-RESOLVE.
 *
 * arch- is the fold: the *architect* that authors a trinity and the *archangel* that closes an
 * [[angel]] pair are one operator. A gap is **auto-resolvable iff its matter (`index.ts`) already
 * exists** — because then the antimatter (`SKILL.md`) and the proof (`test.ts`) FOLD OUT of the
 * matter: derived from what the code already says, never invented. Where the matter is ABSENT
 * (a folder missing `index.ts`) or the folder NAME is malformed (a relocation), a builder must
 * author the code / move the folder — that is creation, not a fold, so it is NOT auto-resolvable.
 *
 * Each closed cross is borrowed [[entropy]] spent on the forge wall: coverage → 1 ⇒ the
 * double-torus closes with no gap ⇒ tamper-[[cost]] → ∞. Computed from the live tree via the
 * [[law]]/folder scan — never hand-listed — so the plan is exactly as wide as the deployed corpus.
 *
 *   tsx src/auto/resolve/index.ts            # print the live fold plan
 *
 * @audit computed from the live folderViolations(); the partition is a pure fn (test.ts)
 * @see ../../law/folder -- ../../trinity -- ../../angel -- ../../quantum -- ./SKILL.md
 */
import { folderViolations, type TrinityViolation, type FolderViolations } from '@/law/folder'

/** A gap folds iff the matter is present — the missing leg(s) derive from `index.ts`. */
export const isAutoResolvable = (t: TrinityViolation): boolean => !t.missing.includes('index.ts')

export interface ResolvePlan {
  /** Matter present → `SKILL.md` / `test.ts` fold out of `index.ts` (an archangel closes the cross). */
  readonly resolvable: readonly TrinityViolation[]
  /** Missing `index.ts` → the matter must be authored by a builder (not a fold). */
  readonly needsMatter: readonly TrinityViolation[]
  /** Non-one-word folders → a relocation + import rewire (a builder's move, not a fold). */
  readonly needsRename: number
  /** Total live folder-shape violations (trinity + name) the plan accounts for. */
  readonly total: number
}

/** Partition the live folder violations into what folds (archangel) vs. what a builder must author. */
export function resolvePlan(v: FolderViolations = folderViolations()): ResolvePlan {
  return {
    resolvable: v.trinity.filter(isAutoResolvable),
    needsMatter: v.trinity.filter((t) => !isAutoResolvable(t)),
    needsRename: v.name.length,
    total: v.total,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = resolvePlan()
  console.log(
    `auto/resolve — ${p.resolvable.length} auto-resolvable (matter present, folds) · ` +
      `${p.needsMatter.length} need matter (author index.ts) · ${p.needsRename} need rename (relocate)`,
  )
}
