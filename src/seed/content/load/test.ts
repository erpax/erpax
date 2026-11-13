import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { SanitizedConfig } from 'payload'
import { pageRows } from '@/seed/content'
import { loadCorpus, overSdk, parseArgs, seededDocuments, type Rest } from '@/seed/content/load'

/** An in-memory REST stand-in that records what crossed the wire. */
function fakeSdk() {
  const docs: Array<Record<string, unknown> & { id: string }> = []
  const calls: Array<{ op: string; args: Record<string, unknown> }> = []
  const sdk: Rest = {
    find: async (args) => { calls.push({ op: 'find', args }); return { docs } },
    create: async (args) => { calls.push({ op: 'create', args }); const doc = { ...(args.data as object), id: `p${docs.length + 1}` }; docs.push(doc); return doc },
    update: async (args) => { calls.push({ op: 'update', args }); const doc = docs.find((d) => d.id === args.id)!; Object.assign(doc, args.data); return doc },
  }
  return { sdk, docs, calls }
}

const config = { collections: [] } as unknown as SanitizedConfig

describe('seed/content/load — the SDK seen as the Local API slice the loaders use', () => {
  it('forwards the query and drops what has no meaning over HTTP', async () => {
    const { sdk, calls } = fakeSdk()
    const local = overSdk(sdk, config)
    await local.find({ collection: 'pages', where: { slug: { equals: 'law' } }, select: { markdown: true }, req: { user: 1 }, context: { quiet: true }, limit: undefined } as never)
    expect(calls[0]!.args).toEqual({ collection: 'pages', where: { slug: { equals: 'law' } }, select: { markdown: true } })
    expect(local.config).toBe(config)
  })

  it('parses its flags, and treats a flag with no value as absent', () => {
    expect(parseArgs(['--url', 'https://h', '--packs', 'rules, law', '--tenant', 't1'])).toEqual({ url: 'https://h', packs: new Set(['rules', 'law']), tenant: 't1', seed: undefined, redirects: undefined })
    expect(parseArgs(['--url', '--packs', 'rules'])).toEqual({ url: undefined, packs: new Set(['rules']), tenant: undefined, seed: undefined, redirects: undefined })
  })
})

describe('seed/content/load — a pack loaded over REST', () => {
  const nodes = [{ path: 'rules' }, { path: 'rules/copy' }, { path: 'law' }]
  const read = (p: string) => ({ rules: '# rules', 'rules/copy': '# copy\nsee [[rules]]', law: '# law' })[p]

  it('fails closed when the target has no rich-text field to convert into', async () => {
    await expect(loadCorpus(fakeSdk().sdk, config, nodes, read, { packs: new Set(['rules']) })).rejects.toThrow(/no rich-text field/)
  })

  it('selects by pack before anything is read from the wire beyond the slug index', async () => {
    const { sdk, calls } = fakeSdk()
    await loadCorpus(sdk, config, nodes, read, { packs: new Set(['nothing']) })
    expect(calls.map((c) => c.op)).toEqual(['find'])
  })
})

describe('seed/content/load — the committed document seed', () => {
  const documents = JSON.parse(readFileSync(join(process.cwd(), 'src', 'seed', 'content', 'fixtures', 'documents.json'), 'utf8')) as Record<string, string>

  it('is read as nodes and a reader, and an unknown path has no document', () => {
    const { nodes, read } = seededDocuments({ a: '# a', 'a/b': '# b' })
    expect(nodes).toEqual([{ path: 'a' }, { path: 'a/b' }])
    expect(read('a/b')).toBe('# b')
    expect(read('ghost')).toBeUndefined()
  })

  it('every seeded document becomes a page row with a body, a title and a unique slug', () => {
    const { nodes, read } = seededDocuments(documents)
    const rows = pageRows(nodes, read)
    expect(rows.length).toBe(Object.keys(documents).length)
    expect(rows.length).toBeGreaterThan(0)
    expect(new Set(rows.map((r) => r.slug)).size).toBe(rows.length)
    for (const r of rows) {
      expect(r.markdown.length).toBeGreaterThan(0)
      expect(r.title.length).toBeGreaterThan(0)
    }
  })

  it('no seeded path is still a folder in the tree — a document has one home', () => {
    for (const path of Object.keys(documents)) expect(existsSync(join(process.cwd(), 'src', path, 'SKILL.md'))).toBe(false)
  })
})
