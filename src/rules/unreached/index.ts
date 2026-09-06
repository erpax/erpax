import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { importsOf } from '@/rules/cycle'
import { schemaCollision } from '@/readme/compute'

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

/** Does this atom's LLM face report a deployment face (worker · plugin · pwa)? */
const hasDeploymentFace = (dir: string): boolean => {
  let text = ''
  try {
    text = readFileSync(join(dir, 'LLM.md'), 'utf8')
  } catch {
    return true // no face computed ⇒ nothing to claim; do not charge on absence of evidence
  }
  const m = /faces worker·plugin·pwa `?(\d)`?·`?(\d)`?·`?(\d)`?/.exec(text)
  if (m === null) return true
  return m[1] !== '0' || m[2] !== '0' || m[3] !== '0'
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
function deployedEntries(cwd: string): string[] {
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
      if (hasDeploymentFace(d)) {
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
  const tooling = reachedFrom([...TOOLING_ENTRIES, ...deployedEntries(cwd)], cwd)
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
        if (!hasDeploymentFace(p) && !tooling.has(atomPath) && !shipped.has(atomPath) && !words.has(leaf)) {
          out.push({ atomPath, reason: 'no deployment face · not reached from the gate or CLI · not shipped · not a vocabulary word' })
        }
      }
      walk(p)
    }
  }
  walk(src)
  return out.sort((a, b) => a.atomPath.localeCompare(b.atomPath))
}

/** Fails closed on getting worse. Ratchets down as each atom is wired or dropped. */
export function assertNoNewUnreached(cwd: string = process.cwd(), ceiling: number): void {
  const bad = unreachedAtoms(cwd)
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ rules/unreached — ${bad.length} code atom(s) nothing reaches (ceiling ${ceiling}):\n` +
      bad.slice(0, 20).map((a) => `  ${a.atomPath}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const bad = unreachedAtoms()
  console.log(`rules/unreached — ${bad.length} code atom(s) reached by nothing`)
  for (const a of bad) console.log(`  ${a.atomPath}`)
}

/** @index-cross.foldback child=rules/unreached parent=rules — this cross folds back into its parent. */
