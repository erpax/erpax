/**
 * translation/source — REAL translations from an authoritative multilingual source (Wikidata, CC0).
 *
 * Verified live (2026-07-15): "heart" → Q1072 → сърце / Herz / cœur / 心臓 / сердце / قلب / καρδιά in
 * 286 languages. This is the zero-cost self-training SOURCE for the translation intelligence — the
 * renderings are fetched from free authoritative community data, NEVER fabricated. Same pattern as the
 * live sanctions check: a real endpoint, actually fetched.
 *
 * THE SENSE GATE (why the top match is not enough). Live proof, 2026-07-15, top-1 search:
 * `heart→Q1072 (organ)` and `water→Q283 (compound)` are the RIGHT sense, but `law→Q16871926 (a family
 * name)`, `balance→Q1753419 (a Van Halen album)`, `gold→family name`, `apple→Apple Inc`, `sun→Sun
 * Microsystems`, `brain→a journal` are WRONG senses. A wrong-sense label is worse than a seed-gap. So
 * `harvestVerified` searches SEVERAL candidates and registers a concept's labels ONLY IF a candidate's
 * Wikidata description sense-matches the atom's own meaning (`senseScore` over the English glosses); when
 * no candidate clears the threshold it returns null — LEAVE THE GAP, never fabricate, never guess.
 *
 * fetchLabels resolves a word to its TOP Wikidata concept (the candidate sense); harvestVerified adds the
 * sense gate; toValues filters labels to the supported locales, ready to register. CC0 — attribute Wikidata.
 *
 * @standard Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags
 *
 * Composes [[translation]] · [[translate]] · [[law]].
 */

/** Wikimedia policy requires a descriptive User-Agent on API requests. */
const UA = 'erpax-translation-harvest/1.0 (https://github.com/erpax/erpax)'

export const WIKIDATA_API = 'https://www.wikidata.org/w/api.php'

/** Minimal fetch surface (a Worker's global `fetch` fits) — injectable so tests never touch the network. */
export type Fetcher = (url: string) => Promise<{ readonly ok: boolean; readonly status: number; json(): Promise<unknown> }>

const defaultFetcher: Fetcher = (url) =>
  fetch(url, { headers: { 'User-Agent': UA } }) as unknown as ReturnType<Fetcher>

/** One search hit — a candidate SENSE for a word, with the English gloss to verify against. */
export interface Candidate {
  /** The Wikidata concept id (e.g. Q1072). */
  readonly qid: string
  /** The English gloss of that candidate — sense-matched before registering. */
  readonly description: string
}

export interface Labels extends Candidate {
  /** language tag → label, as maintained by the Wikidata community (CC0). */
  readonly labels: Readonly<Record<string, string>>
}

/** A sense-VERIFIED harvest — labels whose candidate description cleared the sense gate, with the score. */
export interface Verified extends Labels {
  /** Sense-match score (0..1) of this candidate's description against the atom's meaning gloss. */
  readonly score: number
}

/** Search a word's candidate concepts (top `limit`), each with its English gloss — the senses to choose among. */
export async function searchConcepts(word: string, fetcher: Fetcher = defaultFetcher, limit = 7): Promise<Candidate[]> {
  const url = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(word)}&language=en&format=json&limit=${limit}`
  const res = await fetcher(url)
  if (!res.ok) throw new Error(`wikidata search unreachable: ${res.status}`)
  const s = (await res.json()) as { search?: ReadonlyArray<{ id: string; description?: string }> }
  return (s.search ?? []).map((h) => ({ qid: h.id, description: h.description ?? '' }))
}

/** Fetch one concept's real multilingual labels (CC0), keyed by BCP-47 language tag. */
export async function fetchEntityLabels(qid: string, fetcher: Fetcher = defaultFetcher): Promise<Record<string, string>> {
  const url = `${WIKIDATA_API}?action=wbgetentities&ids=${qid}&props=labels&format=json`
  const res = await fetcher(url)
  if (!res.ok) throw new Error(`wikidata entities unreachable: ${res.status}`)
  const e = (await res.json()) as { entities?: Record<string, { labels?: Record<string, { value: string }> }> }
  const raw = e.entities?.[qid]?.labels ?? {}
  const labels: Record<string, string> = {}
  for (const [lang, v] of Object.entries(raw)) labels[lang] = v.value
  return labels
}

/** Resolve a word to its TOP Wikidata concept and fetch its real multilingual labels. null = no concept found. */
export async function fetchLabels(word: string, fetcher: Fetcher = defaultFetcher): Promise<Labels | null> {
  const top = (await searchConcepts(word, fetcher, 1))[0]
  if (!top) return null // no concept — the human/model must supply it, never fabricated here
  return { ...top, labels: await fetchEntityLabels(top.qid, fetcher) }
}

// ── the sense gate ──

const STOP = new Set([
  'a', 'an', 'the', 'of', 'for', 'in', 'on', 'to', 'and', 'or', 'that', 'which', 'with', 'by',
  'is', 'are', 'as', 'its', 'their', 'from', 'at', 'this', 'used', 'esp', 'e', 'g', 'i',
])

/** Content tokens of an English gloss — lowercased words ≥ 3 chars, minus stopwords, crudely singularised. */
function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w))
    .map((w) => (w.endsWith('s') && w.length > 3 ? w.slice(0, -1) : w)) // organs→organ, atoms→atom
}

/**
 * Sense-match score (Jaccard over content tokens) of a candidate's Wikidata description against the atom's
 * own meaning gloss. 1 = identical vocabulary, 0 = disjoint. A "family name" / "1995 studio album" gloss
 * shares no content tokens with "organ that circulates blood" → scores ~0 → the wrong sense is rejected.
 */
export function senseScore(gloss: string, description: string): number {
  const a = new Set(tokens(gloss))
  const b = new Set(tokens(description))
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const t of a) if (b.has(t)) inter++
  return inter / (a.size + b.size - inter)
}

/**
 * Harvest a word's labels ONLY IF a candidate sense-matches the atom's meaning. Searches `limit` candidates,
 * scores each description against `gloss`, and registers the best IF it clears `threshold`; otherwise returns
 * null — LEAVE THE GAP (a wrong-sense label is worse than a seed-gap; never fabricated, never guessed).
 */
export async function harvestVerified(
  word: string,
  gloss: string,
  fetcher: Fetcher = defaultFetcher,
  opts: { limit?: number; threshold?: number } = {},
): Promise<Verified | null> {
  const { limit = 7, threshold = 0.14 } = opts
  const candidates = await searchConcepts(word, fetcher, limit)
  let best: (Candidate & { score: number }) | null = null
  for (const c of candidates) {
    const score = senseScore(gloss, c.description)
    if (!best || score > best.score) best = { ...c, score }
  }
  if (!best || best.score < threshold) return null // no candidate matches the sense — the honest seed-gap
  return { qid: best.qid, description: best.description, score: best.score, labels: await fetchEntityLabels(best.qid, fetcher) }
}

/** Filter harvested labels to the locales you register (verify the sense via qid/description first). */
export function toValues(labels: Pick<Labels, 'labels'>, locales: readonly string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const l of locales) if (labels.labels[l]) out[l] = labels.labels[l]!
  return out
}

/** @index-cross.foldback child=translation/source parent=translation — this cross folds back into its parent. */
