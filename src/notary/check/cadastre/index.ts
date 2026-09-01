/**
 * notary/check/cadastre — a REAL wired provider: parcel identity verification against the АГКК (Agency
 * for Geodesy, Cartography and Cadastre) INSPIRE service. This answers the `cadastre` check of
 * notary/check, connected to live data.
 *
 * Source chain (verified live 2026-07-15): АГКК publishes its cadastre as an INSPIRE-compliant ArcGIS
 * REST service at inspire.cadastre.bg. The `Cadastral_Parcel/MapServer` layer 0 (`CP.CadastralParcel`,
 * capabilities: Data,Map,Query) is PUBLICLY queryable by the national cadastral reference (КНИ
 * identifier, e.g. `15285.14.122`) and returns the parcel's INSPIRE identity, area and admin unit. No
 * credential, no API key. Verified: ref `15285.14.122` → 1 feature, areavalue 1471 m², id_namespace
 * `BG.CP`, admunit 905 (HTTP 200).
 *
 * HONEST BOUNDARY:
 *  - SCOPE: this confirms a parcel EXISTS by its national cadastral reference and returns its identity +
 *    area + geometry-derived attributes — the `cadastre` check (parcel identity, boundaries). It is the
 *    public INSPIRE spatial reference.
 *  - It does NOT return OWNERSHIP. Owner names, title history and the full КНИ (Кадастрален регистър на
 *    недвижимите имоти) detail are an internal e-service (ВЕАУ) of КАИС, released only to authorized
 *    parties (notaries) under an accredited legal basis. Ownership is answered by `title` (registryAgency,
 *    Property Register) — not here. The credentialed КАИС seam is left injected (`KaisSeam`), unfabricated.
 *  - The reference is sanitised to digits/dots before it enters the ArcGIS `where` clause — no injection.
 *  - An unreachable/erroring service THROWS — never a fabricated "parcel exists".
 *
 * @standard INSPIRE Directive 2007/2/EC — Cadastral Parcels theme (CP)
 * @standard Cadastre & Property Register Act (ЗКИР) — АГКК / КАИС national cadastre
 *
 * Composes [[notary]] · [[law]] · [[standards]].
 */
import type { Check, CheckResult, Provider, ProviderAdapter } from '@/notary/check'

/** The public АГКК INSPIRE Cadastral Parcel query endpoint (ArcGIS REST, layer 0 = CP.CadastralParcel). */
export const CADASTRE_PARCEL_QUERY =
  'https://inspire.cadastre.bg/arcgis/rest/services/Cadastral_Parcel/MapServer/0/query'

/** Minimal fetch surface (a Worker's global `fetch` fits) — injectable so tests never touch the network. */
export type Fetcher = (url: string) => Promise<{ readonly ok: boolean; readonly status: number; text(): Promise<string> }>

/** The deploy-time credential seam for ownership/КНИ detail NOT public via INSPIRE (КАИС ВЕАУ, notary access). */
export interface KaisSeam {
  readonly endpoint?: string // КАИС internal e-service (ВЕАУ) from the accredited access grant
  readonly credential?: string // injected at deploy from env — NOT stored, NOT defaulted
}

/** A parsed parcel record — the INSPIRE identity behind a national cadastral reference. */
export interface ParcelRecord {
  readonly exists: boolean
  readonly ref: string
  readonly areaM2: number | null
  readonly adminUnit: number | null
  readonly namespace: string
}

interface EsriFeature {
  readonly attributes?: Record<string, unknown>
}
interface EsriResponse {
  readonly features?: readonly EsriFeature[]
}

/** A valid national cadastral reference is digits and dots only (e.g. `15285.14.122`) — reject anything else. */
export function isValidCadastralRef(ref: string): boolean {
  return /^[0-9]+(\.[0-9]+)*$/.test(ref.trim())
}

/** Build the ArcGIS query URL for a parcel by national cadastral reference (sanitised into the where clause). */
export function parcelQueryUrl(ref: string): string {
  const clean = ref.trim()
  if (!isValidCadastralRef(clean)) throw new Error(`cadastre: invalid cadastral reference "${ref}"`)
  const params = new URLSearchParams({
    where: `nationalcadastralref='${clean}'`,
    outFields: 'nationalcadastralref,areavalue,areavalue_uom,admunit,id_namespace',
    returnGeometry: 'false',
    f: 'json',
  })
  return `${CADASTRE_PARCEL_QUERY}?${params.toString()}`
}

/** Fetch a parcel's INSPIRE identity from the АГКК cadastre by its national cadastral reference. */
export async function fetchParcel(
  ref: string,
  fetcher: Fetcher = globalThis.fetch as unknown as Fetcher,
): Promise<ParcelRecord> {
  const res = await fetcher(parcelQueryUrl(ref))
  if (!res.ok) throw new Error(`cadastre service unreachable: ${res.status}`)
  const body = JSON.parse(await res.text()) as EsriResponse
  const attrs = body.features?.[0]?.attributes
  if (!attrs) return { exists: false, ref: ref.trim(), areaM2: null, adminUnit: null, namespace: '' }
  const area = attrs.areavalue
  const admin = attrs.admunit
  return {
    exists: true,
    ref: String(attrs.nationalcadastralref ?? ref.trim()),
    areaM2: typeof area === 'number' ? area : null,
    adminUnit: typeof admin === 'number' ? admin : null,
    namespace: String(attrs.id_namespace ?? ''),
  }
}

/**
 * The real cadastre ProviderAdapter for notary/check. Answers `cadastre` by confirming a parcel exists by
 * its national cadastral reference and returning its INSPIRE identity + area. `ok:true` = the parcel is on
 * the cadastre; `ok:false` = no such parcel. Ownership is NOT here (see title/registryAgency). The fetcher
 * is injectable for tests; an unreachable service THROWS — a seal is never issued on a fabricated parcel.
 */
export function cadastreAdapter(opts: { fetcher?: Fetcher; kais?: KaisSeam } = {}): ProviderAdapter {
  const provider: Provider = 'cadastre'
  return {
    provider,
    async run(check: Check, subject: string): Promise<CheckResult> {
      if (check !== 'cadastre') throw new Error(`cadastre adapter does not answer "${check}"`)
      const parcel = await fetchParcel(subject, opts.fetcher)
      return {
        ok: parcel.exists,
        detail: parcel.exists
          ? `parcel on the АГКК cadastre: ${parcel.ref}${parcel.areaM2 != null ? `, ${parcel.areaM2} m²` : ''} (${parcel.namespace})`
          : `no parcel with cadastral reference "${subject}"`,
        at: new Date().toISOString(),
      }
    },
  }
}

/** @index-cross.foldback child=notary/check/cadastre parent=notary/check — this cross folds back into its parent. */
