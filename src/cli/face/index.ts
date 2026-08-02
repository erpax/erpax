/**
 * cli/face — the command surface, DERIVED from the tree rather than transcribed into a table.
 *
 * The registry was a hand-written map: one entry per command, added by whoever remembered to add
 * it. That is bounded work at ten atoms and unbounded work at three thousand — and the failure mode
 * is silent, because an atom nobody registered is simply not there. Four atoms built in one session
 * were unreachable until someone typed four lines, which is the whole argument: **a face you have to
 * remember to declare is a face that will be missing.**
 *
 * So the face is computed. An atom is runnable exactly when its `index.ts` carries a CLI guard —
 * `if (import.meta.url === \`file://${process.argv[1]}\`)` — and that fact is read from the
 * **grammar**, not matched with a pattern. The corpus has paid for the difference: a regex over
 * TypeScript was wrong in 115 of 6,203 files ([[rules]]/cycle), and a guard mentioned in a doc
 * comment is a comment, not a command ([[rules]]/confine flagged exactly that class of false
 * positive once already).
 *
 * The description comes from the atom's own `SKILL.md` frontmatter, which every atom already has by
 * [[law]]/folder. Nothing is typed twice: the trinity is the source, and the help text is a view of
 * it. Add an atom with a CLI guard and it is a command on the next run — no registry edit, no
 * ceremony, no chance of forgetting.
 *
 * @law the command surface is derived from the tree — an atom with a CLI guard IS a command, and a
 *      face that must be remembered into a table is a face that will be missing.
 * @invariant a guard inside a comment or a string is NOT a face — the grammar decides, never a match
 * @invariant every derived face names an atom whose index.ts exists at the path it reports
 * @invariant derivation never overrides a hand-written entry — explicit beats implicit
 * @see ./SKILL.md -- ../registry.ts -- ../../rules/cycle
 */
import { existsSync, readFileSync, readdirSync, type Dirent } from 'node:fs'
import { join, relative, sep } from 'node:path'

import ts from 'typescript'

export interface DerivedFace {
  /** the atom path, which is also the command name — `agent/receipt` runs as `erpax agent/receipt` */
  readonly atomPath: string
  /** the file to run */
  readonly file: string
  /** one line of help, read from the atom's own SKILL.md frontmatter */
  readonly desc: string
}

/**
 * Does this module carry a CLI guard? PARSED.
 *
 * The shape sought is an `if` whose condition compares `import.meta.url` to something. Reading it
 * from the AST means a guard quoted in a doc comment, a template string, or a disabled block cannot
 * masquerade as one — the parser knows the difference between code and text, and a pattern does not.
 */
export function hasCliFace(file: string, text: string): boolean {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  let found = false

  const mentionsImportMetaUrl = (node: ts.Node): boolean => {
    if (
      ts.isPropertyAccessExpression(node) &&
      node.name.text === 'url' &&
      ts.isMetaProperty(node.expression) &&
      node.expression.keywordToken === ts.SyntaxKind.ImportKeyword
    ) {
      return true
    }
    return node.getChildren(source).some(mentionsImportMetaUrl)
  }

  const visit = (node: ts.Node): void => {
    if (found) return
    if (ts.isIfStatement(node) && mentionsImportMetaUrl(node.expression)) {
      found = true
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return found
}

/** The atom's own one-line description, read from its SKILL.md frontmatter. */
export function descriptionOf(atomDir: string): string {
  const skill = join(atomDir, 'SKILL.md')
  if (!existsSync(skill)) return ''
  const text = readFileSync(skill, 'utf8')
  const match = /^description:\s*"?([\s\S]*?)"?\s*$/m.exec(text)
  if (!match?.[1]) return ''
  // the frontmatter description is a paragraph; the help line is its first sentence
  const first = match[1].split(/(?<=\.)\s|\s—\s/)[0] ?? match[1]
  return first.trim().slice(0, 140)
}

const SKIP_DIRS = new Set(['node_modules', 'worktrees', 'skills', '.next', 'app'])

/**
 * Every atom that IS a command, found by walking the tree.
 *
 * Sorted by path so the help output is stable — an unstable listing is a diff nobody can read.
 */
export function derivedCliFaces(cwd: string = process.cwd()): readonly DerivedFace[] {
  const root = join(cwd, 'src')
  const out: DerivedFace[] = []

  const walk = (dir: string): void => {
    // @types/node (Node 24) made bare `Dirent` default to `Dirent<Buffer>`; `readdirSync` with
    // `withFileTypes` and no encoding returns `Dirent<string>[]`, so annotate the string variant —
    // else `entry.name` is a Buffer and loses `.startsWith`/string comparison.
    let entries: Dirent<string>[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue
        walk(join(dir, entry.name))
        continue
      }
      if (entry.name !== 'index.ts') continue
      const file = join(dir, entry.name)
      let text: string
      try {
        text = readFileSync(file, 'utf8')
      } catch {
        continue
      }
      if (!hasCliFace(file, text)) continue
      out.push({
        atomPath: relative(root, dir).split(sep).join('/'),
        file: relative(cwd, file).split(sep).join('/'),
        desc: descriptionOf(dir),
      })
    }
  }

  walk(root)
  return out.sort((a, b) => a.atomPath.localeCompare(b.atomPath))
}

/**
 * Merge derived faces into a hand-written registry.
 *
 * **Explicit beats implicit, always.** A hand-written entry is someone's deliberate naming — a short
 * alias, a flag, a different runner — and derivation must never quietly replace it. What derivation
 * closes is the gap where nobody wrote anything at all.
 *
 * @invariant an atomPath already present in the registry is left exactly as it was
 */
export function mergeDerivedFaces<T extends Record<string, unknown>>(
  registry: Record<string, T>,
  faces: readonly DerivedFace[],
  make: (face: DerivedFace) => T,
): Record<string, T> {
  const merged: Record<string, T> = { ...registry }
  for (const face of faces) {
    if (merged[face.atomPath] !== undefined) continue
    merged[face.atomPath] = make(face)
  }
  return merged
}
