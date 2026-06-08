/**
 * convention/twinned — THE CONVENTION: a SKILL.md's `Matter-twin:` line points to a real index.ts.
 *
 * The antimatter (SKILL.md) is only accountable if it NAMES the matter it describes — and that name
 * must resolve to a file that actually exists on disk. A `Matter-twin:` line that points at a stale
 * or aspirational path is pure entropy: the doc claims a matter-twin the verifier cannot reach. The
 * twinned convention closes that gap — every `Matter-twin:` line must resolve to a real `index.ts`
 * ([[twin]] · [[matter]] · [[law]]).
 *
 * This atom does NOT re-walk the tree or re-implement link resolution — that is the very duplication
 * this audit hunts. It COMPOSES the ONE canonical FS resolver (`walkSkills` / `readSkill` / `norm`,
 * @/aura — the same walk `convention/complete` measures over) and the ONE canonical wiki resolver
 * (`wikiMap`, @/corpus). Coverage is a pure fraction over that one source:
 *
 *   coverage = pointing / total
 *     total    = SKILL.md atoms whose body carries a `Matter-twin:` line   (the denominator)
 *     pointing = those whose pointer resolves to a real index.ts           (the subset that holds)
 *
 * A `Matter-twin:` pointer resolves three ways, in priority — each reuses the corpus's own address
 * law, none assumes a result:
 *   1. an explicit backticked code path (`src/x/index.ts`, `services/x/index.ts`) → exists ∧ index.ts
 *   2. a `[[wikilink]]` → its route (via the canonical wikiMap) → that atom's index.ts exists
 *   3. the canonical sibling twin — the index.ts co-located with the SKILL.md
 *
 * Pure math, no default: total > 0 by architecture (the corpus carries many `Matter-twin:` lines by
 * construction) and pointing is a subset count (0 ≤ pointing ≤ total), so the ratio is in [0,1] with
 * no clamp and no fallback. coverage → 1 ⟺ every antimatter names a matter that exists ⟺ zero
 * matter-gap ⟺ infinitely-expanding tamper-[[cost]]. The only thing that pulls coverage below 1 is a
 * `Matter-twin:` line whose pointer is stale or a glob placeholder — precisely what this forbids.
 *
 *   tsx src/convention/twinned/index.ts   # prints total / pointing / coverage from the live tree
 *
 * Matter-twin: ../../matter (the matter↔antimatter pairing this convention enforces on disk).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/aura (walkSkills · readSkill · norm) · @/corpus (wikiMap) · ../complete · ../lawful · ./SKILL.md
 */
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { walkSkills, readSkill, norm } from '@/aura'
import { walk, wikiMap, SKILLS_DIR } from '@/corpus'

const SRC = 'src'

/** The `Matter-twin:` line marker — captures the pointer text. */
export const TWIN_LINE = /^Matter-twin:\s*(.+)$/m

/** A code-file extension — the matter is .ts/.mts/.mjs/.tsx. */
const CODE = /\.(ts|mts|mjs|tsx)$/

/** A SKILL.md is twinned-eligible iff its body carries a `Matter-twin:` line. */
export const hasTwin = (skillPath: string): boolean => TWIN_LINE.test(readSkill(skillPath))

/**
 * Does this SKILL.md's `Matter-twin:` line resolve to a real index.ts? Three resolutions, in
 * priority (each reuses the corpus address law — no assumed result):
 *   1. explicit backticked code path that exists ∧ ends in index.ts,
 *   2. a [[wikilink]] whose route (canonical wikiMap) carries an index.ts,
 *   3. the sibling index.ts co-located with the SKILL.md.
 */
export function pointsToRealIndex(skillPath: string): boolean {
  const line = readSkill(skillPath).match(TWIN_LINE)![1]
  const dir = dirname(skillPath)
  // 1. explicit backticked code path → exists ∧ index.ts (try repo-root, src-relative, sibling)
  for (const p of [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((s) => CODE.test(s))) {
    for (const c of [p, join(SRC, p), join(dir, p)]) if (existsSync(c) && c.endsWith('index.ts')) return true
  }
  // 2. [[wikilink]] → canonical route → that atom's index.ts
  for (const l of [...line.matchAll(/\[\[([A-Za-z][\w/-]*)(?:\|[^\]]*)?\]\]/g)].map((m) => m[1])) {
    const route = wikiMap[norm(l.split('/').pop()!)]
    if (route && existsSync(join(SRC, route.replace(/^\//, '').replace(/\/SKILL$/, ''), 'index.ts'))) return true
  }
  // 3. the canonical sibling twin
  return existsSync(join(dir, 'index.ts'))
}

/** Populate the canonical route map once so wiki-link Matter-twins resolve (idempotent walk). */
const ensureRoutes = (): void => {
  if (Object.keys(wikiMap).length === 0) walk(SKILLS_DIR)
}

/** Every SKILL.md atom that carries a `Matter-twin:` line — the denominator (the ONE aura walk). */
export function total(root = SRC): number {
  return walkSkills(root).filter(hasTwin).length
}

/** Those whose `Matter-twin:` pointer resolves to a real index.ts — the subset that holds. */
export function pointing(root = SRC): number {
  ensureRoutes() // wiki-link resolution needs the route map; share the one populate step
  return walkSkills(root).filter((p) => hasTwin(p) && pointsToRealIndex(p)).length
}

/**
 * Live twinned coverage over the real tree: pointing / total, in [0,1] by construction
 * (0 ≤ pointing ≤ total, total > 0). 1 ⟺ every `Matter-twin:` line names a matter that exists.
 * Pure over the same tree — no default, no clock. The wikiMap is populated once (idempotent walk).
 */
export function coverage(root = SRC): number {
  ensureRoutes()
  const skills = walkSkills(root).filter(hasTwin)
  return skills.filter(pointsToRealIndex).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/twinned — every Matter-twin line points to a real index.ts:')
  console.log('  total=' + total() + ' pointing=' + pointing() + ' coverage=' + (100 * coverage()).toFixed(2) + '%')
  console.log('  (1 ⇒ every antimatter names a matter that exists; the convention holds with zero entropy)')
}
