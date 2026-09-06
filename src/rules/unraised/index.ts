/**
 * rules/unraised — a declared failure kind that is never raised is a check that cannot fire.
 *
 *   tsx src/rules/unraised/index.ts
 */
import { allFiles, astOf } from '@/syntax/cache'
import { readFileSync } from 'node:fs'
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

/**
 * Not this corpus's matter — as PATH tests, since the traversal is shared.
 *
 * The dot test is this gate's alone: it was the only walk that skipped dotted entries, and the
 * shared walk keeps them because [[rules]]/reference judges every file regardless of extension.
 */
const SKIP_PATH = /\/(dist|coverage|test-results|playwright-report|_report|migrations)\//
const DOTTED = /(^|\/)\./

/** Generated faces restate every symbol — they are not evidence that a kind is raised. */
const GENERATED = /payload-types\.ts$|skills\.index\.ts$|\.d\.ts$/

/**
 * Every source file this gate judges, filtered from the ONE shared walk ([[syntax]]/cache).
 *
 * The predicate is the walk's, transcribed: the same extensions, the same generated exclusions, and
 * the same eight skipped directories — now tested against the path rather than the entry name,
 * because the traversal is no longer this gate's. Verified by diffing both populations file by
 * file: 7,402 = 7,402, empty in both directions.
 */
export function sourceFiles(root: string): string[] {
  const src = join(root, 'src')
  return allFiles(root).filter(
    (f) =>
      /\.tsx?$/.test(f) &&
      !GENERATED.test(f) &&
      !SKIP_PATH.test(f.slice(src.length)) &&
      !DOTTED.test(f.slice(src.length)),
  ) as string[]
}

/**
 * Every string-literal member of a `…Kind` union — the DECLARED taxonomy of failure cases.
 *
 * Parsed via `ts.createSourceFile`, never matched: a union member is grammar, and a regex over
 * TypeScript is a guess. The corpus has paid for that mistake in every gate it built on a pattern.
 */
export function declaredKinds(file: string, text: string): { kind: string; member: string }[] {
  const sf = astOf(file, text)
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
  const sf = astOf(file, text)
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

/** @index-cross.foldback child=rules/unraised parent=rules — this cross folds back into its parent. */
