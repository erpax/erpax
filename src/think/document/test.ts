import { describe, it, expect } from 'vitest'
import { conditionOf, sectionLeads, sitemapUrls, leadMarkdown, leadPath, leadRedirects, leadRows, resolvedBy, subjectOf, type Lead } from '@/think/document'

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
