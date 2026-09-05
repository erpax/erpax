import ts from 'typescript'
import { join, relative } from 'node:path'
import { astOf, corpusFiles, textOf } from '@/syntax/cache'

/**
 * rules/probe — a test for a file by NAME must name every spelling that file has.
 *
 * `existsSync(join(dir, 'index.ts'))` answers "does this atom have code". For a React atom the
 * answer is yes and the probe says no, because the barrel is `index.tsx` — JSX does not parse from
 * a `.ts` file, so it cannot be spelled otherwise.
 *
 * Four gates carried this in one session, and each was found by hand, separately.
 *
 * @see ./SKILL.md
 */

export interface BlindProbe {
  readonly file: string
  readonly line: number
  /** The name it tests for. */
  readonly name: string
  /** The spelling it never mentions. */
  readonly missing: string
  readonly text: string
}

/** Trinity members with a second lawful spelling, and what that spelling is. */
const TWINNED: ReadonlyMap<string, string> = new Map([
  ['index.ts', 'index.tsx'],
  ['test.ts', 'test.tsx'],
])

/** Shared with every other gate in the run — same bytes, same parse ([[syntax]]/cache). */
const parse = (p: string): ts.SourceFile => astOf(p)

/**
 * Population unchanged: `.tsx?`, no `.d.ts`, no generated FACE.
 *
 * The exclusion tests the basename, not the path — filtering the whole path drops any file living
 * under a directory named `generated`, which moved this gate's count by one the first time it was
 * written that way. A population changed while optimising is an optimisation that lied.
 */
const sourceFiles = (cwd: string): string[] =>
  corpusFiles(cwd, 'source')
    .filter((f) => !/generated/.test(f.slice(f.lastIndexOf('/') + 1)))
    .slice()

/**
 * A PROBE: an existence or membership test on a filename, as opposed to a name being written,
 * logged or passed along.
 *
 * `writeFileSync(join(d, 'index.ts'), …)` creates a file and is correct to name one spelling. Only a
 * question about what is already there can be blind to the answer.
 */
const isProbe = (lit: ts.StringLiteral): boolean => {
  const p = lit.parent
  if (ts.isCallExpression(p) && ts.isPropertyAccessExpression(p.expression)) {
    const m = p.expression.name.text
    if (m === 'has' || m === 'includes') return true
  }
  if (ts.isCallExpression(p) && ts.isIdentifier(p.expression)) {
    if (/^(existsSync|statSync|lstatSync)$/.test(p.expression.text)) return true
    if (p.expression.text === 'join') {
      const outer = p.parent
      if (ts.isCallExpression(outer) && ts.isIdentifier(outer.expression))
        return /^(existsSync|statSync|lstatSync)$/.test(outer.expression.text)
    }
  }
  if (ts.isBinaryExpression(p) && p.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) return true
  return false
}

/**
 * The text of the function containing a probe — the scope in which naming the twin counts.
 *
 * Falls back to the whole file when a probe sits at module level, because there the file IS the
 * enclosing scope.
 */
function enclosingText(node: ts.Node, fileText: string): string {
  for (let n: ts.Node | undefined = node; n; n = n.parent) {
    if (
      ts.isFunctionDeclaration(n) ||
      ts.isFunctionExpression(n) ||
      ts.isArrowFunction(n) ||
      ts.isMethodDeclaration(n)
    ) {
      return n.getText()
    }
  }
  return fileText
}

/** Every probe for a twinned filename whose enclosing function never mentions the twin. */
export function blindProbes(cwd: string = process.cwd()): BlindProbe[] {
  const hits: BlindProbe[] = []
  for (const f of sourceFiles(cwd)) {
    const text = textOf(f)
    if (![...TWINNED.keys()].some((n) => text.includes(n))) continue
    let src: ts.SourceFile
    try {
      src = parse(f)
    } catch {
      continue
    }
    const lines = text.split('\n')
    const visit = (n: ts.Node): void => {
      if (ts.isStringLiteral(n)) {
        const twin = TWINNED.get(n.text)
        // The exemption is the ENCLOSING FUNCTION, not the file.
        //
        // File-level was the original rule, justified as "a file naming the twin anywhere has
        // considered it". REFUTED, with a cost: `readme/compute.ts` mentions `test.tsx` twice
        // AND contained `existsSync(join(dir, 'test.ts'))`, so its proof leg was blind while its
        // code leg was not. Every atom with index.tsx + test.tsx was recorded as having code and
        // no proof and booked a liability it did not owe — 31 statement gaps, pardoned by this
        // gate because the file said the right word somewhere else.
        //
        // One function is still one edit, so the fix stays proportional; it just cannot be
        // earned by a mention in an unrelated part of the same file.
        if (twin && !enclosingText(n, text).includes(twin) && isProbe(n)) {
          const { line } = src.getLineAndCharacterOfPosition(n.getStart())
          hits.push({
            file: relative(cwd, f),
            line: line + 1,
            name: n.text,
            missing: twin,
            text: (lines[line] ?? '').trim().slice(0, 100),
          })
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(src)
  }
  return hits
}

/** Fails closed on getting worse. The ceiling ratchets DOWN as each probe learns the second name. */
export function assertNoBlindProbes(cwd: string = process.cwd(), ceiling: number): void {
  const found = blindProbes(cwd)
  if (found.length <= ceiling) return
  throw new Error(
    `✖ probe — ${found.length} test(s) for a filename never name its twin (ceiling ${ceiling}):\n` +
      found.slice(0, 20).map((h) => `  ${h.file}:${h.line} asks for ${h.name}, never ${h.missing}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const found = blindProbes()
  const byFile = new Map<string, number>()
  for (const h of found) byFile.set(h.file, (byFile.get(h.file) ?? 0) + 1)
  console.log(`probe — ${found.length} blind probe(s) across ${byFile.size} file(s)`)
  for (const [f, n] of [...byFile].sort((a, b) => b[1] - a[1]).slice(0, 15)) console.log(`  ${String(n).padStart(3)}  ${f}`)
}
