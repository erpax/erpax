// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

vi.mock('@/blocks', () => ({
  MediaBlock: () => null,
  CodeBlock: () => null,
  BannerBlock: () => null,
  CallToActionBlock: () => null,
}))
vi.mock('@payloadcms/richtext-lexical/react', () => ({
  RichText: () => null,
  LinkJSXConverter: () => ({}),
}))

const { internalDocToHref, default: RichText } = await import('./index')

const link = (doc: unknown) => ({ linkNode: { fields: { doc } } }) as never

describe('rich/text', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('rich/text')
  })

  it('exports a renderer', () => {
    expect(typeof RichText).toBe('function')
  })

  it('derives a POST route from the relation, never from a stored URL', () => {
    // The slug is free to change; a stored URL would rot, and every copy of it would rot silently.
    expect(internalDocToHref(link({ relationTo: 'posts', value: { slug: 'the-fold' } }))).toBe('/posts/the-fold')
  })

  it('derives a page route for every other relation', () => {
    expect(internalDocToHref(link({ relationTo: 'pages', value: { slug: 'about' } }))).toBe('/about')
  })

  it('REFUSES an unpopulated relation — a link to nowhere renders as a real link', () => {
    // The value is an id rather than a document, so no slug exists. Emitting `/undefined` would
    // produce a link a reader discovers; raising is discovered by whoever ships it.
    expect(() => internalDocToHref(link({ relationTo: 'posts', value: 42 }))).toThrow()
  })

  it('a slug that changes changes the href — that is the whole point of deriving it', () => {
    expect(internalDocToHref(link({ relationTo: 'posts', value: { slug: 'a' } }))).not.toBe(
      internalDocToHref(link({ relationTo: 'posts', value: { slug: 'b' } })),
    )
  })
})
