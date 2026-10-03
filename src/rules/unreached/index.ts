import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'
import { memoByFingerprintOnDisk } from '@/cache/fingerprint'
import { computeDiamond, deploymentFaces } from '@/diamond'
import { importsOf } from '@/rules/cycle'
import { frozenCorpusInputs, schemaCollision } from '@/readme/compute'
import { astOf, corpusFiles } from '@/syntax/cache'

/**
 * rules/unreached — an atom of code that nothing reaches, from any entry the corpus has.
 *
 * @see ./SKILL.md
 */

export interface UnreachedAtom {
  readonly atomPath: string
  /** Why it survived every exemption — the reader should not have to re-derive this. */
  readonly reason: string
}

/** The tooling entries: the gate registry and the CLI. Reached from here is reached. */
const TOOLING_ENTRIES = ['src/rules/index.ts', 'src/cli/index.ts', 'src/cli/gate.ts', 'src/cli/doctor.ts'] as const

/** A Payload component path: `@/admin/ui/cells/SealBadgeCell`, optionally `#export`. Lowercase atom segments, any-case leaf. */
const PATH_STRING = /^@\/[a-z][a-zA-Z0-9/]*(#\w+)?$/

/**
 * The NAME door — the sixth. Payload reaches an admin component by a PATH STRING, never by an import:
 * `Cell: '@/admin/ui/cells/SealBadgeCell'` in a collection config, a `components.views` entry, the
 * generated importMap. A lexical import walk cannot see any of it, and this atom's own SKILL named
 * that gap for weeks while the census charged exactly the three atoms the strings reach —
 * `admin/ui/cells` · `admin/ui/dashboard` · `admin/ui/nav` — and the frontier ranked them above
 * every real debt. Measured 2026-10-03: 244 such literals, 150 distinct paths, 3 of 69 charged
 * atoms named by one.
 *
 * Parsed, never matched: a `ts.StringLiteral` in any position EXCEPT an import/export module
 * specifier or a dynamic `import()` argument — those are the walk's own edges and are counted there.
 * A comment quoting a path is not a string literal, so prose about a component opens nothing
 * (pinned in the test). The importMap is generated JavaScript and is parsed as such.
 */
export function nameDoor(cwd: string = process.cwd()): ReadonlySet<string> {
  const out = new Set<string>()
  const files: string[] = [...corpusFiles(cwd)]
  const importMap = join(cwd, 'src/app/(payload)/admin/importMap.js')
  if (existsSync(importMap)) files.push(importMap)
  for (const f of files) {
    let sf: ts.SourceFile
    try {
      sf = f.endsWith('.js')
        ? ts.createSourceFile(f, readFileSync(f, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
        : astOf(f)
    } catch {
      continue
    }
    const visit = (node: ts.Node): void => {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && PATH_STRING.test(node.text)) {
        const p = node.parent
        const specifier = (ts.isImportDeclaration(p) || ts.isExportDeclaration(p)) && p.moduleSpecifier === node
        const dynamic = ts.isCallExpression(p) && p.expression.kind === ts.SyntaxKind.ImportKeyword
        if (!specifier && !dynamic) out.add(node.text.slice(2).split('#')[0] as string)
      }
      ts.forEachChild(node, visit)
    }
    visit(sf)
  }
  return out
}

/** Does a path string reach this atom — the atom itself or anything under it? */
export function namedBy(atomPath: string, names: ReadonlySet<string>): boolean {
  for (const n of names) if (n === atomPath || n.startsWith(`${atomPath}/`)) return true
  return false
}

export interface Referrer {
  readonly atomPath: string
  /** The file (repo-relative) or path string that reaches the atom. */
  readonly by: string
  readonly via: 'import' | 'name'
}

const under = (rel: string, atom: string): boolean => rel === atom || rel.startsWith(`${atom}/`)
const isProof = (rel: string): boolean => /(^|\/)(test|[^/]+\.(test|spec))\.tsx?$/.test(rel)

/**
 * The INVOLUTION of the census — the same question asked from the referrer's seat.
 *
 * `unreachedAtoms` walks FORWARD from the entries and reports what no walk arrives at. This walks
 * BACKWARD from each charged atom and reports who reaches it: a file outside the charged set that
 * imports it, or a path string that names it. A charged atom WITH a referrer is a lead the involution
 * refutes — a door the forward walk does not open (a shipped barrel, a vocabulary word's import, a
 * component string) — and the frontier tags it a lie instead of ranking it as dead weight. A charged
 * atom with none holds from both seats.
 *
 * Tests and the atom's own files are not referrers: a test proves the function works, never that
 * anything asks it. `excluded` defaults to the charged set itself, so two unreached atoms importing
 * each other corroborate nothing — the mutual-loop case [[rules]]/cycle owns.
 */
export function referrersOf(
  cwd: string,
  atoms: readonly string[],
  excluded: ReadonlySet<string> = new Set(atoms),
): Referrer[] {
  const src = join(cwd, 'src')
  const out: Referrer[] = []
  const seen = new Set<string>()
  const push = (r: Referrer): void => {
    const k = `${r.atomPath}\u0000${r.by}\u0000${r.via}`
    if (!seen.has(k)) {
      seen.add(k)
      out.push(r)
    }
  }
  for (const f of corpusFiles(cwd)) {
    const rel = relative(src, f)
    if (isProof(rel) || [...excluded].some((x) => under(rel, x))) continue
    const imports = importsOf(f, cwd).map((i) => relative(src, i))
    for (const a of atoms) {
      if (imports.some((i) => under(i, a))) push({ atomPath: a, by: relative(cwd, f), via: 'import' })
    }
  }
  const names = nameDoor(cwd)
  for (const a of atoms) for (const n of names) if (under(n, a)) push({ atomPath: a, by: `@/${n}`, via: 'name' })
  return out.sort((x, y) => x.atomPath.localeCompare(y.atomPath) || x.by.localeCompare(y.by))
}

/** Every atom path reachable by imports from a set of entry files. */
export function reachedFrom(entries: readonly string[], cwd: string = process.cwd()): ReadonlySet<string> {
  const src = join(cwd, 'src')
  const roots = entries.map((e) => join(cwd, e)).filter(existsSync)
  const seen = new Set<string>(roots)
  const queue = [...roots]
  while (queue.length > 0) {
    const file = queue.shift() as string
    for (const next of importsOf(file, cwd)) {
      if (seen.has(next)) continue
      seen.add(next)
      queue.push(next)
    }
  }
  const atoms = new Set<string>()
  for (const file of seen) {
    const rel = relative(src, file)
    if (rel.startsWith('..')) continue
    const parts = rel.split('/')
    for (let i = 1; i < parts.length; i++) atoms.add(parts.slice(0, i).join('/'))
  }
  return atoms
}

/**
 * Atom paths reached by traversing at least ONE import edge from an entry.
 *
 * THE FAIL-OPEN THIS EXISTS FOR: `reachedFrom` puts its own roots in the result, and the roots
 * include every faced atom's barrel — so an atom is "reached" BY ITSELF. Measured 2026-09-20:
 * **3,046 atoms carry a deployment face**, and each one is its own door. `kyc`, minted that day
 * and imported by nothing, read as reached.
 *
 * A false negative in a gate is worse than a false positive, because it reports green over the
 * exact defect it exists for — the law this corpus learned from [[rules]]/cycle's Tarjan-free DFS,
 * restated here one gate over.
 *
 * So an atom must be reached from SOMEWHERE ELSE. Roots seed the walk and are not themselves
 * counted; only what an edge leads to is.
 *
 * **Honest boundary.** Two unreached atoms that import each other both appear reached — a mutual
 * loop satisfies "something else imports me" without either being reachable from an entry. That is
 * the [[rules]]/cycle case and is not resolved here. And an atom reached only dynamically is still
 * invisible, exactly as it is to the looser walk.
 */
export function reachedByImport(entries: readonly string[], cwd: string = process.cwd()): ReadonlySet<string> {
  const src = join(cwd, 'src')
  const roots = entries.map((e) => join(cwd, e)).filter(existsSync)
  const seen = new Set<string>(roots)
  const viaEdge = new Set<string>()
  const queue = [...roots]
  while (queue.length > 0) {
    const file = queue.shift() as string
    for (const next of importsOf(file, cwd)) {
      viaEdge.add(next)
      if (seen.has(next)) continue
      seen.add(next)
      queue.push(next)
    }
  }
  const atoms = new Set<string>()
  for (const file of viaEdge) {
    const rel = relative(src, file)
    if (rel.startsWith('..')) continue
    const parts = rel.split('/')
    for (let i = 1; i < parts.length; i++) atoms.add(parts.slice(0, i).join('/'))
  }
  return atoms
}

/**
 * The same census as `unreachedAtoms`, with the self-door closed.
 *
 * It is exported ALONGSIDE rather than replacing it, because correcting an instrument moves its
 * number and the ratchet is down-only: restating a ceiling upward is a decision for a person, not
 * a side effect of a fix ([[rules]]/slack). Run it, read the number, then decide.
 */
export function unreachedStrict(cwd: string = process.cwd()): UnreachedAtom[] {
  const src = join(cwd, 'src')
  const deployed = deploymentDoor(cwd)
  const reached = reachedByImport([...TOOLING_ENTRIES, ...deployedEntries(cwd, deployed)], cwd)
  const shipped = shippedAtoms(cwd)
  const words = schemaCollision(cwd).words
  const names = nameDoor(cwd)
  const out: UnreachedAtom[] = []
  const walk = (dir: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
      const d = join(dir, e.name)
      const hasCode = existsSync(join(d, 'index.ts')) || existsSync(join(d, 'index.tsx'))
      if (existsSync(join(d, 'SKILL.md')) && hasCode) {
        const atomPath = relative(src, d)
        const leaf = atomPath.slice(atomPath.lastIndexOf('/') + 1)
        if (!reached.has(atomPath) && !shipped.has(atomPath) && !words.has(leaf) && !namedBy(atomPath, names)) {
          out.push({ atomPath, reason: 'nothing imports or names it — the deployment face is its own door, and that door is closed here' })
        }
      }
      walk(d)
    }
  }
  walk(src)
  return out.sort((a, b) => a.atomPath.localeCompare(b.atomPath))
}

/**
 * Atom paths that appear inside a published package's `dist/types` tree.
 *
 * This is the exemption [[rules]]/unfolded names: erpax ships as `@erpax/*`, so an atom can be a
 * PUBLIC FACE with no in-repo caller. An atom shipped to consumers is reached — by them.
 */
export function shippedAtoms(cwd: string = process.cwd()): ReadonlySet<string> {
  const out = new Set<string>()
  let pkgs: import('node:fs').Dirent[]
  try {
    pkgs = readdirSync(join(cwd, 'packages'), { withFileTypes: true })
  } catch {
    return out
  }
  for (const pkg of pkgs) {
    if (!pkg.isDirectory()) continue
    const types = join(cwd, 'packages', pkg.name, 'dist', 'types')
    if (!existsSync(types)) continue
    const walk = (dir: string, base: string): void => {
      let entries: import('node:fs').Dirent[]
      try {
        entries = readdirSync(dir, { withFileTypes: true })
      } catch {
        return
      }
      for (const e of entries) {
        if (!e.isDirectory()) continue
        const path = base === '' ? e.name : `${base}/${e.name}`
        out.add(path)
        walk(join(dir, e.name), path)
      }
    }
    walk(types, '')
  }
  return out
}

/**
 * SKILL-bearing atoms with a deployment face (worker · plugin · pwa), computed by the same
 * `deploymentFaces` the LLM face prints, over one frozen corpus context. It used to PARSE that
 * face — gitignored, so a clean checkout had none, every atom read "no claim", and this axis
 * counted 0 in CI by construction. Memoised on the tree fingerprint.
 */
export function facedAtoms(cwd: string = process.cwd()): ReadonlySet<string> {
  const faced = memoByFingerprintOnDisk('rules-unreached-faced-atoms', cwd, () => {
    const { graph, ctx } = frozenCorpusInputs(cwd)
    const src = join(cwd, 'src')
    const out: string[] = []
    const walk = (dir: string): void => {
      let entries: import('node:fs').Dirent[]
      try {
        entries = readdirSync(dir, { withFileTypes: true })
      } catch {
        return
      }
      for (const e of entries) {
        if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
        const d = join(dir, e.name)
        if (existsSync(join(d, 'SKILL.md'))) {
          const path = relative(src, d)
          const model = computeDiamond({ kind: 'path', path, cwd, graph, ctx }).model
          const f = deploymentFaces(model as Parameters<typeof deploymentFaces>[0])
          if (f.worker || f.plugin || f.pwa) out.push(path)
        }
        walk(d)
      }
    }
    walk(src)
    return out.sort()
  })
  return new Set(faced)
}

/** The deployment door. A directory with no SKILL.md is not an atom and never had a face — it stays
 *  a reach seed, exactly as before. */
const deploymentDoor = (cwd: string): ((dir: string) => boolean) => {
  const src = join(cwd, 'src')
  const faced = facedAtoms(cwd)
  return (dir) => !existsSync(join(dir, 'SKILL.md')) || faced.has(relative(src, dir))
}

/**
 * Code atoms nothing reaches — after every exemption the corpus recognises.
 *
 * Five doors are tried before an atom is named, because each is a legitimate way to be reached or a
 * legitimate reason not to need reaching: a deployment face (worker/plugin/pwa), the gate registry,
 * the CLI, a published package's public face, and being a schema.org VOCABULARY word — whose barrel
 * exists only to name the word, so charging it is the category error the seal already fixed once.
 * What is left is code that no entry in this repository, no deployed surface and no shipped package
 * reaches, and that is not a word.
 *
 * **Honest boundary.** This is a CANDIDATE list, never a purge list — the same boundary
 * [[rules]]/unfolded carries, and for the same reason. An atom reached only dynamically (a path
 * string in a config, an `importMap` entry, a `relationTo` slug) is invisible to a lexical import
 * walk, and Payload reaches admin components exactly that way. It proves nothing IMPORTS the atom;
 * a human decides whether that means wire it or drop it.
 */
/**
 * Barrels of every atom that HAS a deployment face — the entries a deployed surface reaches from.
 *
 * The door was checked per-atom and never propagated: an atom whose only door is "a deployed atom
 * imports it" read as unreached. `xml/escape` is the plain case — three exporters that DO carry a
 * face import it, and it was charged anyway. 9 of the 78 were that, which makes this a widening of
 * the question rather than a loosening of the answer ([[rules]]/domain: a law reaches exactly the
 * cases its checker opens).
 */
function deployedEntries(cwd: string, deployed: (dir: string) => boolean): string[] {
  const src = join(cwd, 'src')
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
      const d = join(dir, e.name)
      if (deployed(d)) {
        for (const n of ['index.ts', 'index.tsx']) {
          const f = join(d, n)
          if (existsSync(f)) out.push(relative(cwd, f))
        }
      }
      walk(d)
    }
  }
  walk(src)
  return out
}

export function unreachedAtoms(cwd: string = process.cwd()): UnreachedAtom[] {
  const src = join(cwd, 'src')
  const deployed = deploymentDoor(cwd)
  const tooling = reachedFrom([...TOOLING_ENTRIES, ...deployedEntries(cwd, deployed)], cwd)
  const shipped = shippedAtoms(cwd)
  const words = schemaCollision(cwd).words
  const names = nameDoor(cwd)
  const out: UnreachedAtom[] = []
  const walk = (dir: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(dir, e.name)
      const hasCode = existsSync(join(p, 'index.ts')) || existsSync(join(p, 'index.tsx'))
      if (existsSync(join(p, 'SKILL.md')) && hasCode) {
        const atomPath = relative(src, p)
        const leaf = atomPath.slice(atomPath.lastIndexOf('/') + 1)
        if (!deployed(p) && !tooling.has(atomPath) && !shipped.has(atomPath) && !words.has(leaf) && !namedBy(atomPath, names)) {
          out.push({ atomPath, reason: 'no deployment face · not reached from the gate or CLI · not shipped · not a vocabulary word · not named by a path string' })
        }
      }
      walk(p)
    }
  }
  walk(src)
  return out.sort((a, b) => a.atomPath.localeCompare(b.atomPath))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const bad = unreachedAtoms()
  console.log(`rules/unreached — ${bad.length} code atom(s) reached by nothing`)
  for (const a of bad) console.log(`  ${a.atomPath}`)
}

/** @index-cross.foldback child=rules/unreached parent=rules — this cross folds back into its parent. */

/** One unreached atom and how many others wiring it would reach. */
export interface Leverage {
  readonly atom: string
  /** The atom itself plus every unreached atom its barrel pulls in, transitively. */
  readonly closes: number
}

/**
 * What wiring ONE unreached atom would close. See SKILL.md.
 *
 * The obvious hypothesis is a chain — reach a root and the rest follow. It is refuted:
 * 63 of 69 close only themselves.
 */
export function atomLeverage(cwd: string = process.cwd()): Leverage[] {
  const atoms = unreachedAtoms(cwd).map((a) => a.atomPath)
  const set = new Set(atoms)
  const barrelOf = (a: string): string => {
    const ts = join(cwd, 'src', a, 'index.ts')
    return existsSync(ts) ? ts : join(cwd, 'src', a, 'index.tsx')
  }
  const edges = new Map<string, Set<string>>()
  for (const a of atoms) {
    const out = new Set<string>()
    const f = barrelOf(a)
    if (existsSync(f)) {
      for (const dep of importsOf(f, cwd)) {
        const m = /^src\/(.+)\/index\.tsx?$/.exec(dep.slice(cwd.length + 1))
        const child = m?.[1]
        if (child !== undefined && child !== a && set.has(child)) out.add(child)
      }
    }
    edges.set(a, out)
  }
  const closes = (a: string): number => {
    const seen = new Set<string>()
    const stack = [a]
    while (stack.length > 0) {
      const x = stack.pop() as string
      if (seen.has(x)) continue
      seen.add(x)
      for (const d of edges.get(x) ?? []) if (!seen.has(d)) stack.push(d)
    }
    return seen.size
  }
  return atoms
    .map((atom) => ({ atom, closes: closes(atom) }))
    .sort((x, y) => y.closes - x.closes || x.atom.localeCompare(y.atom))
}
