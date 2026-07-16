import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { exportNamesOf, unwiredPackages, assertPackagesCanonical } from './index'

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
