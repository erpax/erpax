import ts from 'typescript'
import { relative } from 'node:path'
import { astOf, corpusFiles } from '@/syntax/cache'

/**
 * rules/sanitize — the sanitisation shapes an external scanner found 25 of, read natively from the
 * grammar so the gate registry measures them itself. See SKILL.md.
 *
 * @standard CWE-116 improper encoding or escaping of output
 * @standard CWE-1321 prototype pollution
 * @security OWASP ASVS 5.3 — output encoding and injection prevention
 */

export type SanitizeKind =
  /** `.replace(/<[^>]+>/g, '')` — one pass leaves `<scr<x>ipt>` as `<script>`; the fixpoint lives in xml/escape. */
  | 'strip-once'
  /** `JSON.stringify(…)` interpolated into a template that is CODE — a JSON literal is not a JS literal. */
  | 'json-into-code'
  /** `hostname.includes('x.com')` / `.endsWith('x.com')` — a substring is not a domain. */
  | 'host-substring'
  /** `.replace(/'/g, "\\'")` — a hand-rolled string-literal escape that forgets the backslash. */
  | 'quote-escape'
  /** a dotted-path writer (`split('.')` + `cur[k] = …`) with no `__proto__` refusal in sight. */
  | 'proto-path'

export interface SanitizeViolation {
  readonly file: string
  readonly line: number
  readonly kind: SanitizeKind
  readonly text: string
}

/** DECLARED: what makes a template literal CODE rather than prose. Argue with the list, not the gate. */
const CODE_MARKERS = ['import ', 'export ', 'describe(', 'it(', '=> {', 'return (', 'function '] as const

/** The one address a fixpoint tag strip is allowed to live at. */
const STRIP_HOME = /(^|\/)src\/xml\/escape\//

const PROTO_GUARD = /__proto__|PROTOTYPE_KEYS|prototype/

const regexSource = (n: ts.Node): string | undefined =>
  ts.isRegularExpressionLiteral(n) ? n.text.replace(/^\/|\/[a-z]*$/g, '') : undefined

const isStringLit = (n: ts.Node): n is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral =>
  ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)

function collect(src: ts.SourceFile, rel: string, out: SanitizeViolation[]): void {
  const push = (n: ts.Node, kind: SanitizeKind): void => {
    const { line } = src.getLineAndCharacterOfPosition(n.getStart())
    out.push({ file: rel, line: line + 1, kind, text: n.getText().replace(/\s+/g, ' ').slice(0, 100) })
  }

  const visit = (n: ts.Node): void => {
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
      const method = n.expression.name.text
      const receiver = n.expression.expression
      const [a0, a1] = n.arguments

      if (method === 'replace' && a0 !== undefined && a1 !== undefined && isStringLit(a1)) {
        const re = regexSource(a0)
        if (re !== undefined) {
          if (/^<\[\^>\][+*]>$/.test(re) && a1.text === '' && !STRIP_HOME.test(rel)) push(n, 'strip-once')
          if (/^['"`]$/.test(re) && a1.text.startsWith('\\')) push(n, 'quote-escape')
        }
      }

      if ((method === 'includes' || method === 'endsWith') && /\.(hostname|host)$/.test(receiver.getText()) && a0 !== undefined) {
        if (method === 'includes') push(n, 'host-substring')
        else if (isStringLit(a0) && !a0.text.startsWith('.')) push(n, 'host-substring')
      }
    }

    if (ts.isTemplateExpression(n)) {
      const literal = [n.head.text, ...n.templateSpans.map((s) => s.literal.text)].join('\u0000')
      if (CODE_MARKERS.some((m) => literal.includes(m))) {
        for (const span of n.templateSpans) {
          if (/^JSON\s*\.\s*stringify\s*\(/.test(span.expression.getText())) push(span.expression, 'json-into-code')
        }
      }
    }

    if (ts.isFunctionDeclaration(n) || ts.isFunctionExpression(n) || ts.isArrowFunction(n) || ts.isMethodDeclaration(n)) {
      const body = n.body?.getText() ?? ''
      if (/\.split\(\s*['"`]\.['"`]\s*\)/.test(body) && !PROTO_GUARD.test(body)) {
        let writes = false
        const scan = (m: ts.Node): void => {
          if (
            ts.isBinaryExpression(m) &&
            m.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
            ts.isElementAccessExpression(m.left) &&
            !isStringLit(m.left.argumentExpression) &&
            !ts.isNumericLiteral(m.left.argumentExpression)
          ) {
            writes = true
          }
          if (!writes) ts.forEachChild(m, scan)
        }
        if (n.body) scan(n.body)
        if (writes) push(n, 'proto-path')
      }
    }

    ts.forEachChild(n, visit)
  }
  visit(src)
}

/** Population: `.ts`/`.tsx` source, no generated face, no tests — a planted defect in a test is the proof, not a violation. */
const sourceFiles = (cwd: string): string[] =>
  corpusFiles(cwd, 'source').filter((f) => {
    const base = f.slice(f.lastIndexOf('/') + 1)
    return !/generated/.test(base) && !/^test\.tsx?$|\.test\.tsx?$/.test(base)
  })

/** Every sanitisation defect the grammar can see, across the tree. Parsed, never matched. */
export function sanitizeViolations(cwd: string = process.cwd()): SanitizeViolation[] {
  const out: SanitizeViolation[] = []
  for (const f of sourceFiles(cwd)) {
    let src: ts.SourceFile
    try {
      src = astOf(f)
    } catch {
      continue
    }
    collect(src, relative(cwd, f), out)
  }
  return out.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
}

/** The same measurement over an EDIT — the write-time twin ([[rules]]/scope). */
export function sanitizeIn(files: readonly string[], cwd: string = process.cwd()): SanitizeViolation[] {
  const out: SanitizeViolation[] = []
  for (const f of files.filter((x) => /\.tsx?$/.test(x) && !/\.d\.ts$|generated|(^|\/)test\.tsx?$/.test(x))) {
    try {
      collect(astOf(f), relative(cwd, f), out)
    } catch {
      continue
    }
  }
  return out
}

/** Ratchet: fails closed on getting worse than the ceiling; the horizon is 0. */
export function assertSanitized(cwd: string = process.cwd(), ceiling: number): void {
  const v = sanitizeViolations(cwd)
  if (v.length <= ceiling) return
  const detail = v.map((x) => `  ${x.kind.padEnd(16)} ${x.file}:${x.line}  ${x.text}`).join('\n')
  throw new Error(`✖ sanitize law: ${v.length} defect(s) against a ceiling of ${ceiling}:\n${detail}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = sanitizeViolations()
  const byKind = new Map<string, number>()
  for (const x of v) byKind.set(x.kind, (byKind.get(x.kind) ?? 0) + 1)
  console.log(`sanitize — ${v.length} defect(s) the grammar can see`)
  for (const [k, c] of [...byKind].sort()) console.log(`  ${k.padEnd(16)} ${c}`)
  for (const x of v) console.log(`  ${x.kind.padEnd(16)} ${x.file}:${x.line}  ${x.text}`)
}
