/**
 * seed/content/load — the corpus documents loaded into a running Payload over its REST SDK.
 *
 * A rule or skill file read into every agent's context is paid for on every turn of every session.
 * The same text as a nested page is paid for once, by the one agent that asks for it: it finds the
 * page by slug through the SDK or the MCP find tool and selects `markdown`. This atom is the
 * loading half: it reads each atom's SKILL document, derives page rows, and writes them through
 * `@payloadcms/sdk` — the same operations as the Local API, over HTTP — so it works against any
 * deployment it can reach, with the caller's own credentials.
 *
 * Run: tsx src/seed/content/load/index.ts --url https://host --packs rules,law [--tenant <id>]
 *      tsx src/seed/content/load/index.ts --url https://host --seed <generated seed file>
 *      (credentials: ERPAX_AUTHORIZATION, the full Authorization header value)
 *
 * @invariant the SDK adapter forwards only what REST understands — a request object never crosses
 * @invariant a reader returns undefined for an atom with no document; it never invents a body
 * @rfc 9110 http-semantics authorization
 * @see ../index.ts
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Payload, SanitizedConfig } from 'payload'
import { loadPages, pageRows, type LoadResult, type PageRow } from '@/seed/content'

/** The three REST operations the loaders use, as the SDK offers them. */
export interface Rest {
  find(args: Record<string, unknown>): Promise<unknown>
  create(args: Record<string, unknown>): Promise<unknown>
  update(args: Record<string, unknown>): Promise<unknown>
}

/** Local-API options that have no meaning over HTTP: the request object and its hook context. */
const LOCAL_ONLY = ['req', 'context'] as const

const overHttp = (args: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(args).filter(([k, v]) => !(LOCAL_ONLY as readonly string[]).includes(k) && v !== undefined))

/**
 * The SDK seen as the slice of the Local API the loaders write through. The sanitized config rides
 * along because the markdown is converted with the editor of the field it lands in.
 */
export function overSdk(sdk: Rest, config: SanitizedConfig): Pick<Payload, 'find' | 'create' | 'update' | 'config'> {
  return {
    config,
    find: (args: Record<string, unknown>) => sdk.find(overHttp(args)),
    create: (args: Record<string, unknown>) => sdk.create(overHttp(args)),
    update: (args: Record<string, unknown>) => sdk.update(overHttp(args)),
  } as unknown as Pick<Payload, 'find' | 'create' | 'update' | 'config'>
}

/** Reads an atom's SKILL document from a checkout; undefined when the atom has none. */
export const skillReader = (cwd: string) => (path: string): string | undefined => {
  const file = join(cwd, 'src', path, 'SKILL.md')
  return existsSync(file) ? readFileSync(file, 'utf8') : undefined
}

/** `--url x --packs a,b --tenant t` → its parts; a flag with no value is absent, never guessed. */
export function parseArgs(argv: readonly string[]): { url?: string; packs?: Set<string>; tenant?: string; seed?: string } {
  const value = (flag: string): string | undefined => {
    const i = argv.indexOf(flag)
    const v = i >= 0 ? argv[i + 1] : undefined
    return v && !v.startsWith('--') ? v : undefined
  }
  const packs = value('--packs')
  return { url: value('--url'), packs: packs ? new Set(packs.split(',').map((p) => p.trim()).filter(Boolean)) : undefined, tenant: value('--tenant'), seed: value('--seed') }
}

/** Load rows that were generated earlier — a seed file needs no checkout and no installed skill. */
export async function loadSeed(sdk: Rest, config: SanitizedConfig, rows: readonly PageRow[], opts: { tenant?: string } = {}): Promise<LoadResult & { rows: number }> {
  const result = await loadPages(overSdk(sdk, config), rows, { tenant: opts.tenant })
  return { ...result, rows: rows.length }
}

/** Load the selected packs of a checkout into the Payload the SDK points at. */
export async function loadCorpus(
  sdk: Rest,
  config: SanitizedConfig,
  nodes: ReadonlyArray<{ readonly path: string }>,
  read: (path: string) => string | undefined,
  opts: { packs?: ReadonlySet<string>; tenant?: string } = {},
): Promise<LoadResult & { rows: number }> {
  const rows: PageRow[] = pageRows(nodes, read, opts.packs)
  const result = await loadPages(overSdk(sdk, config), rows, { tenant: opts.tenant })
  return { ...result, rows: rows.length }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { url, packs, tenant, seed } = parseArgs(process.argv.slice(2))
  if (!url || (!packs && !seed)) {
    console.error('usage: tsx src/seed/content/load/index.ts --url <origin> (--packs <a,b> | --seed <file>) [--tenant <id>]')
    process.exit(2)
  }
  const authorization = process.env.ERPAX_AUTHORIZATION
  const { PayloadSDK } = await import('@payloadcms/sdk')
  const { UUID_MATRIX_NODES } = await import('@/uuid/matrix')
  const config = await (await import('@/payload.config')).default
  const sdk = new PayloadSDK({ baseURL: `${url.replace(/\/$/, '')}/api`, baseInit: authorization ? { headers: { Authorization: authorization } } : {} })
  const result = seed
    ? await loadSeed(sdk as unknown as Rest, config, JSON.parse(readFileSync(seed, 'utf8')) as PageRow[], { tenant })
    : await loadCorpus(sdk as unknown as Rest, config, UUID_MATRIX_NODES, skillReader(process.cwd()), { packs, tenant })
  console.log(JSON.stringify({ ...result, unresolved: result.unresolved.length }))
  process.exit(0)
}
