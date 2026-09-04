// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/link/component', () => ({ CMSLink: ({ label }: { label?: string }) => <a href="/x">{label}</a> }))
vi.mock('@/media', () => ({ MediaComponent: () => <div data-testid="media" /> }))
vi.mock('@/rich/text', () => ({ default: () => <p>rich</p> }))

const { MediumImpactHero } = await import('./index')

describe('heros/medium/impact', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('heros/medium/impact')
  })

  it('WCAG 1.3.1 — the call-to-action links are a LIST of items, not loose anchors', () => {
    render(<MediumImpactHero {...({ links: [{ link: { label: 'A' } }, { link: { label: 'B' } }] } as never)} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders NO list when there are no links — an empty list is furniture', () => {
    const { container } = render(<MediumImpactHero {...({ links: [] } as never)} />)
    expect(container.querySelector('ul')).toBeNull()
  })

  it('renders the image only when there is one', () => {
    const { container } = render(<MediumImpactHero {...({ media: { url: '/a.png' } } as never)} />)
    expect(container.querySelector('[data-testid="media"]')).not.toBeNull()
  })

  it('every part is optional, because every part comes from a CMS', () => {
    const { container } = render(<MediumImpactHero {...({} as never)} />)
    expect(container.querySelector('ul')).toBeNull()
    expect(container.querySelector('[data-testid="media"]')).toBeNull()
  })
})
