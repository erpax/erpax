/**
 * search-corpus — ingest the SKILL.md corpus (CODE, the signs) into the same
 * content-uuid `search` surface the DB rows (DATA, the matter) already live in.
 *
 * The data side is wired by @payloadcms/plugin-search (every collection syncs a
 * `search` doc, its `doc` field collapsed to the content-uuid cross-reference —
 * see fieldOverrides.ts). This is the CODE side: each atom becomes a `search`
 * doc too, so ONE query teleports to both faces of the akashic — the SIGN (a
 * skill: how to act) AND the MATTER (the rows: what to act on) — paired by the
 * shared content-address. The uuid is the router; resolving it lands on the atom.
 *
 * `doc.relationTo` is a free-text discriminator (fieldOverrides.searchDocField),
 * so a skill indexes under `relationTo:'skill'` with `value` = the atom's
 * content-uuid: no new collection, no schema change. Re-ingest is idempotent —
 * same content ⇒ same uuid ⇒ the same one row (the merge law).
 *
 * Pure transform here; the thin Local-API wire is scripts/ingest-corpus-to-search.ts.
 */

/** The free-text `doc.relationTo` discriminator marking a search row as a CODE atom (not a DB collection). */
export const SKILL_RELATION = 'skill'

/** One corpus atom, reduced to what the search surface needs. */
export interface CorpusAtom {
  /** the one-word wikiMap path / slug, e.g. `matter` (the route the compass points to). */
  route: string
  /** frontmatter `name`. */
  name: string
  /** frontmatter `description` (optional — the empty case is defined). */
  description?: string
  /** content-uuid of the SKILL.md (sha256→uuidv8) — the address the query teleports to. */
  contentUuid: string
}

/** A `search`-collection doc, shaped to the plugin's fields (doc/slug/meta + title/priority). */
export interface CorpusSearchDoc {
  title: string
  priority: number
  slug: string
  doc: { relationTo: string; value: string }
  meta: { title: string; description: string }
  categories: never[]
}

/**
 * Map one atom to its content-uuid search doc. The title falls back to the route
 * when the name is blank, and a missing description resolves to the empty string —
 * every case defined (the identity element), never undefined.
 */
export function corpusAtomToSearchDoc(atom: CorpusAtom): CorpusSearchDoc {
  const title = atom.name.trim() || atom.route
  return {
    title,
    // code outranks an unenriched DB stub when both match a query; tune per surface.
    priority: 10,
    slug: atom.route,
    doc: { relationTo: SKILL_RELATION, value: atom.contentUuid },
    meta: { title, description: (atom.description ?? '').trim() },
    categories: [],
  }
}

/** Map the whole corpus. */
export function corpusToSearchDocs(atoms: readonly CorpusAtom[]): CorpusSearchDoc[] {
  return atoms.map(corpusAtomToSearchDoc)
}
