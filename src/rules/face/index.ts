/**
 * face — the set of names an atom offers at `@/atom`.
 *
 * A refactor may move matter anywhere it likes; what it may NOT do is quietly
 * stop offering a name. Four of the five facade defects this corpus has paid
 * for were exactly that — a split that emptied one side and left the barrel
 * pointing at the husk.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

import ts from 'typescript'

/** Generated faces restate every symbol, so they are not evidence. */
const GENERATED = /payload-types|skills\.index|\.d\.ts$/

function parse(file: string): ts.SourceFile | undefined {
  try {
    return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
  } catch {
    return undefined
  }
}

/** Resolve a relative specifier the way the bundler does — `./x` reaches `./x/index.ts`. */
export function resolveModule(from: string, spec: string): string | undefined {
  if (!spec.startsWith('.')) return undefined
  const base = resolve(dirname(from), spec)
  for (const candidate of [
    `${base}.ts`,
    `${base}.tsx`,
    join(base, 'index.ts'),
    join(base, 'index.tsx'),
    `${base}.d.ts`,
  ])
    if (existsSync(candidate)) return candidate
  return undefined
}

/**
 * Every name a module offers — local declarations, `export default`, named
 * re-exports, namespace re-exports, and transitively through `export *`.
 */
export function exportedNames(file: string, seen: Set<string> = new Set()): Set<string> {
  const names = new Set<string>()
  if (seen.has(file)) return names
  seen.add(file)
  const src = parse(file)
  if (!src) return names

  const visit = (node: ts.Node): void => {
    const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
    if (mods?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      if (mods.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) names.add('default')
      if (
        (ts.isFunctionDeclaration(node) ||
          ts.isClassDeclaration(node) ||
          ts.isInterfaceDeclaration(node) ||
          ts.isTypeAliasDeclaration(node) ||
          ts.isEnumDeclaration(node) ||
          ts.isModuleDeclaration(node)) &&
        node.name &&
        ts.isIdentifier(node.name)
      )
        names.add(node.name.text)
      else if (ts.isVariableStatement(node))
        for (const d of node.declarationList.declarations)
          if (ts.isIdentifier(d.name)) names.add(d.name.text)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(src, visit)

  for (const st of src.statements) {
    if (ts.isExportAssignment(st)) {
      names.add('default')
      continue
    }
    if (!ts.isExportDeclaration(st)) continue
    if (st.exportClause && ts.isNamedExports(st.exportClause)) {
      // A named re-export only offers a name if its target actually binds it.
      // Counting it unverified is how a phantom reads as present.
      const target =
        st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier)
          ? resolveModule(file, st.moduleSpecifier.text)
          : undefined
      const offered = target ? exportedNames(target, new Set(seen)) : undefined
      for (const e of st.exportClause.elements) {
        const origin = (e.propertyName ?? e.name).text
        if (!offered || offered.has(origin)) names.add(e.name.text)
      }
      continue
    }
    if (st.exportClause && ts.isNamespaceExport(st.exportClause)) {
      names.add(st.exportClause.name.text)
      continue
    }
    if (!st.exportClause && st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier)) {
      const target = resolveModule(file, st.moduleSpecifier.text)
      if (target) for (const n of exportedNames(target, seen)) names.add(n)
    }
  }
  return names
}

/** The public face of one atom — what `import { … } from '@/<atom>'` can name. */
export function faceOf(atom: string, cwd: string = process.cwd()): readonly string[] {
  const entry = join(cwd, 'src', atom, 'index.ts')
  if (!existsSync(entry)) return []
  return [...exportedNames(entry)].sort()
}

export type CorpusFace = Record<string, readonly string[]>

/** Every atom's face, in one pass — the snapshot a refactor is measured against. */
export function corpusFace(cwd: string = process.cwd()): CorpusFace {
  const found = execSync('find src -name index.ts', { cwd, encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter((f) => f && !GENERATED.test(f))
  const face: Record<string, readonly string[]> = {}
  for (const file of found) {
    const atom = file.replace(/^src\//, '').replace(/\/index\.ts$/, '')
    if (atom === 'src' || atom === file) continue
    const names = [...exportedNames(join(cwd, file))].sort()
    if (names.length > 0) face[atom] = names
  }
  return face
}

export interface FaceLoss {
  readonly atom: string
  /** names the atom used to offer and no longer does */
  readonly lost: readonly string[]
}

/**
 * Names dropped between two snapshots. Gained names are not reported: an atom
 * may always offer MORE. Only a loss can break a caller.
 */
export function faceLosses(before: CorpusFace, after: CorpusFace): readonly FaceLoss[] {
  const losses: FaceLoss[] = []
  for (const [atom, names] of Object.entries(before)) {
    const now = new Set(after[atom] ?? [])
    const lost = names.filter((n) => !now.has(n))
    if (lost.length > 0) losses.push({ atom, lost })
  }
  return losses
}

/** Fail closed on any dropped name. Zero is a theorem here, not a ratchet. */
export function assertFacePreserved(before: CorpusFace, after: CorpusFace): void {
  const losses = faceLosses(before, after)
  if (losses.length === 0) return
  const detail = losses.map((l) => `  @/${l.atom} lost ${l.lost.join(', ')}`).join('\n')
  throw new Error(`✖ face law: ${losses.length} atom(s) stopped offering a name:\n${detail}`)
}

/**
 * The face of the tree at a git ref, read through a throwaway worktree.
 * Nothing is stored: the baseline is recomputed from history on demand.
 */
export function faceAtRef(ref: string, cwd: string = process.cwd()): CorpusFace {
  const at = execSync('mktemp -d', { encoding: 'utf8' }).trim()
  try {
    execSync(`git worktree add -q --detach ${at} ${ref}`, { cwd, stdio: 'pipe' })
    return corpusFace(at)
  } finally {
    try {
      execSync(`git worktree remove --force ${at}`, { cwd, stdio: 'pipe' })
    } catch {
      execSync(`rm -rf ${at}`, { stdio: 'pipe' })
    }
  }
}

/** The ring a refactor runs inside: what the working tree no longer offers versus a ref. */
export function faceRing(ref: string, cwd: string = process.cwd()): readonly FaceLoss[] {
  return faceLosses(faceAtRef(ref, cwd), corpusFace(cwd))
}

/**
 * What a gate should compare against with no argument: the point this work
 * forked from what is already published. `HEAD` is the wrong default for a
 * gate — on a committed tree it is trivially empty, so it would report green
 * over every refactor the branch contains.
 */
export function baseRef(cwd: string = process.cwd()): string {
  for (const upstream of ['origin/main', 'main']) {
    try {
      const base = execSync(`git merge-base HEAD ${upstream}`, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim()
      if (base) return base
    } catch {
      continue
    }
  }
  return 'HEAD'
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const ref = process.argv[2] ?? baseRef()
  const losses = faceRing(ref)
  const dropped = losses.reduce((sum, l) => sum + l.lost.length, 0)
  console.log(`face ring vs ${ref} — ${losses.length} atom(s) stopped offering a name (${dropped} name(s))`)
  for (const l of losses) console.log(`  @/${l.atom}  lost ${l.lost.join(', ')}`)
  if (losses.length > 0) process.exitCode = 1
}
