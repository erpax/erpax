import ts from 'typescript'
import { join, relative } from 'node:path'
import { astOf, corpusFiles } from '@/syntax/cache'

/**
 * rules/forge — an identifier a registry assigns may not be produced by local randomness.
 *
 * @see ./SKILL.md — the three sites that minted `10.5281/zenodo.${Math.random()}` while logging
 *   "[ZENODO] Publishing" and making no network call, and what their tests asserted.
 */

export interface Forgery {
  readonly file: string
  readonly line: number
  /** Which registry's shape the string wears. */
  readonly registry: string
  readonly source: string
  readonly text: string
}

/** DECLARED in the open: a registry prefix is a fact about the world, and no theorem derives it. */
const REGISTERED_SHAPES: readonly (readonly [string, RegExp])[] = [
  ['DOI', /10\.\d{4,9}\//],
  ['ORCID', /orcid\.org\/\d{4}-/],
  ['ISBN', /\bisbn[-\s:]*97[89]/i],
  ['IBAN', /\b[A-Z]{2}\d{2}[A-Z0-9]{4}/],
]

/** Locally-generated entropy or a local counter — anything this process decides for itself. */
const LOCAL_SOURCE = /Math\s*\.\s*random|randomUUID|randomBytes|Date\s*\.\s*now|crypto\.getRandomValues|\+\+|nanoid|uuidv4/

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

/** The one walk both faces use. */
function collectForgeries(src: ts.SourceFile, rel: string, out: Forgery[]): void {
  const visit = (n: ts.Node): void => {
    if (ts.isTemplateExpression(n)) {
      const whole = n.getText()
      const shape = REGISTERED_SHAPES.find(([, re]) => re.test(whole))
      if (shape) {
        const interpolated = n.templateSpans.map((x) => x.expression.getText()).join(' ; ')
        if (LOCAL_SOURCE.test(interpolated)) {
          const { line } = src.getLineAndCharacterOfPosition(n.getStart())
          out.push({
            file: rel,
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

/**
 * Every template literal wearing a registry's shape AND interpolating something local.
 *
 * PARSED, never matched — and a comment quoting a forgery to explain it is not a
 * `ts.TemplateExpression`, so the grammar excludes it for free.
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
    collectForgeries(src, relative(cwd, f), hits)
  }
  return hits
}

/** The same measurement over an EDIT: a forged provenance record belongs refused at the write. */
export function forgedIn(files: readonly string[], cwd: string = process.cwd()): Forgery[] {
  const hits: Forgery[] = []
  for (const f of files.filter((x) => /\.tsx?$/.test(x) && !/\.d\.ts$|generated/.test(x))) {
    const abs = f.startsWith('/') ? f : join(cwd, f)
    let src: ts.SourceFile
    try {
      src = parse(abs)
    } catch {
      continue
    }
    collectForgeries(src, relative(cwd, abs), hits)
  }
  return hits
}

/** Zero is a THEOREM: there is no acceptable number of forged registered identifiers. */
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
