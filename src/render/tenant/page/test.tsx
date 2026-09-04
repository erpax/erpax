// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/block', () => ({ RenderBlocks: ({ blocks }: { blocks?: unknown[] }) => <div data-testid="blocks">{(blocks ?? []).length}</div> }))
vi.mock('@/hero/render', () => ({ RenderHero: () => <div data-testid="hero" /> }))

const { RenderTenantPage } = await import('./index')

describe('render/tenant/page', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('render/tenant/page')
  })

  it('the content is an ARTICLE — a div would look identical and carry no semantics', () => {
    const { container } = render(<RenderTenantPage data={{ hero: {}, layout: [] } as never} />)
    expect(container.querySelector('article')).not.toBeNull()
  })

  it('composes the hero above the blocks, in that order', () => {
    render(<RenderTenantPage data={{ hero: {}, layout: [{}, {}] } as never} />)
    const hero = screen.getByTestId('hero')
    const blocks = screen.getByTestId('blocks')
    expect(hero.compareDocumentPosition(blocks) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(blocks.textContent).toBe('2')
  })

  it('an empty layout renders an empty article — a page with no blocks is not an error', () => {
    const { container } = render(<RenderTenantPage data={{ hero: {}, layout: [] } as never} />)
    expect(container.querySelector('article')).not.toBeNull()
    expect(screen.getByTestId('blocks').textContent).toBe('0')
  })
})
