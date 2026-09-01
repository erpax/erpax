/**
 * notary/check/sanctions — a REAL wired provider: AML / sanctions screening against the EU consolidated
 * financial sanctions list. This is the `sanctions` check of notary/check, actually connected to live data.
 *
 * Source chain (verified live 2026-07-15): the authoritative list is the EU Financial Sanctions Files,
 * published by the European Commission at webgate.ec.europa.eu with the PUBLISHED public token
 * `token-2017` (base64 `dG9rZW4tMjAxNw`). OpenSanctions redistributes it as a stable, versioned bulk
 * dataset; we resolve the CURRENT `names.txt` through the dataset index (so we always screen against
 * today's list), fetch it, and match a subject name.
 *
 * HONEST BOUNDARY:
 *  - LICENSE: OpenSanctions bulk data is CC-BY-NC — free for non-commercial use; a business must acquire
 *    a data licence, or ingest the EU FSF endpoint directly (EU_FSF_SOURCE below, no per-record licence).
 *  - This is name SCREENING — a review signal, NOT identity adjudication. A hit means "escalate for
 *    manual review", never "guilty". v1 matches normalised full names; production adds fuzzy/token-set
 *    matching + secondary identifiers (birthdate, nationality) to cut false positives.
 *  - Production INGESTS the list periodically into storage and screens against the index; it does NOT
 *    fetch ~1 MB per notarial act. Pass a cached `names` list to `sanctionsAdapter` in that case.
 *
 * @standard AMLD5 (EU 2018/843) — sanctions / PEP screening within customer due diligence
 * @standard EU Consolidated Financial Sanctions List (CFSP) — the authoritative source
 *
 * Composes [[notary]] · [[merge]] · [[law]] · [[standards]].
 */
import type { Check, CheckResult, Provider, ProviderAdapter } from '@/notary/check'

/** The OpenSanctions EU FSF dataset index — resolves to the CURRENT versioned artifacts (no hardcoded date). */
export const SANCTIONS_INDEX = 'https://data.opensanctions.org/datasets/latest/eu_fsf/index.json'

/** The authoritative EU source (European Commission) with the published public token — for direct ingest. */
export const EU_FSF_SOURCE =
  'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4tMjAxNw'

/** Minimal fetch surface (a Worker's global `fetch` fits) — injectable so tests never touch the network. */
export type Fetcher = (url: string) => Promise<{ readonly ok: boolean; readonly status: number; text(): Promise<string> }>

interface IndexResource {
  readonly name: string
  readonly url: string
}
interface DatasetIndex {
  readonly version?: string
  readonly resources?: readonly IndexResource[]
}

/** Resolve the current names.txt URL from the dataset index — never hardcode a timestamped artifact. */
export function resolveNamesUrl(index: DatasetIndex): string | null {
  return index.resources?.find((r) => r.name === 'names.txt')?.url ?? null
}

/** Fetch the current sanctioned names — one per line, aliases included. */
export async function fetchSanctionsNames(
  fetcher: Fetcher = globalThis.fetch as unknown as Fetcher,
): Promise<string[]> {
  const idxRes = await fetcher(SANCTIONS_INDEX)
  if (!idxRes.ok) throw new Error(`sanctions index unreachable: ${idxRes.status}`)
  const index = JSON.parse(await idxRes.text()) as DatasetIndex
  const url = resolveNamesUrl(index)
  if (!url) throw new Error('sanctions index has no names.txt resource')
  const namesRes = await fetcher(url)
  if (!namesRes.ok) throw new Error(`sanctions names unreachable: ${namesRes.status}`)
  return (await namesRes.text())
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Normalise a name for matching — strip diacritics + punctuation, lowercase, collapse whitespace. */
export function normalize(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Screen a subject against the list — normalised full-name match on any alias. Returns the hits (review signal). */
export function screen(subject: string, names: readonly string[]): { hit: boolean; matches: string[] } {
  const target = normalize(subject)
  if (!target) return { hit: false, matches: [] }
  const matches = names.filter((n) => normalize(n) === target)
  return { hit: matches.length > 0, matches: [...new Set(matches)] }
}

/**
 * The real sanctions ProviderAdapter for notary/check. `ok:true` = the subject is NOT on the list (clear);
 * `ok:false` = a name match to ESCALATE for manual review. Pass a cached `names` list in production; the
 * fetcher is injectable for tests. Never seals an act on a fabricated result — an unreachable list throws.
 */
export function sanctionsAdapter(opts: { names?: readonly string[]; fetcher?: Fetcher } = {}): ProviderAdapter {
  const provider: Provider = 'sanctionsList'
  return {
    provider,
    async run(check: Check, subject: string): Promise<CheckResult> {
      if (check !== 'sanctions') throw new Error(`sanctions adapter does not answer "${check}"`)
      const names = opts.names ?? (await fetchSanctionsNames(opts.fetcher))
      const { hit, matches } = screen(subject, names)
      return {
        ok: !hit,
        detail: hit
          ? `sanctions MATCH — escalate for manual review: ${matches.slice(0, 3).join('; ')}`
          : 'no EU consolidated sanctions match',
        at: new Date().toISOString(),
      }
    },
  }
}

/** @index-cross.foldback child=notary/check/sanctions parent=notary/check — this cross folds back into its parent. */
