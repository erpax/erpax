import type { Config } from 'payload'

import { describe, expect, it } from 'vitest'

import { DEFAULT_MAX_PER_DOC, VERSIONS_EXCLUDE, versionsPlugin } from './index'

type Coll = { slug: string; fields: never[]; versions?: unknown }
const run = (collections: Coll[], opts?: Parameters<typeof versionsPlugin>[0]): Config =>
  versionsPlugin(opts)({ collections } as unknown as Config) as Config

describe('versionsPlugin — universal native Payload versioning', () => {
  it('enables history-only native versions on a plain collection', () => {
    const out = run([{ slug: 'invoices', fields: [] }])
    expect(out.collections?.[0]?.versions).toEqual({ maxPerDoc: DEFAULT_MAX_PER_DOC })
  })

  it('leaves a collection that already configures versions untouched (richer wins)', () => {
    const drafts = { drafts: { autosave: { interval: 100 } }, maxPerDoc: 50 }
    const out = run([{ slug: 'pages', fields: [], versions: drafts }])
    expect(out.collections?.[0]?.versions).toBe(drafts) // same reference — not replaced
  })

  it('skips excluded append-only logs (versioning immutable history is waste)', () => {
    const out = run([{ slug: 'audit-events', fields: [] }])
    expect(out.collections?.[0]?.versions).toBeUndefined()
    expect(VERSIONS_EXCLUDE.has('audit-events')).toBe(true)
  })

  it('respects custom exclude + maxPerDoc, enabling the rest', () => {
    const out = run(
      [
        { slug: 'ledger', fields: [] },
        { slug: 'orders', fields: [] },
      ],
      { exclude: ['ledger'], maxPerDoc: 10 },
    )
    expect(out.collections?.[0]?.versions).toBeUndefined() // excluded
    expect(out.collections?.[1]?.versions).toEqual({ maxPerDoc: 10 })
  })

  it('is history-only — never injects drafts (public read behavior unchanged)', () => {
    const out = run([{ slug: 'orders', fields: [] }])
    const v = out.collections?.[0]?.versions as { drafts?: unknown } | undefined
    expect(v).toBeDefined()
    expect(v?.drafts).toBeUndefined()
  })
})
