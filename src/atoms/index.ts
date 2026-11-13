/**
 * Atoms — the corpus served as nested docs: one row per atom, tenant-loaded from a seed.
 *
 * The body is Lexical rich text; markdown is its wire form. A client (the MCP plugin's standard
 * collection tools, the REST API, the SDK) writes `markdown` and reads `markdown` back — the field
 * hooks convert with the rich-text package's own converters, so no custom tool is needed to serve
 * an atom. `[[wikilinks]]` become ordinary links to `/atoms/<path>`; the resolved targets are held
 * in `links`, a real relationship, so a reference between two nested docs is queryable.
 *
 * `parent` is self-referential, so the nested-docs plugin enables itself for this collection
 * (payload.config) and materialises `breadcrumbs` — the path, computed.
 *
 * @standard CommonMark 0.31 markdown wire-form
 * @standard ISO/IEC 25010:2023 §5.6 maintainability — one collection, standard API, no per-area tools
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./seed.ts — rows derived from the tree and loaded through the Local API
 */
import type { CollectionConfig, FieldHook, RichTextField } from 'payload'
import {
  convertLexicalToMarkdown,
  convertMarkdownToLexical,
  editorConfigFactory,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { tenantMasterDataAccess } from '@/auth'
import { standardCollectionHooks } from '@/standard/collection/hook'

/** The URL prefix an atom link carries — relative, so the editor's URL sanitiser keeps it. */
const ATOM_HREF = '/atoms/'

const WIKILINK = /\[\[([a-z0-9][a-z0-9/-]*)\]\]((?:\/[a-z0-9][a-z0-9-]*)*)/g

/** `[[rules]]/copy` → `[rules/copy](/atoms/rules/copy)` — a wikilink is a markdown link with a known href. */
export function wikiToLinks(markdown: string): string {
  return markdown.replace(WIKILINK, (_m, head: string, tail: string) => {
    const path = `${head}${tail}`
    return `[${path}](${ATOM_HREF}${path})`
  })
}

/** Every atom path a markdown body links to, in order of first appearance, de-duplicated. */
export function linkedPaths(markdown: string): string[] {
  const out = new Set<string>()
  for (const m of wikiToLinks(markdown).matchAll(/\]\(\/atoms\/([a-z0-9][a-z0-9/-]*)\)/g)) out.add(m[1]!)
  return [...out]
}

const bodyField = (fields: readonly unknown[]): RichTextField | undefined =>
  fields.find((f): f is RichTextField => (f as { name?: string }).name === 'body')

/** Inbound: markdown on the wire becomes the stored rich text. Markdown wins when both are sent. */
const bodyFromMarkdown: FieldHook = ({ field, siblingData, value }) => {
  const markdown = (siblingData as { markdown?: unknown }).markdown
  if (typeof markdown !== 'string' || !markdown.trim()) return value
  return convertMarkdownToLexical({
    editorConfig: editorConfigFactory.fromField({ field: field as RichTextField }),
    markdown: wikiToLinks(markdown),
  })
}

/** Outbound: the stored rich text is read back as markdown. The field is virtual — never stored. */
const markdownFromBody: FieldHook = ({ siblingData, siblingFields }) => {
  const field = bodyField(siblingFields)
  const data = (siblingData as { body?: unknown }).body
  if (!field || !data || typeof data !== 'object') return null
  return convertLexicalToMarkdown({
    data: data as Parameters<typeof convertLexicalToMarkdown>[0]['data'],
    editorConfig: editorConfigFactory.fromField({ field }),
  })
}

const Atoms: CollectionConfig = {
  slug: 'atoms',
  labels: { singular: 'Atom', plural: 'Atoms' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['path', 'name', 'pack', 'kind'],
    description: 'The corpus as nested docs — one row per atom, loaded per tenant from a seed pack.',
    group: 'Corpus',
  },
  access: tenantMasterDataAccess(),
  fields: [
    { name: 'path', type: 'text', required: true, index: true,
      admin: { description: 'The atom path — the account code (e.g. rules/copy).' } },
    { name: 'name', type: 'text', required: true, index: true,
      admin: { description: 'The leaf word of the path.' } },
    { name: 'parent', type: 'relationship', relationTo: 'atoms',
      admin: { description: 'Parent atom (self-referential — nested docs).' } },
    { name: 'pack', type: 'text', index: true,
      admin: { description: 'The seed pack this row was loaded from (the first path segment).' } },
    { name: 'kind', type: 'select', defaultValue: 'prose', index: true,
      options: [
        { label: 'Prose', value: 'prose' },
        { label: 'Code', value: 'code' },
      ],
      admin: { description: 'prose: the row is the whole atom. code: a package implements it.' } },
    { name: 'address', type: 'text', index: true,
      admin: { description: 'The atom content-uuid in the corpus matrix.', readOnly: true } },
    { name: 'content', type: 'text', index: true,
      admin: { description: 'Content address of the seed row — an unchanged row is not rewritten.', readOnly: true } },
    { name: 'body', type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((f) => f.key !== 'link'),
          LinkFeature({ enabledCollections: ['atoms'] }),
        ],
      }),
      hooks: { beforeChange: [bodyFromMarkdown] } },
    { name: 'markdown', type: 'textarea', virtual: true,
      admin: { description: 'The body as markdown — write it to set the body, read it to get the body.' },
      hooks: { afterRead: [markdownFromBody] } },
    { name: 'links', type: 'relationship', relationTo: 'atoms', hasMany: true,
      admin: { description: 'Atoms this body links to — resolved from its [[wikilinks]].' } },
  ],
  hooks: standardCollectionHooks('atoms'),
  timestamps: true,
}

export default Atoms
