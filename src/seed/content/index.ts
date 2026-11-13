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
 * @invariant a row's parent is the nearest ancestor present in the same set, so parents sort first
 * @invariant loading the same rows twice creates nothing and updates nothing
 * @standard CommonMark 0.31 markdown wire-form
 * @see ./SKILL.md
 */
import type { Field, Payload, PayloadRequest, RichTextField } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
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

/** One nested page to load. `parent` and `links` are slugs, resolved to ids by the loader. */
export interface PageRow {
  readonly path: string
  readonly slug: string
  readonly title: string
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

/** Markdown as the stored state of one collection's rich-text field, using that field's own editor. */
export function toLexical(payload: Pick<Payload, 'config'>, collection: 'pages' | 'posts', field: string, markdown: string) {
  const fields = payload.config.collections.find((c) => c.slug === collection)?.fields ?? []
  const target = richTextField(fields, field)
  if (!target) throw new Error(`seed/content: ${collection} has no rich-text field named ${field}`)
  return convertMarkdownToLexical({
    editorConfig: editorConfigFactory.fromField({ field: target }),
    markdown: wikiToLinks(markdown),
  })
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
