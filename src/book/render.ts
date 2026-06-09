/**
 * book/render — README faces for interactive page navigation (coordinate ad9a8ffa).
 */
import { pageOf, corpusBookPivotLine, bookOfBooksIndexPivotLine } from './index'
import type { FolderReadmeModel } from '@/readme/compute'

/** `## this page` block for folder README faces — all derived. */
export function renderThisPageSection(model: FolderReadmeModel): string {
  const spread = { debit: model.statement.totalDebits, credit: model.statement.totalCredits }
  const page = pageOf(model.atomPath, spread)
  if (!page) {
    return ['## this page', '', '- unknown page — not in matrix', ''].join('\n')
  }
  const bookLink = page.book === 'corpus' ? '[[corpus]]' : `[[${page.book}]]`
  const prevLink = page.prev ? `[[${page.prev}]]` : '—'
  const nextLink = page.next ? `[[${page.next}]]` : '—'
  const chapterLine = page.chapter ? ` · chapter \`${page.chapter}\`` : ''
  return [
    '## this page',
    '',
    `- book ${bookLink}${chapterLine} · page **${page.pageNumber}** of **${page.pageCount}**`,
    `- spread debit \`${page.spread.debit}\` · credit \`${page.spread.credit}\` · horo \`${page.horoDigit ?? '—'}\``,
    `- ${prevLink} · ${nextLink}`,
    '',
  ].join('\n')
}

/** Root README pivot — library of interactive books + book-of-books index harmony. */
export function renderCorpusBookPivot(pageCount: number, cwd: string = process.cwd()): string {
  return [
    '### interactive books',
    '',
    corpusBookPivotLine(pageCount),
    bookOfBooksIndexPivotLine(cwd),
    '',
  ].join('\n')
}
