import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import {
  type Convert,
  linkedSlugs,
  loadPages,
  loadPosts,
  pageRows,
  postRow,
  richTextField,
  slugOf,
  stripFrontmatter,
  wikiToLinks,
} from '@/seed/content'

describe('seed/content — a wikilink is a link to that document', () => {
  it('folds the path into a slug', () => {
    expect(slugOf('rules/copy')).toBe('rules-copy')
    expect(wikiToLinks('see [[law]] and [[rules]]/copy.')).toBe('see [law](/law) and [rules/copy](/rules-copy).')
  })

  it('reads targets once each, in order, and ignores an ordinary link', () => {
    expect(linkedSlugs('[[b]] then [[a]]/x then [[b]] and [site](https://example.org/b)')).toEqual(['b', 'a-x'])
  })
})

const nodes = [{ path: 'rules/copy' }, { path: 'rules' }, { path: 'law' }, { path: 'wine/cellar/barrel' }, { path: 'ghost' }]
const sources: Record<string, string> = {
  rules: '---\nname: rules\n---\n\n# rules — the gate corpus\nSee [[law]].',
  'rules/copy': '# rules/copy — one truth\n[[rules]] · [[law]] · [[nowhere]]',
  law: 'no heading here',
  'wine/cellar/barrel': '# barrel',
}
const read = (path: string): string | undefined => sources[path]

describe('seed/content — page rows derived from the tree', () => {
  it('strips generated frontmatter and nothing else', () => {
    expect(stripFrontmatter('---\na: 1\n---\n\n# t')).toBe('# t')
    expect(stripFrontmatter('# t\n---\nnot frontmatter')).toBe('# t\n---\nnot frontmatter')
  })

  it('sorts parents first and skips a node the reader does not know', () => {
    const rows = pageRows(nodes, read)
    expect(rows.map((r) => r.slug)).toEqual(['law', 'rules', 'rules-copy', 'wine-cellar-barrel'])
    expect(rows.find((r) => r.slug === 'rules-copy')?.parent).toBe('rules')
  })

  it('titles a row by its own first heading, else by its leaf word', () => {
    const rows = pageRows(nodes, read)
    expect(rows.find((r) => r.slug === 'rules')?.title).toBe('rules — the gate corpus')
    expect(rows.find((r) => r.slug === 'law')?.title).toBe('law')
  })

  it('parents a row on its nearest PRESENT ancestor, or on nothing', () => {
    expect(pageRows(nodes, read).find((r) => r.slug === 'wine-cellar-barrel')?.parent).toBeNull()
  })

  it('selects by pack, and addresses a row by its content', () => {
    expect(pageRows(nodes, read, new Set(['rules'])).map((r) => r.slug)).toEqual(['rules', 'rules-copy'])
    const [a] = pageRows(nodes, read, new Set(['law']))
    const [b] = pageRows(nodes, read, new Set(['law']))
    const [c] = pageRows(nodes, (p) => (p === 'law' ? 'amended' : read(p)), new Set(['law']))
    expect(a!.content).toBe(b!.content)
    expect(c!.content).not.toBe(a!.content)
  })
})

describe('seed/content — the editor is found where the field actually is', () => {
  const rich = (name: string) => ({ name, type: 'richText' }) as unknown as Field
  const fields = [
    { type: 'tabs', tabs: [{ fields: [{ name: 'layout', type: 'blocks', blocks: [{ slug: 'content', fields: [{ name: 'columns', type: 'array', fields: [rich('richText')] }] }] }] }] },
    { name: 'title', type: 'text' },
  ] as unknown as Field[]

  it('walks tabs, blocks and arrays', () => {
    expect(richTextField(fields, 'richText')?.name).toBe('richText')
  })

  it('returns nothing rather than a field of another name', () => {
    expect(richTextField(fields, 'content')).toBeUndefined()
  })
})

/** The conversion itself is the rich-text package's; the loaders are proved with a marker in its place. */
const convert = ((_p: unknown, collection: string, field: string, markdown: string) => ({ collection, field, markdown })) as unknown as Convert

/** An in-memory stand-in for the Local API operations the loaders use, with two rich-text fields. */
function fakePayload() {
  const tables: Record<string, Array<Record<string, unknown> & { id: string }>> = { pages: [], posts: [], categories: [] }
  let writes = 0
  const api = {
    config: {
      collections: [
        { slug: 'pages', fields: [{ name: 'richText', type: 'richText' }] },
        { slug: 'posts', fields: [{ name: 'content', type: 'richText' }] },
      ],
    },
    find: async ({ collection }: { collection: string }) => ({ docs: tables[collection]! }),
    create: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => {
      const doc = { ...data, id: `${collection}-${tables[collection]!.length + 1}` }
      tables[collection]!.push(doc)
      writes++
      return doc
    },
    update: async ({ collection, id, data }: { collection: string; id: string; data: Record<string, unknown> }) => {
      Object.assign(tables[collection]!.find((d) => d.id === id)!, data)
      writes++
      return tables[collection]!.find((d) => d.id === id)!
    },
  }
  return { api: api as unknown as Parameters<typeof loadPages>[0], tables, writes: () => writes }
}

describe('seed/content — rows loaded as nested pages', () => {
  it('creates parents before children, published, and reports unresolved links', async () => {
    const p = fakePayload()
    const result = await loadPages(p.api, pageRows(nodes, read), { convert })
    expect(result.created).toBe(4)
    const id = (slug: string) => p.tables.pages!.find((d) => d.slug === slug)!.id
    const copy = p.tables.pages!.find((d) => d.slug === 'rules-copy')!
    expect(copy.parent).toBe(id('rules'))
    expect(copy._status).toBe('published')
    expect(result.unresolved).toEqual(['nowhere'])
  })

  it('is idempotent — a second load of the same rows writes nothing', async () => {
    const p = fakePayload()
    const rows = pageRows(nodes, read)
    await loadPages(p.api, rows, { convert })
    const before = p.writes()
    expect(await loadPages(p.api, rows, { convert })).toMatchObject({ created: 0, updated: 0, unchanged: 4 })
    expect(p.writes()).toBe(before)
  })

  it('rewrites only the row whose content moved, and stamps the tenant', async () => {
    const p = fakePayload()
    await loadPages(p.api, pageRows(nodes, read), { tenant: 't-7', convert })
    expect(p.tables.pages![0]!.tenant).toBe('t-7')
    const amended = pageRows(nodes, (path) => (path === 'law' ? 'amended' : read(path)))
    expect(await loadPages(p.api, amended, { tenant: 't-7', convert })).toMatchObject({ created: 0, updated: 1, unchanged: 3 })
  })
})

describe('seed/content — rows loaded as posts based on pages', () => {
  const posts = [
    postRow({ slug: 'b', title: 'B', description: 'claim b', markdown: '# B', pages: ['rules-copy', 'absent'], related: ['a', 'gone'] }),
    postRow({ slug: 'a', title: 'A', description: 'claim a', markdown: '# A', pages: [], related: [] }),
  ]

  it('references the pages it is based on, files it under one category, and links what it cites', async () => {
    const p = fakePayload()
    await loadPages(p.api, pageRows(nodes, read), { convert })
    const result = await loadPosts(p.api, posts, { category: 'Publications', convert })
    const b = p.tables.posts!.find((d) => d.slug === 'b')!
    expect(b.pages).toEqual([p.tables.pages!.find((d) => d.slug === 'rules-copy')!.id])
    expect(b.categories).toEqual([p.tables.categories![0]!.id])
    expect(b.relatedPosts).toEqual([p.tables.posts!.find((d) => d.slug === 'a')!.id])
    expect(p.tables.categories).toHaveLength(1)
    expect(result).toMatchObject({ created: 2, unresolved: ['absent', 'gone'] })
  })

  it('is idempotent, and does not create the category twice', async () => {
    const p = fakePayload()
    await loadPosts(p.api, posts, { category: 'Publications', convert })
    const before = p.writes()
    expect(await loadPosts(p.api, posts, { category: 'Publications', convert })).toMatchObject({ created: 0, updated: 0, unchanged: 2 })
    expect(p.writes()).toBe(before)
  })
})
