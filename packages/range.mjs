/**
 * range — the one rule that gives every @erpax/* package the app's own dependency versions.
 *
 * A package names a dependency at the ROOT package.json's range, so every package installs the
 * version the app runs: bump a dependency at the root and every package follows. `build.mjs`
 * places the dependencies a bundle imports with `placeOf`; `release.mjs --ranges` compares (and
 * with `--write` rewrites) the committed manifests against the root without a build, so a root
 * bump reaches every manifest in milliseconds. `pnpm lint` runs the comparison, which puts it
 * in the pre-push hook and in CI's Lint check; the pre-commit hook runs the rewrite whenever
 * package.json or pnpm-workspace.yaml is staged.
 *
 * `@erpax/algebra` keeps its own hand-audited manifest and is left out, as in the release.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packagesDir = dirname(fileURLToPath(import.meta.url))
const root = join(packagesDir, '..')

/** Provided by the host app: a package names them as peers so the app's one copy is used. */
export const PEERS = new Set(['payload', 'next', 'react', 'react-dom'])

/** Every range the root package.json declares; a runtime range wins over a dev one. */
export const rootRanges = () => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  return { ...pkg.devDependencies, ...pkg.dependencies }
}

/** Where a dependency belongs and at what range. A name the root does not declare is an open peer. */
export const placeOf = (name, ranges) => {
  const range = ranges[name]
  if (PEERS.has(name)) return ['peerDependencies', range ?? '*']
  return range ? ['dependencies', range] : ['peerDependencies', '*']
}

const sectionOf = (sections, name) => (name in (sections.dependencies ?? {}) ? 'dependencies' : 'peerDependencies')

/** A manifest's dependency sections as `placeOf` gives them, keys sorted, empty sections dropped. */
const placedSections = (pkg, ranges) => {
  const names = [...new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})])].sort()
  const sections = { dependencies: {}, peerDependencies: {} }
  for (const name of names) {
    const [section, range] = placeOf(name, ranges)
    sections[section][name] = range
  }
  return {
    dependencies: Object.keys(sections.dependencies).length ? sections.dependencies : undefined,
    peerDependencies: Object.keys(sections.peerDependencies).length ? sections.peerDependencies : undefined,
  }
}

/**
 * Every dependency whose committed range differs from the root's, as `{ manifest, name, from, to }`.
 * With `write`, each drifted manifest is rewritten in place (key order kept, as build.mjs writes it).
 */
export function rangeDrift({ write = false } = {}) {
  const ranges = rootRanges()
  const drift = []
  for (const dir of readdirSync(packagesDir).sort()) {
    if (dir === 'algebra') continue
    const manifest = join(packagesDir, dir, 'package.json')
    if (!existsSync(manifest)) continue
    const pkg = JSON.parse(readFileSync(manifest, 'utf8'))
    const placed = placedSections(pkg, ranges)
    const before = { ...pkg.peerDependencies, ...pkg.dependencies }
    const after = { ...placed.peerDependencies, ...placed.dependencies }
    const moved = Object.keys(after).filter((name) => before[name] !== after[name] || sectionOf(pkg, name) !== sectionOf(placed, name))
    for (const name of moved) drift.push({ manifest: `packages/${dir}/package.json`, name, from: before[name], to: after[name] })
    if (write && moved.length) {
      pkg.dependencies = placed.dependencies
      pkg.peerDependencies = placed.peerDependencies
      writeFileSync(manifest, `${JSON.stringify(pkg, null, 2)}\n`)
    }
  }
  return drift
}
