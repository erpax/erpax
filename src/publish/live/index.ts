import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * publish/live — is the release actually LIVE in npm and in Zenodo? See ./SKILL.md.
 */

export interface LiveVerdict {
  readonly registry: 'npm' | 'zenodo'
  /** Package name, or the DOI. */
  readonly id: string
  readonly version: string
  /** False when the registry could not be asked. NOT the same as `live: false`. */
  readonly reachable: boolean
  readonly live: boolean
  readonly detail: string
}

/** Injected so every verdict is testable offline and no gate depends on the network to be written. */
export interface RegistryIo {
  readonly getJson: (url: string) => Promise<{ status: number; json: unknown }>
}

/**
 * A real browser UA and nothing exotic.
 *
 * Measured: undici's default `Accept-Language: *` draws a 500 from some registries and a
 * `user-agent: node` draws a WAF block — and a 200 with the wrong body reads as absence.
 */
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'

export const networkIo: RegistryIo = {
  getJson: async (url) => {
    const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } })
    const text = await res.text()
    let json: unknown = null
    try {
      json = JSON.parse(text)
    } catch {
      json = null
    }
    return { status: res.status, json }
  },
}

/** Is `version` of `pkg` published on npm — asked of the registry, never inferred from a tag. */
export async function npmLive(pkg: string, version: string, io: RegistryIo = networkIo): Promise<LiveVerdict> {
  const url = `https://registry.npmjs.org/${pkg.replace('/', '%2F')}`
  let status = 0
  let json: unknown = null
  try {
    ;({ status, json } = await io.getJson(url))
  } catch (e) {
    return { registry: 'npm', id: pkg, version, reachable: false, live: false, detail: `registry unreachable: ${String(e)}` }
  }
  if (status === 404) {
    return { registry: 'npm', id: pkg, version, reachable: true, live: false, detail: 'package does not exist on npm' }
  }
  if (status !== 200 || json === null || typeof json !== 'object') {
    return { registry: 'npm', id: pkg, version, reachable: false, live: false, detail: `registry answered ${status} with no usable body` }
  }
  const doc = json as { versions?: Record<string, unknown>; time?: Record<string, string> }
  const present = Boolean(doc.versions && version in doc.versions)
  const when = doc.time?.[version]
  return {
    registry: 'npm',
    id: pkg,
    version,
    reachable: true,
    live: present,
    detail: present ? `published ${when ?? 'at an unrecorded time'}` : `not among ${Object.keys(doc.versions ?? {}).length} published version(s)`,
  }
}

/**
 * Does the DOI RESOLVE — asked of the DOI proxy, which is the only authority on that.
 *
 * `responseCode: 1` is "handle found". A locally computed DOI is a forgery ([[rules]]/forge), so
 * the only honest question is whether the registry knows it.
 */
export async function doiLive(doi: string, version: string, io: RegistryIo = networkIo): Promise<LiveVerdict> {
  const url = `https://doi.org/api/handles/${doi}`
  let status = 0
  let json: unknown = null
  try {
    ;({ status, json } = await io.getJson(url))
  } catch (e) {
    return { registry: 'zenodo', id: doi, version, reachable: false, live: false, detail: `DOI proxy unreachable: ${String(e)}` }
  }
  if (json === null || typeof json !== 'object') {
    return { registry: 'zenodo', id: doi, version, reachable: false, live: false, detail: `DOI proxy answered ${status} with no usable body` }
  }
  const code = (json as { responseCode?: number }).responseCode
  if (code === 1) return { registry: 'zenodo', id: doi, version, reachable: true, live: true, detail: 'handle resolves' }
  if (code === 100) return { registry: 'zenodo', id: doi, version, reachable: true, live: false, detail: 'handle not found — the DOI does not exist' }
  return { registry: 'zenodo', id: doi, version, reachable: false, live: false, detail: `DOI proxy responseCode ${String(code)}` }
}

/** The concept DOI declared in CITATION.cff — read, never guessed. */
export function declaredDoi(cwd: string = process.cwd()): string | null {
  const m = /^doi:\s*"?([^"\s]+)"?\s*$/m.exec(readFileSync(join(cwd, 'CITATION.cff'), 'utf8'))
  return m?.[1] ?? null
}

/** The released packages, from the manifest the release lane writes. */
export function releasedPackages(cwd: string = process.cwd()): ReadonlyArray<{ pkg: string; version: string }> {
  const manifest = JSON.parse(readFileSync(join(cwd, 'packages', 'released.json'), 'utf8')) as Record<
    string,
    { version?: string }
  >
  return Object.entries(manifest)
    .filter(([, v]) => typeof v?.version === 'string')
    .map(([pkg, v]) => ({ pkg, version: v.version! }))
}

/** Every claim the release makes, asked of the registry that owns it. */
export async function releaseLive(cwd: string = process.cwd(), io: RegistryIo = networkIo): Promise<LiveVerdict[]> {
  const out: LiveVerdict[] = []
  for (const { pkg, version } of releasedPackages(cwd)) out.push(await npmLive(pkg, version, io))
  const doi = declaredDoi(cwd)
  if (doi) out.push(await doiLive(doi, 'concept', io))
  return out
}

export interface LiveSummary {
  readonly live: number
  readonly missing: readonly LiveVerdict[]
  /** Could not be asked — never counted as missing, and never as live. */
  readonly unreachable: readonly LiveVerdict[]
  readonly complete: boolean
}

/**
 * `complete` requires every claim ANSWERED and live.
 *
 * An unreachable registry makes the release UNVERIFIED, not incomplete — the two are different
 * findings and conflating them is how an unasked question reports as green.
 */
export function summarise(verdicts: readonly LiveVerdict[]): LiveSummary {
  const unreachable = verdicts.filter((v) => !v.reachable)
  const missing = verdicts.filter((v) => v.reachable && !v.live)
  return {
    live: verdicts.filter((v) => v.live).length,
    missing,
    unreachable,
    complete: verdicts.length > 0 && missing.length === 0 && unreachable.length === 0,
  }
}

/**
 * Wait for the registries to agree, then report. npm is eventually consistent, so a check run
 * seconds after a publish may honestly answer `live: false` — the caller retries rather than
 * concluding. An UNREACHABLE registry is retried too, and never reported as missing.
 */
export async function awaitLive(
  cwd: string = process.cwd(),
  opts: { attempts?: number; delayMs?: number; io?: RegistryIo } = {},
): Promise<{ verdicts: LiveVerdict[]; summary: LiveSummary; attempts: number }> {
  const attempts = opts.attempts ?? 1
  const delayMs = opts.delayMs ?? 15_000
  let verdicts: LiveVerdict[] = []
  let summary = summarise([])
  for (let n = 1; n <= attempts; n++) {
    verdicts = await releaseLive(cwd, opts.io ?? networkIo)
    summary = summarise(verdicts)
    if (summary.complete) return { verdicts, summary, attempts: n }
    if (n < attempts) await new Promise((r) => setTimeout(r, delayMs))
  }
  return { verdicts, summary, attempts }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const attempts = Number(process.env.ERPAX_LIVE_ATTEMPTS ?? '1')
  const { verdicts, summary, attempts: used } = await awaitLive(process.cwd(), { attempts })
  for (const v of verdicts) {
    const mark = v.live ? '✓' : v.reachable ? '✗' : '?'
    console.log(`${mark} ${v.registry.padEnd(7)} ${v.id.padEnd(24)} ${v.version.padEnd(9)} ${v.detail}`)
  }
  console.log(
    `\npublish/live — ${summary.live}/${verdicts.length} live · missing ${summary.missing.length} · ` +
      `unreachable ${summary.unreachable.length} · complete ${summary.complete} (${used} attempt${used === 1 ? '' : 's'})`,
  )
  if (summary.unreachable.length > 0) console.log('UNVERIFIED — a registry could not be asked; this is not evidence of absence.')
  process.exit(summary.complete ? 0 : 1)
}
