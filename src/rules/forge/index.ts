import ts from 'typescript'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

/**
 * rules/forge — an identifier a registry assigns may not be produced by local randomness.
 *
 * A DOI is registered under ISO 26324. An IBAN is issued by a bank. A VAT number is issued by a
 * tax authority. None of them can be computed, and a locally generated string in their shape is a
 * forged provenance record — well-formed, indistinguishable downstream, and false.
 *
 * @see ./SKILL.md — the three sites this was written for, and what their tests asserted.
 */

export interface Forgery {
  readonly file: string
  readonly line: number
  /** Which registry's shape the string wears. */
  readonly registry: string
  readonly source: string
  readonly text: string
}

/**
 * DECLARED, in the open, so it can be argued with — a registry prefix is a fact about the world and
 * no theorem derives the list. Each entry is a shape only a registration agency may fill.
 */
const REGISTERED_SHAPES: readonly (readonly [string, RegExp])[] = [
  ['DOI', /10\.\d{4,9}\//],
  ['ORCID', /orcid\.org\/\d{4}-/],
  ['ISBN', /\bisbn[-\s:]*97[89]/i],
  ['IBAN', /\b[A-Z]{2}\d{2}[A-Z0-9]{4}/],
]

/** Locally-generated entropy or a local counter — anything this process decides for itself. */
const LOCAL_SOURCE = /Math\s*\.\s*random|randomUUID|randomBytes|Date\s*\.\s*now|crypto\.getRandomValues|\+\+|nanoid|uuidv4/

const parse = (p: string): ts.SourceFile =>
  ts.createSourceFile(p, readFileSync(p, 'utf8'), ts.ScriptTarget.Latest, true)

const sourceFiles = (cwd: string): string[] => {
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
      else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name) && !/generated/.test(e.name)) out.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return out.sort()
}

/**
 * Every template literal that wears a registry's shape AND interpolates something local.
 *
 * PARSED, never matched. A template literal is a grammatical object: its head text carries the
 * registry prefix, and its spans carry the expressions. A comment quoting a forgery in order to
 * explain it is not a forgery — a lesson three sibling repos each paid for separately today — and
 * a comment is not a `ts.TemplateExpression`, so it cannot reach this scan.
 */
export function forgedIdentifiers(cwd: string = process.cwd()): Forgery[] {
  const hits: Forgery[] = []
  for (const f of sourceFiles(cwd)) {
    let src: ts.SourceFile
    try {
      src = parse(f)
    } catch {
      continue
    }
    const visit = (n: ts.Node): void => {
      if (ts.isTemplateExpression(n)) {
        const whole = n.getText()
        const shape = REGISTERED_SHAPES.find(([, re]) => re.test(whole))
        if (shape) {
          const interpolated = n.templateSpans.map((s) => s.expression.getText()).join(' ; ')
          if (LOCAL_SOURCE.test(interpolated)) {
            const { line } = src.getLineAndCharacterOfPosition(n.getStart())
            hits.push({
              file: relative(cwd, f),
              line: line + 1,
              registry: shape[0],
              source: interpolated.slice(0, 60),
              text: whole.replace(/\s+/g, ' ').slice(0, 100),
            })
          }
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(src)
  }
  return hits
}

/**
 * Zero is a THEOREM here, not a ratchet.
 *
 * There is no acceptable number of forged registered identifiers, so there is nothing to raise
 * later and no ceiling to argue about.
 */
export function assertNoForgery(cwd: string = process.cwd()): void {
  const found = forgedIdentifiers(cwd)
  if (found.length === 0) return
  throw new Error(
    `✖ forge — ${found.length} identifier(s) wear a registry's shape and are generated locally:\n` +
      found.map((h) => `  ${h.file}:${h.line}  ${h.registry} from ${h.source}\n      ${h.text}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const found = forgedIdentifiers()
  console.log(`forge — ${found.length} locally-generated registered identifier(s)`)
  for (const h of found) console.log(`  ${h.file}:${h.line}  ${h.registry} ← ${h.source}\n     ${h.text}`)
}
