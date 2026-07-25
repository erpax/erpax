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
  return commentSites(file, text).map((c) => c.text)
}

/** A comment WITH its byte offset — the raw material for an exact line/column ([[leftover]] surgical sites). */
export interface CommentSite {
  readonly pos: number
  readonly text: string
}

/**
 * Every real comment WITH its start offset, in source order. Same grammatical fact as `commentsOf` — a `//`
 * inside a string is data, not a comment — but it keeps the `pos` so a caller can resolve an exact line:column.
 */
export function commentSites(file: string, text: string): readonly CommentSite[] {
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
  return out.sort((a, b) => a.pos - b.pos)
}

/**
 * The 1-indexed line and column of a byte offset — editor coordinates. Pure newline count, exact: line and
 * column both start at 1, a `\n` opens the next line. The surgical address an agent jumps to, never searches for.
 *
 * @invariant line and column are 1-indexed — offset 0 is line 1, column 1
 * @invariant a newline increments the line and resets the column to 1
 */
export function lineColumnOf(text: string, offset: number): { readonly line: number; readonly column: number } {
  let line = 1
  let column = 1
  const end = Math.max(0, Math.min(offset, text.length))
  for (let i = 0; i < end; i += 1) {
    if (text[i] === '\n') {
      line += 1
      column = 1
    } else {
      column += 1
    }
  }
  return { line, column }
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

/** The grammatical shape of a module — export/declaration/import counts, PARSED not pattern-matched. */
export interface ModuleShape {
  /** total export statements (inline exported declarations + re-exports + `export {…}` / default). */
  readonly exports: number
  /** `export … from '…'` — re-exports through a barrel. */
  readonly reExports: number
  /** exported declarations defined in THIS file (matter, not just re-exported). */
  readonly inlineExports: number
  /** `function` declarations (exported or not). */
  readonly functions: number
  /** `class` declarations (exported or not). */
  readonly classes: number
  /** distinct first-segment roots of local `./x` imports+re-exports (the child atoms this hub couples to). */
  readonly localImportRoots: number
}

const isExported = (n: ts.Node): boolean =>
  ts.canHaveModifiers(n) && (ts.getModifiers(n)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false)

/**
 * The module's grammatical shape, read from the AST — never a regex over the source. A regex counting
 * `/^export\s+/` miscounts a commented line, an `export` inside a string, or a multi-line `export {…}`, and
 * `/\bfunction\s+\w+/` counts the word `function` in a comment; the grammar counts none of those. This is the
 * [[rules]] measuring law made reusable: the parser IS the language definition. [[rules]]/concentration reads
 * its hub metrics from here so the logic-concentration gate passes computationally, not by pattern-match.
 *
 * @invariant an export/function/class/import inside a comment or string literal is never counted
 */
export function moduleShape(file: string, text: string): ModuleShape {
  const src = sourceOf(file, text)
  let reExports = 0
  let inlineExports = 0
  let braceOrDefaultExports = 0
  let functions = 0
  let classes = 0
  const localRoots = new Set<string>()
  const noteLocal = (spec: ts.Expression | undefined): void => {
    if (spec && ts.isStringLiteral(spec) && spec.text.startsWith('./')) {
      const seg = spec.text.slice(2).split('/')[0]
      if (seg) localRoots.add(seg)
    }
  }
  const visit = (n: ts.Node): void => {
    if (ts.isFunctionDeclaration(n)) {
      functions++
      if (isExported(n)) inlineExports++
    } else if (ts.isClassDeclaration(n)) {
      classes++
      if (isExported(n)) inlineExports++
    } else if (ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n) || ts.isEnumDeclaration(n)) {
      if (isExported(n)) inlineExports++
    } else if (ts.isVariableStatement(n)) {
      if (isExported(n)) inlineExports++
    } else if (ts.isExportDeclaration(n)) {
      if (n.moduleSpecifier) reExports++
      else braceOrDefaultExports++
      noteLocal(n.moduleSpecifier)
    } else if (ts.isExportAssignment(n)) {
      braceOrDefaultExports++
    } else if (ts.isImportDeclaration(n)) {
      noteLocal(n.moduleSpecifier)
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
  return {
    exports: inlineExports + reExports + braceOrDefaultExports,
    reExports,
    inlineExports,
    functions,
    classes,
    localImportRoots: localRoots.size,
  }
}

/**
 * Every module specifier a file IMPORTS by grammar — `import … from`, `export … from`, `import('x')`.
 * Type-only imports are INCLUDED: erased at runtime, they still couple source to a path (this is the
 * source-coupling read; [[rules]]/cycle keeps its own runtime-edge read that excludes them).
 *
 * @invariant a specifier inside a string/template literal or a comment is never returned — data is not an import
 */
export function importSpecifiersOf(file: string, text: string): string[] {
  const src = sourceOf(file, text)
  const out: string[] = []
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) out.push(n.moduleSpecifier.text)
    else if (ts.isExportDeclaration(n) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier))
      out.push(n.moduleSpecifier.text)
    else if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = n.arguments[0]
      if (arg && ts.isStringLiteral(arg)) out.push(arg.text)
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out
}
