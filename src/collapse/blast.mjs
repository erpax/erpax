#!/usr/bin/env node
// collapse/blast.mjs — measure before you cut. For each collapse target, count
// inbound references across src (other collections' relationTo, services, hooks,
// tests) EXCLUDING the target's own collection folder. Low count ⇒ safe to
// collapse first; high count ⇒ rewire its relations before it can fall in.
// Pure JS (no shell) so slugs with hyphens don't break quoting.
//
// Usage:  node src/collapse/blast.mjs

import { readFile, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    // skip GENERATED mirrors (payload-types.ts relates to every slug via search; skill-router index)
    else if (/\.tsx?$/.test(e.name) && !e.name.endsWith('.d.ts') && e.name !== 'payload-types.ts' && e.name !== 'skills.index.ts') out.push(p)
  }
  return out
}

// slug set from payload-types
const types = await readFile(join(SRC, 'payload-types.ts'), 'utf8')
const block = types.match(/collections:\s*\{([\s\S]*?)\n {2}\};/)
const slugList = block ? [...block[1].matchAll(/'([a-z0-9-]+)':/g)].map((m) => m[1]) : []

// load every src .ts once, remember its path so we can exclude a slug's own folder
const files = await walk(SRC)
const docs = await Promise.all(files.map(async (f) => ({ f, t: await readFile(f, 'utf8') })))

// PascalCase folder for a slug (Customers/KycChecks) so we can exclude self-refs
function countRefs(slug) {
  const needle1 = `'${slug}'`
  const needle2 = `"${slug}"`
  let files = 0
  let hits = 0
  for (const { f, t } of docs) {
    if (!t.includes(needle1) && !t.includes(needle2)) continue
    // exclude the slug's own collection folder (self-references in its own config/seed/test)
    const own = new RegExp(`/collections/[^/]*/?[^/]*${slug.replace(/-/g, '')}`, 'i')
    // crude self-exclude: skip files whose path, lowercased & de-hyphenated, contains the slug
    const norm = f.toLowerCase().replace(/[-_]/g, '')
    if (norm.includes('/collections/') && norm.includes(slug.replace(/-/g, ''))) continue
    files++
    hits += (t.split(needle1).length - 1) + (t.split(needle2).length - 1)
    void own
  }
  return { files, hits }
}

const rows = slugList
  .map((slug) => ({ slug, ...countRefs(slug) }))
  .sort((a, b) => a.files - b.files || a.hits - b.hits)

console.log('blast radius — inbound refs per slug (excl. own collection folder)\n')
console.log('SAFEST (0 inbound — nothing else points at them):')
for (const r of rows.filter((r) => r.files === 0)) console.log(`  ${r.slug}`)
console.log('\nENTANGLED (collapse after rewiring relations):')
for (const r of rows.filter((r) => r.files > 0).slice(-25)) {
  console.log(`  files=${String(r.files).padStart(3)} hits=${String(r.hits).padStart(4)}  ${r.slug}`)
}
