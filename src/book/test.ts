import { describe, it, expect } from 'vitest'
import {
  pageOf,
  bookKeyOf,
  bondRankOf,
  pagesInBook,
  sortBookPages,
  chapterOf,
} from '@/book'
import { bookOf, interactiveBookNav, pageOfMatter } from '@/book/matter'

describe('book — interactive page navigation', () => {
  it('pageOf(medical/clinic) has prev and next within medical book', () => {
    const page = pageOfMatter('medical/clinic')
    expect(page).toBeDefined()
    expect(page!.book).toBe('medical')
    expect(page!.pageNumber).toBeGreaterThan(0)
    expect(page!.pageCount).toBeGreaterThan(0)
    expect(page!.prev !== null || page!.next !== null).toBe(true)
    expect(page!.spread.debit).toBeGreaterThanOrEqual(0)
    expect(page!.spread.credit).toBeGreaterThanOrEqual(0)
  })

  it('pageOf matrix layer has navigation without matter', () => {
    const page = pageOf('medical/clinic')
    expect(page?.book).toBe('medical')
    expect(page?.spread).toEqual({ debit: 0, credit: 0 })
  })

  it('bookOf(medical) page count > 0 with sealed percent', () => {
    const book = bookOf('medical')
    expect(book.pageCount).toBeGreaterThan(0)
    expect(book.sealedPercent).toBeGreaterThanOrEqual(0)
    expect(book.sealedPercent).toBeLessThanOrEqual(100)
    expect(book.toc.length).toBe(book.pageCount)
    expect(book.toc[0]).toMatch(/^\[\[.+\]\]$/)
  })

  it('interactiveBookNav returns siblings in same chapter', () => {
    const nav = interactiveBookNav('medical/clinic')
    expect(nav).toBeDefined()
    expect(nav!.parentBook).toBe('medical')
    for (const s of nav!.siblings) {
      expect(s.startsWith('medical/')).toBe(true)
    }
  })

  it('chapterOf maps horo digits to measures', () => {
    expect(chapterOf(4)).toBe('weave')
    expect(chapterOf(null)).toBeNull()
  })

  it('bondRankOf and sortBookPages are deterministic', () => {
    const paths = pagesInBook('medical').slice(0, 5)
    expect(sortBookPages(paths)).toEqual(sortBookPages(paths))
    for (const p of paths) expect(bondRankOf(p)).toBeGreaterThanOrEqual(0)
  })

  it('bookKeyOf uses hub for nested paths and corpus for root', () => {
    expect(bookKeyOf('medical/clinic')).toBe('medical')
    expect(bookKeyOf('law')).toBe('corpus')
  })
})
