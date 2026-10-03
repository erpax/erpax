import { describe, expect, it } from 'vitest'
import { generateMeta, shareImageURL } from './index'

describe('generate/meta — og:image comes from what the page already stores', () => {
  it('an uploaded SEO image wins, at its og size when the upload carries one', async () => {
    const m = await generateMeta({
      doc: { slug: 'ledger', meta: { title: 'Ledger', description: 'd', image: { id: 1, url: '/media/x.png', sizes: { og: { url: '/media/x-og.png' } } } as never } },
      siteOrigin: 'https://erpax.test',
    })
    const images = (m.openGraph as { images: Array<{ url: string }> }).images
    expect(images[0]!.url).toBe('https://erpax.test/media/x-og.png')
  })

  it('no upload: the image is the computed share image — SEO title and description over the slug\'s content-uuid, no Media row', async () => {
    const m = await generateMeta({ doc: { slug: 'ledger', meta: { title: 'Trial balance', description: 'Every debit meets its credit' } }, siteOrigin: 'https://erpax.test' })
    const url = (m.openGraph as { images: Array<{ url: string }> }).images[0]!.url
    expect(url.startsWith('https://erpax.test/next/share?')).toBe(true)
    const q = new URL(url).searchParams
    expect(q.get('t')).toBe('Trial balance')
    expect(q.get('d')).toBe('Every debit meets its credit')
    expect(q.get('u')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    // deterministic: the same slug always points at the same picture
    expect(shareImageURL({ slug: 'ledger', meta: { title: 'Trial balance' } }, 'https://erpax.test')).toBe(shareImageURL({ slug: 'ledger', meta: { title: 'Trial balance' } }, 'https://erpax.test'))
    expect(new URL(shareImageURL({ slug: 'other' }, 'https://erpax.test')).searchParams.get('u')).not.toBe(q.get('u'))
  })

  it('falls back from the SEO title to the document title to the slug, and joins an array slug', () => {
    expect(new URL(shareImageURL({ slug: 'a', title: 'Doc title' }, 'https://e')).searchParams.get('t')).toBe('Doc title')
    expect(new URL(shareImageURL({ slug: ['x', 'y'] }, 'https://e')).searchParams.get('t')).toBe('x/y')
  })

  it('source still exports/binds its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'index.ts'), 'utf8')
    expect(src).toMatch(/\bexport\b/)
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})
