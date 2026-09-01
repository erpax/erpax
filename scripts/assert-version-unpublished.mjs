#!/usr/bin/env node
/**
 * assert-version-unpublished — an npm version is burned once, forever.
 *
 *   node scripts/assert-version-unpublished.mjs [packageDir]
 *
 * npm refuses a re-publish and an unpublished version can never be reused, so a
 * release that would collide must die BEFORE `npm publish` runs, not inside it.
 * An unreadable packument means "unknown", never "absent" — absence of evidence read
 * as evidence of absence is how this corpus has been wrong before, so a registry that
 * cannot answer fails the check rather than waving the publish through.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2] ?? '.'
const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))

let raw = ''
try {
  raw = execFileSync('npm', ['view', pkg.name, 'versions', '--json'], { encoding: 'utf8' })
} catch (err) {
  // A never-published package 404s — that is a legitimate "no versions", the only
  // failure mode that is honestly an empty list.
  const text = String(err.stderr ?? err.stdout ?? '')
  if (!/E404|is not in this registry|404 Not Found/.test(text)) {
    console.error(`✖ cannot read the registry for ${pkg.name} — refusing to publish blind`)
    console.error(text.split('\n').slice(0, 3).join('\n'))
    process.exit(1)
  }
  raw = '[]'
}

let versions = []
try {
  const j = JSON.parse(raw || '[]')
  versions = Array.isArray(j) ? j : typeof j === 'string' ? [j] : []
} catch {
  console.error(`✖ registry answer for ${pkg.name} is not JSON — refusing to publish blind`)
  process.exit(1)
}

if (versions.includes(pkg.version)) {
  console.error(`✖ ${pkg.name}@${pkg.version} already on npm — bump it; the version is burned`)
  process.exit(2)
}
console.log(`✔ ${pkg.name}@${pkg.version} not in registry (${versions.length} known version(s))`)
