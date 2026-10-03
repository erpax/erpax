import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { installedPackages, upstreamCatalogue, upstreamCross } from './index'

const dirs = (names: string[]) => names.map((name) => ({ name, type: 'dir' }))
const fakeFetch = (bodies: Record<string, unknown>, status = 200) => async (url: string) => {
  const dir = url.slice(url.lastIndexOf('/') + 1)
  const body = bodies[dir]
  return { ok: body !== undefined && status === 200, status: body === undefined ? 404 : status, json: async () => body }
}

describe('payload/upstream — the catalogue, from an injected fetch', () => {
  it('lists directories of templates, examples and packages, skipping underscore scaffolds', async () => {
    const c = await upstreamCatalogue(fakeFetch({ templates: dirs(['_data', 'website', 'blank']), examples: dirs(['auth']), packages: [...dirs(['plugin-seo']), { name: 'README.md', type: 'file' }] }))
    expect(c.entries).toEqual([
      { kind: 'template', name: 'website' },
      { kind: 'template', name: 'blank' },
      { kind: 'example', name: 'auth' },
      { kind: 'package', name: 'plugin-seo' },
    ])
    expect(c.refused).toEqual([])
  })

  it('a directory it cannot read is refused by name, never reported as empty', async () => {
    const c = await upstreamCatalogue(fakeFetch({ templates: dirs(['website']) }))
    expect(c.entries.map((e) => e.name)).toEqual(['website'])
    expect(c.refused).toEqual(['examples: HTTP 404', 'packages: HTTP 404'])
  })
})

describe('payload/upstream — the cross against a tree', () => {
  const plant = (): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-upstream-'))
    writeFileSync(join(root, 'package.json'), JSON.stringify({ dependencies: { payload: '4', '@payloadcms/plugin-seo': '4', '@payloadcms/db-d1-sqlite': '4' } }))
    mkdirSync(join(root, 'src', 'auth'), { recursive: true })
    return root
  }

  it('a package is held when installed; a template or example by its declared evidence; the rest is unaskable', () => {
    const root = plant()
    try {
      expect([...installedPackages(root)].sort()).toEqual(['db-d1-sqlite', 'payload', 'plugin-seo'])
      const x = upstreamCross(
        [
          { kind: 'package', name: 'plugin-seo' },
          { kind: 'package', name: 'db-postgres' },
          { kind: 'template', name: 'with-cloudflare-d1' },
          { kind: 'template', name: 'website' },
          { kind: 'template', name: 'blank' },
          { kind: 'example', name: 'auth' },
          { kind: 'example', name: 'astro' },
          { kind: 'example', name: 'never-declared' },
        ],
        root,
        '2026-10-03',
      )
      const by = Object.fromEntries(x.rows.map((r) => [r.name, r.held]))
      expect(by).toEqual({ 'plugin-seo': true, 'db-postgres': false, 'with-cloudflare-d1': true, website: false, blank: null, auth: true, astro: null, 'never-declared': null })
      expect(x.held).toBe(3)
      expect(x.gaps).toEqual([{ kind: 'package', name: 'db-postgres' }, { kind: 'template', name: 'website' }])
      expect(x.unaskable.map((u) => u.name)).toEqual(['blank', 'astro', 'never-declared'])
      expect(x.coverage).toEqual({ template: 0.5, example: 1, package: 0.5 })
      expect(x.rows.find((r) => r.name === 'never-declared')!.evidence).toContain('no evidence declared')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('on the live tree: every installed @payloadcms package reads as held, and the declared evidence resolves', () => {
    const installed = installedPackages(process.cwd())
    const x = upstreamCross([...installed].filter((n) => n !== 'payload').map((name) => ({ kind: 'package' as const, name })), process.cwd())
    expect(x.rows.every((r) => r.held === true)).toBe(true)
    const ev = upstreamCross([{ kind: 'template', name: 'website' }, { kind: 'example', name: 'draft-preview' }, { kind: 'example', name: 'multi-tenant' }], process.cwd())
    expect(ev.rows.map((r) => r.held)).toEqual([true, true, true])
  })
})
