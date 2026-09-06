/**
 * book — interactive books: each folder is a page; bonds turn pages; seal binds.
 *
 * Book = hub domain (medical, quantum, …) or whole corpus.
 * Page = one-word atom folder (README face · SKILL margin · index.ts matter).
 * Page order = horo chapter × bond rank within hub — all computed, never hand-set.
 *
 *   pnpm erpax corpus book medical/clinic
 *
 * @audit every page number derived from matrix bonds + horo sequence
 * @see ../navigation — ../uuid/matrix — ./matter — ./SKILL.md
 */
import { adminGroupOf } from '@/navigation'
import { HORO_DIGITS, horoChapterOf as chapterOf } from '@/horo'
import { bondRankOf } from '@/uuid/matrix'

/** Kept on this atom's face — the bodies live at their own addresses now. */
export { chapterOf, bondRankOf }
import {
  UUID_MATRIX_NODES,
  nodeOf,
  neighborsOf,
  backlinksOf,
} from '@/uuid/matrix'

/** Debit/credit spread — balance meeting closes the page. */
export interface BookSpread {
  readonly debit: number
  readonly credit: number
}

/** One page in an ordered book. */
export interface BookPageEntry {
  readonly path: string
  readonly pageNumber: number
  readonly chapter: string | null
  readonly horoDigit: number | null
  readonly bondRank: number
  readonly sealed: boolean
}

/** Full page coordinate — book spread navigation. */
export interface PageOfResult {
  readonly book: string
  readonly chapter: string | null
  readonly pageNumber: number
  readonly pageCount: number
  readonly horoDigit: number | null
  readonly neighbors: readonly string[]
  readonly prev: string | null
  readonly next: string | null
  readonly spread: BookSpread
}

/** Book TOC — ordered pages + seal rollup. */
export interface BookOfResult {
  readonly book: string
  readonly pageCount: number
  readonly sealedCount: number
  readonly sealedPercent: number
  readonly toc: readonly string[]
  readonly pages: readonly BookPageEntry[]
}

/** UI/CLI prev · next · siblings within one book. */
export interface InteractiveBookNav {
  readonly prev: string | null
  readonly next: string | null
  readonly siblings: readonly string[]
  readonly parentBook: string
}

const CORPUS_BOOK = 'corpus'
const EMPTY_SPREAD: BookSpread = { debit: 0, credit: 0 }

export const normalizePath = (input: string): string =>
  input
    .trim()
    .replace(/\\/g, '/')
    .replace(/^src\//, '')
    .replace(/^\/+|\/+$/g, '')

const horoIndex = (digit: number | null): number => {
  if (digit === null) return HORO_DIGITS.length
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? i : HORO_DIGITS.length
}



/** Matrix neighbor paths for one atom — bond turns. */
export function neighborPathsOf(atomPath: string): readonly string[] {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const matrixKey = nodeOf(atomPath)?.atom ?? nodeOf(leaf)?.atom ?? leaf
  const seen = new Set<string>()
  const out: string[] = []
  for (const n of [...neighborsOf(matrixKey), ...backlinksOf(matrixKey)]) {
    const p = n.path ?? n.atom
    if (!p || seen.has(p)) continue
    seen.add(p)
    out.push(p)
  }
  return out.sort((a, b) => a.localeCompare(b))
}

/** Resolve book key — hub segment or corpus for root-level atoms. */
export function bookKeyOf(atomPath: string): string {
  const path = normalizePath(atomPath)
  const hub = adminGroupOf(path)
  if (!hub || !path.includes('/')) return CORPUS_BOOK
  return hub
}

/** Resolve hub path for bookOf — empty/corpus ⇒ whole library. */
export function resolveBookHub(hubPath: string): string {
  const key = normalizePath(hubPath)
  if (!key || key === CORPUS_BOOK) return CORPUS_BOOK
  return key.split('/')[0] ?? key
}

/** All atom paths in one book — hub cover + descendants, or full corpus. */
export function pagesInBook(hubPath: string, atomPaths?: readonly string[]): readonly string[] {
  const book = resolveBookHub(hubPath)
  const all = atomPaths ?? UUID_MATRIX_NODES.map((n) => n.path ?? n.atom).filter(Boolean)
  const filtered =
    book === CORPUS_BOOK
      ? [...all]
      : all.filter((p) => p === book || p.startsWith(`${book}/`))
  return sortBookPages(filtered)
}

/** Horo chapter order, then bond rank desc, then path asc. */
export function sortBookPages(paths: readonly string[]): readonly string[] {
  return [...paths].sort((a, b) => {
    const na = nodeOf(a)
    const nb = nodeOf(b)
    const ha = horoIndex(na?.horo ?? null)
    const hb = horoIndex(nb?.horo ?? null)
    if (ha !== hb) return ha - hb
    const ra = bondRankOf(a)
    const rb = bondRankOf(b)
    if (ra !== rb) return rb - ra
    return a.localeCompare(b)
  })
}

/** Page coordinate — matrix navigation; pass spread from matter layer when needed. */
export function pageOf(
  atomPath: string,
  spread: BookSpread = EMPTY_SPREAD,
): PageOfResult | undefined {
  const path = normalizePath(atomPath)
  if (!path || !nodeOf(path)) return undefined
  const book = bookKeyOf(path)
  const ordered = pagesInBook(book === CORPUS_BOOK ? CORPUS_BOOK : book)
  const idx = ordered.indexOf(path)
  if (idx < 0) return undefined
  const n = nodeOf(path)!
  const horoDigit = n.horo ?? null
  return {
    book: book === CORPUS_BOOK ? CORPUS_BOOK : book,
    chapter: chapterOf(horoDigit),
    pageNumber: idx + 1,
    pageCount: ordered.length,
    horoDigit,
    neighbors: neighborPathsOf(path),
    prev: idx > 0 ? ordered[idx - 1]! : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1]! : null,
    spread,
  }
}

export type { BookIndexMetrics, BookIndexHarmony } from './harmony-index'
export {
  indexVolumes,
  harmonyOfBookIndex,
  isHarmonicIndex,
  bookOfBooksIndexPivotLine,
} from './harmony-index'

/** Root pivot line — corpus library page count. */
export function corpusBookPivotLine(pageCount: number = UUID_MATRIX_NODES.length): string {
  return `corpus = library of interactive books; **${pageCount}** pages — computed count`
}

export {
  computeBookIndex,
  computeVolumeRow,
  bookIndexQuantumRows,
  renderBookIndexMarkdown,
  renderBookIndexDocument,
  pathExplain,
  type BookIndexModel,
  type BookVolumeRow,
  type BookIndexQuantumRow,
  type PathExplain,
} from './compute'

export { renderCorpusBookPivot, renderThisPageSection } from './render'
export { bookOf, interactiveBookNav, pageOfMatter, spreadOf, formatBookTerminal } from './matter'

