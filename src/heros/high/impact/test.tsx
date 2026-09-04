// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

const setHeaderTheme = vi.fn()
vi.mock('@/providers/header/theme', () => ({ useHeaderTheme: () => ({ setHeaderTheme }) }))
vi.mock('@/link/component', () => ({ CMSLink: ({ label }: { label?: string }) => <a href="/x">{label}</a> }))
vi.mock('@/media', () => ({ MediaComponent: () => <div data-testid="media" /> }))
vi.mock('@/rich/text', () => ({ default: () => <p>rich</p> }))

const { HighImpactHero } = await import('./index')

describe('heros/high/impact', () => {
  afterEach(() => {
    cleanup()
    setHeaderTheme.mockClear()
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('heros/high/impact')
  })

  it('darkens the header on mount — white text on a white header is the failure', () => {
    render(<HighImpactHero {...({} as never)} />)
    expect(setHeaderTheme).toHaveBeenCalledWith('dark')
  })

  it('WCAG 1.3.1 — the call-to-action links are a LIST of items, not loose anchors', () => {
    render(<HighImpactHero {...({ links: [{ link: { label: 'A' } }, { link: { label: 'B' } }] } as never)} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders NO list when there are no links — an empty list is furniture', () => {
    const { container } = render(<HighImpactHero {...({ links: [] } as never)} />)
    expect(container.querySelector('ul')).toBeNull()
  })

  it('every part is optional, because every part comes from a CMS', () => {
    const { container } = render(<HighImpactHero {...({} as never)} />)
    expect(container.querySelector('ul')).toBeNull()
    expect(container.querySelector('[data-testid="media"]')).toBeNull()
  })
})
