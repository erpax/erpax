import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { SanitizedConfig } from 'payload'
import { loadCorpus, overSdk, parseArgs, skillReader, type Rest } from '@/seed/content/load'

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

  it('reads a SKILL document from a checkout, and nothing for an atom without one', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'load-'))
    mkdirSync(join(cwd, 'src', 'law'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'law', 'SKILL.md'), '# law — one law')
    const read = skillReader(cwd)
    // no law sentence, no cited proof, no tests: nothing to show, so nothing is appended
    expect(read('law')).toBe('# law — one law')
    writeFileSync(join(cwd, 'src', 'law', 'test.ts'), "it('a', () => {})\nit('b', () => {})\n")
    expect(read('law')).toMatch(/## Proof[\s\S]*No formal proof is cited[\s\S]*2 test case\(s\)/)
    expect(read('ghost')).toBeUndefined()
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
