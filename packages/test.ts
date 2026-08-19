import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * packages — the release pipeline is STABLE.
 *
 * "Stable" is not a label here, it is a property that must hold: the same source
 * must build to the same content-uuid every time, or content-addressed versioning
 * is meaningless (every check would report a phantom change and re-release). This
 * suite proves the three legs the pipeline stands on.
 *
 * @standard RFC 9562 §5.8 — v8 content-uuid (the version signal)
 * @audit released.json is the receipt; drift fails the release gate
 */
const root = join(import.meta.dirname, '..')
const packagesDir = join(root, 'packages')
const MANIFEST = join(packagesDir, 'released.json')

const readManifest = (): Record<string, { version: string; contentUuid: string }> =>
  JSON.parse(readFileSync(MANIFEST, 'utf8'))

/** The split packages this pipeline versions (algebra releases on its own lane). */
const splitPackages = (): string[] =>
  readdirSync(packagesDir).filter(
    (n) => n !== 'algebra' && existsSync(join(packagesDir, n, 'package.json')),
  )

describe('packages — the release manifest', () => {
  it('records every split package, locked at a stable semver', () => {
    const m = readManifest()
    for (const leaf of splitPackages()) {
      const pkg = JSON.parse(readFileSync(join(packagesDir, leaf, 'package.json'), 'utf8'))
      const entry = m[pkg.name]
      expect(entry, `${pkg.name} missing from released.json`).toBeDefined()
      // the manifest version IS the package version — one source of truth
      expect(entry!.version).toBe(pkg.version)
      expect(entry!.version).toMatch(/^\d+\.\d+\.\d+$/)
      // a real content-uuid (v8: version nibble 8, variant 8|9|a|b)
      expect(entry!.contentUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    }
  })

  it('every released package declares its publish surface + closure ceiling', () => {
    for (const leaf of splitPackages()) {
      const pkg = JSON.parse(readFileSync(join(packagesDir, leaf, 'package.json'), 'utf8'))
      expect(pkg.publishConfig?.access, `${pkg.name} must publish public`).toBe('public')
      expect(pkg.publishConfig?.provenance, `${pkg.name} must ship provenance`).toBe(true)
      // the entanglement ratchet — a package cannot silently widen its closure
      expect(typeof pkg.erpax?.closureCeiling, `${pkg.name} missing erpax.closureCeiling`).toBe('number')
    }
  })
})

describe('packages — the build is REPRODUCIBLE (what makes a version stable)', () => {
  it('a rebuild of unchanged source reports no release — the content-uuid holds', () => {
    // release.mjs --check rebuilds every package and compares the content-uuid to the
    // manifest. Green ⇒ the same source folded to the same address: stable by proof,
    // not by assertion. Red ⇒ either real drift, or a non-deterministic build (the
    // esbuild `use strict` jitter this pipeline normalises away).
    const out = execFileSync('node', [join(packagesDir, 'release.mjs'), '--check'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    expect(out).toContain('in sync with built content')
  }, 600_000)
})
