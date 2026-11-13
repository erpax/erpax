/**
 * atoms/seed — the tree projected into rows, and the rows loaded through the Local API.
 *
 * Two halves, kept apart on purpose. `atomRows` is pure: it takes the matrix nodes and a reader the
 * caller injects, so it never touches the filesystem and runs anywhere. `loadAtoms` is the hook
 * side: it writes rows with the standard collection operations, parents first, then resolves the
 * links — idempotent, because an unchanged row keeps its content address and is skipped.
 *
 * @invariant a row's parent is the nearest ancestor present in the same set, so parents sort first
 * @invariant loading the same rows twice creates nothing and updates nothing
 * @see ./index.ts
 */
import type { Payload, PayloadRequest } from 'payload'
import { contentAddress } from '@/seed/row'
import { linkedPaths } from './index'

/** What the caller's reader returns for one atom path. */
export interface AtomSource {
  /** the SKILL body, as markdown */
  readonly markdown: string
  /** true when a package implements the atom (it has a barrel) */
  readonly code: boolean
}

export interface AtomRow {
  readonly path: string
  readonly name: string
  readonly parent: string | null
  readonly pack: string
  readonly kind: 'prose' | 'code'
  readonly address: string
  readonly content: string
  readonly markdown: string
  readonly links: readonly string[]
}

const depth = (path: string): number => path.split('/').length

/** Strip a leading YAML frontmatter block — it is generated, and the row carries its own fields. */
export function stripFrontmatter(markdown: string): string {
  return markdown.startsWith('---\n') ? markdown.replace(/^---\n[\s\S]*?\n---\n+/, '') : markdown
}

/**
 * Derive seed rows from matrix nodes. `packs` selects first-level folders; omitted means all.
 * A node the reader does not know is skipped — a row without a body is not a doc.
 */
export function atomRows(
  nodes: ReadonlyArray<{ readonly path: string; readonly uuid: string }>,
  read: (path: string) => AtomSource | undefined,
  packs?: ReadonlySet<string>,
): AtomRow[] {
  const picked = nodes
    .filter((n) => !packs || packs.has(n.path.split('/')[0]!))
    .map((n) => ({ node: n, source: read(n.path) }))
    .filter((x): x is { node: (typeof nodes)[number]; source: AtomSource } => x.source !== undefined)
  const present = new Set(picked.map((x) => x.node.path))
  const nearest = (path: string): string | null => {
    const parts = path.split('/')
    for (let i = parts.length - 1; i > 0; i--) {
      const up = parts.slice(0, i).join('/')
      if (present.has(up)) return up
    }
    return null
  }
  return picked
    .map(({ node, source }): AtomRow => {
      const markdown = stripFrontmatter(source.markdown).trim()
      const base = {
        path: node.path,
        name: node.path.slice(node.path.lastIndexOf('/') + 1),
        parent: nearest(node.path),
        pack: node.path.split('/')[0]!,
        kind: source.code ? ('code' as const) : ('prose' as const),
        address: node.uuid,
        markdown,
        links: linkedPaths(markdown).filter((p) => p !== node.path),
      }
      return { ...base, content: contentAddress(base) }
    })
    .sort((a, b) => depth(a.path) - depth(b.path) || a.path.localeCompare(b.path))
}

export interface LoadResult {
  readonly created: number
  readonly updated: number
  readonly unchanged: number
  /** link targets that named no loaded atom — reported, never invented */
  readonly unresolved: readonly string[]
}

type Local = Pick<Payload, 'find' | 'create' | 'update'>

/**
 * Load rows through the Local API. A link resolves by exact path, else by a leaf that exactly one
 * loaded atom carries; anything else is returned in `unresolved`.
 */
export async function loadAtoms(
  payload: Local,
  rows: readonly AtomRow[],
  opts: { readonly req?: PayloadRequest; readonly tenant?: string } = {},
): Promise<LoadResult> {
  const { req, tenant } = opts
  const scope = tenant === undefined ? {} : { tenant }
  const existing = await payload.find({
    collection: 'atoms',
    depth: 0,
    pagination: false,
    req,
    select: { path: true, content: true },
    ...(tenant === undefined ? {} : { where: { tenant: { equals: tenant } } }),
  })
  const idOf = new Map<string, string>()
  const contentOf = new Map<string, string | null | undefined>()
  for (const d of existing.docs) {
    idOf.set(d.path, d.id)
    contentOf.set(d.path, d.content)
  }

  let created = 0
  let updated = 0
  let unchanged = 0
  const touched: AtomRow[] = []
  for (const row of rows) {
    const data = {
      path: row.path,
      name: row.name,
      pack: row.pack,
      kind: row.kind,
      address: row.address,
      content: row.content,
      markdown: row.markdown,
      parent: row.parent === null ? null : (idOf.get(row.parent) ?? null),
      ...scope,
    }
    const id = idOf.get(row.path)
    if (id === undefined) {
      const doc = await payload.create({ collection: 'atoms', data, depth: 0, req })
      idOf.set(row.path, doc.id)
      created++
      touched.push(row)
    } else if (contentOf.get(row.path) !== row.content) {
      await payload.update({ collection: 'atoms', id, data, depth: 0, req })
      updated++
      touched.push(row)
    } else {
      unchanged++
    }
  }

  // Second pass: every id now exists, so links can be resolved — by path, else by a unique leaf.
  const byLeaf = new Map<string, string[]>()
  for (const path of idOf.keys()) {
    const leaf = path.slice(path.lastIndexOf('/') + 1)
    byLeaf.set(leaf, [...(byLeaf.get(leaf) ?? []), path])
  }
  const unresolved = new Set<string>()
  for (const row of touched) {
    const ids: string[] = []
    for (const target of row.links) {
      const exact = idOf.get(target)
      const leafHits = exact === undefined ? (byLeaf.get(target) ?? []) : []
      const id = exact ?? (leafHits.length === 1 ? idOf.get(leafHits[0]!) : undefined)
      if (id === undefined) unresolved.add(target)
      else if (!ids.includes(id)) ids.push(id)
    }
    if (ids.length) {
      await payload.update({ collection: 'atoms', id: idOf.get(row.path)!, data: { links: ids }, depth: 0, req })
    }
  }
  return { created, updated, unchanged, unresolved: [...unresolved].sort() }
}
