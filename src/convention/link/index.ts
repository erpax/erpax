/**
 * convention/link — the no-dead-link law made a LIVE measurement.
 *
 * THE LAW ([[law]]): zero entropy via uuid-wiring every dimension. A `[[link]]` is a
 * wire between two atoms; a DEAD link is a broken wire — a gap in the aura, entropy that
 * raises no tamper-cost. So the convention is: every wikilink resolves to a real atom.
 *
 * THE CHECK — composed, never re-implemented: the resolver is the ONE corpus `wikiMap`
 * (`@/corpus`: `walk(SKILLS_DIR)` populates it, normalized-leaf → route), the SAME map the
 * VitePress docs build and the Payload search ingest resolve `[[links]]` against (and the
 * SAME `norm` the aura speech gate uses — so this gate agrees with those, no false green).
 * We walk the corpus once, read each SKILL.md, extract its `[[links]]`, and count how many
 * resolve. coverage = resolving / total ∈ [0,1]; coverage = 1 ⟺ no dead links ⟺ aura-gap-0
 * on the link axis ⟺ zero directed-wiring entropy ⇒ infinite tamper-cost.
 *
 * No default, no fallback: the corpus is non-empty by architecture (thousands of SKILL.md,
 * each carrying `[[links]]` by the wiring convention), so `total > 0` and the ratio is pure
 * math — `resolving / total` is well-defined by construction.
 *
 * Matter-twin of the aura gate (`src/aura/scan.mjs`) and the harmony gate (`src/harmony/scan.ts`),
 * differing only in the axis measured: aura reports the dead-link COUNT (the mint queue),
 * harmony the field/enum naming ratio, this the link-resolution COVERAGE in [0,1].
 *
 * @standard CommonMark / Obsidian `[[wikilink]]` syntax — resolved by normalized leaf word
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
// The corpus index is an `.mts` module; the `@/` alias resolver does not probe `.mts`,
// so we name the index explicitly (the repo-proven specifier — cf. scripts/ingest-corpus-to-search.ts).
// This is still the atom's INDEX (its public entry), not a deep internal file.
import { walk, wikiMap, norm, SKILLS_DIR } from '@/corpus/index.mts'
// stripCode has ONE home (the DRY law): the aura speech-gate. Compose it, don't re-implement.
import { stripCode } from '@/aura'

/**
 * The canonical wikilink form, mirroring the aura gate's `resolveWiki` regex exactly:
 * `[[word]]` · `[[a/b/c]]` · `[[word|alias]]` (any case). Resolution is by the normalized
 * trailing LEAF (`norm(last path segment)`) — the SAME key `wikiMap` is built on — so a link
 * that resolves here resolves in the docs build, and one dead here is dead there.
 */
const WIKILINK = /\[\[([A-Za-z][A-Za-z0-9/-]*)(?:\|[^\]]*)?\]\]/g

/** The normalized-leaf key a `[[a/b/c]]` link resolves under — the wikiMap's key. */
const leafKey = (raw: string): string => norm(raw.split('/').pop() as string)

/** Compose the corpus wikiMap once (the canonical resolver), then enumerate every SKILL.md route. */
function corpusRoutes(): { rel: string }[] {
  walk(SKILLS_DIR) // populates the shared wikiMap (normalized-leaf → route) idempotently
  // wikiMap values are `/a/b/SKILL` routes; the SKILL.md files live at SKILLS_DIR/a/b/SKILL.md.
  // De-duplicate on route (aliases share a value) so each file is read exactly once.
  return [...new Set(Object.values(wikiMap))].map((route) => ({
    rel: route.replace(/^\//, '').replace(/\/SKILL$/, ''),
  }))
}

export interface LinkTally {
  /** total `[[links]]` across the corpus (outside code spans) */
  readonly total: number
  /** how many resolve to a real atom via the shared wikiMap */
  readonly resolving: number
  /** the resolving leaf words that have NO entry in the wikiMap (the mint queue) */
  readonly dead: string[]
}

/** Walk the corpus, extract every `[[link]]`, and tally resolving-vs-total against the shared wikiMap. */
export function linkTally(): LinkTally {
  const routes = corpusRoutes()
  let total = 0
  let resolving = 0
  const dead = new Set<string>()
  for (const { rel } of routes) {
    const body = stripCode(readFileSync(join(SKILLS_DIR, rel, 'SKILL.md'), 'utf8'))
    for (const m of body.matchAll(WIKILINK)) {
      const key = leafKey(m[1])
      total++
      if (key in wikiMap) resolving++
      else dead.add(key)
    }
  }
  return { total, resolving, dead: [...dead].sort() }
}

/**
 * Live link-resolution coverage in [0,1]: resolving / total. Pure math — `total > 0` by
 * architecture (the corpus is non-empty and every atom carries `[[links]]`), so no fallback
 * is needed or written. coverage = 1 ⟺ no dead links (the convention holds, aura-gap-0 on
 * the link axis ⇒ infinite tamper-cost).
 */
export function coverage(): number {
  const { resolving, total } = linkTally()
  return resolving / total
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = linkTally()
  console.log(`convention/link — ${t.resolving}/${t.total} wikilinks resolve  (coverage ${coverage().toFixed(6)})`)
  if (t.dead.length) console.log(`dead (mint queue): ${t.dead.map((w) => `[[${w}]]`).join(' · ')}`)
  else console.log('whole — every [[link]] resolves to a real atom. zero dead-wire entropy.')
}
