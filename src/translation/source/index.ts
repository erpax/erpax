/**
 * translation/source — REAL translations from an authoritative multilingual source (Wikidata, CC0).
 *
 * Verified live (2026-07-15): "heart" → Q1072 → сърце / Herz / cœur / 心臓 / сердце / قلب / καρδιά in
 * 286 languages. This is the zero-cost self-training SOURCE for the translation intelligence — the
 * renderings are fetched from free authoritative community data, NEVER fabricated. Same pattern as the
 * live sanctions check: a real endpoint, actually fetched.
 *
 * fetchLabels resolves a word to its Wikidata concept (the TOP search match) and returns that concept's
 * labels in every language; toValues filters them to the supported locales, ready to register.
 *
 * HONEST BOUNDARY: the top search match is a CANDIDATE sense — "heart" resolved to the organ (Q1072); a
 * different intended sense needs disambiguation, so the `qid` + `description` are returned for the caller
 * to VERIFY before registering. A wrong-sense label is worse than a seed-gap. Not every corpus word has a
 * Wikidata item (returns null → the human/model supplies it). CC0 — attribute to Wikidata.
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

export interface Labels {
  /** The Wikidata concept id (e.g. Q1072) — the sense; verify it matches the intended meaning. */
  readonly qid: string
  /** The English gloss of that concept — for sense verification before registering. */
  readonly description: string
  /** language tag → label, as maintained by the Wikidata community (CC0). */
  readonly labels: Readonly<Record<string, string>>
}

/** Resolve a word to its Wikidata concept and fetch its real multilingual labels. null = no concept found. */
export async function fetchLabels(word: string, fetcher: Fetcher = defaultFetcher): Promise<Labels | null> {
  const sUrl = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(word)}&language=en&format=json&limit=1`
  const sRes = await fetcher(sUrl)
  if (!sRes.ok) throw new Error(`wikidata search unreachable: ${sRes.status}`)
  const s = (await sRes.json()) as { search?: ReadonlyArray<{ id: string; description?: string }> }
  const top = s.search?.[0]
  if (!top) return null // no concept — the human/model must supply it, never fabricated here
  const eUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${top.id}&props=labels&format=json`
  const eRes = await fetcher(eUrl)
  if (!eRes.ok) throw new Error(`wikidata entities unreachable: ${eRes.status}`)
  const e = (await eRes.json()) as {
    entities?: Record<string, { labels?: Record<string, { value: string }> }>
  }
  const raw = e.entities?.[top.id]?.labels ?? {}
  const labels: Record<string, string> = {}
  for (const [lang, v] of Object.entries(raw)) labels[lang] = v.value
  return { qid: top.id, description: top.description ?? '', labels }
}

/** Filter harvested labels to the locales you register (verify the sense via qid/description first). */
export function toValues(labels: Labels, locales: readonly string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const l of locales) if (labels.labels[l]) out[l] = labels.labels[l]!
  return out
}
