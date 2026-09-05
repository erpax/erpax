import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'

/**
 * rules/alt — WCAG 2.2 §1.1.1: non-text content carries a text alternative, or says it is decorative.
 *
 * @see ./SKILL.md
 */

/**
 * Elements that render non-text content. DECLARED, because this is a fact about THIS codebase's
 * component vocabulary and no theorem derives it.
 *
 * A raw-JSX-only reader finds 1 `<img>` and 1 `<svg>` in 256 files and reports near-perfect
 * conformance — the corpus renders through `next/image` and its own Media components. A gate
 * whose domain is narrower than the population reports green over all of it ([[rules]]/domain).
 */
const NON_TEXT = new Set(['img', 'svg', 'Image', 'NextImage', 'Media', 'ImageMedia', 'VideoMedia', 'Avatar', 'Logo', 'Icon'])

/** Any of these gives the element an accessible name, or declares it decorative. */
const NAMES = new Set(['alt', 'aria-label', 'aria-labelledby', 'aria-hidden', 'role', 'title'])

export interface UnnamedElement {
  readonly file: string
  readonly line: number
  readonly element: string
}

const sources = (cwd: string): string[] => {
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
      else if (e.name.endsWith('.tsx')) out.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/**
 * Non-text elements rendered with no accessible name and no decorative declaration.
 *
 * A spread (`{...props}`) is trusted: the name may arrive through it, and flagging that would
 * make the gate noise. That is a stated limit, not an oversight.
 */
export function unnamedNonText(cwd: string = process.cwd()): UnnamedElement[] {
  const out: UnnamedElement[] = []
  for (const file of sources(cwd)) {
    const text = readFileSync(file, 'utf8')
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const visit = (node: ts.Node): void => {
      if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
        const tag = node.tagName.getText()
        if (NON_TEXT.has(tag)) {
          const attrs = node.attributes.properties
          const named = attrs.some((a) => ts.isJsxAttribute(a) && NAMES.has(a.name.getText()))
          const spread = attrs.some((a) => ts.isJsxSpreadAttribute(a))
          if (!named && !spread) {
            out.push({
              file: relative(cwd, file),
              line: sf.getLineAndCharacterOfPosition(node.getStart()).line + 1,
              element: tag,
            })
          }
        }
      }
      node.forEachChild(visit)
    }
    visit(sf)
  }
  return out
}

export interface EmptyNameFallback {
  readonly file: string
  readonly line: number
  readonly text: string
}

/**
 * An accessible name DERIVED with an empty-string fallback.
 *
 * This is the sharper half, and it is invisible at every call site. `alt=""` is valid WCAG — it
 * declares an image DECORATIVE, which a screen reader then skips entirely. So a component that
 * computes `alt = fromCms || ''` turns "the author left the field blank" into "this image carries
 * no information", silently, for every image in the CMS. Conformance is asserted and the failure
 * is unobservable — [[rules]]/unraised's default-ALLOW, in the accessibility layer.
 *
 * Parsed: only a binary `||` whose right side is an empty string literal, assigned to a name-ish
 * target. A page `title` built with `${x || ''}` is a string, not an accessible name, and is not
 * flagged — the false positive a regex over these lines produces.
 */
export function emptyNameFallbacks(cwd: string = process.cwd()): EmptyNameFallback[] {
  const out: EmptyNameFallback[] = []
  const isNameTarget = (t: string): boolean => /^(alt|ariaLabel)$/.test(t) || t === 'aria-label'
  for (const file of sources(cwd)) {
    const text = readFileSync(file, 'utf8')
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const flag = (node: ts.Node, expr: ts.Expression): void => {
      if (!ts.isBinaryExpression(expr)) return
      if (expr.operatorToken.kind !== ts.SyntaxKind.BarBarToken && expr.operatorToken.kind !== ts.SyntaxKind.QuestionQuestionToken) return
      if (!ts.isStringLiteral(expr.right) || expr.right.text !== '') return
      out.push({
        file: relative(cwd, file),
        line: sf.getLineAndCharacterOfPosition(node.getStart()).line + 1,
        text: node.getText().replace(/\s+/g, ' ').slice(0, 72),
      })
    }
    const visit = (node: ts.Node): void => {
      // alt = x || ''   /   const alt = x || ''
      if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && isNameTarget(node.left.getText())) {
        flag(node, node.right)
      }
      if (ts.isVariableDeclaration(node) && isNameTarget(node.name.getText()) && node.initializer) {
        flag(node, node.initializer)
      }
      // alt={x || ''}
      if (ts.isJsxAttribute(node) && isNameTarget(node.name.getText()) && node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression) {
        flag(node, node.initializer.expression)
      }
      node.forEachChild(visit)
    }
    visit(sf)
  }
  return out
}

/** Fails closed on getting worse. */
export function assertNonTextNamed(cwd: string = process.cwd(), ceiling: number): void {
  const bad = [...unnamedNonText(cwd), ...emptyNameFallbacks(cwd).map((f) => ({ file: f.file, line: f.line, element: 'empty-fallback' }))]
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ rules/alt — ${bad.length} non-text element(s) with no accessible name (ceiling ${ceiling}):\n` +
      bad.map((b) => `  ${b.file}:${b.line}  <${b.element}>`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const unnamed = unnamedNonText()
  const empties = emptyNameFallbacks()
  console.log(`rules/alt — WCAG 2.2 §1.1.1\n`)
  console.log(`unnamed non-text elements: ${unnamed.length}`)
  for (const u of unnamed) console.log(`  ${u.file}:${u.line}  <${u.element}>`)
  console.log(`\naccessible names defaulted to empty (silently DECORATIVE): ${empties.length}`)
  for (const e of empties) console.log(`  ${e.file}:${e.line}  ${e.text}`)
}
