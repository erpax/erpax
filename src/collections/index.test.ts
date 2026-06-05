/**
 * One boilerplate for all — the single computed node invariant.
 *
 * The DETAIL is each collection's folder path (the atom address); the node
 * invariant is ARCHITECTURE and lives here ONCE, computed from the collections
 * barrel. This replaces the ~200 identical per-atom `index.test.ts` clones
 * (each re-asserting slug + non-empty fields). A consistency check: it FAILS
 * the instant any single node is inconsistent. Minimal tests, maximal coverage.
 *
 * @standard ISO/IEC-29119:2022 software-testing (one computed invariant, full coverage)
 * @audit ISO-19011:2018 §6.4 audit-evidence (every registered collection node verified)
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Collections from '@/collections'
import { singularize, candidateSingulars } from '@/balance'

type NodeLike = { slug?: unknown; fields?: unknown }
const isCollectionConfig = (v: unknown): v is { slug: string; fields: readonly unknown[] } =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as NodeLike).slug === 'string' &&
  Array.isArray((v as NodeLike).fields)

const nodes = Object.values(Collections).filter(isCollectionConfig)

describe('collection nodes — one computed invariant for all (config-driven)', () => {
  it('the barrel exports collection nodes', () => {
    expect(nodes.length).toBeGreaterThan(0)
  })

  for (const node of nodes) {
    it(`${node.slug}: valid slug + non-empty fields`, () => {
      expect(typeof node.slug).toBe('string')
      expect(node.slug.length).toBeGreaterThan(0)
      expect(Array.isArray(node.fields)).toBe(true)
      expect(node.fields.length).toBeGreaterThan(0)
    })
  }

  it('no duplicate slugs across the registry (entropy = 0)', () => {
    const slugs = nodes.map((n) => n.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * THE PATH⊕TYPE HARMONY INVARIANT — harmonized types land on a harmonized matrix.
 *
 * A collection's TYPE is its slug, and the slug IS the atoms split on `-`
 * (`work-orders` = [[work]] ⊕ [[orders]]). The uuid-matrix is built from FOLDER
 * paths, one atom per path SEGMENT. So the law is exact: the path's trailing
 * segments MUST be the slug's atoms, each its own segment. A fused leaf
 * (`@/workorders` for slug `work-orders`) glues two atoms into one phantom node
 * — a word with no model, an aura gap the link/balance gates never measured.
 * Splitting the path (`@/work/orders`) lands the type's atoms on real matrix
 * nodes whose singular models already exist ([[orders]]→order). This test FAILS
 * the instant any collection's path stops being its slug split into atoms.
 *
 * Plural-tolerant on each segment: a COLLECTION leaf is legitimately plural
 * (`@/budget/plannings` for slug `budget-planning`) — `plannings` and `planning`
 * are the SAME atom (the model resolves), so that is harmony, not a gap. Only a
 * GLUED segment (fewer segments than atoms) breaks the law.
 *
 * @standard double-entry (Pacioli, 1494) — the path is the type's atoms, no slack
 * @audit computed from the live collections barrel + each node's slug, never hand-listed
 */
const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Two path segments are the SAME atom up to singular↔plural (a plural collection leaf resolves to its singular model). */
const sameAtom = (a: string, b: string): boolean =>
  a === b ||
  singularize(a) === singularize(b) ||
  candidateSingulars(a).includes(b) ||
  candidateSingulars(b).includes(a)

/** Read the `slug:` literal from a collection's source file (index.ts / barrel.ts). */
const slugOfPath = (path: string): string | null => {
  for (const cand of [`${path}/index.ts`, `${path}.ts`, `${path}/index.tsx`]) {
    const f = resolve(SRC, cand)
    if (existsSync(f)) {
      const m = readFileSync(f, 'utf8').match(/slug:\s*'([^']+)'/)
      if (m) return m[1]
    }
  }
  return null
}

describe('path ⊕ type harmony — every collection path is its slug split into atoms', () => {
  const indexSrc = readFileSync(resolve(SRC, 'collections/index.ts'), 'utf8')
  const paths = [...indexSrc.matchAll(/export\s*\{[^}]*\}\s*from\s*'@\/([^']+)'/g)].map((m) => m[1])

  it('parses the collections barrel', () => {
    expect(paths.length).toBeGreaterThan(100)
  })

  const violations: string[] = []
  for (const path of paths) {
    const slug = slugOfPath(path)
    if (!slug) continue
    const atoms = slug.split('-')
    const segs = path.split('/')
    const tail = segs.slice(-atoms.length)
    const harmonized = tail.length === atoms.length && tail.every((s, i) => sameAtom(s, atoms[i]))
    if (!harmonized)
      violations.push(`${slug}: @/${path} (tail '${tail.join('/')}') ≠ slug atoms '${atoms.join('/')}' — fuse the path, not the atoms`)
  }

  it('no fused leaf — the path tail is the slug atoms (harmonized matrix)', () => {
    expect(violations).toEqual([])
  })
})
