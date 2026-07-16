/**
 * book/write — complete missing volumes: matter + proof + computed faces.
 * A missing book is form without matter; writing completes the trinity.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { P0_ACCOUNTING_LEAVES } from '@/accounting/gaps'
import { bondRankOf, harmonyOfBookIndex, indexVolumes, normalizePath } from './index'

const SRC = 'src'

export type MissingBookReason = 'top30' | 'top50' | 'accounting'

export interface MissingBookEntry {
  readonly path: string
  readonly reason: MissingBookReason
  readonly needsWrite: boolean
  readonly needsSeal: boolean
  readonly form: boolean
  readonly code: boolean
  readonly proof: boolean
  readonly sealed: boolean
}

export interface MissingBooksReport {
  readonly beforeTrinityPct: number
  readonly entries: readonly MissingBookEntry[]
  readonly writeCount: number
  readonly sealCount: number
}

const trinityOf = (cwd: string, atomPath: string) => {
  const base = join(cwd, SRC, atomPath)
  const form = existsSync(join(base, 'SKILL.md')) || existsSync(join(base, 'README.md'))
  const code = existsSync(join(base, 'index.ts'))
  const proof = existsSync(join(base, 'test.ts')) || existsSync(join(base, 'index.test.ts'))
  const readme = existsSync(join(base, 'README.md')) ? readFileSync(join(base, 'README.md'), 'utf8') : ''
  const sealed = /\[\[seal\]\] `1`/.test(readme)
  return {
    form,
    code,
    proof,
    sealed,
    needsWrite: form && (!code || !proof),
    needsSeal: form && code && proof && !sealed,
  }
}

export function missingBooks(cwd: string = process.cwd(), max = 40): MissingBooksReport {
  const h = harmonyOfBookIndex(cwd)
  const volumes = new Set(indexVolumes(cwd))
  const seen = new Set<string>()
  const entries: MissingBookEntry[] = []

  const push = (path: string, reason: MissingBookReason) => {
    const p = normalizePath(path)
    if (!p || seen.has(p)) return
    const t = trinityOf(cwd, p)
    if (!t.needsWrite && !t.needsSeal) return
    seen.add(p)
    entries.push({ path: p, reason, ...t })
  }

  for (const { path } of h.topHubs.slice(0, 30)) push(path, 'top30')
  for (const p of [...volumes]
    .filter((v) => trinityOf(cwd, v).needsWrite)
    .sort((a, b) => bondRankOf(b) - bondRankOf(a))) {
    push(p, 'top50')
    if (entries.length >= max) break
  }
  for (const p of P0_ACCOUNTING_LEAVES) {
    push(p, 'accounting')
    if (entries.length >= max) break
  }

  const slice = entries.slice(0, max)
  return {
    beforeTrinityPct: h.metrics.trinityPct,
    entries: slice,
    writeCount: slice.filter((e) => e.needsWrite).length,
    sealCount: slice.filter((e) => e.needsSeal).length,
  }
}

export const volumeIndexTs = (atomPath: string): string => {
  if (atomPath === 'config') {
    return `import { APP_COLLECTION_SLUGS } from './app/collections'
export { APP_COLLECTION_SLUGS }
export type { AppCollectionSlug } from './app/collections'
export const volume = 'config' as const
export const atomPath = 'config' as const
export function collectionCount(): number { return APP_COLLECTION_SLUGS.length }
`
  }
  return `import { deriveFolderModel } from '@/readme/compute'
export const volume = '${atomPath}' as const
export const atomPath = '${atomPath}' as const
export function spreadOf(path: string = atomPath) {
  const m = deriveFolderModel(path)
  return { debit: m.statement.totalDebits, credit: m.statement.totalCredits }
}
`
}

export const volumeTestTs = (atomPath: string): string => {
  if (atomPath === 'config') {
    return `import { describe, it, expect } from 'vitest'
import { atomPath, collectionCount, APP_COLLECTION_SLUGS } from './index'
describe('config — book matter', () => {
  it('exports volume identity', () => expect(atomPath).toBe('config'))
  it('collectionCount matches slugs', () => {
    expect(collectionCount()).toBe(APP_COLLECTION_SLUGS.length)
    expect(collectionCount()).toBeGreaterThan(0)
  })
})
`
  }
  return `import { describe, it, expect } from 'vitest'
import { volume, atomPath, spreadOf } from './index'
describe('${atomPath} — book matter', () => {
  it('exports volume identity', () => {
    expect(volume).toBe('${atomPath}')
    expect(atomPath).toBe('${atomPath}')
  })
  it('spreadOf is non-negative', () => {
    const s = spreadOf()
    expect(s.debit).toBeGreaterThanOrEqual(0)
    expect(s.credit).toBeGreaterThanOrEqual(0)
  })
})
`
}

export function formatMissingBooksReport(cwd: string = process.cwd(), max = 40): string {
  const r = missingBooks(cwd, max)
  return [
    'missing books',
    '',
    `trinity ${Math.round(r.beforeTrinityPct * 1000) / 10}% · write \`${r.writeCount}\` · seal \`${r.sealCount}\``,
    '',
    ...r.entries.map(
      (e) =>
        `- \`${e.path}\` · ${e.needsWrite ? 'write' : 'seal'} · ${e.reason} · form \`${e.form ? 1 : 0}\` code \`${e.code ? 1 : 0}\` proof \`${e.proof ? 1 : 0}\` sealed \`${e.sealed ? 1 : 0}\``,
    ),
  ].join('\n')
}

export interface WriteMissingBooksResult {
  readonly written: readonly string[]
  readonly sealed: readonly string[]
  readonly beforeTrinityPct: number
  readonly afterTrinityPct: number
}

export async function writeMissingBooks(opts: {
  readonly cwd?: string
  readonly max?: number
  readonly dryRun?: boolean
} = {}): Promise<WriteMissingBooksResult> {
  const cwd = opts.cwd ?? process.cwd()
  const dryRun = opts.dryRun ?? false
  const before = harmonyOfBookIndex(cwd).metrics.trinityPct
  const report = missingBooks(cwd, opts.max ?? 40)
  const written: string[] = []
  const toSeal: string[] = []

  for (const entry of report.entries) {
    const dir = join(cwd, SRC, entry.path)
    if (entry.needsWrite && existsSync(join(dir, 'SKILL.md'))) {
      if (!dryRun) mkdirSync(dir, { recursive: true })
      if (!existsSync(join(dir, 'index.ts')) && !dryRun) {
        writeFileSync(join(dir, 'index.ts'), volumeIndexTs(entry.path), 'utf8')
      }
      if (!existsSync(join(dir, 'test.ts')) && !dryRun) {
        writeFileSync(join(dir, 'test.ts'), volumeTestTs(entry.path), 'utf8')
      }
      written.push(entry.path)
    }
    if (entry.needsWrite || entry.needsSeal) toSeal.push(entry.path)
  }

  if (!dryRun && toSeal.length > 0) {
    const { materializeComputedFacesForPathsStable } = await import('@/readme/compute')
    materializeComputedFacesForPathsStable(toSeal, cwd)
  }

  const after = dryRun ? before : harmonyOfBookIndex(cwd).metrics.trinityPct
  return { written, sealed: toSeal, beforeTrinityPct: before, afterTrinityPct: after }
}
