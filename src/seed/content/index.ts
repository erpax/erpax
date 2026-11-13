/**
 * seed/content — markdown documents loaded as nested pages and as posts, through the Local API.
 *
 * Content has two homes and both are Payload's own. A DOCUMENT is a nested page: it has a parent,
 * so the nested-docs plugin gives it breadcrumbs. A PUBLICATION is a post: it is dated, categorised
 * and based on documents, so it references the pages it rests on. Nothing here defines a
 * collection — a seed is rows for the collections the app already has.
 *
 * Two halves, kept apart. `pageRows` is pure: matrix nodes plus a reader the caller injects, so it
 * never opens a file and runs in any runtime. `loadPages` and `loadPosts` are the write side: they
 * convert each row's markdown with the editor of the field it lands in, so a seeded document is
 * exactly what an author could have typed there, and they skip a row whose content address has
 * not moved.
 *
 * The way back is Lexical's own and nothing is stored twice: beside each rich-text field sits a
 * virtual `markdown` field whose after-read step converts that field's state with the same
 * editor. A reader — the REST SDK or the MCP find tool — gets the document as text.
 *
 * @invariant a row's parent is the nearest ancestor present in the same set, so parents sort first
 * @invariant loading the same rows twice creates nothing and updates nothing
 * @standard CommonMark 0.31 markdown wire-form
 * @standard ISO-15836-1:2017 dublin-core title description
 * @see ./SKILL.md
 */
import type { CollectionBeforeValidateHook, Field, Payload, PayloadRequest, RichTextField, TextareaField } from 'payload'
import { convertLexicalToMarkdown, convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { contentAddress } from '@/seed/row'

/** A document's slug: its path with the separators folded — unique where a leaf word is not. */
export const slugOf = (path: string): string => path.replace(/\//g, '-')

const WIKILINK = /\[\[([a-z0-9][a-z0-9/-]*)\]\]((?:\/[a-z0-9][a-z0-9-]*)*)/g

/** `[[rules]]/copy` → `[rules/copy](/rules-copy)` — a wikilink is a markdown link to that page. */
export function wikiToLinks(markdown: string): string {
  return markdown.replace(WIKILINK, (_m, head: string, tail: string) => {
    const path = `${head}${tail}`
    return `[${path}](/${slugOf(path)})`
  })
}

/** Every document slug a markdown body links to by wikilink, first appearance first, once each. */
export function linkedSlugs(markdown: string): string[] {
  const out = new Set<string>()
  for (const m of markdown.matchAll(WIKILINK)) out.add(slugOf(`${m[1]}${m[2] ?? ''}`))
  return [...out]
}

/** Strip a leading YAML frontmatter block — it is generated, and the row carries its own fields. */
export function stripFrontmatter(markdown: string): string {
  return markdown.startsWith('---\n') ? markdown.replace(/^---\n[\s\S]*?\n---\n+/, '') : markdown
}

/**
 * A skill's frontmatter `description` — its "Use when …" line — or nothing. It becomes the page's
 * SEO description, so the search index answers "which document do I need" without opening one.
 */
export function describedAs(markdown: string): string {
  const block = markdown.startsWith('---\n') ? /^---\n([\s\S]*?)\n---/.exec(markdown)?.[1] : undefined
  const raw = block ? /^description:\s*(.+)$/m.exec(block)?.[1]?.trim() : undefined
  if (!raw) return ''
  const quoted = /^"([\s\S]*)"$/.exec(raw) ?? /^'([\s\S]*)'$/.exec(raw)
  return (quoted ? quoted[1]! : raw).replace(/\\"/g, '"').trim()
}

/**
 * A document's first paragraph of prose, on one line, at most `max` characters — what it says
 * about itself when it states no description. Headings, code, tables, lists and quotes are skipped.
 */
export function summaryOf(markdown: string, max = 300): string {
  let fenced = false
  for (const block of stripFrontmatter(markdown).split(/\n\s*\n/)) {
    const text = block.trim()
    const fences = (text.match(/^[ \t]*```/gm) ?? []).length
    const inside = fenced
    if (fences % 2 === 1) fenced = !fenced
    if (inside || fences > 0 || !text || /^(#|\||[-*+] |\d+\. |>|<)/.test(text)) continue
    const line = text.replace(/\s+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '')
    return line.length <= max ? line : `${line.slice(0, max - 1).trimEnd()}…`
  }
  return ''
}

/** One nested page to load. `parent` and `links` are slugs, resolved to ids by the loader. */
export interface PageRow {
  readonly path: string
  readonly slug: string
  readonly title: string
  /** the document's own one-line description; empty when it states none */
  readonly description: string
  readonly parent: string | null
  readonly markdown: string
  readonly links: readonly string[]
  readonly content: string
}

/** One post to load. `pages` and `related` are slugs, resolved to ids by the loader. */
export interface PostRow {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly markdown: string
  /** slugs of the nested pages this publication is based on */
  readonly pages: readonly string[]
  /** slugs of the posts it cites */
  readonly related: readonly string[]
  readonly content: string
}

const depth = (path: string): number => path.split('/').length

/**
 * Derive page rows from matrix nodes. `packs` selects first-level folders; omitted means all. The
 * title is the document's own first heading, else its leaf word. A node the reader does not know
 * is skipped — a row without a body is not a document.
 */
export function pageRows(
  nodes: ReadonlyArray<{ readonly path: string }>,
  read: (path: string) => string | undefined,
  packs?: ReadonlySet<string>,
): PageRow[] {
  const picked = nodes
    .filter((n) => !packs || packs.has(n.path.split('/')[0]!))
    .map((n) => ({ path: n.path, source: read(n.path) }))
    .filter((x): x is { path: string; source: string } => x.source !== undefined)
  const present = new Set(picked.map((x) => x.path))
  const nearest = (path: string): string | null => {
    const parts = path.split('/')
    for (let i = parts.length - 1; i > 0; i--) {
      const up = parts.slice(0, i).join('/')
      if (present.has(up)) return slugOf(up)
    }
    return null
  }
  return picked
    .map(({ path, source }): PageRow => {
      const markdown = stripFrontmatter(source).trim()
      const heading = /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim()
      const base = {
        path,
        slug: slugOf(path),
        title: heading ?? path.slice(path.lastIndexOf('/') + 1),
        description: describedAs(source) || summaryOf(markdown),
        parent: nearest(path),
        markdown,
        links: linkedSlugs(markdown).filter((s) => s !== slugOf(path)),
      }
      return { ...base, content: contentAddress(base) }
    })
    .sort((a, b) => depth(a.path) - depth(b.path) || a.path.localeCompare(b.path))
}

/** Address a post row by its own fields, so an unchanged publication is not rewritten. */
export function postRow(base: Omit<PostRow, 'content'>): PostRow {
  return { ...base, content: contentAddress(base) }
}

// ── the write side ────────────────────────────────────────────────────────────────────────────

type Local = Pick<Payload, 'find' | 'create' | 'update' | 'config'>

const childFields = (f: Field): readonly Field[] => {
  if (f.type === 'tabs') return f.tabs.flatMap((t) => t.fields)
  if (f.type === 'blocks') return f.blocks.flatMap((b) => b.fields)
  if ('fields' in f && Array.isArray(f.fields)) return f.fields
  return []
}

/** The first rich-text field named `name` anywhere under `fields` — through tabs, blocks and rows. */
export function richTextField(fields: readonly Field[], name: string): RichTextField | undefined {
  for (const f of fields) {
    if (f.type === 'richText' && f.name === name) return f
    const inner = richTextField(childFields(f), name)
    if (inner) return inner
  }
  return undefined
}

/** The fields of the block with this slug, wherever it is offered under `fields`. */
export function blockFields(fields: readonly Field[], slug: string): readonly Field[] | undefined {
  for (const f of fields) {
    if (f.type === 'blocks') {
      const hit = f.blocks.find((b) => b.slug === slug)
      if (hit) return hit.fields
    }
    const inner = blockFields(childFields(f), slug)
    if (inner) return inner
  }
  return undefined
}

/** A page's body lives in its `content` block; a hero or call-to-action has a field of the same name and another editor. */
const BODY_BLOCK: Partial<Record<'pages' | 'posts', string>> = { pages: 'content' }

/** Where each document collection keeps its body: the rich-text field, and the block it sits in. */
const BODY: Record<'pages' | 'posts', { readonly field: string; readonly block?: string }> = {
  pages: { field: 'richText', block: 'content' },
  posts: { field: 'content' },
}

/** The body of a document that is being SAVED, as markdown — converted with its own editor. */
export function savedMarkdown(collection: { slug: string; fields: readonly Field[] }, data: Record<string, unknown>): string {
  const body = BODY[collection.slug as 'pages' | 'posts']
  if (!body) return ''
  const fields = body.block ? (blockFields(collection.fields, body.block) ?? []) : collection.fields
  const field = richTextField(fields, body.field)
  if (!field) return ''
  const states: unknown[] = body.block
    ? (Array.isArray(data.layout) ? (data.layout as { blockType?: string; columns?: Record<string, unknown>[] }[]) : [])
        .filter((b) => b?.blockType === body.block)
        .flatMap((b) => (b.columns ?? []).map((c) => c?.[body.field]))
    : [data[body.field]]
  const editorConfig = editorConfigFactory.fromField({ field })
  return states
    .filter((s): s is Parameters<typeof convertLexicalToMarkdown>[0]['data'] => Boolean(s) && typeof s === 'object')
    .map((data) => convertLexicalToMarkdown({ data, editorConfig }).trim())
    .filter(Boolean)
    .join('\n\n')
}

/**
 * The description a document owes: what it already states, else its first paragraph, else its
 * title. Never empty for a titled document — which is what lets validation REQUIRE it.
 */
export function owedDescription(stated: unknown, body: string, title: unknown): string {
  if (typeof stated === 'string' && stated.trim()) return stated
  return summaryOf(body) || (typeof title === 'string' ? title : '')
}

/**
 * Before validation: fill the SEO title and description a document did not state, from the
 * document itself. Filled BEFORE the validators run, so they judge the document as it will be
 * saved; a value an author wrote is never replaced.
 */
export const fillSeo: CollectionBeforeValidateHook = ({ data, originalDoc, collection }) => {
  if (!data) return data
  const before = (originalDoc as { meta?: Record<string, unknown>; title?: unknown } | undefined) ?? {}
  const meta = { ...before.meta, ...(data.meta as Record<string, unknown> | undefined) }
  const title = data.title ?? before.title
  const stated = typeof meta.title === 'string' && meta.title.trim() ? meta.title : undefined
  return {
    ...data,
    meta: {
      ...(data.meta as Record<string, unknown> | undefined),
      title: stated ?? (typeof title === 'string' ? title : undefined),
      description: owedDescription(meta.description, savedMarkdown(collection, data), title) || undefined,
    },
  }
}

/** ISO 15836-1 names title and description as elements of a described resource: a PUBLISHED document carries both. */
export const publishedStates = (element: string) => (value: unknown, { data }: { data?: { _status?: string | null } }): true | string =>
  data?._status !== 'published' || (typeof value === 'string' && value.trim() !== '') || `A published document states its ${element} (ISO 15836-1).`

/** Markdown as the stored state of one collection's rich-text field, using that field's own editor. */
export function toLexical(payload: Pick<Payload, 'config'>, collection: 'pages' | 'posts', field: string, markdown: string) {
  const all = payload.config.collections.find((c) => c.slug === collection)?.fields ?? []
  const block = BODY_BLOCK[collection]
  const fields = block ? (blockFields(all, block) ?? []) : all
  const target = richTextField(fields, field)
  if (!target) throw new Error(`seed/content: ${collection} has no rich-text field named ${field}`)
  return convertMarkdownToLexical({
    editorConfig: editorConfigFactory.fromField({ field: target }),
    markdown: wikiToLinks(markdown),
  })
}

/**
 * The rich-text field named `source`, read back as markdown: a virtual sibling computed on read
 * by Lexical's converter with that field's own editor. Nothing is saved — the rich text is the
 * only copy. Place it in the same field list as `source`.
 */
export function markdownField(source: string): TextareaField {
  return {
    name: 'markdown',
    type: 'textarea',
    virtual: true,
    admin: { hidden: true, description: `The ${source} field as markdown — computed on read, never stored.` },
    hooks: {
      afterRead: [
        ({ siblingData, siblingFields }) => {
          const data = siblingData?.[source]
          const field = siblingFields.find((f) => 'name' in f && f.name === source)
          if (!data || !field || field.type !== 'richText') return ''
          return convertLexicalToMarkdown({ data, editorConfig: editorConfigFactory.fromField({ field }) })
        },
      ],
    },
  }
}

/**
 * A read document's body as one markdown text: its own `markdown`, then each content block
 * column's, in order. It only collects what the virtual fields already computed — the search
 * sync calls it so the index carries the text and a reader never needs the node tree.
 */
export function documentMarkdown(doc: Record<string, unknown>): string {
  const parts: unknown[] = [doc.markdown]
  if (Array.isArray(doc.layout)) {
    for (const block of doc.layout as { columns?: { markdown?: unknown }[] }[]) for (const column of block?.columns ?? []) parts.push(column?.markdown)
  }
  return parts.filter((p): p is string => typeof p === 'string' && p.trim() !== '').map((p) => p.trim()).join('\n\n')
}

/** Markdown → the stored state of a collection's rich-text field. `toLexical` is the real one. */
export type Convert = (payload: Pick<Payload, 'config'>, collection: 'pages' | 'posts', field: string, markdown: string) => ReturnType<typeof convertMarkdownToLexical>

export interface LoadOptions {
  readonly req?: PayloadRequest
  readonly tenant?: string
  /** the converter — injected so the loaders can be proved without a booted editor */
  readonly convert?: Convert
}

export interface LoadResult {
  readonly created: number
  readonly updated: number
  readonly unchanged: number
  /** references that named no loaded document — reported, never invented */
  readonly unresolved: readonly string[]
}

const existingBySlug = async (payload: Local, collection: 'pages' | 'posts', { req, tenant }: LoadOptions) => {
  const found = await payload.find({
    collection,
    depth: 0,
    draft: true,
    pagination: false,
    req,
    select: { slug: true, seed: true },
    ...(tenant === undefined ? {} : { where: { tenant: { equals: tenant } } }),
  })
  const idOf = new Map<string, string>()
  const seedOf = new Map<string, string | null | undefined>()
  for (const d of found.docs) {
    if (typeof d.slug !== 'string') continue
    idOf.set(d.slug, d.id)
    seedOf.set(d.slug, d.seed)
  }
  return { idOf, seedOf }
}

/** The seed never triggers a site revalidation: there is no request to revalidate for. */
const QUIET = { disableRevalidate: true }

/**
 * Load rows as nested pages: one content block holding the document, parents first so every
 * `parent` already has an id. A row whose address matches the stored `seed` is skipped.
 */
export async function loadPages(payload: Local, rows: readonly PageRow[], opts: LoadOptions = {}): Promise<LoadResult> {
  const { req, tenant, convert = toLexical } = opts
  const { idOf, seedOf } = await existingBySlug(payload, 'pages', opts)
  let created = 0
  let updated = 0
  let unchanged = 0
  const unresolved = new Set<string>()
  for (const row of rows) {
    const id = idOf.get(row.slug)
    if (id !== undefined && seedOf.get(row.slug) === row.content) {
      unchanged++
      continue
    }
    const data = {
      title: row.title,
      slug: row.slug,
      generateSlug: false,
      seed: row.content,
      parent: row.parent === null ? null : (idOf.get(row.parent) ?? null),
      meta: { title: row.title, ...(row.description ? { description: row.description } : {}) },
      hero: { type: 'none' as const },
      layout: [
        { blockType: 'content' as const, columns: [{ size: 'full' as const, richText: convert(payload, 'pages', 'richText', row.markdown) }] },
      ],
      _status: 'published' as const,
      ...(tenant === undefined ? {} : { tenant }),
    }
    if (id === undefined) {
      const doc = await payload.create({ collection: 'pages', data: { ...data, publishedAt: new Date().toISOString() }, depth: 0, req, context: QUIET })
      idOf.set(row.slug, doc.id)
      created++
    } else {
      await payload.update({ collection: 'pages', id, data, depth: 0, req, context: QUIET })
      updated++
    }
  }
  for (const row of rows) for (const s of row.links) if (!idOf.has(s)) unresolved.add(s)
  return { created, updated, unchanged, unresolved: [...unresolved].sort() }
}

/**
 * Load rows as posts in one category. Each post references the nested pages it is based on; the
 * posts it cites are linked in a second pass, once every post has an id.
 */
export async function loadPosts(
  payload: Local,
  rows: readonly PostRow[],
  opts: LoadOptions & { readonly category: string },
): Promise<LoadResult> {
  const { req, tenant, category, convert = toLexical } = opts
  const scope = tenant === undefined ? {} : { tenant }
  const categories = await payload.find({ collection: 'categories', where: { slug: { equals: slugOf(category.toLowerCase()) } }, depth: 0, limit: 1, req })
  const categoryId =
    categories.docs[0]?.id ??
    (await payload.create({ collection: 'categories', data: { title: category, slug: slugOf(category.toLowerCase()), ...scope }, depth: 0, req, context: QUIET })).id
  const pages = await existingBySlug(payload, 'pages', opts)
  const { idOf, seedOf } = await existingBySlug(payload, 'posts', opts)

  let created = 0
  let updated = 0
  let unchanged = 0
  const unresolved = new Set<string>()
  const touched: PostRow[] = []
  for (const row of rows) {
    const id = idOf.get(row.slug)
    if (id !== undefined && seedOf.get(row.slug) === row.content) {
      unchanged++
      continue
    }
    const based: string[] = []
    for (const p of row.pages) {
      const pid = pages.idOf.get(p)
      if (pid === undefined) unresolved.add(p)
      else based.push(pid)
    }
    const data = {
      title: row.title,
      slug: row.slug,
      generateSlug: false,
      seed: row.content,
      content: convert(payload, 'posts', 'content', row.markdown),
      categories: [categoryId],
      pages: based,
      meta: { title: row.title, description: row.description },
      _status: 'published' as const,
      ...scope,
    }
    if (id === undefined) {
      const doc = await payload.create({ collection: 'posts', data: { ...data, publishedAt: new Date().toISOString() }, depth: 0, req, context: QUIET })
      idOf.set(row.slug, doc.id)
      created++
    } else {
      await payload.update({ collection: 'posts', id, data, depth: 0, req, context: QUIET })
      updated++
    }
    touched.push(row)
  }
  for (const row of touched) {
    const related = row.related.map((s) => idOf.get(s)).filter((x): x is string => x !== undefined)
    for (const s of row.related) if (!idOf.has(s)) unresolved.add(s)
    if (related.length) {
      await payload.update({ collection: 'posts', id: idOf.get(row.slug)!, data: { relatedPosts: related }, depth: 0, req, context: QUIET })
    }
  }
  return { created, updated, unchanged, unresolved: [...unresolved].sort() }
}
