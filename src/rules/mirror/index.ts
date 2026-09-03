import ts from 'typescript'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

/**
 * rules/mirror — a proof that restates its own definition proves the assignment, not the claim.
 *
 * `export const atomPath = 'acceptance'` beside `expect(atomPath).toBe('acceptance')` is a test
 * that cannot fail for any reason a reader cares about. Change the constant and the test changes
 * with it; the only thing it forbids is a compiler that has stopped working.
 *
 * Found by looking behind a SIBLING repo's claim and then, correctly, at this one. That repo had a
 * kernel-checked theorem certifying that a `def` equal to `0` equals `0`, presented as a
 * measurement made three ways — the def, the theorem deciding the def, and seven propositions
 * carrying the def as a conjunct. Three readings of one hand-typed literal is not triangulation.
 * erpax had the same defect **507 times**, so the finding was never a peer's alone.
 *
 * THE DANGEROUS DIRECTION. A mirror is not a weak test, it is a test wearing the credibility of a
 * real one: it is green, it is fast, it sits in a complete trinity, and every gate this corpus runs
 * counts it as a proof. [[rules]]/refutable asks whether a claim CAN be contradicted; this asks the
 * sharper question — whether the thing standing next to it as evidence is evidence at all.
 *
 * @see ./SKILL.md
 */

export interface Mirror {
  readonly file: string
  readonly line: number
  readonly name: string
  /** The literal the module assigns, which the assertion repeats verbatim. */
  readonly value: string
  readonly text: string
}

const parse = (p: string): ts.SourceFile =>
  ts.createSourceFile(p, readFileSync(p, 'utf8'), ts.ScriptTarget.Latest, true)

const literalText = (n: ts.Node): string | null => {
  if (ts.isNumericLiteral(n) || ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.getText()
  if (n.kind === ts.SyntaxKind.TrueKeyword || n.kind === ts.SyntaxKind.FalseKeyword) return n.getText()
  if (ts.isPrefixUnaryExpression(n) && ts.isNumericLiteral(n.operand)) return n.getText()
  return null
}

/** Every `export const NAME = <literal>` a module declares — the values a human typed. */
export function literalConstants(file: string): Map<string, string> {
  const out = new Map<string, string>()
  let src: ts.SourceFile
  try {
    src = parse(file)
  } catch {
    return out
  }
  const visit = (n: ts.Node): void => {
    if (ts.isVariableStatement(n) && n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const d of n.declarationList.declarations) {
        if (!d.initializer || !ts.isIdentifier(d.name)) continue
        const init = ts.isAsExpression(d.initializer) ? d.initializer.expression : d.initializer
        const v = literalText(init)
        if (v !== null) out.set(d.name.text, v)
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out
}

const testFiles = (cwd: string): string[] => {
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'test.ts') out.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return out.sort()
}

/**
 * Every assertion comparing a constant to the literal its own sibling module assigns it.
 *
 * PARSED, never matched: the receiver must be the identifier itself (`expect(NAME)`), and the
 * expected value must be the SAME literal text. `expect(NAME.length).toBe(3)` is a real claim about
 * a real property and is not flagged; `expect(NAME).toBe(OTHER)` compares two things and is not
 * flagged either. Only the exact mirror counts.
 */
export function mirroredAssertions(cwd: string = process.cwd()): Mirror[] {
  const hits: Mirror[] = []
  for (const t of testFiles(cwd)) {
    const dir = dirname(t)
    const consts = new Map<string, string>()
    for (const sibling of ['index.ts', 'index.tsx']) {
      for (const [k, v] of literalConstants(join(dir, sibling))) consts.set(k, v)
    }
    if (consts.size === 0) continue
    let src: ts.SourceFile
    try {
      src = parse(t)
    } catch {
      continue
    }
    const visit = (n: ts.Node): void => {
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
        const matcher = n.expression.name.text
        if (matcher === 'toBe' || matcher === 'toEqual' || matcher === 'toStrictEqual') {
          const recv = n.expression.expression
          if (
            ts.isCallExpression(recv) &&
            ts.isIdentifier(recv.expression) &&
            recv.expression.text === 'expect' &&
            recv.arguments.length === 1
          ) {
            const subject = recv.arguments[0]
            const expected = n.arguments[0]
            if (subject && expected && ts.isIdentifier(subject) && consts.get(subject.text) === expected.getText()) {
              const { line } = src.getLineAndCharacterOfPosition(n.getStart())
              hits.push({
                file: relative(cwd, t),
                line: line + 1,
                name: subject.text,
                value: expected.getText(),
                text: n.getText().replace(/\s+/g, ' ').slice(0, 100),
              })
            }
          }
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(src)
  }
  return hits
}

/** Fails closed on getting worse. The ceiling ratchets DOWN as mirrors become real assertions. */
export function assertNoMirrors(cwd: string = process.cwd(), ceiling: number): void {
  const found = mirroredAssertions(cwd)
  if (found.length <= ceiling) return
  throw new Error(
    `✖ mirror — ${found.length} assertion(s) restate a literal their own module defines (ceiling ${ceiling}):\n` +
      found
        .slice(0, 20)
        .map((m) => `  ${m.file}:${m.line}  ${m.name} is declared ${m.value} and asserted ${m.value}`)
        .join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const found = mirroredAssertions()
  console.log(`mirror — ${found.length} assertion(s) restate a literal their own module defines`)
  for (const m of found.slice(0, 30)) console.log(`  ${m.file}:${m.line}  ${m.text}`)
  if (found.length > 30) console.log(`  … +${found.length - 30} more`)
}
