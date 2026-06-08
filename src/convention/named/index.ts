/**
 * convention/named — THE NAME IS THE PATH. The convention: every atom's frontmatter `name`
 * equals its folder leaf — the one word the router speaks IS the last segment of the route.
 *
 * The fractal address-law ([[law]]) makes the path the address and the uuid the router; the
 * `name:` line is the human-readable face of that same address. When they agree, `[[named]]`
 * resolves to exactly the folder that declares it — one word, one place, no drift. When they
 * diverge (a compound `name: agent-sync` living at the leaf `sync`, a singular/plural slip like
 * `name: chat` at `chats`), the front door and the folder disagree: the slug the agent reads is
 * not the route the corpus walks, an uncovered coupling a tamper can exploit behind the name.
 *
 * This atom does NOT re-walk the filesystem nor re-enumerate the tree — that would duplicate the
 * corpus walker and double-count the `.claude → src` symlink (a raw `find -L` reports the tree
 * twice). It COMPOSES the ONE canonical walk, `loadCorpus` (@/corpus), which enumerates each real
 * node exactly once (realpath dedup) and hands back every atom's `route` and raw `body`; and the
 * ONE canonical normalizer, `norm` (lowercase, strip `-`/`_`) — the SAME key the wikiMap and the
 * aura speech gate resolve on, so this gate agrees with those (no false green).
 *
 * The name is read from the RAW frontmatter block of `body` — NOT from `loadCorpus().name`, which
 * falls the name back to the leaf word when the `name:` line is absent. That fallback would make a
 * nameless atom falsely match its own leaf; reading the true `---…---` head (the same slice
 * `loadCorpus` itself parses) lets a missing `name:` correctly count as a divergence. This is the
 * inverse-twin caution of [[fronted]]: fronted asks whether the front door EXISTS, named asks
 * whether it AGREES with the path.
 *
 *   coverage = matching / total
 *     total    = loadCorpus().length          — every routable atom, the deduped corpus
 *     matching = those whose frontmatter name norm-equals the route's leaf word
 *
 * Pure math, no default: total > 0 by architecture (a non-empty tree of SKILL.md by construction)
 * and matching is a subset count (0 ≤ matching ≤ total), so the ratio is in [0,1] with no clamp and
 * no fallback. coverage → 1 ⟺ every atom's name is its path ⟺ aura-gap-0 on the naming axis ⟺
 * zero naming entropy ⇒ infinite tamper-[[cost]]. The only thing that pulls coverage below 1 is a
 * name that is not its leaf — precisely what this convention forbids.
 *
 *   tsx src/convention/named/index.ts    # prints total / matching / coverage from the live tree
 *
 * Matter-twin: ../fronted (the sibling that audits whether the frontmatter EXISTS; named audits
 * whether it AGREES with the folder leaf — the same front door, checked for truth not presence).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/corpus (loadCorpus + norm — the one deduped walk + the one normalizer) · ../fronted · ../lawful · ../../law · ./SKILL.md
 */
import { loadCorpus, norm } from '@/corpus'

/** The route's leaf word — the last path segment, the folder the name must equal. */
const leafOf = (route: string): string => route.split('/').pop() as string

/**
 * The TRUE frontmatter `name` of a SKILL.md, read from the raw `---…---` head (the same slice
 * `loadCorpus` parses). Returns `undefined` when there is no `name:` line — NOT the leaf fallback
 * `loadCorpus().name` applies — so a nameless atom is correctly seen as a divergence, never a match.
 */
const frontmatterName = (body: string): string | undefined =>
  body
    .match(/^---\n([\s\S]*?)\n---/)?.[1]
    ?.match(/^name:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/^["']|["']$/g, '')

export interface NameTally {
  /** every routable atom in the deduped corpus */
  readonly total: number
  /** atoms whose frontmatter name norm-equals the route's leaf word — name is the path */
  readonly matching: number
  /** the divergences: name ≠ leaf (compound names, singular/plural slips, or a missing name:) */
  readonly divergent: { route: string; name: string | undefined; leaf: string }[]
}

/** Walk the corpus once (loadCorpus), and tally frontmatter-name-matches-leaf against the canonical norm. */
export function nameTally(): NameTally {
  const divergent: { route: string; name: string | undefined; leaf: string }[] = []
  let total = 0
  let matching = 0
  for (const { route, body } of loadCorpus()) {
    const leaf = leafOf(route)
    const name = frontmatterName(body)
    total++
    if (name !== undefined && norm(name) === norm(leaf)) matching++
    else divergent.push({ route, name, leaf })
  }
  return { total, matching, divergent }
}

/**
 * Live name-is-the-path coverage over the real tree: matching / total, in [0,1] by construction
 * (0 ≤ matching ≤ total, total > 0 by architecture). 1 ⟺ every atom's frontmatter name equals its
 * folder leaf ⟺ the name IS the path, zero naming entropy ⇒ infinite tamper-cost.
 */
export function coverage(): number {
  const { matching, total } = nameTally()
  return matching / total
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = nameTally()
  console.log(`convention/named — ${t.matching}/${t.total} atoms name-match their leaf  (coverage ${coverage().toFixed(6)})`)
  if (t.divergent.length) {
    console.log('the name is not the path here (sample):')
    for (const d of t.divergent.slice(0, 12)) console.log(`  ${d.route}  name=${d.name ?? '(none)'}  leaf=${d.leaf}`)
  } else {
    console.log('whole — every atom is named for its path. zero naming entropy.')
  }
}
