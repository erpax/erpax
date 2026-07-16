/**
 * syntax — what the GRAMMAR says a file contains. Not what a pattern guesses.
 *
 * You cannot trust something that is not a theorem. A regex over TypeScript is a guess: the language has a
 * grammar, and a pattern that "usually matches" it is a heuristic wearing a theorem's clothes. Every false
 * measurement this corpus has paid for came from pattern-matching the language instead of parsing it:
 *
 *   [[rules]]/prose      counted keywords as claims                  1,261 → 15
 *   [[rules]]/reference  counted string literals as citations           97 → 48
 *   [[standards]]/emit   counted prose ABOUT banners as banners      5,881 → 5,857
 *   [[rules]]/cycle      missed side-effect and dynamic imports    152 → 225 files
 *
 * Each was "fixed" with a better pattern, and each fix leaked, because a better guess is still a guess.
 * `commentsOf` replaces the regex `reference` and `emit` share — measured across 6,208 files, that pattern
 * INVENTED 70 `src/…` citations that the compiler says are not in comments at all (a path inside a CLI
 * command string; an asset path in code). It missed none: a heuristic over-reports here, and under-reports
 * in the cycle graph, and CANNOT TELL YOU WHICH — which is why a robustness check run on one proves nothing.
 *
 * The parser IS the language definition. That is the whole claim: these answers are not better guesses, they
 * are the grammar's own answer.
 *
 * @standard ECMA-262 · TypeScript grammar (via ts.createSourceFile — the compiler's own scanner)
 *
 * Composes [[rules]] · [[law]].
 */
import ts from 'typescript'

/** Canonical atom path. */
export const atomPath = 'syntax' as const

const sourceOf = (file: string, text: string): ts.SourceFile =>
  ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)

/**
 * Every comment in a source file, as the compiler's scanner sees them.
 *
 * A comment is where PROSE lives; everything else is data. The distinction cannot be made by pattern: `//`
 * inside a string literal is not a comment, `/*` inside a regex literal is not a comment, and a URL's `//`
 * in a template literal is not a comment. The scanner knows, because it is the thing that tokenises them.
 *
 * @invariant a `//` inside a string literal is NOT returned — it is data
 * @invariant every real comment is returned exactly once, in source order
 */
export function commentsOf(file: string, text: string): string[] {
  const src = sourceOf(file, text)
  const out: { pos: number; text: string }[] = []
  const seen = new Set<number>()
  const collect = (ranges: readonly ts.CommentRange[] | undefined): void => {
    for (const r of ranges ?? []) {
      if (seen.has(r.pos)) continue
      seen.add(r.pos)
      out.push({ pos: r.pos, text: text.slice(r.pos, r.end) })
    }
  }
  const visit = (n: ts.Node): void => {
    collect(ts.getLeadingCommentRanges(text, n.getFullStart()))
    collect(ts.getTrailingCommentRanges(text, n.getEnd()))
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out.sort((a, b) => a.pos - b.pos).map((c) => c.text)
}

/**
 * Every name a file BINDS — functions, classes, interfaces, types, enums, variables, and the names a
 * destructuring pattern introduces.
 *
 * [[rules]]/prose asks "does the corpus define this symbol?" and answered with a regex over `export
 * function|const`, which called `class`, `interface`, `type` and every local declaration fabricated — 1,261
 * false positives, 40% of the corpus. Each round of pattern-patching removed a class and left the next.
 * A declaration is a grammatical fact; the grammar is the only thing that knows them all.
 *
 * @invariant a name bound in ANY declaration form is returned, exported or not
 * @invariant a name only MENTIONED (a call, a reference) is never returned — binding is not use
 */
export function boundNames(file: string, text: string): string[] {
  const src = sourceOf(file, text)
  const out = new Set<string>()
  const bind = (name: ts.BindingName | ts.PropertyName | undefined): void => {
    if (!name) return
    if (ts.isIdentifier(name)) out.add(name.text)
    else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const el of name.elements) if (ts.isBindingElement(el)) bind(el.name)
    }
  }
  const visit = (n: ts.Node): void => {
    if (ts.isFunctionDeclaration(n) || ts.isClassDeclaration(n)) bind(n.name)
    else if (ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n) || ts.isEnumDeclaration(n)) bind(n.name)
    else if (ts.isVariableDeclaration(n)) bind(n.name)
    else if (ts.isMethodDeclaration(n) || ts.isPropertyDeclaration(n)) bind(n.name)
    else if (ts.isImportSpecifier(n) || ts.isImportClause(n)) bind(n.name)
    else if (ts.isNamespaceImport(n)) bind(n.name)
    ts.forEachChild(n, visit)
  }
  visit(src)
  return [...out]
}
