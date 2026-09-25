import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { exportNamesOf, unwiredPackages, assertPackagesCanonical, thinPackages } from './index'

/** A throwaway tree: a governed dep, its API face, and the src that may or may not call it. */
const tree = (api: string, srcCode: string): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-canon-'))
  writeFileSync(
    join(cwd, 'package.json'),
    JSON.stringify({ dependencies: { '@payloadcms/plugin-thing': '1.0.0' } }),
  )
  mkdirSync(join(cwd, 'node_modules/@payloadcms/plugin-thing/dist'), { recursive: true })
  writeFileSync(join(cwd, 'node_modules/@payloadcms/plugin-thing/dist/index.d.ts'), api)
  mkdirSync(join(cwd, 'src/a'), { recursive: true })
  writeFileSync(join(cwd, 'src/a/index.ts'), srcCode)
  return cwd
}

describe('rules/canonical — use the package or drop it', () => {
  it('reads the API from the package, never guesses it from the name', () => {
    // `r2Storage` is not derivable from `@payloadcms/storage-r2` — the package is the authority
    const cwd = tree('export declare const r2Storage: any;\nexport declare function other(): void;', '')
    expect(exportNamesOf(join(cwd, 'node_modules/@payloadcms/plugin-thing'))).toEqual(
      expect.arrayContaining(['r2Storage', 'other']),
    )
    rmSync(cwd, { recursive: true, force: true })
  })

  it('flags an installed package whose API is never called', () => {
    const cwd = tree('export declare const thingPlugin: any;', 'export const x = 1')
    expect(unwiredPackages(cwd).map((u) => u.dep)).toContain('@payloadcms/plugin-thing')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a called export clears it — under ANY of its export names', () => {
    const cwd = tree('export declare const r2Storage: any;', "import { r2Storage } from 'x'\nr2Storage({})")
    expect(unwiredPackages(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('an IMPORT alone is not use — the call site is the evidence', () => {
    // plugin-multi-tenant was imported in payload.config and never called, beside a hand-roll
    const cwd = tree('export declare const thingPlugin: any;', "import { thingPlugin } from 'x'")
    expect(unwiredPackages(cwd).map((u) => u.dep)).toContain('@payloadcms/plugin-thing')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a package with no readable API face is never judged (no guessing)', () => {
    const cwd = tree('', 'export const x = 1')
    expect(unwiredPackages(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — fails only on getting worse than its ceiling', () => {
    const cwd = tree('export declare const thingPlugin: any;', 'export const x = 1')
    expect(() => assertPackagesCanonical(cwd, 1)).not.toThrow()
    expect(() => assertPackagesCanonical(cwd, 0)).toThrow(/never called/)
    rmSync(cwd, { recursive: true, force: true })
  })
})

/**
 * The installed Payload must be the newest PUBLISHED build, pre-release included.
 *
 * Ordering is by publish TIME, never semver: the 4.x line is `4.0.0-internal.<git-hash>`, so
 * semver compares hashes alphanumerically and would report a confident, meaningless verdict.
 */
describe('rules/canonical — Payload currency, ordered by publish time', () => {
  const TIME = {
    created: '2020-01-01T00:00:00.000Z',
    modified: '2026-09-24T00:00:00.000Z',
    '3.90.2': '2026-09-23T00:00:00.000Z',
    '4.0.0-canary.37': '2026-09-24T00:00:00.000Z',
    '4.0.0-internal.38b7f1d': '2026-05-12T00:00:00.000Z',
    '4.0.0-internal.fec2230': '2026-06-01T00:00:00.000Z',
  }

  it('picks the newest by time, and ignores created/modified', async () => {
    const { newestByTime } = await import('@/rules/canonical')
    expect(newestByTime(TIME)?.version).toBe('4.0.0-canary.37')
    // semver would have preferred the alphabetically-larger hash — a meaningless answer
    expect(newestByTime(TIME)?.version).not.toBe('4.0.0-internal.fec2230')
    expect(newestByTime({})).toBeUndefined()
  })

  it('counts what was published after the installed build', async () => {
    const { publishedAfter } = await import('@/rules/canonical')
    expect(publishedAfter(TIME, '4.0.0-internal.38b7f1d')).toBe(3)
    expect(publishedAfter(TIME, '4.0.0-canary.37')).toBe(0)
    expect(publishedAfter(TIME, 'not-a-version')).toBe(0)
  })

  it('an unreachable registry is NOT a pass — reachable:false, never behind:0', async () => {
    const { currencyOf } = await import('@/rules/canonical')
    const c = currencyOf('payload', () => undefined)
    expect(c.reachable).toBe(false)
    expect(c.behind).toBe(0) // and the caller must read `reachable` before trusting it
    const ok = currencyOf('payload', () => TIME)
    expect(ok.reachable).toBe(true)
  })

  it('every @payloadcms package is read from package.json, never typed', async () => {
    const { payloadPackages, installedVersion } = await import('@/rules/canonical')
    const pkgs = payloadPackages()
    expect(pkgs).toContain('payload')
    expect(pkgs.filter((p) => p.startsWith('@payloadcms/')).length).toBeGreaterThan(10)
    expect(pkgs.every((p) => installedVersion(p) !== undefined)).toBe(true)
  })

  it('the RUNTIME packages move as one line — the tool packages need not', async () => {
    const { payloadPackages, installedVersion } = await import('@/rules/canonical')
    // @payloadcms/eslint-plugin is at 3.28.0 and that IS its newest — no 4.x exists and nothing
    // has been published after it. "All at one version" was an over-strong assertion: the law is
    // each package at ITS OWN newest, which a shared-version check cannot express.
    const runtime = payloadPackages().filter((p) => !p.includes('eslint'))
    const versions = new Set(runtime.map((p) => installedVersion(p)))
    expect(versions.size, `runtime payload packages at ${versions.size} versions: ${[...versions].join(', ')}`).toBe(1)
  })
})

/**
 * The live check. Ratcheted, not absolute: Payload publishes the 4.x internal line roughly daily,
 * so "the very newest build" would go red every morning for a reason nobody can act on. The gap is
 * always PRINTED, and the assertion is that it does not grow.
 */
describe('rules/canonical — how far behind Payload actually is', () => {
  const BEHIND_CEILING = 140 // measured 135 on 2026-09-25; the horizon is 0

  it('names the gap, and refuses a verdict when the registry cannot be asked', async () => {
    const { currencyOf } = await import('@/rules/canonical')
    const { execFileSync } = await import('node:child_process')
    const fetchTime = (pkg: string): Record<string, string> | undefined => {
      try {
        const out = execFileSync('npm', ['view', pkg, 'time', '--json'], {
          encoding: 'utf8',
          timeout: 120_000,
          stdio: ['ignore', 'pipe', 'ignore'],
        })
        return JSON.parse(out) as Record<string, string>
      } catch {
        return undefined // offline, or npm unavailable — NOT a pass
      }
    }
    const c = currencyOf('payload', fetchTime)
    if (!c.reachable) {
      // an unasked question is not an answer; the suite says so rather than reporting green
      console.log('payload currency — registry unreachable, no verdict reached')
      expect(c.behind).toBe(0)
      return
    }
    console.log(
      `payload ${c.installed} (${c.installedPublished.slice(0, 10)}) — newest ${c.newest} (${c.newestPublished.slice(0, 10)}) — ${c.behind} versions behind`,
    )
    expect(c.newest.length).toBeGreaterThan(0)
    expect(c.behind, `payload is ${c.behind} published versions behind ${c.newest}`).toBeLessThanOrEqual(BEHIND_CEILING)
  }, 180_000)
})

describe('thinPackages — a dependency used once is un-folded', () => {
  it('reads real import sites, so a dep the corpus calls many times is not thin', () => {
    const thin = thinPackages(process.cwd()).map((t) => t.pkg)
    // `stripe` is called from 7 files — it earns its place and must not appear
    expect(thin).not.toContain('stripe')
    expect(thin).not.toContain('react-hook-form')
  })

  it('the platform is never judged — you cannot locally replace the runtime you build on', () => {
    const thin = thinPackages(process.cwd(), 99).map((t) => t.pkg)
    for (const p of ['payload', 'next', 'react', 'sharp', 'graphql']) expect(thin).not.toContain(p)
  })

  it('zero sites in src is not zero USES — a config or a git hook is outside the scan', () => {
    // cross-env runs in .husky/pre-push and dotenv in playwright/vitest config: the honest
    // boundary of this measurement, declared rather than silently mis-reported as dead.
    const zero = thinPackages(process.cwd()).filter((t) => t.sites === 0).map((t) => t.pkg)
    expect(zero.every((p) => ['cross-env', 'dotenv'].includes(p))).toBe(true)
  })
})
