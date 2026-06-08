/**
 * convention/fronted — THE CONVENTION: every SKILL.md carries valid `name` + `description`
 * frontmatter.
 *
 * The frontmatter is the atom's front door: `name` is its identity (the slug the router speaks)
 * and `description` is its "Use when…" trigger (how an agent decides to read it). A SKILL.md
 * missing either field has no front — it cannot be addressed by name nor selected by intent, so it
 * is invisible to the router and the agent alike. The fronted convention closes that gap: each
 * atom's frontmatter block carries BOTH a `name:` line and a `description:` line ([[law]]).
 *
 * This atom does NOT re-walk the filesystem nor re-parse the frontmatter block from scratch — that
 * would duplicate the corpus walker (and double-count the `.claude → src` symlink, which a raw
 * `find -L` reports twice). It COMPOSES the ONE canonical walk, `loadCorpus` (@/corpus), which
 * enumerates each real node exactly once (realpath dedup) and hands back every atom's full SKILL.md
 * `body`. Coverage is then a pure fraction over that one source:
 *
 *   coverage = fronted / total
 *     total   = loadCorpus().length                         — every routable atom, the deduped corpus
 *     fronted = those whose frontmatter has BOTH name: and description:
 *
 * Why scan `body` and not the parsed `atom.name`/`atom.description`: loadCorpus FALLS BACK the name
 * to the leaf folder word (`fmName || name`), so `atom.name` is always truthy and cannot witness a
 * MISSING `name:` line. The honest measurement reads the actual frontmatter block out of the raw
 * body — the same `^---\n…\n---` slice loadCorpus itself uses — so a field is present iff the file
 * truly declares it.
 *
 * Pure math, no default: total > 0 by architecture (the corpus is a non-empty tree of SKILL.md by
 * construction) and fronted is a subset count (0 ≤ fronted ≤ total), so the ratio is in [0,1] with
 * no clamp and no fallback. coverage → 1 ⟺ every atom has a valid front ⟺ every atom is
 * addressable-by-name and selectable-by-trigger ⟺ the convention holds with zero entropy and
 * infinite tamper-[[cost]]. The only thing that pulls coverage below 1 is a SKILL.md missing its
 * `name:` or `description:` line — precisely what this convention forbids.
 *
 *   tsx src/convention/fronted/index.ts    # prints total / fronted / coverage from the live tree
 *
 * Matter-twin: ../../convention/named (the sibling that audits the leaf-word slug; fronted audits
 *   the frontmatter that the slug must agree with — front door, same atom seen from the file head).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/corpus (loadCorpus — the one deduped walk + the same frontmatter slice) · @/law · ../lawful · ../complete · ./SKILL.md
 */
import { loadCorpus } from '@/corpus'

/** The frontmatter block of a SKILL.md body — the `---\n…\n---` head, or '' if there is none. */
export const frontmatter = (body: string): string => body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''

/** A frontmatter block has a non-empty `name:` line. */
export const NAME_MARKER = /^name:[ \t]*\S/m

/** A frontmatter block has a non-empty `description:` line. */
export const DESCRIPTION_MARKER = /^description:[ \t]*\S/m

/** A SKILL.md is fronted iff its frontmatter carries BOTH a `name:` and a `description:` line. */
export const isFronted = (body: string): boolean => {
  const fm = frontmatter(body)
  return NAME_MARKER.test(fm) && DESCRIPTION_MARKER.test(fm)
}

/** Every routable atom in the corpus — the ONE deduped walk (`.claude → src` collapsed by realpath). */
export function total(): number {
  return loadCorpus().length
}

/** Atoms whose SKILL.md frontmatter declares both name and description — the fronted ones. */
export function fronted(): number {
  return loadCorpus().filter((a) => isFronted(a.body)).length
}

/**
 * Live fronted coverage over the real tree: fronted / total, in [0,1] by construction
 * (0 ≤ fronted ≤ total, total > 0). 1 ⟺ every SKILL.md has valid name + description frontmatter.
 */
export function coverage(): number {
  return fronted() / total()
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/fronted — every SKILL.md has valid name + description frontmatter:')
  console.log(
    '  total=' + total() + ' fronted=' + fronted() + ' coverage=' + (100 * coverage()).toFixed(1) + '%',
  )
  console.log('  (1 ⇒ every atom is addressable-by-name and selectable-by-trigger; zero entropy)')
}
