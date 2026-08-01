// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * Card — the accessibility claims, PROVEN rather than cited.
 *
 * `src/card/index.tsx` carries five banners (schema.org Article, W3C HTML5 article-element,
 * RFC 3986, WCAG 2.4.4 link-purpose-in-context, WCAG 2.5.5 target-size). The leftover engine's
 * derived proof asserts those strings are PRESENT in the source — refutable per claim, but it
 * proves the file still *claims* the standard, never that it *meets* it.
 *
 * This renders the component and checks the behaviour each banner asserts. Deleting the accessible
 * name, flattening the article element, or breaking the href fails here — which is what a
 * conformance credit has to mean.
 *
 * @invariant every assertion maps to one cited banner; nothing is checked that nothing claims
 */

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (k: string) => k,
}))
vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))
vi.mock('@/media', () => ({ MediaComponent: () => <div data-testid="media" /> }))
vi.mock('@/ui', () => ({ cn: (...c: unknown[]) => c.filter(Boolean).join(' ') }))
vi.mock('@/use/clickable/card', () => ({
  default: () => ({ card: { ref: { current: null } }, link: { ref: { current: null } } }),
}))

const { Card } = await import('./index')

const doc = {
  slug: 'the-fold',
  title: 'The fold closes',
  categories: [],
  meta: { description: 'a description', image: null },
} as never

describe('card — the cited accessibility claims, rendered and checked', () => {
  // auto-cleanup only registers when vitest globals are on; this project runs without them, so
  // without this every render accumulates in one document and `getByRole` finds five links.
  afterEach(cleanup)

  it('W3C HTML5 · schema.org Article — the container IS an <article>, not a styled div', () => {
    const { container } = render(<Card doc={doc} relationTo="posts" />)
    const article = container.querySelector('article')
    expect(article).not.toBeNull()
    // schema.org Article maps onto the HTML sectioning element; a div would carry no semantics
    expect(article!.tagName.toLowerCase()).toBe('article')
  })

  it('WCAG 2.4.4 link-purpose-in-context — the link’s accessible name is the TITLE', () => {
    render(<Card doc={doc} relationTo="posts" />)
    // the failure this forbids is a link named "read more" / "click here", whose purpose is
    // unrecoverable from the link alone — which is exactly what §2.4.4 is about
    const link = screen.getByRole('link', { name: 'The fold closes' })
    expect(link).toBeDefined()
    expect(link.textContent).toBe('The fold closes')
  })

  it('RFC 3986 — the href is a well-formed relative reference carrying locale and slug', () => {
    render(<Card doc={doc} relationTo="posts" />)
    const href = screen.getByRole('link', { name: 'The fold closes' }).getAttribute('href')
    expect(href).toBe('/en/posts/the-fold')
    // a relative-reference path: absolute-path form, no scheme, no authority, no empty segments
    expect(href).toMatch(/^\/(?:[A-Za-z0-9._~%-]+\/)*[A-Za-z0-9._~%-]+$/)
    expect(href).not.toContain('//')
  })

  it('WCAG 2.5.5 target-size — the link is INSIDE the article, so the card is the hit target', () => {
    const { container } = render(<Card doc={doc} relationTo="posts" />)
    const article = container.querySelector('article')!
    const link = screen.getByRole('link', { name: 'The fold closes' })
    // useClickableCard attaches a ref to the article and another to the link; the whole-card
    // target only works if the link is a descendant. A sibling link would defeat it silently.
    expect(article.contains(link)).toBe(true)
  })

  it('a card with no title renders no link at all — never an empty, unnameable one', () => {
    render(<Card doc={{ ...(doc as object), title: undefined } as never} relationTo="posts" />)
    // an anchor with no accessible name is a §2.4.4 failure; omitting it is the correct behaviour
    expect(screen.queryByRole('link')).toBeNull()
  })
})
