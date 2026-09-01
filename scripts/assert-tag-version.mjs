#!/usr/bin/env node
/**
 * assert-tag-version — the tag names the version it releases.
 *
 *   node scripts/assert-tag-version.mjs <tag> [packageDir]
 *
 * A tag whose version does not match its package.json publishes an artifact under a
 * name that resolves to different content — the one thing a content-addressed corpus
 * may not do. Prefix is whatever precedes the final `v`: `v1.2.3`, `algebra-v0.1.1`,
 * `accounting-v2.0.0` all parse.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const [tag, dir = '.'] = process.argv.slice(2)
if (!tag) {
  console.error('✖ usage: assert-tag-version <tag> [packageDir]')
  process.exit(1)
}
const at = tag.lastIndexOf('v')
if (at < 0) {
  console.error(`✖ tag "${tag}" has no version part`)
  process.exit(1)
}
const tagVersion = tag.slice(at + 1)
const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
if (tagVersion !== pkg.version) {
  console.error(`✖ tag ${tag} does not match ${pkg.name ?? dir} version ${pkg.version}`)
  process.exit(1)
}
console.log(`✔ ${tag} matches ${pkg.name ?? dir}@${pkg.version}`)
