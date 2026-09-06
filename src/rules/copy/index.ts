import { readFileSync } from 'node:fs'
import { relative } from 'node:path'
import ts from 'typescript'
import { createHash } from 'node:crypto'
import { allFiles } from '@/syntax/cache'

/**
 * rules/copy — one truth living at two addresses, found by content-addressing its body.
 *
 * @see ./SKILL.md
 */

export interface CopySite {
  readonly file: string
  readonly name: string
  readonly line: number
}

export interface CopyGroup {
  /** The body's content-address. Same bytes ⇒ same address: a theorem, not a similarity score. */
  readonly address: string
  /** How much code is duplicated, in AST nodes — the honest size of the finding. */
  readonly nodes: number
  readonly sites: readonly CopySite[]
}

/** Generated faces restate every symbol, so they are not evidence of duplication. */
const GENERATED = /(payload-types|skills\.index|\.generated|generated)\.tsx?$/

/**
 * A body's address: the source text with comments and whitespace removed.
 *
 * Comments are stripped because two identical implementations documented differently are still one
 * implementation ([[syntax]]: a comment is data). Whitespace goes for the same reason. What is NOT
 * stripped is identifiers — a body that reads different names is doing something else until a human
 * says otherwise, and erasing names is how a "duplicate" report fills with false pairs.
 */
const addressOf = (node: ts.Node, source: ts.SourceFile): string => {
  const text = node.getFullText(source)
  const stripped = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
    .replace(/\s+/g, '')
  return createHash('sha256').update(stripped, 'utf8').digest('hex').slice(0, 16)
}

const countNodes = (node: ts.Node): number => {
  let n = 0
  const walk = (x: ts.Node): void => {
    n++
    ts.forEachChild(x, walk)
  }
  walk(node)
  return n
}

/** The name a reader would use for this body. */
const nameOf = (node: ts.Node): string => {
  const named = node as unknown as { name?: ts.Node }
  if (named.name && ts.isIdentifier(named.name as ts.Node)) return (named.name as ts.Identifier).text
  const parent = node.parent as unknown as { name?: ts.Node } | undefined
  if (parent?.name && ts.isIdentifier(parent.name as ts.Node)) return (parent.name as ts.Identifier).text
  return '(anonymous)'
}

/**
 * Bodies that appear at two or more addresses in the corpus.
 *
 * `minNodes` is the noise floor and it is DECLARED, not derived: below it a body is a one-liner that
 * many honest functions share (`return x.length`, a two-line guard), and reporting those buries the
 * signal under itself — the failure three instruments in this corpus have already paid for. Raise it
 * and the report shrinks toward only the copies worth a human's time.
 */
export function duplicateBodies(cwd: string = process.cwd(), minNodes = 40): CopyGroup[] {
  const groups = new Map<string, { nodes: number; sites: CopySite[] }>()
  for (const file of allFiles(cwd)) {
    if (!/\.tsx?$/.test(file) || GENERATED.test(file)) continue
    if (/\/(test|.*\.test)\.tsx?$/.test(file)) continue // scaffolding legitimately repeats
    let text = ''
    try {
      text = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    const src = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)
    const visit = (node: ts.Node): void => {
      const isBody =
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isArrowFunction(node) ||
        ts.isFunctionExpression(node) ||
        ts.isClassDeclaration(node)
      if (isBody) {
        const nodes = countNodes(node)
        if (nodes >= minNodes) {
          const key = addressOf(node, src)
          const line = src.getLineAndCharacterOfPosition(node.getStart(src)).line + 1
          const entry = groups.get(key) ?? { nodes, sites: [] }
          entry.sites.push({ file: relative(cwd, file), name: nameOf(node), line })
          groups.set(key, entry)
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(src)
  }
  return [...groups]
    .filter(([, g]) => new Set(g.sites.map((s) => `${s.file}:${s.line}`)).size > 1)
    .map(([address, g]) => ({ address, nodes: g.nodes, sites: g.sites }))
    .sort((a, b) => b.nodes * b.sites.length - a.nodes * a.sites.length)
}

/** Total duplicated bodies beyond the first copy of each — what DRY would remove. */
export function copyCount(cwd: string = process.cwd(), minNodes = 40): number {
  return duplicateBodies(cwd, minNodes).reduce((n, g) => n + (g.sites.length - 1), 0)
}

/** Fails closed on getting worse. */
export function assertNoNewCopies(cwd: string = process.cwd(), ceiling: number, minNodes = 40): void {
  const n = copyCount(cwd, minNodes)
  if (n <= ceiling) return
  const worst = duplicateBodies(cwd, minNodes).slice(0, 8)
  throw new Error(
    `✖ rules/copy — ${n} duplicated body/bodies (ceiling ${ceiling}):\n` +
      worst.map((g) => `  ${g.nodes} nodes ×${g.sites.length}\n${g.sites.map((s) => `      ${s.file}:${s.line} ${s.name}`).join('\n')}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const groups = duplicateBodies()
  console.log(`rules/copy — ${groups.length} body/bodies at 2+ addresses · ${copyCount()} removable`)
  for (const g of groups.slice(0, 14)) {
    console.log(`  ${String(g.nodes).padStart(5)} nodes ×${g.sites.length}`)
    for (const s of g.sites) console.log(`        ${s.file}:${s.line}  ${s.name}`)
  }
}

/** @index-cross.foldback child=rules/copy parent=rules — this cross folds back into its parent. */
