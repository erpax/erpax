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
    render(<LowImpactHero {...({ richText: { root: {} } } as unknown as React.ComponentProps<typeof LowImpactHero>)}  />)
    expect(screen.getByText('rich')).toBeDefined()
  })

  it('CHILDREN WIN — an explicit composition outranks CMS content', () => {
    // The union forbids both at compile time, so nothing type-checks differently if this flips.
    // A refactor reversing the `||` would silently start showing the other source.
    // The union forbids richText AND children together, so both go through ONE cast — passing
    // children as JSX beside a cast spread is the same claim written where the compiler must reject it.
    render(
      <LowImpactHero
        {...({ richText: { root: {} }, children: <span>composed</span> } as unknown as React.ComponentProps<typeof LowImpactHero>)}
      />,
    )
    expect(screen.getByText('composed')).toBeDefined()
    expect(screen.queryByText('rich')).toBeNull()
  })

  it('with neither, renders an empty column rather than failing', () => {
    const { container } = render(<LowImpactHero {...({} as React.ComponentProps<typeof LowImpactHero>)}  />)
    expect(container.textContent).toBe('')
  })
})
