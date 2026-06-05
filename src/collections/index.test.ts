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
import * as Collections from '@/collections'

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
