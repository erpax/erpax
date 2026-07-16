import { describe, it, expect } from 'vitest'
import { commentsOf, boundNames, atomPath } from './index'

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
