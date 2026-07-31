/**
 * rules/unraised — a declared failure kind that is never raised is a check that cannot fire.
 *
 *   tsx src/rules/unraised/index.ts
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'

export interface Unraised {
  /** the `…Kind` type alias declaring the taxonomy */
  readonly kind: string
  /** the literal member that nothing ever constructs */
  readonly member: string
  /** repo-relative file declaring it */
  readonly where: string
}

const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  '.next',
  'coverage',
  'test-results',
  'playwright-report',
  '_report',
  'migrations',
])

/** Generated faces restate every symbol — they are not evidence that a kind is raised. */
const GENERATED = /payload-types\.ts$|skills\.index\.ts$|\.d\.ts$/

export function sourceFiles(root: string): string[] {
  const out: string[] = []
  const walk = (dir: string): void => {
    let ents
    try {
      ents = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of ents) {
      if (e.isSymbolicLink() || e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.tsx?$/.test(e.name) && !GENERATED.test(p)) out.push(p)
    }
  }
  walk(join(root, 'src'))
  return out
}

/**
 * Every string-literal member of a `…Kind` union — the DECLARED taxonomy of failure cases.
 *
 * Parsed via `ts.createSourceFile`, never matched: a union member is grammar, and a regex over
 * TypeScript is a guess. The corpus has paid for that mistake in every gate it built on a pattern.
 */
export function declaredKinds(file: string, text: string): { kind: string; member: string }[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const out: { kind: string; member: string }[] = []
  const visit = (n: ts.Node): void => {
    if (ts.isTypeAliasDeclaration(n) && /Kind$/.test(n.name.text) && ts.isUnionTypeNode(n.type)) {
      for (const m of n.type.types) {
        if (ts.isLiteralTypeNode(m) && ts.isStringLiteral(m.literal)) {
          out.push({ kind: n.name.text, member: m.literal.text })
        }
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

/**
 * A string literal is CONSTRUCTED here — the member is actually raised somewhere, not merely declared.
 *
 * The declaration itself is excluded by construction: a `LiteralTypeNode` is a TYPE position, and only
 * expression-position string literals count. Declaring a case and never raising it leaves a gate that
 * reports green forever — the false negative that is worse than any false positive.
 */
export function constructedLiterals(file: string, text: string): Set<string> {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const out = new Set<string>()
  const visit = (n: ts.Node): void => {
    if (ts.isStringLiteral(n) && !ts.isLiteralTypeNode(n.parent)) out.add(n.text)
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

/** Declared failure kinds that nothing in `src` ever raises — checks that cannot fire. */
export function unraisedKinds(root: string): Unraised[] {
  const files = sourceFiles(root)
  const declared: { kind: string; member: string; where: string }[] = []
  const raised = new Set<string>()
  for (const f of files) {
    const text = readFileSync(f, 'utf8')
    for (const d of declaredKinds(f, text)) declared.push({ ...d, where: relative(root, f) })
    for (const lit of constructedLiterals(f, text)) raised.add(lit)
  }
  return declared
    .filter((d) => !raised.has(d.member))
    .sort((a, b) => a.kind.localeCompare(b.kind) || a.member.localeCompare(b.member))
}

/**
 * Ratchets. A kind declared and never raised defaults its claim to TRUE by omission — the same
 * default-ALLOW defect as a location axis that exempts every path outside the root.
 */
export function assertKindsRaised(root: string, ceiling: number): { ok: boolean; found: number; list: Unraised[] } {
  const list = unraisedKinds(root)
  return { ok: list.length <= ceiling, found: list.length, list }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = process.cwd()
  const list = unraisedKinds(root)
  console.log(`${list.length} declared kind(s) never raised — a check that cannot fire\n`)
  for (const u of list) console.log(`  ${u.kind}.${u.member}  ${u.where}`)
  process.exit(0)
}
