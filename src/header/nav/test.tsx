// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl', () => ({ useLocale: () => 'bg', useTranslations: () => (k: string) => k }))
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))
vi.mock('@/link/component', () => ({ CMSLink: ({ label }: { label?: string }) => <a href="https://erpax.test/x">{label}</a> }))
vi.mock('@/locale/switcher', () => ({ FrontendLocaleSwitcher: () => <div /> }))
vi.mock('lucide-react', () => ({ SearchIcon: () => <svg /> }))

const { HeaderNav } = await import('./index')

const data = { navItems: [{ link: { label: 'Posts' } }] } as never

describe('header/nav', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('header/nav')
  })

  it('WCAG 2.4.4 — the icon-only search link HAS an accessible name', () => {
    render(<HeaderNav data={data} />)
    // Delete the sr-only span and nothing on screen changes; this assertion is the only witness.
    expect(screen.getByRole('link', { name: 'searchLabel' })).toBeDefined()
  })

  it('the search link is locale-scoped, so it does not leave the active language', () => {
    render(<HeaderNav data={data} />)
    expect(screen.getByRole('link', { name: 'searchLabel' }).getAttribute('href')).toBe('/bg/search')
  })

  it('is a NAV landmark — the way a screen-reader user skips to navigation', () => {
    render(<HeaderNav data={data} />)
    expect(screen.getByRole('navigation')).toBeDefined()
  })

  it('renders the CMS links it is given, and survives having none', () => {
    render(<HeaderNav data={data} />)
    expect(screen.getByRole('link', { name: 'Posts' })).toBeDefined()
    cleanup()
    render(<HeaderNav data={{} as never} />)
    expect(screen.getByRole('navigation')).toBeDefined()
  })
})
