import { describe, it, expect } from 'vitest'
import { checkLead, closeLead, openLeads, recordLeads, conditionOf, sectionLeads, sitemapUrls, leadMarkdown, leadPath, leadRedirects, leadRows, resolvedBy, subjectOf, type Lead } from '@/think/document'

const A = 'serve the sitemap from the search collection so one row answers every read — develop when Payload is improved (search carrying the url)'
const B = 'drop the four tables left by the merge: empty and unread'
const DONE = 'merge customers and vendors into parties'

describe('think/document — a lead is a document', () => {
  it('splits a lead into what it is and what it waits for', () => {
    expect(subjectOf(A)).toBe('serve the sitemap from the search collection so one row answers every read')
    expect(conditionOf(A)).toBe('Payload is improved (search carrying the url)')
    expect(conditionOf(B)).toBeUndefined()
    expect(subjectOf(B)).toBe(B)
  })

  it('addresses a lead by its own text: readable, stable, and different for a different lead', () => {
    expect(leadPath(A)).toMatch(/^leads\/serve-the-sitemap-from-the-search-[0-9a-f]{8}$/)
    expect(leadPath(A)).toBe(leadPath(A))
    expect(leadPath(A)).not.toBe(leadPath(`${A}.`))
    expect(leadPath('— — —')).toMatch(/^leads\/lead-[0-9a-f]{8}$/)
  })

  it('writes the lead as a document: a heading, the subject, and the condition when it has one', () => {
    expect(leadMarkdown(B)).toBe('# Drop the four tables left by the merge\n\ndrop the four tables left by the merge: empty and unread')
    expect(leadMarkdown(A)).toContain('\n\n**Develop when** Payload is improved (search carrying the url).')
  })
})

describe('think/document — open is a page, resolved is a redirect, never both', () => {
  const leads: Lead[] = [
    { intent: A, state: 'open' },
    { intent: B, state: 'open' },
    { intent: DONE, state: 'resolved', outcome: { page: 'parties' } },
    { intent: 'closed with no document', state: 'resolved', outcome: 'done' },
  ]

  it('nests every open lead under one leads page, parent first', () => {
    const rows = leadRows(leads)
    expect(rows[0]).toMatchObject({ slug: 'leads', parent: null })
    expect(rows[0]!.markdown).toContain('2 open')
    expect(rows.slice(1).map((r) => r.parent)).toEqual(['leads', 'leads'])
    expect(rows.slice(1).every((r) => r.description.length > 0)).toBe(true)
  })

  it('a resolved lead is not a page', () => {
    const slugs = leadRows(leads).map((r) => r.slug)
    expect(slugs.some((s) => s.includes('merge-customers'))).toBe(false)
    expect(slugs.some((s) => s.includes('closed-with-no'))).toBe(false)
  })

  it('a resolved lead that names a document redirects to it; one that names none is only closed', () => {
    expect(leadRedirects(leads)).toEqual([{ from: `/${leadPath(DONE).replace(/\//g, '-')}`, page: 'parties' }])
    expect(resolvedBy({ page: 'rules/copy' })).toBe('rules-copy')
    expect(resolvedBy('done')).toBeUndefined()
    expect(resolvedBy({ page: '  ' })).toBeUndefined()
  })

  it('no lead is both a page and a redirect', () => {
    const pages = new Set(leadRows(leads).map((r) => `/${r.slug}`))
    expect(leadRedirects(leads).filter((r) => pages.has(r.from))).toEqual([])
  })
})

describe('think/document — a whole site becomes one lead per section', () => {
  const xml = '<urlset><url><loc>https://x.org/docs/fields/overview</loc></url><url><loc> https://x.org/docs/fields/array </loc></url><url><loc>https://x.org/docs/hooks/overview</loc></url><url><loc>https://x.org/blog/post</loc></url><url><loc>https://x.org/docs/</loc></url><url><loc>not a url</loc></url></urlset>'

  it('reads every location from a sitemap', () => {
    // a location that is not one token is not a url, so it is not read
    expect(sitemapUrls(xml)).toHaveLength(5)
    expect(sitemapUrls('<sitemapindex><sitemap><loc>https://x.org/sitemap-0.xml</loc></sitemap></sitemapindex>')).toEqual(['https://x.org/sitemap-0.xml'])
  })

  it('groups pages under the documentation path by section, sorted, and ignores the rest', () => {
    const leads = sectionLeads(sitemapUrls(xml))
    expect(leads).toHaveLength(2)
    expect(leads[0]).toContain('the fields section of x.org/docs/fields (2 page(s): array, overview)')
    expect(leads[1]).toContain('the hooks section of x.org/docs/hooks (1 page(s): overview)')
    expect(leads.every((l) => l.includes('not read when this was recorded'))).toBe(true)
  })

  it('takes another documentation path, and yields nothing for a site with none', () => {
    expect(sectionLeads(['https://x.org/guide/start/install'], '/guide/')).toHaveLength(1)
    expect(sectionLeads(['https://x.org/blog/post'])).toEqual([])
  })
})

/** A stand-in for the slice of the API the lead steps use; `search` mirrors published pages. */
function fakeApi() {
  const tables: Record<string, Array<Record<string, unknown> & { id: string }>> = { pages: [], redirects: [] }
  const api = {
    config: { collections: [{ slug: 'pages', fields: [{ name: 'layout', type: 'blocks', blocks: [{ slug: 'content', fields: [{ name: 'richText', type: 'richText' }] }] }] }] },
    find: async ({ collection, where }: { collection: string; where?: { slug?: { equals?: string; like?: string } } }) => {
      const source = collection === 'search' ? tables.pages!.filter((d) => d._status === 'published').map((d) => ({ slug: d.slug, title: d.title, meta: d.meta })) : tables[collection]!
      const eq = where?.slug?.equals, like = where?.slug?.like
      return { docs: source.filter((d) => (eq === undefined || d.slug === eq) && (like === undefined || String(d.slug).includes(like))) }
    },
    create: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => { const doc = { ...data, id: `${collection}-${tables[collection]!.length + 1}` }; tables[collection]!.push(doc); return doc },
    update: async ({ collection, id, data }: { collection: string; id: string; data: Record<string, unknown> }) => Object.assign(tables[collection]!.find((d) => d.id === id)!, data),
  }
  return { api: api as never, raw: api, tables }
}
const convert = (() => ({ root: {} })) as never

describe('think/document — a lead is recorded, listed and closed through the API', () => {
  it('records prompts as pages under leads, once', async () => {
    const { api, tables } = fakeApi()
    expect(await recordLeads(api, [A, B], { convert })).toMatchObject({ created: 3 })
    expect(await recordLeads(api, [A, B], { convert })).toMatchObject({ created: 0, unchanged: 2 })
    expect(tables.pages!.map((d) => d.parent)).toEqual([null, 'pages-1', 'pages-1'])
  })

  it('lists the open leads with title, slug and description, and not the index page', async () => {
    const { api } = fakeApi()
    await recordLeads(api, [A, B], { convert })
    const open = await openLeads(api)
    expect(open).toHaveLength(2)
    expect(open.every((l) => l.slug.startsWith('leads-') && l.title.length > 0 && l.description.length > 0)).toBe(true)
  })

  it('closing a lead redirects its address to the page that resolved it and takes it off the list', async () => {
    const { api, raw, tables } = fakeApi()
    await recordLeads(api, [A, B], { convert })
    await raw.create({ collection: 'pages', data: { slug: 'search', title: 'search', _status: 'published' } })
    const [first] = await openLeads(api)
    expect(await closeLead(api, first!.slug, 'search')).toMatchObject({ created: 1 })
    expect(tables.redirects![0]).toMatchObject({ from: `/${first!.slug}` })
    expect((await openLeads(api)).map((l) => l.slug)).not.toContain(first!.slug)
  })

  it('refuses to close a lead onto a page that does not exist', async () => {
    const { api, tables } = fakeApi()
    await recordLeads(api, [A], { convert })
    const [first] = await openLeads(api)
    expect(await closeLead(api, first!.slug, 'nowhere')).toMatchObject({ created: 0, unresolved: ['nowhere'] })
    expect(tables.redirects).toHaveLength(0)
  })
})

describe('think/document — a prompt is checked against the lead definition before it is written', () => {
  it('accepts a sentence of work and trims it', () => {
    expect(checkLead('  serve the sitemap from the search collection  ')).toEqual({ ok: true, lead: 'serve the sitemap from the search collection' })
  })

  it('refuses what is not a lead, each with its reason', () => {
    const reason = (p: unknown) => { const c = checkLead(p); return c.ok ? 'accepted' : c.reason }
    expect(reason('fix it')).toMatch(/at least a short sentence/)
    expect(reason('one\nline is required here')).toMatch(/one line/)
    expect(reason('x'.repeat(1300))).toMatch(/not a document/)
    expect(reason('supercalifragilistic expialidocious')).toMatch(/three words/)
    expect(reason('drop the four \u202etables left behind')).toMatch(/hidden or control/)
    expect(reason(42)).not.toBe('accepted')
  })

  it('records the accepted prompts and reports the refused ones, writing nothing for them', async () => {
    const { api, tables } = fakeApi()
    const out = await recordLeads(api, [A, 'fix it', 7], { convert })
    expect(out).toMatchObject({ created: 2 })
    expect(out.refused.map((r) => r.prompt)).toEqual(['fix it', '7'])
    expect(tables.pages).toHaveLength(2)
    expect(await recordLeads(api, ['no'], { convert })).toMatchObject({ created: 0, refused: [{ prompt: 'no' }] })
  })
})
