// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/heros/high/impact', () => ({ HighImpactHero: () => <div>high</div> }))
vi.mock('@/heros/low/impact', () => ({ LowImpactHero: () => <div>low</div> }))
vi.mock('@/heros/medium/impact', () => ({ MediumImpactHero: () => <div>medium</div> }))

const { RenderHero } = await import('./index')

describe('hero/render', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('hero/render')
  })

  it('renders the hero the type names', () => {
    render(<RenderHero {...({ type: 'highImpact' } as unknown as React.ComponentProps<typeof RenderHero>)}  />)
    expect(screen.getByText('high')).toBeDefined()
  })

  it("'none' renders nothing — an editor's explicit choice", () => {
    const { container } = render(<RenderHero {...({ type: 'none' } as unknown as React.ComponentProps<typeof RenderHero>)}  />)
    expect(container.innerHTML).toBe('')
  })

  it('an UNKNOWN type renders nothing — handing undefined to React is an outage', () => {
    // this is the case a rename produces: the CMS still holds the old value, and `heroes[type]` is
    // undefined. Rendering it throws and takes the page down; the guard makes it a missing hero.
    const { container } = render(<RenderHero {...({ type: 'sideways' } as unknown as React.ComponentProps<typeof RenderHero>)}  />)
    expect(container.innerHTML).toBe('')
  })

  it('an absent hero renders nothing — a draft has no type at all', () => {
    const { container } = render(<RenderHero {...({} as React.ComponentProps<typeof RenderHero>)}  />)
    expect(container.innerHTML).toBe('')
  })
})
