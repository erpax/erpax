// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/rich/text', () => ({ default: () => <p>rich</p> }))

const { LowImpactHero } = await import('./index')

describe('heros/low/impact', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('heros/low/impact')
  })

  it('renders children when it is composed explicitly', () => {
    render(<LowImpactHero><span>composed</span></LowImpactHero>)
    expect(screen.getByText('composed')).toBeDefined()
  })

  it('renders CMS rich text when there are no children', () => {
    render(<LowImpactHero {...({ richText: { root: {} } } as never)} />)
    expect(screen.getByText('rich')).toBeDefined()
  })

  it('CHILDREN WIN — an explicit composition outranks CMS content', () => {
    // The union forbids both at compile time, so nothing type-checks differently if this flips.
    // A refactor reversing the `||` would silently start showing the other source.
    render(<LowImpactHero {...({ richText: { root: {} } } as never)}><span>composed</span></LowImpactHero>)
    expect(screen.getByText('composed')).toBeDefined()
    expect(screen.queryByText('rich')).toBeNull()
  })

  it('with neither, renders an empty column rather than failing', () => {
    const { container } = render(<LowImpactHero {...({} as never)} />)
    expect(container.textContent).toBe('')
  })
})
