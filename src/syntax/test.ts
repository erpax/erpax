import { describe, it, expect } from 'vitest'
import { commentsOf, commentSites, lineColumnOf, boundNames, importSpecifiersOf, atomPath } from './index'

const f = 'x.ts'

describe('syntax — what the grammar says, not what a pattern guesses', () => {
  it('names its path', () => {
    expect(atomPath).toBe('syntax')
  })

  describe('commentsOf — a comment is where prose lives; everything else is data', () => {
    it('reads line and block comments, in order', () => {
      const cs = commentsOf(f, '// one\n/* two */\nexport const x = 1 // three')
      expect(cs).toEqual(['// one', '/* two */', '// three'])
    })

    // The whole reason this atom exists. The regex `reference` and `emit` share INVENTED 70 `src/…`
    // citations across the live tree — paths the compiler says are not in comments at all. It "fixed" the
    // same bug this morning (97 → 48) with a better pattern, and the better pattern still leaked.
    it('a // inside a STRING is not a comment — the pattern could not tell', () => {
      const cs = commentsOf(f, `export const cmd = 'bash src/x.sh // not a comment'\n// real`)
      expect(cs).toEqual(['// real'])
      expect(cs.join('\n')).not.toContain('src/x.sh')
    })

    it('a URL in a template literal is not a comment', () => {
      const cs = commentsOf(f, 'export const u = `https://erpax.dev/a`\n/* real */')
      expect(cs).toEqual(['/* real */'])
    })

    it('a /* inside a string is not a comment', () => {
      expect(commentsOf(f, `export const g = '/**/ src/fake.ts'`)).toEqual([])
    })

    it('a file with no comments yields nothing', () => {
      expect(commentsOf(f, 'export const x = 1')).toEqual([])
    })
  })

  describe('boundNames — a declaration is a grammatical fact', () => {
    // rules/prose answered this with /export (function|const)/ and called class, interface, type and every
    // local declaration fabricated: 1,261 false positives, 40% of the corpus. Each patch removed one class
    // and left the next. The grammar knows them all at once.
    it('sees every declaration form, exported or not', () => {
      const names = boundNames(
        f,
        [
          'export function a() {}',
          'const b = 1',
          'class C {}',
          'interface D { x: number }',
          'type E = 1',
          'enum F { G }',
          'function h() {}',
        ].join('\n'),
      )
      for (const n of ['a', 'b', 'C', 'D', 'E', 'F', 'h']) expect(names).toContain(n)
    })

    it('sees names a destructuring pattern binds', () => {
      const names = boundNames(f, 'const { p, q: r } = o\nconst [s] = arr')
      for (const n of ['p', 'r', 's']) expect(names).toContain(n)
    })

    it('binding is not use — a name only CALLED is not bound here', () => {
      const names = boundNames(f, 'export const a = () => somethingElsewhere()')
      expect(names).toContain('a')
      expect(names).not.toContain('somethingElsewhere')
    })

    it('sees class members and imported names', () => {
      const names = boundNames(f, "import { imported } from '@/x'\nclass K { m() {} p = 1 }")
      for (const n of ['imported', 'K', 'm', 'p']) expect(names).toContain(n)
    })
  })
})

// commentSites keeps the byte offset commentsOf discards — the raw material for an exact line:column, so an
// agent jumps to the surgical edit instead of searching for it (the leftover atom's waves).
describe('commentSites + lineColumnOf — the exact address of prose', () => {
  it('commentSites returns each comment with its byte offset, in source order', () => {
    const text = 'const a = 1\n/** @invariant x */\nexport const b = 2'
    const sites = commentSites('f.ts', text)
    expect(sites).toHaveLength(1)
    expect(sites[0]!.text).toContain('@invariant')
    expect(sites[0]!.pos).toBe(text.indexOf('/**')) // the real offset, not a guess
  })

  it('a // inside a string is data — commentSites does not return it (same grammar as commentsOf)', () => {
    const text = 'const s = "http://not-a-comment"\n// real one'
    const sites = commentSites('f.ts', text)
    expect(sites).toHaveLength(1)
    expect(sites[0]!.text).toBe('// real one')
    expect(commentSites('f.ts', text).map((c) => c.text)).toEqual(commentsOf('f.ts', text)) // one grammar
  })

  it('lineColumnOf is 1-indexed — offset 0 is line 1, column 1', () => {
    expect(lineColumnOf('abc', 0)).toEqual({ line: 1, column: 1 })
    expect(lineColumnOf('abc', 2)).toEqual({ line: 1, column: 3 })
  })

  it('a newline opens the next line and resets the column', () => {
    const text = 'line1\nline2\n  line3'
    expect(lineColumnOf(text, text.indexOf('line2'))).toEqual({ line: 2, column: 1 })
    expect(lineColumnOf(text, text.indexOf('line3'))).toEqual({ line: 3, column: 3 }) // two-space indent
  })

  it('composes — the exact line:column of a claim marker inside a comment', () => {
    const text = 'export const a = 1\n\n/**\n * @invariant debits === credits\n */\nexport const b = 2'
    const site = commentSites('f.ts', text)[0]!
    const markerOffset = site.pos + site.text.indexOf('@invariant')
    expect(lineColumnOf(text, markerOffset)).toEqual({ line: 4, column: 4 }) // ` * @invariant` — col 4
  })

  describe('importSpecifiersOf — an import is a grammatical fact; a string is data', () => {
    it('reads import-from, export-from and dynamic import specifiers', () => {
      const text = "import { a } from '@/a'\nexport * from '@/b'\nconst p = import('@/c')"
      expect(importSpecifiersOf(f, text)).toEqual(['@/a', '@/b', '@/c'])
    })

    it('a specifier written INSIDE a string or template is never an import — the phantom class', () => {
      // The tamper/import regex counted these as imports and reported 38 phantoms over a sealed
      // baseline of 0: a codegen template writing `from '@/…'`, a fixture naming one.
      const text = 'const tpl = `export * from \'@/${pair}\'`\nconst fixture = "import { x } from \'@/a\'"\n// from \'@/comment\'\n'
      expect(importSpecifiersOf(f, text)).toEqual([])
    })

    it('type-only imports ARE returned — erased at runtime, they still couple source to a path', () => {
      const text = "import type { T } from '@/deep/file'\nimport { type U } from '@/other'"
      expect(importSpecifiersOf(f, text)).toEqual(['@/deep/file', '@/other'])
    })
  })
})
