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
import { readFileSync, existsSync, readdirSync, type Dirent } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|catalogue\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$|\.test\.tsx?$/

/** A runtime import edge: `import type` is erased, so it is not one. */
const RUNTIME_IMPORT = /(?:^|\n)\s*(?:import|export)(?!\s+type\b)[\s\S]*?from\s+'([^']+)'/g

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
    text = readFileSync(file, 'utf8')
  } catch {
    return []
  }
  const code = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
  const out: string[] = []
  for (const m of code.matchAll(RUNTIME_IMPORT)) {
    const r = resolveSpec(cwd, file, m[1]!)
    if (r && !GENERATED.test(r)) out.push(r)
  }
  return out
}

const sources = (root: string): string[] => {
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (/\.tsx?$/.test(e.name) && !GENERATED.test(p) && !IS_TEST.test(p)) out.push(p)
    }
  }
  walk(root)
  return out
}

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
          low.set(node, Math.min(low.get(node)!, index.get(w)!))
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
      if (parent) low.set(parent.node, Math.min(low.get(parent.node)!, low.get(node)!))
    }
  }

  for (const f of files) if (!index.has(f)) strongConnect(f)
  return out.sort((a, b) => b.length - a.length)
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
