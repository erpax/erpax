/**
 * mesh — one quantum mesh over the whole ERP: atoms ⊕ imports ⊕ standards, wave-schedulable.
 *
 * Three edge kinds, each from its own theorem — never a pattern:
 *   import   — module edges PARSED by the grammar ([[rules]]/cycle's importsOf), folded to atom level
 *   standard — a file's own @standard/@rfc banner read from COMMENTS ([[syntax]]) — prose addresses,
 *              string literals are data (the lie [[rules]]/reference paid for)
 *
 * The mesh is queryable both ways: standardsOf(atom) is the atom's legal surface; atomsOf(standard)
 * is the clause→code trace an inspector walks ([[rules]]/reference's telos as a graph query).
 * meshWaves levels the atom graph by wavesOf ([[theorem]]): wave count = the longest dependency
 * chain, widest wave = the corpus's parallelism. A dependency cycle cannot be levelled honestly —
 * its atoms sit in wave 0 together: THE ENTANGLED CORE IS THE GROUND STATE, named, not hidden.
 *
 *   tsx src/mesh/index.ts            # mesh census: atoms · edges · standards · wave shape
 *
 * @standard ISO/IEC 25010:2023 §5.6.2 modularity — the whole is one addressable graph
 * @audit edges parsed from source; standards read from the files' own banners — never transcribed
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { importsOf } from '@/rules/cycle'
import { commentsOf } from '@/syntax'
import { wavesOf } from '@/theorem'

const SRC = 'src'
const SKIP = new Set(['node_modules', 'app', 'migrations', 'worktrees'])
const GENERATED = /\.generated\.|skills\.index\.ts$|payload-types\.ts$/

export interface MeshEdge {
  readonly from: string
  readonly to: string
  readonly kind: 'import'
}

export interface MeshStandard {
  readonly atom: string
  readonly tag: string
  readonly id: string
}

export interface Mesh {
  readonly atoms: readonly string[]
  readonly edges: readonly MeshEdge[]
  readonly standards: readonly MeshStandard[]
}

const BANNER = /@(standard|rfc|accounting|compliance|security|audit|quality)\s+([^\s*][^\n*]*)/g

const sources = (root: string): string[] => {
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || SKIP.has(e)) continue
      const p = join(dir, e)
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
      if (st.isDirectory()) walk(p)
      else if (/\.tsx?$/.test(e) && !GENERATED.test(e)) out.push(p)
    }
  }
  walk(root)
  return out
}

/** The atom a file belongs to: its folder path relative to src (the folder IS the atom). */
export const atomOfFile = (file: string, cwd: string): string => {
  const rel = relative(join(cwd, SRC), dirname(file)).replace(/\\/g, '/')
  return rel === '' || rel === '.' ? '.' : rel
}

/** The whole mesh, computed from source — atoms, atom-level import edges, standards citations. */
export function meshOf(cwd: string = process.cwd()): Mesh {
  const files = sources(join(cwd, SRC))
  const atoms = new Set<string>()
  const edgeKeys = new Set<string>()
  const edges: MeshEdge[] = []
  const standards: MeshStandard[] = []
  const seenStd = new Set<string>()

  for (const f of files) {
    const from = atomOfFile(f, cwd)
    atoms.add(from)

    for (const target of importsOf(f, cwd)) {
      const to = atomOfFile(target, cwd)
      if (to === from) continue
      const key = `${from}→${to}`
      if (edgeKeys.has(key)) continue
      edgeKeys.add(key)
      edges.push({ from, to, kind: 'import' })
    }

    let text: string
    try {
      text = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    const prose = commentsOf(f, text).join('\n')
    for (const m of prose.matchAll(BANNER)) {
      const tag = m[1]!
      const id = m[2]!.trim().split(/\s+/).slice(0, 2).join(' ')
      const key = `${from}|${tag}|${id}`
      if (seenStd.has(key)) continue
      seenStd.add(key)
      standards.push({ atom: from, tag, id })
    }
  }
  for (const e of edges) atoms.add(e.to)
  return { atoms: [...atoms].sort(), edges, standards }
}

/** The atom's legal surface: every standard its files cite. */
export const standardsOf = (mesh: Mesh, atom: string): readonly MeshStandard[] =>
  mesh.standards.filter((s) => s.atom === atom)

/** The clause→code trace: every atom citing this standard id (substring match on the id). */
export const atomsOf = (mesh: Mesh, standardId: string): readonly string[] =>
  [...new Set(mesh.standards.filter((s) => s.id.includes(standardId)).map((s) => s.atom))].sort()

/** Level the atom graph into waves — the entangled core levels to wave 0 (the ground state). */
export function meshWaves(mesh: Mesh): readonly (readonly string[])[] {
  const deps = new Map<string, string[]>()
  for (const a of mesh.atoms) deps.set(a, [])
  for (const e of mesh.edges) deps.get(e.from)!.push(e.to)
  return wavesOf(deps)
}

/** Depth (longest chain) and parallelism (widest wave) of the whole corpus mesh. */
export function meshShape(mesh: Mesh): { readonly depth: number; readonly parallelism: number } {
  const w = meshWaves(mesh)
  return { depth: w.length, parallelism: Math.max(0, ...w.map((x) => x.length)) }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mesh = meshOf()
  const shape = meshShape(mesh)
  const tags = new Map<string, number>()
  for (const s of mesh.standards) tags.set(s.tag, (tags.get(s.tag) ?? 0) + 1)
  console.log('mesh — one quantum mesh: atoms ⊕ imports ⊕ standards')
  console.log(`  atoms ${mesh.atoms.length} · import edges ${mesh.edges.length} · standard citations ${mesh.standards.length}`)
  console.log(`  waves ${shape.depth} deep · ${shape.parallelism} wide (wave 0 = the entangled ground state)`)
  console.log(`  citations by tag: ${[...tags.entries()].map(([t, n]) => `${t} ${n}`).join(' · ')}`)
}
