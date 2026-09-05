import { describe, it, expect } from 'vitest'
import { formatAuthors } from './index'

const authors = (...names: string[]) => names.map((name) => ({ name })) as never

describe('format/author — the grammar of a list of people', () => {
  it('renders one, two and three the way a reader expects', () => {
    expect(formatAuthors(authors('Ada'))).toBe('Ada')
    expect(formatAuthors(authors('Ada', 'Bo'))).toBe('Ada and Bo')
    expect(formatAuthors(authors('Ada', 'Bo', 'Cy'))).toBe('Ada, Bo and Cy')
  })

  it('uses no serial comma — the SKILL beside this file says so, and this is why it can', () => {
    expect(formatAuthors(authors('Ada', 'Bo', 'Cy'))).not.toContain('Bo, and')
  })

  it('an author with no name is dropped, never rendered as a gap', () => {
    expect(formatAuthors(authors('Ada', '', 'Cy'))).toBe('Ada and Cy')
    expect(formatAuthors(authors())).toBe('')
    expect(formatAuthors(authors('', ''))).toBe('')
  })
})
