#!/usr/bin/env node
/**
 * release — content-addressed versioning for the @erpax/* packages.
 *
 * The fold decides the version: a package is released only when its BUILT content
 * actually changed. Each build's dist is content-hashed to a v8 content-uuid (the
 * same primitive the corpus addresses everything with); that uuid is compared to
 * the last published one in packages/released.json. Unchanged uuid ⇒ no release
 * (nothing to ship). Changed uuid ⇒ patch bump, and the tag <pkg>-v<version> the
 * publish workflow fires on. No changeset files, no hand-bumped versions — the
 * content IS the version signal ("derivable content is not stored").
 *
 * Usage:
 *   node packages/release.mjs            # dry-run: print the release plan
 *   node packages/release.mjs --write    # bump changed package.json + update the manifest
 *   node packages/release.mjs --check    # CI: assert the manifest is in sync (fail on drift)
 *
 * "Fully comply" is the WORKFLOW's gate: it runs `pnpm check` (rules ratchet · folder
 * law · tests) BEFORE calling this, so only a green tree can produce a release plan.
 * This script owns versioning; the gate owns compliance; the workflow owns publish.
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packagesDir = dirname(fileURLToPath(import.meta.url))
const root = join(packagesDir, '..')
const MANIFEST = join(packagesDir, 'released.json')

/** v8 content-uuid of a buffer — the corpus's content-address primitive (RFC 9562 §5.8). */
function toUuid(buf) {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}

/**
 * Content-uuid of a package's whole dist tree — order-stable (files sorted), path-tagged.
 *
 * Normalised for MEANING, not bytes: esbuild emits a bare `"use strict";` directive
 * non-deterministically (inert in the ESM output), so a raw byte hash would flip a
 * package to "changed" on an identical source. Stripping those directive lines makes
 * the uuid track real source change — the whole point of content-addressed versioning.
 */
function distUuid(pkgDir) {
  const dist = join(pkgDir, 'dist')
  const parts = []
  const stripDirective = (buf) =>
    Buffer.from(buf.toString('utf8').replace(/^\s*["']use strict["'];?\s*$\n?/gm, ''), 'utf8')
  const walk = (d, rel) => {
    for (const e of readdirSync(d).sort()) {
      const p = join(d, e)
      const r = rel ? `${rel}/${e}` : e
      if (statSync(p).isDirectory()) walk(p, r)
      else {
        const raw = readFileSync(p)
        parts.push(Buffer.from(`${r}\0`), /\.(js|mjs|cjs|ts)$/.test(e) ? stripDirective(raw) : raw)
      }
    }
  }
  if (!existsSync(dist)) throw new Error(`no dist for ${pkgDir} — run the build first`)
  walk(dist, '')
  return toUuid(Buffer.concat(parts))
}

/**
 * The split @erpax/* packages this pipeline versions — public, and built by
 * packages/build.mjs. algebra is excluded: it has its own hand-audited build and
 * publish-algebra.yml, so it releases on its own tag through its own provider config.
 */
function publicPackages() {
  const out = []
  for (const name of readdirSync(packagesDir)) {
    if (name === 'algebra') continue
    const pj = join(packagesDir, name, 'package.json')
    if (!existsSync(pj)) continue
    const pkg = JSON.parse(readFileSync(pj, 'utf8'))
    if (pkg.private === true) continue
    out.push({ dir: join(packagesDir, name), pj, pkg })
  }
  return out
}

const bumpPatch = (v) => {
  const [maj, min, pat] = v.split('.').map((n) => parseInt(n, 10))
  return `${maj}.${min}.${(pat || 0) + 1}`
}

const mode = process.argv.includes('--write') ? 'write' : process.argv.includes('--check') ? 'check' : 'plan'
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}

// Build every split package so the dist reflects current source (content-addressed).
// algebra (MIT tier) keeps its own hand-audited build + publish-algebra.yml workflow,
// so it is released independently and excluded here — one package, one pipeline.
execFileSync('node', [join(packagesDir, 'build.mjs'), 'all'], { cwd: root, stdio: 'inherit' })

const plan = []
for (const { dir, pj, pkg } of publicPackages()) {
  const uuid = distUuid(dir)
  const prior = manifest[pkg.name]
  const changed = !prior || prior.contentUuid !== uuid
  const nextVersion = changed && prior ? bumpPatch(prior.version) : pkg.version
  plan.push({ name: pkg.name, dir, pj, pkg, uuid, changed, prior, version: changed ? nextVersion : pkg.version })
}

const changed = plan.filter((p) => p.changed)
console.log(`\n📦 release plan — ${changed.length}/${plan.length} package(s) changed:`)
for (const p of plan) {
  const tag = `${p.name.replace('@erpax/', '')}-v${p.version}`
  console.log(
    `  ${p.changed ? '●' : '○'} ${p.name.padEnd(20)} ${p.version.padEnd(8)} ${p.changed ? `→ tag ${tag}` : '(unchanged)'} · ${p.uuid.slice(0, 8)}`,
  )
}

if (mode === 'check') {
  if (changed.length) {
    console.error(
      `\n✖ ${changed.length} package(s) changed but the manifest is stale — run \`node packages/release.mjs --write\` and commit.`,
    )
    process.exit(1)
  }
  console.log('\n✓ released.json in sync with built content')
} else if (mode === 'write') {
  for (const p of changed) {
    if (p.version !== p.pkg.version) {
      const txt = readFileSync(p.pj, 'utf8').replace(/("version":\s*")[^"]+(")/, `$1${p.version}$2`)
      writeFileSync(p.pj, txt)
    }
    manifest[p.name] = { version: p.version, contentUuid: p.uuid }
  }
  writeFileSync(MANIFEST, JSON.stringify(sortKeys(manifest), null, 2) + '\n')
  console.log(`\n✓ bumped ${changed.length} package(s) + updated released.json — commit, then tag <pkg>-v<version> to publish.`)
} else {
  console.log('\n(dry-run) — `--write` to bump + record, `--check` for CI drift.')
}

function sortKeys(o) {
  return Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]))
}
