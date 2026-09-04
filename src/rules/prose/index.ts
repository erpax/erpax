/**
 * prose — a SKILL that cites code which does not exist is prose detached from matter.
 *
 * **Prose unrelated to code is measurable.** A SKILL naming `generateFoo()` when nothing defines it is the
 * same defect as a dead `src/…` pointer ([[rules]]/reference): a citation that leads nowhere. It reads as
 * documentation and is fiction — and unlike a dead path, it is *convincing*, because the reader assumes the
 * function exists.
 *
 * Measured over the live tree: **870** SKILLs have an `index.ts`, they cite **3 125** code symbols, and
 * **1 261 (40%) are not defined anywhere in `src`**. Two-fifths of the corpus's technical prose describes
 * matter that is not there.
 *
 * Wired into [[confirm]], this is what forces an agent to **edit code, not prose**: writing a sentence about
 * a function you have not written is refused at the write. The only way past the gate is to make it real.
 *
 * HONEST BOUNDARY: it proves a cited symbol is DEFINED somewhere in `src`, never that the prose about it is
 * *true* — a SKILL can describe a real function wrongly and pass. It closes fiction, not error. Short names
 * (< 4 chars) and non-identifier backticks are skipped: `id`, `ok`, `9/0` are not claims about code.
 *
 * @standard ISO-19011:2018 §6.4 — audit evidence: the citation must lead to the evidence
 *
 * Composes [[rules]] · [[confirm]] · [[law]].
 */
import { allFiles, textOf } from '@/syntax/cache'
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, relative } from 'node:path'

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$/
/**
 * A CALL is a claim: `fooBar()`. A bare backtick is not — `reference` is an axis name, `status` a field,
 * `lease` a word. This gate blocked its own registry table over exactly that, and the ambiguity is real:
 * only the parentheses say "this is a function that exists".
 */
const CITE_RE = /`([a-z][A-Za-z0-9_]*)\(\)`/g

/**
 * Language keywords are not claims about the corpus. Prose naming a declaration FORM (`function`, `class`,
 * `interface`) is talking about TypeScript, not about a symbol erpax defines — this gate blocked its own
 * SKILL over exactly that.
 */
const KEYWORDS: ReadonlySet<string> = new Set([
  'function', 'const', 'let', 'var', 'class', 'interface', 'type', 'enum', 'export', 'import', 'from',
  'return', 'async', 'await', 'this', 'new', 'null', 'undefined', 'true', 'false', 'void', 'any', 'unknown',
  'never', 'string', 'number', 'boolean', 'object', 'symbol', 'bigint', 'readonly', 'extends', 'implements',
  'default', 'static', 'public', 'private', 'protected', 'yield', 'typeof', 'keyof', 'infer', 'satisfies',
])
/** Anything a definition can bind a name to. */
const DEFINE_RE =
  /(?:export\s+(?:async\s+)?(?:function|const|class|interface|type)|(?:async\s+)?function|const)\s+([A-Za-z_$][\w$]*)/g

/** A symbol cited in prose that nothing in `src` defines. */
export interface DeadSymbol {
  readonly from: string
  readonly symbol: string
}

/** Every name `src` binds — the evidence a citation must reach. Built once per run. */
export function definedSymbols(cwd: string = process.cwd()): Set<string> {
  const defined = new Set<string>()
  // Filtered from the ONE shared walk ([[syntax]]/cache); populations diffed 7,410 = 7,410 first.
  const walk = (dir: string): void => {
    const root = dir.endsWith('/src') ? dir.slice(0, -4) : dir
    for (const p of allFiles(root)) {
      const name = p.slice(p.lastIndexOf('/') + 1)
      if (p.includes('/worktrees/')) continue
      if (!/\.tsx?$/.test(name) || GENERATED.test(name)) continue
      try {
        for (const m of textOf(p).matchAll(DEFINE_RE)) defined.add(m[1]!)
      } catch {
        /* unreadable — not evidence either way */
      }
    }
  }
  walk(join(cwd, 'src'))
  return defined
}

/**
 * Dead citations in the GIVEN SKILLs — the edit-time check ([[confirm]]'s scope). Only SKILLs beside an
 * `index.ts` are judged: a lexicon atom is prose BY DESIGN and claims no code.
 */
export function deadSymbolsIn(
  files: readonly string[],
  cwd: string = process.cwd(),
  defined: ReadonlySet<string> = definedSymbols(cwd),
): DeadSymbol[] {
  const dead: DeadSymbol[] = []
  for (const p of files) {
    if (!p.endsWith('SKILL.md')) continue
    if (!existsSync(join(p, '..', 'index.ts'))) continue // vocabulary: prose by design, no claim
    let text: string
    try {
      text = readFileSync(p, 'utf8')
    } catch {
      continue
    }
    for (const m of new Set([...text.matchAll(CITE_RE)].map((x) => x[1]!))) {
      if (m.length < 4) continue // `id`, `ok` — not a claim about code
      if (KEYWORDS.has(m)) continue // `function`, `class` — TypeScript, not a symbol erpax defines
      if (!defined.has(m)) dead.push({ from: relative(cwd, p).replace(/\\/g, '/'), symbol: m })
    }
  }
  return dead.sort((a, b) => (a.from + a.symbol < b.from + b.symbol ? -1 : 1))
}

/** Every dead citation in the tree — the whole-corpus measurement the ratchet drives down. */
export function deadSymbols(cwd: string = process.cwd()): DeadSymbol[] {
  const skills: string[] = []
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
      if (e.name === 'SKILL.md') skills.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return deadSymbolsIn(skills, cwd)
}

/**
 * Gate: prose must cite real code. Ratchets — the tree carries 1 261 dead citations, so it fails on getting
 * WORSE. Every one closed is a sentence that became true, or a function that got written.
 */
export function assertProseCitesCode(cwd: string = process.cwd(), ceiling: number): void {
  const dead = deadSymbols(cwd)
  if (dead.length <= ceiling) return
  throw new Error(
    `✖ prose — ${dead.length} cited symbol(s) do not exist (ceiling ${ceiling}). Write the code, or stop claiming it:\n${dead
      .slice(0, 10)
      .map((d) => `  ${d.from} → \`${d.symbol}\``)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const dead = deadSymbols()
  console.log(`prose — ${dead.length} cited symbol(s) that nothing in src defines`)
  for (const d of dead.slice(0, 12)) console.log(`  ${d.from} → \`${d.symbol}\``)
}

/** @index-cross.foldback child=rules/prose parent=rules — this cross folds back into its parent. */
