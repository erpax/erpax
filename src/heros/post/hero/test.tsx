// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('next-intl/server', () => ({ getTranslations: async () => (k: string) => k }))
vi.mock('@/media', () => ({ MediaComponent: () => <div data-testid="media" /> }))
vi.mock('@/format/author', () => ({
  formatAuthors: (a: { name?: string }[]) => a.map((x) => x.name ?? '').filter(Boolean).join(', '),
}))
vi.mock('@/iso/8601', () => ({ formatDateTime: (d: string) => `pretty(${d})` }))

const { PostHero } = await import('./index')

const mount = async (post: Record<string, unknown>) => {
  const el = await PostHero({ post: post as never })
  return render(el as React.ReactElement)
}

describe('heros/post/hero', () => {
  afterEach(cleanup)

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('heros/post/hero')
  })

  it('the title is the H1', async () => {
    await mount({ title: 'The fold closes' })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('The fold closes')
  })

  it('ISO 8601 — the date carries a machine-readable dateTime beside the human text', async () => {
    const { container } = await mount({ title: 't', publishedAt: '2026-09-04T10:00:00.000Z' })
    const time = container.querySelector('time')!
    expect(time.getAttribute('dateTime')).toBe('2026-09-04T10:00:00.000Z')
    // the visible text is formatted for a person; the attribute is for everything else
    expect(time.textContent).toBe('pretty(2026-09-04T10:00:00.000Z)')
  })

  it('no date, no time element — an empty <time> is worse than none', async () => {
    const { container } = await mount({ title: 't' })
    expect(container.querySelector('time')).toBeNull()
  })

  it('authors that format to NOTHING render no byline — not a heading over blank space', async () => {
    // `length > 0` alone would pass here and print "author" with nothing beneath it.
    await mount({ title: 't', populatedAuthors: [{ name: '' }] })
    expect(screen.queryByText('author')).toBeNull()
  })

  it('a real author renders the byline', async () => {
    await mount({ title: 't', populatedAuthors: [{ name: 'Tsvetan' }] })
    expect(screen.getByText('Tsvetan')).toBeDefined()
  })

  it('an untitled category falls back to a word, never to blank', async () => {
    await mount({ title: 't', categories: [{ title: undefined }] })
    expect(screen.getByText(/untitled-category/)).toBeDefined()
  })
})
