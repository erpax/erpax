import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import Atoms, { linkedPaths, wikiToLinks } from '@/atoms'
import { atomRows, loadAtoms, stripFrontmatter, type AtomSource } from './seed'

const field = (name: string): Field | undefined =>
  Atoms.fields.find((f): f is Field => 'name' in f && f.name === name)

describe('atoms — the collection', () => {
  it('nests on itself, so the nested-docs plugin enables for it', () => {
    const parent = field('parent') as { type?: string; relationTo?: unknown } | undefined
    expect(parent?.type).toBe('relationship')
    expect(parent?.relationTo).toBe(Atoms.slug)
  })

  it('keeps markdown off the database and links as a real relationship', () => {
    expect((field('markdown') as { virtual?: unknown } | undefined)?.virtual).toBe(true)
    const links = field('links') as { relationTo?: unknown; hasMany?: unknown } | undefined
    expect(links?.relationTo).toBe(Atoms.slug)
    expect(links?.hasMany).toBe(true)
    expect(field('body')?.type).toBe('richText')
  })
})

describe('atoms — wikilinks are markdown links with a known href', () => {
  it('rewrites the bare and the trailing-path forms', () => {
    expect(wikiToLinks('see [[law]] and [[rules]]/copy.')).toBe(
      'see [law](/atoms/law) and [rules/copy](/atoms/rules/copy).',
    )
  })

  it('reads targets once each, in order, from either form', () => {
    expect(linkedPaths('[[b]] then [a](/atoms/a) then [[b]]')).toEqual(['b', 'a'])
  })

  it('leaves an ordinary link alone', () => {
    expect(linkedPaths('[site](https://example.org/atoms/x)')).toEqual([])
  })
})

const nodes = [
  { path: 'rules/copy', uuid: 'u-copy' },
  { path: 'rules', uuid: 'u-rules' },
  { path: 'law', uuid: 'u-law' },
  { path: 'wine/cellar/barrel', uuid: 'u-barrel' },
  { path: 'ghost', uuid: 'u-ghost' },
]
const sources: Record<string, AtomSource> = {
  rules: { markdown: '---\nname: rules\n---\n\n# rules\nSee [[law]].', code: true },
  'rules/copy': { markdown: '# copy\n[[rules]] · [[law]] · [[nowhere]] · [[barrel]]', code: true },
  law: { markdown: '# law', code: false },
  'wine/cellar/barrel': { markdown: '# barrel', code: false },
}
const read = (path: string): AtomSource | undefined => sources[path]

describe('atoms — rows derived from the tree', () => {
  it('strips generated frontmatter and nothing else', () => {
    expect(stripFrontmatter('---\na: 1\n---\n\n# t')).toBe('# t')
    expect(stripFrontmatter('# t\n---\nnot frontmatter')).toBe('# t\n---\nnot frontmatter')
  })

  it('sorts parents first and skips a node the reader does not know', () => {
    const rows = atomRows(nodes, read)
    expect(rows.map((r) => r.path)).toEqual(['law', 'rules', 'rules/copy', 'wine/cellar/barrel'])
    expect(rows.find((r) => r.path === 'rules/copy')?.parent).toBe('rules')
  })

  it('parents a row on its nearest PRESENT ancestor, or on nothing', () => {
    expect(atomRows(nodes, read).find((r) => r.path === 'wine/cellar/barrel')?.parent).toBeNull()
  })

  it('selects by pack', () => {
    expect(atomRows(nodes, read, new Set(['rules'])).map((r) => r.path)).toEqual(['rules', 'rules/copy'])
  })

  it('addresses a row by its content — same source, same address; edited source, new address', () => {
    const [a] = atomRows(nodes, read, new Set(['law']))
    const [b] = atomRows(nodes, read, new Set(['law']))
    const [c] = atomRows(nodes, (p) => (p === 'law' ? { markdown: '# law, amended', code: false } : read(p)), new Set(['law']))
    expect(a!.content).toBe(b!.content)
    expect(c!.content).not.toBe(a!.content)
  })
})

/** An in-memory stand-in for the three Local API operations the loader uses. */
function fakePayload() {
  const docs: Array<Record<string, unknown> & { id: string }> = []
  let writes = 0
  const api = {
    find: async () => ({ docs }),
    create: async ({ data }: { data: Record<string, unknown> }) => {
      const doc = { ...data, id: `a${docs.length + 1}` }
      docs.push(doc)
      writes++
      return doc
    },
    update: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      Object.assign(docs.find((d) => d.id === id)!, data)
      writes++
      return docs.find((d) => d.id === id)!
    },
  }
  return { api: api as unknown as Parameters<typeof loadAtoms>[0], docs, writes: () => writes }
}

describe('atoms — rows loaded through the collection operations', () => {
  it('creates parents before children and resolves links by path, then by a unique leaf', async () => {
    const p = fakePayload()
    const result = await loadAtoms(p.api, atomRows(nodes, read))
    expect(result.created).toBe(4)
    const id = (path: string) => p.docs.find((d) => d.path === path)!.id
    const copy = p.docs.find((d) => d.path === 'rules/copy')!
    expect(copy.parent).toBe(id('rules'))
    expect(copy.links).toEqual([id('rules'), id('law'), id('wine/cellar/barrel')])
    expect(result.unresolved).toEqual(['nowhere'])
  })

  it('is idempotent — a second load of the same rows writes nothing', async () => {
    const p = fakePayload()
    const rows = atomRows(nodes, read)
    await loadAtoms(p.api, rows)
    const before = p.writes()
    const again = await loadAtoms(p.api, rows)
    expect(again).toMatchObject({ created: 0, updated: 0, unchanged: 4 })
    expect(p.writes()).toBe(before)
  })

  it('rewrites only the row whose content moved', async () => {
    const p = fakePayload()
    await loadAtoms(p.api, atomRows(nodes, read))
    const amended = atomRows(nodes, (path) => (path === 'law' ? { markdown: '# law, amended', code: false } : read(path)))
    expect(await loadAtoms(p.api, amended)).toMatchObject({ created: 0, updated: 1, unchanged: 3 })
  })

  it('stamps the tenant on every row it writes', async () => {
    const p = fakePayload()
    await loadAtoms(p.api, atomRows(nodes, read, new Set(['law'])), { tenant: 't-7' })
    expect(p.docs[0]!.tenant).toBe('t-7')
  })
})
