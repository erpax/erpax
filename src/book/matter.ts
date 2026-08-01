import { exactRound } from '@/algebra'
/**
 * book/matter — spread + seal from folder models (readme import boundary).
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { nodeOf } from '@/uuid/matrix'
import { deriveFolderModel } from '@/readme/compute'
import {
  pageOf,
  pagesInBook,
  resolveBookHub,
  bondRankOf,
  normalizePath,
  chapterOf,
  type BookOfResult,
  type BookPageEntry,
  type BookSpread,
  type InteractiveBookNav,
  type PageOfResult,
} from './index'

const SRC = 'src'

export function spreadOf(atomPath: string, cwd: string = process.cwd()): BookSpread {
  const m = deriveFolderModel(atomPath, cwd)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}

/** Page with balance spread — matter twin of pageOf. */
export function pageOfMatter(atomPath: string, cwd: string = process.cwd()): PageOfResult | undefined {
  const path = normalizePath(atomPath)
  return pageOf(path, spreadOf(path, cwd))
}

const sealedFromDiamond = (atomPath: string, cwd: string): boolean => {
  const p = join(cwd, SRC, atomPath, 'diamond.json')
  if (!existsSync(p)) return false
  try {
    const parsed = JSON.parse(readFileSync(p, 'utf8')) as { sealed?: boolean }
    return parsed.sealed === true
  } catch {
    return false
  }
}

const pageEntriesOf = (paths: readonly string[], cwd: string): readonly BookPageEntry[] =>
  paths.map((path, i) => {
    const n = nodeOf(path)
    const horoDigit = n?.horo ?? null
    return {
      path,
      pageNumber: i + 1,
      chapter: chapterOf(horoDigit),
      horoDigit,
      bondRank: bondRankOf(path),
      sealed: sealedFromDiamond(path, cwd),
    }
  })

/** Ordered book — TOC wikilinks + sealed %. */
export function bookOf(hubPath: string, cwd: string = process.cwd()): BookOfResult {
  const book = resolveBookHub(hubPath)
  const ordered = pagesInBook(book)
  const pages = pageEntriesOf(ordered, cwd)
  const sealedCount = pages.filter((p) => p.sealed).length
  const pageCount = pages.length
  const sealedPercent = pageCount > 0 ? exactRound((sealedCount * 1000) / pageCount) / 10 : 0
  return {
    book,
    pageCount,
    sealedCount,
    sealedPercent,
    toc: pages.map((p) => `[[${p.path}]]`),
    pages,
  }
}

/** Prev · next · siblings for interactive UI. */
export function interactiveBookNav(atomPath: string, cwd: string = process.cwd()): InteractiveBookNav | undefined {
  const page = pageOfMatter(atomPath, cwd)
  if (!page) return undefined
  const book = bookOf(page.book === 'corpus' ? 'corpus' : page.book, cwd)
  const siblings = book.pages
    .filter((p) => p.chapter === page.chapter && p.path !== normalizePath(atomPath))
    .map((p) => p.path)
  return {
    prev: page.prev,
    next: page.next,
    siblings,
    parentBook: page.book,
  }
}

/** Terminal spread — page face + prev/next links. */
export function formatBookTerminal(atomPath: string, cwd: string = process.cwd()): string {
  const path = normalizePath(atomPath)
  const page = pageOfMatter(path, cwd)
  if (!page) return `book — unknown page \`${path}\``
  const nav = interactiveBookNav(path, cwd)!
  return [
    `book · [[${page.book}]]`,
    `page ${page.pageNumber} of ${page.pageCount}${page.chapter ? ` · chapter ${page.chapter}` : ''}`,
    `horo ${page.horoDigit ?? '—'} · bond rank ${bondRankOf(path)}`,
    `spread debit \`${page.spread.debit}\` · credit \`${page.spread.credit}\``,
    `neighbors ${page.neighbors.length > 0 ? page.neighbors.map((n) => `[[${n}]]`).join(' · ') : '—'}`,
    `prev ${page.prev ? `[[${page.prev}]]` : '—'} · next ${page.next ? `[[${page.next}]]` : '—'}`,
    `siblings ${nav.siblings.length > 0 ? nav.siblings.slice(0, 6).map((s) => `[[${s}]]`).join(' · ') : '—'}`,
  ].join('\n')
}
