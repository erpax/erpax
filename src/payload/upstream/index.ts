/**
 * payload/upstream — what Payload publishes, crossed against what erpax holds.
 *
 * The research the user asked for, made an instrument instead of a reading: the official repository's
 * `templates/`, `examples/` and `packages/` are listed from GitHub's contents API (injected fetch, so
 * the cross is testable offline), and each entry is asked whether this corpus HOLDS it — a package by
 * its presence in package.json, a template or example by the evidence it leaves in the tree. The
 * evidence map is DECLARED in the open: no theorem says `draft-preview` is held by the preview
 * route, and the list is where a reader argues with it.
 *
 * What comes out is a cross, not a verdict: `held` says the corpus carries the thing, `gap` names what
 * upstream offers and the corpus does not, and a gap is a candidate — using D1 is why `db-postgres` is
 * absent, and that is a choice, not a debt. [[rules]]/canonical owns the other half (installed and
 * never called); this is the half it cannot see (published and never installed).
 *
 * @standard GitHub REST API — repository contents
 * @see ./SKILL.md · src/agents/mcp/tool/outward
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export type UpstreamKind = 'template' | 'example' | 'package'

export interface UpstreamEntry {
  readonly kind: UpstreamKind
  readonly name: string
}

export interface UpstreamRow extends UpstreamEntry {
  /** true: held with evidence · false: not held · null: not askable (another framework, a scaffold) */
  readonly held: boolean | null
  readonly evidence: string
}

export interface UpstreamCross {
  readonly fetched: string
  readonly rows: readonly UpstreamRow[]
  readonly held: number
  readonly gaps: readonly UpstreamEntry[]
  readonly unaskable: readonly UpstreamEntry[]
  /** held ÷ askable, per kind */
  readonly coverage: Readonly<Record<UpstreamKind, number>>
}

type Fetch = (url: string) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>

const REPO = 'https://api.github.com/repos/payloadcms/payload/contents'

/** The three directories, each a list of entries; a directory that cannot be read contributes nothing and says so. */
export async function upstreamCatalogue(fetchImpl: Fetch = globalThis.fetch as Fetch): Promise<{ entries: UpstreamEntry[]; refused: string[] }> {
  const entries: UpstreamEntry[] = []
  const refused: string[] = []
  for (const [kind, dir] of [['template', 'templates'], ['example', 'examples'], ['package', 'packages']] as const) {
    try {
      const r = await fetchImpl(`${REPO}/${dir}`)
      if (!r.ok) {
        refused.push(`${dir}: HTTP ${r.status}`)
        continue
      }
      for (const e of (await r.json()) as Array<{ name: string; type: string }>) {
        if (e.type === 'dir' && !e.name.startsWith('_')) entries.push({ kind, name: e.name })
      }
    } catch (e) {
      refused.push(`${dir}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }
  return { entries, refused }
}

/**
 * DECLARED: the evidence a template or example leaves in this tree when it is held. A path is held when
 * it exists; a `pkg:` entry when the package is installed; `null` means the question does not apply
 * here — another framework, a scaffold for authoring plugins, a hosting-specific variant.
 */
const EVIDENCE: Readonly<Record<string, string | null>> = {
  // templates
  website: 'src/website',
  blank: null,
  'blank-tanstack': null,
  ecommerce: 'pkg:plugin-ecommerce',
  plugin: null,
  'with-cloudflare-d1': 'pkg:db-d1-sqlite',
  'with-postgres': 'pkg:db-postgres',
  'with-vercel-mongodb': 'pkg:db-mongodb',
  'with-vercel-postgres': 'pkg:db-vercel-postgres',
  'with-vercel-website': null,
  // examples
  auth: 'src/auth',
  'custom-components': 'src/admin/ui',
  'draft-preview': 'src/app/(frontend)/next/preview/route.ts',
  email: 'pkg:email-resend',
  'form-builder': 'pkg:plugin-form-builder',
  'live-preview': 'pkg:live-preview-react',
  localization: 'src/i18n',
  'multi-tenant': 'pkg:plugin-multi-tenant',
  'tailwind-shadcn-ui': 'src/website/shadcn',
  whitelabel: 'src/admin/ui/ComputedCssAdminRoot.tsx',
  astro: null,
  remix: null,
  'custom-server': null,
}

/** Installed `@payloadcms/*` packages, by their short name. */
export function installedPackages(cwd: string = process.cwd()): Set<string> {
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
  const names = Object.keys({ ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) })
  const out = new Set<string>()
  for (const n of names) {
    if (n === 'payload') out.add('payload')
    if (n.startsWith('@payloadcms/')) out.add(n.slice('@payloadcms/'.length))
  }
  return out
}

/** The cross, pure over a catalogue and a tree. */
export function upstreamCross(entries: readonly UpstreamEntry[], cwd: string = process.cwd(), fetched: string = new Date().toISOString().slice(0, 10)): UpstreamCross {
  const installed = installedPackages(cwd)
  const rows: UpstreamRow[] = entries.map((e) => {
    if (e.kind === 'package') {
      const held = installed.has(e.name)
      return { ...e, held, evidence: held ? `package.json: @payloadcms/${e.name}` : 'not installed' }
    }
    const ev = EVIDENCE[e.name]
    if (ev === undefined) return { ...e, held: null, evidence: 'no evidence declared — add it to EVIDENCE or leave it unaskable' }
    if (ev === null) return { ...e, held: null, evidence: 'not applicable here (another framework, scaffold or host variant)' }
    if (ev.startsWith('pkg:')) {
      const held = installed.has(ev.slice(4))
      return { ...e, held, evidence: held ? `package.json: @payloadcms/${ev.slice(4)}` : `${ev} not installed` }
    }
    const held = existsSync(join(cwd, ev))
    return { ...e, held, evidence: held ? ev : `${ev} absent` }
  })
  const held = rows.filter((r) => r.held === true).length
  const gaps = rows.filter((r) => r.held === false).map(({ kind, name }) => ({ kind, name }))
  const unaskable = rows.filter((r) => r.held === null).map(({ kind, name }) => ({ kind, name }))
  const coverage = {} as Record<UpstreamKind, number>
  for (const k of ['template', 'example', 'package'] as const) {
    const askable = rows.filter((r) => r.kind === k && r.held !== null)
    coverage[k] = askable.length === 0 ? 0 : askable.filter((r) => r.held === true).length / askable.length
  }
  return { fetched, rows, held, gaps, unaskable, coverage }
}
