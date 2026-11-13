import { describe, it, expect } from 'vitest'
import { conditionOf, leadMarkdown, leadPath, leadRedirects, leadRows, resolvedBy, subjectOf, type Lead } from '@/think/document'

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
