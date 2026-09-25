import { existsSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { memoByFingerprintOnDisk } from '@/cache/fingerprint'
import { computeDiamond, deploymentFaces } from '@/diamond'
import { importsOf } from '@/rules/cycle'
import { frozenCorpusInputs, schemaCollision } from '@/readme/compute'

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
        if (!reached.has(atomPath) && !shipped.has(atomPath) && !words.has(leaf)) {
          out.push({ atomPath, reason: 'nothing imports it — the deployment face is its own door, and that door is closed here' })
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
        if (!deployed(p) && !tooling.has(atomPath) && !shipped.has(atomPath) && !words.has(leaf)) {
          out.push({ atomPath, reason: 'no deployment face · not reached from the gate or CLI · not shipped · not a vocabulary word' })
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
