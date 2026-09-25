import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'
import { createHash } from 'node:crypto'
import { allFiles } from '@/syntax/cache'
import { importCycles } from '@/rules/cycle'

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

if (import.meta.url === `file://${process.argv[1]}`) {
  const groups = duplicateBodies()
  console.log(`rules/copy — ${groups.length} body/bodies at 2+ addresses · ${copyCount()} removable`)
  for (const g of groups.slice(0, 14)) {
    console.log(`  ${String(g.nodes).padStart(5)} nodes ×${g.sites.length}`)
    for (const s of g.sites) console.log(`        ${s.file}:${s.line}  ${s.name}`)
  }
}

/** @index-cross.foldback child=rules/copy parent=rules — this cross folds back into its parent. */

/** A duplicated body whose sites share an import tangle — the copy × cycle cross. */
export interface TangledCopy extends CopyGroup {
  /** Size of the strongly connected component both sites sit in. */
  readonly tangle: number
}

/**
 * Copies spanning two FILES that lie in one strongly connected component. See SKILL.md.
 *
 * Strictly worse than an ordinary copy: inside one tangle the initialisation order of the two
 * files is decided by the graph rather than by either author, so the same text can run under
 * different conditions — and neither law sees it alone.
 *
 * Two sites in ONE file are excluded: a file is trivially in its own component, and counting
 * that would make every same-file duplicate a tangle finding — the noise floor this corpus has
 * paid for four times.
 */
export function copiesInTangle(cwd: string = process.cwd(), minNodes = 40): TangledCopy[] {
  const components = importCycles(cwd)
  const member = new Map<string, number>()
  components.forEach((c, i) => {
    for (const f of c) member.set(f, i)
  })
  const out: TangledCopy[] = []
  for (const g of duplicateBodies(cwd, minNodes)) {
    if (new Set(g.sites.map((s) => s.file)).size < 2) continue
    const ids = g.sites.map((s) => member.get(join(cwd, s.file)) ?? member.get(s.file))
    const first = ids[0]
    if (first === undefined) continue
    if (!ids.every((id) => id === first)) continue
    out.push({ ...g, tangle: components[first]?.length ?? 0 })
  }
  return out.sort((a, b) => b.nodes - a.nodes || a.address.localeCompare(b.address))
}

/** A duplicated body at least one of whose copies has no more than one caller. */
export interface UnearnedCopy extends CopyGroup {
  /** The sites whose export is dead or single-use — the copies not earning their place. */
  readonly unearned: readonly CopySite[]
}

/**
 * Copies where at least one site's export has ≤1 caller — the copy × unfolded cross. See SKILL.md.
 *
 * Measured, not guessed: `crosses()` ranks by absence in prose and put this pair nowhere near the
 * top, while `crossIntersections` shows 11 files where both laws fire.
 */
export function unearnedCopies(
  unfoldedFiles: ReadonlySet<string>,
  cwd: string = process.cwd(),
  minNodes = 40,
): UnearnedCopy[] {
  const out: UnearnedCopy[] = []
  for (const g of duplicateBodies(cwd, minNodes)) {
    const unearned = g.sites.filter((s) => unfoldedFiles.has(s.file))
    if (unearned.length === 0) continue
    out.push({ ...g, unearned })
  }
  return out.sort((a, b) => b.unearned.length - a.unearned.length || b.nodes - a.nodes)
}

/** An access policy: a `const X: Access` or `const X: FieldAccess`, with its body's address. */
export interface Policy {
  readonly name: string
  readonly file: string
  readonly hash: string
  /** `Access` or `FieldAccess` — two different Payload interfaces, never interchangeable. */
  readonly family: string
}

/** Payload's own annotation is the authority on what an access policy is — parsed, never guessed. */
const POLICY_TYPE = /^(Access|FieldAccess)(<|$)/

/**
 * Every access policy in the corpus, content-addressed. See SKILL.md § access policies.
 *
 * Exempt from `minNodes`: a policy body is commonly one line (`() => false`), which is exactly why
 * the size floor could not see four private copies of `neverDelete` or a diverged `adminOnly`.
 */
export function accessPolicies(cwd: string = process.cwd()): Policy[] {
  const out: Policy[] = []
  for (const file of allFiles(cwd)) {
    if (!/\.tsx?$/.test(file) || /\/(test|seed)\.tsx?$/.test(file)) continue
    const text = readFileSync(file, 'utf8')
    if (!/:\s*(Access|FieldAccess)\b/.test(text)) continue
    const src = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
    const visit = (n: ts.Node): void => {
      // An alias (`const a: Access = b`) points AT an implementation; it is not a second one.
      if (ts.isVariableDeclaration(n) && n.initializer && !ts.isIdentifier(n.initializer) && n.type) {
        const fam = POLICY_TYPE.exec(n.type.getText(src).trim())?.[1]
        if (!fam) { ts.forEachChild(n, visit); return }
        const init = n.initializer
        // `{ return x }` and `x` are the same policy written two ways: normalise a
        // single-return block to its expression, or a fifth copy of `() => false` hides
        // behind a pair of braces (which is exactly how one did).
        const bodyNode = ts.isArrowFunction(init) || ts.isFunctionExpression(init) ? init.body : init
        const only = ts.isBlock(bodyNode) && bodyNode.statements.length === 1 ? bodyNode.statements[0] : undefined
        const body = only && ts.isReturnStatement(only) && only.expression
          ? only.expression.getText(src)
          : bodyNode.getText(src)
        const norm = body.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '').replace(/\s+/g, ' ').trim()
        out.push({
          name: n.name.getText(src),
          file: relative(cwd, file),
          hash: createHash('sha256').update(norm).digest('hex').slice(0, 16),
          family: fam,
        })
      }
      ts.forEachChild(n, visit)
    }
    visit(src)
  }
  return out
}

/**
 * Access policies with the same body in the same family, at two or more addresses.
 *
 * Grouped by `hash + family`, never by hash alone: `superAdminOnly: Access` and
 * `fieldAccess: FieldAccess` share a body and satisfy two DIFFERENT Payload interfaces. See SKILL.md.
 */
export function policyAddresses(cwd: string = process.cwd()): Policy[][] {
  const m = new Map<string, Policy[]>()
  for (const p of accessPolicies(cwd)) {
    const k = `${p.family}:${p.hash}`
    const a = m.get(k) ?? []
    a.push(p)
    m.set(k, a)
  }
  return [...m.values()].filter((g) => g.length > 1 && new Set(g.map((p) => p.file + p.name)).size > 1)
}


/** One formula, and where it lives. */
export interface Formula {
  readonly atom: string
  readonly name: string
  readonly file: string
  /** The expression with parameters normalised to `$0`, `$1` — the SHAPE, not the spelling. */
  readonly shape: string
}

/**
 * Two formulas that share a shape and are NOT the same theorem. DECLARED. See SKILL.md § formulas.
 *
 * A numeric coincidence is not duplication, and folding one would erase a real cross-domain fact —
 * and worse, the two would stop being able to move independently when a model changes.
 */
const COINCIDENT_FORMULAS: ReadonlyArray<readonly [string, string, string]> = [
  [
    'birthdayLog2',
    'groverPreimageLog2',
    'both are d/2 and neither derives the other: the birthday bound counts CLASSICAL collisions in a ' +
      'space of size 2^d, Grover counts QUANTUM queries for a preimage. One exponent, two theorems.',
  ],
  [
    'conjugate',
    'linewidth',
    'both are bound()/x: Δx·Δp ≥ ℏ/2 and ΔE·Δt ≥ ℏ/2 are the same inequality read over two different ' +
      'conjugate pairs — position·momentum and energy·time.',
  ],
]

/**
 * Single-expression arithmetic formulas, content-addressed by SHAPE. See SKILL.md § formulas.
 *
 * A shape whose every operand is a parameter is REFUSED: `$0 * $1` is multiplication, not a formula,
 * and `energyJoules = h*f` shares nothing real with `consultProfit = rate*hours`. At least one
 * operand must be a constant, a call or a named value — the expression-level form of the noise floor
 * `minNodes` gives bodies.
 */
export function formulaAddresses(cwd: string = process.cwd()): Formula[][] {
  const ARITH = new Set<ts.SyntaxKind>([
    ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken, ts.SyntaxKind.AsteriskToken,
    ts.SyntaxKind.SlashToken, ts.SyntaxKind.PercentToken, ts.SyntaxKind.AsteriskAsteriskToken,
  ])
  const byShape = new Map<string, Formula[]>()
  for (const file of allFiles(cwd)) {
    if (!/\.tsx?$/.test(file) || /\/(test|seed)\.tsx?$/.test(file)) continue
    const text = readFileSync(file, 'utf8')
    const src = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
    const atom = relative(join(cwd, 'src'), file).replace(/\/index\.tsx?$/, '').replace(/\.tsx?$/, '')
    const visit = (n: ts.Node): void => {
      if (ts.isVariableDeclaration(n) && n.initializer && ts.isArrowFunction(n.initializer)) {
        const body = n.initializer.body
        if (!ts.isBlock(body) && ts.isBinaryExpression(body) && ARITH.has(body.operatorToken.kind)) {
          const params = n.initializer.parameters.map((p) => p.name.getText(src))
          let shape = body.getText(src).replace(/\s+/g, '')
          params.forEach((p, i) => { shape = shape.replaceAll(p, `$${i}`) })
          // every operand a parameter ⇒ a bare operator, not a formula
          const bare = /^\$\d+[-+*/%]+\$\d+$/.test(shape)
          if (!bare) byShape.set(shape, [...(byShape.get(shape) ?? []), { atom, name: n.name.getText(src), file: relative(cwd, file), shape }])
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(src)
  }
  const declared = new Set(COINCIDENT_FORMULAS.flatMap(([a, b]) => [`${a}|${b}`, `${b}|${a}`]))
  return [...byShape.values()]
    .filter((g) => g.length > 1)
    .filter((g) => !g.every((x, _i, all) => all.some((y) => y !== x && declared.has(`${x.name}|${y.name}`))))
}

/** Zero is a THEOREM: one formula, one address — unless it is a DECLARED coincidence. */
export function assertFormulasConsolidated(cwd: string = process.cwd()): void {
  const g = formulaAddresses(cwd)
  if (g.length === 0) return
  throw new Error(
    `✖ rules/copy — ${g.length} formula(s) at two or more addresses:\n` +
      g.map((x) => `  ${x[0]!.shape}\n` + x.map((s) => `      ${s.name} @ ${s.atom}`).join('\n')).join('\n'),
  )
}
