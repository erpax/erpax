/**
 * outward/witness — two independent sources answering one question, and a theorem to anchor them.
 *
 * Pure core; every fetch is an injected thunk, so the whole verdict is provable with the network
 * down. See ./SKILL.md for what corroboration does and does not prove.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: two sources agreeing is evidence; one is a claim
 * @standard WGS 84 — geodetic latitude/longitude
 */
import { greatCircleAngle, type Geodetic } from '@/globe'
import { PI, algebraAcos, algebraSin, algebraSqrt, algebraTan, exactAbs, exactMax, exactMin, toRadians as rad } from '@/algebra'

/** Earth mean radius, km (IUGG). The one place this number lives. */
const EARTH_MEAN_RADIUS_KM = 6371.0088

/** The local THEOREM: great-circle distance in km. Needs no network and cannot be unreachable. */
export const greatCircleKm = (a: Geodetic, b: Geodetic): number =>
  (greatCircleAngle(a, b) * PI * EARTH_MEAN_RADIUS_KM) / 180

/** One source's answer to one question. */
export interface Reading {
  readonly source: string
  readonly value: number
  readonly unit: string
}

export type Agreement = 'corroborated' | 'divergent' | 'single' | 'silent'

export interface Crosscheck {
  readonly question: string
  readonly readings: readonly Reading[]
  readonly agreement: Agreement
  /** Largest gap between any two readings, in the shared unit. */
  readonly spread: number
  /** The tolerance the answer was judged against — DECLARED by the caller, never guessed. */
  readonly tolerance: number
  readonly detail: string
}

/**
 * Judge a set of readings. `tolerance` is the caller's, because what counts as agreement is a
 * property of the question — 2 °C is close for a forecast and absurd for a distance.
 *
 * @invariant fewer than two readings is never `corroborated`
 * @invariant `spread` is 0 when there is nothing to compare
 */
export function crosscheck(question: string, readings: readonly Reading[], tolerance: number): Crosscheck {
  const units = new Set(readings.map((r) => r.unit))
  if (units.size > 1) {
    return {
      question, readings, agreement: 'divergent', spread: Number.NaN, tolerance,
      detail: `readings are in different units (${[...units].join(', ')}) — not comparable`,
    }
  }
  if (readings.length === 0) return { question, readings, agreement: 'silent', spread: 0, tolerance, detail: 'no source answered' }
  if (readings.length === 1) {
    return {
      question, readings, agreement: 'single', spread: 0, tolerance,
      detail: `only ${readings[0]!.source} answered — a single reading is a claim, not evidence`,
    }
  }
  let lo = readings[0]!.value
  let hi = lo
  for (const r of readings) {
    lo = exactMin(lo, r.value)
    hi = exactMax(hi, r.value)
  }
  const spread = exactAbs(hi - lo)
  return {
    question, readings, spread, tolerance,
    agreement: spread <= tolerance ? 'corroborated' : 'divergent',
    detail: `${readings.length} sources, spread ${spread} ${readings[0]!.unit} against a tolerance of ${tolerance}`,
  }
}

/** A source that may not answer. A thrown fetch becomes silence, never a wrong number. */
export type Probe = () => Promise<Reading>

/** Ask every probe; a failure contributes nothing rather than poisoning the set. */
export async function gather(probes: readonly Probe[]): Promise<Reading[]> {
  const out: Reading[] = []
  for (const p of probes) {
    try {
      out.push(await p())
    } catch {
      // Silence is an unanswered question, not a reading. `crosscheck` reports it as such.
    }
  }
  return out
}

/**
 * The navigation cross-check: observations against the theorem that needs no network.
 *
 * This is the STRONG form. `greatCircleKm` is mathematics, so it is independent of every provider by
 * construction — unlike two weather APIs, which may share an upstream model. A routing API must be
 * at least the great-circle distance; less than that is impossible, not merely surprising.
 *
 * @invariant a route shorter than the great-circle distance is always reported impossible
 */
export function routeCrosscheck(
  a: Geodetic,
  b: Geodetic,
  observed: readonly Reading[],
  toleranceKm: number,
): Crosscheck & { readonly impossible: readonly string[] } {
  const floor = greatCircleKm(a, b)
  const anchored: Reading[] = [{ source: 'great-circle (theorem)', value: floor, unit: 'km' }, ...observed]
  const impossible = observed.filter((r) => r.value < floor).map((r) => r.source)
  const base = crosscheck('distance a→b', anchored, toleranceKm)
  return {
    ...base,
    impossible,
    detail:
      impossible.length > 0
        ? `${impossible.join(', ')} reported LESS than the great-circle floor of ${floor.toFixed(3)} km — impossible on a sphere`
        : base.detail,
  }
}

/**
 * The public APIs this atom crosses, as probe FACTORIES — none is called until asked.
 *
 * All three are keyless. A User-Agent is mandatory for met.no and courteous everywhere; `node`'s
 * default is WAF-blocked in practice, and a 200 carrying the wrong body reads as absence.
 */
const UA = 'erpax/1.0 (+https://github.com/erpax/erpax)'

/**
 * Fetch JSON with the User-Agent every public API expects, at ONE address.
 *
 * It stood twice within an hour — here and again in the MCP tool that calls this atom — and
 * [[rules]]/copy caught the second the moment it was written. `node`'s default UA is WAF-blocked in
 * practice, and a 200 carrying the wrong body reads as absence, so the header is not optional.
 */
export const fetchJson = async (url: string): Promise<Record<string, unknown>> => {
  const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`)
  return (await r.json()) as Record<string, unknown>
}

/** Open-Meteo: current temperature, °C. Keyless. */
const openMeteoTemperature = (g: Geodetic): Probe => async () => {
  const j = await fetchJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m`,
  )
  const v = (j.current as { temperature_2m?: number } | undefined)?.temperature_2m
  if (typeof v !== 'number') throw new Error('open-meteo: no temperature_2m in body')
  return { source: 'open-meteo', value: v, unit: 'C' }
}

/** MET Norway locationforecast: air temperature, °C. Keyless, User-Agent REQUIRED. */
const metNoTemperature = (g: Geodetic): Probe => async () => {
  const j = await fetchJson(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${g.latitude}&lon=${g.longitude}`,
  )
  const series = (j.properties as { timeseries?: unknown[] } | undefined)?.timeseries?.[0] as
    | { data?: { instant?: { details?: { air_temperature?: number } } } }
    | undefined
  const v = series?.data?.instant?.details?.air_temperature
  if (typeof v !== 'number') throw new Error('met.no: no air_temperature in body')
  return { source: 'met.no', value: v, unit: 'C' }
}

/** OSRM demo router: driving distance, km. Keyless, and rate-limited — one call, not a loop. */
const osrmDistanceKm = (a: Geodetic, b: Geodetic): Probe => async () => {
  const j = await fetchJson(
    `https://router.project-osrm.org/route/v1/driving/` +
      `${a.longitude},${a.latitude};${b.longitude},${b.latitude}?overview=false`,
  )
  const m = (j.routes as { distance?: number }[] | undefined)?.[0]?.distance
  if (typeof m !== 'number') throw new Error('osrm: no routes[0].distance in body')
  return { source: 'osrm', value: m / 1000, unit: 'km' }
}

// ─── Theorem-anchored crosses, one per domain pair ──────────────────────────
//
// A second API can share an upstream model; a theorem cannot. Every cross below pairs an observation
// with a closed-form result, so the independent leg is independent BY CONSTRUCTION.

/** Standard gravitational parameter of Earth, km³/s² (IAU/IERS). */
const MU_EARTH_KM3_S2 = 398_600.4418

/**
 * Circular orbital speed at an altitude above mean sea level, km/s — `v = √(μ/r)`.
 * Astronomy × mechanics: an orbit's speed is fixed by its radius and nothing else.
 */
export const orbitalSpeedKmS = (altitudeKm: number): number =>
  algebraSqrt(MU_EARTH_KM3_S2 / (EARTH_MEAN_RADIUS_KM + altitudeKm))

/**
 * ISS state from wheretheiss.at (keyless): its OWN reported speed, and the speed the theorem
 * requires at its reported altitude. Two numbers from one call, one of them derived — so the API
 * cannot corroborate itself by restating a cached value.
 */
const issSpeedCross = (): Probe[] => [
  async () => {
    const j = await fetchJson('https://api.wheretheiss.at/v1/satellites/25544')
    const v = j.velocity
    if (typeof v !== 'number') throw new Error('iss: no velocity in body')
    return { source: 'wheretheiss (reported)', value: v / 3600, unit: 'km/s' }
  },
  async () => {
    const j = await fetchJson('https://api.wheretheiss.at/v1/satellites/25544')
    const alt = j.altitude
    if (typeof alt !== 'number') throw new Error('iss: no altitude in body')
    return { source: `√(μ/r) at ${alt.toFixed(0)} km (theorem)`, value: orbitalSpeedKmS(alt), unit: 'km/s' }
  },
]

/**
 * Triangular closure on a rate table: `a→b · b→c · c→a` must be 1.
 *
 * Economics × arithmetic, and it needs no second provider: the dataset is checked against ITSELF, so
 * a shared upstream is irrelevant. A table that does not close is arbitrageable, which is the
 * strongest statement available about a rate set.
 */
export const triangularClosure = (ab: number, bc: number, ca: number): number => ab * bc * ca

/** ECB reference rates via Frankfurter (keyless). Returns the closure product for EUR→USD→GBP→EUR. */
const fxClosureProbe = (): Probe => async () => {
  const j = await fetchJson('https://api.frankfurter.app/latest?from=EUR&to=USD,GBP')
  const r = j.rates as { USD?: number; GBP?: number } | undefined
  const j2 = await fetchJson('https://api.frankfurter.app/latest?from=USD&to=GBP')
  const usdGbp = (j2.rates as { GBP?: number } | undefined)?.GBP
  if (r?.USD === undefined || r.GBP === undefined || usdGbp === undefined) throw new Error('fx: missing rate')
  // EUR→USD · USD→GBP · GBP→EUR
  return { source: 'ecb via frankfurter', value: triangularClosure(r.USD, usdGbp, 1 / r.GBP), unit: 'ratio' }
}

/** The closure a table MUST satisfy. Stated as a reading so it crosses like any other source. */
const closureTheorem = (): Reading => ({ source: 'arbitrage-free (theorem)', value: 1, unit: 'ratio' })

/**
 * Day length from the solar-declination closed form, hours — astronomy × geometry.
 * Cosine of the hour angle at sunrise: `cos H = −tan φ · tan δ`, day length = 2H/15°.
 */
export function dayLengthHours(latitudeDeg: number, dayOfYear: number): number {
  const decl = 23.44 * algebraSin(rad((360 / 365) * (dayOfYear - 81)))
  const cosH = -algebraTan(rad(latitudeDeg)) * algebraTan(rad(decl))
  if (cosH <= -1) return 24
  if (cosH >= 1) return 0
  return (2 * ((algebraAcos(cosH) * 180) / PI)) / 15
}

/** sunrise-sunset.org (keyless) day length, hours — crossed against {@link dayLengthHours}. */
const sunriseDayLengthProbe = (g: Geodetic, isoDate: string): Probe => async () => {
  const j = await fetchJson(
    `https://api.sunrise-sunset.org/json?lat=${g.latitude}&lng=${g.longitude}&date=${isoDate}&formatted=0`,
  )
  const res = j.results as { day_length?: number } | undefined
  if (typeof res?.day_length !== 'number') throw new Error('sunrise-sunset: no day_length')
  return { source: 'sunrise-sunset.org', value: res.day_length / 3600, unit: 'h' }
}

/** The crosses this atom knows. Adding one is a row here, never another export. */
export type CrossKind = 'iss' | 'fx' | 'solar' | 'route' | 'weather'

export interface CrossRequest {
  readonly kind: CrossKind
  readonly at?: Geodetic
  readonly to?: Geodetic
  readonly isoDate?: string
  readonly dayOfYear?: number
  /** DECLARED by the caller: what counts as agreement belongs to the question, not to this atom. */
  readonly tolerance: number
}

/**
 * Run one cross and judge it — ONE exported entry point, not a probe factory per API.
 *
 * Six single-use exports is the surface defect [[rules]]/unfolded names, and this atom was written in
 * the session that removed four of them elsewhere. The factories are private; the kinds are a row.
 *
 * @invariant a kind whose independent leg is a theorem always contributes that leg
 */
export async function crossWitness(req: CrossRequest): Promise<Crosscheck> {
  const { kind, at, to, tolerance } = req
  if (kind === 'iss') return crosscheck('ISS speed', await gather(issSpeedCross()), tolerance)
  if (kind === 'fx') {
    return crosscheck('EUR→USD→GBP→EUR closure', [...(await gather([fxClosureProbe()])), closureTheorem()], tolerance)
  }
  if (at === undefined) return crosscheck(kind, [], tolerance)
  if (kind === 'weather') {
    return crosscheck('temperature', await gather([openMeteoTemperature(at), metNoTemperature(at)]), tolerance)
  }
  if (kind === 'solar') {
    const observed = await gather([sunriseDayLengthProbe(at, req.isoDate ?? new Date().toISOString().slice(0, 10))])
    const theorem: Reading = {
      source: 'cos H = −tanφ·tanδ (theorem)',
      value: dayLengthHours(at.latitude, req.dayOfYear ?? 1),
      unit: 'h',
    }
    return crosscheck('day length', [...observed, theorem], tolerance)
  }
  if (to === undefined) return crosscheck('distance a→b', [], tolerance)
  return routeCrosscheck(at, to, await gather([osrmDistanceKm(at, to)]), tolerance)
}
