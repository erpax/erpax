/**
 * think/document — every lead is a document; a lead that is resolved is a redirect.
 *
 * An intent used to live in a cache file on one machine. A lead that only one checkout can see is
 * not a lead anyone else can develop. So each intent becomes a nested page under `leads`: its
 * title is what is to be done, its body says what it waits for. When a lead is resolved it stops
 * being a page: its address redirects to the document that resolved it, so a link to the lead
 * still lands somewhere true and nothing has to remember that it was done.
 *
 * Run: tsx src/think/document/index.ts
 *      (writes seed.generated.json and redirects.generated.json beside this file; load them with
 *       tsx src/seed/content/load/index.ts --url <origin> --seed <pages> --redirects <redirects>)
 *
 * A task as large as "implement this documentation site" is handled the same way: `sectionLeads`
 * turns the site's sitemap into one lead per section, so the work is a list of documents to read
 * and measure against, not one request nobody can finish.
 *
 * Run: tsx src/think/document/index.ts --sitemap https://example.org/sitemap.xml [--under /docs/]
 *      (records one lead per section; then generate and load the pages as above)
 *
 * @invariant an open lead is exactly one page; a resolved lead is exactly one redirect, never both
 * @invariant a lead's address is a function of its text alone, so the same lead is the same page everywhere
 * @see ./SKILL.md
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadPages, loadRedirects, pageRows, slugOf, type LoadOptions, type LoadResult, type PageRow } from '@/seed/content'
import type { Payload } from 'payload'
import { checkLead, subjectOf, conditionOf } from '@/think/document/check'

export { checkLead, checkLeadPage, conditionOf, leadSchema, subjectOf } from '@/think/document/check'
import { thoughtAddress } from '@/think'

/** One lead as the store holds it. A resolved lead may name the document that resolved it. */
export interface Lead {
  readonly intent: string
  readonly state: 'open' | 'resolved'
  readonly outcome?: unknown
}

/** A redirect to load: from a lead's address to the page that resolved it. */
export interface RedirectRow {
  readonly from: string
  /** slug of the page to redirect to */
  readonly page: string
}

/** `leads/<first words>-<address>`: readable, and unique because the address is of the whole text. */
export function leadPath(intent: string): string {
  const words = subjectOf(intent).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').slice(0, 6).join('-')
  return `leads/${words || 'lead'}-${thoughtAddress(`intent:${intent}`).slice(0, 8)}`
}

/** A lead as a markdown document: the subject as its heading, the rest as its description. */
export function leadMarkdown(intent: string): string {
  const subject = subjectOf(intent)
  const cut = subject.search(/[:(]/)
  const title = (cut > 12 ? subject.slice(0, cut) : subject).trim()
  const condition = conditionOf(intent)
  return [`# ${title.charAt(0).toUpperCase()}${title.slice(1)}`, '', subject, ...(condition ? ['', `**Develop when** ${condition}.`] : [])].join('\n')
}

/** Every `<loc>` in a sitemap or sitemap index, in order. */
export function sitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]!)
}

/**
 * A site's pages as one lead per section. `under` is the path the documentation lives beneath;
 * a section is the first segment after it, and its pages are the rest. Pages outside `under` are
 * not leads. The lead says what to do with the section and that it has not been read.
 */
export function sectionLeads(urls: readonly string[], under = '/docs/'): string[] {
  const sections = new Map<string, { origin: string; pages: Set<string> }>()
  for (const url of urls) {
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      continue
    }
    if (!parsed.pathname.startsWith(under)) continue
    const [section, ...rest] = parsed.pathname.slice(under.length).split('/').filter(Boolean)
    if (!section) continue
    const entry = sections.get(section) ?? { origin: parsed.host, pages: new Set<string>() }
    entry.pages.add(rest.join('/') || 'index')
    sections.set(section, entry)
  }
  return [...sections].sort(([a], [b]) => a.localeCompare(b)).map(([section, { origin, pages }]) =>
    `read the ${section} section of ${origin}${under}${section} (${pages.size} page(s): ${[...pages].sort().slice(0, 30).join(', ')}) and measure erpax against it, replacing what erpax hand-rolls with what the section documents — listed from the sitemap; not read when this was recorded`)
}

/** The page a resolved lead points at: `outcome.page`, when the outcome names one. */
export function resolvedBy(outcome: unknown): string | undefined {
  const page = (outcome as { page?: unknown } | null | undefined)?.page
  return typeof page === 'string' && page.trim() ? slugOf(page.trim()) : undefined
}

/**
 * Open leads as nested page rows under one `leads` page. A resolved lead is left out of the pages:
 * it is a redirect, or — when its outcome names no document — it is simply closed.
 */
export function leadRows(leads: readonly Lead[]): PageRow[] {
  const open = leads.filter((l) => l.state === 'open')
  const bodies = new Map<string, string>([
    ['leads', `# Leads\n\nWhat is still to be developed, one page each. ${open.length} open.`],
    ...open.map((l): [string, string] => [leadPath(l.intent), leadMarkdown(l.intent)]),
  ])
  return pageRows([...bodies.keys()].map((path) => ({ path })), (path) => bodies.get(path))
}

/** Resolved leads whose outcome names a document, as redirects from the lead's address to it. */
export function leadRedirects(leads: readonly Lead[]): RedirectRow[] {
  return leads.flatMap((l) => {
    const page = l.state === 'resolved' ? resolvedBy(l.outcome) : undefined
    return page ? [{ from: `/${slugOf(leadPath(l.intent))}`, page }] : []
  })
}

// ── a lead's life through the Payload API ───────────────────────────────────────────────────────
// The three steps below take the slice of the API the loaders use, so the same call works on the
// Local API inside the app and on the REST SDK from a client or a worker ([[seed]]/content/load's
// `overSdk`). Whoever calls is whoever Payload's access rules judge: nothing here overrides them.

type Api = Pick<Payload, 'find' | 'create' | 'update' | 'config'>

/** Record prompts as open leads: each becomes a page under `leads`. A lead already there is left alone. */
export async function recordLeads(
  api: Api,
  prompts: readonly unknown[],
  opts: LoadOptions = {},
): Promise<LoadResult & { readonly refused: readonly { readonly prompt: string; readonly reason: string }[] }> {
  const checked = prompts.map(checkLead)
  const refused = checked.flatMap((c) => (c.ok ? [] : [{ prompt: c.prompt, reason: c.reason }]))
  const accepted = checked.flatMap((c) => (c.ok ? [c.lead] : []))
  if (accepted.length === 0) return { created: 0, updated: 0, unchanged: 0, unresolved: [], refused }
  const rows = leadRows(accepted.map((intent): Lead => ({ intent, state: 'open' })))
  // the index page restates a count; it is written once and then left to whoever maintains it
  const found = await api.find({ collection: 'pages', where: { slug: { equals: 'leads' } }, depth: 0, limit: 1, draft: true, req: opts.req, select: { slug: true } })
  return { ...(await loadPages(api, found.docs.length > 0 ? rows.filter((r) => r.slug !== 'leads') : rows, opts)), refused }
}

/** One open lead as the search collection lists it. */
export interface OpenLead {
  readonly slug: string
  readonly title: string
  readonly description: string
}

/** The open leads, oldest first, read from the search collection: title, slug and description only. */
export async function openLeads(api: Pick<Payload, 'find'>, limit = 50): Promise<OpenLead[]> {
  const found = await api.find({
    collection: 'search',
    where: { slug: { like: 'leads-' } },
    select: { title: true, slug: true, meta: { description: true } },
    sort: 'createdAt',
    depth: 0,
    limit,
  } as never)
  return (found.docs as { slug?: string | null; title?: string | null; meta?: { description?: string | null } }[])
    .filter((d): d is { slug: string; title?: string | null; meta?: { description?: string | null } } => typeof d.slug === 'string')
    .map((d) => ({ slug: d.slug, title: d.title ?? d.slug, description: d.meta?.description ?? '' }))
}

/** Close a lead: its address redirects to the page that resolved it, and its own page is unpublished. */
export async function closeLead(api: Api, slug: string, page: string, opts: LoadOptions = {}): Promise<LoadResult> {
  return loadRedirects(api, [{ from: `/${slug}`, page: slugOf(page) }], opts)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { readFileSync, existsSync } = await import('node:fs')
  const { intend } = await import('@/think')
  const arg = (name: string): string | undefined => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined }
  const sitemap = arg('--sitemap')
  if (sitemap) {
    const read = async (at: string): Promise<string> => (existsSync(at) ? readFileSync(at, 'utf8') : await (await fetch(at, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; sitemap-reader)' } })).text())
    const top = sitemapUrls(await read(sitemap))
    const urls = top.every((u) => u.endsWith('.xml')) ? (await Promise.all(top.map(async (u) => sitemapUrls(await read(u))))).flat() : top
    const recorded = sectionLeads(urls, arg('--under') ?? '/docs/')
    for (const lead of recorded) intend(lead)
    console.log(`think/document — ${recorded.length} section lead(s) recorded from ${urls.length} url(s)`)
  }
  const store = join(process.cwd(), 'node_modules', '.cache', 'erpax', 'thought.json')
  const raw = existsSync(store) ? (JSON.parse(readFileSync(store, 'utf8')) as Record<string, unknown>) : {}
  const leads: Lead[] = Object.entries(raw)
    .filter(([addr, v]) => typeof v === 'string' && addr === thoughtAddress(`intent:${v}`))
    .map(([, v]) => intend(v as string))
  const here = join(process.cwd(), 'src', 'think', 'document')
  const pages = leadRows(leads)
  const redirects = leadRedirects(leads)
  writeFileSync(join(here, 'seed.generated.json'), JSON.stringify(pages, null, 1) + '\n')
  writeFileSync(join(here, 'redirects.generated.json'), JSON.stringify(redirects, null, 1) + '\n')
  console.log(`think/document — ${pages.length - 1} open lead page(s), ${redirects.length} redirect(s) from ${leads.length} lead(s)`)
}
