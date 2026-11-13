import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import {
  type Convert,
  loadRedirects,
  fillSeo,
  owedDescription,
  publishedStates,
  savedMarkdown,
  summaryOf,
  describedAs,
  blockFields,
  documentMarkdown,
  markdownField,
  toLexical,
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

  it('reads a skill description from frontmatter — quoted or bare — and nothing from a body', () => {
    expect(describedAs('---\nname: x\ndescription: "Use when a: b \\"c\\""\n---\n# t')).toBe('Use when a: b "c"')
    expect(describedAs('---\ndescription: Use when bare\n---\n')).toBe('Use when bare')
    expect(describedAs('# t\ndescription: not frontmatter')).toBe('')
    expect(pageRows([{ path: 'rules' }], () => '---\ndescription: "Use when gating"\n---\n# rules')[0]!.description).toBe('Use when gating')
  })

  it('summarises a document by its first paragraph of prose, skipping headings, code, tables and lists', () => {
    const md = '# Title\n\n```ts\nconst a = 1\n\nconst b = 2\n```\n\n| a | b |\n| - | - |\n\n- item\n\nThe **first** [real](https://x.y) line,\nwrapped.\n\nSecond.'
    expect(summaryOf(md)).toBe('The first real line, wrapped.')
    expect(summaryOf('# only a heading')).toBe('')
    expect(summaryOf('word '.repeat(100), 20)).toHaveLength(20)
    expect(pageRows([{ path: 'law' }], () => '# law\n\nOne law for all.')[0]!.description).toBe('One law for all.')
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

  it('finds a block by slug, so a hero field of the same name is not mistaken for the body', () => {
    const hero = { name: 'hero', type: 'group', fields: [rich('richText')] } as unknown as Field
    const withHero = [hero, ...fields]
    expect(richTextField(withHero, 'richText')).toBe((hero as { fields: Field[] }).fields[0])
    expect(blockFields(withHero, 'content')).toBeDefined()
    expect(blockFields(withHero, 'absent')).toBeUndefined()
    expect(() => toLexical({ config: { collections: [{ slug: 'pages', fields: [hero] }] } } as never, 'pages', 'richText', '# x')).toThrow(/no rich-text field/)
  })

  it('returns nothing rather than a field of another name', () => {
    expect(richTextField(fields, 'content')).toBeUndefined()
  })
})

/** The conversion itself is the rich-text package's; the loaders are proved with a marker in its place. */
const convert = ((_p: unknown, collection: string, field: string, markdown: string) => ({ collection, field, markdown })) as unknown as Convert

/** An in-memory stand-in for the Local API operations the loaders use, with two rich-text fields. */
function fakePayload() {
  const tables: Record<string, Array<Record<string, unknown> & { id: string }>> = { pages: [], posts: [], categories: [], redirects: [] }
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
    expect(copy.meta).toEqual({ title: 'rules/copy — one truth' })
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

describe('seed/content — the body read back as markdown', () => {
  it('the markdown field is virtual: computed on read from its sibling, never stored', () => {
    const field = markdownField('content')
    expect(field).toMatchObject({ name: 'markdown', type: 'textarea', virtual: true, admin: { hidden: true } })
    const read = field.hooks!.afterRead![0]!
    expect(read({ siblingData: {}, siblingFields: [] } as never)).toBe('')
    expect(read({ siblingData: { content: { root: {} } }, siblingFields: [{ name: 'content', type: 'text' }] } as never)).toBe('')
  })

  it('collects a document body: its own markdown, then each content column, skipping the empty', () => {
    expect(documentMarkdown({ markdown: ' # post ' })).toBe('# post')
    expect(documentMarkdown({ layout: [{ columns: [{ markdown: 'A' }, { markdown: '' }, {}] }, { blockType: 'cta' }, { columns: [{ markdown: 'B' }] }] })).toBe('A\n\nB')
    expect(documentMarkdown({ title: 'no body' })).toBe('')
  })
})

describe('seed/content — SEO is filled before validation, then validation requires it', () => {
  const collection = { slug: 'tags', fields: [] }

  it('owes a description: what is stated, else the first paragraph, else the title', () => {
    expect(owedDescription('stated', '# h\n\nbody line', 'T')).toBe('stated')
    expect(owedDescription('  ', '# h\n\nbody line', 'T')).toBe('body line')
    expect(owedDescription(undefined, '# only heading', 'T')).toBe('T')
    expect(owedDescription(undefined, '', undefined)).toBe('')
  })

  it('a collection with no declared body has no markdown to read', () => {
    expect(savedMarkdown(collection, { content: {} })).toBe('')
  })

  it('fills what is missing and never replaces what an author wrote', async () => {
    const filled = (await fillSeo({ data: { title: 'T' }, collection } as never)) as { meta: Record<string, unknown> }
    expect(filled.meta).toEqual({ title: 'T', description: 'T' })
    const kept = (await fillSeo({ data: { title: 'T', meta: { title: 'Mine', description: 'My words', image: 7 } }, collection } as never)) as { meta: Record<string, unknown> }
    expect(kept.meta).toEqual({ title: 'Mine', description: 'My words', image: 7 })
  })

  it('a partial update keeps the stored description and title', async () => {
    const out = (await fillSeo({ data: { slug: 'moved' }, originalDoc: { title: 'T', meta: { description: 'stored' } }, collection } as never)) as { meta: Record<string, unknown> }
    expect(out.meta).toEqual({ title: 'T', description: 'stored' })
  })

  it('requires both elements on a published document, and on nothing else', () => {
    const validate = publishedStates('description')
    expect(validate('', { data: { _status: 'draft' } })).toBe(true)
    expect(validate('words', { data: { _status: 'published' } })).toBe(true)
    expect(validate('  ', { data: { _status: 'published' } })).toMatch(/states its description \(ISO 15836-1\)/)
    expect(validate(undefined, { data: { _status: 'published' } })).toMatch(/description/)
  })
})

describe('seed/content — a redirect points at a page, and an address is never both', () => {
  it('redirects by reference, retires the page that sat at the address, and is idempotent', async () => {
    const p = fakePayload()
    await loadPages(p.api, pageRows(nodes, read), { convert })
    const rows = [{ from: '/law', page: 'rules' }, { from: '/old', page: 'ghost-page' }]
    expect(await loadRedirects(p.api, rows)).toMatchObject({ created: 1, unchanged: 0, unresolved: ['ghost-page'] })
    const rules = p.tables.pages!.find((d) => d.slug === 'rules')!
    expect(p.tables.redirects![0]).toMatchObject({ from: '/law', to: { type: 'reference', reference: { relationTo: 'pages', value: rules.id } } })
    expect(p.tables.pages!.find((d) => d.slug === 'law')!._status).toBe('draft')
    const before = p.writes()
    expect(await loadRedirects(p.api, rows)).toMatchObject({ created: 0, unchanged: 1 })
    expect(p.writes()).toBe(before)
  })
})
