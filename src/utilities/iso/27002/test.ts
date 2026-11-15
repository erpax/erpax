import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { bannerPattern, supersededEditions } from '@/seed/standards'
import { ISO_27002_CATALOG } from '@/utilities/iso/27002'

const src = join(import.meta.dirname, '..', '..', '..')

/** Every source file under `src`, except the generated skills index (~80 MB) and anything large. */
const sources = (dir: string = src): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : sources(path)
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.startsWith('skills.index') && statSync(path).size < 400_000 ? [path] : []
  })

const files = sources().map((path) => ({ path: path.slice(src.length + 1), text: readFileSync(path, 'utf8') }))
const ids = new Set<string>(ISO_27002_CATALOG.map((row) => row.id))

describe('ISO 27002 claims are typed and checked', () => {
  const claims = files.flatMap(({ path, text }) =>
    [...text.matchAll(/export const controlsApplied[^=]*=\s*(\[[^\]]*\])/g)].map((match) => ({ path, ids: [...match[1]!.matchAll(/'([0-9]+\.[0-9]+)'/g)].map((m) => m[1]!) })),
  )

  it('every controlsApplied list uses only controls the catalogue knows', () => {
    expect(claims.length).toBeGreaterThan(10)
    for (const claim of claims) for (const id of claim.ids) expect(ids.has(id), `${claim.path} claims unknown control ${id}`).toBe(true)
  })

  it('the role-based access modules claim their controls', () => {
    for (const path of ['access/collections/shared/abilityAccess.ts', 'access/collections/shared/appAccess.ts']) {
      expect(claims.find((claim) => claim.path === path)?.ids.length, path).toBeGreaterThan(0)
    }
  })

  it('segregation of duties is 5.3, not 5.4 (27002:2022 renumbered it)', () => {
    expect(ISO_27002_CATALOG.find((row) => row.id === '5.3')?.title).toBe('Segregation of duties')
    expect(ids.has('5.4' as never)).toBe(false)
  })
})

describe('banners do not cite a superseded edition', () => {
  // The editions come from ISO Open Data (src/seed/standards, written by scripts/standards-refresh.mjs):
  // an edition ISO has withdrawn may not be cited by a banner tag. Prose that explains one is not a banner.
  const tag = /^\s*\*\s*@(?:standard|security|compliance|audit)\b.*$/gm
  const banners = files.flatMap(({ path, text }) => (path === 'utilities/iso/27002/test.ts' ? [] : [...text.matchAll(tag)].map((match) => ({ path, line: match[0] }))))
  it('the scan sees the banners (it is not vacuous)', () => expect(banners.length).toBeGreaterThan(500))
  it.each(supersededEditions().map((row) => row.reference))('%s is cited by no banner', (reference) => {
    const pattern = bannerPattern(reference)
    expect(banners.filter(({ line }) => pattern.test(line)).map(({ path }) => path)).toEqual([])
  })
})
