/**
 * convention/lawful — THE CONVENTION: every SKILL.md states its own **Law (the invariant).
 *
 * An atom that does not name its law is unaccountable — its SKILL.md describes behaviour without
 * declaring the one rule that must hold, so there is nothing to gate, nothing the audit can verify.
 * The lawful convention is the meta-rule that closes that gap: each atom carries a `**Law` line, the
 * single invariant from which the rest of the atom emerges ([[law]]).
 *
 * This atom does NOT re-walk the filesystem — that would duplicate the corpus walker and double-count
 * the `.claude → src` symlink (a raw `find -L` reports the tree twice). It COMPOSES the ONE canonical
 * walk, `loadCorpus` (@/corpus), which enumerates each real node exactly once (realpath dedup) and
 * hands back every atom's body. Coverage is then a pure fraction over that one source:
 *
 *   coverage = lawful / total
 *     total  = loadCorpus().length          — every routable atom, the deduped corpus
 *     lawful = bodies matching /\*\*Law/      — those that state their invariant
 *
 * Pure math, no default: total > 0 by architecture (the corpus is a non-empty tree of SKILL.md by
 * construction) and lawful is a subset count (0 ≤ lawful ≤ total), so the ratio is in [0,1] with no
 * clamp and no fallback. coverage → 1 ⟺ every atom states its law ⟺ every atom is accountable ⟺
 * the convention holds with zero entropy and infinite tamper-[[cost]]. The only thing that pulls
 * coverage below 1 is a law-less SKILL.md — precisely what this convention forbids.
 *
 *   tsx src/convention/lawful/index.ts    # prints total / lawful / coverage from the live tree
 *
 * Matter-twin: ../../law (the one law every atom's invariant is an instance of).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/corpus (loadCorpus — the one deduped walk) · @/law · ../import · ../dry · ./SKILL.md
 */
import { loadCorpus } from '@/corpus/index.mts'

/** The invariant marker — a SKILL.md is lawful iff its body carries a `**Law` line. */
export const LAW_MARKER = /\*\*Law/

/** Every routable atom in the corpus — the ONE deduped walk (`.claude → src` collapsed by realpath). */
export function total(): number {
  return loadCorpus().length
}

/** Atoms that state their invariant — the bodies whose SKILL.md carries the `**Law` line. */
export function lawful(): number {
  return loadCorpus().filter((a) => LAW_MARKER.test(a.body)).length
}

/**
 * Live lawful coverage over the real tree: lawful / total, in [0,1] by construction
 * (0 ≤ lawful ≤ total, total > 0). 1 ⟺ every atom states its **Law invariant.
 */
export function coverage(): number {
  return lawful() / total()
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/lawful — every SKILL.md states its **Law (the invariant):')
  console.log('  total=' + total() + ' lawful=' + lawful() + ' coverage=' + (100 * coverage()).toFixed(1) + '%')
  console.log('  (1 ⇒ every atom is accountable; the convention holds with zero entropy)')
}
