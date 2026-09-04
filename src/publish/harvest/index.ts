/**
 * publish/harvest — a DOI is verified against the registry, or it is a string that looks like one.
 *
 * @see ./SKILL.md · https://developers.zenodo.org/#oai-pmh
 */

/** Zenodo's OAI-PMH base. A function, not an exported constant ([[matrix]]/constants-audit). */
export const oaiEndpoint = (): string => 'https://zenodo.org/oai2d'

/** Zenodo's REST record API — the second instrument, because one reading is not a measurement. */
export const recordApi = (id: string): string => `https://zenodo.org/api/records/${id}`

/** Harvester courtesy: the documented ceiling is 30 requests per minute. */
export const rateLimitPerMinute = (): number => 30

/** OAI identifiers are `oai:zenodo.org:<record_id>` — the VERSION record, never the concept. */
export const oaiIdentifier = (recordId: string): string => `oai:zenodo.org:${recordId}`

export const getRecordUrl = (recordId: string, prefix = 'oai_datacite'): string =>
  `${oaiEndpoint()}?verb=GetRecord&metadataPrefix=${prefix}&identifier=${oaiIdentifier(recordId)}`

/** The record id is the DOI's Zenodo suffix. Returns null when the DOI is not a Zenodo DOI. */
export function zenodoRecordId(doi: string): string | null {
  const m = /^10\.5281\/zenodo\.(\d+)$/.exec(doi.trim())
  return m?.[1] ?? null
}

/** Two DIFFERENT things: `concept` resolves to whatever is newest, `version` to a fixed record. */
export type DoiKind = 'version' | 'concept' | 'unknown'

export interface DoiVerdict {
  readonly doi: string
  readonly kind: DoiKind
  /** The fixed record this resolves to right now — the thing a citation should actually name. */
  readonly versionDoi: string | null
  readonly recordId: string | null
  readonly title: string | null
  /** Harvestable via OAI-PMH. A concept record is NOT — that is not an absence of the work. */
  readonly harvestable: boolean
}

/** Minimal shape of what a fetcher must return, so tests need no network. */
export type Fetcher = (url: string) => Promise<{ ok: boolean; status: number; text: () => Promise<string> }>

const UA = 'erpax-harvest/1.0 (+https://github.com/erpax/erpax)'

const defaultFetch: Fetcher = (url) =>
  fetch(url, { headers: { 'user-agent': UA, accept: 'application/json, application/xml' } })

/** Ask the registry. REFUSES rather than guessing: "could not ask" ≠ "the answer was no". */
export async function resolveDoi(doi: string, fetcher: Fetcher = defaultFetch): Promise<DoiVerdict> {
  const id = zenodoRecordId(doi)
  if (id === null) return { doi, kind: 'unknown', versionDoi: null, recordId: null, title: null, harvestable: false }
  const res = await fetcher(recordApi(id))
  if (!res.ok && res.status !== 302) {
    throw new Error(`✖ publish/harvest — could not ask the registry about ${doi} (HTTP ${res.status}); a DOI that cannot be checked is not a DOI that checked out`)
  }
  const body = JSON.parse(await res.text()) as {
    id?: number
    doi?: string
    conceptdoi?: string
    conceptrecid?: string
    metadata?: { title?: string }
  }
  const versionDoi = body.doi ?? null
  // Zenodo answers a CONCEPT doi with the latest VERSION record, so the two disagree exactly when
  // the queried DOI was the concept one.
  const kind: DoiKind = versionDoi === null ? 'unknown' : versionDoi === doi ? 'version' : 'concept'
  return {
    doi,
    kind,
    versionDoi,
    recordId: body.id === undefined ? null : String(body.id),
    title: body.metadata?.title ?? null,
    harvestable: kind === 'version',
  }
}

/** Confirm the version record is really in the harvest — the second instrument. */
export async function isHarvested(recordId: string, fetcher: Fetcher = defaultFetch): Promise<boolean> {
  const res = await fetcher(getRecordUrl(recordId))
  if (!res.ok) {
    throw new Error(`✖ publish/harvest — OAI-PMH unreachable (HTTP ${res.status}); silence is not confirmation`)
  }
  const xml = await res.text()
  return xml.includes(`<identifier>${oaiIdentifier(recordId)}</identifier>`) && !xml.includes('idDoesNotExist')
}

/** Pull the DOI a harvested DataCite record states, so the registry's answer is READ, not assumed. */
export function doiOfHarvest(xml: string): string | null {
  return /<identifier identifierType="DOI">([^<]+)</.exec(xml)?.[1]?.trim() ?? null
}

/** Which DOI belongs where: the software is all versions, a result is one fixed record. */
export const doiForPurpose = (purpose: 'software' | 'result'): DoiKind =>
  purpose === 'software' ? 'concept' : 'version'

/**
 * Fails closed unless the DOI is a registered record the registry will show you.
 *
 * Both instruments must agree — the REST record and the OAI harvest — because one reading is not
 * a measurement, and the first reading here was a false alarm. @see ./SKILL.md
 */
export async function assertDoiRegistered(
  doi: string,
  { fetcher = defaultFetch, requireVersion = true }: { fetcher?: Fetcher; requireVersion?: boolean } = {},
): Promise<DoiVerdict> {
  const v = await resolveDoi(doi, fetcher)
  if (v.kind === 'unknown' || v.recordId === null) {
    throw new Error(`✖ publish/harvest — ${doi} is not a record this registry knows`)
  }
  if (requireVersion && v.kind === 'concept') {
    throw new Error(
      `✖ publish/harvest — ${doi} is a CONCEPT doi: it cites whatever version is newest. Cite ${v.versionDoi} instead, or say you mean all versions`,
    )
  }
  if (v.kind === 'version' && !(await isHarvested(v.recordId, fetcher))) {
    throw new Error(`✖ publish/harvest — ${doi} resolves but is not in the OAI harvest; two instruments disagree, so neither is trusted`)
  }
  return v
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const doi = process.argv[2] ?? '10.5281/zenodo.22237698'
  const v = await resolveDoi(doi)
  console.log(`${doi}`)
  console.log(`  kind        ${v.kind}${v.kind === 'concept' ? '  — resolves to whatever is newest' : ''}`)
  console.log(`  version doi ${v.versionDoi ?? '—'}`)
  console.log(`  record      ${v.recordId ?? '—'}`)
  console.log(`  title       ${v.title ?? '—'}`)
  if (v.recordId !== null) console.log(`  harvested   ${await isHarvested(v.recordId)}`)
  console.log(`\ncite the software with a ${doiForPurpose('software')} doi · cite a result with a ${doiForPurpose('result')} doi`)
}
