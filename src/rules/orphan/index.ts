/**
 * rules/orphan — what a purge leaves behind, cut by the tree instead of by hand.
 *
 * Removing a dead export orphans what it used: the imports it named and the local declarations it
 * read. `tsc` does not object (they are still well-typed) and the unit lanes do not object (nothing
 * imports them) — only the zero-warning lint lane does, and it does so 115 times at once.
 *
 * THE CRACK THIS CLOSES. The first version of this cleaner lived in a scratch directory and ran by
 * hand, so every cascade needed a human: cut imports, watch declarations orphan, cut declarations,
 * watch THEIR imports orphan. Three rounds, then five files patched one at a time. A cleanup that
 * needs a person is a cleanup that will not happen on the push that needs it.
 *
 * THE BUG THAT BIT, pinned in test.ts: splicing dead specifiers out of an import clause BY OFFSET
 * leaves a stray comma when two adjacent ones are cut together — `{ a, , c }` — which is a PARSE
 * error, not a warning. The clause is therefore REWRITTEN from the specifiers that survive, never
 * spliced.
 *
 * REFUSALS ARE THE POINT. A declaration whose initializer is a CALL may do something when it runs;
 * deleting it is a behaviour change, not a cleanup. Those are named and left for a human.
 */
import ts from 'typescript'

export const atomPath = 'rules/orphan' as const

/** One symbol a linter says nothing uses. */
export interface Orphan {
  readonly file: string
  readonly name: string
}

/** ESLint's JSON report, narrowed to what this atom reads. */
export interface LintReport {
  readonly filePath: string
  readonly messages: readonly { readonly ruleId: string | null; readonly message: string }[]
}

const UNUSED = /^'([A-Za-z_$][\w$]*)' is (?:defined but never used|assigned a value but never used)/

/**
 * Read the orphans out of a lint report. The LINTER decides what is unused — its scope analysis is
 * the authority, and a regex over source would be the guess this corpus keeps paying for.
 */
export function orphansFrom(report: readonly LintReport[]): Orphan[] {
  const out: Orphan[] = []
  for (const f of report) {
    for (const m of f.messages) {
      if (m.ruleId !== '@typescript-eslint/no-unused-vars') continue
      const name = UNUSED.exec(m.message)?.[1]
      if (name) out.push({ file: f.filePath, name })
    }
  }
  return out
}

/**
 * Cut dead specifiers from every import clause, by REWRITING the clause from its survivors.
 * An import whose specifiers all die goes entirely — unless it carries a default, which survives.
 */
export function cutUnusedImports(text: string, names: ReadonlySet<string>): string {
  const src = ts.createSourceFile('x.tsx', text, ts.ScriptTarget.ESNext, true)
  const edits: { start: number; end: number; with: string }[] = []
  for (const st of src.statements) {
    if (!ts.isImportDeclaration(st) || !st.importClause) continue
    const nb = st.importClause.namedBindings
    if (!nb || !ts.isNamedImports(nb)) continue
    const kept = nb.elements.filter((e) => !names.has(e.name.text))
    if (kept.length === nb.elements.length) continue
    if (kept.length === 0 && !st.importClause.name) {
      edits.push({ start: st.getFullStart(), end: st.getEnd(), with: '' })
      continue
    }
    // Rewritten, never spliced: two adjacent cuts would otherwise leave `{ a, , c }`.
    edits.push({ start: nb.getStart(src), end: nb.getEnd(), with: `{ ${kept.map((k) => k.getText(src)).join(', ')} }` })
  }
  let out = text
  for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.with + out.slice(e.end)
  return out
}

/** A value that cannot DO anything when it is constructed. A call might, so a call is refused. */
export function isInert(init: ts.Expression | undefined): boolean {
  if (init === undefined) return true
  if (ts.isAsExpression(init) || ts.isParenthesizedExpression(init)) return isInert(init.expression)
  return (
    ts.isStringLiteral(init) ||
    ts.isNumericLiteral(init) ||
    ts.isRegularExpressionLiteral(init) ||
    ts.isArrayLiteralExpression(init) ||
    ts.isObjectLiteralExpression(init) ||
    ts.isArrowFunction(init) ||
    ts.isFunctionExpression(init) ||
    init.kind === ts.SyntaxKind.TrueKeyword ||
    init.kind === ts.SyntaxKind.FalseKeyword ||
    init.kind === ts.SyntaxKind.NullKeyword
  )
}

export interface DeclarationCut {
  readonly text: string
  /** Named, never cut: a human decides whether a side-effecting declaration may go. */
  readonly refused: readonly string[]
}

/** Cut orphaned type aliases, interfaces, functions and INERT constants. Refuse the rest. */
export function cutInertDeclarations(text: string, names: ReadonlySet<string>): DeclarationCut {
  const src = ts.createSourceFile('x.tsx', text, ts.ScriptTarget.ESNext, true)
  const spans: { start: number; end: number }[] = []
  const refused: string[] = []
  const exported = (n: ts.Node): boolean =>
    ts.canHaveModifiers(n) && !!ts.getModifiers(n)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  for (const st of src.statements) {
    if (exported(st)) continue // an exported symbol is a FACE; rules/unfolded decides those, not this
    if ((ts.isTypeAliasDeclaration(st) || ts.isInterfaceDeclaration(st) || ts.isFunctionDeclaration(st)) && st.name && names.has(st.name.text)) {
      spans.push({ start: st.getFullStart(), end: st.getEnd() })
      continue
    }
    if (ts.isVariableStatement(st) && st.declarationList.declarations.length === 1) {
      const d = st.declarationList.declarations[0]!
      if (ts.isIdentifier(d.name) && names.has(d.name.text)) {
        if (isInert(d.initializer)) spans.push({ start: st.getFullStart(), end: st.getEnd() })
        else refused.push(`${d.name.text} — its initializer is a call, so removing it changes behaviour`)
      }
    }
  }
  let out = text
  for (const s of spans.sort((a, b) => b.start - a.start)) out = out.slice(0, s.start) + out.slice(s.end)
  return { text: out, refused }
}

/** Does anything remain that makes this text a MODULE? A file with no statement is not one. */
export function stillAModule(text: string): boolean {
  const src = ts.createSourceFile('x.tsx', text, ts.ScriptTarget.ESNext, true)
  return src.statements.length > 0
}

/**
 * One sweep over one file: imports first, then the declarations that sweep orphaned.
 *
 * AND THE GUARD THE MASS TAUGHT. A sweep that removes every statement leaves an EMPTY file, and an
 * empty file is not a module: `export * from './x'` against it fails with "is not a module", which
 * no lint rule reports and no unit test reaches. Fourteen files reached that state in one run.
 * A file swept to nothing is not a cleanup — it is a DELETION, and a deletion is a decision about
 * capability that belongs to a human. So the sweep refuses it and says which file.
 */
export function sweepFile(text: string, names: ReadonlySet<string>): DeclarationCut {
  const afterImports = cutUnusedImports(text, names)
  const cut = cutInertDeclarations(afterImports, names)
  if (!stillAModule(cut.text) && stillAModule(text)) {
    return { text, refused: [...cut.refused, 'the sweep would empty this file — an empty file is not a module; delete it deliberately or keep it'] }
  }
  return cut
}


// ─── The runner ───────────────────────────────────────────────────────────────
// `erpax rules orphans` reports; `--fix` sweeps to a FIXPOINT. The fixpoint is the point: cutting
// imports orphans declarations, cutting declarations orphans their imports, and a single pass
// leaves the next cascade for whoever pushes.

if (import.meta.url === `file://${process.argv[1]}`) {
  const { execSync } = await import('node:child_process')
  const { readFileSync, writeFileSync } = await import('node:fs')
  const fix = process.argv.includes('--fix')
  const cwd = process.cwd()

  const lint = (): LintReport[] => {
    const raw = execSync('./node_modules/.bin/eslint src --format json --no-warn-ignored 2>/dev/null || true', {
      cwd, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024,
    })
    const at = raw.indexOf('[')
    return at < 0 ? [] : (JSON.parse(raw.slice(at)) as LintReport[])
  }

  let round = 0
  let cutTotal = 0
  const refusedAll: string[] = []
  for (;;) {
    const orphans = orphansFrom(lint())
    if (orphans.length === 0) break
    if (!fix) {
      console.log(`rules/orphan — ${orphans.length} orphaned symbol(s); run with --fix`)
      for (const o of orphans.slice(0, 20)) console.log(`  ${o.file.replace(`${cwd}/`, '')}  ${o.name}`)
      process.exit(1)
    }
    const byFile = new Map<string, Set<string>>()
    for (const o of orphans) byFile.set(o.file, (byFile.get(o.file) ?? new Set()).add(o.name))
    let changed = 0
    for (const [file, names] of byFile) {
      const before = readFileSync(file, 'utf8')
      const { text, refused } = sweepFile(before, names)
      refusedAll.push(...refused.map((r) => `${file.replace(`${cwd}/`, '')}: ${r}`))
      if (text !== before) {
        writeFileSync(file, text)
        changed++
        cutTotal++
      }
    }
    round += 1
    // No file moved this round, so the rest is refusals — iterating again would spin forever.
    if (changed === 0) break
    if (round > 10) break
  }
  console.log(
    `rules/orphan — ${fix ? `swept ${cutTotal} file-edit(s) over ${round} round(s)` : 'clean'}` +
      (refusedAll.length ? ` · REFUSED ${refusedAll.length} (a human reads these)` : ''),
  )
  for (const r of [...new Set(refusedAll)].slice(0, 10)) console.log(`  refused ${r}`)
}
