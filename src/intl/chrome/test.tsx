import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children }))
vi.mock('next-intl/server', () => ({ getMessages: async () => ({ hi: 'hi' }), setRequestLocale: vi.fn() }))
vi.mock('next/headers', () => ({ draftMode: async () => ({ isEnabled: false }) }))
vi.mock('next/cache', () => ({ unstable_noStore: vi.fn() }))
vi.mock('@/admin/bar', () => ({ AdminBar: () => null }))
vi.mock('@/document/html/lang', () => ({ DocumentHtmlLang: () => null }))
vi.mock('@/footer', () => ({ Footer: () => null }))
vi.mock('@/header', () => ({ Header: () => null }))

const { IntlChrome } = await import('./index')

/**
 * Every element in the returned tree, walked over RAW children.
 *
 * `React.Children.toArray` rewrites every key — synthesising `.0` for unkeyed children and `.$bg`
 * for keyed ones — so a walk built on it reads its own artefacts instead of what the source
 * authored. Iterating the raw arrays keeps the authored key intact, which is the whole subject here.
 */
const walk = (node: React.ReactNode, out: React.ReactElement[] = []): React.ReactElement[] => {
  const visit = (n: React.ReactNode): void => {
    if (Array.isArray(n)) {
      n.forEach(visit)
      return
    }
    if (!React.isValidElement(n)) return
    out.push(n)
    visit((n.props as { children?: React.ReactNode }).children)
  }
  visit(node)
  return out
}

describe('intl/chrome', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('intl/chrome')
  })

  it('KEYS the locale-dependent parts — React would otherwise reuse them across a switch', async () => {
    // A header keeping locale-derived state through a switch leaves half the frame in the old
    // language, which reads as a caching bug and is not one.
    const tree = await IntlChrome({ locale: 'bg', children: null })
    const keyed = walk(tree).filter((e) => e.key !== null)
    expect(keyed.length).toBeGreaterThan(0)
    expect(keyed.every((e) => String(e.key).includes('bg'))).toBe(true)
  })

  it('threads the SAME locale into every part that takes one', async () => {
    const tree = await IntlChrome({ locale: 'de', children: null })
    const locales = walk(tree)
      .map((e) => (e.props as { locale?: string }).locale)
      .filter(Boolean)
    expect(locales.length).toBeGreaterThan(0)
    expect(new Set(locales)).toEqual(new Set(['de']))
  })

  it('opts OUT of caching — this frame depends on the request', async () => {
    const { unstable_noStore } = await import('next/cache')
    await IntlChrome({ locale: 'bg', children: null })
    // Caching it would serve one visitor's language and preview state to another.
    expect(unstable_noStore).toHaveBeenCalled()
  })

  it('renders the children it is given', async () => {
    const tree = await IntlChrome({ locale: 'bg', children: <span data-testid="child" /> })
    expect(walk(tree).some((e) => (e.props as { 'data-testid'?: string })['data-testid'] === 'child')).toBe(true)
  })
})
