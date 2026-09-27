import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import ts from 'typescript'
import { astOf, corpusFiles } from '@/syntax/cache'
import { join } from 'node:path'

/**
 * rules/command — a command that runs must point at something that exists.
 *
 * Scope is REACHABILITY: the closure of what CI, the git hooks and package.json actually invoke. A
 * file nothing runs cannot fail open, because it never runs.
 *
 * @see ./SKILL.md — the gate that failed open for weeks, and the three ways this instrument was
 *   wrong on its own first run.
 */

export interface DeadCommand {
  /** The file holding the reference — one that something actually runs. */
  readonly from: string
  /** The path it names, which does not exist. */
  readonly target: string
  /** How `from` is reached: the entry point, then the chain to it. */
  readonly reachedBy: readonly string[]
}

/** Where a run begins. Everything judged is reachable from one of these. */
const ENTRY_FILES = ['package.json', '.husky/pre-commit', '.husky/pre-push', '.claude/settings.json'] as const
const ENTRY_DIRS = ['.github/workflows'] as const

/** A repo-relative source path. The trailing guard stops `released.json` matching `released.js`. */
const PATH_LITERAL =
  /(?<![\w.\-/])((?:src|scripts|packages)\/[A-Za-z0-9_./-]+\.(?:tsx|ts|mjs|cjs|js|sh))(?![A-Za-z0-9])/g

/** A comment names a path; it does not run one. */
const stripComments = (text: string, rel: string): string =>
  /\.sh$/.test(rel) || rel.startsWith('.husky/')
    ? text.replace(/(^|\s)#[^\n]*/g, '$1')
    : text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"\\])\/\/[^\n]*/g, '$1')

/** A shell path behind `[ -f … ]` is a CONDITIONAL, not a command. */
const guarded = (text: string, target: string): boolean =>
  new RegExp(`\\[\\s+-[a-z]\\s+${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s`).test(text)

/** A record of the past is not an invocation: a generated face names what a wave once touched. */
const isRecord = (rel: string): boolean => /\.generated\.|\.lock$|\.md$/.test(rel)

/** A RUNNER names paths to execute; a `.ts` module's paths are [[rules]]/reference's population. */
const isRunner = (rel: string): boolean => /\.(mjs|cjs|js|sh|ya?ml|json)$/.test(rel) || rel.startsWith('.husky/')

const readIfPresent = (root: string, rel: string): string | null => {
  const p = join(root, rel)
  try {
    return statSync(p).isFile() ? readFileSync(p, 'utf8') : null
  } catch {
    return null
  }
}

const entryPoints = (root: string): string[] => {
  const out: string[] = [...ENTRY_FILES]
  for (const d of ENTRY_DIRS) {
    try {
      for (const f of readdirSync(join(root, d))) if (/\.ya?ml$/.test(f)) out.push(`${d}/${f}`)
    } catch {
      /* the directory need not exist */
    }
  }
  return out.filter((f) => existsSync(join(root, f)))
}

/**
 * Every dead path named by something the repo actually runs.
 *
 * The closure is walked breadth-first from the entry points: an entry names a script, that script
 * names another, and a dead path anywhere along that chain is a command that cannot run.
 */
export function deadCommands(cwd: string = process.cwd()): DeadCommand[] {
  const reached = new Map<string, string[]>()
  const queue: string[] = []
  for (const e of entryPoints(cwd)) {
    reached.set(e, [e])
    queue.push(e)
  }

  const dead: DeadCommand[] = []
  while (queue.length) {
    const from = queue.shift()!
    const raw = readIfPresent(cwd, from)
    if (raw === null) continue
    const text = stripComments(raw, from)
    const chain = reached.get(from)!
    for (const m of text.matchAll(PATH_LITERAL)) {
      const target = m[1]!
      if (existsSync(join(cwd, target))) {
        // a runnable file joins the closure; a record does not name what to run
        if (!reached.has(target) && !isRecord(target) && isRunner(target)) {
          reached.set(target, [...chain, target])
          queue.push(target)
        }
        continue
      }
      if (isRecord(from)) continue
      if (guarded(raw, target)) continue
      if (dead.some((d) => d.from === from && d.target === target)) continue
      dead.push({ from, target, reachedBy: chain })
    }
  }
  return dead.sort((a, b) => a.from.localeCompare(b.from) || a.target.localeCompare(b.target))
}

/**
 * Zero is a THEOREM, not a ratchet.
 *
 * There is no acceptable number of commands that cannot run: each one is a check that reports
 * nothing while appearing to be enforced.
 */
export function assertCommandsResolve(cwd: string = process.cwd()): void {
  const dead = deadCommands(cwd)
  if (dead.length === 0) return
  throw new Error(
    `✖ command — ${dead.length} path(s) named by something that RUNS do not exist:\n` +
      dead.map((d) => `  ${d.from} → ${d.target}\n      reached by ${d.reachedBy.join(' → ')}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dead = deadCommands()
  console.log(`command — ${dead.length} dead path(s) reachable from what actually runs`)
  for (const d of dead) console.log(`  ${d.from} → ${d.target}\n      ${d.reachedBy.join(' → ')}`)
  process.exitCode = dead.length === 0 ? 0 : 1
}

/**
 * A path a RUNTIME LOADER names — `require`, `requireFromHere`, a dynamic `import()` — that does
 * not exist. See ./SKILL.md § the runtime loader.
 */
export interface DeadLoaderPath {
  readonly file: string
  readonly line: number
  readonly target: string
  /** The callee that would load it, e.g. `requireFromHere`. */
  readonly loader: string
}

/** The calls that LOAD. A path handed to one of these is a step, not a citation. */
const LOADERS = ['require', 'requireFromHere', 'import'] as const

/**
 * Every `src/…` path handed to a runtime loader that does not exist.
 *
 * This is the population neither existing gate covered, and that is why it rotted: `deadCommands`
 * scopes itself to what CI, the hooks and package.json reach, and delegates a `.ts` module's paths
 * to [[rules]]/reference — which reads PROSE and COMMENTS. A path inside a string literal passed to
 * `requireFromHere` is in neither, so `consistency/apply` pointed thirteen references at a dissolved
 * tree and only the Next dev build ever said so.
 *
 * Parsed, never matched, and two refusals keep it at zero noise:
 *
 * - **A comment is not a call.** `ts.Identifier` and `ts.StringLiteral` nodes cannot occur inside a
 *   comment, so the grammar excludes prose for free — the refusal [[rules]]/confine, [[rules]]/bypass
 *   and [[rules]]/unfolded each paid for separately.
 * - **An INTERPOLATED path is not decidable.** `join(root, `src/${area}/x.ts`)` names a family, not a
 *   file; reporting it would be a guess. Only a plain string literal is judged.
 *
 * @invariant a path inside a comment or a template with substitutions is never a finding
 */
export function deadLoaderPaths(cwd: string = process.cwd()): DeadLoaderPath[] {
  const out: DeadLoaderPath[] = []
  const prefix = `${cwd}/`
  for (const abs of corpusFiles(cwd)) {
    if (!abs.endsWith('.ts') && !abs.endsWith('.tsx')) continue
    const rel = abs.startsWith(prefix) ? abs.slice(prefix.length) : abs
    if (/(^|\/)test\.tsx?$/.test(rel) || rel.startsWith('src/rules/command/')) continue
    const src = astOf(abs)
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const callee = ts.isIdentifier(node.expression)
          ? node.expression.text
          : node.expression.kind === ts.SyntaxKind.ImportKeyword
            ? 'import'
            : ''
        if ((LOADERS as readonly string[]).includes(callee)) {
          for (const target of pathLiteralsIn(node.arguments)) {
            if (!existsSync(join(cwd, target))) {
              const line = src.getLineAndCharacterOfPosition(node.getStart(src)).line + 1
              out.push({ file: rel, line, target, loader: callee })
            }
          }
        }
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(src, visit)
  }
  return out
}

/** Repo-relative `src/…` string literals in an argument list, including inside a `join(…)`. */
function pathLiteralsIn(args: ts.NodeArray<ts.Expression>): string[] {
  const found: string[] = []
  const walk = (n: ts.Node): void => {
    if (ts.isStringLiteral(n) && /^(?:src|scripts|packages)\/[A-Za-z0-9_./-]+\.(?:tsx|ts|mjs|cjs|js)$/.test(n.text)) {
      found.push(n.text)
    }
    ts.forEachChild(n, walk)
  }
  for (const a of args) walk(a)
  return found
}

/**
 * Fails closed. Zero is a **theorem**: a loader handed a path that does not exist throws where it
 * runs, and every one of these sat behind a bare `catch {}` that turned the throw into a clean
 * summary.
 */
export function assertLoaderPathsResolve(cwd: string = process.cwd(), ceiling = 0): void {
  const dead = deadLoaderPaths(cwd)
  if (dead.length <= ceiling) return
  const lines = dead.map((d) => `  ${d.file}:${d.line} ${d.loader}('${d.target}') — no such file`)
  throw new Error(`rules/command — ${dead.length} dead loader path(s), ceiling ${ceiling}:\n${lines.join('\n')}`)
}
