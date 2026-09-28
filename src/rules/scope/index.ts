/**
 * rules/scope — a whole-tree scan an author must WAIT for needs a changeset twin.
 *
 * @standard ISO/IEC 25010:2023 §5.5 — analysability: a measurement must be affordable where it is read
 * @standard ISO 19011:2018 §6.4 — audit evidence: a finding must name the files it rests on
 */
import ts from 'typescript'
import { readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { astOf, textOf } from '@/syntax/cache'

/** One exported scan, and the address its first parameter takes. */
export interface ScanShape {
  readonly law: string
  readonly file: string
  readonly name: string
  /** `tree` reads a whole corpus from `cwd`; `changeset` reads the `files` it is handed. */
  readonly shape: 'tree' | 'changeset'
}

/** A law that can only answer about the whole tree — so an author pays the whole tree per edit. */
export interface UnscopedLaw {
  readonly law: string
  readonly file: string
  /** the tree scans it exposes */
  readonly trees: readonly string[]
}

/**
 * The first parameter's name, PARSED.
 *
 * [[rules]]/domain answers the same question with `/export\s+function\s+\w+\s*\(\s*cwd/` over source,
 * and a regex over a language is a guess: it cannot see a destructured parameter, a type-only overload,
 * or a declaration wrapped across lines. The grammar can.
 */
const firstParamName = (fn: ts.FunctionDeclaration | ts.VariableDeclaration): string | null => {
  const params = ts.isFunctionDeclaration(fn)
    ? fn.parameters
    : fn.initializer !== undefined && (ts.isArrowFunction(fn.initializer) || ts.isFunctionExpression(fn.initializer))
      ? fn.initializer.parameters
      : undefined
  const p = params?.[0]
  return p !== undefined && ts.isIdentifier(p.name) ? p.name.text : null
}

/** Every exported scan in a module, with the address it reads. */
export function scanShapes(file: string, cwd: string = process.cwd()): ScanShape[] {
  const out: ScanShape[] = []
  let text: string
  try {
    text = textOf(file)
  } catch {
    return out
  }
  const rel = relative(cwd, file).replace(/\\/g, '/')
  const law = rel.replace(/^src\//, '').replace(/\/index\.tsx?$/, '')
  const src = astOf(file, text)
  for (const st of src.statements) {
    const exported = ts.canHaveModifiers(st)
      ? (ts.getModifiers(st) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      : false
    if (!exported) continue
    const decls: Array<{ name: string; node: ts.FunctionDeclaration | ts.VariableDeclaration }> = []
    if (ts.isFunctionDeclaration(st) && st.name !== undefined) decls.push({ name: st.name.text, node: st })
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) decls.push({ name: d.name.text, node: d })
      }
    }
    for (const { name, node } of decls) {
      const first = firstParamName(node)
      // An assertion is not a reader — it throws, and its cost is its scan's, already counted.
      if (name.startsWith('assert')) continue
      if (first === 'cwd') out.push({ law, file: rel, name, shape: 'tree' })
      if (first === 'files') out.push({ law, file: rel, name, shape: 'changeset' })
    }
  }
  return out
}

/** Every law under `src/rules`, by its barrel. */
const lawModules = (cwd: string): string[] => {
  const dir = join(cwd, 'src', 'rules')
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const out: string[] = []
  for (const e of entries) {
    for (const spelling of ['index.ts', 'index.tsx']) {
      const p = join(dir, e, spelling)
      if (existsSync(p)) out.push(p)
    }
  }
  return out
}

/**
 * Laws that expose a tree scan and NO changeset twin.
 *
 * Every slow cycle in the session that produced this atom had one shape: the whole corpus measured to
 * answer a question about a changeset. `matrix-crack` was the worst — 1823 ms of whole-tree parse per
 * ask, run only at the push, so telling MY new violation from the 451 files that already had one meant
 * checking HEAD out into a worktree and diffing populations. By hand. Three times.
 *
 * The cure is not a faster scan, it is a scan that can be ASKED about a changeset: `matrixCracksIn(files)`
 * costs 2 ms and gives the whole-tree answer for those files (746 = 746, proven both directions). A law
 * with a tree scan and no such twin can only ever be a push-lane gate, and a push-lane gate is one an
 * author meets after the mistake instead of while making it.
 *
 * CANDIDATES, never a purge list: several laws are genuinely whole-corpus questions — `rules/cycle` asks
 * which files are mutually reachable and there is no changeset answer to that, because adding one import
 * can change the answer for files the changeset never touched. Naming them is the point; deciding is a
 * human's.
 */
export function unscopedLaws(cwd: string = process.cwd()): UnscopedLaw[] {
  const out: UnscopedLaw[] = []
  for (const file of lawModules(cwd)) {
    const shapes = scanShapes(file, cwd)
    if (shapes.length === 0) continue
    if (shapes.some((s) => s.shape === 'changeset')) continue
    const trees = shapes.filter((s) => s.shape === 'tree').map((s) => s.name)
    if (trees.length === 0) continue
    out.push({ law: shapes[0]!.law, file: shapes[0]!.file, trees })
  }
  return out.sort((a, b) => b.trees.length - a.trees.length || a.law.localeCompare(b.law))
}

/** Ratchets: the number of laws answerable only about the whole tree may not grow. */
export function assertScopesShrink(cwd: string = process.cwd(), ceiling: number): void {
  const un = unscopedLaws(cwd)
  if (un.length <= ceiling) return
  const named = un.slice(0, 5).map((u) => `${u.law} (${u.trees.join(', ')})`)
  throw new Error(
    `✖ scope — ${un.length} law(s) answer only about the whole tree, ceiling ${ceiling}: ${named.join(' · ')}`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const un = unscopedLaws()
  console.log(`scope — ${un.length} law(s) with a tree scan and no changeset twin`)
  for (const u of un.slice(0, 20)) console.log(`  ${u.law.padEnd(24)} ${u.trees.join(', ')}`)
}
