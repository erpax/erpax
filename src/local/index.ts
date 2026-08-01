/**
 * local — a remote read returns a summary; a local read returns bytes.
 *
 * Not a preference. Measured four times in one session, each time the same shape:
 *
 *   1. ceccec's README was read through a web fetch, which runs a SMALL MODEL over the page and
 *      returns its prose. The agent then quoted that prose as "verbatim from the page" and used it
 *      to contradict the human — twice. A local clone existed at `~/github/ceccec/ceccec.github.io`
 *      the whole time; one `grep` on disk gave the actual bytes.
 *   2. The free AI lanes returned HTTP 402 and 405. The local seal book answered at `tokens: 0`.
 *   3. Every frontier the corpus has — refutable, audience, engineering, theorem, millennium,
 *      orientation — computed locally in one pass, no network.
 *   4. Sixteen defects were caught by local gates before shipping; nothing remote caught any.
 *
 * The asymmetry is structural, not circumstantial. A local read is **verifiable** (the bytes are
 * here, a parse is a theorem), **available** (no quota, no outage, no 402), and **free**. A remote
 * read is none of those, and worse: what comes back is usually a *rendering* of the source, so a
 * quotation from it is a claim about a claim. [[grounded]] makes the neighbouring point about SEALED
 * versus mutable; this one is about LOCAL versus remote, and they compose.
 *
 * The rule this yields is narrow and checkable: **before fetching, look for the local copy.** A
 * remote read whose local counterpart exists is not a fallback, it is a downgrade — and the agent
 * that took it spent a human's correction to find out.
 *
 * @law prefer the local source: a remote read returns a rendering, a local read returns bytes.
 *      Fetch only what is not here, and never quote a rendering as a source.
 * @invariant a source with a local copy is never `remote-preferred` — localFirst names the downgrade
 * @invariant evidence from a rendering is never `primary`, whatever it says
 * @see ./SKILL.md -- ../grounded -- ../quantum/ftl
 */
import { existsSync } from 'node:fs'

/** How a source was read, and therefore what its evidence is worth. */
export type ReadKind =
  /** bytes on this machine — parseable, verifiable, free */
  | 'local'
  /** a rendering produced by something else (a model, a scraper, an API summary) */
  | 'rendering'
  /** raw bytes fetched over a network — verifiable, but subject to quota and outage */
  | 'remote-bytes'

export interface Source {
  readonly name: string
  readonly kind: ReadKind
  /** where the same content lives on this machine, if it does */
  readonly localPath?: string
}

/**
 * Evidence strength: only local bytes are primary. A rendering is never evidence about the source —
 * and a rendering that cites its sources is STILL not primary. Citations do not launder the prose;
 * they only shorten the walk to something that is. See `pointersOf` / `isPlanner`.
 */
export function isPrimary(s: Source): boolean {
  return s.kind === 'local' || s.kind === 'remote-bytes'
}

/**
 * The downgrade: a source read remotely whose local copy exists. Every one of these is a correction
 * waiting to happen — the ceccec README was exactly this.
 */
export function downgraded(sources: readonly Source[]): readonly Source[] {
  return sources.filter((s) => s.kind !== 'local' && s.localPath !== undefined && existsSync(s.localPath))
}

/**
 * Resolve a source local-first: if the local path exists, the read is local, whatever was intended.
 * This is the whole discipline in one function — call it before fetching, not after being corrected.
 */
export function localFirst(name: string, localPath: string | undefined, remoteKind: ReadKind = 'rendering'): Source {
  if (localPath && existsSync(localPath)) return { name, kind: 'local', localPath }
  return { name, kind: remoteKind, localPath }
}

/** Sources whose evidence may be quoted as coming FROM the source. A rendering never qualifies. */
export function quotable(sources: readonly Source[]): readonly Source[] {
  return sources.filter(isPrimary)
}

/**
 * Fail closed when a session quoted a rendering as a source, or read remotely what was already here.
 * Ceiling 0 is the horizon: nothing is quoted that was not read.
 */
export function assertLocalFirst(sources: readonly Source[], ceiling: number): void {
  const bad = downgraded(sources)
  if (bad.length > ceiling) {
    throw new Error(
      `local: ${bad.length} source(s) read remotely with a local copy present > ceiling ${ceiling} — ` +
        bad.map((s) => `${s.name} (local at ${s.localPath})`).join(', '),
    )
  }
}

/**
 * A rendering that carries CITATIONS — the search-engine AI answer, and what it is honestly good for.
 *
 * A search engine's AI summary is a `rendering`: a model's prose about sources it read. Quoting it
 * as a source is the mistake this atom was built after (a fetched summary of ceccec quoted as
 * verbatim, twice, with a clone on disk). Nothing below relaxes that — **the prose stays
 * unquotable, permanently.**
 *
 * But it is not worthless, and treating it as worthless wastes a real instrument. Such an answer
 * usually ships a **citation list**, and those pointers are not the model's prose — they are
 * addresses. An address is checkable: follow it, fetch the primary source, and the rendering has
 * done its only honest job, which is to have SHORTENED THE SEARCH.
 *
 * So the split is sharp and it is the whole point:
 *
 *   the PROSE     a claim about sources — never evidence, never quotable, no exceptions
 *   the POINTERS  addresses — usable immediately, because following one replaces the claim
 *
 * That makes a search AI a **query planner**, not a source. Run it wide, harvest the pointers,
 * then resolve each against a primary lane — [[api]]/integration wires Crossref, OpenAlex, arXiv
 * and Wikidata keyless, and each returns bytes rather than prose. The expensive step (finding what
 * to look at) goes out; the deciding step stays where it can be checked.
 *
 * @invariant a rendering with pointers is STILL not primary — citations do not launder the prose
 * @invariant a pointer that resolves to nothing is dropped, never reported as a source
 * @see ./SKILL.md -- ../instrument -- ../api/integration
 */
export interface Rendering extends Source {
  readonly kind: 'rendering'
  /** the addresses the answer cited — usable, unlike everything around them */
  readonly pointers: readonly string[]
}

/**
 * The pointers a rendering offers, deduplicated and stripped of anything that is not an address.
 *
 * Returns an empty list for a rendering that cites nothing — which is the useful signal: an AI
 * answer with no citations has given you a claim and no way to check it, and is worth exactly
 * nothing. That is not a judgement about the model; it is what "unfalsifiable" means.
 */
export function pointersOf(r: Rendering): readonly string[] {
  return [...new Set(r.pointers.map((p) => p.trim()).filter((p) => /^https?:\/\/\S+$/.test(p)))]
}

/**
 * A rendering is worth consulting when it hands back addresses, and worth nothing when it does not.
 * Never confuses that with being TRUE — a well-cited answer can still be wrong about every source
 * it cites, which is precisely why the pointers are the deliverable and the prose is not.
 */
export function isPlanner(s: Source): boolean {
  return s.kind === 'rendering' && pointersOf(s as Rendering).length > 0
}
