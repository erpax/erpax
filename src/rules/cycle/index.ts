import { allFiles, astOf, textOf } from '@/syntax/cache'
import { exactMin } from '@/algebra'
/**
 * cycle — an import loop is a lie the module graph tells at runtime.
 *
 * A cycle is not a style defect. It decides INITIALISATION ORDER, and when a module in the loop runs code at
 * import time it reads a binding that does not exist yet:
 *
 *   ReferenceError: Cannot access 'createAccountingCollection' before initialization
 *
 * That is live in erpax, across 15 hops, and no single hop looks wrong:
 *
 *   factory/collection-factory → diamond → readme → readme/compute → rules → quantum
 *     → quantum/dimension-realtime → team/comms → agent/sync → agent/sync/chat-broadcast
 *     → agent → agents/mcp → agents/mcp/tool-defs → collections → fixed/assets
 *     → factory/collection-factory
 *
 * A collection FACTORY reaches the agent's MCP tool definitions, which import EVERY collection, which import
 * the factory — and `fixed/assets` then calls `createAccountingCollection(...)` at module top level, while
 * the factory is still initialising. The loop is invisible from inside any one file: diamond legitimately
 * needs the readme model, the readme legitimately renders the rules registry. **Only the whole ring is wrong.**
 *
 * What it cost, both found by accident:
 *   - `readme/test.ts` — the whole file fails to collect. It has been red and unseen.
 *   - `gl/accounts/period/end/adjustments` — the posting hook's JE booking throws this TDZ, its own catch
 *     swallows it, and the adjustment is marked `posted` with NO journal entry. That hook IS wired.
 *
 * TYPE IMPORTS ARE NOT EDGES. `import type` is erased before runtime, so it cannot cause a TDZ, and counting
 * it would report loops that do not exist — the false-positive class this corpus has paid for repeatedly
 * ([[rules]]/reference counted string literals; [[standards]]/emit counted prose about banners).
 *
 * Run: `tsx src/rules/cycle/index.ts`
 *
 * @standard ISO/IEC 25010:2023 §5.6.2 modularity
 *
 * Composes [[rules]] · [[law]].
 */
import ts from 'typescript'
import { existsSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|catalogue\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$|\.test\.tsx?$/

/**
 * THE EDGES COME FROM THE COMPILER, NOT FROM A PATTERN.
 *
 * This was a regex, and a regex over TypeScript is a guess: the language has a grammar, and a pattern that
 * "usually matches" it is a heuristic wearing a theorem's clothes. Measured against `ts.createSourceFile`
 * over 6,203 files, the regex was wrong in 115 of them — it INVENTED 4 edges and MISSED 211:
 *
 *   - `import './x.scss'` — a side-effect import has no `from`, so the pattern never saw it. It is a real
 *     edge: the module is loaded, and its top-level code runs.
 *   - `await import('@/x')` — a dynamic import is an edge the pattern had no way to express.
 *   - `import { type A, type B } from 'y'` — erased by the compiler, invented by the pattern.
 *
 * A gate built on a guess under-reports as readily as it over-reports, and cannot tell you which. Every
 * false measurement this corpus has paid for came from pattern-matching a language instead of parsing it
 * ([[rules]]/prose counted keywords; [[rules]]/reference counted string literals; [[standards]]/emit counted
 * prose about banners). The parser IS the language definition — the answer stops being a guess.
 */
const edgeSpecifiers = (file: string, text: string): string[] => {
  const src = astOf(file, text)
  const out: string[] = []
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n)) {
      // `import type … from` is erased; so is a clause whose every specifier is inline `type`.
      const clause = n.importClause
      const named = clause?.namedBindings
      const allInlineType =
        !!named &&
        ts.isNamedImports(named) &&
        named.elements.length > 0 &&
        named.elements.every((e) => e.isTypeOnly) &&
        !clause?.name
      if (!clause?.isTypeOnly && !allInlineType && ts.isStringLiteral(n.moduleSpecifier)) {
        out.push(n.moduleSpecifier.text) // a clause-less `import 'x'` lands here: a real side-effect edge
      }
    } else if (ts.isExportDeclaration(n) && n.moduleSpecifier && !n.isTypeOnly) {
      if (ts.isStringLiteral(n.moduleSpecifier)) out.push(n.moduleSpecifier.text)
    } else if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = n.arguments[0]
      if (arg && ts.isStringLiteral(arg)) out.push(arg.text)
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out
}

const resolveSpec = (cwd: string, from: string, spec: string): string | null => {
  let base: string
  if (spec.startsWith('@/')) base = join(cwd, 'src', spec.slice(2))
  else if (spec.startsWith('.')) base = resolve(dirname(from), spec)
  else return null // a package is not part of our graph
  for (const ext of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
    if (existsSync(base + ext)) return base + ext
  }
  return existsSync(base) ? base : null
}

/** Every runtime edge out of a file. */
export function importsOf(file: string, cwd: string = process.cwd()): string[] {
  let text: string
  try {
    text = textOf(file)
  } catch {
    return []
  }
  const out: string[] = []
  for (const spec of edgeSpecifiers(file, text)) {
    const r = resolveSpec(cwd, file, spec)
    if (r && !GENERATED.test(r)) out.push(r)
  }
  return [...new Set(out)]
}

/**
 * Every runtime source, filtered from the ONE shared walk ([[syntax]]/cache).
 *
 * Same extensions, same generated exclusions, same test exclusion, and `worktrees` still skipped —
 * as a path test now that the traversal is shared. Populations diffed file by file: 5,535 = 5,535.
 */
const sources = (root: string): string[] =>
  allFiles(root.endsWith('/src') ? root.slice(0, -4) : root).filter(
    (f) => /\.tsx?$/.test(f) && !GENERATED.test(f) && !IS_TEST.test(f) && !f.includes('/worktrees/'),
  ) as string[]

/** A tangle: a set of files that can all reach each other. Every file in it lies on some import loop. */
export type Cycle = readonly string[]

/**
 * Every import tangle in the tree — the strongly connected components of the runtime import graph, size > 1.
 *
 * This was first written as a depth-first walk that marked nodes `done` and reported the stack slice on a
 * back-edge, with a comment boasting "Tarjan-free". It found 90 loops and MISSED THE ONE THAT MOTIVATED IT:
 * a node already finished is never re-entered, so any loop reachable only THROUGH it is invisible. A false
 * negative in a gate is worse than a false positive — it reports green over the exact defect it exists for.
 * Tarjan is not decoration; it is the reason the answer is complete.
 *
 * An SCC is the honest unit. Enumerating every distinct RING is exponential in a dense tangle, while the
 * component answers the question that matters — "which files are mutually entangled" — in linear time. A
 * component of size 1 is not a cycle unless the file imports itself.
 */
export function importCycles(cwd: string = process.cwd()): Cycle[] {
  const files = sources(join(cwd, 'src'))
  const edges = new Map<string, string[]>()
  for (const f of files) edges.set(f, importsOf(f, cwd))

  const index = new Map<string, number>()
  const low = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const out: Cycle[] = []
  let counter = 0

  // Iterative: the graph is thousands of files deep and a recursive Tarjan overflows the stack.
  const strongConnect = (root: string): void => {
    const work: { node: string; edge: number }[] = [{ node: root, edge: 0 }]
    index.set(root, counter)
    low.set(root, counter)
    counter++
    stack.push(root)
    onStack.add(root)

    while (work.length) {
      const frame = work[work.length - 1]!
      const { node } = frame
      const next = edges.get(node) ?? []

      if (frame.edge < next.length) {
        const w = next[frame.edge]!
        frame.edge++
        if (!index.has(w)) {
          index.set(w, counter)
          low.set(w, counter)
          counter++
          stack.push(w)
          onStack.add(w)
          work.push({ node: w, edge: 0 })
        } else if (onStack.has(w)) {
          low.set(node, exactMin(low.get(node)!, index.get(w)!))
        }
        continue
      }

      // node is done: it roots an SCC iff its lowlink never escaped its own index
      if (low.get(node) === index.get(node)) {
        const comp: string[] = []
        let w: string
        do {
          w = stack.pop()!
          onStack.delete(w)
          comp.push(w)
        } while (w !== node)
        if (comp.length > 1 || (edges.get(node) ?? []).includes(node)) {
          out.push(comp.map((p) => relative(cwd, p).replace(/\\/g, '/')).sort())
        }
      }
      work.pop()
      const parent = work[work.length - 1]
      if (parent) low.set(parent.node, exactMin(low.get(parent.node)!, low.get(node)!))
    }
  }

  for (const f of files) if (!index.has(f)) strongConnect(f)
  return out.sort((a, b) => b.length - a.length)
}

/** A file in a tangle that RUNS an imported binding at import time — where a loop stops being latent. */
export interface TopLevelUse {
  readonly file: string
  /** The imported binding it calls before the graph has finished initialising. */
  readonly binding: string
  readonly line: number
}

/**
 * The runtime bindings a file imports, mapped to the module each came FROM.
 *
 * The source is the whole point. `const p = join(a, b)` at top level is harmless — `node:path` is fully
 * initialised before our graph starts, so `join` can never be in its dead zone. Only a binding imported
 * from a file INSIDE the same tangle can be undefined at load time. Written without this, the scan reported
 * 49 top-level uses of which ~44 were `join`, `existsSync`, `createRequire` — node builtins, incapable of
 * the failure being hunted.
 */
const importedBindings = (code: string): Map<string, string> => {
  const out = new Map<string, string>()
  for (const m of code.matchAll(/(?:^|\n)\s*import(?!\s+type\b)\s+([\s\S]*?)\s+from\s+'([^']+)'/g)) {
    const clause = m[1]!
    const spec = m[2]!
    const braced = clause.match(/\{([\s\S]*?)\}/)
    if (braced) {
      for (const part of braced[1]!.split(',')) {
        const t = part.trim()
        if (!t || /^type\s/.test(t)) continue // `{ type X }` is erased too
        out.set((t.split(/\s+as\s+/).pop() ?? t).trim(), spec)
      }
    }
    const bare = clause.replace(/\{[\s\S]*?\}/, '').replace(/,/g, '').trim()
    if (bare && !/^\*/.test(bare)) out.set(bare, spec)
  }
  return out
}

/**
 * Where a cycle stops being latent: a MODULE-LEVEL call to an imported binding.
 *
 * ES modules tolerate a loop as long as nobody USES a binding while the graph is still initialising. So an
 * entangled file is not yet a bug — an entangled file that runs an import at load time is:
 *
 *   `const _baseFixedAssets = createAccountingCollection(...)`   ← fixed/assets/index.ts:34
 *
 * A function that calls the same import is FINE: by the time anyone calls it, initialisation is done. So a
 * declaration whose value is a function (`= () =>`, `= async (`, `= function`) is deferred, not run — and
 * skipping it is the difference between naming 5 real defects and 152 innocent files.
 */
export function topLevelUses(file: string, cwd: string = process.cwd(), within?: ReadonlySet<string>): TopLevelUse[] {
  let text: string
  try {
    text = textOf(file)
  } catch {
    return []
  }
  const code = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/^\s*\/\/.*$/gm, '')
  const bindings = importedBindings(code)
  // Only a binding from a module in the SAME tangle can be in its dead zone. Given no tangle, judge nothing:
  // a top-level call is perfectly normal when nothing points back at you.
  const names = new Set(
    [...bindings]
      .filter(([, spec]) => {
        const target = resolveSpec(cwd, file, spec)
        return target ? (within ? within.has(relative(cwd, target).replace(/\\/g, '/')) : true) : false
      })
      .map(([name]) => name),
  )
  if (names.size === 0) return []

  // PARSED, not matched — and this atom of all atoms had to be the one to learn it twice.
  //
  // The line-based scanner this replaces read a CONCISE ARROW BODY as a bare top-level call:
  //
  //     export const p = (): string =>
  //       toAtomPath(somePath, 'fs') || 'fallback'      ← counted as fatal
  //
  // Line 1's initialiser starts with `(`, so it was correctly skipped as deferred. But a concise
  // arrow body opens NO BRACE, so the brace-depth counter stayed at 0 and line 2 matched the
  // "bare call statement" branch. The continuation line of a deferred function was reported as
  // running at load time. Seven of twenty-four "fatal" uses were that shape and cannot throw.
  //
  // Ancestry is the theorem: a call is evaluated at load time iff no ancestor is function-like.
  // No brace counting, no line seams, no multi-line blind spot ([[rules]]/cycle's own law — the
  // grammar is the theorem, a pattern that resembles it is a guess).
  // Parse the ORIGINAL text, never the comment-stripped `code`. That stripping exists for the
  // line scanner; feeding it to the parser corrupts the source, because the `//` rule also deletes
  // lines where `//` sits inside a string literal. The tree then recovers badly, function
  // boundaries are lost, and calls inside function bodies read as top-level. Measured: doing that
  // reported 14 sites in one barrel that are all inside functions. A parser does not need help
  // recognising a comment — that is what makes it a parser.
  const out: TopLevelUse[] = []
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const deferred = (n: ts.Node): boolean => {
    for (let p: ts.Node | undefined = n.parent; p; p = p.parent) {
      if (
        ts.isFunctionDeclaration(p) || ts.isFunctionExpression(p) || ts.isArrowFunction(p) ||
        ts.isMethodDeclaration(p) || ts.isConstructorDeclaration(p) ||
        ts.isGetAccessorDeclaration(p) || ts.isSetAccessorDeclaration(p)
      ) return true
      // The CLI main-guard is deferral too, and missing it cost 34 of 46 reported sites.
      //
      //     if (import.meta.url === `file://${process.argv[1]}`) { … }
      //
      // The `if` statement is at module scope, so "no function ancestor" is literally true — and
      // the wrong question. That body runs ONLY when the file is the process entry point, never on
      // import, so it cannot sit in an import cycle's dead zone: by the time a CLI entry executes,
      // every module it imported has finished initialising. A rule right in general and wrong for
      // one idiom is how the line scanner failed too; this is the same lesson at the next depth.
      if (ts.isIfStatement(p)) {
        const cond = p.expression.getText(sf)
        if (/import\.meta\.url/.test(cond) && /process\.argv/.test(cond)) return true
      }
    }
    return false
  }
  const visit = (n: ts.Node): void => {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && names.has(n.expression.text) && !deferred(n)) {
      out.push({
        file: relative(cwd, file).replace(/\\/g, '/'),
        binding: n.expression.text,
        line: sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1,
      })
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

/**
 * The tangled files that actually RUN an import at load time — the fix list, not the map.
 *
 * This is the line between "152 files are entangled" (true, and latent) and "this throws a ReferenceError"
 * (true, and live). Only files inside a real tangle are judged: a top-level call is perfectly normal when
 * nothing points back at you.
 */
export function fatalCycleUses(cwd: string = process.cwd()): TopLevelUse[] {
  const out: TopLevelUse[] = []
  // Judge each tangle against ITSELF: a binding is only dangerous if it comes from this same component.
  for (const tangle of importCycles(cwd)) {
    const within = new Set(tangle)
    for (const rel of tangle) out.push(...topLevelUses(join(cwd, rel), cwd, within))
  }
  return out.sort((a, b) => (a.file + a.binding < b.file + b.binding ? -1 : 1))
}

/**
 * Gate: ratchets. A cycle decides initialisation order, so it fails CLOSED on getting worse — the ceiling
 * drops as each ring is broken.
 */
export function assertNoNewCycles(cwd: string = process.cwd(), ceiling: number): void {
  const cycles = importCycles(cwd)
  if (cycles.length <= ceiling) return
  throw new Error(
    `✖ cycle — ${cycles.length} import loop(s) (ceiling ${ceiling}). A loop decides init order; a top-level call inside one reads a binding that does not exist yet:\n${cycles
      .slice(0, 5)
      .map((c) => '  ' + c.join('\n    → '))
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const cycles = importCycles()
  console.log(`cycle — ${cycles.length} runtime import loop(s)\n`)
  for (const c of cycles.slice(0, 10)) {
    console.log(`  ${c.length - 1} hop(s):`)
    for (const f of c) console.log(`    ${f}`)
    console.log()
  }
}

/** @index-cross.foldback child=rules/cycle parent=rules — this cross folds back into its parent. */
